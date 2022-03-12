var exercises = [
    // id, title
    { id: "00_tutorial", name: "Tutorial" },
    { id: "01_html_tags", name: "HTML Tags" },
    { id: "02_html_typo", name: "HTML Typografie" },
    { id: "03_html_block_elemente", name: "HTML Block-Elemente" },
    { id: "04_html_inline_elemente", name: "HTML Inline-Elemente" },
    { id: "05_html_pfade", name: "HTML Pfade" },
    { id: "06_html_embedded", name: "HTML Embedded Content" },
    { id: "07_html_tabellen", name: "HTML Tabellen" },
    { id: "08_html_formulare", name: "HTML Formulare" },
    { id: "09_html_strukturierung", name: "HTML Strukturierung" },
];

const emptyExerciseState = { solved: false, tipsPurchased: [], lastUpdate: Date.now() };

// Replace console.log with stub implementation and add.
window.console.stdlog = console.log.bind(console);
window.console.log = function(txt) {
    console.stdlog(txt);
    let logcalls = JSON.parse(localStorage.getItem("logcalls"));
    if (!logcalls) {
        logcalls = [];
    }
    logcalls.push(txt);
    localStorage.setItem("logcalls", JSON.stringify(logcalls));
}

var playerNameEl = document.getElementById("playerName");
var playerGoldEl = document.getElementById("playerGold");
var selectedExerciseNameEl = document.getElementById("selectedExerciseName");
var selectedExerciseInstructionsEl = document.getElementById("selectedExerciseInstructions");
var selectedExerciseEl = document.getElementById("selectedExercise");
var exerciseResultEl = document.getElementById("exerciseResult");
var exerciseResultHeaderEl = document.getElementById("exerciseResultHeader");
var exerciseResultMessageListEl = document.getElementById("exerciseResultMessageList");
var exerciseTipListEl = document.getElementById("exerciseTips");
var currentTips = []
var currentTipNodes = []

function init() {
    initializeDatabase(exercises);
    initializePlayerGold();
    updatePageVariables();
    initializeExercises();
    initializeActiveExercise();
}

window.onload = init;

function initializePlayerGold() {
    let playerGold = localStorage.getItem("playerGold");
    if (playerGold !== null) {
        return
    }
    playerGold = 50;
    localStorage.setItem("playerGold", playerGold);
}

function initializeDatabase(exercises) {
    for (let i = 0; i < exercises.length; i++) {
        let exercise = exercises[i];
        let item = localStorage.getItem(exercise.id);
        if (item !== null) {
            continue
        }
        writeExerciseState(exercise.id, emptyExerciseState);
    }
}

function updatePageVariables() {
    /* 
    Some results from individual experiments may influence elements on the main page
    For example the first two experiments provide playerNames, which should be shown in the Header bar.
    Such influences on the main page should be handled here.
    */
    showPlayerName();
    showPlayerGold();
}

function showPlayerName() {
    let playerName = localStorage.getItem("02_playerName"); // Exercise 02 solved
    if (playerName === null) {
        playerName = localStorage.getItem("01_playerName");
    }
    if (playerName !== null) {
        playerNameEl.innerText = playerName;
    } else {
        playerNameEl.innerText = "Playername undefined.";
    }
}

function showPlayerGold() {
    let playerGold = getPlayerGold();
    playerGoldEl.innerText = `Gold verfügbar: ${playerGold}`;
}

function initializeExercises() {
    let exerciseListEl = document.getElementById("exerciseList");
    for (var i = 0; i < exercises.length; i++) {
        let exercise = exercises[i];
        let exerciseState = getExerciseState(exercise.id);
        const liNode = document.createElement("li");
        liNode.className = "nav-item";
        const linkNode = document.createElement("a");
        linkNode.id = exercise.id + "_link";
        linkNode.className = "nav-link";
        linkNode.setAttribute('onclick', `exerciseSelected(${i})`);
        linkNode.href = "#";
        if (exerciseState.solved) {
            linkNode.innerText = "✅ " + `${i}`.padStart(2, "0") + ": " + exercise.name;
        } else {
            linkNode.innerText = "❌ " + `${i}`.padStart(2, "0") + ": " + exercise.name;
        }
        liNode.appendChild(linkNode);
        exerciseListEl.appendChild(liNode);
    }
}

function initializeActiveExercise() {
    let activeExerciseNumber = localStorage.getItem("selectedExercise");
    if (activeExerciseNumber !== null && exercises.length >= activeExerciseNumber) {
        setActiveExercise(exercises[activeExerciseNumber]);
    }
}

function updateExerciseState(exerciseID, exerciseState, errorMessages = []) {
    let linkNode = document.getElementById(exerciseID + "_link");
    let stateSymbol = exerciseState.solved ? '✅' : '❌';
    linkNode.innerText = linkNode.innerText.replace(/^.{1}/g, stateSymbol);
    setExperimentState(exerciseState.solved, errorMessages);
}

window.updateExerciseState = updateExerciseState;

function exerciseSelected(exerciseNumber) {
    localStorage.setItem("selectedExercise", exerciseNumber);
    setActiveExercise(exercises[exerciseNumber]);
}

function setActiveExercise(exercise) {
    exerciseTipListEl.innerHTML = "";
    selectedExerciseNameEl.innerText = "Aufgabe: " + exercise.name;
    selectedExerciseEl.src = "aufgaben/" + exercise.id + ".html";
    // selectedExerciseEl.setAttribute('onload', `injectDungeonCode("${exercise.id}")`);
    updateExerciseState(exercise.id, getExerciseState(exercise.id));
}

