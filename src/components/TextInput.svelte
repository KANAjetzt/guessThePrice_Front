<script>
  export let value;
</script>

<div class="border">
  <input class="input" type="text" bind:value />
</div>

<style>
  .border {
    padding: 1rem;
    position: relative;
    background-image: var(--color-gradient-2);
    padding: 0.2rem;
    border-radius: 3px;
  }

  .input {
    position: relative;
    font-weight: bold;
    padding: 1rem 1.5rem;
    background-color: var(--color-1-alpha8);
    border: none;
    z-index: 2;
    transition: all 0.2s ease-in-out;
  }

  .input:hover,
  .input:focus {
    filter: contrast(1.5);
  }
</style>
