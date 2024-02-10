document.addEventListener("DOMContentLoaded", function() {
    const categoryButtons = document.querySelectorAll(".category-buttons button");
    const messageForm = document.querySelector(".message-form");
    const createPromiseButton = document.querySelector(".message-form button");
    const messageInput = document.getElementById("message");

    // Function to show Your Promise text and input box, and Create Promise button
    function showPromiseForm() {
        document.querySelector(".message-form h2").style.display = "block";
        messageInput.style.display = "block";
        createPromiseButton.style.display = "block";
    }

    // Function to parse URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Event listener for category buttons
    categoryButtons.forEach(button => {
        button.addEventListener("click", function() {
            // Remove "active" class from all buttons
            categoryButtons.forEach(btn => {
                btn.classList.remove("active");
            });
            // Add "active" class to the clicked button
            this.classList.add("active");

            // Show Your Promise text and input box, and Create Promise button
            showPromiseForm();

            // Change background color of the whole page based on category
            document.body.style.backgroundColor = window.getComputedStyle(button).backgroundColor;
        });
    });

    // Function to generate unique ID
    function generateUniqueId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    // Function to copy text to clipboard
    function copyToClipboard(text) {
        const tempInput = document.createElement("input");
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
    }

    // Event listener for Create Promise button
    createPromiseButton.addEventListener("click", function() {
        const promiseId = generateUniqueId();
        const selectedCategoryButton = document.querySelector(".category-buttons button.active");
        const promiseCategory = selectedCategoryButton ? selectedCategoryButton.classList[0] : "";
        const promiseMessage = messageInput.value;

        const promiseLink = window.location.href + "?promiseId=" + promiseId + "&category=" + promiseCategory + "&message=" + encodeURIComponent(promiseMessage);

        // Copy the generated link to clipboard
        copyToClipboard(promiseLink);
        alert("Link copied to clipboard!");
    });

    // Check if the page was loaded from a copied link
    const promiseId = getUrlParameter("promiseId");
    if (promiseId) {
        // Set background color based on category
        const category = getUrlParameter("category");
        const categoryButton = document.querySelector("." + category);
        document.body.style.backgroundColor = window.getComputedStyle(categoryButton).backgroundColor;

        // Display the promise message
        const message = getUrlParameter("message");
        messageInput.value = decodeURIComponent(message);
        showPromiseForm();
    }
});