// function injectDungeonCode(exerciseID) {
//     const iframeWin = selectedExerciseEl.contentWindow || iframe;
//     const iframeDoc = selectedExerciseEl.contentDocument || iframeWin.document;

//     var script = iframeDoc.createElement("script");
//     script.type = "module";
//     script.src = `../js/checks/${exerciseID}.js`
//     iframeDoc.body.appendChild(script);

//     var bootstrapscript = iframeDoc.createElement("script");
//     bootstrapscript.src = "../js/bootstrap.bundle.min.js";
//     iframeDoc.body.appendChild(bootstrapscript);
// }

function setExperimentState(isSolved, messages = []) {
    exerciseResultMessageListEl.innerHTML = "";
    if (isSolved) {
        exerciseResultEl.className = "alert alert-success";
        exerciseResultHeaderEl.innerText = "Aufgabe korrekt gelöst!";
    } else {
        exerciseResultEl.className = "alert alert-danger";
        exerciseResultHeaderEl.innerText = "Aufgabe noch nicht korrekt gelöst!";
    }
    for (let i = 0; i < messages.length; i++) {
        exerciseResultMessageListEl.appendChild(getResultMessageListItem(messages[i]))
    }
}

function getResultMessageListItem(message) {
    var li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = message;
    return li
}

function initializeInstructions(exerciseID, instructions) {
    selectedExerciseInstructionsEl.innerHTML = instructions;
}

const tipItemClasses = "list-group-item list-group-item-action flex-column align-items-start";
const tipTitleClasses = "d-flex w-100 justify-content-between"

function initializeTips(exerciseID, tips = []) {
    currentTips = tips;
    currentTipNodes = [];
    let exerciseState = getExerciseState(exerciseID);
    for (let i = 0; i < tips.length; i++) {
        let tip = tips[i]
        let isPurchased = tipIsPurchased(exerciseID, exerciseState, i);
        const aNode = document.createElement("a");
        aNode.href = "#";
        aNode.className = tipItemClasses;
        aNode.setAttribute('onclick', `buyTip("${exerciseID}", ${i})`);
        const titleDiv = document.createElement("div");
        titleDiv.className = tipTitleClasses;
        const h5Node = document.createElement("h5");
        h5Node.className = "mb1";
        h5Node.innerHTML = `Tipp ${i+1}`;
        const titleSmallNode = document.createElement("small");
        titleSmallNode.innerText = tip.title;
        titleDiv.appendChild(h5Node);
        titleDiv.appendChild(titleSmallNode);
        aNode.appendChild(titleDiv);
        const contentNode = document.createElement("p");
        contentNode.className = "mb-1";
        if (isPurchased) {
            if (tip.contentIsHTML) {
                contentNode.innerHTML = tip.content;
            } else {
                contentNode.innerText = tip.content;
            }
            aNode.classList.add("disabled");
        } else {
            contentNode.innerText = `Tipp kaufen für ${getTipPrice(tip.level)} Gold?`;
        }
        aNode.appendChild(contentNode);
        exerciseTipListEl.appendChild(aNode);
        currentTipNodes.push(aNode);
    }
}

function buyTip(exerciseID, tipNum) {
    let tip = currentTips[tipNum];
    let exerciseState = getExerciseState(exerciseID);
    if (exerciseState.tipsPurchased[tipNum]) {
        return
    }
    exerciseState.tipsPurchased[tipNum] = true;
    writeExerciseState(exerciseID, exerciseState);
    updateGold(-getTipPrice(tip.level));
    revealTip(tipNum, tip);
    updatePageVariables();
}

function revealTip(tipNum, tip) {
    let currentTipNode = currentTipNodes[tipNum];
    currentTipNode.classList.add("disabled");
    if (tip.contentIsHTML) {
        currentTipNode.children[1].innerHTML = tip.content;
    } else {
        currentTipNode.children[1].innerText = tip.content;
    }
}

function tipIsPurchased(exerciseID, exerciseState, tipNum) {
    if (exerciseState.tipsPurchased.length > tipNum) {
        return exerciseState.tipsPurchased[tipNum];
    }
    exerciseState.tipsPurchased = Array(currentTips.length).fill(false);
    writeExerciseState(exerciseID, exerciseState);
    return false;
}

function getTipPrice(tipLevel) {
    switch (tipLevel) {
        case 1:
            return 10;
        case 2:
            return 25;
        case 3:
            return 50;
        case 4:
            return 100;
        default:
            return 5000;
    }
}

function getExerciseState(exerciseID) {
    let item = localStorage.getItem(exerciseID);
    if (item === null) {
        return item;
    }
    return JSON.parse(item);
}

function getPlayerGold() {
    let playerGold = localStorage.getItem("playerGold");
    if (playerGold === null) {
        playerGold = 0;
        localStorage.setItem("playerGold", playerGold);
    }
    return parseInt(playerGold);
}

function updateGold(amount) {
    let playerGold = getPlayerGold();
    playerGold += amount;
    localStorage.setItem("playerGold", playerGold);
}

function writeExerciseState(exerciseID, exerciseState) {
    localStorage.setItem(exerciseID, JSON.stringify(exerciseState))
}