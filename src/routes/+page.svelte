<script lang=ts>
  import {GlowButton} from "$lib/index.js";
  let button_text = "Click Me!";
</script>
<div style="display: flex; gap: 100px; width: 100vw; height: 100vh; align-items: center; justify-content: center;">
    <GlowButton on:click={() => {
      button_text = "Cool!";
      setTimeout(() => button_text = "Click Me!", 500);
    }} style="padding: 5px 20px;">{button_text}</GlowButton>
</div>
<style>
  :global(body) {
    background: hsl(0 0% 4%);
    color: white;
    font-family: sans-serif;
  }
</style>
