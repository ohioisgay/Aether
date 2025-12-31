const express = require('express');
const Unblocker = require('unblocker');
const path = require('path');
const app = express();

const port = process.env.PORT || 8080;

// Initialize Unblocker with the correct prefix
const unblocker = new Unblocker({
    prefix: '/proxy/'
});

// IMPORTANT: The unblocker middleware must come before express.static
app.use(unblocker);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Aether is live on port ${port}`);
});
