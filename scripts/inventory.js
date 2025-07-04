function setupInventoryDragAndDrop() {
    const inventory = document.getElementById('inventory-preview');
    if (!inventory) return;

    const draggableItem = inventory.querySelector('.inventory-draggable');
    const dropTargets = inventory.querySelectorAll('.inventory-grid-item');

    // If the script has already run on this element, do nothing.
    if (!draggableItem || draggableItem.dataset.dndReady) return;
    draggableItem.dataset.dndReady = 'true';

    // --- Fires when the user STARTS dragging the cube ---
    draggableItem.addEventListener('dragstart', (e) => {
        // This is the CRITICAL line that makes the drag operation valid.
        e.dataTransfer.setData('text/plain', e.target.id || 'draggable');
        e.dataTransfer.effectAllowed = 'move';

        // Hide the original item to create a "ghost" effect.
        setTimeout(() => {
            e.target.style.visibility = 'hidden';
        }, 0);
    });

    // --- Fires when the user STOPS dragging (no matter where) ---
    draggableItem.addEventListener('dragend', (e) => {
        // Always make the item visible again.
        e.target.style.visibility = 'visible';
    });

    // --- Set up each grid cell as a potential drop target ---
    dropTargets.forEach(cell => {
        // --- Fires as the cube is dragged OVER a cell ---
        // This is MANDATORY to allow a drop.
        cell.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        // --- Fires when the cube ENTERS a cell's boundary ---
        cell.addEventListener('dragenter', (e) => {
            e.preventDefault();
            if (e.currentTarget.children.length === 0) {
                e.currentTarget.style.backgroundColor = '#555555';
            }
        });

        // --- Fires when the cube LEAVES a cell's boundary ---
        cell.addEventListener('dragleave', (e) => {
            if (e.currentTarget.children.length === 0) {
                e.currentTarget.style.backgroundColor = '#282828';
            }
        });

        // --- Fires when the cube is DROPPED on a cell ---
        cell.addEventListener('drop', (e) => {
            e.preventDefault();
            if (e.currentTarget.children.length === 0) {
                e.currentTarget.appendChild(draggableItem);
            }
            e.currentTarget.style.backgroundColor = '#282828';
        });
    });
}

// This observer is the most reliable way to run the script
// in a dynamic environment like Mintlify.
const observer = new MutationObserver(() => {
    setupInventoryDragAndDrop();
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});

// A fallback for the initial page load.
document.addEventListener('DOMContentLoaded', setupInventoryDragAndDrop);