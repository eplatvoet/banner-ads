var MASTER_TIMELINE = null;

$(document).ready(function () {
  init();

  var currentDate = new Date();
  var targetDate = new Date('2025-10-18');
  var timeDifference = targetDate.getTime() - currentDate.getTime();
  var daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
  $('.countdownCopy').html(daysDifference + ` <span class="daysUntil">days until</span>`);
});

function init() {
  startAnimation();
}

function startAnimation() {
  if (MASTER_TIMELINE == null) {
    MASTER_TIMELINE = gsap.timeline({ defaults: { ease: Power2.easeInOut } });
  }
  var tl = MASTER_TIMELINE;

  tl.to(
    ".screen1",
    {
      opacity: 1,
      duration: 0.5,
      delay: .5,
    },
    "screen1"
    )
    .to(
      ".screen1, .bg1",
      {
        opacity: 0,
        duration: 0.75,
        delay: 3.25,
      },
      "screen2Build"
    )
    .to(
      ".bg2",
      {
        opacity: 1,
        duration: 0.75,
        delay: 3.25,
      },
      "screen2Build"
    )
    .to(
      ".screen2",
      {
        opacity: 1,
        duration: 0.5,
        delay: .25,
      })
    .to(".seeYa", {
      opacity: 1,
      duration: 0.75,
      delay: .5
    })
  tl.play();
}