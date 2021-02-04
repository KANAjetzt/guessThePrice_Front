<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  export let imgs = [];

  let currentImgIndex = 0;

  const cycleImgs = seconds => {
    setInterval(() => {
      currentImgIndex = (currentImgIndex + 1) % imgs.length;
    }, seconds * 1000);
  };

  onMount(() => {
    cycleImgs(2);
  });
</script>

<style>
  .imgs {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    position: relative;
    width: 100%;
  }

  .img {
    width: 100%;
    height: 20rem;
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    object-fit: cover;
  }
</style>

<div class="imgs">
  {#each [imgs[currentImgIndex]] as img, index (currentImgIndex)}
    <img transition:fade class="img" src={img} alt={`Product`} />
  {/each}
</div>
