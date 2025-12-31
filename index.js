const express = require('express');
const Unblocker = require('unblocker');
const path = require('path');
const app = express();

const port = process.env.PORT || 8080;

// Content Filter: Protecting the poor soul
const blacklist = ['porn', 'sex', 'xvideos', 'pornhub', 'rule34', 'hentai', 'redtube'];

const unblocker = new Unblocker({
    prefix: '/proxy/',
    requestMiddleware: [
        (data) => {
            const url = data.url.toLowerCase();
            const isBlocked = blacklist.some(word => url.includes(word));

            if (isBlocked) {
                return {
                    redirect: '/safe.html'
                };
            }
        }
    ]
});

app.use(unblocker);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/safe.html', (req, res) => {
    res.send(`
        <body style="background:#050505; color:white; font-family:sans-serif; display:flex; justify-content:center; align-items:center; height:100vh; text-align:center;">
            <div>
                <h1 style="font-size:3rem;">🚫 Restricted</h1>
                <p style="opacity:0.6; font-size:1.2rem;">Protect the poor soul. Content blocked by Aether.</p>
                <a href="/" style="color:#00d2ff; text-decoration:none; border:1px solid #00d2ff; padding:10px 20px; border-radius:8px;">Return to Safety</a>
            </div>
        </body>
    `);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Aether is live on port ${port}`);
});
