<script>
  import Icon from "./Icon.svelte";

  export let width = 18;
  export let height = 14;
  export let fill = "black";
  export let shadow = true;
</script>

<Icon {width} {height} {shadow}>
  <svg
    {width}
    {height}
    viewBox="0 0 18 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.79995 10.9L1.59995 6.7L0.199951 8.1L5.79995 13.7L17.8 1.7L16.4 0.300003L5.79995 10.9Z"
      {fill}
      fill-opacity="0.9"
    />
  </svg>
</Icon>
