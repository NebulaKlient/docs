function initializeDefinitiveDragAndDrop() {
    const inventory = document.getElementById('inventory-preview');
    if (!inventory) return;

    const draggableItem = inventory.querySelector('.inventory-draggable');
    if (!draggableItem || draggableItem.dataset.dragReady) return;
    
    draggableItem.dataset.dragReady = 'true';

    let originalCell = null;
    let isDragging = false;

    draggableItem.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return; // Only drag with the left mouse button
        e.preventDefault(); // Prevent default browser actions like text selection

        isDragging = true;
        originalCell = draggableItem.parentElement;

        const rect = draggableItem.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        // Move item to the body for unrestricted dragging
        document.body.appendChild(draggableItem);
        draggableItem.style.position = 'absolute';
        draggableItem.style.zIndex = '1000';
        draggableItem.style.cursor = 'grabbing';
        
        // --- This handler moves the item and highlights drop targets ---
        const handleMouseMove = (moveEvent) => {
            if (!isDragging) return;

            // Follow the cursor
            draggableItem.style.left = `${moveEvent.clientX - offsetX}px`;
            draggableItem.style.top = `${moveEvent.clientY - offsetY}px`;

            // Check for a drop target by coordinates
            const dropTargets = inventory.querySelectorAll('.inventory-grid-item');
            dropTargets.forEach(cell => {
                const cellRect = cell.getBoundingClientRect();
                if (
                    moveEvent.clientX > cellRect.left && moveEvent.clientX < cellRect.right &&
                    moveEvent.clientY > cellRect.top && moveEvent.clientY < cellRect.bottom
                ) {
                    if (cell.children.length === 0) {
                        cell.classList.add('drop-target-hover');
                    }
                } else {
                    cell.classList.remove('drop-target-hover');
                }
            });
        };

        // --- This handler finalizes the drop ---
        const handleMouseUp = () => {
            if (!isDragging) return;
            isDragging = false;

            const dropTarget = inventory.querySelector('.drop-target-hover');

            if (dropTarget) { // If we are over a valid, highlighted cell
                dropTarget.appendChild(draggableItem);
            } else { // Otherwise, snap back to where we started
                originalCell.appendChild(draggableItem);
            }

            // Reset all styles so the item fits back in the grid
            draggableItem.style.position = '';
            draggableItem.style.left = '';
            draggableItem.style.top = '';
            draggableItem.style.zIndex = '';
            draggableItem.style.cursor = 'grab';
            inventory.querySelectorAll('.drop-target-hover').forEach(cell => {
                cell.classList.remove('drop-target-hover');
            });

            // Clean up the listeners to prevent memory leaks
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    });
}

const observer = new MutationObserver(() => initializeDefinitiveDragAndDrop());
observer.observe(document.body, { childList: true, subtree: true });
document.addEventListener('DOMContentLoaded', initializeDefinitiveDragAndDrop);