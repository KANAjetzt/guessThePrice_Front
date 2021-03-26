<script>
  import { roomStore, roomState, appStore, sortedPlayers } from "../stores";
  import Avatar from "./Avatar.svelte";
  import BtnDefault from "./BtnDefault.svelte";
  import BtnPannel from "./BtnPannel.svelte";
  import BtnStart from "./BtnStart.svelte";
  import PreviousIcon from "./Icons/Previous.svelte";
  import PlayerBoard from "./PlayerBoard.svelte";
  import RoomHandler from "./RoomHandler.svelte";

  let roomHandler;
  let winner = undefined;
  let difference = 0;

  roomState.subscribe((data) => {
    winner = data.playerStates.filter((player) => player.winner)[0];
  });

  $: if (winner) {
    if ($sortedPlayers[1]) {
      difference = $sortedPlayers[0].score - $sortedPlayers[1].score;
    }
  }

  const handleBackToHomepage = async () => {
    // leav current room
    $roomStore.leave();
    // Connect again
    await roomHandler.handleRoom();
    // Go to CharacterCreation
    $appStore.currentRoom = "characterCreation";
  };

  const handleRestart = async () => {
    await $roomStore.send("restartGame");

    // go back to lobby
    $appStore.currentRoom = "lobby";
  };
</script>

<RoomHandler bind:this={roomHandler} />
{#if winner}
  <main class="gameEnd">
    <div class="winner">
      <div class="avatar">
        <Avatar
          img={winner.avatar}
          style={{ avatar: "gameEnd", border: "gameEnd" }}
        />
      </div>
      <caption class="name">{winner.name}</caption>

      <div class="stats">
        <p>{winner.score} Punkte</p>
        <p>{winner.avgPrecision * 100}% Genauigkeit</p>
        {#if difference}
          <p>
            {$sortedPlayers[0].score - $sortedPlayers[1].score} Punkte abstand
          </p>
        {/if}
      </div>
    </div>
    <div class="playerBoard">
      <PlayerBoard />
    </div>
    <div class="btnPannel">
      <BtnPannel>
        <BtnDefault on:click={handleBackToHomepage}>
          <div class="previousIcon">
            <PreviousIcon />
          </div>
          <span>STARTSEITE</span>
        </BtnDefault>
        <BtnStart on:click={handleRestart} />
      </BtnPannel>
    </div>
  </main>
{/if}

<style>
  .gameEnd {
    display: grid;
    grid-template-rows: 1fr max-content max-content;
    align-items: center;
    justify-items: center;
    min-height: 100vh;
    background-image: var(--color-gradient-1--veryDark);
  }
  .winner {
    display: flex;
    flex-direction: column;
  }
  .avatar {
    width: 17rem;
    height: 17rem;
    align-self: center;
  }

  .name {
    margin: 1rem 0 2.5rem 0;
    font-weight: bold;
    font-size: var(--heading-2);
    letter-spacing: 5px;
    filter: drop-shadow(var(--shadow-1--color1));
    background-image: var(--color-gradient-2);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-stroke: 4px transparent;
    color: rgb(0 0 0 / 60%);
  }

  .stats {
    display: grid;
    grid-template-columns: 1fr max-content 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }

  .stats p {
    grid-column: 2 / 3;
    font-size: var(--heading-3);
    font-weight: 300;
    filter: drop-shadow(var(--shadow-1--color1));
  }
  .stats p:first-child {
    font-weight: 500;
  }
  .playerBoard {
    width: 100%;
  }
  .btnPannel {
    width: 100%;
    margin-top: 0.4rem;
  }
  .previousIcon {
    position: absolute;
    left: 0.6rem;
  }
</style>
