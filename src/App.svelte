<script>
  import * as Colyseus from "colyseus.js";

  import { onMount } from "svelte";

  import { handleEuro } from "./utils/toCent";
  import { roomStore, roomState, appStore } from "./stores";
  import Currency from "./components/Currency.svelte";
  import PlayerBoard from "./components/PlayerBoard.svelte";
  import BtnSubmit from "./components/BtnSubmit.svelte";
  import PlayerCard from "./components/PlayerCard.svelte";
  import Carousel from "./components/Carousel.svelte";
  import CurrencyInput from "./components/CurrencyInput.svelte";

  const client = new Colyseus.Client("ws://192.168.178.34:2567");

  const joinRoom = async () => {
    const room = await client.joinOrCreate("my_room");
    console.log(room.sessionId, "joined", room.name);
    return room;
  };

  const handleRoom = async () => {
    // join Room
    const room = await joinRoom();

    // store room object
    $roomStore = room;

    // listen to state change
    room.onStateChange((state) => {
      $roomState = state;
      console.log($roomState);
    });
  };

  onMount(async () => {
    // Connect to game room and listen for state change
    await handleRoom();
  });
</script>

<main>
  {#if $roomState}
    {#if !$roomState.gameEnded}
      <!-- Title -->
      <h2>{$roomState.currentProduct.title}</h2>

      <!-- Images -->
      <Carousel />

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
      <BtnSubmit guessedPrice={handleEuro($appStore.guessedPrice)} />
    {/if}
  {/if}

  <PlayerBoard />
</main>

<style>
</style>
