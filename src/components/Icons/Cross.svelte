<script>
  import Icon from "./Icon.svelte";

  export let width = 10;
  export let height = 10;
  export let fill = "black";
  export let shadow = true;
</script>

<Icon {width} {height} {shadow}>
  <svg
    {width}
    {height}
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.08329 1.73913L8.26079 0.916626L4.99996 4.17746L1.73913
      0.916626L0.916626 1.73913L4.17746 4.99996L0.916626 8.26079L1.73913
      9.08329L4.99996 5.82246L8.26079 9.08329L9.08329 8.26079L5.82246
      4.99996L9.08329 1.73913Z"
      {fill}
      fill-opacity="0.9"
    />
  </svg>
</Icon>
