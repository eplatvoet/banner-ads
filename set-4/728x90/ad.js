function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom > 0
  );
}

function getScrollProgress(el) {
  var rect = el.getBoundingClientRect();
  var windowHeight = window.innerHeight || document.documentElement.clientHeight;
  // Progress: 0 when top enters viewport, 1 when bottom is fully visible
  var total = rect.height;
  var visible = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top);
  var progress = visible / total;
  return Math.max(0, Math.min(1, progress));
}

$(document).ready(function () {
  gsap.set('.logo', { x: -100, opacity: 0, y:10 });
  gsap.set('.cta', { x: 728, opacity: 0 });
  gsap.set('.bg', { opacity: 0.75 });
  function parallaxAnimate() {
    var wrapper = document.querySelector('.ad-wrapper');
    if (!wrapper) return;
    var progress = getScrollProgress(wrapper);
    gsap.to('.logo', { x: -100 + 115 * progress, opacity: progress, duration: 0.2, overwrite: 'auto' });
    gsap.to('.cta', { x: 728 - 300 * progress, opacity: progress, duration: 0.2, overwrite: 'auto' });
    gsap.to('.bg', { opacity: 0.75 + 0.25 * progress, duration: 0.1, overwrite: 'auto' });
  }
  $(window).on('scroll resize', parallaxAnimate);
  parallaxAnimate();
  // Detect if in iframe and add class
  if (window.self !== window.top) {
    document.body.classList.add('in-iframe');
  }
});