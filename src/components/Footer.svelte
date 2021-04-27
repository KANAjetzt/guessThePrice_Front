<script>
  import { roomStore, roomState, appStore } from "../stores";
</script>

<footer>
  <button
    on:click={() => {
      $appStore.DSGVOisOpen = true;
    }}>Datenschutz</button
  >
</footer>

<style>
  footer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1.4rem 1rem 1.4rem;
  }

  button {
    border: none;
    background: transparent;
    color: var(--color-font-1);
    cursor: pointer;
  }
</style>
