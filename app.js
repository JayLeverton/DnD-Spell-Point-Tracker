// Structuring and plans ---------------------

// let spells1 = [{
//     spellName: "Shield",
//     spCost: 2,
//     level: 2
// }];
// let spells2 = {};
// let spells3 = {};
// let spells4 = {};
// let spells5 = {};
// let spells6 = {};
// let spells7 = {};
// let spells8 = {};
// let spells9 = {};

// Example Spell
// let spell = {
//     spellName: "Example Spell",
//     spCost: 2,
//     level: 1
// };

// Logic ---------------------------------------


const spLevelConversion = {
    1: 2,
    2: 3,
    3: 5,
    4: 6,
    5: 7,
    6: 9,
    7: 10,
    8: 11,
    9: 13
}

let spells = [
    // {
    //         spellName: "Example Spell",
    //         spCost: 2,
    //         level: 1
    //     },
    //     {
    //         spellName: "Catapult",
    //         spCost: 3,
    //         level: 2
    //     },
    //     {
    //         spellName: "Fireball",
    //         spCost: 5,
    //         level: 3
    // }
]

const spellLevelContainers = document.querySelectorAll(".spell-level-container");
const addSpellButtons = document.querySelectorAll(".add-spell-button");
const currentSpellPointsInput = document.querySelector(".current-spell-points");
const maxSpellPointsInput = document.querySelector(".max-spell-points");
const longRestButton = document.querySelector(".long-rest-button");
const saveButton = document.querySelector(".save-button");

let spellPointsValue = 100;
let maxSpellPointsValue = 100;
updateSpellPointsInputValue();

function manuallyUpdateCurrentSpellPoints() {
    spellPointsValue = currentSpellPointsInput.value;
}
function manuallyUpdateMaxSpellPoints() {
    maxSpellPointsValue = maxSpellPointsInput.value;
}

function updateSpellPointsInputValue() {
    currentSpellPointsInput.value = spellPointsValue;
    maxSpellPointsInput.value = maxSpellPointsValue;
}

currentSpellPointsInput.addEventListener("change", manuallyUpdateCurrentSpellPoints);
maxSpellPointsInput.addEventListener("change", manuallyUpdateMaxSpellPoints);

const addBlankSpell = (e) => {
    // Add the single spell container.
    let spellLevelContainer = e.target.parentNode.parentNode;
    let singleSpellContainer = document.createElement("div");
    spellLevelContainer.appendChild(singleSpellContainer);
    singleSpellContainer.classList.add("single-spell-container");

    // Add the cast spell name container.
    let castSpellNameContainer = document.createElement("div");
    singleSpellContainer.appendChild(castSpellNameContainer);
    castSpellNameContainer.classList.add("cast-spell-name-container");

    // Add cast button.
    let castButton = document.createElement("button");
    castSpellNameContainer.appendChild(castButton);
    castButton.innerText = "Cast";

    // Add spell name.
    let spellName = document.createElement("p");
    castSpellNameContainer.appendChild(spellName);
    spellName.classList.add("spell-name");
    spellName.innerText = "** New Spell **";
    spellName.setAttribute("contenteditable", "true");

    // Add cost button container.
    let costButtonContainer = document.createElement("div");
    singleSpellContainer.appendChild(costButtonContainer);
    costButtonContainer.classList.add("cost-button-container");

    // Add p's.
    let p1 = document.createElement("p");
    costButtonContainer.appendChild(p1);
    p1.innerHTML = "Cost:&nbsp;";

    let p2 = document.createElement("p");
    costButtonContainer.appendChild(p2);

    // assignSPCostDefaults(e);
    let spellLevel = e.target.parentNode.children[0].innerHTML[0];
    for (const key in spLevelConversion) {
        if (key === spellLevel) {
            p2.innerHTML = spLevelConversion[key];
            // console.log(spLevelConversion[key]);
        }
    }

    p2.classList.add("sp-cost");
    p2.setAttribute("contenteditable", "true");

    // Add remove spell button.
    let removeSpellButton = document.createElement("button");
    costButtonContainer.appendChild(removeSpellButton);
    removeSpellButton.classList.add("remove-spell-button");
    removeSpellButton.innerHTML = "-";

    // Set up event handlers.
    castButton.addEventListener("click", castSpell);
    removeSpellButton.addEventListener("click", removeSpell);
}


addSpellButtons.forEach(b => {
    b.addEventListener("click", addBlankSpell);
});

