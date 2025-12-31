const express = require('express');
const Unblocker = require('unblocker');
const path = require('path');
const { bin, install } = require('cloudflared');
const { spawn } = require('child_process');

const app = express();
const port = process.env.PORT || 10000; // Render usually uses 10000

const blacklist = ['porn', 'sex', 'xvideos', 'pornhub', 'rule34', 'hentai', 'redtube'];

const unblocker = new Unblocker({
    prefix: '/proxy/',
    requestMiddleware: [(data) => {
        const url = data.url.toLowerCase();
        if (blacklist.some(word => url.includes(word))) return { redirect: '/safe.html' };
    }]
});

app.use(unblocker);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/safe.html', (req, res) => {
    res.send(`<body style="background:#050505;color:white;font-family:sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;text-align:center;"><div><h1>🚫 Restricted</h1><p>Protect the poor soul.</p><a href="/" style="color:#00d2ff;">Return Home</a></div></body>`);
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

async function startTunnel() {
    try {
        console.log("Installing Cloudflared...");
        await install(bin);
        console.log("Starting Tunnel...");

        // TryCloudflare generates a random URL
        const tunnel = spawn(bin, ['tunnel', '--url', `http://localhost:${port}`]);

        // Cloudflare often outputs the URL to STDERR
        const handleData = (data) => {
            const msg = data.toString();
            console.log("[Cloudflare Log]:", msg); // This forces all tunnel output into your Render logs

            if (msg.includes('.trycloudflare.com')) {
                const url = msg.match(/https:\/\/[^\s]+\.trycloudflare.com/);
                if (url) {
                    console.log("\n\x1b[42m\x1b[30m %s \x1b[0m", " SUCCESS! AETHER TUNNEL LIVE ");
                    console.log("\x1b[32m%s\x1b[0m\n", url[0]);
                }
            }
        };

        tunnel.stdout.on('data', handleData);
        tunnel.stderr.on('data', handleData);

    } catch (e) {
        console.error("Tunnel failed:", e);
    }
}

app.listen(port, () => {
    console.log(`Aether Server running on ${port}`);
    startTunnel();
});
