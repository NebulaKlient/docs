function setupInventoryDrag() {
    const container = document.getElementById('inventory-preview');
    if (!container) return; // Don't run if the component isn't on the page

    const draggable = container.querySelector('.inventory-draggable');
    const gridItems = container.querySelectorAll('.inventory-grid-item');
    
    // Prevent script from running multiple times on the same element
    if (!draggable || draggable.dataset.dragSetup) return;
    draggable.dataset.dragSetup = 'true';

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

// Run the setup script after the page has fully loaded
document.addEventListener('DOMContentLoaded', setupInventoryDrag);