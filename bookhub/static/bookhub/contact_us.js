function sendMessage () {
    let username = document.getElementById("username").value;
    let num = document.getElementById("mobile number").value;
    let email = document.getElementById("email").value;
    let comment = document.getElementById("comment").value;

    let verified = true;

            if (username === "") {
                alert("Username is required!");
                verified = false;
                event.preventDefault();
            } else {
                let userNameREGEX = /[a-zA-Z]/;
                if (!userNameREGEX.test(username)) {
                    alert("Username must contain letters!");
                    verified = false;
                    event.preventDefault();
                }
            }

            if (num === "") {
                alert("Mobile number is required!");
                verified = false;
                event.preventDefault();
            } else {
                let mobileNumberRegex = /^\d+$/; // regex to check for digits only
                if (!mobileNumberRegex.test(num)) {
                    alert("Mobile number must contain only digits.");
                    verified = false;
                    event.preventDefault();
                }
            }

            if (email === "") {
                alert("Email is required!");
                verified = false;
                event.preventDefault();
            } else {
                var EmailREGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // email regex 
                if (!EmailREGEX.test(email)) {
                    alert("Invalid email format!");
                    verified = false;
                    event.preventDefault();
                }
            }

            if (comment === "") {
                alert("Comment is required!");
                event.preventDefault();
                verified = false;
            }

            if (verified) {
                window.alert("Your message has been sent successfully. Thank you for reaching out.");
                
            }

}

