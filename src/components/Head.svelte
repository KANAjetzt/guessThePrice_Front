<script>
// JS is not executed by crawlers
// Maybe there is a way to make this work with netlify pre rendering or netlify functions
// For now I just slap all of it right in the index.html

  const title = "Preis Schätz Spiel";
  const description =
    "Das Online-Preisschätzspiel! Spiele das beliebte Spiel jetzt kostenlos!";
  const img =
    "https://res.cloudinary.com/kana/image/upload/e_improve,w_500,h_500/v1617973537/guessThePrice/Fafficon_c3j8xb.png";
</script>

<svelte:head>



  <title>{title}</title>

  <!-- Primary Meta Tags -->
  <meta name="title" content={title} />
  <meta name="description" content={description} />

  <!-- Favicon -->
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
  <meta name="msapplication-TileColor" content="#2d89ef" />
  <meta name="theme-color" content="#203c73" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={window.location.href} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image:width" content={500} />
  <meta property="og:image:height" content={500} />
  <meta property="og:image" content={img} />
  <meta property="og:image:secure_url" content={img} />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={window.location.href} />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content={img} />
</svelte:head>
