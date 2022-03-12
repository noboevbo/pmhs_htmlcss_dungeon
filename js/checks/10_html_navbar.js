import { elementIsCorrectTag, elementIsChildOf, validate, getFailResultObj, elementsExist, getSuccessResultObj} from '../check_helper.js';

let exerciseID = "10_html_navbar";

let instructions = `
<ol>
<li>Erstelle einen Header der Seite mit der id <em>header</em>.</li>
<li>Erstelle im Header ein Navigationselement mit der id <em>navbar</em></li>
<li>Erstelle eine ungeordnete Liste in der mindestens drei Links mit den Namen <em>Home</em>, <em>News</em> und <em>About</em> enthalten sind. Das Verweisziel der Links soll jeweils <em>#</em> (aktuelle Seite/Element bzw. nichts tun) sein. Die Liste soll die id <em>navlinks</em> erhalten.</li>
</ol>
`

let tips = [
  {level: 1, title: "Texte im Paragraphen markieren.", content: "Innerhalb eines Paragraphen können unterschiedliche Auszeichnungen verwendet werden, bsp. <p>Das ist ein <strong>Text</strong></p>. Unter dem Link findest du weitere Auszeichnungsmöglichkeiten.", weblinks: ["https://wiki.selfhtml.org/wiki/HTML/Tutorials/HTML5/Textauszeichnung"]},
  {level: 1, title: "Zeilenumbruch im Paragraphen verwenden.", content: "Paragraphen können beliebigen HTML Code enthalten, entsprechend kannst du einfach im Text innerhalb des Paragraphen einen Zeilenumbruch (<br>) Einsetzen.", weblinks: ["https://www.w3schools.com/html/html_paragraphs.asp"]},
  {level: 3, title: "Lösung anzeigen", content: `Die Lösung ist: <xmp>
  <a id="einlink" href="https://wiki.selfhtml.org", target="_blank">selfhtml</a>
  <img id="bild1" src="static/Boxmodell-detail.png" alt="Das CSS-Boxmodell.">
  <img id="bild2" src="../img/00_tutorial-code-screenshot.png" alt="Screenshot vom Aufgabencode">
  </xmp>`, contentIsHTML: true}
]

function checkLinks(el, targets, texts) {
  if (!el) {
    return getFailResultObj(`Navlinks nicht verfügbar. Abbruch von Linkprüfung.`)
  }
  let children = el.getElementsByTagName("li");
  let errorMsg = "";
  for (let i = 0; i<children.length; i++) {
    let li = children[i];
    let links = li.getElementsByTagName("a");
    if (links.length !== 1) {
      errorMsg += `Link Nummer ${i+1} enthält ${links.length} statt 1 Link-Element.<br>`;
      continue;
    } 
    let link = links[0];
    let href = link.getAttribute("href");
    if (!href || href !== targets[i]) {
      errorMsg += `Das Verweisziel von Link Nummer ${i+1} ist nicht korrekt.<br>`;
    }
    let text = link.innerText;
    if (!text || text !== texts[i]) {
      errorMsg += `Der Text von Link Nummer ${i+1} ist nicht korrekt.<br>`;
    }
  }
  if (errorMsg === "") {
    return getSuccessResultObj();
  }
  return getFailResultObj(errorMsg);
}

let validationFuncs = [
  function() { return elementIsCorrectTag("header", "header"); },
  function() { return elementIsCorrectTag("navbar", "nav"); },
  function() { return elementIsChildOf("navbar", "header"); },
  function() { return elementIsCorrectTag("navlinks", "ul"); },
  function() { return elementIsChildOf("navlinks", "navbar"); },
  function() { return elementsExist("li", 3, false, document.getElementById("navlinks")); },
  function() { return checkLinks(document.getElementById("navlinks"), ["#", "#", "#"], ["Home", "News", "About"])}
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

