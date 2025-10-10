// script.js — basic scientific calculator (modern dark theme)

// Elements
const display = document.getElementById('display');
const historyEl = document.getElementById('history');
const buttons = document.querySelectorAll('.btn');

let expr = '';        // string expression shown/edited
let history = '';     // last expression/result shown in history

// Utility: update display
function updateDisplay() {
  display.value = expr || '0';
  historyEl.textContent = history;
}

// Map user tokens to JS math
function toJS(input) {
  // Replace visible tokens with JavaScript Math equivalents:
  // sin( -> Math.sin(  etc.
  // ^ -> **, √ or sqrt( -> Math.sqrt(
  let s = input;

  // protect against accidental multiple replacements by doing token replacements carefully
  s = s.replaceAll('√', 'sqrt(');

  // function names: replace e.g. sin( to Math.sin(
  const fnNames = ['sin','cos','tan','sqrt'];
  fnNames.forEach(fn => {
    // use regex to replace occurrences like sin( or sin[number/space - we'll just replace 'sin(' pattern
    s = s.replaceAll(fn + '(', 'Math.' + fn + '(');
  });

  // caret to exponent
  s = s.replaceAll('^', '**');

  // percent: convert trailing percent on a number like 50% -> (50/100)
  // naive approach: replace number% patterns
  s = s.replace(/(\d+(\.\d+)?)%/g, '($1/100)');

  return s;
}

// Evaluate safely with try/catch
function evaluateExpression(input) {
  try {
    const jsExpr = toJS(input);
    // eslint-disable-next-line no-eval
    const result = eval(jsExpr);
    if (result === undefined) throw new Error('Invalid');
    // round small floating imprecision to sensible digits
    const rounded = Math.round((result + Number.EPSILON) * 1e12) / 1e12;
    return rounded;
  } catch (err) {
    return 'Error';
  }
}

// Button handling
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.dataset.value;
    const action = btn.dataset.action;

    if (action === 'clear') {
      expr = '';
      history = '';
      updateDisplay();
      return;
    }

    if (action === 'back') {
      if (expr.length) expr = expr.slice(0, -1);
      updateDisplay();
      return;
    }

    if (action === 'percent') {
      // append percent sign which will be handled in toJS
      expr += '%';
      updateDisplay();
      return;
    }

    if (action === 'plusminus') {
      // toggle sign: attempt to wrap last number with unary minus
      if (!expr) {
        expr = '-';
      } else {
        // find last number start
        const match = expr.match(/(-?\d+(\.\d+)?|\))$/);
        if (match && match[0].startsWith(')')) {
          // for parentheses we prepend -( ... )
          expr = '-(' + expr + ')';
        } else {
          // prepend or remove leading minus for last numeric token
          // simple approach: if expression starts with '-', remove; else add '-'
          if (expr[0] === '-') expr = expr.slice(1);
          else expr = '-' + expr;
        }
      }
      updateDisplay();
      return;
    }

    if (action === 'equals') {
      if (!expr) return;
      const result = evaluateExpression(expr);
      history = expr + ' =';
      expr = (result === 'Error') ? '' : String(result);
      updateDisplay();
      return;
    }

    // otherwise, data-value appended
    if (val !== undefined) {
      // if value is a function like sin( or sqrt( it already includes '('
      expr += val;
      updateDisplay();
      return;
    }
  });
});

// initialize
updateDisplay();
