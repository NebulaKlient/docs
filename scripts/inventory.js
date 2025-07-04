function initializeManualDragAndDrop() {
    const inventory = document.getElementById('inventory-preview');
    if (!inventory) return;

    const draggableItem = inventory.querySelector('.inventory-draggable');
    if (!draggableItem || draggableItem.dataset.finalDragReady) return;
    
    draggableItem.dataset.finalDragReady = 'true';

    let originalCell = null;
    let currentDropTarget = null;
    const cellDefaultColor = '#282828';
    const cellHoverColor = '#555555';

    // --- Define Event Handlers for Drop Targets ---
    const handleMouseEnter = (e) => {
        currentDropTarget = e.currentTarget;
        if (e.currentTarget.children.length === 0) {
            e.currentTarget.style.backgroundColor = cellHoverColor;
        }
    };

    const handleMouseLeave = (e) => {
        currentDropTarget = null;
        e.currentTarget.style.backgroundColor = cellDefaultColor;
    };

    // --- Functions to Activate/Deactivate Drop Targets ---
    const dropTargets = inventory.querySelectorAll('.inventory-grid-item');
    const activateDropTargets = () => {
        dropTargets.forEach(cell => {
            cell.addEventListener('mouseenter', handleMouseEnter);
            cell.addEventListener('mouseleave', handleMouseLeave);
        });
    };
    const deactivateDropTargets = () => {
        dropTargets.forEach(cell => {
            cell.removeEventListener('mouseenter', handleMouseEnter);
            cell.removeEventListener('mouseleave', handleMouseLeave);
            cell.style.backgroundColor = cellDefaultColor; // Reset all colors
        });
    };

    // --- Main Drag-and-Drop Logic ---
    draggableItem.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return; // Only allow left-click drags
        e.preventDefault();

        originalCell = draggableItem.parentElement;

        const rect = draggableItem.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        // Style the item for dragging
        document.body.appendChild(draggableItem);
        draggableItem.style.position = 'absolute';
        draggableItem.style.zIndex = '1000';
        draggableItem.style.cursor = 'grabbing';
        draggableItem.style.pointerEvents = 'none'; // CRITICAL: Allows mouse to "see through" the dragged item

        const handleMouseMove = (moveEvent) => {
            draggableItem.style.left = `${moveEvent.clientX - offsetX}px`;
            draggableItem.style.top = `${moveEvent.clientY - offsetY}px`;
        };
        document.addEventListener('mousemove', handleMouseMove);

        // Activate drop targets only when a drag starts
        activateDropTargets();

        const handleMouseUp = () => {
            // Deactivate drop targets when the drag ends
            deactivateDropTargets();

            // If we have a valid and empty drop target, place the item
            if (currentDropTarget && currentDropTarget.children.length === 0) {
                currentDropTarget.appendChild(draggableItem);
            } else {
                // Otherwise, return to the original cell
                originalCell.appendChild(draggableItem);
            }
            
            // Reset all inline styles so the item fits back in the grid
            draggableItem.style.position = '';
            draggableItem.style.left = '';
            draggableItem.style.top = '';
            draggableItem.style.zIndex = '';
            draggableItem.style.cursor = 'grab';
            draggableItem.style.pointerEvents = 'auto';

            // Clean up the global mouse listeners
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
        document.addEventListener('mouseup', handleMouseUp);
    });
}

const observer = new MutationObserver(() => {
    initializeManualDragAndDrop();
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});

document.addEventListener('DOMContentLoaded', initializeManualDragAndDrop);