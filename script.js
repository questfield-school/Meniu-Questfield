// ==========================================
// 1. CONFIGURATION & TRANSLATIONS
// ==========================================
const CONFIG = {
    SHEET_ID: '1RpPfd-5vti-R4TBKCusr1gok-O7eTSdC42be_YlwSkA',
    API_KEY: 'YOUR_API_KEY_HERE', 
    RANGE: 'Sheet1!A:F' 
};

// Dicționarul de traduceri pentru interfață
const TRANSLATIONS = {
    ro: {
        locale: 'ro-RO',
        subtitle: "Meniu Săptămânal",
        prevWeek: "Săpt. Anterioară",
        nextWeek: "Săpt. Următoare",
        currentWeekBadge: "Săptămâna Curentă",
        backToCurrent: "Înapoi la Săptămâna Curentă",
        loading: "Se încarcă meniul...",
        error: "Nu s-au putut încărca datele meniului.",
        category: "Categorie",
        mon: "Luni",
        tue: "Marți",
        wed: "Miercuri",
        thu: "Joi",
        fri: "Vineri",
        disclaimer: "* Ingredientele pot varia în funcție de disponibilitate.",
        footerNote: "Meniul poate suferi modificări în funcție de disponibilitatea ingredientelor.",
        contact: "Contact bucătărie:"
    },
    en: {
        locale: 'en-GB',
        subtitle: "Weekly Menu",
        prevWeek: "Previous Week",
        nextWeek: "Next Week",
        currentWeekBadge: "Current Week",
        backToCurrent: "Back to Current Week",
        loading: "Loading menu...",
        error: "Could not load menu data.",
        category: "Category",
        mon: "Monday",
        tue: "Tuesday",
        wed: "Wednesday",
        thu: "Thursday",
        fri: "Friday",
        disclaimer: "* Ingredients may vary based on availability.",
        footerNote: "Menu subject to change based on ingredient availability.",
        contact: "Kitchen contact:"
    }
};

// ==========================================
// 2. STATE MANAGEMENT
// ==========================================
let currentWeekOffset = 0;
let currentLanguage = 'ro'; // 'ro' sau 'en'

// ==========================================
// 3. DOM ELEMENTS
// ==========================================
const elements = {
    // Navigare
    prevWeek: document.getElementById('prevWeek'),
    nextWeek: document.getElementById('nextWeek'),
    goToCurrentWeek: document.getElementById('goToCurrentWeek'),
    weekDates: document.getElementById('weekDates'),
    currentWeekBadge: document.getElementById('currentWeekBadge'),
    
    // Status
    loading: document.getElementById('loading'),
    error: document.getElementById('error'),
    
    // Tabel
    menuTable: document.getElementById('menuTable'),
    menuTableBody: document.getElementById('menuTableBody'),
    
    // Limba
    btnRo: document.getElementById('btn-ro'),
    btnEn: document.getElementById('btn-en')
};

// ==========================================
// 4. DATE UTILITIES
// ==========================================
function getMondayOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

function formatDate(date) {
    // Formatăm data în funcție de limba selectată (ro-RO sau en-GB)
    const locale = TRANSLATIONS[currentLanguage].locale;
    return date.toLocaleDateString(locale, {
        day: '2-digit',
        month: 'short', // 'short' arată "Ian" sau "Jan"
        year: 'numeric'
    });
}

function getFridayOfWeek(monday) {
    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4);
    return friday;
}

function getCurrentWeekMonday() {
    const today = new Date();
    const monday = getMondayOfWeek(today);
    monday.setDate(monday.getDate() + (currentWeekOffset * 7));
    return monday;
}

// ==========================================
// 5. UI UPDATES & TRANSLATION LOGIC
// ==========================================

function updateStaticText() {
    const t = TRANSLATIONS[currentLanguage];
    
    // 1. Actualizăm toate elementele care au atributul data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.textContent = t[key];
        }
    });

    // 2. Actualizăm starea vizuală a butoanelor de limbă
    if (currentLanguage === 'ro') {
        elements.btnRo.classList.add('active');
        elements.btnEn.classList.remove('active');
    } else {
        elements.btnRo.classList.remove('active');
        elements.btnEn.classList.add('active');
    }
}

function updateWeekDisplay() {
    const monday = getCurrentWeekMonday();
    const friday = getFridayOfWeek(monday);
    const isCurrentWeek = currentWeekOffset === 0;

    elements.weekDates.textContent = `${formatDate(monday)} - ${formatDate(friday)}`;
    
    if (isCurrentWeek) {
        elements.currentWeekBadge.style.display = 'block';
        elements.goToCurrentWeek.style.display = 'none';
    } else {
        elements.currentWeekBadge.style.display = 'none';
        elements.goToCurrentWeek.style.display = 'block';
    }
}

function showLoading() {
    elements.loading.style.display = 'flex'; // flex pentru centrare
    elements.error.style.display = 'none';
    elements.menuTable.style.display = 'none';
}

function showMenu() {
    elements.loading.style.display = 'none';
    elements.error.style.display = 'none';
    elements.menuTable.style.display = 'block';
}

function showError() {
    elements.loading.style.display = 'none';
    elements.error.style.display = 'block';
    elements.menuTable.style.display = 'none';
}

