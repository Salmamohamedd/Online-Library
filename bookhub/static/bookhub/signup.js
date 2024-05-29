function signup(){
    function alertAndPrevent(message) {
        alert(`⚠️ ${message} ❗`);
        // return false;
        
    }
    
    // Regex definitions (validation)
    const nameRegex = /^[a-zA-Z]+$/;
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.com$/;
    const phoneRegex = /^\d*$/;
    
    const formFields = {
        //trim() remove space
        FirstName: document.getElementById('F_name').value.trim(),   
        userName: document.getElementById('user_name').value.trim(),
        Email: document.getElementById('email').value.trim(),
        PhoneNumber: document.getElementById('number').value.trim(),
        Password: document.getElementById('password').value,
        ConfirmPass: document.getElementById('con_pass').value,
        gender: document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : "",
        type: document.querySelector('input[name="type"]:checked') ? document.querySelector('input[name="type"]:checked').value : ""
    };
    
    
    // Check for empty required fields
    for (let key in formFields) {
        if (formFields[key] === '' ) {    // ConfirmPass checked separately
            alertAndPrevent(`Please enter your ${key.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}.`);
            return false;
        }
    }
    
    // Specific field validations
    if (!nameRegex.test(formFields.FirstName) || !nameRegex.test(formFields.userName)) {
        alertAndPrevent("Invalid name, please enter correctly.");
        return false;
    }
    if (!emailRegex.test(formFields.Email)) {
        alertAndPrevent("Invalid email, please enter correctly.");
        return false;
    }
    if (!phoneRegex.test(formFields.PhoneNumber)) {
        alertAndPrevent("Invalid phone number, please enter integers only.");
        return false;
    }
    if (formFields.PhoneNumber.length > 13) {
        alertAndPrevent("Invalid phone number, too long.");
        return false;
    }
    if (formFields.Password.length < 5) {
        alertAndPrevent("Invalid password, must be at least 5 characters long.");
        return false;
    }
    if (formFields.Password.length > 10) {
        alertAndPrevent("Invalid password, must be at less than 10 characters.");
        return false;
    }
    if (formFields.Password !== formFields.ConfirmPass) {
        alertAndPrevent("Passwords do not match.");
        return false;
    }

    document.getElementById("theForm").submit();
}


// $(document).ready(function() {
//     $('.submitbtn').click(function(){
//         signup();
//         fname = document.getElementById('F_name').value.trim(),   
//         username =  document.getElementById('user_name').value.trim(),
//         email = document.getElementById('email').value.trim(),
//         phone = document.getElementById('number').value.trim(),
//         password = document.getElementById('password').value,
//         gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : "",
//         type = document.querySelector('input[name="type"]:checked') ? document.querySelector('input[name="type"]:checked').value : ""

//         $.ajax({
//             type:"POST",
//             url: "bookhubsignup",
//             data:{
//                     username: username,
//                     name: fname,
//                     email: email,
//                     gender: gender,
//                     type: type,
//                     password: password,
//                     phone: phone,
//                     'csrfmiddlewaretoken': '{{ csrf_token }}'
//             },
//     success: function(data) {
//     console.log(data);

                
//             }
//         });
//     });
// });


/////////////////////////////////////////////////////////




// // If all validations pass









// function signup() {
//     // event.preventDefault();
  
//     function alertAndPrevent(message) {
//       console.log(`⚠️ ${message} ❗`);
//       return false;
//     }
  
//     const nameRegex = /^[a-zA-Z]+$/;
//     const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.com$/;
//     const phoneRegex = /^\d*$/;
  
//     const formFields = {
//       FirstName: document.getElementById('F_name').value.trim(),
//       userName: document.getElementById('user_name').value.trim(),
//       Email: document.getElementById('email').value.trim(),
//       PhoneNumber: document.getElementById('number').value.trim(),
//       Password: document.getElementById('password').value,
//       ConfirmPass: document.getElementById('con_pass').value,
//       gender: document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : "",
//       type: document.querySelector('input[name="type"]:checked') ? document.querySelector('input[name="type"]:checked').value : ""
//     };
  
//     for (const key in formFields) {
//       if (formFields[key] === '') {
//         alertAndPrevent(`Please enter your ${key.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}.`);
//         return false;
//       }
//     }
  
//     if (!nameRegex.test(formFields.FirstName) || !nameRegex.test(formFields.userName)) {
//       alertAndPrevent("Invalid name, please enter correctly.");
//       return false;
//     }
  
//     if (!emailRegex.test(formFields.Email)) {
//       alertAndPrevent("Invalid email, please enter correctly.");
//       return false;
//     }
  
//     if (!phoneRegex.test(formFields.PhoneNumber)) {
//       alertAndPrevent("Invalid phone number, please enter integers only.");
//       return false;
//     }
  
//     if (formFields.PhoneNumber.length > 13) {
//       alertAndPrevent("Invalid phone number, too long.");
//       return false;
//     }
  
//     if (formFields.Password.length < 5) {
//       alertAndPrevent("Invalid password, must be at least 5 characters long.");
//       return false;
//     }
  
//     if (formFields.Password.length > 10) {
//       alertAndPrevent("Invalid password, must be at less than 10 characters.");
//       return false;
//     }
  
//     if (formFields.Password !== formFields.ConfirmPass) {
//       alertAndPrevent("Passwords do not match.");
//       return false;
//     }
  
//     $.ajax({
//       type: "POST",
//       url: "signup",
//       data: {
//         username: formFields.userName,
//         name: formFields.FirstName,
//         email: formFields.Email,
//         gender: formFields.gender,
//         type: formFields.type,
//         password: formFields.Password,
//         phone: formFields.PhoneNumber,
//         'csrfmiddlewaretoken': '{{ csrf_token }}'
//       },
//       dataType: "json",
//       success: function(data) {
//         console.log(data);
//       }
//     });
//   }
  
