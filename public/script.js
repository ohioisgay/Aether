// 1. Handle Proxy Form & Integrated Search
document.getElementById('proxy-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('url-input').value.trim();
    if (!input) return;

    let url = input;
    
    // Search logic: if no dot or has spaces, use DuckDuckGo
    if (!url.includes('.') || url.includes(' ')) {
        url = 'https://duckduckgo.com/?q=' + encodeURIComponent(url);
    } else {
        if (!url.startsWith('http')) url = 'https://' + url;
    }

    // Use encodeURIComponent instead of btoa to avoid Server Errors
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
        icon.type = 'image/x-icon';
        icon.rel = 'shortcut icon';
        icon.href = presets[type].i;
        document.head.appendChild(icon);
    }
}

// 4. Panic Key (ESC)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.location.replace('https://classroom.google.com');
    }
});

// 5. YouTube Ad-Skipper (Conceptual Loop)
setInterval(() => {
    const isAdblockOn = document.getElementById('adblock-toggle')?.checked;
    if (!isAdblockOn) return;

    const frame = document.querySelector('iframe'); 
    if (frame) {
        try {
            const innerDoc = frame.contentDocument || frame.contentWindow.document;
            const video = innerDoc.querySelector('video');
            const ad = innerDoc.querySelector('.ad-showing, .ad-interrupting');
            
            if (ad && video) {
                video.playbackRate = 16;
                video.muted = true;
                const skipBtn = innerDoc.querySelector('.ytp-ad-skip-button');
                if (skipBtn) skipBtn.click();
            }
        } catch (e) { /* Cross-origin security might block this on some sites */ }
    }
}, 1000);

// 6. Emergency Wipe
function selfDestruct() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace('https://google.com');
}

// 7. About:Blank Logic
document.getElementById('ab-btn').addEventListener('click', () => {
    const win = window.open('about:blank', '_blank');
    if (!win) return alert('Enable Pop-ups!');
    
    const iframe = win.document.createElement('iframe');
    iframe.style = "position:fixed;top:0;left:0;width:100vw;height:100vh;border:none;";
    iframe.src = window.location.href;
    
    win.document.body.style.margin = '0';
    win.document.body.appendChild(iframe);
    window.location.replace('https://classroom.google.com');
});
