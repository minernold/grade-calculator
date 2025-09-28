//
// element bekeres
//
const styleSheet: HTMLLinkElement = document.querySelector(
  "#styleSheet"
) as HTMLLinkElement;

const changeColor: HTMLButtonElement = document.querySelector(
  "#changeColor"
) as HTMLButtonElement;

const maxPont: HTMLInputElement = document.querySelector(
  "#maxPont"
) as HTMLInputElement;

const elertPont: HTMLInputElement = document.querySelector(
  "#elertPont"
) as HTMLInputElement;

const otosHatar: HTMLInputElement = document.querySelector(
  "#otosHatar"
) as HTMLInputElement;

const negyesHatar: HTMLInputElement = document.querySelector(
  "#negyesHatar"
) as HTMLInputElement;

const harmasHatar: HTMLInputElement = document.querySelector(
  "#harmasHatar"
) as HTMLInputElement;

const kettesHatar: HTMLInputElement = document.querySelector(
  "#kettesHatar"
) as HTMLInputElement;

const ertekeles: HTMLButtonElement = document.querySelector(
  "#ertekeles"
) as HTMLButtonElement;

const ertekelesResz: HTMLDivElement = document.querySelector(
  "#ertekelesResz"
) as HTMLDivElement;

//
// eventListeners
//

let activeColor: string = "light";
changeColor.addEventListener("click", colorChanger);

let created: boolean = false;
ertekeles.addEventListener("click", () => {
  if (created == false) {
    percentage();
    created = true;
  } else {
    const ertekeles1: HTMLParagraphElement = document.querySelector(
      "#valasz"
    ) as HTMLParagraphElement;
    ertekeles1.remove();
    percentage();
  }
});

//
// saving percentages
//

["otosHatar", "negyesHatar", "harmasHatar", "kettesHatar"].forEach((id) => {
  const el = document.getElementById(id) as HTMLInputElement | null;
  if (!el) return;

  // Betöltés localStorage-ből
  const saved = localStorage.getItem(id);
  if (saved !== null) el.value = saved;

  // Mentés változáskor
  el.addEventListener("input", () => {
    localStorage.setItem(id, el.value);
  });
});

//
// functions
//

function colorChanger(): void {
  if (activeColor == "light") {
    styleSheet.href = "altStyle.css";
    changeColor.innerHTML = "☀️";
    activeColor = "dark";
    changeColor.title = "Világos módra váltás";
  } else {
    styleSheet.href = "style.css";
    changeColor.innerHTML = "🌑";
    activeColor = "light";
    changeColor.title = "Sötét módra váltás";
  }
}

function percentage(): void {
  let valasz = ertekelesResz.appendChild(document.createElement("p"));
  const maxpont = Number(maxPont.value);
  const elertpont = Number(elertPont.value);
  if (maxpont > 0) {
    let szazalek: string = Math.floor((elertpont / maxpont) * 100) + "%";
    valasz.id = "valasz";
    valasz.innerHTML = `A diák eredménye: ${jegy(
      maxpont,
      elertpont
    )} ${szazalek}`;
  } else {
    valasz.id = "valasz";
    valasz.innerHTML = "Kérem valós számot adjon meg!";
  }

  function jegy(maxpont: number, elertpont: number): string {
    let szazalek: number = Math.floor((elertpont / maxpont) * 100);
    if (szazalek >= Number(otosHatar.value)) {
      return "5 (jeles)";
    } else if (szazalek >= Number(negyesHatar.value)) {
      return "4 (jó)";
    } else if (szazalek >= Number(harmasHatar.value)) {
      return "3 (közepes)";
    } else if (szazalek >= Number(kettesHatar.value)) {
      return "2 (elégséges)";
    } else return "1 (elégtelen)";
  }
}
