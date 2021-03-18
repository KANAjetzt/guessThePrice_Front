<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<button class="btn" on:click={() => dispatch("click")}>
  <slot />
</button>

<style>
  .btn {
    position: relative;
    font-weight: 700;
    display: flex;
    justify-content: center;
    background-color: var(--color-3);
    border: none;
    border-radius: 3px;
    padding: 1.2rem 0;
    width: 15rem;
    text-transform: uppercase;
  }
</style>
