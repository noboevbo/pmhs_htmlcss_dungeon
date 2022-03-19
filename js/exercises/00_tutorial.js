import {
    validate,
    getSuccessResultObj
} from '../exercise/validation_helper.js';
import {
    getEmptyInitInstructionsMessage,
    getEmptyInitTipsMessage
} from '../core/models.js';

let exerciseID = "00_tutorial";

function visited() {
    return getSuccessResultObj();
}

let validationFuncs = [
    function () {
        return visited()
    }
]

let instructions = `<ol><li>Im Feld <em>Auftrag</em> stehen immer die Arbeitsaufträge</li><li>Lies dir den Text im Feld <em>Ergebnis</em> durch. Dort wird die HTML Datei aus dem ordner <em>Aufgaben</em> so angezeigt, wie sie bearbeitet wurde. In diesem Tutorial findest du dort noch einige Infos.</li></ol>`

let tips = [{
    level: 0,
    title: "Beispieltipp - kauf mich!",
    content: `Gut gemacht! Du hast deinen ersten Tipp gekauft. Hier gibt es dann Informationen in Form von Texten, Videos oder Audiodateien, die dir bei den Aufgaben helfen!`,
    weblinks: ["https://www.pmhs.de"],
    contentIsHTML: true
}, ]


window.onload = function () {
    let initInstructionsMsg = getEmptyInitInstructionsMessage();
    initInstructionsMsg.exerciseID = exerciseID;
    initInstructionsMsg.content = instructions;
    let initTipsMsg = getEmptyInitTipsMessage();
    initTipsMsg.exerciseID = exerciseID;
    initTipsMsg.content = tips;

    window.parent.postMessage(initInstructionsMsg, window.origin);
    window.parent.postMessage(initTipsMsg, window.origin);
    validate(exerciseID, validationFuncs);

    // window.parent.initializeInstructions(exerciseID, instructions);
    // window.parent.initializeTips(exerciseID, tips);

};