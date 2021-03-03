<script>
  import { roomState, roomStore, appStore } from "../stores";
  import PlayerCreation from "./PlayerCreation.svelte";
  import PlayerBoard from "./PlayerBoard.svelte";

  let lobbyUrl;

  $: if ($roomState) {
    lobbyUrl = `${window.location.host}/?c=${$roomStore.id}`;
  }

  const startGame = async () => {
    console.log("starting Game!");
    await $roomStore.send("startGame");
  };
</script>

{#if $roomState}
  <button on:click={startGame}> Play! </button>

  <label for="lobbyUrl">Invite Link</label>
  <input name="lobbyUrl" id="lobbyUrl" type="text" bind:value={lobbyUrl} />

  <PlayerCreation />

  <PlayerBoard store={roomState} />
{:else}
  <p>loading...</p>
{/if}