// ==========================================
// 6. DATA LOADING & MOCK DATA
// ==========================================

async function loadMenuData() {
    showLoading();
    
    try {
        // AICI AR VENI FETCH-UL REAL CĂTRE GOOGLE SHEETS
        // const response = await fetch(...)
        // const data = await response.json();

        // SIMULARE DATE (MOCK DATA)
        // Simulăm un delay de rețea
        await new Promise(resolve => setTimeout(resolve, 600));

        // Definim datele pentru ambele limbi
        // NOTĂ: Într-un scenariu real cu Google Sheets, am primi un singur set mare de date
        // și am alege coloanele potrivite. Aici am creat două seturi pentru claritate.
        
        const mockDataRO = [
            ['Categorie', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri'], // Header (ignorat la randare)
            ['Supă', 'Supă cremă de legume', 'Ciorbă de burtă', 'Supă cremă de ciuperci', 'Ciorbă țărănească', 'Supă cremă de roșii'],
            ['Fel Principal', 'Pui la grătar cu cartofi', 'Mușchi file cu orez', 'Somon la cuptor', 'Cotlet de porc', 'Paste carbonara'],
            ['Vegetarian', 'Salată Caesar', 'Tocăniță cu mămăligă', 'Chiftele de legume', 'Schnițel de soia', 'Pizza Margherita'],
            ['Garnitură', 'Cartofi prăjiți', 'Piure', 'Legume la abur', 'Cartofi wedges', 'Salată de varză'],
            ['Desert', 'Prăjitură cu ciocolată', 'Clătite cu gem', 'Salată de fructe', 'Tiramisu', 'Papanași']
        ];

        const mockDataEN = [
            ['Category', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            ['Soup', 'Vegetable Cream Soup', 'Tripe Soup', 'Mushroom Cream Soup', 'Peasant Soup', 'Tomato Cream Soup'],
            ['Main Course', 'Grilled Chicken w/ Potatoes', 'Pork Filet w/ Rice', 'Baked Salmon', 'Pork Chop', 'Carbonara Pasta'],
            ['Vegetarian', 'Caesar Salad', 'Stew with Polenta', 'Veggie Meatballs', 'Soy Schnitzel', 'Pizza Margherita'],
            ['Side Dish', 'French Fries', 'Mashed Potatoes', 'Steamed Veggies', 'Wedges', 'Cabbage Salad'],
            ['Dessert', 'Chocolate Cake', 'Jam Pancakes', 'Fruit Salad', 'Tiramisu', 'Donuts (Papanași)']
        ];

        // Selectăm datele în funcție de limba curentă
        const dataToRender = (currentLanguage === 'ro') ? mockDataRO : mockDataEN;
        
        renderMenuTable(dataToRender);
        showMenu();

    } catch (err) {
        console.error('Error loading menu data:', err);
        showError();
    }
}

function renderMenuTable(data) {
    elements.menuTableBody.innerHTML = '';
    
    // Iterăm începând cu index 1 pentru a sări peste rândul de header din datele brute
    // (Header-ul tabelului este deja definit în HTML)
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const tr = document.createElement('tr');
        
        // Prima celulă este Categoria (o facem <th> sau bold prin CSS)
        row.forEach((cell, index) => {
            const td = document.createElement('td');
            td.textContent = cell;
            
            // Adăugăm o clasă specială pentru prima coloană (Categorie)
            if (index === 0) {
                td.classList.add('category-cell'); 
            }
            
            // Adăugăm etichete pentru mobil (data-label="Luni", etc.)
            // Asta ajută la CSS-ul responsive dacă vrei să faci "stacked cards" pe mobil
            const headers = (currentLanguage === 'ro') 
                ? ['Categorie', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri']
                : ['Category', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
            td.setAttribute('data-label', headers[index]);

            tr.appendChild(td);
        });
        
        elements.menuTableBody.appendChild(tr);
    }
}

// ==========================================
// 7. EVENT LISTENERS & INIT
// ==========================================

// Navigare săptămâni
elements.prevWeek.addEventListener('click', () => {
    currentWeekOffset--;
    updateWeekDisplay();
    // Nu e nevoie să reîncărcăm datele dacă sunt statice, 
    // dar într-o aplicație reală am încărca meniul pentru săptămâna nouă:
    loadMenuData(); 
});

elements.nextWeek.addEventListener('click', () => {
    currentWeekOffset++;
    updateWeekDisplay();
    loadMenuData();
});

elements.goToCurrentWeek.addEventListener('click', () => {
    currentWeekOffset = 0;
    updateWeekDisplay();
    loadMenuData();
});

// Schimbare limbă
window.changeLanguage = function(lang) {
    if (currentLanguage === lang) return; // Nu face nimic dacă limba e deja selectată
    
    currentLanguage = lang;
    
    // 1. Actualizează textele interfeței
    updateStaticText();
    
    // 2. Actualizează formatul datelor calendaristice
    updateWeekDisplay();
    
    // 3. Reîncarcă datele meniului (pentru a lua versiunea tradusă)
    loadMenuData();
};

// Inițializare la pornire
updateStaticText(); // Setează limba default (RO)
updateWeekDisplay();
loadMenuData();


