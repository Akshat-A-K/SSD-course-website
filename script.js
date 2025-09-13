document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const useDark = saved ? saved === 'dark' : prefersDark;
    if (useDark) document.body.classList.add('dark-mode');

    const btn = document.createElement('button');
    btn.id = 'darkModeToggle';
    const label = () => btn.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
    label();
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        label();
    });

    if (!saved && window.matchMedia) {
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        const onChange = (e) => { 
            document.body.classList.toggle('dark-mode', e.matches); label(); 
        };
        try { 
            media.addEventListener('change', onChange); 
        } 
        catch (_) { 
            media.addListener(onChange); 
        }
    }
});

function trackUserEvents() {
  console.log({
    type: "view",
    url: window.location.href,
    timestamp: new Date().toISOString()
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    const details = {
      type: "click",
      tag: target.tagName,
      id: target.id || null,
      class: target.className || null,
      text: target.innerText ? target.innerText.slice(0, 50) : null,
      timestamp: new Date().toISOString()
    };
    console.log(details);
  });

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (target.tagName === "INPUT" && target.type === "file" && target.files.length > 0) {
      console.log({
        type: "file_upload",
        fileName: target.files[0].name,
        timestamp: new Date().toISOString()
      });
    }
  });
}
trackUserEvents();
