<script>
  import { onMount } from "svelte";
  import { roomStore, roomState, appStore } from "./stores";
  import Head from "./components/Head.svelte";
  import RoomHandler from "./components/RoomHandler.svelte";
  import CharacterCreation from "./components/CharacterCreation.svelte";
  import Lobby from "./components/Lobby.svelte";
  import Game from "./components/Game.svelte";
  import BetweenRounds from "./components/BetweenRounds.svelte";
  import GameEnd from "./components/GameEnd.svelte";

  let roomHandler;

  // Switch view if game has started
  $: if ($roomState) {
    // Change currentRoom in appStore to game so the game comp is mounted
    if ($roomState.isGameRestarted) {
      $appStore.currentRoom = "lobby";
    }

    if ($roomState.isProductsLoaded) {
      $appStore.currentRoom = "game";
    }

    if ($roomState.isBetweenRounds) {
      $appStore.currentRoom = "betweenRounds";
    }

    if ($roomState.gameEnded) {
      $appStore.currentRoom = "gameEnd";
    }

    // Set currentPlayer in appStore
    /* 
      If the user is clicking on "back to Homepage",
      handleBackToHomepage() on GameEnd leaves the current room
      and connects to a new one.
      Problem is the currentPlayer update is triggerd bevore 
      the roomState is here so the filter retuns nothing.
    */

    if ($roomState.playerStates) {
      const currentPlayer = [...$roomState.playerStates.$items].filter(
        (player) => player[1].id === $roomStore.sessionId
      );

      if (currentPlayer[0]) {
        $appStore.currentPlayer = currentPlayer[0][1];
      }
    }
  }

  onMount(async () => {
    // Connect to game room and listen for state change
    await roomHandler.handleRoom();
  });
</script>

<Head />

<RoomHandler bind:this={roomHandler} />
{#if roomHandler}
  {#if $appStore.currentRoom === "characterCreation"}
    <CharacterCreation />
  {/if}
  {#if $appStore.currentRoom === "lobby"}
    <Lobby />
  {/if}
  {#if $appStore.currentRoom === "game"}
    <Game />
  {/if}

  {#if $appStore.currentRoom === "betweenRounds"}
    <BetweenRounds />
  {/if}

  {#if $appStore.currentRoom === "gameEnd"}
    <GameEnd />
  {/if}
{/if}
