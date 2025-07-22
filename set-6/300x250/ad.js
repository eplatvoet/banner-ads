var MASTER_TIMELINE = null;

$(document).ready(function () {
  init();
});

function init() {
  startAnimation();
}

function typewriter(element, text, speed = 80, callback) {
  let i = 0;
  element.textContent = '';
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }
  type();
}

function startAnimation() {
  if (MASTER_TIMELINE == null) {
    MASTER_TIMELINE = gsap.timeline({ defaults: { ease: Power2.easeInOut } });
  }
  var tl = MASTER_TIMELINE;

  tl.to(".screen1",{
      opacity:1,
      duration: 2.5,
      delay: .5,
      onStart: function() {
        var p = document.querySelector('.screen1 p');
        if (p) {
          typewriter(p, p.getAttribute('data-fulltext') || p.textContent);
        }
      }
    }, "screen1Build")
    .to(".screen2",{
      opacity: 1,
      duration: 1.5,
      onStart: function() {
        var p = document.querySelector('.screen2 .reg-p');
        if (p) {
          typewriter(p, p.getAttribute('data-fulltext') || p.textContent);
        }
      }
    }, "screen2Build")
    .to(".screen2 .reg-p", {
      opacity:0,
      duration: .5,
      delay: 2
    }, "bolding")
    .to(".screen2 .bold", {
      opacity:1,
      duration: .5,
      delay:2
    }, "bolding")
    .to(".screen1, .screen2", {
      opacity:0,
      duration: .5,
      delay:5
    }, "buildFinalScene")
    .to(".screen3", {
      opacity:1,
      duration:.5,
      delay:5
    }, "buildFinalScene")
  tl.play();
}