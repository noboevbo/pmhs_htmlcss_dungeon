import { globalVarDoesNotExistMsg, localVarDoesNotExistMsg, isGlobalNotLocalMsg, wrongTypeMsg, stringIsEmptyMsg, isNotConstMsg, elDoesNotExistMsg, elWrongInnerTextMsg, elWrongStyleValueMsg, wrongValueMsg, logCallDoesNotExist, elWrongTagMsg, validationErrorPossibleUndefinedObjMsg } from './error_messages.js'

export function getFailResultObj(errorMessage) {
  return {result: false, errorMessage}
}

export function getSuccessResultObj() {
  return {result: true, errorMessage: null}
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
export function elementsExist(elTagName, numOfElements, allowMoreElements=false, inEl=null) {
  let els = inEl ? inEl.getElementsByTagName(elTagName) : document.getElementsByTagName(elTagName);
  if ((allowMoreElements && els.length >= numOfElements) || els.length === numOfElements) {
    return getSuccessResultObj();
  }
  let searchedIn = inEl ? (inEl.id ? inEl.id : inEl.tagName) : "document";
  return getFailResultObj(`In ${searchedIn} wurde(n) <b>${els.length}</b> <em>${elTagName}</em> Tag(s) gefunden, gefordert sind <b>${numOfElements}</b>.`);
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

export function elementIsChildOf(elID, parentID) {
  let el = document.getElementById(elID);
  if (el && el.parentElement && el.parentElement.id === parentID) {
    return getSuccessResultObj();
  } 
  return getFailResultObj(`Das Element ${elID} ist kein Kindelement von ${parentID}.`);
}

export function linkTargetIsCorrect(elID, target) {
  let el = document.getElementById(elID);
  console.log(el.href);
  if (el && el.getAttribute("href") === target) {
    return getSuccessResultObj();
  }
  return getFailResultObj(`Das Ziel des Links <em>${el.id}</em> ist nicht korrekt!`);
}

export function linkContentIsCorrect(elID, content) {
  let el = document.getElementById(elID);
  if (el && el.innerHTML === content) {
    return getSuccessResultObj();
  }
  return getFailResultObj(`Der Inhalt des Links <em>${el.id}</em> ist nicht korrekt!`);
}

export function elSrcAttributeIs(elID, path) {
  let el = document.getElementById(elID);
  if (el && el.getAttribute("src") === path) {
    return getSuccessResultObj();
  }
  return getFailResultObj(`Der Pfad des Elements <em>${el.id}</em> ist nicht korrekt!`);
}

export function checkTableContent(elID, tableContent) {
  // tableContent: Nested List rows->columns
  let el = document.getElementById(elID);
  let rows = el.getElementsByTagName("tr");
  let errors = "";
  for(let row=0; row < tableContent.length; row++) {
    let column_descriptions = tableContent[row];
    let curr_row = rows[row];
    let columns = curr_row.querySelectorAll('th,td');
    for(let column=0; column < column_descriptions.length; column++) {
      let column_description = column_descriptions[column];
      let column_type = column_description.type;
      let column_value = column_description.value;
      let curr_column = columns[column];
      if (curr_column.tagName.toUpperCase() !== column_type.toUpperCase()) {
        errors += `Der Zellentyp von Zeile ${row+1} Spalte ${column+1} (Wert: ${column_value}) ist nicht korrekt!<br>`;
      }
      if (curr_column.innerText !== column_value) {
        errors += `Der Wert in Zeile ${row+1} Spalte ${column+1} ist nicht korrekt!<br>`
      }
    }
  }
  if (errors === "") {
    return getSuccessResultObj();
  }
  return getFailResultObj(errors);
}
export function elAttributeValueRegex(elID, attributeName, pattern) {
  let el = document.getElementById(elID);
  let myRe = new RegExp(pattern)
  let attribute = el.attributes[attributeName];
  if (el && attribute && myRe.exec(attribute.value)) {
    return getSuccessResultObj();
  }
  return getFailResultObj(`Der Pfad des Elements <em>${el.id}</em> ist nicht korrekt!`);
}

export function elCheckAttributeValue(elID, attributeName, value) {
  let el = document.getElementById(elID);
  let attribute = el.attributes[attributeName];
  if (attribute && attribute.value === value) {
    return getSuccessResultObj();
  }
  return getFailResultObj(`Das Attribut ${attributeName} des HTML-Elements ${elID} hat den falschen Wert!`);
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

export function hasMinBlockOrInlineElements(minNumElements, inline = false) {
  let els = document.body.getElementsByTagName("*");
  let count = 0;
  for(let i=0; i<els.length; i++) {
    let el = els[i];
    if (el.tagName.toUpperCase() === "SCRIPT") {
      continue;
    }
    let isBlock = window.getComputedStyle(el, null).display === "block";
    if ((!inline && isBlock) || (inline && !isBlock)) {
      count += 1;
    }
    if (count >= minNumElements) {
      return getSuccessResultObj();
    }
  }
  return getFailResultObj(`Es sind erst ${count} von ${minNumElements} ${inline ? "Inline" : "Block"}-Elemente vorhanden!`)
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

export function or(resultObjects) {
  let errorMessage = "";
  for (let i=0; i<resultObjects.length; i++) {
    let resultObj = resultObjects[i];
    if (resultObj.result) {
      return resultObj;
    }
    errorMessage += resultObj.errorMessage + " oder: <br>";
  }
  return getFailResultObj(errorMessage);
}


/* Main validation procedure */

export const noop = () => {};

export function validate(exerciseID, validationFuncs, beforeSuccess = noop, afterSuccess = noop, beforeFail = noop, afterFail = noop) {
  console.log("validate");
  let finalResult = true;
  let errorMessages = [];
  for(let i = 0; i < validationFuncs.length; i++) {
    try {
      let resultObj = validationFuncs[i]();
      if (!resultObj.result) {
        finalResult = false;
        errorMessages.push(resultObj.errorMessage)
        // break; // TODO: support breaking and non breaking errors
      }
    } catch (e) {
      finalResult = false;
      console.log(e);
      // errorMessages.push(e);
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
