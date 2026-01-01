const express = require('express');
const path = require('path');
const { uvPath } = require('@titaniumnetwork-dev/ultraviolet');
const { scramjetPath } = require('@mercuryworkshop/scramjet');
const { bin, install } = require('cloudflared');
const { spawn } = require('child_process');

const app = express();
const port = process.env.PORT || 10000;

// 1. Serve Engine Brains
app.use('/uv/', express.static(uvPath));
app.use('/scram/', express.static(scramjetPath));

// 2. Serve your Website
app.use(express.static(path.join(__dirname, 'public')));

// 3. Health check for your Cron-job
app.get('/status', (req, res) => res.status(200).send('Active'));

async function startTunnel() {
    await install(bin);
    const tunnel = spawn(bin, ['tunnel', '--url', `http://localhost:${port}`]);
    tunnel.stderr.on('data', (d) => {
        const m = d.toString();
        if (m.includes('.trycloudflare.com')) {
            const url = m.match(/https:\/\/[^\s]+\.trycloudflare.com/);
            if (url) console.log(`\n\x1b[42m AETHER LIVE: ${url[0]} \x1b[0m\n`);
        }
    });
}

app.listen(port, () => {
    console.log(`Server on ${port}`);
    startTunnel();
});
