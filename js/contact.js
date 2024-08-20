$(document).ready(function() {
    $('#contactForm').on('submit', function(event) {
        event.preventDefault();

        var name = $('#name').val();
        var email = $('#email').val();
        var message = $('#message').val();

        // Ensure the element exists before manipulating it
        var responseElement = $('#form-response');
        if (responseElement.length) {
            emailjs.send('aquasense', 'aquasense_template', {
                from_name: name,
                from_email: email,
                message: message
            })
            .then(function(response) {
                responseElement.html('<p class="response-success">Thank you for your message, ' + name + '! We will get back to you soon.</p>');
                $('#contactForm')[0].reset();
            }, function(error) {
                responseElement.html('<p class="response-error">There was an error sending your message. Please try again later.</p>');
            });
        } else {
            console.error('Element #form-response not found.');
        }
    });
});
