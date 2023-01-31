<script lang="ts">
  import ImageArea from 'svelte-material-icons/ImageArea.svelte';
</script>

<!-- This is a skeleton for the game details page. Not used right now, but may be useful (dunno yet). -->

<div class="animate-pulse">
  <div class="sr-only">Loading...</div>
  <div class="hidden w-full bg-slate-700 xl:block xl:h-[140px]" />

  <div class="flex flex-col flex-nowrap xl:mt-4 xl:flex-row">
    <div class="flex flex-1 flex-col flex-nowrap items-center justify-between px-2 xl:px-8">
      <div class="my-4 items-center align-middle xl:min-h-[60px]">
        <div class="h-14 w-64 rounded-lg bg-slate-700" />
      </div>

      <div
        class="flex h-32 w-full flex-col items-center justify-center bg-slate-700 text-4xl text-slate-400 xl:h-60"
      >
        <ImageArea />
      </div>

      <div class="my-4 flex flex-col gap-4 self-stretch sm:flex-row">
        <div class="flex h-12 flex-1 rounded-lg bg-slate-700" />
        <div class="flex h-12 flex-1 rounded-lg bg-slate-700" />
        <div class="flex h-12 flex-1 rounded-lg bg-slate-700" />
      </div>

      <div class="min-h-[104px]" />
    </div>

    <div class="mt-4 flex flex-col gap-2 xl:order-first xl:w-96">
      <div class="h-[64px] w-full bg-slate-700 xl:h-[97px]" />
      <div class="h-[64px] w-full bg-slate-700 xl:h-[97px]" />
      <div class="h-[64px] w-full bg-slate-700 xl:h-[97px]" />
      <div class="h-[64px] w-full bg-slate-700 xl:h-[97px]" />
      <div class="h-[64px] w-full bg-slate-700 xl:h-[97px]" />
      <div class="h-[64px] w-full bg-slate-700 xl:h-[97px]" />
    </div>

    <div class="mt-4 flex flex-col gap-2 xl:w-96">
      <div class="h-[64px] w-full bg-slate-700 xl:h-[97px]" />
      <div class="h-[64px] w-full bg-slate-700 xl:h-[97px]" />
      <div class="h-[64px] w-full bg-slate-700 xl:h-[97px]" />
      <div class="h-[64px] w-full bg-slate-700 xl:h-[97px]" />
      <div class="h-[64px] w-full bg-slate-700 xl:h-[97px]" />
      <div class="h-[64px] w-full bg-slate-700 xl:h-[97px]" />
    </div>
  </div>
</div>
