<script>
  import { roomState, roomStore, appStore } from "../stores";
  import PlayerCreation from "./PlayerCreation.svelte";
  import InviteLinkBtn from "./BtnInviteLink.svelte";
  import PlayerBoard from "./PlayerBoard.svelte";
  import GameSettings from "./GameSettings.svelte";

  const startGame = async () => {
    console.log("starting Game!");
    await $roomStore.send("startGame");
  };
</script>

{#if $roomState}
  <div class="playerCreation">
    <PlayerCreation />
  </div>

  <button class="startBtn" on:click={startGame}> Play! </button>
{:else}
  <p>loading...</p>
{/if}

<style>
  .playerCreation {
    padding: 2rem;
  }
  .startBtn {
    font-weight: 700;
    display: block;
    margin: 2rem auto 2rem auto;
    padding: 1rem 2rem;
  }
</style>
