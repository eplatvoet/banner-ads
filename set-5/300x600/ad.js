$(document).ready(function () {
  // Detect if in iframe and add class
  if (window.self !== window.top) {
    document.body.classList.add('in-iframe');
  }

  function getScrollProgress(el) {
    var rect = el.getBoundingClientRect();
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    var total = rect.height;
    var visible = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top);
    var progress = visible / total;
    return Math.max(0, Math.min(1, progress));
  }

  function parallaxBg() {
    var wrapper = document.querySelector('.ad-wrapper');
    var bg = document.querySelector('.bg');
    if (!wrapper || !bg) return;
    var progress = getScrollProgress(wrapper);
    // Move bg from y: -100px (when not visible) to y: 0 (when fully visible)
    // Also scale from 1 to 1.15 for a zoom-in effect
    gsap.to(bg, { y: -100 + 100 * progress, scale: 1 + 0.5 * progress, duration: 0.2, overwrite: 'auto' });
  }

  $(window).on('scroll resize', parallaxBg);
  parallaxBg();
});