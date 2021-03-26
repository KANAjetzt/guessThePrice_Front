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
  .infoTitle {
    display: flex;
    justify-content: space-between;
    padding: 2.3rem 1.4rem;
  }

  h3 {
    font-size: var(--heading-5);
    font-weight: 500;
  }

  .content {
    padding: 1.4rem;
    background-color: var(--color-1-darker);
  }

  :global(.content p) {
    line-height: 1.8;
  }
</style>
