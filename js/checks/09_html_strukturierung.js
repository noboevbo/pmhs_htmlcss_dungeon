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
  <header>
    <h1>Mein Blo[ck]g</h1>
  </header>
  <main>
    <article>
      <h2>Ein Blogeintrag</h2>
      <p>TheThe moment I fully grasped the danger of my situation in the opening few hours of Cyberpunk 2077, I had just opted to take a hit of a particularly dodgy illegal substance. The drug came from a junkie gangster with a spider-like face full of red cybernetic eyes. His name, he insisted, was Dum Dum. As a street kid, my chosen "life path" in the game, I recognized the name of the aerosolized adrenaline-booster and was able to chat cordially with our frightening host about it. Had I come from a corporate background or been a wandering nomad type passing through Night City, I might not have known.</p>
    </article>
    <article>
      <h2>Zweiter Blogeintrag</h2>
      <p>It’s an eclectic lineup, but it’s also one that includes some of the developer’s more influential games. San Andreas is the biggest of the trio and arguably is the most beloved game in the GTA series. It introduced the world to the fictional version of California that would also be the setting for the best-selling Grand Theft Auto V. Midnight Club: Los Angeles, meanwhile, is a racer that came out in 2008, and at present, it’s the last title in the series to be released, while Table Tennis is a shockingly in-depth look at the sport from a developer best-known for violent action games.</p>
    </article>
  </main>
  <footer>
    <small>© 2022 Alice</small>
  </footer>
  </xmp>`, contentIsHTML: true}
]

let validationFuncs = [
  function() { return elementsExist("header", 1, false); },
  function() { return elementsExist("h1", 1, false, document.getElementsByTagName("header")[0]); },
  function() { return elementsExist("main", 1, false); },
  function() { return elementsExist("footer", 1, false); },
  function() { return elementsExist("article", 2, true, document.getElementsByTagName("main")[0]); },
  function() { return elementsExist("h2", 2, true, document.getElementsByTagName("main")[0]); },
  function() { return elementsExist("p", 2, true, document.getElementsByTagName("main")[0]); },
  function() { return elementsExist("small", 1, false, document.getElementsByTagName("footer")[0]); },
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

