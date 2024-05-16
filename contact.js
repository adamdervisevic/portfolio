(function() {
    emailjs.init("GJSo-5qlUkPgkJs-q");
})();

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();

        console.log('Form submitted'); 

        
        var submitButton = document.getElementById('submit-button');
        submitButton.disabled = true;

        // Check if any of the required fields are empty
        if (!document.getElementById('from_name').value ||
            !document.getElementById('from_email').value ||
            !document.getElementById('subject').value ||
            !document.getElementById('message').value) {
            document.querySelector('.form-notification').innerHTML = "Please fill out all the fields.!";
            submitButton.disabled = false; 
            return; 
        }

        // Define a list of valid email domains
        const validDomains = [
            "@gmail.com", "@yahoo.com", "@hotmail.com", "@outlook.com",
            "@aol.com", "@icloud.com", "@protonmail.com", "@mail.com",
            "@yandex.com", "@livemail.com", "@msn.com", "@zoho.com",
            "@gmx.com", "@fastmail.com"
        ];

        // Check for proper email extension
        let emailValue = document.getElementById('from_email').value;
        if (!validDomains.some(domain => emailValue.endsWith(domain))) {
            document.querySelector('.form-notification').innerHTML = "You have entered an invalid email!";
            submitButton.disabled = false; 
            return;
        }

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
                document.getElementById('success-message').style.display = 'block'; 
                submitButton.disabled = false; 
            }, function(error) {
                console.log('FAILED...', error);
                alert('Failed to send email: ' + error);
                submitButton.disabled = false; 
            });
    });
});
