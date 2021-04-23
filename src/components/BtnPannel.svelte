<script>
  export let style = "";
</script>

<div class={`btnPannel btnPannel--${style}`}>
  <slot />
</div>

<style>
  .btnPannel {
    padding: 2rem 0 3rem 0;
    display: grid;
    grid-template-columns: max-content max-content;
    justify-content: center;
    gap: 1rem;
    background-image: var(--color-gradient-1--90deg);
    box-shadow: var(--shadow-3--negative);
  }

  .btnPannel--gameEnd {
    grid-column: 1 / 3;
    grid-row: 3 / 4;
    background-image: unset;
    box-shadow: unset;
  }

  .btnPannel--winnerSingle {
    grid-column: 1 / 3;
    grid-row: 3 / 4;
    background-image: unset;
    box-shadow: unset;
  }

  @media only screen and (min-width: 80em) {
    .btnPannel--gameEnd {
      grid-column: 2 / 3;
      grid-row: 3 / 4;
    }

    .btnPannel--winnerSingle {
      grid-column: 1 / 3;
      grid-row: 3 / 4;
    }
  }
</style>
