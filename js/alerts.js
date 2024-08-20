document.addEventListener('DOMContentLoaded', function() {
    function showToast(message) {
        const toastBox = document.getElementById('toastBox');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<span>&#x1F514;</span> ${message}`;
        toastBox.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // Example of modifying an element
    const alertHeading1 = document.getElementById('alertHeading1');
    if (alertHeading1) {
        alertHeading1.innerHTML = "Updated Alert Heading";
    } else {
        console.error('Element with ID "alertHeading1" not found.');
    }

    const alertHeading2 = document.getElementById('alertHeading2');
    if (alertHeading2) {
        alertHeading2.innerHTML = "Updated Alert Heading 2";
    } else {
        console.error('Element with ID "alertHeading2" not found.');
    }

    // Example of adding event listener to a button
    const alertButton1 = document.getElementById('alertButton1');
    if (alertButton1) {
        alertButton1.addEventListener('click', () => showToast('Button 1 Clicked'));
    } else {
        console.error('Element with ID "alertButton1" not found.');
    }

    const alertButton2 = document.getElementById('alertButton2');
    if (alertButton2) {
        alertButton2.addEventListener('click', () => showToast('Button 2 Clicked'));
    } else {
        console.error('Element with ID "alertButton2" not found.');
    }
});