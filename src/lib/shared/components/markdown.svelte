<script lang="ts">
  import { parse } from 'marked';

  export let source: string;

  let parsed: string;

  $: parsed = parse(source);
</script>

{@html parsed}
