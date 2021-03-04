<script>
  import { roomState, roomStore, appStore } from "../stores";
  import PlayerCreation from "./PlayerCreation.svelte";
  import InviteLinkBtn from "./BtnInviteLink.svelte";
  import PlayerBoard from "./PlayerBoard.svelte";

  const startGame = async () => {
    console.log("starting Game!");
    await $roomStore.send("startGame");
  };
</script>

{#if $roomState}
  <div class="inviteLink">
    <InviteLinkBtn />
  </div>

  <div class="playerCreation">
    <PlayerCreation />
  </div>

  <button class="startBtn" on:click={startGame}> Play! </button>

  <PlayerBoard />
{:else}
  <p>loading...</p>
{/if}

<style>
  .inviteLink {
    display: flex;
    flex-direction: column;
    padding: 2rem;
  }
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
