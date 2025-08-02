
require('dotenv').config(); // Load .env variables
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Form POST handler
app.post('/verify', (req, res) => {
  const verificationId = req.body.verificationId;

  // Read local data file
  const rawData = fs.readFileSync('data.json');
  const certificates = JSON.parse(rawData);

  const result = certificates.find(cert => cert.verification_id === verificationId);

  if (!result) {
    return res.send('Certificate not found');
  }

  res.render('result', {
    notFound: false,
    name: result.name,
    roll_number: result.roll_number,
    college: result.college,
    certificate_type: result.certificate_type,
    issue_date: result.issue_date,
    event_name: result.event_name
  });
});

// Optional: Handle GET request with URL param (e.g., /verify?id=IEI2025001)
app.get('/verify', (req, res) => {
  const certId = req.query.id;
  if (!certId) return res.send("No certificate ID provided.");

  const rawData = fs.readFileSync('data.json');
  const certificates = JSON.parse(rawData);

  const cert = certificates.find(c => c.verification_id === certId);
  if (!cert) {
    return res.render('result', { notFound: true });
  }

  res.render('result', {
    notFound: false,
    name: cert.name,
    roll_number: cert.roll_number,
    college: cert.college,
    certificate_type: cert.certificate_type,
    issue_date: cert.issue_date,
    event_name: cert.event_name
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
