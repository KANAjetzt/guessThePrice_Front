<script>
  import { roomStore, roomState, appStore } from "../stores";
  import Lightbox from "./Lightbox.svelte";
</script>

<Lightbox />

<div class="gallery">
  {#each [...$roomState.currentProduct.imgs.$items.get(0).mediumImgs] as src, i}
    <img
      class="img"
      {src}
      alt={`Productbild-${i}`}
      on:click={() => {
        $appStore.lightboxIsOpen = true;
        $appStore.galleryClickedImage = i;
      }}
    />
  {/each}
</div>

<style>
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    gap: 1.5rem;
    justify-items: center;
    padding: 0 1.4rem;
  }

  .img {
    width: 15rem;
    height: 15rem;
    object-fit: cover;
    transition: all 0.2s ease-out;
    cursor: pointer;
    backface-visibility: hidden;
  }

  .img:hover {
    transform: scale(1.05);
    filter: drop-shadow(var(--shadow-1--color1));
  }
</style>
