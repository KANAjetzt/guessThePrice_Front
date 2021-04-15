<script>
  import { fade, scale } from "svelte/transition";
  import { roomStore, roomState, appStore } from "../stores";
  import Modal from "./Modal.svelte";
  import BtnArrow from "./BtnArrow.svelte";

  const mediumImgCount = [
    ...$roomState.currentProduct.imgs.$items.get(0).mediumImgs,
  ].length;
</script>

{#if $appStore.modalIsOpen}
  <Modal>
    <div class="lightBox">
      <BtnArrow
        direction="left"
        on:click={() => {
          if ($appStore.galleryClickedImage === 0) {
            $appStore.galleryClickedImage = mediumImgCount - 1;
          } else {
            $appStore.galleryClickedImage--;
          }
        }}
      />
      <img
        class="lightBoxImg"
        src={[...$roomState.currentProduct.imgs.$items.get(0).mediumImgs][
          $appStore.galleryClickedImage
        ]}
        alt={`Productbild-${$appStore.galleryClickedImage}`}
      />
      <BtnArrow
        direction="right"
        on:click={() => {
          if ($appStore.galleryClickedImage === mediumImgCount - 1) {
            $appStore.galleryClickedImage = 0;
          } else {
            $appStore.galleryClickedImage++;
          }
        }}
      />
    </div>
  </Modal>
{/if}

<style>
  .lightBox {
    display: flex;
    align-items: center;
  }

  .lightBoxImg {
    width: 40rem;
    height: auto;
    max-height: 80vh;
    object-fit: contain;
    padding: 2rem;
  }
</style>
