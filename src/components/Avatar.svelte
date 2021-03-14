<script>
  import { roomState, roomStore, appStore } from "../stores";
  import BtnReload from "./BtnReload.svelte";

  export let showBtnReload = false;
  export let style = "";
  export let img = $appStore.currentPlayer.avatar;

  const handleReload = async () => {
    // Send avatar cange message to BE
    await $roomStore.send("avatarChange");
  };
</script>

<div class="avatar {style}">
  <img class="avatarImg" src={img} alt="" />
  {#if showBtnReload}
    <div class="btnReload">
      <BtnReload on:click={handleReload} />
    </div>
  {/if}
</div>

<style>
  .avatar {
    position: relative;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 0 3px var(--color-2);
    border-radius: 100%;
  }

  .lobby {
    box-shadow: 0 0 0 2px var(--color-2);
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
    right: -2rem;
  }
</style>
