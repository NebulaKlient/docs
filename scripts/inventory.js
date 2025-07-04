function initializeInventoryComponent() {
    const container = document.getElementById('inventory-preview');
    // If the component isn't on the page, do nothing.
    if (!container) return;

    const draggable = container.querySelector('.inventory-draggable');
    // If the script has already run, do nothing.
    if (!draggable || draggable.dataset.dragSetupComplete) return;

    draggable.dataset.dragSetupComplete = 'true';
    const gridItems = container.querySelectorAll('.inventory-grid-item');

    draggable.addEventListener('dragstart', () => draggable.classList.add('inventory-dragging'));
    draggable.addEventListener('dragend', () => draggable.classList.remove('inventory-dragging'));

    gridItems.forEach(item => {
        item.addEventListener('dragover', e => e.preventDefault());

        item.addEventListener('dragenter', e => {
            e.preventDefault();
            if (e.currentTarget.children.length === 0) {
                e.currentTarget.style.backgroundColor = '#555555';
            }
        });

        item.addEventListener('dragleave', e => {
            if (e.currentTarget.children.length === 0) {
                e.currentTarget.style.backgroundColor = '#313131';
            }
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

// This observer waits for the component to be added to the page.
// It's the most reliable way to handle dynamic content.
const observer = new MutationObserver((mutationsList, obs) => {
    if (document.getElementById('inventory-preview')) {
        initializeInventoryComponent();
        obs.disconnect(); // Stop watching once we've found it.
    }
});

// Start watching the page for changes.
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Also run when the page first loads, just in case.
document.addEventListener('DOMContentLoaded', initializeInventoryComponent);