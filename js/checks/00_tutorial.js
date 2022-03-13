import { validate, getSuccessResultObj } from '../check_helper.js';

let exerciseID = "00_tutorial";

function visited() {
    return getSuccessResultObj();
}

let validationFuncs = [
    function() { return visited() }
]

let tips = [
    {level: 0, title: "Beispieltipp - kauf mich!", content: `<iframe title="Unterm Radar - Wege aus der Digitalen Ueberwachung" src="https://digitalcourage.video/videos/embed/22b4cbc0-357f-4664-8897-31f79ad0f0c0" allowfullscreen="" sandbox="allow-same-origin allow-scripts allow-popups" width="560" height="315" frameborder="0"></iframe>`, weblinks: ["https://www.pmhs.de"], contentIsHTML: true},
  ]
  

window.onload = function() { 
    window.parent.initializeInstructions(exerciseID, `<ol><li>Im Feld <em>Auftrag</em> stehen immer die Arbeitsaufträge</li><li>Lies dir den Text im Feld <em>Ergebnis</em> durch. Dort wird die HTML Datei aus dem ordner <em>Aufgaben</em> so angezeigt, wie sie bearbeitet wurde. In diesem Tutorial findest du dort noch einige Infos.</li></ol>`);
    window.parent.initializeTips(exerciseID, tips);
    validate(exerciseID, validationFuncs) 
};