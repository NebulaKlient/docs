function initializeManualDrag() {
    const inventory = document.getElementById('inventory-preview');
    if (!inventory) return;

    const draggableItem = inventory.querySelector('.inventory-draggable');
    if (!draggableItem || draggableItem.dataset.manualDragReady) return;
    
    draggableItem.dataset.manualDragReady = 'true';
    let originalCell = draggableItem.parentElement;
    let isDragging = false;
    let offsetX, offsetY;

    // --- Fires when the user presses the mouse button down on the cube ---
    draggableItem.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Prevent default browser drag behavior
        isDragging = true;
        
        originalCell = draggableItem.parentElement;
        const rect = draggableItem.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        // Make the item draggable across the page
        document.body.appendChild(draggableItem);
        draggableItem.style.position = 'absolute';
        draggableItem.style.zIndex = '1000';
        draggableItem.style.cursor = 'grabbing';
        
        // Move the item to the initial mouse position
        draggableItem.style.left = `${e.clientX - offsetX}px`;
        draggableItem.style.top = `${e.clientY - offsetY}px`;
    });

    // --- Fires when the user moves the mouse anywhere on the page ---
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            e.preventDefault();
            // Update the item's position to follow the mouse
            draggableItem.style.left = `${e.clientX - offsetX}px`;
            draggableItem.style.top = `${e.clientY - offsetY}px`;
        }
    });

    // --- Fires when the user releases the mouse button anywhere on the page ---
    document.addEventListener('mouseup', (e) => {
        if (isDragging) {
            isDragging = false;
            draggableItem.style.cursor = 'grab';
            
            // Temporarily hide the dragged item to find what's underneath
            draggableItem.style.visibility = 'hidden';
            const elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);
            draggableItem.style.visibility = 'visible';
            
            let dropTarget = elementUnderMouse ? elementUnderMouse.closest('.inventory-grid-item') : null;

            // Check if the drop target is a valid, empty cell
            if (dropTarget && dropTarget.children.length === 0) {
                // Success: Snap the item into the new cell
                dropTarget.appendChild(draggableItem);
            } else {
                // Failure: Return the item to its original cell
                originalCell.appendChild(draggableItem);
            }

            // Reset the item's inline styles so it fits in the grid again
            draggableItem.style.position = '';
            draggableItem.style.left = '';
            draggableItem.style.top = '';
            draggableItem.style.zIndex = '';
        }
    });
}

// This observer is the most reliable way to run the script.
const observer = new MutationObserver(() => {
    initializeManualDrag();
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});

document.addEventListener('DOMContentLoaded', initializeManualDrag);