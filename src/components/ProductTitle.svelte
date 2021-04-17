<script>
  import { roomStore, roomState, appStore } from "../stores";
</script>

<div class="title">
  <h2>{$roomState.currentProduct.title}</h2>
</div>

<style>
  .title {
    background-image: var(--color-gradient-1--darker);
    padding: 1.2rem 1.4rem;
    box-shadow: var(--shadow-4);
    margin-bottom: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h2 {
    font-weight: 500;
    font-size: var(--heading-4);
  }
</style>
