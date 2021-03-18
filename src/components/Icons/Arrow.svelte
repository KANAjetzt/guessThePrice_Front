<script>
  import Icon from "./Icon.svelte";

  export let width;
  export let height;
  export let fill;
  export let shadow = true;
</script>

<Icon {width} {height} {shadow}>
  <svg
    {width}
    {height}
    viewBox="0 0 12 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.41 0.295044L6 4.87504L10.59 0.295044L12 1.70504L6 7.70504L0 1.70504L1.41 0.295044Z"
      {fill}
    />
  </svg>
</Icon>
