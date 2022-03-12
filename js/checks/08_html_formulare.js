import { elementIsCorrectTag, elementsExist, or, validate} from '../check_helper.js';

let exerciseID = "07_html_tabellen";

let instructions = `
<ol>
<li>Füge eine Formular mit folgendem Inhalt ein.<br><img src="aufgaben/static/formular.png" alt="Beispielformular"></li>
<li>Nutze die HTML-Element <em>form</em>, <em>label</em> und <em>input</em>. Andere HTML-Elemente werden nicht benötigt!</li>
<li>Verwende folgende IDs für die HTML-Elemente: <ul>
<li>Formularfeld Vorname: <em>vorname</em></li>
<li>Formularfeld Nachname: <em>nachname</em></li>
<li>Formularfeld Passwort: <em>passwort</em></li>
<li>Formularfeld Newsletter?: <em>newsletter</em></li>
<li>Submitbutton: <em>registerbtn</em></li>
</ul>
</li>
<li>Setze die Standardwerte entsprechend den Werten im Screenshot (Passwort: 1234).</li>
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

let validationFuncs = [
  function() { return elementIsCorrectTag("auszeichnungen", "p"); },
  function() { return elementsExist("strong", 1, true); },
  function() { return or([elementsExist("em", 1, true), elementsExist("i", 1, true)]); },
  function() { return or([elementsExist("strong", 1, true), elementsExist("b", 1, true)]); },
  function() { return elementsExist("u", 1, true) },
  function() { return elementsExist("del", 1, true) },
  function() { return elementsExist("br", 1, true); },
  function() { return elementsExist("hr", 1, true); },
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

