import { elementIsCorrectTag, elementsExist, or, validate} from '../check_helper.js';

let exerciseID = "09_html_strukturierung";

let instructions = `
<ol>
<li>Erstelle eine Website mit folgenden Inhalten. Es sollen semantische HTML5-Tags für die entsprechenden Bereiche verwendet werden!</li>
<li>Eine Kopfzeile mit einer Überschrift erster Ordnung</li>
<li>Hauptteil mit folgenden Inhalten: <ol>
<li>Erster Blogpost mit einer Überschrift zweiter Ordnung sowie einem Paragraphen mit Blindtext.</li>
<li>Zweiter Blogpost mit einer Überschrift zweiter Ordnung sowie einem Paragraphen mit Blindtext.</li>
</ol></li>
<li>Eine Fußzeile in der mit kleinerem Text das Copyright Symbol und dahinter das Jahr sowie ein beliebiger Name steht.</li>
<li>Tipp: Blindtexte kann man z.B. auf <a href="https://corporatelorem.kovah.de/">https://corporatelorem.kovah.de/</a> finden.</li>
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

