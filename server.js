const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoints for future enhancements
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        message: 'AI Learning Hub is running!',
        timestamp: new Date().toISOString()
    });
});

// Catch all other routes and serve index.html (for client-side routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 AI Learning Hub is running!`);
    console.log(`📱 Access from any device:`);
    console.log(`   Local: http://localhost:${PORT}`);
    console.log(`   Network: http://0.0.0.0:${PORT}`);
    console.log(`📚 Your AI teacher is ready to help you master coding and AI!`);
});