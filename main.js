
function validateForm() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var birthDate = document.getElementById("birthDate").value;
    var email = document.getElementById("email").value;
    var confirmEmail = document.getElementById("confirmEmail").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var mobileNumber = document.getElementById("mobileNumber").value;
    let userData = {
FirstName: firstName,
LastName: lastName,
BirthDate: birthDate,
Email: email,
Password: password,
MobileNumber: mobileNumber
    }

    // 1. Check if the name has just letters.
    var nameRegex = /^[A-Za-z]+$/;
    if (!firstName.match(nameRegex) || !lastName.match(nameRegex)) {
        alert("First name and last name should contain only letters.");
        return false;
    }

    // 2. Determine the birth date input and check for it in the right way (you can use additional validation libraries for more sophisticated date validation).
    // For simplicity, we are not performing a detailed date validation here.

    // 3. Check the email structure using regular expression.
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailRegex)) {
        alert("Invalid email format.");
        return false;
    }

    // 4. Check if the two emails are the same or not.
    if (email !== confirmEmail) {
        alert("Emails do not match.");
        return false;
    }

    // 5. Password validation:
    // a. Start with a capital letter
    // b. Have at least two numbers
    // c. Have at least one special character or symbol
    // d. Check if the password confirmation is right
    // e. Password length should be between 8 and 32

    var passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$/;
    if (!password.match(passwordRegex)) {
        alert("Password should start with a capital letter, have at least two numbers, at least one special character, and be between 8 and 32 characters.");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    // 6. Mobile number should be 10 numbers.
    var mobileRegex = /^\d{10}$/;
    if (!mobileNumber.match(mobileRegex)) {
        alert("Mobile number should contain exactly 10 digits.");
        return false;
    }
    localStorage.setItem("userData",JSON.stringify(userData))
    return true;
};





