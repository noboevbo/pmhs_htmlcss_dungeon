import { elementIsCorrectTag, elementsExist, checkTableContent, or, validate} from '../check_helper.js';

let exerciseID = "07_html_tabellen";


let instructions = `
<ol>
<li>Füge eine Tabelle mit folgendem Inhalt ein. Nutze für die erste Zeile header-Zellen! Das Tabellen-Element soll die id <em>tabelle1</em> haben. <br><img src="aufgaben/static/tabelle.png" alt="Beispieltabelle"></li>
</ol>
`

let tips = [
  {level: 1, title: "Texte im Paragraphen markieren.", content: "Innerhalb eines Paragraphen können unterschiedliche Auszeichnungen verwendet werden, bsp. <p>Das ist ein <strong>Text</strong></p>. Unter dem Link findest du weitere Auszeichnungsmöglichkeiten.", weblinks: ["https://wiki.selfhtml.org/wiki/HTML/Tutorials/HTML5/Textauszeichnung"]},
  {level: 1, title: "Zeilenumbruch im Paragraphen verwenden.", content: "Paragraphen können beliebigen HTML Code enthalten, entsprechend kannst du einfach im Text innerhalb des Paragraphen einen Zeilenumbruch (<br>) Einsetzen.", weblinks: ["https://www.w3schools.com/html/html_paragraphs.asp"]},
  {level: 2, title: "Lösung anzeigen", content: `Die Lösung ist: <xmp>
  <p id="auszeichnungen">Das ist ein Text.<br> <strong>strong</strong>, <em>ausgezeichnet</em>, <u>Unterstrichen</u>, <del>durchgestrichen</del></p>
  <hr>
  </xmp>`, contentIsHTML: true}
]

let tableContent = [
  [{value: "Schüler", type: "th"}, {value: "Alter", type: "th"}, {value: "Note", type: "th"}],
  [{value: "Alice", type: "td"}, {value: "17", type: "td"}, {value: "3", type: "td"}],
  [{value: "Bob", type: "td"}, {value: "19", type: "td"}, {value: "2", type: "td"}],
  [{value: "Eve", type: "td"}, {value: "18", type: "td"}, {value: "1", type: "td"}]]

let validationFuncs = [
  function() { return elementIsCorrectTag("tabelle1", "table"); },
  function() { return checkTableContent("tabelle1", tableContent); },
]

window.onload = function() { 
  window.parent.initializeInstructions(exerciseID, instructions);
  window.parent.initializeTips(exerciseID, tips);
  validate(exerciseID, validationFuncs);
};
// Tests
    // var spielername = "Hans";
    // let spielername = "Hans";
    // var spielername = 42;

