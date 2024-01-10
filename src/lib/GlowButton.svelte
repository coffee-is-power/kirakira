<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { use_pointer, drop_pointer } from "./mouse_listener.js";
  onMount(use_pointer);
  onDestroy(drop_pointer);
</script>

<button class="glow-button" {...$$props} on:click>
  <div class="glow-button"/>
  <slot/>
</button>
<style>
  *,
  *:after,
  *:before {
  	box-sizing: border-box;
  }
  /* Glow specific styles */
  .glow-button {
    color: white;
    --border-size: calc(var(--border, 2) * 1px);
    --spotlight-size: calc(var(--size, 200) * 1px);
    --hue: calc(var(--base, 80) + (var(--xp, 0) * var(--spread, 500)));
    background-image: radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
    );
    background-color: var(--backdrop, hsl(0 0% 60% / 0.12));
    background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
    background-position: 50% 50%;
    background-attachment: fixed;
    border: var(--border-size) solid var(--backup-border, var(--backdrop, hsl(0% 0% 60% / 0.12)));
    position: relative;
    touch-action: none;
    border-radius: calc(var(--radius, 14) * 1px);
    padding: 4px;
    display: inline-block;
    cursor: pointer;
  }
  .glow-button::before,
  .glow-button::after {
    pointer-events: none;
    content: "";
    position: absolute;
    inset: calc(var(--border-size) * -1);
    border: var(--border-size) solid transparent;
    border-radius: calc(var(--radius, 14) * 1px);
    background-attachment: fixed;
    background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
    background-repeat: no-repeat;
    background-position: 50% 50%;
    mask:
      linear-gradient(transparent, transparent),
      linear-gradient(white, white);
    mask-clip: padding-box, border-box;
    mask-composite: intersect;
  }

  /* This is the emphasis light */
  .glow-button::before {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
    );
    filter: brightness(2);
  }
  /* This is the spotlight */
  .glow-button::after {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
    );
  }
  .glow-button .glow-button {
    position: absolute;
    inset: 0;
    will-change: filter;
    opacity: var(--outer, 1);
  }
  .glow-button > .glow-button {
    border-radius: calc(var(--radius, 14) * 1px);
    border-width: calc(var(--border-size) * 20);
    filter: blur(calc(var(--border-size) * 10));
    background: none;
    pointer-events: none;
  }
  .glow-button > .glow-button::before {
    inset: -10px;
    border-width: 10px;
  }
  .glow-button .glow-button {
    border: none;
  }
  .glow-button :is(a, button) {
    border-radius: calc(var(--radius, 14) * 1px);
    border: var(--border-size) solid transparent;
  }
  .glow-button :is(a, button) .glow-button {
    background: none;
  }
  .glow-button :is(a, button) .glow-button::before {
    inset: calc(var(--border-size) * -1);
    border-width: calc(var(--border-size) * 1);
  }
</style>
