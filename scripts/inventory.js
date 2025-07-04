function initializeInventoryComponent() {
    const container = document.getElementById('inventory-preview');
    if (!container) return;

    const draggable = container.querySelector('.inventory-draggable');
    if (!draggable || draggable.dataset.dragSetupComplete) return;

    draggable.dataset.dragSetupComplete = 'true';
    const gridItems = container.querySelectorAll('.inventory-grid-item');
    const cellDefaultColor = '#282828'; // Matches CSS
    const cellHoverColor = '#555555';

    draggable.addEventListener('dragstart', () => {
        // Use a timeout to avoid glitchy rendering on drag start
        setTimeout(() => draggable.classList.add('inventory-dragging'), 0);
    });

    draggable.addEventListener('dragend', () => draggable.classList.remove('inventory-dragging'));

    gridItems.forEach(item => {
        item.addEventListener('dragover', e => e.preventDefault());

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

// This observer is now more persistent and reliable for dynamic page loads.
const observer = new MutationObserver(() => {
    initializeInventoryComponent();
});

// Start observing the entire document for any changes.
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Also run on initial load.
document.addEventListener('DOMContentLoaded', initializeInventoryComponent);