function longRest() {
    spellPointsValue = maxSpellPointsValue;
    updateSpellPointsInputValue();
}

function castSpell(e) {
    spellPointsValue -= e.target.parentNode.parentNode.children[1].children[1].innerHTML;
    currentSpellPointsInput.value = spellPointsValue;
};

function removeSpell(e) {
    e.target.parentNode.parentNode.remove();
}

function save() {
    // Get all spells.
    let allSpells = document.querySelectorAll(".single-spell-container");

    // Clear spells variable.
    spells = [];

    // Get spell information.
    allSpells.forEach(spell => {
        // Get spell names.
        let spellName = spell.children[0].children[1].innerHTML;

        // Get spell costs.
        let spellCost = spell.children[1].children[1].innerHTML[0];

        // Get spell levels.
        let spellLevel = spell.parentNode.children[0].children[0].innerHTML[0];

        spells.push({ spellName, spellCost, spellLevel });
    });

    // Save current spell points.
    spellPointsCurrentDataJSON = JSON.parse(spellPointsValue);
    localStorage.setItem("spellPoints", spellPointsCurrentDataJSON);

    // Save max spell points.
    spellPointsMaxDataJSON = JSON.parse(maxSpellPointsValue);
    localStorage.setItem("spellPointsMax", spellPointsMaxDataJSON);

    // Save all spell information.
    spellsDataJSON = JSON.stringify(spells);
    localStorage.setItem("spells", spellsDataJSON);
}

function load() {
    // Clear all spells.
    reset();

    // Load JSON data.
    let storedSpellsJSON = localStorage.getItem("spells");
    let loadedSpells = JSON.parse(storedSpellsJSON);
    // console.log(loadedSpells);

    // let storedSPJSON = localStorage.getItem("spellPoints")
    // spellPointsValue = JSON.parse(storedSPJSON);
    spellPointsValue = parseInt(localStorage.getItem("spellPoints"));

    // let storedSPMaxJSON = localStorage.getItem("spellPointsMax")
    // maxSpellPointsValue = JSON.parse(storedSPMaxJSON);
    maxSpellPointsValue = parseInt(localStorage.getItem("spellPointsMax"));

    updateSpellPointsInputValue();
    // console.log(spellPointsValue);
    // console.log(maxSpellPointsValue);

    // Repopulate spell list with loaded JSON Data.
    loadedSpells.forEach(spell => {
        // console.log(spell);
        // Add the single spell container.        
        let spellLevelContainer = spellLevelContainers[spell.spellLevel - 1];
        let singleSpellContainer = document.createElement("div");
        spellLevelContainer.appendChild(singleSpellContainer);
        singleSpellContainer.classList.add("single-spell-container");

        // Add the cast spell name container.
        let castSpellNameContainer = document.createElement("div");
        singleSpellContainer.appendChild(castSpellNameContainer);
        castSpellNameContainer.classList.add("cast-spell-name-container");

        // Add cast button.
        let castButton = document.createElement("button");
        castSpellNameContainer.appendChild(castButton);
        castButton.innerText = "Cast";

        // Add spell name.
        let spellName = document.createElement("p");
        castSpellNameContainer.appendChild(spellName);
        spellName.classList.add("spell-name");
        spellName.innerText = spell.spellName;
        spellName.setAttribute("contenteditable", "true");

        // Add cost button container.
        let costButtonContainer = document.createElement("div");
        singleSpellContainer.appendChild(costButtonContainer);
        costButtonContainer.classList.add("cost-button-container");

        // Add p's.
        let p1 = document.createElement("p");
        costButtonContainer.appendChild(p1);
        p1.innerHTML = "Cost:&nbsp;";

        let p2 = document.createElement("p");
        costButtonContainer.appendChild(p2);
        p2.innerHTML = spell.spellCost;

        p2.classList.add("sp-cost");
        p2.setAttribute("contenteditable", "true");

        // Add remove spell button.
        let removeSpellButton = document.createElement("button");
        costButtonContainer.appendChild(removeSpellButton);
        removeSpellButton.classList.add("remove-spell-button");
        removeSpellButton.innerHTML = "-";

        // Set up event handlers.
        castButton.addEventListener("click", castSpell);
        removeSpellButton.addEventListener("click", removeSpell);
    });

}

function reset() {
    let allSpells = document.querySelectorAll(".single-spell-container");
    allSpells.forEach(spell => {
        spell.remove();
    });
}