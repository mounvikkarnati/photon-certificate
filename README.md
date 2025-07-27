# 🎓 IEI Certificate Verification System

A full-stack web application for verifying certificates issued by the IEI Club. Users can enter a `verification_id` to validate the certificate details from a MySQL database.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MySQL  
- **Templating Engine:** EJS  
- **Frontend:** HTML, CSS  
- **Version Control:** Git + GitHub  
- **Environment Variables:** `dotenv`

---

## 📂 Project Structure

```
IEI-Certificate-Verification/
├── views/                  # EJS templates
│   ├── home.ejs
│   └── result.ejs
├── public/                 # Static assets like CSS, JS
│   └── style.css
├── server.js               # Express server
├── .env                    # Database credentials
├── package.json            # Node dependencies
└── README.md               # Project documentation
```

---

## ⚙️ How to Run Locally

### 1️⃣ Clone and Install

```bash
git clone https://github.com/mounvikkarnati/Certificate-Verification.git
cd Certificate-Verification
npm install
```

### 2️⃣ Set Up Your MySQL Database

Use any local MySQL setup (like XAMPP, MAMP, or MySQL Workbench) and create a database.

Run this SQL to create the required table:

```sql
CREATE TABLE certificates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    verification_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    roll_number VARCHAR(50) NOT NULL,
    college VARCHAR(255) NOT NULL,
    certificate_type VARCHAR(255) NOT NULL,
    issue_date DATE NOT NULL,
    event_name VARCHAR(255) NOT NULL
);
```

### 3️⃣ Add Sample Data (Optional)

```sql
INSERT INTO certificates (
    verification_id, name, roll_number, college,
    certificate_type, issue_date, event_name
) VALUES (
    'CERTIFICATE_ID', 'NAME', 'ROLL_NO',
    'UNIVERSIY_NAME', 'TYPE', 'DATE', 'EVENT_NAME'
);
```

---

### 4️⃣ Configure Environment Variables

Create a file named `.env` in the root folder:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=iei_certificates
PORT=3000
```

---

### 5️⃣ Start the Server

```bash
node server.js
```

Visit 👉 `http://localhost:3000` to access the application.

---

## 💻 Key Files Explained

### 🔹 `server.js`

Main Express server file that handles:
- Routes: `/` and `/verify`
- DB connection
- EJS rendering

### 🔹 `views/result.ejs`

Displays the certificate details:

```html
<p><strong>Name:</strong> <%= name %></p>
<p><strong>Roll Number:</strong> <%= roll_number %></p>
<p><strong>College:</strong> <%= college %></p>
<p><strong>Certificate Type:</strong> <%= certificate_type %></p>
<p><strong>Issue Date:</strong> <%= issue_date %></p>
<p><strong>Event Name:</strong> <%= event_name %></p>
```

---


## 📃 License

This project is built for academic, demonstration, and internal club purposes.

---

## 👨‍💻 Developer

Mounvik Karnati  
[Portfolio](https://mounvikkarnati.github.io/My-Portfolio/) • [GitHub](https://github.com/mounvikkarnati)