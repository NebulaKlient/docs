function setupInventoryDrag() {
    const container = document.getElementById('inventory-preview');
    if (!container) return;

    const draggable = container.querySelector('.inventory-draggable');
    if (!draggable || draggable.dataset.dragSetup) return;
    
    draggable.dataset.dragSetup = 'true';
    const gridItems = container.querySelectorAll('.inventory-grid-item');

    draggable.addEventListener('dragstart', () => draggable.classList.add('inventory-dragging'));
    draggable.addEventListener('dragend', () => draggable.classList.remove('inventory-dragging'));

    gridItems.forEach(item => {
        item.addEventListener('dragover', e => e.preventDefault());
        item.addEventListener('dragenter', e => {
            e.preventDefault();
            if (e.currentTarget.children.length === 0) e.currentTarget.style.backgroundColor = '#555555';
        });
        item.addEventListener('dragleave', e => {
            if (e.currentTarget.children.length === 0) e.currentTarget.style.backgroundColor = '#313131';
        });
        item.addEventListener('drop', e => {
            e.preventDefault();
            const draggedElement = container.querySelector('.inventory-dragging');
            if (e.currentTarget.children.length === 0 && draggedElement) {
                e.currentTarget.style.backgroundColor = '#313131';
                e.currentTarget.appendChild(draggedElement);
            }
        });
    });
}

// This is a robust way to ensure the script runs when the component is added to the page.
const observer = new MutationObserver(() => {
    if (document.getElementById('inventory-preview')) {
        setupInventoryDrag();
    }
});

// Start observing the entire document for changes.
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Also run on initial load, just in case.
document.addEventListener('DOMContentLoaded', setupInventoryDrag);