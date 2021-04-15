<script>
  import { onMount } from "svelte";
  import { roomStore, roomState, appStore } from "../stores";
  import PlayerBoard from "./PlayerBoard.svelte";
  import BtnSubmit from "./BtnSubmit.svelte";
  import Carousel from "./Carousel.svelte";
  import CurrencyInput from "./CurrencyInput.svelte";
  import Gallery from "./Gallery.svelte";
  import ProductTitle from "./ProductTitle.svelte";
  import Info from "./Info.svelte";
  import GalleryV2 from "./GalleryV2.svelte";

  let clientWidth;
  $: $appStore.clientWidth = clientWidth;

  onMount(() => {
    // Update currentRoom in appStore so everyone knows
    $appStore.currentRoom = "game";
  });
</script>

<svelte:window bind:innerWidth={clientWidth} />

<main>
  {#if $roomState}
    {#if !$roomState.gameEnded && !$roomState.isBetweenRounds}
      <!-- Title -->
      <section class="title">
        <ProductTitle />
      </section>

      <!-- Images -->
      {#if $appStore.clientWidth > 535}
        <section class="gallery">
          <!-- <Gallery>
            {#each [...$roomState.currentProduct.imgs.$items.get(0).mediumImgs] as src, i}
              <img {src} alt={`Productbild-${i}`} />
            {/each}
          </Gallery> -->
          <GalleryV2 />
        </section>
      {:else}
        <section class="carousel">
          <Carousel />
        </section>
      {/if}
      <section class="infos">
        <!-- Description -->
        {#if $roomState.currentProduct.description}
          <Info title={"Beschreibung"}>
            <p>{$roomState.currentProduct.description}</p>
          </Info>
        {/if}

        <!-- Technical Details -->
        {#if $roomState.currentProduct.technicalDetails}
          <Info title={"Technische Daten"}>
            {#each [...$roomState.currentProduct.technicalDetails.$items] as technicalDetail}
              <p>{technicalDetail.join(": ")}</p>
            {/each}
          </Info>
        {/if}

        <!-- Feature Bullets -->
        {#if $roomState.currentProduct.featureBullets}
          <Info title={"Features"}>
            {#each [...$roomState.currentProduct.featureBullets.$items] as feature}
              <p>{feature[1]}</p>
            {/each}
          </Info>
        {/if}

        <!-- Rating Count -->
        <Info title={"Bewertung"}>
          <p>Anzahl Rezensionen: {$roomState.currentProduct.ratingCount}</p>
          <!-- Rating Stars -->
          {#if $roomState.currentProduct.ratingStars}
            <p>{$roomState.currentProduct.ratingStars} Sternen</p>
          {/if}
        </Info>
      </section>
      <section class="playerBoard">
        <PlayerBoard />
      </section>
      <CurrencyInput />
    {/if}
  {/if}
</main>

<style>
  /* CurrencyInput is blocking the last playerCard without that */
  main {
    min-height: 100vh;
    margin-bottom: 12.2rem;
    display: grid;
    grid-template-columns: max-content 1fr;
  }

  section {
    grid-column: 1 / 3;
  }

  @media only screen and (min-width: 80em) {
    section {
      grid-column: 2 / 3;
    }
  }

  .carousel {
    max-width: 100vw;
  }

  @media only screen and (min-width: 80em) {
    .playerBoard {
      grid-column: 1 / 2;
      grid-row: 1 / 5;
    }
  }

  @media only screen and (min-width: 120em) {
    .infos {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(50rem, 1fr));
    }
  }
</style>
