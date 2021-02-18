<script>
  import { onMount } from "svelte";
  import AutoNumeric from "AutoNumeric";
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
    console.log(e.detail);
    $appStore.guessedPrice = e.detail.newValue;
  }}
  bind:value={$appStore.guessedPrice}
/>
