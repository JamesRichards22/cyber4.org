;(function () {
  var storageKey = 'theme';
  var root = document.documentElement;
  var toggle = document.querySelector('.theme-toggle');

  if (!toggle) return;

  // The initial data-theme (if any saved preference exists) is applied by an
  // inline script in <head> before first paint, to avoid a theme flash.

  var darkQuery = window.matchMedia
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;

  function currentTheme() {
    if (root.dataset.theme === 'light' || root.dataset.theme === 'dark') {
      return root.dataset.theme;
    }
    return darkQuery && darkQuery.matches ? 'dark' : 'light';
  }

  function syncToggle() {
    toggle.setAttribute('aria-checked', currentTheme() === 'dark' ? 'true' : 'false');
  }

  syncToggle();

  toggle.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    syncToggle();
    try {
      localStorage.setItem(storageKey, next);
    } catch (e) {}
  });

  // If no explicit preference is saved, follow live system theme changes.
  if (darkQuery && darkQuery.addEventListener) {
    darkQuery.addEventListener('change', syncToggle);
  }
})();
