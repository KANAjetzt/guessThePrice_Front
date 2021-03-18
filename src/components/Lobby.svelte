<script>
  import { roomState, roomStore, appStore } from "../stores";

  import PlayerList from "./PlayerList.svelte";
  import GameSettings from "./GameSettings.svelte";
  import BtnPannel from "./BtnPannel.svelte";
  import BtnInviteLink from "./BtnInviteLink.svelte";
  import BtnStart from "./BtnStart.svelte";
  import Loader from "./Loader.svelte";

  const startGame = async () => {
    console.log("starting Game!");
    await $roomStore.send("startGame");
  };
</script>

{#if $roomState}
  <div class="lobby">
    <PlayerList />
    <GameSettings />
    <BtnPannel>
      <BtnInviteLink />
      <BtnStart on:click={startGame} />
    </BtnPannel>
  </div>
{:else}
  <Loader style={"fullPageCentered"} />
{/if}

<style>
  .lobby {
    height: 100vh;
    display: grid;
    grid-template-rows: min-content 1fr min-content;
    align-items: center;
  }
</style>
