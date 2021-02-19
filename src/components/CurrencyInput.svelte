<script>
  import { onMount } from "svelte";
  import AutoNumeric from "autonumeric";
  import { appStore } from "../stores";

  onMount(() => {
    new AutoNumeric(".guessedPriceInput", {
      currencySymbol: "€",
      currencySymbolPlacement: "s",
      decimalPlaces: 2,
      minimumValue: 0,
    });
  });
</script>

<input
  style={``}
  type="text"
  class="guessedPriceInput"
  on:autoNumeric:formatted={(e) => {
    $appStore.guessedPrice = e.detail.newValue;
  }}
  bind:value={$appStore.guessedPrice}
/>
