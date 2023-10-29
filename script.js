function setup() {
    console.log('setting up');
}


// Function to make text elements editable
function makeTextEditable(textElement) {
    textElement.style.pointerEvents = 'auto';
    textElement.setAttribute('contentEditable', true);
    textElement.focus();
}

function makeBoxesEditable() {
    // Add event listeners to the text elements
    const textElements = document.querySelectorAll('text');
    textElements.forEach((textElement) => {
        textElement.addEventListener('click', () => {
            makeTextEditable(textElement);
        });
        textElement.addEventListener('blur', () => {
            textElement.style.pointerEvents = 'none';
            textElement.removeAttribute('contentEditable');
        });
    });
}
