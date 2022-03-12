import { hasMinBlockOrInlineElements, validate} from '../check_helper.js';

let exerciseID = "04_html_inline_elemente";

let instructions = `
<ol>
<li>Füge mindestens drei unterschiedliche HTML Inline-Elemente ein.</li>
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
  function() { return hasMinBlockOrInlineElements(3, true); },
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

