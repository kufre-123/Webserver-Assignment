// server.js

const express = require("express");
const fs = require("fs"); 
const app = express();

// Use express.urlencoded for traditional form submission data
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); 

// Route to display the success message after redirection
app.get("/success", (req, res) => {
    // You can serve a simple, specific success HTML page here
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Success</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <div class="container">
                <h2>Record Saved Successfully!</h2>
                <p>Your details have been saved to the server.</p>
                <a href="/">Return to Home Page</a>
            </div>
        </body>
        </html>
    `);
});

// Handle form submission (POST)
app.post("/save", (req, res) => { // Route matches the form action in index.html
    const name = req.body.username; // Key is 'username' from index.html
    const matric = req.body.matric; // Key is 'matric' from index.html

    if (!name || !matric) {
        // You could redirect back to the home page with an error
        return res.redirect('/'); 
    }

    const data = `Name: ${name} - Matric Number: ${matric}\n`;

    fs.appendFile("records.txt", data, (err) => {
        if (err) {
            console.error(err);
            // On failure, send an internal error message
            return res.status(500).send("Error saving data. Please try again.");
        }
        
        // --- PRG Pattern: Redirect after successful POST ---
        res.redirect("/success"); // 2. Redirect to the success page (GET)
    });
});

// Start the server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});


