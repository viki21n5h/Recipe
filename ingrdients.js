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
        button.setAttribute('aria-pressed', 'false'); // Accessibility
        button.addEventListener('click', function() {
            event.preventDefault(); 
            if (selectedItems.includes(suggestion)) {
                selectedItems = selectedItems.filter(item => item !== suggestion);
                button.classList.remove('selected'); // Visually indicate deselection
                button.setAttribute('aria-pressed', 'false'); // Update accessibility
            } else {
                if (selectedItems.length < 5) {
                    selectedItems.push(suggestion);
                    button.classList.add('selected'); // Visually indicate selection
                    button.setAttribute('aria-pressed', 'true'); // Update accessibility
                } else {
                    alert('You can select up to 5 items.'); // Alert for maximum selection
                }
            }
            updateInput();
        });
        suggestionsContainer.appendChild(button);
    });
    
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        if (selectedItems.length < 2) {
            alert('Please select at least 2 items.'); // Alert for minimum selection
            event.preventDefault(); // Prevent form submission
        }
    });
});