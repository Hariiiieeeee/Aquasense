document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll("form");

    forms.forEach(form => {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            console.log("Form Data:", data);

            // Simulate form submission to the server
            alert(`${form.querySelector('h2').textContent} saved successfully!`);
        });
    });
});
