(function () {
  var root = document.documentElement;
  var toggles = document.querySelectorAll('[data-theme-toggle]');

  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function updateControls(theme) {
    toggles.forEach(function (toggle) {
      toggle.setAttribute('data-theme', theme);
      toggle.setAttribute('aria-pressed', String(theme === 'dark'));
      toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  function applyTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    updateControls(theme);
    if (persist) {
      try {
        localStorage.setItem('g3d-theme', theme);
      } catch (error) {}
    }
  }

  applyTheme(currentTheme(), false);

  toggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark', true);
    });
  });
})();
