// SELECT ELEMENTS
const form = document.querySelector('form');
const input = document.querySelector('input');
const figure = document.querySelector('figure');

// Form Event Listener
form.addEventListener('submit', e => {
    e.preventDefault();
    // console.log(input.value);
    let data = { url: input.value };
    // Send Request
    sendRequest(data);
    // FORM RESET
    form.reset();
});
// POST REQUEST
async function sendRequest(body) {
    try {
        const res = await fetch('/api/qrcode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        const data = await res.json(body);
        console.log(data);
        // Show QR Code
        createQr(data);

    } catch (e) {
        console.log(e);
    }
};
// Create QR
function createQr(src) {
    // Create qr image
    let image = document.createElement('img');
    let figcaption = document.createElement('figcaption');
    figcaption.textContent = 'Fig. 1 - Your QR Code';
    image.src = src;
    image.alt = 'QR_Code';
    // Append
    figure.innerHTML = '';
    figure.append(image, figcaption);
    // Clear
    image.addEventListener('click', () => {
        figure.innerHTML = '';
    });
};