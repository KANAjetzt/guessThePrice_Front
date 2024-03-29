<script>
  import { onMount } from "svelte";
  import { roomStore, roomState, appStore } from "../stores";
  import PlayerBoard from "./PlayerBoard.svelte";
  import Carousel from "./Carousel.svelte";
  import CurrencyInput from "./CurrencyInput.svelte";
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
        {#if $roomState.currentProduct.featureBullets[0]}
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
      <section class="currencyInput">
        <CurrencyInput />
      </section>
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
    grid-auto-rows: max-content;
    row-gap: 5rem;
  }

  @media only screen and (min-width: 80em) {
    main {
      grid-template-columns: max-content 1fr max-content;
    }
  }

  @media only screen and (min-width: 180em) {
    main {
      margin-bottom: unset;
      row-gap: 5rem;
    }
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

  .currencyInput {
    position: fixed;
    bottom: 0;
    width: 100vw;
  }
  @media only screen and (min-width: 180em) {
    .currencyInput {
      align-self: end;
      position: relative;
      bottom: unset;
      width: 100%;
      grid-column: 3 / 4;
      grid-row: 1 / 3;
      padding: 0 1.4rem;
    }

    /* Background for CurrencyInput */
    main::after {
      display: block;
      content: "";
      grid-column: 3 / 4;
      grid-row: 1 / 5;
      background-color: var(--color-1-alpha5);
      box-shadow: var(--shadow-4--negative);
      min-height: 100vh;
    }
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
