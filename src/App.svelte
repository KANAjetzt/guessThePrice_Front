<script>
  import * as Colyseus from "colyseus.js";

  import { onMount } from "svelte";

  import { roomStore, roomState, appStore } from "./stores";
  import PlayerBoard from "./components/PlayerBoard.svelte";
  import BtnSubmit from "./components/BtnSubmit.svelte";
  import Carousel from "./components/Carousel.svelte";
  import CurrencyInput from "./components/CurrencyInput.svelte";

  const client = new Colyseus.Client(svelteEnv.BackendUrl);

  const joinRoom = async () => {
    const room = await client.joinOrCreate("my_room");
    console.log(room.sessionId, "joined", room.name);
    return room;
  };

  // Keep's the ws connection alive on heroku (pings every 30s)
  // https://devcenter.heroku.com/articles/websockets#timeouts
  const pingPong = async () => {
    // Send ping to server
    await $roomStore.send("alivePing");
  };

  const handleRoom = async () => {
    // join Room
    const room = await joinRoom();

    // store room object
    $roomStore = room;

    // start ping pong
    pingPong();

    // listen to state change
    room.onStateChange((state) => {
      $roomState = state;
      console.log($roomState);
    });

    // listen to alivePong
    room.onMessage("alivePong", () => {
      // send alivePing back
      pingPong();
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
      <Carousel
        imgs={[...$roomState.currentProduct.imgs.$items.get(0).mediumImgs]}
      />

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
        <BtnSubmit />
      {/if}
    {/if}
  {/if}

  <PlayerBoard />
</main>

<style>
</style>
