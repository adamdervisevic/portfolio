// JavaScript for EmailJS
(function() {
    emailjs.init("GJSo-5qlUkPgkJs-q");  
})();

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Disable the submit button to prevent multiple submissions
        var submitButton = document.getElementById('submit-button');
        submitButton.disabled = true;

        var params = {
            from_name: document.getElementById('from_name').value,
            from_email: document.getElementById('from_email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
        };

        emailjs.send('service_o5z359j', 'template_uttoda9', params)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById('form').reset(); // Reset the form
                document.getElementById('success-message').style.display = 'block'; // Show the success message
                submitButton.disabled = false; // Re-enable the submit button
            }, function(error) {
                console.log('FAILED...', error);
                alert('Failed to send email: ' + error);
                submitButton.disabled = false; // Re-enable the submit button
            });
    });
});