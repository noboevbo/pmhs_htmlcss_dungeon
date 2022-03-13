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
    { id: "10_html_navbar", name: "HTML Navbar" },
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
var mainFooterEl = document.getElementById("mainFooter");
var currentTips = []
var currentTipNodes = []

function init() {
    console.log("init");
    initializeDatabase(exercises);
    initializePlayerGold();
    updatePageVariables();
    initializeExercises();
    initializeActiveExercise();
}
// deinitialize();
window.onload = init;

function deinitialize() {
    console.log("unload")
    deinitializeActiveExercise();
}
// window.onbeforeunload = deinitialize;

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
    playerGoldEl.innerText = `${playerGold}`;
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
            linkNode.innerHTML = `<i class="nes-icon trophy is-small"></i> ` + `${i}`.padStart(2, "0") + ": " + exercise.name;
        } else {
            linkNode.innerHTML = `<i class="nes-icon close is-small"></i> ` + `${i}`.padStart(2, "0") + ": " + exercise.name;
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

function deinitializeActiveExercise() {
    // localStorage.removeItem("selectedExercise");
    console.log("deinit");
    exerciseTipListEl.innerHTML = "";
    selectedExerciseNameEl.innerText = "Keine Aufgabe ausgewählt";
    selectedExerciseEl.src = "";
    exerciseResultMessageListEl.innerHTML = "";
}

function updateExerciseState(exerciseID, exerciseState, errorMessages = []) {
    let linkNode = document.getElementById(exerciseID + "_link");
    let stateSymbol = exerciseState.solved ? `<i class="nes-icon trophy is-small"></i>` : `<i class="nes-icon close is-small"></i>`;
    linkNode.innerHTML = stateSymbol + " " + linkNode.innerText;
    setExperimentState(exerciseState.solved, errorMessages);
}

window.updateExerciseState = updateExerciseState;

function exerciseSelected(exerciseNumber) {
    localStorage.setItem("selectedExercise", exerciseNumber);
    setActiveExercise(exercises[exerciseNumber]);
}

function setActiveExercise(exercise) {
    console.log("Set");
    exerciseTipListEl.innerHTML = "";
    selectedExerciseNameEl.innerText = "Aufgabe: " + exercise.name;
    selectedExerciseEl.src = "aufgaben/" + exercise.id + ".html";
    // selectedExerciseEl.setAttribute('onload', `injectDungeonCode("${exercise.id}")`);
    // selectedExerciseEl.contentWindow.location.reload();
    // selectedExerciseEl.contentWindow.init();
    updateExerciseState(exercise.id, getExerciseState(exercise.id));
}

// function injectDungeonCode(exerciseID) {
//     console.log("here");
//     const iframeWin = selectedExerciseEl.contentWindow;
//     const iframeDoc = selectedExerciseEl.contentDocument;

//     var script = iframeDoc.createElement("script");
//     script.type = "module";
//     script.src = `../js/checks/${exerciseID}.js`
//     iframeDoc.body.appendChild(script);

//     var bootstrapscript = iframeDoc.createElement("script");
//     bootstrapscript.src = "../js/bootstrap.bundle.min.js";
//     iframeDoc.body.appendChild(bootstrapscript);
//     console.log("injected");
// }

function setExperimentState(isSolved, messages = []) {
    exerciseResultMessageListEl.innerHTML = "";
    if (isSolved) {
        exerciseResultEl.className = "alert alert-success";
        exerciseResultHeaderEl.innerHTML = `<span class="nes-text is-success">Aufgabe korrekt gelöst!</span>`;
    } else {
        exerciseResultEl.className = "alert alert-danger";
        exerciseResultHeaderEl.innerHTML = `<span class="nes-text is-error">Aufgabe noch nicht korrekt gelöst!</span>`;
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
    console.log("Init tipps");
    currentTips = tips;
    currentTipNodes = [];
    let exerciseState = getExerciseState(exerciseID);
    for (let i = 0; i < tips.length; i++) {
        let tip = tips[i]
        let isPurchased = tipIsPurchased(exerciseID, exerciseState, i);
        aNode = getTipButtonElement(exerciseID, i, getTipPrice(tip.level), tip.title)
        let dialog = getTipDialogElement(exerciseID, i, tip);
        mainFooterEl.appendChild(dialog);
        if (isPurchased) {
            setTipPurchasedState(aNode, i);
        }
        exerciseTipListEl.appendChild(aNode.buttonEl);
        currentTipNodes.push(aNode);
    }
}

function getTipButtonElement(exerciseID, tipID, tipCost, tipTitle) {
    const buttonEl = document.createElement("button");
    buttonEl.setAttribute("type", "button");
    buttonEl.id = tipID;
    buttonEl.className = "nes-btn is-warning tooltip";
    buttonEl.setAttribute("onclick", `buyTip("${exerciseID}", ${tipID})`);
    const buttonTextEl = document.createElement("span");
    buttonTextEl.innerHTML = `Tipp ${tipID+1} (<i class="nes-icon coin is-small"></i> ${tipCost}g)`;
    const tooltipSpanEl = document.createElement("span");
    tooltipSpanEl.className = "tooltiptext";
    const tooltipPEl = document.createElement("p");
    tooltipPEl.className = "nes-balloon from-left nes-pointer tooltip-content";
    tooltipPEl.innerHTML = tipTitle;
    tooltipSpanEl.appendChild(tooltipPEl);
    buttonEl.appendChild(buttonTextEl);
    buttonEl.appendChild(tooltipSpanEl);
    return {buttonEl, buttonTextEl, tooltipSpanEl, tooltipPEl};
}

function getTipDialogElement(exerciseID, tipID, tip) {
    const dialogEl = document.createElement("dialog");
    dialogEl.id = `dialog-tip${tipID}`;
    dialogEl.className = "nes-dialog is-rounded";
    const formEl = document.createElement("form");
    formEl.method = "dialog";
    const titleEl = document.createElement("h1");
    titleEl.class = "title";
    titleEl.innerText = `Tipp ${tipID+1}`;
    formEl.appendChild(titleEl);
    const contentEl = document.createElement("p");
    if (tip.contentIsHTML) {
        contentEl.innerHTML = tip.content;
    } else {
        contentEl.innerText = tip.content;
    }
    formEl.appendChild(contentEl);
    if (tip.weblinks && tip.weblinks.length > 0) {
        const linkTitleEl = document.createElement("h2");
        linkTitleEl.innerText = "Weiterführende Links";
        formEl.appendChild(linkTitleEl);
        for(let i=0; i<tip.weblinks.length; i++) {
            let link = tip.weblinks[i];
            const linkEl = document.createElement("a");
            linkEl.setAttribute("href", link);
            linkEl.setAttribute("target", "_blank")
            linkEl.innerText = link;
            formEl.appendChild(linkEl);
        }
    }
    const menuEl = document.createElement("menu");
    menuEl.className = "dialog-menu";
    const okButtonEl = document.createElement("button");
    okButtonEl.className="nes-btn is-primary";
    okButtonEl.innerText = "Ok";
    menuEl.appendChild(okButtonEl);

    formEl.appendChild(menuEl);
    dialogEl.appendChild(formEl);
    return dialogEl;
}

function setTipPurchasedState(button, tipID) {
    button.buttonEl.className = "nes-btn is-success tooltip";
    button.buttonEl.setAttribute("onclick", `document.getElementById('dialog-tip${tipID}').showModal();`);
    button.buttonTextEl.innerHTML = `Tipp ${tipID}`;
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
    setTipPurchasedState(currentTipNode, tipNum);
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