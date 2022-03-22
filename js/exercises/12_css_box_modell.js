import { classCheckStyleSameValue, classCheckStyleValues, classHasCorrectStyleValue, cssBorderColorNames, cssBorderStyleNames, cssBorderWidthNames, cssMarginNames, cssPaddingNames} from '../exercise/validation_helper.js';
import { Exercise } from '../exercise/exercise_base.js';

let exerciseID = "12_css_box_modell";


let instructions = `
<ol>
<li>Die HTML Datei enthält zwei Boxen. Diese sind aktuell noch nicht formatiert. Setze die Hintergrundfarbe für alle Elemente der Klasse <em>box</em> auf <em>red</em>. Der CSS Code ist unter <em>.box {...}</em> schon vorbereitet.</li>
<li>Lege für alle Boxen eine Höhe und Breite von jeweils <em>200px</em> fest.</li>
<li>Füge für jede Box einen Rand hinzu. Dieser soll die Farbe <em>blue</em> haben, <em>20px</em> breit sein und den style <em>solid</em> haben.</li>
<li>Füge einen Innenabstand von rundum <em>20px</em> ein.</li>
<li>Füge einen Außenabstand ein. Dieser soll links und rechts jeweils <em>30px</em> betragen. Oben und Unten soll der Abstand nur <em>15px</em> groß sein.</li>
</ol>
`

let tips = [
  {level: 1, title: "Video: Tabellen in HTML", content: `TODO`, weblinks: ["https://wiki.selfhtml.org/wiki/CSS/Tutorials/Hintergrund/Gestaltung_mit_CSS", "https://www.w3schools.com/colors/colors_names.asp"], contentIsHTML: true},
  {level: 1, title: "Benötigte HTML Elemente", content: "Den Hintergrund ändert man mit der Eigenschaft <em>background-color</em> und die Textfarbe mit der Eigenschaft <em>color</em>. Sieh dir den Link zu den Farbnamen an um Informationen über vordefinierte Farben zu erhalten.", weblinks: ["https://wiki.selfhtml.org/wiki/CSS/Tutorials/Hintergrund/Gestaltung_mit_CSS", "https://www.w3schools.com/colors/colors_names.asp"]},
  {level: 3, title: "Lösung anzeigen", content: `Die Lösung ist: <xmp>
<style>
  .box {
    display: inline-block;
    background-color: red;
    width: 200px;
    height: 200px;
    border: 20px blue solid;
    margin: 15px 30px 15px 30px;
    padding: 20px;
  }
</style>
  </xmp>`, contentIsHTML: true}
]

let validationFuncs = [
  function() { return classHasCorrectStyleValue("box", "background-color", "rgb(255, 0, 0)"); },
  function() { return classHasCorrectStyleValue("box", "width", "200px"); },
  function() { return classHasCorrectStyleValue("box", "height", "200px"); },
  function() { return classCheckStyleSameValue("box", cssBorderColorNames, "rgb(0, 0, 255)"); },
  function() { return classCheckStyleSameValue("box", cssBorderWidthNames, "20px"); },
  function() { return classCheckStyleSameValue("box", cssBorderStyleNames, "solid"); },
  function() { return classCheckStyleSameValue("box", cssPaddingNames, "20px"); },
  function() { return classCheckStyleValues("box", cssMarginNames, ["15px", "30px", "15px", "30px"]); },
]

let exerciseBase = new Exercise(exerciseID, instructions, tips, validationFuncs);
window.onload = exerciseBase.init();