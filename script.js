// Dark mode toggle
(function(){
  function updateIcon(isDark) {
    const icon = document.querySelector('#button i');
    if (!icon) return;
    // Ensure the solid style class exists (FontAwesome v6)
    if (!icon.classList.contains('fa-solid')) icon.classList.add('fa-solid');

    // Remove both possible icon classes then add the one we want
    icon.classList.remove('fa-lightbulb', 'fa-moon');
    if (isDark) icon.classList.add('fa-moon');
    else icon.classList.add('fa-lightbulb');
  }

  function setDarkMode(enabled, persist = true) {
    if (enabled) document.body.classList.add('dark-mode');
    else document.body.classList.remove('dark-mode');
    updateIcon(enabled);
    if (persist) localStorage.setItem('darkMode', enabled ? 'on' : 'off');
  }

  window.changeMode = function () {
    const isDark = document.body.classList.toggle('dark-mode');
    updateIcon(isDark);
    localStorage.setItem('darkMode', isDark ? 'on' : 'off');
  };

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    try {
      const stored = localStorage.getItem('darkMode');
      if (stored === 'on') setDarkMode(true, false);
      else if (stored === 'off') setDarkMode(false, false);
      else {
        // If no preference stored, respect prefers-color-scheme
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDark, false);
      }
    } catch (e) {
      // localStorage may be unavailable - fall back to system preference
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark, false);
    }
  });
})();
