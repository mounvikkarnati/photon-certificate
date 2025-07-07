require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});
app.set('view engine', 'ejs');


// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission
app.post('/verify', (req, res) => {
    const verificationId = req.body.verificationId;

    const query = 'SELECT * FROM certificates WHERE verification_id = ?';
    db.query(query, [verificationId], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.send('Internal server error');
        }

        if (results.length === 0) {
            return res.send('Certificate not found');
        }

        res.render('result', { data: results[0] });
    });
});
// GET route for direct URL access: /verify?id=IEI2025001
app.get('/verify', (req, res) => {
    const certId = req.query.id;

    if (!certId) {
        return res.send("No certificate ID provided.");
    }

    const query = 'SELECT * FROM certificates WHERE verification_id = ?';
    db.query(query, [certId], (err, results) => {
        if (err) {
            console.error("Error fetching certificate:", err);
            return res.status(500).send("Database error");
        }

        if (results.length === 0) {
            return res.render('result', { notFound: true });
        }

        const cert = results[0];
        res.render('result', {
            notFound: false,
            name: cert.name,
            roll_number: cert.roll_number,
            college: cert.college,
            certificate_type: cert.certificate_type,
            issue_date: cert.issue_date.toISOString().split('T')[0],
            event_name: cert.event_name
        });
    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

