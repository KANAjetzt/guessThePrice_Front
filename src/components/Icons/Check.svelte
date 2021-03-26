<script>
  import Icon from "./Icon.svelte";

  export let width = 14;
  export let height = 16;
  export let fill = "black";
  export let shadow = true;
</script>

<Icon {width} {height} {shadow}>
  <svg
    {width}
    {height}
    viewBox="0 0 14 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0 6.7L4.6 11.3L14 2L12 0L4.6 7.4L2 4.8L0 6.7ZM14 14H0V16H14V14Z"
      {fill}
      fill-opacity="0.54"
    />
  </svg>
</Icon>
