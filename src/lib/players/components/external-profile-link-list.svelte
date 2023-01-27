<script lang="ts">
  import twitchTvIcon from '$lib/assets/TwitchGlitchPurple.svg';
  import etf2lIcon64 from '$lib/assets/ui_icon_etf2l_blue_64x64.png';
  import etf2lIcon128 from '$lib/assets/ui_icon_etf2l_blue_128x128.png';
  import logsIcon64 from '$lib/assets/ui_icon_logs_blue_64x64.png';
  import logsIcon128 from '$lib/assets/ui_icon_logs_blue_128x128.png';
  import steamIcon48 from '$lib/assets/ui_icon_steam_blue_48x48.png';
  import steamIcon96 from '$lib/assets/ui_icon_steam_blue_96x96.png';
  import type { LinkedProfiles } from '../models/linked-profiles';
  import type { Player } from '../models/player';
  import ExternalProfileLink from './external-profile-link.svelte';

  export let player: Player;
  export let linkedProfiles: LinkedProfiles | undefined = undefined;

  let steamProfileLink: string;
  let etf2lProfileLink: string;
  let logsTfProfileLink: string;
  let twitchTvProfileLink: string | undefined;

  const makeTwitchTvProfileLink = (linkedProfiles: LinkedProfiles) => {
    const twitchTvProvider = linkedProfiles?.linkedProfiles.find(lp => lp.provider === 'twitch.tv');
    if (!twitchTvProvider) {
      return undefined;
    }

    return `https://www.twitch.tv/${twitchTvProvider.login}/`;
  };

  $: {
    steamProfileLink = `https://steamcommunity.com/profiles/${player.steamId}`;
    etf2lProfileLink = `https://etf2l.org/forum/user/${player.etf2lProfileId}`;
    logsTfProfileLink = `https://logs.tf/profile/${player.steamId}`;
    twitchTvProfileLink = linkedProfiles ? makeTwitchTvProfileLink(linkedProfiles) : undefined;
  }
</script>

<div class="flex flex-row justify-center gap-4">
  <ExternalProfileLink href={steamProfileLink}>
    <img srcset="{steamIcon48}, {steamIcon96} 2x" src={steamIcon96} alt="steam icon" />
  </ExternalProfileLink>

  <ExternalProfileLink href={etf2lProfileLink}>
    <img srcset="{etf2lIcon64}, {etf2lIcon128} 2x" src={etf2lIcon128} alt="ETF2L.org icon" />
  </ExternalProfileLink>

  <ExternalProfileLink href={logsTfProfileLink}>
    <img srcset="{logsIcon64}, {logsIcon128} 2x" src={logsIcon128} alt="logs.tf icon" />
  </ExternalProfileLink>

  {#if twitchTvProfileLink}
    <ExternalProfileLink href={twitchTvProfileLink}>
      <img src={twitchTvIcon} alt="twitch.tv icon" width="48" height="48" />
    </ExternalProfileLink>
  {/if}
</div>
