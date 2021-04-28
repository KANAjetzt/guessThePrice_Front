<script>
  import Icon from "./Icon.svelte";

  export let width = 29;
  export let height = 20;
  export let fill = "black";
  export let shadow = true;
</script>

<Icon {width} {height} {shadow}>
  <svg
    {width}
    {height}
    viewBox="0 0 29 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18.99 0C13.47 0 9 4.48 9 10C9 15.52 13.47 20 18.99 20C24.52 20 29 15.52 29 10C29 4.48 24.52 0 18.99 0ZM19 18C14.58 18 11 14.42 11 10C11 5.58 14.58 2 19 2C23.42 2 27 5.58 27 10C27 14.42 23.42 18 19 18ZM24 7.5C24 8.33 23.33 9 22.5 9C21.67 9 21 8.33 21 7.5C21 6.67 21.67 6 22.5 6C23.33 6 24 6.67 24 7.5ZM15.5 9C16.33 9 17 8.33 17 7.5C17 6.67 16.33 6 15.5 6C14.67 6 14 6.67 14 7.5C14 8.33 14.67 9 15.5 9ZM24.11 12C23.31 14.04 21.33 15.5 19 15.5C16.67 15.5 14.69 14.04 13.89 12H24.11Z"
      {fill}
      fill-opacity="0.54"
    />
    <path d="M5 5L0 10L5 15V5Z" {fill} fill-opacity="0.54" />
  </svg>
</Icon>
