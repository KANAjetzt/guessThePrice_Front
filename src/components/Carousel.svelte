<script>
  import Carousel from "@beyonk/svelte-carousel";
  import ArrowIcon from "./Icons/Arrow.svelte";

  import { roomState } from "../stores";
</script>

<div class="carousel">
  {#if [...$roomState.currentProduct.imgs.$items.get(0).mediumImgs][0]}
    <Carousel perPage={1}>
      <span class="control" slot="left-control">
        <div class="leftArrow">
          <ArrowIcon width={15} height={20} shadow={false} />
        </div>
      </span>
      {#each [...$roomState.currentProduct.imgs.$items.get(0).mediumImgs] as img}
        {#if img}
          <div class="slide-content">
            <img src={img} alt="adding that later" />
          </div>
        {/if}
      {/each}
      <span class="control" slot="right-control">
        <div class="rightArrow">
          <ArrowIcon width={15} height={20} shadow={false} />
        </div>
      </span>
    </Carousel>
  {/if}
</div>

<style>
  .carousel {
    background-color: var(--color-1-darker);
  }
  .slide-content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 5rem 4rem 5rem;
  }

  img {
    height: 30vh;
    width: 100%;
    object-fit: contain;
  }

  .rightArrow {
    transform: rotate(-90deg);
  }
  .leftArrow {
    transform: rotate(90deg);
  }
</style>
