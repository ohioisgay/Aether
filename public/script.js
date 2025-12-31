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

    // This redirects through your Render-hosted unblocker
    window.location.href = window.location.origin + '/proxy/' + url;

});
