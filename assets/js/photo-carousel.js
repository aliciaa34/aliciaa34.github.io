/* Photograph carousel.
 *
 * Progressive enhancement over a CSS scroll-snap track: the track already scrolls and
 * snaps on its own, so this only adds the previous/next buttons, arrow-key support and
 * the "n / total" counter.
 *
 * Kept in its own file rather than inline because the site's `compress` layout strips
 * newlines, which would swallow everything after a `//` comment on the same line.
 */
(function () {
  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initCarousel(root) {
    var track = root.querySelector('[data-pcar-track]');
    var slides = root.querySelectorAll('[data-pcar-slide]');
    var counter = root.querySelector('[data-pcar-counter]');
    var prev = root.querySelector('[data-pcar-prev]');
    var next = root.querySelector('[data-pcar-next]');
    if (!track || !slides.length || !prev || !next) {
      return;
    }

    var index = 0;

    function paint() {
      if (counter) {
        counter.textContent = (index + 1) + ' / ' + slides.length;
      }
      prev.disabled = index === 0;
      next.disabled = index === slides.length - 1;
    }

    function go(to) {
      index = Math.max(0, Math.min(slides.length - 1, to));
      var left = slides[index].offsetLeft - track.offsetLeft;
      var from = track.scrollLeft;

      if (track.scrollTo) {
        track.scrollTo({ left: left, behavior: reduceMotion ? 'auto' : 'smooth' });
      } else {
        track.scrollLeft = left;
      }

      /* Some environments never run the smooth-scroll animation, which would leave the
         button doing nothing at all. If nothing has moved shortly after, jump instead.
         Mid-animation the position differs from `from`, so this only fires when the
         scroll genuinely did not start. */
      window.setTimeout(function () {
        if (track.scrollLeft === from && from !== left) {
          track.scrollLeft = left;
        }
      }, 250);

      /* Paint straight away rather than waiting for the scroll event, so the counter and
         the buttons respond to the click even if the smooth scroll is slow. */
      paint();
    }

    /* Derive the current slide from the scroll position, so that a trackpad scroll or a
       touch swipe keeps the counter and the buttons in step with what is on screen. */
    function sync() {
      var mid = track.scrollLeft + track.clientWidth / 2;
      var best = 0;
      var bestDist = Infinity;
      for (var i = 0; i < slides.length; i++) {
        var centre = slides[i].offsetLeft - track.offsetLeft + slides[i].clientWidth / 2;
        var dist = Math.abs(centre - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      }
      index = best;
      paint();
    }

    var timer = null;
    track.addEventListener('scroll', function () {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(sync, 80);
    });

    prev.addEventListener('click', function () {
      go(index - 1);
    });

    next.addEventListener('click', function () {
      go(index + 1);
    });

    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(index - 1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(index + 1);
      }
    });

    sync();
  }

  function init() {
    var roots = document.querySelectorAll('[data-pcar]');
    for (var i = 0; i < roots.length; i++) {
      initCarousel(roots[i]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
