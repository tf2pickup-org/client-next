<script lang="ts">
  import type { PlayerAvatar } from '$lib/players/types/player-avatar';
  import {
    IconSettings,
    IconUserCircle,
    IconLogout,
    IconSettingsFilled,
  } from '@tabler/icons-svelte';
  import { sineInOut } from 'svelte/easing';
  import { fade, type FadeParams, type TransitionConfig } from 'svelte/transition';

  export let steamId: string;
  export let name: string;
  export let avatar: PlayerAvatar;

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

<div class="relative grow lg:grow-0">
  <button class="profile-button" on:click|stopPropagation={() => (menuOpen = !menuOpen)}>
    <img
      src={avatar.medium}
      width="64"
      class="h-[42px] w-[42px] rounded-[3px]"
      alt="{name}'s avatar"
    />
    <span class="grow text-2xl">{name}</span>
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
      class="bg-abru-dark-29 absolute z-50 mt-2 w-[300px] origin-top rounded-[10px] p-2 drop-shadow-xl"
      in:growDown={{ duration: 150 }}
      out:fade={{ duration: 100 }}
    >
      <div class="text-abru-light-75 flex flex-col gap-1">
        <a href="/players/{steamId}" class="menu-item">
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

<style lang="postcss">
  .profile-button {
    @apply transition-colors;
    @apply duration-75;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;

    width: 100%;
    padding: 11px;
    border-radius: 10px;
    text-overflow: ellipsis;

    background-color: theme('colors.abru.dark.29');
    color: theme('colors.abru.light.75');
    text-align: left;

    @media screen(lg) {
      width: 300px;
    }

    &:hover {
      background-color: lighten(theme('colors.abru.dark.29'), 2%);
    }

    &:active {
      background-color: theme('colors.abru.dark.29');
    }
  }

  .menu-item {
    @apply transition-colors;
    @apply duration-75;

    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 14px 24px;
    border-radius: 0.5rem /* 8px */;
    background-color: theme('colors.abru.dark.29');
    gap: 0.5rem /* 8px */;

    &:hover {
      background-color: lighten(theme('colors.abru.dark.29'), 2%);
    }
  }

  .divider {
    width: 236px;
    height: 1px;
    align-self: center;
    background-color: theme('colors.abru.light.5');
  }
</style>
