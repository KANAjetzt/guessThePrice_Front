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
  <GameSettings />
  <!-- <InviteLinkBtn /> -->
{:else}
  <Loader style={"fullPageCentered"} />
{/if}
