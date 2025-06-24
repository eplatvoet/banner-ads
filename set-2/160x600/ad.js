var MASTER_TIMELINE = null;
var isiSection = null;
var autoScrollSpeed = 100000;
var autoScrollOffset = 0;
var ALLOW_AUTO_SCROLL = true;
var CURRENT_PLAY_COUNT = 1;
var TOTAL_PLAY_COUNT = 3;

$(document).ready(function () {
  init();
  var isIOS = typeof bowser !== "undefined" && bowser.ios;

  isiSection = new IScroll(scrollerMask, {
    mouseWheel: true,
    scrollbars: true,
    interactiveScrollbars: true,
    resizeScrollbars: false,
    click: true,
    bounce: isIOS ? false : true,
  });
  addListeners();
});

function init() {
  startAnimation();
}

function getTranslateY(element) {
  if (!element) return 0;
  const transform = window
    .getComputedStyle(element)
    .getPropertyValue("transform");
  const matrix = new DOMMatrix(transform);
  return matrix.m42;
}

function addListeners() {
  if (!isiSection) return;

  isiSection.on("scrollStart", stopAutoScroll);
  isiSection.on("scrollEnd", function () {
    if (!ALLOW_AUTO_SCROLL) {
      var currentScrollPosition = getTranslateY(scrollerContent);
      isiSection.scrollTo(0, currentScrollPosition, 0);
    }
  });

  scrollerContainer.addEventListener("touchstart", stopAutoScroll, {
    passive: false,
  });
  scrollerContainer.addEventListener("touchmove", stopAutoScroll, {
    passive: false,
  });
  scrollerContainer.addEventListener("click", stopAutoScroll);

  var scroller = document.querySelector(".iScrollIndicator");
  if (scroller) {
    scroller.addEventListener("touchstart", stopAutoScroll, { passive: false });
    scroller.addEventListener("click", stopAutoScroll);
  }
}

function stopAutoScroll(event) {
  if (ALLOW_AUTO_SCROLL) {
    var currentScrollPosition = getTranslateY(scrollerContent);
    isiSection.scrollTo(0, currentScrollPosition, 0, {
      style: "cubic-bezier(0,0,1,1)",
      fn: function (k) {
        return k;
      },
    });
  }
  ALLOW_AUTO_SCROLL = false;
}

function autoScroll() {
  if (CURRENT_PLAY_COUNT > 1 || ALLOW_AUTO_SCROLL == false) {
    return false;
  }
  var endPosition =
    0 -
    (scrollerContent.offsetHeight - autoScrollOffset) +
    scrollerMask.offsetHeight;
  isiSection.scrollTo(0, endPosition, autoScrollSpeed, {
    style: "cubic-bezier(0,0,1,1)",
    fn: function (k) {
      return k;
    },
  });
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
      ".icon1",
      {
        opacity: 1,
        right: 44,
        duration: 0.5,
        delay: .5,
      },
      "screen1"
    )
    .to(
      ".screen1, .icon1",
      {
        opacity: 0,
        duration: 0.5,
        delay: 3,
      },
      "screen2Build"
    )
    .to(
      ".screen2",
      {
        opacity: 1,
        duration: 0.5,
        delay: 3.25,
      },
      "screen2Build"
    )
    .to(
      ".icon2",
      {
        opacity: 1,
        right: 44,
        duration: 0.5,
        delay: 3.25,
      },
      "screen2Build"
    )
    .to(
      ".screen2, .icon2",
      {
        opacity: 0,
        duration: 0.5,
        delay: 3,
      },
      "screen3Build"
    )
    .to(
      ".screen3",
      {
        opacity: 1,
        duration: 0.5,
        delay: 3.25,
      },
      "screen3Build"
    )
    .to(
      ".icon3",
      {
        opacity: 1,
        right: 44,
        duration: 0.5,
        delay: 3.25,
      },
      "screen3Build"
    )
    .to(
      ".icon3",
      {
        opacity:1,
        delay: 3.25,
        onComplete: autoScroll,
      }
    );
  tl.play();
}
