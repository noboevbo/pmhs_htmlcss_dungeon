import { elementIsCorrectTag, getFailResultObj, getSuccessResultObj, innerTextEquals, innerTextStartsWith, isBlockElement, isInlineElement, listHasMinElements, validate} from '../check_helper.js';

let exerciseID = "01_html_tags";

let instructions = `
<ol>
<li>Erstelle eine Überschrift erster Ordnung mit dem Titel <em>Dungeon Run 1</em>. Die Überschrift soll die <b>id</b> <em>hauptUeberschrift</em> haben.</li>
<li>Erstelle einen Paragraphen, mit dem Text <em>Spielername: DEINSPIELERNAME</em>, erstetze <em>DEINSPIELERNAME</em> dabei mit einem beliebigen Namen. Der Paragraph soll die ID <em>spielertext</em> haben.</li>
<li>Der Spielername soll mithilfe eines HTML-Elements <strong>fett</strong> dargestellt werden.</li>
<li>Erstelle eine geordnete Liste mit mindestens drei Einträgen! Das Listenelement soll die ID <em>dieliste</em> haben.</li>
</ol>
`

let tips = [
  {level: 1, title: "Überschrift / Paragraphen erstellen", content: "Überschriften erster Ordnung können mit dem h1 Tag erstellt werden. Paragraphen können mit dem p Tag erstellt werden.", weblinks: ["https://www.w3schools.com/tags/tag_hn.asp", "https://www.w3schools.com/html/html_paragraphs.asp"]},
  {level: 2, title: "Geordnete Listen erstellen", content: "Eine geordnete Liste wird mit dem ol-Tag (OrderedList) erstellt. In diesem Tag werden dann Listenelemente benötigt, diese werden mit dem li-Element (ListItem) erstellt.", weblinks: ["https://developer.mozilla.org/de/docs/Web/HTML/Element/ol", "https://wiki.selfhtml.org/wiki/HTML/Tutorials/Listen/Aufz%C3%A4hlungslisten#li"]},
  {level: 3, title: "Lösung anzeigen", content: `Die Lösung ist: <xmp>
  <h1 id="titel">Dungeon Run 1</h1> <p id="spielertext">Spielername: <strong>Fritz</strong></p>
  <ol id="dieliste">
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ol>
  `, contentIsHTML: true}
]

var spielername = "";

function checkPlayerName() {
  let playerEl = document.getElementById("spielertext");
  let fats = playerEl.querySelectorAll("b,strong");
  if (fats.length === 0) {
    return getFailResultObj(`Es wurde kein fett gedruckter Spielername gefunden.`)
  } else if (fats.length > 1) {
    return getFailResultObj(`Spielername unklar. Mehr als ein fettgedrucktes Wort gefunden.`)
  } else {
    spielername = fats[0].innerText;
  }
  return getSuccessResultObj();
}

let validationFuncs = [
  function() { return elementIsCorrectTag("titel", "h1"); },
  function() { return elementIsCorrectTag("spielertext", "p"); },
  function() { return innerTextEquals("titel", "Dungeon Run 1"); },
  function() { return innerTextStartsWith("spielertext", "Spielername: "); },
  function() { return checkPlayerName(); },
  function() { return elementIsCorrectTag("dieliste", "ol"); },
  function() { return listHasMinElements("dieliste", 3); },
  // function() { return isInlineElement("inlinelement"); },
  // function() { return isBlockElement("blockelement"); },
]

function beforeSuccess() {
  localStorage.setItem("01_playerName", spielername);
}

function afterSuccess() {
  window.parent.updatePageVariables();
}

function beforeFail() {
  localStorage.removeItem("01_playerName");
}

window.onload = function() { 
  window.parent.initializeInstructions(exerciseID, instructions);
  window.parent.initializeTips(exerciseID, tips);
  validate(exerciseID, validationFuncs, beforeSuccess, afterSuccess, beforeFail);
};
// Tests
    // var spielername = "Hans";
    // let spielername = "Hans";
    // var spielername = 42;

