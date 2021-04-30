<script>
  import { roomStore, roomState, appStore } from "../stores";
  import RunningIcon from "./Icons/Running.svelte";

  export let style = "";
</script>

<button
  class={`exitBtn exitBtn--${style}`}
  on:click={() => {
    $appStore.makeSureIsOpen = true;
  }}
>
  <div class="icon">
    <RunningIcon width={12} height={18} fill={"black"} />
  </div>
</button>

<style>
  .exitBtn {
    position: relative;
    width: 4rem;
    height: 4rem;
    border-radius: 100%;
    border: none;
    background-color: var(--color-3);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  .exitBtn--avatar {
    width: 2.5rem;
    height: 2.5rem;
  }

  .exitBtn:hover,
  .exitBtn:focus {
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
