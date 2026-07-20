// ==========================================
// UIForge Password Generator
// Professional Edition
// Part 1 of 2
// ==========================================

// Character Sets
const CHAR_SETS = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"
};

// DOM Elements
const passwordInput = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
const generateBtn = document.getElementById("generateBtn");

const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercaseCheck = document.getElementById("uppercase");
const lowercaseCheck = document.getElementById("lowercase");
const numbersCheck = document.getElementById("numbers");
const symbolsCheck = document.getElementById("symbols");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

const toast = document.getElementById("toast");

// =========================
// Secure Random Functions
// =========================

function getSecureRandom(max) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
}

function randomCharacter(characters) {
    return characters[getSecureRandom(characters.length)];
}

// =========================
// Slider
// =========================

lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});

// =========================
// Password Generator
// =========================

function generatePassword() {

    const selectedSets = [];

    if (uppercaseCheck.checked) {
        selectedSets.push(CHAR_SETS.uppercase);
    }

    if (lowercaseCheck.checked) {
        selectedSets.push(CHAR_SETS.lowercase);
    }

    if (numbersCheck.checked) {
        selectedSets.push(CHAR_SETS.numbers);
    }

    if (symbolsCheck.checked) {
        selectedSets.push(CHAR_SETS.symbols);
    }

    if (selectedSets.length === 0) {

        passwordInput.value = "Select at least one option";

        updateStrength("");

        return;
    }

    const passwordLength = Number(lengthSlider.value);

    const passwordArray = [];

    // Guarantee one character from every selected set

    selectedSets.forEach(set => {
        passwordArray.push(randomCharacter(set));
    });

    // Combine all selected characters

    const allCharacters = selectedSets.join("");

    while (passwordArray.length < passwordLength) {

        passwordArray.push(
            randomCharacter(allCharacters)
        );

    }

    shuffleArray(passwordArray);

    const password = passwordArray.join("");

    passwordInput.value = password;

    updateStrength(password);
}
// ==========================================
// UIForge Password Generator
// Professional Edition
// Part 2 of 2
// ==========================================

// =========================
// Fisher–Yates Shuffle
// =========================

function shuffleArray(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = getSecureRandom(i + 1);

        [array[i], array[j]] = [array[j], array[i]];

    }

}

// =========================
// Password Strength
// =========================

function updateStrength(password) {

    if (!password) {

        strengthBar.style.width = "0%";
        strengthBar.style.background = "#ef4444";
        strengthText.textContent = "No Password";

        return;
    }

    let score = 0;

    // Length
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (password.length >= 20) score++;

    // Character Types
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 3) {

        strengthBar.style.width = "25%";
        strengthBar.style.background = "#ef4444";
        strengthText.textContent = "Weak";

    } else if (score <= 5) {

        strengthBar.style.width = "50%";
        strengthBar.style.background = "#f59e0b";
        strengthText.textContent = "Medium";

    } else if (score <= 7) {

        strengthBar.style.width = "75%";
        strengthBar.style.background = "#22c55e";
        strengthText.textContent = "Strong";

    } else {

        strengthBar.style.width = "100%";
        strengthBar.style.background = "#3b82f6";
        strengthText.textContent = "Very Strong";

    }

}

// =========================
// Toast Notification
// =========================

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}

// =========================
// Copy Password
// =========================

async function copyPassword() {

    const password = passwordInput.value;

    if (
        password === "" ||
        password === "Select at least one option"
    ) {
        return;
    }

    try {

        await navigator.clipboard.writeText(password);

        const icon = copyBtn.querySelector("i");

        icon.className = "fa-solid fa-check";

        showToast("Password copied!");

        setTimeout(() => {

            icon.className = "fa-regular fa-copy";

        }, 1500);

    } catch (error) {

        alert("Unable to copy password.");

    }

}

// =========================
// Event Listeners
// =========================

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", copyPassword);

[
    uppercaseCheck,
    lowercaseCheck,
    numbersCheck,
    symbolsCheck,
    lengthSlider
].forEach((element) => {

    element.addEventListener("change", generatePassword);

});

// =========================
// Initial Password
// =========================

window.addEventListener("DOMContentLoaded", () => {

    lengthValue.textContent = lengthSlider.value;

    generatePassword();

});