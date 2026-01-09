// Configuration
const CONFIG = {
    SHEET_ID: '1RpPfd-5vti-R4TBKCusr1gok-O7eTSdC42be_YlwSkA',
    API_KEY: 'YOUR_API_KEY_HERE', // Înlocuiește cu cheia ta API
    RANGE: 'Sheet1!A:F'
};

// State
let currentWeekOffset = 0;

// DOM Elements
const elements = {
    prevWeek: document.getElementById('prevWeek'),
    nextWeek: document.getElementById('nextWeek'),
    goToCurrentWeek: document.getElementById('goToCurrentWeek'),
    weekDates: document.getElementById('weekDates'),
    currentWeekBadge: document.getElementById('currentWeekBadge'),
    loading: document.getElementById('loading'),
    error: document.getElementById('error'),
    menuTable: document.getElementById('menuTable'),
    menuTableBody: document.getElementById('menuTableBody')
};

// Date utilities
function getMondayOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

function formatDate(date) {
    return date.toLocaleDateString('ro-RO', {
        day: '2-digit',
        month: '2-digit',
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

// UI Updates
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
    elements.loading.style.display = 'block';
    elements.error.style.display = 'none';
    elements.menuTable.style.display = 'none';
}

function showError() {
    elements.loading.style.display = 'none';
    elements.error.style.display = 'block';
    elements.menuTable.style.display = 'none';
}

function showMenu() {
    elements.loading.style.display = 'none';
    elements.error.style.display = 'none';
    elements.menuTable.style.display = 'block';
}

// Data loading
async function loadMenuData() {
    showLoading();
    
    try {
        // Pentru producție, folosește Google Sheets API
        // const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SHEET_ID}/values/${CONFIG.RANGE}?key=${CONFIG.API_KEY}`;
        // const response = await fetch(url);
        // const data = await response.json();
        // const menuData = data.values;
        
        // Date mock pentru demonstrație
        const menuData = [
            ['Categorie', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri'],
            ['Supă', 'Supă cremă de legume', 'Ciorbă de burtă', 'Supă cremă de ciuperci', 'Ciorbă țărănească', 'Supă cremă de roșii'],
            ['Fel Principal 1', 'Pui la grătar cu cartofi', 'Mușchi file cu orez', 'Somon la cuptor cu legume', 'Cotlet de porc cu piure', 'Paste carbonara'],
            ['Fel Principal 2', 'Salată Caesar', 'Tocăniță cu mămăligă', 'Chiftele cu sos roșu', 'Schnițel vienez', 'Pizza Margherita'],
            ['Garnitură', 'Cartofi prăjiți / Orez', 'Piure / Fasole', 'Legume la abur', 'Cartofi wedges', 'Salată de varză'],
            ['Desert', 'Prăjitură cu ciocolată', 'Clătite cu gem', 'Salată de fructe', 'Tiramisu', 'Papanași']
        ];
        
        // Simulare delay pentru loading
        await new Promise(resolve => setTimeout(resolve, 500));
        
        renderMenuTable(menuData);
        showMenu();
    } catch (err) {
        console.error('Error loading menu data:', err);
        showError();
    }
}

function renderMenuTable(data) {
    elements.menuTableBody.innerHTML = '';
    
    // Skip header row (index 0)
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const tr = document.createElement('tr');
        
        row.forEach((cell, index) => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        
        elements.menuTableBody.appendChild(tr);
    }
}

// Event listeners
elements.prevWeek.addEventListener('click', () => {
    currentWeekOffset--;
    updateWeekDisplay();
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

// Initialize
updateWeekDisplay();
loadMenuData();


