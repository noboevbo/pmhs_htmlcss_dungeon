import { elementIsCorrectTag, elementsExist, elCheckAttributeValue, elSrcAttributeIs, elAttributeValueRegex, or, validate} from '../check_helper.js';

let exerciseID = "06_html_embedded";

let instructions = `
<ol>
<li>Füge das Video <em>aufgaben/static/sample.mp4</em> über das HTML5 Video-Tag ein. Nutze einen relativen Pfad ausgehend vom aufgaben Ordner! Das Video soll in der Breite 100% des verfügbaren Platzes einnehmen. Weitergehend soll der Benutzer Bedienmöglichkeiten (unter anderem Play/Pause) haben.</li>
<li>Füge die MP3 <em>aufgaben/static/airtone_-_shimmer_1.mp3</em> über das HTML5 Audio-Tag ein. Nutze einen relativen Pfad ausgehend vom aufgaben Ordner! Der Benutzer soll Bedienmöglichkeiten (unter anderem Play/Pause) haben.<em>
<li>Bette ein beliebiges YouTube Video ein.</li>
</ol>
`

let tips = [
  {level: 1, title: "Texte im Paragraphen markieren.", content: "Innerhalb eines Paragraphen können unterschiedliche Auszeichnungen verwendet werden, bsp. <p>Das ist ein <strong>Text</strong></p>. Unter dem Link findest du weitere Auszeichnungsmöglichkeiten.", weblinks: ["https://wiki.selfhtml.org/wiki/HTML/Tutorials/HTML5/Textauszeichnung"]},
  {level: 1, title: "Zeilenumbruch im Paragraphen verwenden.", content: "Paragraphen können beliebigen HTML Code enthalten, entsprechend kannst du einfach im Text innerhalb des Paragraphen einen Zeilenumbruch (<br>) Einsetzen.", weblinks: ["https://www.w3schools.com/html/html_paragraphs.asp"]},
  {level: 2, title: "Lösung anzeigen", content: `Die Lösung ist: <xmp>
  <video id="video1" src="static/sample.mp4" width="100%" controls></video>
  <audio id="audio1" src="static/airtone_-_shimmer_1.mp3" controls></audio>
  <iframe id="youtube1" width="560" height="315" src="https://www.youtube-nocookie.com/embed/nra1yvVlZwA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </xmp>`, contentIsHTML: true}
]

let validationFuncs = [
  function() { return elementIsCorrectTag("video1", "video"); },
  function() { return elSrcAttributeIs("video1", "static/sample.mp4") },
  function() { return elCheckAttributeValue("video1", "width", "100%")},
  function() { return elCheckAttributeValue("video1", "controls", "") },
  function() { return elementIsCorrectTag("audio1", "audio"); },
  function() { return elSrcAttributeIs("audio1", "static/airtone_-_shimmer_1.mp3") },
  function() { return elCheckAttributeValue("audio1", "controls", "") },
  function() { return elementIsCorrectTag("youtube1", "iframe"); },
  function() { return elAttributeValueRegex("youtube1", "src", "http.*youtube"); },
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

