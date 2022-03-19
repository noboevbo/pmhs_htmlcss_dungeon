function getEmptyInitInstructionsMessage() {
  return {
    subject: "initInstructions",
    exerciseID: -1,
    content: ""
  }
};

function getEmptyInitTipsMessage() {
  return {
    subject: "initTips",
    exerciseID: -1,
    content: ""
  };
};

function getEmptyExerciseSolvedMessage() {
  return {
    subject: "updatedExerciseState",
    exerciseID: -1,
    content: false
  }
}

export {
  getEmptyInitInstructionsMessage,
  getEmptyInitTipsMessage,
  getEmptyExerciseSolvedMessage as getEmptyExerciseStateMessage
};