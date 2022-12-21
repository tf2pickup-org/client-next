<script lang="ts">
  import { apiUrl } from "$environment";
    import type { Queue } from "../models/queue";

  const fetchQueue = async () => {
    const res = await fetch(`${apiUrl}/queue`);

    if (res.ok) {
      const queue: Queue = await res.json();
      return queue;
    }
  };

  const queue = fetchQueue();
</script>

{#await queue}
  <p>loading...</p>
{:then queue}
  <p>{queue}</p>
{:catch error}
  <p>error: {error.message}</p>
{/await}
