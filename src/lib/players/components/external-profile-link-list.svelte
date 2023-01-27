<script lang="ts">
  import etf2lIcon64 from '$lib/assets/ui_icon_etf2l_blue_64x64.png';
  import etf2lIcon128 from '$lib/assets/ui_icon_etf2l_blue_128x128.png';
  import logsIcon64 from '$lib/assets/ui_icon_logs_blue_64x64.png';
  import logsIcon128 from '$lib/assets/ui_icon_logs_blue_128x128.png';
  import steamIcon48 from '$lib/assets/ui_icon_steam_blue_48x48.png';
  import steamIcon96 from '$lib/assets/ui_icon_steam_blue_96x96.png';
  import type { Player } from '../models/player';
  import ExternalProfileLink from './external-profile-link.svelte';

  export let player: Player;

  let steamProfileLink: string;
  let etf2lProfileLink: string;
  let logsTfProfileLink: string;

  $: {
    steamProfileLink = `https://steamcommunity.com/profiles/${player.steamId}`;
    etf2lProfileLink = `https://etf2l.org/forum/user/${player.etf2lProfileId}`;
    logsTfProfileLink = `https://logs.tf/profile/${player.steamId}`;
  }
</script>

<div class="flex flex-row justify-center gap-4">
  <ExternalProfileLink href={steamProfileLink} title="steam" icons={[steamIcon48, steamIcon96]} />
  <ExternalProfileLink href={etf2lProfileLink} title="etf2l" icons={[etf2lIcon64, etf2lIcon128]} />
  <ExternalProfileLink href={logsTfProfileLink} title="logs.tf" icons={[logsIcon64, logsIcon128]} />
</div>
