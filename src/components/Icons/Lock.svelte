<script>
  import Icon from "./Icon.svelte";

  export let width = 7;
  export let height = 10;
  export let fill = "black";
  export let shadow = true;
</script>

<Icon {width} {height} {shadow}>
  <svg
    {width}
    {height}
    viewBox="0 0 7 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6 3V3.5C6.55 3.5 7 3.95 7 4.5V8.5C7 9.05 6.55 9.5 6 9.5H1C0.45 9.5 0 9.05 0 8.5V4.5C0 3.95 0.45 3.5 1 3.5V3C1 1.62 2.12 0.5 3.5 0.5C4.88 0.5 6 1.62 6 3ZM2 3.5H5V3C5 2.17 4.33 1.5 3.5 1.5C2.67 1.5 2 2.17 2 3V3.5Z"
      {fill}
      fill-opacity="0.54"
    />
  </svg>
</Icon>
