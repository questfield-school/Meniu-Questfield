const fullMenu = {
    1: [
        { zi: "Luni", f1: "Supă cremă de dovleac", f2: "Pui cu smântână și mămăligă", desert: "Fructe de sezon", alergeni: "Lactoză, Țelină" },
        { zi: "Marți", f1: "Ciorbă de perișoare", f2: "Penne cu sos de roșii și busuioc", desert: "Iaurt", alergeni: "Gluten, Ou" }
        // ... poți adăuga restul zilelor
    ],
    2: [
        { zi: "Luni", f1: "Supă de pui cu tăiței", f2: "Chifteluțe marinate cu piure", desert: "Biscuiți de casă", alergeni: "Gluten" }
    ],
    3: [], // Săptămâna 3
    4: []  // Săptămâna 4
};

function changeWeek(weekNum) {
    const container = document.getElementById('menu-display');
    const buttons = document.querySelectorAll('.tab-btn');
    
    // Update butoane
    buttons.forEach((btn, index) => {
        btn.classList.toggle('active', index + 1 === weekNum);
    });

    // Generare carduri
    const days = fullMenu[weekNum] || [];
    if (days.length === 0) {
        container.innerHTML = "<p>Meniul pentru această săptămână nu a fost încă încărcat.</p>";
        return;
    }

    container.innerHTML = days.map(d => `
        <div class="day-card">
            <h3>${d.zi}</h3>
            <div class="dish"><span class="label">Felul 1</span>${d.f1}</div>
            <div class="dish"><span class="label">Felul 2</span>${d.f2}</div>
            <div class="dish"><span class="label">Desert</span>${d.desert}</div>
            <div class="allergen-trigger" data-info="${d.alergeni}">⚠️ Alergeni</div>
        </div>
    `).join('');
}

// Afișează săptămâna 1 la început
document.addEventListener('DOMContentLoaded', () => changeWeek(1));
