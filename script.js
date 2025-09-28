//
// element bekeres
//
const styleSheet = document.querySelector("#styleSheet");
const changeColor = document.querySelector("#changeColor");
const maxPont = document.querySelector("#maxPont");
const elertPont = document.querySelector("#elertPont");
const otosHatar = document.querySelector("#otosHatar");
const negyesHatar = document.querySelector("#negyesHatar");
const harmasHatar = document.querySelector("#harmasHatar");
const kettesHatar = document.querySelector("#kettesHatar");
const ertekeles = document.querySelector("#ertekeles");
const ertekelesResz = document.querySelector("#ertekelesResz");
//
// eventListeners
//
let activeColor = "light";
changeColor.addEventListener("click", colorChanger);
let created = false;
ertekeles.addEventListener("click", () => {
    if (created == false) {
        percentage();
        created = true;
    }
    else {
        const ertekeles1 = document.querySelector("#valasz");
        ertekeles1.remove();
        percentage();
    }
});
//
// saving percentages
//
["otosHatar", "negyesHatar", "harmasHatar", "kettesHatar"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el)
        return;
    // Betöltés localStorage-ből
    const saved = localStorage.getItem(id);
    if (saved !== null)
        el.value = saved;
    // Mentés változáskor
    el.addEventListener("input", () => {
        localStorage.setItem(id, el.value);
    });
});
//
// functions
//
function colorChanger() {
    if (activeColor == "light") {
        styleSheet.href = "altStyle.css";
        changeColor.innerHTML = "☀️";
        activeColor = "dark";
        changeColor.title = "Világos módra váltás";
    }
    else {
        styleSheet.href = "style.css";
        changeColor.innerHTML = "🌑";
        activeColor = "light";
        changeColor.title = "Sötét módra váltás";
    }
}
function percentage() {
    let valasz = ertekelesResz.appendChild(document.createElement("p"));
    const maxpont = Number(maxPont.value);
    const elertpont = Number(elertPont.value);
    if (maxpont > 0) {
        let szazalek = Math.floor((elertpont / maxpont) * 100) + "%";
        valasz.id = "valasz";
        valasz.innerHTML = `A diák eredménye: ${jegy(maxpont, elertpont)} ${szazalek}`;
    }
    else {
        valasz.id = "valasz";
        valasz.innerHTML = "Kérem valós számot adjon meg!";
    }
    function jegy(maxpont, elertpont) {
        let szazalek = Math.floor((elertpont / maxpont) * 100);
        if (szazalek >= Number(otosHatar.value)) {
            return "5 (jeles)";
        }
        else if (szazalek >= Number(negyesHatar.value)) {
            return "4 (jó)";
        }
        else if (szazalek >= Number(harmasHatar.value)) {
            return "3 (közepes)";
        }
        else if (szazalek >= Number(kettesHatar.value)) {
            return "2 (elégséges)";
        }
        else
            return "1 (elégtelen)";
    }
}
export {};
//# sourceMappingURL=script.js.map