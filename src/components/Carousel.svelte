<script>
  import Carousel from "@beyonk/svelte-carousel";
  import { ChevronLeftIcon, ChevronRightIcon } from "svelte-feather-icons";

  import { roomState } from "../stores";
</script>

{#if [...$roomState.currentProduct.imgs.$items.get(0).mediumImgs][0]}
  <Carousel perPage={1}>
    <span class="control" slot="left-control">
      <ChevronLeftIcon />
    </span>
    {#each [...$roomState.currentProduct.imgs.$items.get(0).mediumImgs] as img}
      <div class="slide-content">
        <img src={img} alt="adding that later" />
      </div>
    {/each}
    <span class="control" slot="right-control">
      <ChevronRightIcon />
    </span>
  </Carousel>
{/if}

<style>
  img {
    max-width: 100vw;
  }

  .slide-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
