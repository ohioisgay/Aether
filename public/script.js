// Handle the Proxy Form
document.getElementById('proxy-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('url-input').value.trim();
    if (!input) return;

    let url = input;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        if (url.includes('.') && !url.includes(' ')) {
            url = 'https://' + url;
        } else {
            url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
        }
    }

    window.location.href = window.location.origin + '/proxy/' + url;
});

// Toggle Settings Menu
document.getElementById('settings-toggle').addEventListener('click', () => {
    const menu = document.getElementById('settings-menu');
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
});

// About:Blank Stealth Logic
document.getElementById('ab-btn').addEventListener('click', () => {
    const url = window.location.href;
    const win = window.open();
    if (!win || win.closed) {
        alert('Please allow pop-ups for stealth mode to work!');
        return;
    }
    
    const iframe = win.document.createElement('iframe');
    iframe.style.width = '100vw';
    iframe.style.height = '100vh';
    iframe.style.border = 'none';
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.src = url;
    
    win.document.body.style.margin = '0';
    win.document.body.style.padding = '0';
    win.document.body.appendChild(iframe);
    
    // Redirect this current tab to look like you're working
    window.location.replace('https://classroom.google.com');
});
