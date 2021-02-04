<script>
  import * as Colyseus from "colyseus.js";
  import AutoNumeric from "AutoNumeric";
  import { onMount } from "svelte";

  import { handleEuro } from "./utils/toCent";
  import { roomStore, roomState } from "./stores";
  import Currency from "./components/Currency.svelte";
  import PlayerBoard from "./components/PlayerBoard.svelte";
  import BtnSubmit from "./components/BtnSubmit.svelte";
  import Carousel from "./components/Carousel.svelte";

  let guessedPrice = 0;

  const client = new Colyseus.Client("ws://localhost:2567");

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
    room.onStateChange(state => {
      $roomState = state;
      console.log($roomState);
    });
  };

  onMount(() => {
    // Add formating to currency input
    new AutoNumeric(".guessedPriceInput", {
      currencySymbol: "€",
      currencySymbolPlacement: "s"
    });

    // Connect to game room and listen for state change
    handleRoom();
  });
</script>

<style>
  img {
    max-width: 100vw;
  }
</style>

<main>
  {#if $roomState}
    <!-- Title -->
    <h2>{$roomState.currentProduct.title}</h2>

    <!-- Images -->
    <Carousel
      imgs={[...$roomState.currentProduct.imgs.$items.get(0).mediumImgs]} />

    <!-- Feature Bullets -->
    {#each [...$roomState.currentProduct.featureBullets.$items] as feature}
      <p>{feature[1]}</p>
    {/each}

    <!-- Description -->
    <p>{$roomState.currentProduct.description}</p>
    <!-- Technical Details -->

    {#each [...$roomState.currentProduct.technicalDetails.$items] as technicalDetail}
      <p>{technicalDetail.join(': ')}</p>
    {/each}

    <!-- Rating Count -->
    <p>{$roomState.currentProduct.ratingCount}</p>
    <!-- Rating Stars -->
    <p>{$roomState.currentProduct.ratingStars}</p>
    <!-- Creation Date -->
    <p>
      Stand: {new Date($roomState.currentProduct.creationDate).toLocaleDateString('de-DE')}
    </p>
  {/if}

  <PlayerBoard />

  <input type="text" class="guessedPriceInput" bind:value={guessedPrice} />
  <BtnSubmit guessedPrice={handleEuro(guessedPrice)} />
</main>
