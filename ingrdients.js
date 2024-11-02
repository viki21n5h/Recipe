document.addEventListener('DOMContentLoaded', function() {
    const suggestions = [
        "Tomatoes",
        "Cheese",
        "Chicken",
        "Broccoli",
        "Carrots",
        "Basil",
        "Garlic",
        "Onions",
        "Peppers",
        "Mushrooms"
    ];

    const suggestionsContainer = document.getElementById('suggestions-container');
    const universalInput = document.getElementById('Floating');
    let selectedItems = [];

    function updateInput() {
        universalInput.value = selectedItems.join(', ');
    }

    suggestions.forEach((suggestion) => {
        const button = document.createElement('button');
        button.className = 'button variant-outline rounded-full size-sm';
        button.textContent = suggestion;
        button.addEventListener('click', function(event) {
            event.preventDefault();
            if (selectedItems.includes(suggestion)) {
                selectedItems = selectedItems.filter(item => item !== suggestion);
                button.classList.remove('selected'); // Visually indicate deselection
            } else if (selectedItems.length < 5) {
                selectedItems.push(suggestion);
                button.classList.add('selected'); // Visually indicate selection
            } else {
                alert('You can select up to 5 items.');
            }
            updateInput();
        });
        suggestionsContainer.appendChild(button);
    });

    // Check minimum number of items on form submission or relevant event
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        if (selectedItems.length < 2) {
            alert('Please select at least 2 items.');
            event.preventDefault();
        }
    });
});