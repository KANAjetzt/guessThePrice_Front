<script>
  export let style = "";
</script>

<div class={`btnPannel btnPannel--${style}`}>
  <slot />
</div>

<style>
  .btnPannel {
    padding: 2rem 2rem 2rem 2rem;
    display: grid;
    grid-template-columns: max-content 1fr;
    align-items: center;
    justify-content: center;
    background-image: var(--color-gradient-1--90deg);
    box-shadow: var(--shadow-3--negative);
    row-gap: 3rem;
  }

  @media only screen and (min-width: 40em) {
    .btnPannel {
      padding: 2rem 2rem 3rem 2rem;
      row-gap: unset;
    }
  }

  .btnPannel--gameEnd {
    grid-column: 1 / 3;
    grid-row: 3 / 4;
    background-image: unset;
    box-shadow: unset;
    padding: 2rem 2rem 3rem 2rem;
    row-gap: unset;
    column-gap: 1rem;
  }

  .btnPannel--winnerSingle {
    grid-column: 1 / 3;
    grid-row: 3 / 4;
    background-image: unset;
    box-shadow: unset;
    padding: 2rem 2rem 3rem 2rem;
    row-gap: unset;
    column-gap: 1rem;
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
