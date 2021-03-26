<script>
  import Icon from "./Icon.svelte";

  export let width = 12;
  export let height = 12;
  export let fill = "black";
  export let shadow = true;
</script>

<Icon {width} {height} {shadow}>
  <svg
    {width}
    {height}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0 0H2V12H0V0ZM3.5 6L12 12V0L3.5 6ZM6.97 6L10 8.14V3.86L6.97 6Z"
      {fill}
      fill-opacity="0.54"
    />
  </svg>
</Icon>
