import { validate } from '../exercise/validation_helper.js';

let exerciseID = "TODO: insert id";

let validationFuncs = [
  // TODO: add exercises and return {result: xy, errorMessage: xy}, see validation_helper for examples
  function() { return TODO }
]

let tips = [
  TODO
]

window.onload = function() { 
  window.parent.initializeTips(exerciseID, tips);
  validate(exerciseID, validationFuncs); 
};
