const spinner = document.getElementById("loading-spinner");
document.getElementById("country-info").classList.add("hidden");
document.getElementById("error-message").classList.add("hidden");
async function searchCountry(countryName) {
    try {
        
        spinner.classList.remove("hidden");
        const response = await fetch(`https://countries.dev/name/${countryName}`);
        const country = await response.json();
        const countryData = country[0];
        // console.log(countryData);

        
        document.getElementById('country-info').innerHTML = `
        <h2>${countryData.name}</h2>
        <p><strong>Capital:</strong> ${countryData.capital}</p>
        <p><strong>Population:</strong> ${countryData.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${countryData.region}</p>
        <img src="${countryData.flags.svg}" alt="${countryData.name} flag">
        `;

        const arrBorders = countryData.borders;
        
        const parentSection = document.getElementById('bordering-countries');
        parentSection.replaceChildren();
        for (let i = 0; i < arrBorders.length; ++i) {
            try {
                const response = await fetch(`https://countries.dev/alpha/${arrBorders[i]}`);
                const data = await response.json();
                const countryData = data;
                // console.log(countryData);
            
                const item = document.createElement("section");
                item.innerHTML= `
                <h2>${countryData.name}</h2>
                <img src="${countryData.flags.svg}" alt="${countryData.name} flag">
                `
                parentSection.appendChild(item);
            }
            catch (error) {
                document.getElementById("error-message").innerHTML = `
                <p><strong>${"Invalid input"}</strong> </p>
                `;
                document.getElementById("country-info").classList.add("hidden");
            }

        }

        if(arrBorders.length === 0) {
            parentSection.innerHTML = `
            <p>${"No neighbours"}</p>
            `;
        }



    } catch (error) {
        // Show error message
        console.error(error);
        document.getElementById("error-message").innerHTML = `
        <p><strong>${"Invalid input"}</strong> </p>
        `;
        document.getElementById("country-info").classList.add("hidden");
    } finally {
        // Hide loading spinner
        spinner.classList.add("hidden");
        document.getElementById("country-info").classList.remove("hidden");
        

    }
}

// Event listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});
