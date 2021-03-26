<div class="btnPannel">
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
</style>
