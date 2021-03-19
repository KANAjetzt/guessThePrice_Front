<script>
  import { onMount } from "svelte";
  import { roomStore, roomState, appStore } from "../stores";
  import PlayerBoard from "./PlayerBoard.svelte";
  import BtnSubmit from "./BtnSubmit.svelte";
  import Carousel from "./Carousel.svelte";
  import CurrencyInput from "./CurrencyInput.svelte";
  import Gallery from "./Gallery.svelte";
  import BetweenRounds from "./BetweenRounds.svelte";
  import GameEnd from "./GameEnd.svelte";
  import ProductTitle from "./ProductTitle.svelte";
  import Info from "./Info.svelte";

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
      <ProductTitle />

      <!-- Images -->
      {#if $appStore.clientWidth > 535}
        <Gallery>
          {#each [...$roomState.currentProduct.imgs.$items.get(0).mediumImgs] as src, i}
            <img {src} alt={`Productbild-${i}`} />
          {/each}
        </Gallery>
      {:else}
        <Carousel />
      {/if}

      <!-- Description -->
      <Info title={"Beschreibung"}>
        <p>{$roomState.currentProduct.description}</p>
      </Info>

      <!-- Technical Details -->
      {#if $roomState.currentProduct.technicalDetails}
        <Info title={"Technische Daten"}>
          {#each [...$roomState.currentProduct.technicalDetails.$items] as technicalDetail}
            <p>{technicalDetail.join(": ")}</p>
          {/each}
        </Info>
      {/if}

      <!-- Feature Bullets -->
      <Info title={"Features"}>
        {#each [...$roomState.currentProduct.featureBullets.$items] as feature}
          <p>{feature[1]}</p>
        {/each}
      </Info>

      <!-- Rating Count -->
      <Info title={"Bewertung"}>
        <p>Anzahl Rezensionen: {$roomState.currentProduct.ratingCount}</p>
        <!-- Rating Stars -->
        <p>{$roomState.currentProduct.ratingStars} Sternen</p>
      </Info>

      <PlayerBoard />

      <CurrencyInput />
    {/if}

    {#if $roomState.isBetweenRounds}
      <BetweenRounds />
    {/if}

    {#if $roomState.gameEnded}
      <GameEnd />
    {/if}
  {/if}
</main>

<style>
  /* CurrencyInput is blocking the last playerCard without that */
  main {
    min-height: 100vh;
    margin-bottom: 12.2rem;
  }
</style>
