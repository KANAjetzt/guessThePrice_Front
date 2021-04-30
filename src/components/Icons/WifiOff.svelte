<script>
  import Icon from "./Icon.svelte";

  export let width = 22;
  export let height = 20;
  export let fill = "black";
  export let shadow = true;
</script>

<Icon {width} {height} {shadow}>
  <svg
    {width}
    {height}
    viewBox="0 0 22 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1 2.22L2.41003 0.809998L19.38 17.78L17.97 19.19L10.89 12.11C9.10999 12.13 7.34998 12.82 6 14.17L4 12.17C5.27002 10.91 6.79004 10.06 8.41003 9.63L6.17004 7.39C4.65002 8.00999 3.22998 8.93999 2 10.17L0 8.17C1.21997 6.96 2.58997 6 4.05005 5.27L1 2.22ZM22 8.17L20 10.17C17.49 7.66 14.1801 6.42 10.88 6.44L8.30005 3.86C13.13 3.02 18.27 4.44 22 8.17ZM14.28 9.84C15.64 10.32 16.92 11.09 18 12.17L17.3 12.86L14.28 9.84ZM8 16.17L11 19.17L14 16.17C12.35 14.51 9.66003 14.51 8 16.17Z"
      {fill}
      fill-opacity="0.9"
    />
  </svg>
</Icon>
