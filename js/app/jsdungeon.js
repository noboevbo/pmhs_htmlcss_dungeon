import {playerNameEl,
    playerGoldEl,
    selectedExerciseEl,
    selectedExerciseNameEl,
    exerciseResultEl,
    exerciseResultHeaderEl,
    exerciseResultFooterEl,
    exerciseResultMessageListEl,
    exerciseTipListEl} from './dom_selectors.js';
import { exerciseMessageHandler } from './event_handler.js';
import { exercises } from './exercise_setup.js';
import { getExerciseState, getPlayerGold, updatePlayerGold, writeExerciseState } from './model.js';

const emptyExerciseState = { solved: false, tipsPurchased: [], lastUpdate: Date.now(), exerciseNum: -1 };

function init() {
    console.log("init");
    initializeDatabase(exercises);
    initializePlayerGold();
    updatePageVariables();
    initializeExercises();
    initializeActiveExercise();
    window.addEventListener("message", exerciseMessageHandler, false);
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
    // playerGold = 50;
    playerGold = 0;
    localStorage.setItem("playerGold", playerGold);
}

function initializeDatabase(exercises) {
    for (let i = 0; i < exercises.length; i++) {
        let exercise = exercises[i];
        let item = localStorage.getItem(exercise.id);
        if (item !== null) {
            continue
        }
        let state = Object.assign({}, emptyExerciseState);
        state.exerciseNum = i;
        writeExerciseState(exercise.id, state);
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

function exerciseSelectedDelegate(exerciseID) {
    return function() {
        exerciseSelected(exerciseID);
    }
}

function initializeExercises() {
    console.log("initExercises");
    let exerciseListEl = document.getElementById("exerciseList");
    for (var i = 0; i < exercises.length; i++) {
        console.log("init " + i);
        let exercise = exercises[i];
        let exerciseState = getExerciseState(exercise.id);
        console.log("a");
        const liNode = document.createElement("li");
        liNode.className = "nav-item";
        const linkNode = document.createElement("a");
        linkNode.id = exercise.id + "_link";
        linkNode.className = "nav-link";
        // linkNode.setAttribute('onclick', `exerciseSelected(${i})`);
        linkNode.addEventListener("click", exerciseSelectedDelegate(i));
        linkNode.href = "#";
        if (exerciseState.solved) {
            linkNode.innerHTML = `<strong><i class="nes-icon trophy is-small"></i> Level ` + `${i}`.padStart(2, "0") + `</strong><br><p>` + exercise.name + "</p>";
        } else {
            linkNode.innerHTML = `<strong><i class="nes-icon close is-small"></i> Level ` + `${i}`.padStart(2, "0") + "</strong><br><p>" + exercise.name + "</p>";
        }
        liNode.appendChild(linkNode);
        exerciseListEl.appendChild(liNode);
        console.log("Added " + linkNode.id);
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
    console.log("Try get node: " + exerciseID + "_link")
    let iconNode = linkNode.getElementsByTagName("i")[0];
    let stateSymbol = exerciseState.solved ? "nes-icon trophy is-small" : "nes-icon close is-small";
    iconNode.className = stateSymbol;
    setExperimentState(exerciseID, exerciseState, errorMessages);
}

window.updateExerciseState = updateExerciseState;

function exerciseSelected(exerciseNumber) {
    console.log(exerciseNumber);
    localStorage.setItem("selectedExercise", exerciseNumber);
    setActiveExercise(exercises[exerciseNumber]);
}


function setActiveExercise(exercise) {
    exerciseTipListEl.innerHTML = "";
    selectedExerciseNameEl.innerText = "Aufgabe: " + exercise.name;
    selectedExerciseEl.src = "aufgaben/" + exercise.id + ".html";
    // selectedExerciseEl.setAttribute('onload', `injectDungeonCode("${exercise.id}")`);
    // selectedExerciseEl.contentWindow.location.reload();
    // selectedExerciseEl.contentWindow.init();
    
    // window.addEventListener("message", (event) => {
    //     // Do we trust the sender of this message?  (might be
    //     // different from what we originally opened, for example).
    //     console.log(event);

    //     // TODO Bei Update State:
    //     // window.parent.writeExerciseState(exerciseID, exerciseState);
    //     // window.parent.updateExerciseState(exerciseID, exerciseState, errorMessages);
      
    //     // event.source is popup
    //     // event.data is "hi there yourself!  the secret response is: rheeeeet!"
    //   }, false);
    updateExerciseState(exercise.id, getExerciseState(exercise.id));
}

// function injectDungeonCode(exerciseID) {
//     console.log("here");
//     const iframeWin = selectedExerciseEl.contentWindow;
//     const iframeDoc = selectedExerciseEl.contentDocument;

//     var script = iframeDoc.createElement("script");
//     script.type = "module";
//     script.src = `../js/exercises/${exerciseID}.js`
//     iframeDoc.body.appendChild(script);

//     var bootstrapscript = iframeDoc.createElement("script");
//     bootstrapscript.src = "../js/bootstrap.bundle.min.js";
//     iframeDoc.body.appendChild(bootstrapscript);
//     console.log("injected");
// }

function setExperimentState(exerciseID, exerciseState, messages = []) {
    exerciseResultMessageListEl.innerHTML = "";
    if (exerciseState.solved) {
        exerciseResultEl.className = "alert alert-success";
        exerciseResultHeaderEl.innerHTML = `<span class="nes-text is-success">Aufgabe korrekt gelöst!</span>`;
        if (!exerciseState.rewardCollected) {
            let reward = getGoldAmountFromLevel(exercises[exerciseState.exerciseNum].level);
            exerciseResultFooterEl.innerHTML = `<h3>Belohnung abholen:</h3>
            <button type="button" id="0" class="nes-btn is-warning tooltip" onclick="getReward('${exerciseID}')"><span><i class="nes-icon coin is-small"></i> ${reward}g</span></button>`
        }
    } else {
        exerciseResultEl.className = "alert alert-danger";
        exerciseResultHeaderEl.innerHTML = `<span class="nes-text is-error">Aufgabe noch nicht korrekt gelöst!</span>`;
        exerciseResultFooterEl.innerHTML = ``;
    }
    for (let i = 0; i < messages.length; i++) {
        exerciseResultMessageListEl.appendChild(getResultMessageListItem(messages[i]))
    }
}

function getReward(exerciseID) {
    let exerciseState = getExerciseState(exerciseID);
    if (!exerciseState.solved || exerciseState.rewardCollected) {
        return;
    }
    exerciseState.rewardCollected = true;
    writeExerciseState(exerciseID, exerciseState);
    updatePlayerGold(getGoldAmountFromLevel(exercises[exerciseState.exerciseNum].level));
    exerciseResultFooterEl.innerHTML = ``;
    updatePageVariables();
}

function getGoldAmountFromLevel(level) {
    switch (level) {
        case 0:
            return 10;
        case 1:
            return 25;
        case 2:
            return 50;
        case 3:
            return 75;
        default:
            return 0;
    }
}

function getResultMessageListItem(message) {
    var li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = message;
    return li
}

// // Expose window functions
// window.exp