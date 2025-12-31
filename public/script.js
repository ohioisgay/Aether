// 1. Handle Proxy Form & Integrated Search
document.getElementById('proxy-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('url-input').value.trim();
    if (!input) return;

    let url = input;
    // If it doesn't look like a URL, treat it as a search query
    if (!url.includes('.') || url.includes(' ')) {
        url = 'https://duckduckgo.com/?q=' + encodeURIComponent(url);
    } else {
        if (!url.startsWith('http')) url = 'https://' + url;
    }

    // Replace this with your actual proxy prefix logic
    window.location.href = window.location.origin + '/proxy/' + btoa(url); 
});

// 2. Toggle Settings Menu
document.getElementById('settings-toggle').addEventListener('click', () => {
    const menu = document.getElementById('settings-menu');
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
});

// 3. Tab Cloaking Logic
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
        localStorage.setItem('aether-cloak', type);
    }
}

// 4. Panic Button (ESC Key)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.location.replace('https://classroom.google.com');
    }
});

// 5. Emergency Wipe (Self-Destruct)
function selfDestruct() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace('https://google.com');
}

// 6. YouTube Ad-Skipper Concept
// This runs every 500ms to check for ads in the proxy frame
setInterval(() => {
    const isAdblockOn = document.getElementById('adblock-toggle')?.checked;
    if (!isAdblockOn) return;

    // We target the iframe that holds the proxied content
    const frame = document.querySelector('iframe'); 
    if (frame) {
        try {
            const innerDoc = frame.contentDocument || frame.contentWindow.document;
            const video = innerDoc.querySelector('video');
            const ad = innerDoc.querySelector('.ad-showing, .ad-interrupting');
            
            if (ad && video) {
                video.playbackRate = 16; // Zoom through the ad
                video.muted = true;      // Silence it
                const skipBtn = innerDoc.querySelector('.ytp-ad-skip-button, .ytp-ad-skip-button-modern');
                if (skipBtn) skipBtn.click();
            }
        } catch (e) {
            // Usually happens due to Cross-Origin blocks; 
            // Most proxies bypass this by serving the site from the same origin.
        }
    }
}, 500);

// 7. About:Blank Stealth Logic
document.getElementById('ab-btn').addEventListener('click', () => {
    const win = window.open('about:blank', '_blank');
    if (!win) return alert('Pop-up blocked!');
    
    const iframe = win.document.createElement('iframe');
    iframe.style.width = '100%'; iframe.style.height = '100%';
    iframe.style.border = 'none'; iframe.style.position = 'fixed';
    iframe.style.top = '0'; iframe.style.left = '0';
    iframe.src = window.location.href;
    
    win.document.body.style.margin = '0';
    win.document.body.appendChild(iframe);
    window.location.replace('https://classroom.google.com');
});
