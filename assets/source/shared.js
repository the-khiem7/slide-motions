// Theme switch for rendered illustrations: ?theme=dark selects the dark tokens in the stylesheet.
document.documentElement.dataset.theme = new URLSearchParams(location.search).get("theme") === "dark" ? "dark" : "light";

// The HyperFrames logo is loaded from its file and inlined, so the wordmark can follow the theme ink.
// A synchronous request keeps the logo in the DOM before render.py takes the screenshot.
(function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "brand/hyperframes-logo.svg", false);
  xhr.send();
  var svg = xhr.status === 200 ? xhr.responseText.replace(/fill="black"/g, 'fill="currentColor"') : "";
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".hf-logo").forEach(function (el) { el.innerHTML = svg; });
  });
})();
