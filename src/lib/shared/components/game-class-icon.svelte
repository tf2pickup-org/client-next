<script lang="ts">
  import iconDemoman from '$lib/assets/game-class-icons/demoman-64x64.png';
  import iconEngineer from '$lib/assets/game-class-icons/engineer-64x64.png';
  import iconHeavy from '$lib/assets/game-class-icons/heavy-64x64.png';
  import iconMedic from '$lib/assets/game-class-icons/medic-64x64.png';
  import iconPyro from '$lib/assets/game-class-icons/pyro-64x64.png';
  import iconScout from '$lib/assets/game-class-icons/scout-64x64.png';
  import iconSniper from '$lib/assets/game-class-icons/sniper-64x64.png';
  import iconSoldier from '$lib/assets/game-class-icons/soldier-64x64.png';
  import iconSpy from '$lib/assets/game-class-icons/spy-64x64.png';
  import { Tf2ClassName } from '../tf2-class-name';

  export let gameClass: Tf2ClassName;
  export let size: number = 64;

  let icon: string;

  const iconForClass = (gameClass: Tf2ClassName) => {
    switch (gameClass) {
      case Tf2ClassName.scout:
        return iconScout;
      case Tf2ClassName.soldier:
        return iconSoldier;
      case Tf2ClassName.pyro:
        return iconPyro;
      case Tf2ClassName.demoman:
        return iconDemoman;
      case Tf2ClassName.heavy:
        return iconHeavy;
      case Tf2ClassName.engineer:
        return iconEngineer;
      case Tf2ClassName.medic:
        return iconMedic;
      case Tf2ClassName.sniper:
        return iconSniper;
      case Tf2ClassName.spy:
        return iconSpy;
    }
  };

  $: icon = iconForClass(gameClass);
</script>

<img
  src={icon}
  alt={gameClass}
  width="64"
  height="64"
  class="inline-block"
  style="width: {size}px; height: {size}px;"
/>
