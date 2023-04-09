<script lang="ts">
  import type { Profile } from '$lib/profile/types/profile';
  import {
    IconSettings,
    IconUserCircle,
    IconLogout,
    IconSettingsFilled,
  } from '@tabler/icons-svelte';
  import { sineInOut } from 'svelte/easing';
  import { fade, type FadeParams, type TransitionConfig } from 'svelte/transition';

  export let profile: Profile;

  let menuOpen = false;

  // profile menu animation
  const growDown = (node: Element, { duration }: FadeParams): TransitionConfig => {
    const opacity = +getComputedStyle(node).opacity;

    return {
      duration,
      css: t => {
        const eased = sineInOut(t);
        return `
          transform: scaleY(${eased});
          opacity: ${opacity * eased};
        `;
      },
    };
  };
</script>

<svelte:body on:click={() => (menuOpen = false)} />

<div class="relative">
  <button
    class="bg-abru-dark-900 text-abru-100 hover:bg-abru-dark-800 active:bg-abru-dark-900 group flex w-[300px] flex-row items-center justify-start gap-2 text-ellipsis rounded-[10px] p-[11px] text-left transition-colors duration-75"
    on:click|stopPropagation={() => (menuOpen = !menuOpen)}
  >
    <img
      src={profile.player.avatar.medium}
      width="64"
      class="h-[42px] w-[42px] rounded-[3px]"
      alt="{profile.player.name}'s avatar"
    />
    <span class="grow text-2xl">{profile.player.name}</span>
    <div
      class="relative rotate-0 transition-transform duration-100 group-hover:rotate-45"
      class:rotate-45={menuOpen}
    >
      <div class="{menuOpen ? 'opacity-0' : 'opacity-100'} transition-opacity duration-100">
        <IconSettings size={24} />
      </div>
      <div
        class="absolute bottom-0 left-0 right-0 top-0 {menuOpen
          ? 'opacity-100'
          : 'opacity-0'} transition-opacity duration-100"
      >
        <IconSettingsFilled size={24} />
      </div>
    </div>
  </button>

  {#if menuOpen}
    <div
      class="bg-abru-dark-900 absolute mt-2 w-[300px] origin-top rounded-[10px] p-2 drop-shadow-xl"
      in:growDown={{ duration: 150 }}
      out:fade={{ duration: 100 }}
    >
      <div class="text-abru-100 flex flex-col gap-1">
        <a href="/players/{profile.player.steamId}" class="menu-item">
          <IconUserCircle /><span>My profile</span>
        </a>
        <div class="divider" />
        <a href="/settings" class="menu-item">
          <IconSettings /><span>Settings</span>
        </a>
        <div class="divider" />
        <a href="/auth/sign-out" class="menu-item text-accent-600">
          <IconLogout /><span>Sign out</span>
        </a>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .menu-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem /* 8px */;
    border-radius: 0.5rem /* 8px */;
    padding: 14px 24px;
    transition-property: background-color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 75ms;
    background-color: theme('colors.abru-dark.900');

    &:hover {
      background-color: theme('colors.abru.700');
    }
  }

  .divider {
    background-color: theme('colors.abru.700');
    height: 1px;
    width: 236px;
    align-self: center;
  }
</style>
