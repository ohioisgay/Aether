document.getElementById('proxy-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('url-input').value.trim();
    if (!input) return;

    // Filter
    const badWords = ['porn', 'sex', 'xvideos'];
    if (badWords.some(w => input.toLowerCase().includes(w))) {
        alert("Protect the poor soul."); return;
    }

    let url = input;
    if (!url.includes('.') || url.includes(' ')) {
        url = 'https://duckduckgo.com/?q=' + encodeURIComponent(url);
    } else {
        if (!url.startsWith('http')) url = 'https://' + url;
    }
    window.location.href = window.location.origin + '/proxy/' + url;
});

document.getElementById('settings-toggle').onclick = () => {
    const m = document.getElementById('settings-menu');
    m.style.display = m.style.display === 'none' ? 'block' : 'none';
};

function cloakTab(type) {
    const p = {
        'drive': { t: 'My Drive - Google Drive', i: 'https://ssl.gstatic.com/docs/doclist/images/infinite_arrow_favicon_5.ico' },
        'classroom': { t: 'Classes', i: 'https://www.gstatic.com/classroom/favicon.png' }
    };
    if (p[type]) {
        document.title = p[type].t;
        let l = document.querySelector("link[rel*='icon']") || document.createElement('link');
        l.rel = 'shortcut icon'; l.href = p[type].i;
        document.head.appendChild(l);
    }
}

document.onkeydown = (e) => {
    if (e.key === 'Escape') window.location.replace('https://classroom.google.com');
};

document.getElementById('ab-btn').onclick = () => {
    const win = window.open('about:blank', '_blank');
    const iframe = win.document.createElement('iframe');
    iframe.style = "position:fixed;top:0;left:0;width:100vw;height:100vh;border:none;";
    iframe.src = window.location.href;
    win.document.body.appendChild(iframe);
    window.location.replace('https://google.com');
};
