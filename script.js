let i18n = {};

fetch("https://opensheet.elk.sh/1RpPfd-5vti-R4TBKCusr1gok-O7eTSdC42be_YlwSkA/i18n")
  .then(response => response.json())
  .then(rows => {
    rows.forEach(row => {
      const { lang, key, value } = row;

      if (!i18n[lang]) {
        i18n[lang] = {
          days: {}
        };
      }

      if (key.startsWith("days.")) {
        const day = key.split(".")[1];
        i18n[lang].days[day] = value;
      } else {
        i18n[lang][key] = value;
      }
    });

    // 👉 pornește aplicația DUPĂ ce se încarcă traducerile
    changeWeek(1);
  })
  .catch(error => {
    console.error("Eroare la încărcarea i18n:", error);
  });



