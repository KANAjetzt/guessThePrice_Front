<script>
  import { roomState, roomStore, appStore } from "../stores";
  import BtnReload from "./BtnReload.svelte";

  export let showBtnReload = false;
  export let style = {
    // smallBorder / gameEnd
    avatar: "",
    // playerCard
    border: "",
  };
  export let img = undefined;

  const handleReload = async () => {
    // Send avatar cange message to BE
    await $roomStore.send("avatarChange");
  };
</script>

<div
  class={$appStore.currentRoom === "gameEnd"
    ? `border border--${style.border}`
    : "border--noBorder"}
>
  <div
    class={`avatar ${
      style.avatar.split(" ").length > 1
        ? style.avatar.split(" ").join(" avatar--")
        : `avatar avatar--${style.avatar}`
    }`}
  >
    <img
      class="avatarImg"
      src={img ? img : $appStore.currentPlayer.avatar}
      alt=""
    />
    {#if showBtnReload}
      <div class="btnReload">
        <BtnReload on:click={handleReload} />
      </div>
    {/if}
  </div>
</div>

<style>
  .avatar {
    position: relative;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 0 3px var(--color-2);
    border-radius: 100%;
    background-color: var(--color-1-alpha5);
  }
  .avatar--smallBorder {
    box-shadow: 0 0 0 2px var(--color-2);
  }
  .avatar--gameEnd {
    box-shadow: unset;
  }

  .border {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    padding: 1rem;
    position: relative;
    background-image: var(--color-gradient-2);
    padding: 0.3rem;
    filter: drop-shadow(var(--shadow-1--color1));
  }

  .border--playerCard {
    padding: 0.2rem;
  }

  .border--noBorder {
    width: 100%;
    height: 100%;
  }

  .avatarImg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    height: 100%;
  }

  .btnReload {
    position: absolute;
    bottom: -1rem;
    right: -1rem;
  }
</style>
