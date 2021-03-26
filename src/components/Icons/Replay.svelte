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
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.7571 23.5076L26.2668 27.5176L16.8672 26.8922L17.4926 17.4927L21.0023 21.5026C24.3206 18.5984 24.6571 13.5414 21.7528 10.2231C18.8485 6.90487 13.7916 6.56841 10.4733 9.47266C7.15503 12.3769 6.81856 17.4339 9.72281 20.7522L7.71781 22.507C3.83963 18.0759 4.28742 11.3458 8.71846 7.46766C13.1495 3.58947 19.8796 4.03726 23.7578 8.46831C27.636 12.8994 27.1882 19.6295 22.7571 23.5076Z"
      {fill}
      fill-opacity="0.54"
    />
  </svg>
</Icon>
