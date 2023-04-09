<script lang="ts">
  import { websiteName } from '$environment';
  import Footer from '$lib/core/components/footer.svelte';
  import NavigationBar from '$lib/core/components/navigation-bar.svelte';
  import { connect } from '$lib/io/socket';
  import { onlinePlayers } from '$lib/players/online-players.store';
  import { playerConnected, playerDisconnected } from '$lib/players/players.events';
  import type { Player } from '$lib/players/types/player';
  import { profile } from '$lib/profile/profile.store';
  import {
    friendshipsUpdated,
    mapVoteResultsUpdated,
    queueSlotsUpdated,
    queueStateUpdated,
    substituteRequestsUpdated,
  } from '$lib/queue/queue.events';
  import { queue } from '$lib/queue/queue.store';
  import '../app.css';
  import type { LayoutData } from './$types';
  import { Subject } from 'rxjs';
  import { takeUntil } from 'rxjs/operators';
  import { onDestroy, onMount } from 'svelte';

  export let data: LayoutData;

  const destroyed: Subject<void> = new Subject();

  $: {
    queue.set(data.queue);
    profile.set(data.profile);
    onlinePlayers.set(
      new Map<string, Player>(data.onlinePlayers.map(player => [player.steamId, player])),
    );
  }

  onMount(() => {
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

    connect(data.wsToken);
  });

  onDestroy(() => {
    destroyed.next();
    destroyed.complete();
  });
</script>

<svelte:head>
  <meta property="og:title" content={websiteName} />
  <meta property="og:type" content="games.other" />
  <meta property="og:url" content="https://tf2pickup.pl/" />
  <meta property="og:image" content="https://tf2pickup.pl/assets/favicon.png" />
</svelte:head>

<NavigationBar />
<div class="flex-1">
  <slot />
</div>
<Footer />
