// Required: Use async/await OR .then() for API calls
// Required: Use try/catch OR .catch() for error handling
// Example API call
const spinner = document.getElementById("loading-spinner");
async function searchCountry(countryName) {
    try {
        // Show loading spinner
        // Fetch country data
        // Update DOM
        // Fetch bordering countries
        // Update bordering countries section
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();
    } catch (error) {
        // Show error message
    } finally {
        // Hide loading spinner
    }
}

// Event listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});