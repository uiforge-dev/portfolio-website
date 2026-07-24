// ==========================
// Element Selection
// ==========================

const form = document.getElementById("validationForm");

const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");
const termsError = document.getElementById("termsError");

// ==========================
// Helper Functions
// ==========================

function showError(input, message, errorElement) {
    input.parentElement.classList.remove("success");
    input.parentElement.classList.add("error-border");
    errorElement.textContent = message;
}

function showSuccess(input, errorElement) {
    input.parentElement.classList.remove("error-border");
    input.parentElement.classList.add("success");
    errorElement.textContent = "";
}

// ==========================
// Validation Functions
// ==========================

// Full Name

function validateName() {

    const value = fullname.value.trim();

    const regex = /^[A-Za-z\s]{3,}$/;

    if (value === "") {
        showError(fullname, "Full name is required.", nameError);
        return false;
    }

    if (!regex.test(value)) {
        showError(
            fullname,
            "Minimum 3 letters. Only alphabets allowed.",
            nameError
        );
        return false;
    }

    showSuccess(fullname, nameError);
    return true;
}

// Email

function validateEmail() {

    const value = email.value.trim();

    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === "") {
        showError(email, "Email is required.", emailError);
        return false;
    }

    if (!regex.test(value)) {
        showError(email, "Enter a valid email address.", emailError);
        return false;
    }

    showSuccess(email, emailError);
    return true;
}

// Phone

function validatePhone() {

    const value = phone.value.trim();

    const regex = /^\+?[0-9]{10,15}$/;

    if (value === "") {
        showError(phone, "Phone number is required.", phoneError);
        return false;
    }

    if (!regex.test(value)) {
        showError(
            phone,
            "Phone must contain 10-15 digits.",
            phoneError
        );
        return false;
    }

    showSuccess(phone, phoneError);
    return true;
}

// Password

function validatePassword() {

    const value = password.value;

    const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (value === "") {
        showError(password, "Password is required.", passwordError);
        return false;
    }

    if (!regex.test(value)) {
        showError(
            password,
            "Use 8+ chars, uppercase, lowercase, number & symbol.",
            passwordError
        );
        return false;
    }

    showSuccess(password, passwordError);
    return true;
}

// Confirm Password

function validateConfirmPassword() {

    if (confirmPassword.value === "") {
        showError(
            confirmPassword,
            "Please confirm your password.",
            confirmError
        );
        return false;
    }

    if (confirmPassword.value !== password.value) {
        showError(
            confirmPassword,
            "Passwords do not match.",
            confirmError
        );
        return false;
    }

    showSuccess(confirmPassword, confirmError);
    return true;
}
// ==========================
// Element Selection
// ==========================

const form = document.getElementById("validationForm");

const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");
const termsError = document.getElementById("termsError");

// ==========================
// Helper Functions
// ==========================

function showError(input, message, errorElement) {
    input.parentElement.classList.remove("success");
    input.parentElement.classList.add("error-border");
    errorElement.textContent = message;
}

function showSuccess(input, errorElement) {
    input.parentElement.classList.remove("error-border");
    input.parentElement.classList.add("success");
    errorElement.textContent = "";
}

// ==========================
// Validation Functions
// ==========================

// Full Name

function validateName() {

    const value = fullname.value.trim();

    const regex = /^[A-Za-z\s]{3,}$/;

    if (value === "") {
        showError(fullname, "Full name is required.", nameError);
        return false;
    }

    if (!regex.test(value)) {
        showError(
            fullname,
            "Minimum 3 letters. Only alphabets allowed.",
            nameError
        );
        return false;
    }

    showSuccess(fullname, nameError);
    return true;
}

// Email

function validateEmail() {

    const value = email.value.trim();

    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === "") {
        showError(email, "Email is required.", emailError);
        return false;
    }

    if (!regex.test(value)) {
        showError(email, "Enter a valid email address.", emailError);
        return false;
    }

    showSuccess(email, emailError);
    return true;
}

// Phone

function validatePhone() {

    const value = phone.value.trim();

    const regex = /^\+?[0-9]{10,15}$/;

    if (value === "") {
        showError(phone, "Phone number is required.", phoneError);
        return false;
    }

    if (!regex.test(value)) {
        showError(
            phone,
            "Phone must contain 10-15 digits.",
            phoneError
        );
        return false;
    }

    showSuccess(phone, phoneError);
    return true;
}

// Password

function validatePassword() {

    const value = password.value;

    const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (value === "") {
        showError(password, "Password is required.", passwordError);
        return false;
    }

    if (!regex.test(value)) {
        showError(
            password,
            "Use 8+ chars, uppercase, lowercase, number & symbol.",
            passwordError
        );
        return false;
    }

    showSuccess(password, passwordError);
    return true;
}

// Confirm Password

function validateConfirmPassword() {

    if (confirmPassword.value === "") {
        showError(
            confirmPassword,
            "Please confirm your password.",
            confirmError
        );
        return false;
    }

    if (confirmPassword.value !== password.value) {
        showError(
            confirmPassword,
            "Passwords do not match.",
            confirmError
        );
        return false;
    }

    showSuccess(confirmPassword, confirmError);
    return true;
}