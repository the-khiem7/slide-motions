# Live motion in a presented deck

`<hyperframes-slideshow>` moves between slides and fragments only by seeking: `playTo(t)` calls `player.seek(t)`, and the runtime then calls `totalTime(localTime, false)` once on the active slide's registered timeline. Nothing plays. A deck built only from seekable timelines therefore shows every slide as a finished still. This page adds two kinds of motion that run only in the presented deck, so `snapshot`, `check` and render still see the plain seek-only composition.

| Kind | What the audience sees | How |
|---|---|---|
| Playthrough | The slide's entrance plays at real speed up to the hold; the next fragment plays on from there | The runtime seeks a stand-in clock; the visible timeline is tweened to that time |
| Ambient loops | Motion that keeps going while a slide is held: dashes flowing along a line, a radar sweep, a ping, a drifting grid | Free GSAP tweens on properties no slide timeline touches |

## Detect the presented deck

The composition runs in the player's iframe, same origin as the slideshow page. Stills, checks and renders load it on its own.

```js
var live = (function () {
  try { return window.top !== window && !!window.top.document.querySelector("hyperframes-slideshow"); } catch (e) { return false; }
})();
if (live) document.documentElement.classList.add("live");
```

Gate everything below on `live`. Turned on outside the slideshow, a still catches a slide mid-entry.

## Playthrough: a stand-in clock per slide

Build each slide's timeline as usual, every hold fully landed when seeked to. Outside the slideshow register it directly. In the slideshow register a stand-in clock of the slide's `data-duration` and wrap its `totalTime`. That is the only method the runtime calls on navigation; GSAP's internal render does not go through the instance method.

```js
var current = null;
function follow(id, tl, t) {
  var entering = current !== id;
  var back = entering && current !== null &&
    +document.getElementById(id).dataset.start < +document.getElementById(current).dataset.start;
  current = id;
  gsap.killTweensOf(tl);
  var from = entering ? 0 : tl.time();
  if (back || t <= from) { tl.time(t); return; }        // backwards: land at once
  tl.time(from);
  gsap.to(tl, { time: t, duration: t - from, ease: "none" });  // forwards: play at real speed
}
function register(id, tl) {
  if (!live) { window.__timelines[id] = tl; return; }
  var clock = gsap.timeline({ paused: true });
  clock.to({}, { duration: +document.getElementById(id).dataset.duration });
  var seek = clock.totalTime;
  clock.totalTime = function (t) {
    var r = seek.apply(clock, arguments);
    if (arguments.length) follow(id, tl, clock.time());
    return r;
  };
  window.__timelines[id] = clock;
}
```

- Entering forwards replays the entrance from 0, so a slide visited twice still animates in.
- Going back lands at once. Replaying every fragment on the way back is slow and reads as a glitch.
- `ease: "none"` keeps the eases authored inside `tl`. The tween duration is the distance in timeline seconds, so motion runs at authored speed. A rest frame at the slide's mid-point simply idles after the last reveal.
- A press during a playthrough kills the running tween and continues from the current position.
- Hotspot branches and their Back button go through the same seek, so they work unchanged.

## Ambient loops

```js
// Started after this script returns: tweens created while it runs are adopted into the paused
// composition timeline and never move.
if (live) setTimeout(function () {
  var forever = 9999;  // finite: `repeat: -1` trips the gsap_infinite_repeat lint
  gsap.to(".flow", { strokeDashoffset: -45, duration: 0.9, ease: "none", repeat: forever });
  gsap.to(".sweep", { rotation: 360, svgOrigin: "960 540", duration: 7, ease: "none", repeat: forever });
  gsap.to(document.documentElement, { "--pan": "96px", duration: 24, ease: "none", repeat: forever });
}, 0);
```

| Rule | Why | Breaks if ignored |
|---|---|---|
| Start the loops in a `setTimeout` after the scene script | The runtime diffs `gsap.globalTimeline` children around each scene script and moves every new tween into the paused composition timeline | The loops are created but never advance |
| Animate only properties no slide timeline touches. Wrap an SVG element that carries a `transform` attribute in a `<g>` and move the `<g>` | Two writers on one property fight | A hold flickers or lands on the wrong value |
| Use a finite `repeat` such as 9999 | The loops never reach seeking or export, but lint flags `repeat: -1` | `check` reports `gsap_infinite_repeat` |
| Do not gate the loops on `prefers-reduced-motion` | Windows reports reduced motion whenever "Animation effects" is off, and headless Chrome always reports it | The presenter's deck goes still with no visible cause, and a headless test sees no motion at all |
| Keep layers that exist only for motion (flow dashes, ping rings, orbiting dots) hidden outside the slideshow: `.amb { display: none } .live .amb { display: inline }` | Stills and contrast checks then see the plain slide | Static dashes and rings clutter snapshots |
| Reveal an ambient layer through the slide timeline (fade it in after the line it rides on is drawn), or put it inside a group the timeline already fades | The layer then appears with its slide content, not before it | Dots flow along a line that has not been drawn yet |

Good candidates are motion that carries meaning: packets flowing in the direction of a data flow, a sync loop turning, a radar sweep on a "live demo" slide, a ping on the element that changed. Keep text-heavy slides still so the audience can read.

## Verify

- `npx hyperframes check` stays at its previous findings: the live code never runs there.
- Against `npx hyperframes present`, drive the deck with puppeteer, find the frame whose URL contains `/composition/index.html`, and read numbers rather than screenshots: an element's opacity right after a key press and again 1.5 s later (playthrough), and a loop target's `transform` or `strokeDashoffset` twice 0.7 s apart (ambient).
- If the ambient numbers do not change in a headless run, first rule out a `prefers-reduced-motion` gate.
