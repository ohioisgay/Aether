// 1. Handle Proxy Form & Filter
document.getElementById('proxy-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('url-input').value.trim();
    if (!input) return;

    // Search-level filter
    const badWords = ['porn', 'sex', 'xvideos', 'pornhub', 'hentai'];
    if (badWords.some(word => input.toLowerCase().includes(word))) {
        alert("Protect the poor soul. Content restricted.");
        return;
    }

    let url = input;
    if (!url.includes('.') || url.includes(' ')) {
        url = 'https://duckduckgo.com/?q=' + encodeURIComponent(url);
    } else {
        if (!url.startsWith('http')) url = 'https://' + url;
    }

    window.location.href = window.location.origin + '/proxy/' + url; 
});

// 2. Settings Toggle
document.getElementById('settings-toggle').addEventListener('click', () => {
    const menu = document.getElementById('settings-menu');
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
});

// 3. Tab Cloaking
function cloakTab(type) {
    const presets = {
        'drive': { t: 'My Drive - Google Drive', i: 'https://ssl.gstatic.com/docs/doclist/images/infinite_arrow_favicon_5.ico' },
        'classroom': { t: 'Classes', i: 'https://www.gstatic.com/classroom/favicon.png' },
        'canvas': { t: 'Dashboard', i: 'https://du11hjcvhe620.cloudfront.net/favicon.ico' }
    };
    if (presets[type]) {
        document.title = presets[type].t;
        let icon = document.querySelector("link[rel*='icon']") || document.createElement('link');
        icon.href = presets[type].i;
        document.head.appendChild(icon);
    }
}

// 4. Panic (ESC) and Wipe
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.location.replace('https://classroom.google.com');
});

function selfDestruct() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace('https://google.com');
}

// 5. YT Ad-Skipper
setInterval(() => {
    if (document.getElementById('adblock-toggle')?.checked) {
        const frame = document.querySelector('iframe'); 
        try {
            const innerDoc = frame.contentDocument || frame.contentWindow.document;
            const video = innerDoc.querySelector('video');
            const ad = innerDoc.querySelector('.ad-showing, .ad-interrupting');
            if (ad && video) {
                video.playbackRate = 16;
                video.muted = true;
                innerDoc.querySelector('.ytp-ad-skip-button')?.click();
            }
        } catch (e) {}
    }
}, 1000);

// 6. About:Blank
document.getElementById('ab-btn').addEventListener('click', () => {
    const win = window.open('about:blank', '_blank');
    if (!win) return alert('Pop-ups blocked!');
    const iframe = win.document.createElement('iframe');
    iframe.style = "position:fixed;top:0;left:0;width:100vw;height:100vh;border:none;";
    iframe.src = window.location.href;
    win.document.body.appendChild(iframe);
    window.location.replace('https://classroom.google.com');
});
