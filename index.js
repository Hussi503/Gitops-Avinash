<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Modern Dark Scientific Calculator</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main class="app">
    <div class="calculator">
      <div class="display-wrap">
        <div id="history" class="history"></div>
        <input id="display" class="display" type="text" disabled aria-label="Calculator display" />
      </div>

      <div class="keys">
        <!-- row 1: functions -->
        <button class="btn func" data-action="clear">C</button>
        <button class="btn func" data-action="back">⌫</button>
        <button class="btn func" data-action="percent">%</button>
        <button class="btn op" data-value="/">÷</button>

        <!-- row 2 -->
        <button class="btn func" data-value="sin(">sin</button>
        <button class="btn func" data-value="cos(">cos</button>
        <button class="btn func" data-value="tan(">tan</button>
        <button class="btn op" data-value="*">×</button>

        <!-- row 3 -->
        <button class="btn num" data-value="7">7</button>
        <button class="btn num" data-value="8">8</button>
        <button class="btn num" data-value="9">9</button>
        <button class="btn op" data-value="-">−</button>

        <!-- row 4 -->
        <button class="btn num" data-value="4">4</button>
        <button class="btn num" data-value="5">5</button>
        <button class="btn num" data-value="6">6</button>
        <button class="btn op" data-value="+">+</button>

        <!-- row 5 -->
        <button class="btn num" data-value="1">1</button>
        <button class="btn num" data-value="2">2</button>
        <button class="btn num" data-value="3">3</button>
        <button class="btn func" data-value="^">^</button>

        <!-- row 6 -->
        <button class="btn num wide" data-value="0">0</button>
        <button class="btn num" data-value=".">.</button>
        <button class="btn eq" data-action="equals">=</button>
      </div>

      <div class="extra-keys">
        <button class="btn small" data-value="(">(</button>
        <button class="btn small" data-value=")">)</button>
        <button class="btn small" data-value="sqrt(">√</button>
        <button class="btn small" data-action="plusminus">±</button>
      </div>
    </div>

    <footer class="credit">Modern Dark Scientific Calculator — basic functions</footer>
  </main>

  <script src="script.js"></script>
</body>
</html>
