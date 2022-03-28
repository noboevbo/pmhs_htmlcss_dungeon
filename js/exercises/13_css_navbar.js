import { classCheckStyleSameValue, classCheckStyleValues, classHasCorrectStyleValue, cssBorderColorNames, cssBorderStyleNames, cssBorderWidthNames, cssMarginNames, cssPaddingNames} from '../exercise/validation_helper.js';
import { Exercise } from '../exercise/exercise_base.js';

let exerciseID = "13_css_navbar";


let instructions = `
<ol>
<li>Entferne die Punkte vor den einzelnen ListItems über die CSS Eigenschaft <em>list-style-type</em> der ungeordneten Liste.</li>
<li>Setze die Hintergrundfarbe der ungeordneten Liste auf schwarz.</em>
<li>Setze die Farbe von Links in jedem ListItem auf weiß. Nutze dafür verschachtelte Selektoren!</li>
<li>Füge einen Hover Effekt für jeden Link in jedem ListItem ein, bei dem die Hintergrundfarbe auf weiß und die Textfarbe auf schwarz gesetzt wird.</li>
<li>Die Liste ist noch zu breit, lege eine fixe Breite von 200px für die ungeordnete Liste fest</li>
<li>Setze außerdem den Innen- und Außenabstand für alle Seiten der ungeordneten Liste auf 0.</li>
<li>Die Links in allen Listenelementen sollen nun die gesamte verfügbare Breite nutzen. Ändere dafür deren Anzeigeart von <em>inline</em> zu <em>block</em>.
<li>Füge noch einen Innenabstand von <em>8px 16px</em> für alle Links in allen ListenElementen ein.</li>
</ol>
`

let tips = [
  {level: 1, title: "Video: Tabellen in HTML", content: `TODO`, weblinks: ["https://wiki.selfhtml.org/wiki/CSS/Tutorials/Hintergrund/Gestaltung_mit_CSS", "https://www.w3schools.com/colors/colors_names.asp"], contentIsHTML: true},
  {level: 1, title: "Benötigte HTML Elemente", content: "Den Hintergrund ändert man mit der Eigenschaft <em>background-color</em> und die Textfarbe mit der Eigenschaft <em>color</em>. Sieh dir den Link zu den Farbnamen an um Informationen über vordefinierte Farben zu erhalten.", weblinks: ["https://wiki.selfhtml.org/wiki/CSS/Tutorials/Hintergrund/Gestaltung_mit_CSS", "https://www.w3schools.com/colors/colors_names.asp"]},
  {level: 3, title: "Lösung anzeigen", content: `Die Lösung ist: <xmp>
  <style id="meinStyle">
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      width: 200px;
      background-color: #000;
    }

    li a {
      display: block;
      color: #fff;
      padding: 8px 16px; 
      text-decoration: none;
    }

    li a:hover {
      background-color: #fff;
      color: #000;
    }
  </style>
[...]
  <!-- Änderungen im Body ab hier einfügen -->
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">News</a></li>
    <li><a href="#">Contact</a></li>
    <li><a href="#">About</a></li>
  </ul> 
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