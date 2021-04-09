<script>
  export let cent;

  const handleEuro = (cent) => {
    return parseFloat(cent / 100).toFixed(2);
  };
</script>

{`${handleEuro(cent)}€`}
