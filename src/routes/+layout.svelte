<script lang="ts">
  import { Howl } from 'howler';
  import { page } from '$app/stores';
  import { PUBLIC_WEBSITE_NAME } from '$env/static/public';
  import Footer from '$lib/core/components/footer.svelte';
  import NavigationBar from '$lib/core/components/navigation-bar.svelte';
  import { socket } from '$lib/io/socket';
  import { fetchOnlinePlayers } from '$lib/players/api/fetch-online-players';
  import { onlinePlayers } from '$lib/players/online-players.store';
  import { playerConnected, playerDisconnected } from '$lib/players/players.events';
  import type { Player } from '$lib/players/types/player';
  import { fetchProfile } from '$lib/profile/api/fetch-profile';
  import { profileUpdated } from '$lib/profile/profile.events';
  import { activeGameId, preferences, profile } from '$lib/profile/profile.store';
  import { fetchQueue } from '$lib/queue/api/fetch-queue';
  import ReadyUpDialog from '$lib/queue/components/ready-up-dialog.svelte';
  import {
    friendshipsUpdated,
    mapVoteResultsUpdated,
    queueSlotsUpdated,
    queueStateUpdated,
    substituteRequestsUpdated,
  } from '$lib/queue/queue.events';
  import { mySlot, queue, queueState } from '$lib/queue/queue.store';
  import { QueueState } from '$lib/queue/types/queue-state';
  import { fetchStreams } from '$lib/streams/api/fetch-streams';
  import { streamsUpdated } from '$lib/streams/streams.events';
  import { streams } from '$lib/streams/streams.store';
  import '../app.css';
  import type { LayoutData } from './$types';
  import AcceptRulesDialog from './accept-rules-dialog.svelte';
  import RunningGameSnackbar from './running-game-snackbar.svelte';
  import { Subject } from 'rxjs';
  import { takeUntil } from 'rxjs/operators';
  import { onDestroy, onMount } from 'svelte';
  import { derived } from 'svelte/store';
  import { readyUp } from '$lib/queue/api/ready-up';
  import { leaveQueue } from '$lib/queue/api/leave-queue';
  import { isPreReadied } from '$lib/queue/pre-ready-up.store';

  export let data: LayoutData;

  const destroyed: Subject<void> = new Subject();
  const awaitsReadyUp = derived(
    [queueState, mySlot],
    ([$queueState, $mySlot]) => $queueState === QueueState.ready && $mySlot?.ready === false,
  );

  let notification: Notification;
  let sound: Howl;

  const closeNotification = () => {
    notification?.close();
    sound?.stop();
  };

  $: {
    queue.set(data.queue);
    profile.set(data.profile);
    onlinePlayers.set(
      new Map<string, Player>(data.onlinePlayers.map(player => [player.steamId, player])),
    );
    streams.set(data.streams);
  }

  onMount(() => {
    profileUpdated
      .pipe(takeUntil(destroyed))
      .subscribe(profileChanges =>
        profile.update(value => (value ? { ...value, ...profileChanges } : undefined)),
      );

    queueStateUpdated.pipe(takeUntil(destroyed)).subscribe(state =>
      queue.update(value => {
        value.state = state;
        return value;
      }),
    );

    queueSlotsUpdated.pipe(takeUntil(destroyed)).subscribe(slots => {
      queue.update(value => {
        for (const slot of slots) {
          const idx = value.slots.findIndex(s => s.id === slot.id);
          value.slots[idx] = slot;
        }
        return value;
      });
    });

    mapVoteResultsUpdated.pipe(takeUntil(destroyed)).subscribe(results =>
      queue.update(value => {
        value.mapVoteResults = results;
        return value;
      }),
    );

    substituteRequestsUpdated.pipe(takeUntil(destroyed)).subscribe(requests =>
      queue.update(value => {
        value.substituteRequests = requests;
        return value;
      }),
    );

    friendshipsUpdated.pipe(takeUntil(destroyed)).subscribe(friendships =>
      queue.update(value => {
        value.friendships = friendships;
        return value;
      }),
    );

    playerConnected
      .pipe(takeUntil(destroyed))
      .subscribe(player => onlinePlayers.update(value => value.set(player.steamId, player)));

    playerDisconnected.pipe(takeUntil(destroyed)).subscribe(player =>
      onlinePlayers.update(value => {
        value.delete(player.steamId);
        return value;
      }),
    );

    streamsUpdated.pipe(takeUntil(destroyed)).subscribe(value => streams.set(value));

    let previousAwaitsReadyUp: boolean | undefined = undefined;
    awaitsReadyUp.subscribe($awaitsReadyUp => {
      if ($isPreReadied) {
        readyUp();
        return;
      }

      if ($awaitsReadyUp && previousAwaitsReadyUp === false) {
        notification = new Notification('Ready up!', {
          body: 'A new pickup game is starting',
          icon: '/favicon.png',
        });

        const volume = parseFloat($preferences?.['soundVolume'] ?? '1.0');

        sound = new Howl({
          src: ['webm', 'wav'].map(format => `/sounds/ready_up.${format}`),
          autoplay: true,
          volume,
        });
      }

      previousAwaitsReadyUp = $awaitsReadyUp;
    });

    socket.on('connect', async () => {
      queue.set(await fetchQueue());
      profile.set(await fetchProfile());

      const _onlinePlayers = await fetchOnlinePlayers();
      onlinePlayers.set(
        new Map<string, Player>(_onlinePlayers.map(player => [player.steamId, player])),
      );
      streams.set(await fetchStreams());
    });
    socket.connect();
  });

  onDestroy(() => {
    destroyed.next();
    destroyed.complete();
  });
</script>

<svelte:head>
  <title>{PUBLIC_WEBSITE_NAME}</title>
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={PUBLIC_WEBSITE_NAME} />
</svelte:head>

<NavigationBar />
<div class="relative flex-1">
  <slot />
</div>
<Footer />

{#if $profile?.hasAcceptedRules === false}
  <AcceptRulesDialog rules={data.rules?.body ?? ''} />
{/if}

{#if $awaitsReadyUp}
  <ReadyUpDialog
    on:readyUp={() => {
      readyUp();
      closeNotification();
    }}
    on:leaveQueue={() => {
      leaveQueue();
      closeNotification();
    }}
  />
{/if}

{#if $page.url.pathname === '/' && $activeGameId}
  <RunningGameSnackbar />
{/if}
