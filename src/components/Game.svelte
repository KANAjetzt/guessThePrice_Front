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

  const handleGuessedPriceSubmit = async (e) => {
    // Send guessed price to BE
    await $roomStore.send("guessedPrice", {
      guessedPrice: $appStore.guessedPrice,
    });
  };

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
      <h2>{$roomState.currentProduct.title}</h2>

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

      <!-- Feature Bullets -->
      {#each [...$roomState.currentProduct.featureBullets.$items] as feature}
        <p>{feature[1]}</p>
      {/each}

      <!-- Description -->
      <p>{$roomState.currentProduct.description}</p>
      <!-- Technical Details -->
      {#if $roomState.currentProduct.technicalDetails}
        {#each [...$roomState.currentProduct.technicalDetails.$items] as technicalDetail}
          <p>{technicalDetail.join(": ")}</p>
        {/each}
      {/if}
      <!-- Rating Count -->
      <p>Anzahl Rezensionen: {$roomState.currentProduct.ratingCount}</p>
      <!-- Rating Stars -->
      <p>{$roomState.currentProduct.ratingStars} Sternen</p>
      <!-- Creation Date -->
      <p>
        Stand: {new Date(
          $roomState.currentProduct.creationDate
        ).toLocaleDateString("de-DE")}
      </p>
      <CurrencyInput />
      {#if $appStore.guessedPrice}
        <BtnSubmit on:click={handleGuessedPriceSubmit} />
      {/if}
      <PlayerBoard store={roomState} />
    {/if}

    {#if !$roomState.isBetweenRounds}
      <BetweenRounds />
    {/if}

    {#if $roomState.gameEnded}
      <GameEnd />
    {/if}
  {/if}
</main>

<style>
</style>
