// JavaScript for EmailJS
(function() {
    emailjs.init("GJSo-5qlUkPgkJs-q");  // Replace with your user ID
})();

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();

        var params = {
            from_name: document.getElementById('from_name').value,
            to_email: document.getElementById('from_email').value,  // This might need to match with your EmailJS parameters
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
        };

        emailjs.send('service_o5z359j', 'template_uttoda9', params)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Email sent successfully');
                }, function(error) {
                console.log('FAILED...', error);
                alert('Failed to send email: ' + error);
            });
    });
});
