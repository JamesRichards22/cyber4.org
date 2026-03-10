;(function () {
  var storageKey = 'theme';
  var root = document.documentElement;
  var toggle = document.querySelector('.theme-toggle');

  if (!toggle || !root) return;

  function prefersDark() {
    return window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  var saved = null;
  try {
    saved = localStorage.getItem(storageKey);
  } catch (e) {
    saved = null;
  }

  var initialTheme;
  if (saved === 'light' || saved === 'dark') {
    root.dataset.theme = saved;
    initialTheme = saved;
  } else {
    initialTheme = prefersDark() ? 'dark' : 'light';
  }

  toggle.setAttribute('aria-checked', initialTheme === 'dark' ? 'true' : 'false');

  function currentTheme() {
    if (root.dataset.theme === 'light' || root.dataset.theme === 'dark') {
      return root.dataset.theme;
    }
    return prefersDark() ? 'dark' : 'light';
  }

  toggle.addEventListener('click', function () {
    var current = currentTheme();
    var next = current === 'dark' ? 'light' : 'dark';

    root.dataset.theme = next;
    toggle.setAttribute('aria-checked', next === 'dark' ? 'true' : 'false');

    try {
      localStorage.setItem(storageKey, next);
    } catch (e) {}
  });
})();

