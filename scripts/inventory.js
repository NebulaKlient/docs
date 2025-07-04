function initializeInventoryComponent() {
    const container = document.getElementById('inventory-preview');
    if (!container) return;

    const draggable = container.querySelector('.inventory-draggable');
    if (!draggable || draggable.dataset.dragSetupComplete) return;

    draggable.dataset.dragSetupComplete = 'true';
    const gridItems = container.querySelectorAll('.inventory-grid-item');
    const cellDefaultColor = '#282828';
    const cellHoverColor = '#555555';

    draggable.addEventListener('dragstart', () => {
        setTimeout(() => draggable.classList.add('inventory-dragging'), 0);
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('inventory-dragging');
        // This resets any lingering hover styles if the drag is cancelled.
        gridItems.forEach(item => {
            if (item.children.length === 0) {
                item.style.backgroundColor = cellDefaultColor;
            }
        });
    });

    gridItems.forEach(item => {
        // --- THIS IS THE CORE FIX ---
        // By setting dropEffect, we tell the browser this is a valid drop target.
        item.addEventListener('dragover', e => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });

        item.addEventListener('dragenter', e => {
            e.preventDefault();
            if (e.currentTarget.children.length === 0) {
                e.currentTarget.style.backgroundColor = cellHoverColor;
            }
        });

        item.addEventListener('dragleave', e => {
            if (e.currentTarget.children.length === 0) {
                e.currentTarget.style.backgroundColor = cellDefaultColor;
            }
        });

        item.addEventListener('drop', e => {
            e.preventDefault();
            const draggedElement = container.querySelector('.inventory-dragging');
            if (e.currentTarget.children.length === 0 && draggedElement) {
                e.currentTarget.style.backgroundColor = cellDefaultColor;
                e.currentTarget.appendChild(draggedElement);
            }
        });
    });
}

const observer = new MutationObserver(() => {
    initializeInventoryComponent();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

document.addEventListener('DOMContentLoaded', initializeInventoryComponent);