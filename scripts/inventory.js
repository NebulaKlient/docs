function initializeFinalDragAndDrop() {
    const inventory = document.getElementById('inventory-preview');
    if (!inventory) return;

    const draggableItem = inventory.querySelector('.inventory-draggable');
    if (!draggableItem || draggableItem.dataset.finalDragReady) return;

    draggableItem.dataset.finalDragReady = 'true';
    let originalCell = null;
    let isDragging = false;

    draggableItem.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return; // Only allow left-click drags
        e.preventDefault();

        isDragging = true;
        originalCell = draggableItem.parentElement;

        const rect = draggableItem.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        // Move item to the body for dragging over everything
        document.body.appendChild(draggableItem);
        draggableItem.style.position = 'absolute';
        draggableItem.style.zIndex = '1000';
        draggableItem.style.cursor = 'grabbing';
        
        // Initial position
        draggableItem.style.left = `${e.clientX - offsetX}px`;
        draggableItem.style.top = `${e.clientY - offsetY}px`;
        
        const handleMouseMove = (moveEvent) => {
            if (isDragging) {
                // Update position to follow the cursor
                draggableItem.style.left = `${moveEvent.clientX - offsetX}px`;
                draggableItem.style.top = `${moveEvent.clientY - offsetY}px`;
            }
        };

        const handleMouseUp = (upEvent) => {
            if (!isDragging) return;
            isDragging = false;
            
            // --- This is the new, robust logic ---
            // Find the drop target by checking coordinates, not events.
            const dropTargets = inventory.querySelectorAll('.inventory-grid-item');
            let foundTarget = null;
            for (const cell of dropTargets) {
                const cellRect = cell.getBoundingClientRect();
                if (
                    upEvent.clientX >= cellRect.left &&
                    upEvent.clientX <= cellRect.right &&
                    upEvent.clientY >= cellRect.top &&
                    upEvent.clientY <= cellRect.bottom
                ) {
                    foundTarget = cell;
                    break; // Found our target, no need to loop further
                }
            }
            
            // Check if we can drop the item in the found target
            if (foundTarget && foundTarget.children.length === 0) {
                // Success: Drop into the new empty cell
                foundTarget.appendChild(draggableItem);
            } else {
                // Failure: Return to the original cell
                originalCell.appendChild(draggableItem);
            }

            // Reset the item's styles to fit back into the grid
            draggableItem.style.position = '';
            draggableItem.style.left = '';
            draggableItem.style.top = '';
            draggableItem.style.zIndex = '';
            draggableItem.style.cursor = 'grab';

            // Clean up the global listeners
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    });
}

const observer = new MutationObserver(() => {
    initializeFinalDragAndDrop();
});

observer.observe(document.body, { childList: true, subtree: true });
document.addEventListener('DOMContentLoaded', initializeFinalDragAndDrop);