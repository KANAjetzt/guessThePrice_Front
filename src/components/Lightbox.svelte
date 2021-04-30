<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { roomStore, roomState, appStore } from "../stores";
  import Modal from "./Modal.svelte";
  import BtnArrow from "./BtnArrow.svelte";

  onMount(() => () => {
    $appStore.lightboxIsOpen = false;
  });

  const mediumImgCount = [
    ...$roomState.currentProduct.imgs.$items.get(0).mediumImgs,
  ].length;

  const slideLeft = 500;
  const slideRight = -500;
  let isLeftBtnClick;
</script>

{#if $appStore.lightboxIsOpen}
  <Modal name={"lightboxIsOpen"}>
    <div class="lightBox">
      <BtnArrow
        direction="left"
        on:click={() => {
          isLeftBtnClick = true;
          if ($appStore.galleryClickedImage === 0) {
            $appStore.galleryClickedImage = mediumImgCount - 1;
          } else {
            $appStore.galleryClickedImage--;
          }
        }}
      />
      {#key $appStore.galleryClickedImage}
        <img
          in:fly={{
            duration: 500,
            x: isLeftBtnClick ? slideRight : slideLeft,
            easing: quintOut,
          }}
          out:fly|local={{
            duration: 500,
            x: isLeftBtnClick ? slideLeft : slideRight,
            easing: quintOut,
          }}
          class="lightBoxImg"
          src={[...$roomState.currentProduct.imgs.$items.get(0).mediumImgs][
            $appStore.galleryClickedImage
          ]}
          alt={`Productbild-${$appStore.galleryClickedImage}`}
        />
      {/key}
      <BtnArrow
        direction="right"
        on:click={() => {
          isLeftBtnClick = false;
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
    display: grid;
    grid-template-columns: max-content 1fr max-content;
    grid-template-rows: 1fr;
    align-items: center;
    overflow: hidden;
  }

  .lightBoxImg {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    width: 40rem;
    height: auto;
    max-height: 80vh;
    object-fit: contain;
    padding: 2rem;
    pointer-events: none;
  }
</style>
