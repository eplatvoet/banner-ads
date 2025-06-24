var MASTER_TIMELINE = null;
var isiSection = null;
var autoScrollSpeed = 300000;
var autoScrollOffset = 0;
var ALLOW_AUTO_SCROLL = true;

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
  window.setTimeout(autoScroll, 5000);
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
  if (ALLOW_AUTO_SCROLL == false) {
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
