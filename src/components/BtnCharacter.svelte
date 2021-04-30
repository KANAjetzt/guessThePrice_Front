<script>
  import { roomStore, roomState, appStore } from "../stores";
  import HappySmileyArrow from "./Icons/HappySmileyArrow.svelte";

  export let style = "";
</script>

<button
  class={`characterBtn characterBtn--${style}`}
  on:click={() => {
    $appStore.currentRoom = "characterCreation";
  }}
>
  <div class="icon">
    <HappySmileyArrow width={18} height={15} fill={"black"} />
  </div>
</button>

<style>
  .characterBtn {
    position: relative;
    width: 4rem;
    height: 4rem;
    border-radius: 100%;
    border: none;
    background-color: var(--color-3);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  .characterBtn--avatar {
    width: 2.5rem;
    height: 2.5rem;
  }

  .characterBtn:hover,
  .characterBtn:focus {
    transform: translateY(-0.2rem);
    filter: drop-shadow(var(--shadow-1--color1));
  }

  .icon {
    position: absolute;
    top: 55%;
    left: 52%;
    transform: translate(-50%, -50%);
  }
</style>
