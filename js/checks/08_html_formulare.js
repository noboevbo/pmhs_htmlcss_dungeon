import { elCheckAttributeValue, elementIsCorrectTag, elementIsChildOf, or, validate} from '../check_helper.js';

let exerciseID = "08_html_formulare";

let instructions = `
<ol>
<li>Füge eine Formular mit folgendem Inhalt ein.<br><img src="aufgaben/static/formular.png" alt="Beispielformular"></li>
<li>Das formular-Element soll die ID <em>formular1</em> haben.</li>
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
  <form id="formular1">
    <label for="vorname">Vorname:</label><br>
    <input type="text" id="vorname" name="vorname" value="Eve"><br>
    <label for="nachname">Nachname:</label><br>
    <input type="text" id="nachname" name="nachname" value="Eavesdrop"><br>
    <label for="passwort">Passwort:</label><br>
    <input type="password" id="passwort" name="passwort" value="1234"><br>
    <label for="newsletter">Newsletter abonnieren?:</label><br>
    <input type="checkbox" id="newsletter" name="newsletter" checked><br><br>
    <input id="registerbtn" type="submit" value="Submit">
  </form> 
  </xmp>`, contentIsHTML: true}
]

let validationFuncs = [
  function() { return elementIsCorrectTag("formular1", "form"); },
  function() { return elementIsCorrectTag("vorname", "input"); },
  function() { return elCheckAttributeValue("vorname", "type", "text")},
  function() { return elementIsChildOf("vorname", "formular1"); },
  function() { return elementIsCorrectTag("nachname", "input"); },
  function() { return elCheckAttributeValue("nachname", "type", "text")},
  function() { return elementIsChildOf("nachname", "formular1"); },
  function() { return elementIsCorrectTag("passwort", "input"); },
  function() { return elCheckAttributeValue("passwort", "type", "password")},
  function() { return elementIsChildOf("passwort", "formular1"); },
  function() { return elementIsCorrectTag("newsletter", "input"); },
  function() { return elCheckAttributeValue("newsletter", "type", "checkbox")},
  function() { return elementIsChildOf("newsletter", "formular1"); },
  function() { return elementIsCorrectTag("registerbtn", "input"); },
  function() { return elCheckAttributeValue("registerbtn", "type", "submit")},
  function() { return elementIsChildOf("registerbtn", "formular1"); },
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

