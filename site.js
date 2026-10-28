(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // entrances
  var els = document.querySelectorAll('.rise, .pop');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .12 });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('in'); }); }

  // live: choose the group by age
  var groups = [].slice.call(document.querySelectorAll('.group')), ages = [].slice.call(document.querySelectorAll('.age'));
  function pick(a) {
    ages.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.age === a ? 'true' : 'false'); });
    groups.forEach(function (g) { var on = (' ' + g.dataset['for'] + ' ').indexOf(' ' + a + ' ') > -1; g.hidden = !on; if (on) { g.classList.remove('swap'); void g.offsetWidth; g.classList.add('swap'); } });
  }
  ages.forEach(function (b) { b.addEventListener('click', function () { pick(b.dataset.age); }); });
  pick('5');

  // accordion
  var stages = [].slice.call(document.querySelectorAll('.stage'));
  stages.forEach(function (s) { s.addEventListener('click', function () { stages.forEach(function (o) { o.setAttribute('aria-expanded', o === s ? 'true' : 'false'); }); }); });

  // hero drop drifts with scroll
  var drop = document.querySelector('[data-drift]');
  if (drop && !reduce) {
    var ticking = false;
    window.addEventListener('scroll', function () { if (ticking) return; ticking = true; requestAnimationFrame(function () { var y = Math.min(window.scrollY, 900); drop.style.transform = 'translate3d(' + (y * .12) + 'px,' + (y * -.08) + 'px,0) rotate(' + (y * .012) + 'deg)'; ticking = false; }); }, { passive: true });
  }
})();
