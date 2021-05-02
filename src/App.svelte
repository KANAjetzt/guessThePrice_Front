<script>
  import { onMount } from "svelte";
  import { roomStore, roomState, appStore } from "./stores";
  import RoomHandler from "./components/RoomHandler.svelte";
  import CharacterCreation from "./components/CharacterCreation.svelte";
  import Lobby from "./components/Lobby.svelte";
  import Game from "./components/Game.svelte";
  import BetweenRounds from "./components/BetweenRounds.svelte";
  import GameEnd from "./components/GameEnd.svelte";
  import PageTransition from "./components/PageTransition.svelte";
  import DSGVO from "./components/DSGVO.svelte";
  import MakeSure from "./components/MakeSure.svelte";
  import Footer from "./components/Footer.svelte";

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

    // Check if subgrid is supported
    $appStore.subgridSupported = CSS.supports(
      "grid-template-columns",
      "subgrid"
    );
  });
</script>

<RoomHandler bind:this={roomHandler} />

<!-- Modals -->
<DSGVO />
<MakeSure />

{#if roomHandler}
  {#if $appStore.currentRoom === "characterCreation"}
    <PageTransition>
      <CharacterCreation />
    </PageTransition>
  {/if}
  {#if $appStore.currentRoom === "lobby"}
    <PageTransition>
      <Lobby />
    </PageTransition>
  {/if}
  {#if $appStore.currentRoom === "game"}
    <PageTransition>
      <Game />
    </PageTransition>
  {/if}

  {#if $appStore.currentRoom === "betweenRounds"}
    <PageTransition>
      <BetweenRounds />
    </PageTransition>
  {/if}

  {#if $appStore.currentRoom === "gameEnd"}
    <PageTransition>
      <GameEnd />
    </PageTransition>
  {/if}
{/if}
<Footer />
