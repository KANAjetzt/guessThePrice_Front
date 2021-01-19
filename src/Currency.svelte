<script>
  export let cent;

  const handleEuro = cent => {
    return cent / 100;
  };
</script>

{`${handleEuro(cent)}€`}
