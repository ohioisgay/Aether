const express = require('express');
const Unblocker = require('unblocker');
const path = require('path');
const { bin, install } = require('cloudflared');
const { spawn } = require('child_process');

const app = express();
const port = process.env.PORT || 8080;

// 1. Content Filter: Protect the poor soul
const blacklist = ['porn', 'sex', 'xvideos', 'pornhub', 'rule34', 'hentai', 'redtube'];

const unblocker = new Unblocker({
    prefix: '/proxy/',
    requestMiddleware: [
        (data) => {
            const url = data.url.toLowerCase();
            if (blacklist.some(word => url.includes(word))) {
                return { redirect: '/safe.html' };
            }
        }
    ]
});

app.use(unblocker);
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/safe.html', (req, res) => {
    res.send(`
        <body style="background:#050505;color:white;font-family:sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;text-align:center;">
            <div><h1>🚫 Restricted</h1><p>Protect the poor soul. Content blocked by Aether.</p><a href="/" style="color:#00d2ff;">Return Home</a></div>
        </body>
    `);
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

// Cloudflare Tunnel Logic
async function startTunnel() {
    try {
        await install(bin);
        const tunnel = spawn(bin, ['tunnel', '--url', `http://localhost:${port}`]);
        tunnel.stdout.on('data', (data) => {
            const msg = data.toString();
            if (msg.includes('.trycloudflare.com')) {
                const url = msg.match(/https:\/\/[^\s]+\.trycloudflare.com/);
                if (url) console.log(`\n\x1b[32m[CLOUDFLARE] Live at: ${url[0]}\x1b[0m\n`);
            }
        });
    } catch (e) { console.error("Tunnel failed to start", e); }
}

app.listen(port, () => {
    console.log(`Aether Server running on ${port}`);
    startTunnel();
});
