import { validate, getSuccessResultObj } from '../check_helper.js';

let exerciseID = "00_tutorial";

function visited() {
    return getSuccessResultObj();
}

let validationFuncs = [
    function() { return visited() }
]

window.onload = function() { 

    window.parent.initializeInstructions(exerciseID, `<ol><li>Im Feld <em>Auftrag</em> stehen immer die Arbeitsaufträge</li><li>Lies dir den Text im Feld <em>Ergebnis</em> durch. Dort wird die HTML Datei aus dem ordner <em>Aufgaben</em> so angezeigt, wie sie bearbeitet wurde. In diesem Tutorial findest du dort noch einige Infos.</li></ol>`);
    validate(exerciseID, validationFuncs) 
};