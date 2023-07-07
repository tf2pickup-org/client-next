<script lang="ts">
  import { connectStringToLink } from '$lib/shared/connect-string-to-link';
  import { IconPlayerPlayFilled } from '@tabler/icons-svelte';

  export let connectString: string;

  let href: string | undefined;

  $: href = connectStringToLink(connectString);
</script>

<a
  {href}
  class="bg-accent-600 flex flex-row items-center justify-center gap-2 rounded p-3 text-lg font-bold uppercase leading-none text-gray-100"
>
  <IconPlayerPlayFilled size={24} />
  join game
</a>
