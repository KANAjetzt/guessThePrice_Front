<script>
  import { roomState, roomStore, appStore } from "../stores";

  import PlayerList from "./PlayerList.svelte";
  import GameSettings from "./GameSettings.svelte";
  import BtnPannel from "./BtnPannel.svelte";
  import BtnInviteLink from "./BtnInviteLink.svelte";
  import BtnStart from "./BtnStart.svelte";
  import Loader from "./Loader.svelte";
  import BtnExit from "./BtnExit.svelte";
  import BtnCharacter from "./BtnCharacter.svelte";

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
        <div class="btnSecondary">
          <BtnExit />
          <BtnCharacter />
        </div>
        <div class="btnMain">
          <BtnInviteLink />
          <BtnStart
            on:click={startGame}
            disabled={!$appStore.currentPlayer.admin}
          />
        </div>
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

  .btnSecondary {
    display: grid;
    grid-template-columns: max-content max-content;
    column-gap: 1rem;
    grid-column: 1 / 3;
    grid-row: 2 / 3;
    justify-self: center;
  }

  @media only screen and (min-width: 40em) {
    .btnSecondary {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
      justify-self: center;
    }
  }

  .btnMain {
    display: grid;
    grid-template-columns: max-content max-content;
    column-gap: 1rem;
    justify-self: center;
    grid-column: 1 / 3;
  }

  @media only screen and (min-width: 40em) {
    .btnMain {
      justify-self: center;
      grid-column: 2 / 3;
    }
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
