<script lang="ts">
  import { format } from 'date-fns';

  export let date: Date | string;

  let text: string;

  $: text = format(typeof date === 'string' ? new Date(date) : date, 'dd.MM.yyyy HH:mm');
</script>

{text}
