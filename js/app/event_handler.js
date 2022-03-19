import {
  selectedExerciseInstructionsEl
} from "./dom_selectors.js";
import {
  setTips
} from "./tip_handler.js";

function exerciseMessageHandler(event) {
  if (event.origin !== window.origin) {
    console.log(`Message from origin: ${event.origin} but window is ${window.origin} - abort!`);
    return;
  }
  let msg = event.data;
  console.log(`Got msg with subject: ${msg.subject}`);
  switch (msg.subject) {
    case "initInstructions":
      setInstructions(msg);
      break;
    case "initTips":
      setTips(msg);
      break;
  }
  console.log(event);
}

function setInstructions(instructionMsg) {
  selectedExerciseInstructionsEl.innerHTML = instructionMsg.content;
}


export {
  exerciseMessageHandler
};