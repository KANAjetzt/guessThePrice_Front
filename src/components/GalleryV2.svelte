<script>
  import { roomStore, roomState, appStore } from "../stores";
  import Lightbox from "./Lightbox.svelte";
</script>

<Lightbox />

<div class="gallery">
  {#each [...$roomState.currentProduct.imgs.$items.get(0).mediumImgs] as src, i}
    <div class="imgContainer">
      <img
        class="img"
        {src}
        alt={`Productbild-${i}`}
        on:click={() => {
          $appStore.modalIsOpen = true;
          $appStore.galleryClickedImage = i;
        }}
      />
    </div>
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

  .imgContainer {
    width: 15rem;
    height: 15rem;
    overflow: hidden;
    transition: all 0.2s ease-out;
  }

  .imgContainer:hover {
    filter: drop-shadow(var(--shadow-1--color1));
  }

  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.2s ease-out;
    cursor: pointer;
  }

  .img:hover {
    transform: scale(1.05);
  }
</style>
