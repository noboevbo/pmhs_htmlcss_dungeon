import { elementIsCorrectTag, elementsExist, checkTableContent, or, hasCorrectStyleValue} from '../exercise/validation_helper.js';
import { Exercise } from '../exercise/exercise_base.js';

let exerciseID = "11_css_farben";


let instructions = `
<ol>
<li>Bearbeite die HTML Datei so, dass die Hintergrundfarbe der Überschrift <em>DarkSlateGray</em> (Hex: #2F4F4F) und die Schriftfarbe <em>weiß</em> ist.</li>
<li>Arbeite im vorbereiten CSS Element h1 { ... }.</li>
</ol>
`

let tips = [
  {level: 1, title: "Video: Tabellen in HTML", content: `TODO`, weblinks: ["https://wiki.selfhtml.org/wiki/CSS/Tutorials/Hintergrund/Gestaltung_mit_CSS", "https://www.w3schools.com/colors/colors_names.asp"], contentIsHTML: true},
  {level: 1, title: "Benötigte HTML Elemente", content: "Den Hintergrund ändert man mit der Eigenschaft <em>background-color</em> und die Textfarbe mit der Eigenschaft <em>color</em>. Sieh dir den Link zu den Farbnamen an um Informationen über vordefinierte Farben zu erhalten.", weblinks: ["https://wiki.selfhtml.org/wiki/CSS/Tutorials/Hintergrund/Gestaltung_mit_CSS", "https://www.w3schools.com/colors/colors_names.asp"]},
  {level: 3, title: "Lösung anzeigen", content: `Die Lösung ist: <xmp>
<style>
  h1 {
    background-color: #2F4F4F;
    color: white;
  }
</style>
  </xmp>`, contentIsHTML: true}
]

let validationFuncs = [
  function() { return elementIsCorrectTag("ueberschrift", "h1"); },
  function() { return hasCorrectStyleValue("ueberschrift", "background-color", "rgb(47, 79, 79)"); },
  function() { return hasCorrectStyleValue("ueberschrift", "color", "rgb(255, 255, 255)"); },
]

let exerciseBase = new Exercise(exerciseID, instructions, tips, validationFuncs);
window.onload = exerciseBase.init();