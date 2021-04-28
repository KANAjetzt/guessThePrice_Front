<script>
  import { fly } from "svelte/transition";
  import { roomState, roomStore, appStore } from "../stores";
  import BtnReload from "./BtnReload.svelte";
  import BtnExit from "./BtnExit.svelte";
  import Check2 from "./Icons/Check2.svelte";
  import WifiOff from "./Icons/WifiOff.svelte";

  export let showCheckIcon = false;
  export let showDisconnectedIcon = false;
  export let showBtnReload = false;
  export let showBtnExit = false;
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
    {#if showCheckIcon}
      <div class="checkIcon" in:fly|local={{ duration: 200, x: -50 }}>
        <Check2 shadow={false} fill={"#23c7d9"} />
      </div>
    {/if}
    {#if showDisconnectedIcon}
      <div class="disconnectedIcon" in:fly|local={{ duration: 200, x: -50 }}>
        <WifiOff shadow={false} fill={"#23c7d9"} />
      </div>
    {/if}
    {#if showBtnExit}
      <div class="btnExit">
        <BtnExit style={"avatar"} />
      </div>
    {/if}
  </div>
</div>

<style>
  .avatar {
    position: relative;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 0 0.3rem var(--color-2);
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

  .checkIcon {
    position: absolute;
    bottom: -0.3rem;
    right: -2.3rem;
  }

  .disconnectedIcon {
    position: absolute;
    bottom: -0.3rem;
    left: -1.7rem;
  }

  @media only screen and (min-width: 62.5em) {
    .checkIcon {
      transform: scale(1.5);
    }
  }

  @media only screen and (min-width: 120em) {
    .checkIcon {
      transform: scale(2);
    }
  }

  .btnReload {
    position: absolute;
    bottom: -1rem;
    right: -1rem;
  }
  .btnExit {
    position: absolute;
    bottom: -1rem;
    left: -1rem;
  }
</style>
