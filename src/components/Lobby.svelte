<script>
  import { roomState, roomStore, appStore } from "../stores";

  import PlayerList from "./PlayerList.svelte";
  import GameSettings from "./GameSettings.svelte";
  import BtnPannel from "./BtnPannel.svelte";
  import BtnInviteLink from "./BtnInviteLink.svelte";
  import BtnStart from "./BtnStart.svelte";
  import Loader from "./Loader.svelte";

  const startGame = async () => {
    await $roomStore.send("startGame");
  };
</script>

{#if $roomState}
  <main class="lobby">
    <section class="playerList">
      <PlayerList />
    </section>
    <section class="gameSettings">
      <GameSettings />
    </section>
    <section class="btnPannel">
      <BtnPannel>
        <BtnInviteLink />
        <BtnStart
          on:click={startGame}
          disabled={!$appStore.currentPlayer.admin}
        />
      </BtnPannel>
    </section>
  </main>
{:else}
  <Loader style={"fullPageCentered"} />
{/if}

<style>
  .lobby {
    height: 100vh;
    display: grid;
    grid-template-rows: min-content 1fr min-content;
    grid-template-columns: max-content 1fr;
    align-items: center;
  }

  section {
    grid-column: 1 / 3;
  }

  .btnPannel {
    align-self: end;
  }

  @media only screen and (min-width: 80em) {
    .lobby {
      grid-template-rows: 1fr 1fr 1fr;
    }
    section {
      grid-column: 2 / 3;
    }

    .playerList {
      height: 100%;
      grid-column: 1 / 2;
      grid-row: 1 / -1;
    }

    .gameSettings {
      grid-row: 1 / 3;
    }
  }
</style>
