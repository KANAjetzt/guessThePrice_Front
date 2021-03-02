<script>
  import { onMount } from "svelte";
  import App from "../App.svelte";
  import { roomState, roomStore, appStore } from "../stores";
  import PlayerBoard from "./PlayerBoard.svelte";

  let lobbyUrl;

  $: if ($roomState) {
    lobbyUrl = `${window.location.host}/?c=${$roomStore.id}`;
  }

  const startGame = async () => {
    console.log("starting Game!");
    await $roomStore.send("startGame");

    // Switch View
    $appStore.currentRoom = "game";
  };
</script>

{#if $roomState}
  <button on:click={startGame}> Play! </button>

  <label for="lobbyUrl">Invite Link</label>
  <input name="lobbyUrl" id="lobbyUrl" type="text" bind:value={lobbyUrl} />

  <PlayerBoard store={roomState} />
{:else}
  <p>loading...</p>
{/if}
