import { elementIsCorrectTag, linkTargetIsCorrect, linkContentIsCorrect, elSrcAttributeIs, or, validate} from '../check_helper.js';

let exerciseID = "05_html_pfade";

let instructions = `
<ol>
<li>Füge einen Link zur Website https://wiki.selfhtml.org ein. Der kickbare Text soll <em>selfhtml</em> sein. Wenn man auf den Link klickt, soll sich die Website in einem neuen Tab öffnen. Das HTML-Element soll die ID <em>einlink</em> haben.</li>
<li>Füge ein img-Element ein um das Bild <em>aufgaben/static/Boxmodell-detail.png</em> anzuzeigen. Das Bild zeigt das CSS Boxmodell. Verwende eine relative Pfadangabe. Das HTML-Element soll die ID <em>bild1</em> haben.</li>
<li>Füge ein img-Element ein um das Bild <em>img/00_tutorial-code-screenshot.png</em> anzuzeigen. Das Bild zeigt einen Screenshot von Aufgabencode. Verwende eine relative Pfadangabe vom aktuellen Verzeichnis aus! Das HTML-Element soll die ID <em>bild2</em> haben.</li>
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

let validationFuncs = [
  function() { return elementIsCorrectTag("einlink", "a"); },
  function() { return linkTargetIsCorrect("einlink", "https://wiki.selfhtml.org"); },
  function() { return linkContentIsCorrect("einlink", "selfhtml"); },
  function() { return or([elSrcAttributeIs("bild1", "/aufgaben/static/Boxmodell-detail.png"), elSrcAttributeIs("bild1", "static/Boxmodell-detail.png")]); },
  function() { return elSrcAttributeIs("bild2", "../img/00_tutorial-code-screenshot.png"); }
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

