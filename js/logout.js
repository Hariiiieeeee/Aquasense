document.getElementById('logoutConfirmButton').addEventListener('click', function() {
    // Redirect to otp.html after confirming logout
    window.location.href = 'otp.html';
});

document.getElementById('logoutCancelButton').addEventListener('click', function() {
    // Redirect back to the dashboard or previous page if the user cancels
    window.location.href = 'index.html';
});
