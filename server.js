require('dotenv').config(); // Load environment variables
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000; // ✅ Only once

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Home route -> serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// POST /verify (form submission)
app.post('/verify', (req, res) => {
  const verificationId = req.body.verificationId?.trim();

  try {
    const rawData = fs.readFileSync(path.join(__dirname, 'data.json'));
    const certificates = JSON.parse(rawData);

    const cert = certificates.find(c => c.verification_id === verificationId);

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
  } catch (err) {
    console.error("❌ Error reading data.json:", err);
    res.status(500).send("Internal Server Error");
  }
});

// GET /verify?id=xxxx (direct link)
app.get('/verify', (req, res) => {
  const certId = req.query.id?.trim();
  if (!certId) return res.send("No certificate ID provided.");

  try {
    const rawData = fs.readFileSync(path.join(__dirname, 'data.json'));
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
  } catch (err) {
    console.error("❌ Error reading data.json:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
