(function () {
    emailjs.init("GJSo-5qlUkPgkJs-q"); 
})();

function sendMail() {
    // Check if any of the required fields are empty
    if (
        !document.querySelector("[name='name']").value ||
        !document.querySelector("[name='email']").value ||
        !document.querySelector("[name='subject']").value ||
        !document.querySelector("[name='message']").value 
    ) {
        document.querySelector(".form-notification").innerHTML =
            "Complete all fields!";
        return;
    }

    const emailValue = document.querySelector("[name='email']").value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check if the email matches the defined pattern
    if (!emailRegex.test(emailValue)) {
        document.querySelector(".form-notification").innerHTML =
            "Enter a valid email!";
        return;
    }

    const params = {
        to_name: "adam",
        from_name: document.querySelector("[name='name']").value,
        message: document.querySelector("[name='message']").value,
        email: emailValue,
    };

    const serviceID = "service_o5z359j";
    const templateID = "template_uttoda9";

    emailjs.send(serviceID, templateID, params)
    .then((res) => {
        document.querySelector(".form-notification").innerHTML =
            "You have successfully submitted your email!";
        setTimeout(() => {
            document.querySelector(".form-notification").innerHTML = "";
        }, 2000);
        document.querySelector("[name='name']").value = "";
        document.querySelector("[name='message']").value = "";
        document.querySelector("[name='email']").value = "";
    })
    .catch((error) => {
        document.querySelector(".form-notification").innerHTML =
            "Error sending email: " + error.text;
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();

        const focusedElement = document.activeElement;
        const formElements = Array.from(
            document.querySelectorAll(
                "input[type='text'], input[type='email'], textarea"
            )
        );
        const lastIndex = formElements.length - 1;
        const currentIndex = formElements.indexOf(focusedElement);

        if (currentIndex < lastIndex) {
            // Focus on the next input element
            formElements[currentIndex + 1].focus();
        } else {
            // Trigger the submit button click if all required fields are filled
            document.querySelector(".contact-form input[type='submit']").click();
        }
    }
});
