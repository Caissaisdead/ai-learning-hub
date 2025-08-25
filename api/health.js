export default function handler(req, res) {
  res.status(200).json({ 
    status: 'healthy', 
    message: 'AI Learning Hub is running on Vercel!',
    timestamp: new Date().toISOString(),
    domain: 'siddharthisanidiot.token'
  });
}