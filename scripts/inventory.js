function initializeDefinitiveDragAndDrop() {
    const inventory = document.getElementById('inventory-preview');
    if (!inventory) return;

    const draggableItem = inventory.querySelector('.inventory-draggable');
    if (!draggableItem || draggableItem.dataset.dragReady) return;
    
    draggableItem.dataset.dragReady = 'true';

    // --- THIS IS THE CORE FIX ---
    // This listener actively finds and neutralizes the browser's default
    // drag-and-drop system, which is the source of the conflict.
    draggableItem.addEventListener('dragstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    let originalCell = null;
    let isDragging = false;

    // --- This is the manual drag-and-drop system that will now work correctly ---
    draggableItem.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return; // Only allow left-click drags
        e.preventDefault(); // Prevent text selection, etc.

        isDragging = true;
        originalCell = draggableItem.parentElement;

        const rect = draggableItem.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        document.body.appendChild(draggableItem);
        draggableItem.style.position = 'absolute';
        draggableItem.style.zIndex = '1000';
        draggableItem.style.cursor = 'grabbing';
        
        const handleMouseMove = (moveEvent) => {
            if (!isDragging) return;
            draggableItem.style.left = `${moveEvent.clientX - offsetX}px`;
            draggableItem.style.top = `${moveEvent.clientY - offsetY}px`;

            const dropTargets = inventory.querySelectorAll('.inventory-grid-item');
            dropTargets.forEach(cell => {
                const cellRect = cell.getBoundingClientRect();
                if (
                    moveEvent.clientX > cellRect.left && moveEvent.clientX < cellRect.right &&
                    moveEvent.clientY > cellRect.top && moveEvent.clientY < cellRect.bottom
                ) {
                    if (cell.children.length === 0) cell.classList.add('drop-target-hover');
                } else {
                    cell.classList.remove('drop-target-hover');
                }
            });
        };

        const handleMouseUp = () => {
            if (!isDragging) return;
            isDragging = false;

            const dropTarget = inventory.querySelector('.drop-target-hover');

            if (dropTarget) {
                dropTarget.appendChild(draggableItem);
            } else {
                originalCell.appendChild(draggableItem);
            }

            // Reset styles
            draggableItem.style.position = '';
            draggableItem.style.left = '';
            draggableItem.style.top = '';
            draggableItem.style.zIndex = '';
            draggableItem.style.cursor = 'grab';
            inventory.querySelectorAll('.drop-target-hover').forEach(cell => {
                cell.classList.remove('drop-target-hover');
            });

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