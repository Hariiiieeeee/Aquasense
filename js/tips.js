// tips.js

$(document).ready(function() {
    // Function to show a toast notification
    function showToast(message) {
        var toast = $('<div class="toast"></div>').text(message);
        $('#toastBox').append(toast);
        setTimeout(function() {
            toast.fadeOut(400, function() {
                $(this).remove();
            });
        }, 3000); // Display the toast for 3 seconds
    }

    // Attach click event to each tip item
    $('.tips-list li').on('click', function() {
        var tipText = $(this).text();
        showToast('You clicked on: ' + tipText);
    });
});
