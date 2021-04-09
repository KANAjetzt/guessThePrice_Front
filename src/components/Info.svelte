<script>
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import ArrowIcon from "./Icons/Arrow.svelte";

  export let title;
  let clicked = false;
</script>

<section
  class="info"
  on:click={() => {
    clicked = !clicked;
  }}
>
  <div class="infoTitle">
    <h3>{title}</h3>
    <ArrowIcon width={15} height={20} shadow={false} />
  </div>

  {#if clicked}
    <div class="content" transition:slide={{ duration: 300, easing: quintOut }}>
      <slot />
    </div>
  {/if}
</section>

<style>
  .info {
    cursor: pointer;
  }

  .infoTitle {
    display: flex;
    justify-content: space-between;
    padding: 2.3rem 1.4rem;
    transition: all 0.2s ease-in-out;
  }

  .infoTitle:hover,
  .infoTitle:focus {
    filter: brightness(2);
  }

  h3 {
    font-size: var(--heading-5);
    font-weight: 500;
    transition: all 0.2s ease-in-out;
  }
  h3:hover,
  h3:focus {
    filter: drop-shadow(var(--shadow--color1));
  }

  .content {
    padding: 1.4rem;
    background-color: var(--color-1-darker);
  }

  :global(.content p) {
    line-height: 1.8;
  }
</style>
