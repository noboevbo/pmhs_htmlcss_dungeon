import { validate, getSuccessResultObj } from '../check_helper.js';

let exerciseID = "00_tutorial";

function visited() {
    return getSuccessResultObj();
}

let validationFuncs = [
    function() { return visited() }
]

let tips = [
    {level: 0, title: "Beispieltipp - kauf mich!", content: `Gut gemacht! Du hast deinen ersten Tipp gekauft. Hier gibt es dann Informationen in Form von Texten, Videos oder Audiodateien, die dir bei den Aufgaben helfen!`, weblinks: ["https://www.pmhs.de"], contentIsHTML: true},
  ]
  

window.onload = function() { 
    window.parent.initializeInstructions(exerciseID, `<ol><li>Im Feld <em>Auftrag</em> stehen immer die Arbeitsaufträge</li><li>Lies dir den Text im Feld <em>Ergebnis</em> durch. Dort wird die HTML Datei aus dem ordner <em>Aufgaben</em> so angezeigt, wie sie bearbeitet wurde. In diesem Tutorial findest du dort noch einige Infos.</li></ol>`);
    window.parent.initializeTips(exerciseID, tips);
    validate(exerciseID, validationFuncs) 
};