<script>
  import { roomState, roomStore, appStore } from "../stores";
  import Avatar from "./Avatar.svelte";
</script>

<div class="playerList">
  {#each [...$roomState.playerStates.$items].map((player) => player[1]) as player}
    <div class="player">
      <div class="avatar">
        <Avatar
          style={{ avatar: "smallBorder", border: "" }}
          img={player.avatar}
        />
      </div>
      <caption class="name">{player.name}</caption>
    </div>
  {/each}
</div>

<style>
  .playerList {
    width: 100%;
    background-image: var(--color-gradient-1--90deg);
    box-shadow: var(--shadow-3);
    display: flex;
    overflow-x: auto;
    padding: 1.2rem 1rem 0.8rem 1rem;
  }

  .player {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    width: 10rem;
  }
  .avatar {
    width: 5.3rem;
    height: 5.3rem;
  }
  .name {
    margin-top: 1rem;
    font-weight: 500;
    font-size: var(--smallFontSize);
  }

  @media only screen and (min-width: 80em) {
    .playerList {
      width: 100%;
      height: 100%;
      flex-direction: column;
    }
  }
</style>
