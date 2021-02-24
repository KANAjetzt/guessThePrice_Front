<script>
  import * as Colyseus from "colyseus.js";

  import { onMount } from "svelte";

  import { roomStore, roomState, appStore } from "./stores";
  import PlayerBoard from "./components/PlayerBoard.svelte";
  import BtnSubmit from "./components/BtnSubmit.svelte";
  import Carousel from "./components/Carousel.svelte";
  import CurrencyInput from "./components/CurrencyInput.svelte";
  import Gallery from "./components/Gallery.svelte";
  import BetweenRounds from "./components/BetweenRounds.svelte";

  let clientWidth;
  $: $appStore.clientWidth = clientWidth;

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
        <Carousel
          imgs={[...$roomState.currentProduct.imgs.$items.get(0).mediumImgs]}
        />
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
        <BtnSubmit />
      {/if}
      <PlayerBoard />
    {/if}

    {#if $roomState.isBetweenRounds}
      <BetweenRounds />
    {/if}

    {#if $roomState.gameEnded}
      <PlayerBoard />
    {/if}
  {/if}
</main>

<style>
</style>
