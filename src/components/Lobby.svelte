<script>
  import { roomState, roomStore, appStore } from "../stores";

  import InviteLinkBtn from "./BtnInviteLink.svelte";
  import PlayerList from "./PlayerList.svelte";
  import PlayerBoard from "./PlayerBoard.svelte";
  import GameSettings from "./GameSettings.svelte";
  import Loader from "./Loader.svelte";

  const startGame = async () => {
    console.log("starting Game!");
    await $roomStore.send("startGame");
  };
</script>

{#if $roomState}
  <PlayerList />
  <!-- <InviteLinkBtn />
  <GameSettings /> -->
{:else}
  <Loader style={"fullPageCentered"} />
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
