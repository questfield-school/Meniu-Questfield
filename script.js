// Datele meniului - Aici poți modifica mâncarea pentru fiecare zi
const menuData = [
    {
        day: "Luni",
        soup: "Supă cremă de legume cu crutoane",
        main: "Piept de pui la grătar cu piure de cartofi",
        dessert: "Fructe proaspete de sezon"
    },
    {
        day: "Marți",
        soup: "Ciorbă de văcuță țărănească",
        main: "Paste Bolognese cu parmezan",
        dessert: "Iaurt cu miere și nuci"
    },
    {
        day: "Miercuri",
        soup: "Supă de pui cu tăieței de casă",
        main: "Pilaf de orez cu ciuperci și salată verde",
        dessert: "Prăjitură de casă cu mere"
    },
    {
        day: "Joi",
        soup: "Supă cremă de roșii cu busuioc",
        main: "Curcan la cuptor cu legume gratinate",
        dessert: "Salam de biscuiți"
    },
    {
        day: "Vineri",
        soup: "Ciorbă de perișoare",
        main: "Pește la cuptor cu mămăliguță și mujdei",
        dessert: "Plăcintă cu brânză dulce"
    }
];

// Funcția care generează HTML-ul
function generateMenu() {
    const container = document.getElementById('menu-container');
    
    // Curățăm containerul înainte (just in case)
    container.innerHTML = '';

    menuData.forEach(item => {
        // Creăm un element div pentru card
        const card = document.createElement('article');
        card.className = 'day-card';

        // Construim conținutul HTML pentru fiecare zi
        card.innerHTML = `
            <div class="card-header">
                <h2>${item.day}</h2>
            </div>
            <div class="card-body">
                <div class="meal-item">
                    <span class="meal-icon">🥣</span>
                    <div class="meal-details">
                        <h3>Supă / Ciorbă</h3>
                        <p>${item.soup}</p>
                    </div>
                </div>
                <div class="meal-item">
                    <span class="meal-icon">🍽️</span>
                    <div class="meal-details">
                        <h3>Fel Principal</h3>
                        <p>${item.main}</p>
                    </div>
                </div>
                <div class="meal-item">
                    <span class="meal-icon">🍪</span>
                    <div class="meal-details">
                        <h3>Gustare / Desert</h3>
                        <p>${item.dessert}</p>
                    </div>
                </div>
            </div>
        `;

        // Adăugăm cardul în pagină
        container.appendChild(card);
    });
}

// Rulăm funcția când pagina s-a încărcat complet
document.addEventListener('DOMContentLoaded', generateMenu);

// Afișează săptămâna 1 la început
document.addEventListener('DOMContentLoaded', () => changeWeek(1));

