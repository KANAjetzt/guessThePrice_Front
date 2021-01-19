<script>
  import * as Colyseus from "colyseus.js";
  import AutoNumeric from "AutoNumeric";
  import { onMount } from "svelte";

  import { roomState } from "./stores";
  import Currency from "./Currency.svelte";

  const client = new Colyseus.Client("ws://localhost:2567");

  const joinRoom = async () => {
    const room = await client.joinOrCreate("my_room");
    console.log(room.sessionId, "joined", room.name);
    return room;
  };

  const handleRoom = async () => {
    // join Room
    const room = await joinRoom();

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
    <h2>{$roomState.currentProduct.productTitle}</h2>
    <img src={$roomState.currentProduct.productImg} alt="product" />
    <p>{$roomState.currentProduct.productDescription}</p>
    <p>{$roomState.currentProduct.productStars}</p>
    <p>
      <Currency cent={$roomState.currentProduct.productPrice} />
    </p>
  {/if}

  <input type="text" class="guessedPriceInput" />
  <button>✔</button>
</main>
