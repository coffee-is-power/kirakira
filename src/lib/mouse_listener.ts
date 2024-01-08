
import { writable } from 'svelte/store';

// Writable store to track the reference count
const reference_count = writable(0);
// Function to update CSS variables
const sync_pointer = ({ clientX, clientY }: MouseEvent) => {
    let x = clientX.toFixed(2);
    let xp = (clientX / window.innerWidth).toFixed(2);
    let y = clientY.toFixed(2);
    let yp = (clientY / window.innerHeight).toFixed(2);

    // Set CSS variables
    document.documentElement.style.setProperty('--x', x);
    document.documentElement.style.setProperty('--xp', xp);
    document.documentElement.style.setProperty('--y', y);
    document.documentElement.style.setProperty('--yp', yp);
};
/// Increments pointer reference counter
export function use_pointer() {
    reference_count.update((count) => {
      // Check if the event listener is already set up
      if (count == 0) {
        window.addEventListener('pointermove', sync_pointer);
      }
      return count + 1;
    });
};
/// Decrements pointer reference counter
export function drop_pointer() {
    reference_count.update((count) => {
      // If there are no more active instances, remove the event listener
      if (count === 1) {
        window.removeEventListener('pointermove', sync_pointer);
      }
      return count - 1;
    });
}
