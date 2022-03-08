import { globalVarDoesNotExistMsg, localVarDoesNotExistMsg, isGlobalNotLocalMsg, wrongTypeMsg, stringIsEmptyMsg, isNotConstMsg, elDoesNotExistMsg, elWrongInnerTextMsg, elWrongStyleValueMsg, wrongValueMsg, logCallDoesNotExist, elWrongTagMsg } from './error_messages.js'

export function getFailResultObj(errorMessage) {
  return {result: false, errorMessage}
}

export function getSuccessResultObj() {
  return {result: true, failMessage: null}
}

export function globalVarExists(globalVarName) {
  if (typeof(window[globalVarName]) === "undefined") {
    return getFailResultObj(globalVarDoesNotExistMsg(globalVarName));
  }
  return getSuccessResultObj();
}

export function localVarExists(variable, varName) {
  if (typeof(window[varName]) !== "undefined") {
    return getFailResultObj(isGlobalNotLocalMsg(varName));
  }
  if (typeof(variable) === "undefined") {
    return getFailResultObj(localVarDoesNotExistMsg(varName))
  }
  return getSuccessResultObj();
}

export function valueEquals(variable, varName, val) {
  if (variable !== val) {
    return getFailResultObj(wrongValueMsg(varName, val));
  }
  return getSuccessResultObj();
}

export function isNonEmptyString(variable, varName) {
  if (typeof (variable) !== "string") {
    return getFailResultObj(wrongTypeMsg(varName, "string"));
  }
  if (variable.length <= 0) {
    return getFailResultObj(stringIsEmptyMsg(varName));
  }
  return getSuccessResultObj();
}

export function scriptIncludes(requiredText) {
  let scriptEl = document.getElementById("exerciseScript");
  if (!scriptEl.innerText.includes(requiredText)) {
    return getFailResultObj(`Dein Script enthält kein ${requiredText}!`);
  }
  return getSuccessResultObj();
}

export function isConst(varName) {
  try {
    eval(`${varName} = 0`); // Not a const
  } catch (error) {
    if (error instanceof TypeError) {
      return getSuccessResultObj();
    }
  }
  return getFailResultObj(isNotConstMsg(varName));
}

export function isType(variable, varName, typeName) {
  if (typeof (variable) === typeName) {
    return getSuccessResultObj();
  }
  return getFailResultObj(wrongTypeMsg(varName, typeName));
}


export function consoleContains(strValue){
  let lcalls = JSON.parse(localStorage.getItem("logcalls"));
    for(let c in lcalls){
      if(c.includes(strValue)){
        lcalls = [];
        localStorage.setItem("logcalls", JSON.stringify(lcalls));
        return getSuccessResultObj();
      }
    }
    return getFailResultObj(logCallDoesNotExist(strValue));
}

/* HTML Element Checks */
export function elementsExist(elTagName, numOfElements) {
  let els = document.getElementsByTagName(elTagName);
  if (els.length === numOfElements) {
    return getSuccessResultObj();
  } 
  return getFailResultObj(`Es wurde(n) <b>${els.length}</b> <em>${elTagName}</em> Tag(s) gefunden, gefordert sind <b>${numOfElements}</b>.`);
}


export function innerTextEquals(elID, innerText) {
  let h1El = document.getElementById(elID);
  if (!h1El) {
    return getFailResultObj(elDoesNotExistMsg(elID));
  } 
  if (h1El.innerText !== innerText) {
    return getFailResultObj(elWrongInnerTextMsg(elID, innerText));
  }
  return getSuccessResultObj();
}

export function innerTextStartsWith(elID, innerText) {
  let h1El = document.getElementById(elID);
  if (!h1El) {
    return getFailResultObj(elDoesNotExistMsg(elID));
  } 
  if (!h1El.innerText.startsWith(innerText)) {
    return getFailResultObj(elWrongInnerTextMsg(elID, innerText));
  }
  return getSuccessResultObj();
}

export function elementIsCorrectTag(elID, requiredTag) {
  let el = document.getElementById(elID);
  if (!el) {
    return getFailResultObj(elDoesNotExistMsg(elID));
  } 
  if (el.tagName.toUpperCase() !== requiredTag.toUpperCase()) {
    return getFailResultObj(elWrongTagMsg(elID, el.tagName, requiredTag));
  }
  return getSuccessResultObj();
}

// export function elementInnerHTMLCorrect(el, elName, requiredContent) {
//   if (el.innerHTML === requiredContent) {
//     return getSuccessResultObj();
//   }
//   return getFailResultObj(`Der Inhalt des Tags ${elName} ist ${el.innerHTML}, sollte aber ${el.innerHTML} sein.`)
// }

export function hasCorrectStyleValue(elName, styleName, styleValue) {
  let h1El = document.getElementById(elName);
  if (!h1El) {
    return getFailResultObj(elDoesNotExistMsg(elName));
  } 
  if (h1El.style[styleName] !== styleValue) {
    return getFailResultObj(elWrongStyleValueMsg(elName, styleName, styleValue));
  }
  return getSuccessResultObj();
}

export function isBlockElement(elName) {
  let el = document.getElementById(elName);
  if (!el) {
    return getFailResultObj(elDoesNotExistMsg(elName));
  } 
  if (el.style.display === "block") {
    return getSuccessResultObj();
  }
  return getFailResultObj(`Das Element ${elName} ist kein Block Element`)
}

export function isInlineElement(elName) {
  // inline-block is considered inline
  let el = document.getElementById(elName);
  if (!el) {
    return getFailResultObj(elDoesNotExistMsg(elName));
  } 
  if (el.style.display !== "block") {
    return getSuccessResultObj();
  }
  return getFailResultObj(`Das Element ${elName} ist kein Inline Element`)
}

export function listHasMinElements(elName, numElements) {
  let el = document.getElementById(elName);
  let children = el.getElementsByTagName("li");
  if (children.length >= numElements) {
    return getSuccessResultObj();
  }
  return getFailResultObj(`Die Liste ${elName} hat nicht genug Elemente (mindestens: ${numElements}).`)
}


/* Main validation procedure */

export const noop = () => {};

export function validate(exerciseID, validationFuncs, beforeSuccess = noop, afterSuccess = noop, beforeFail = noop, afterFail = noop) {
  let finalResult = true;
  let errorMessages = [];
  for(let i = 0; i < validationFuncs.length; i++) {
    let resultObj = validationFuncs[i]();
    if (!resultObj.result) {
      finalResult = false;
      errorMessages.push(resultObj.errorMessage)
      break; // TODO: support breaking and non breaking errors
    }
  }
  let exerciseState = window.parent.getExerciseState(exerciseID);
  if (finalResult) {
    beforeSuccess();
    exerciseState.solved = true;
    window.parent.writeExerciseState(exerciseID, exerciseState);
    window.parent.updateExerciseState(exerciseID, exerciseState, errorMessages);
    afterSuccess();
  } else {
    beforeFail();
    exerciseState.solved = false;
    window.parent.writeExerciseState(exerciseID, exerciseState);
    window.parent.updateExerciseState(exerciseID, exerciseState, errorMessages);
    afterFail();
  }
}
