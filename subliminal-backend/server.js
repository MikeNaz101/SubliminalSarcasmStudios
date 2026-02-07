const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// --- CONNECT TO DATABASE ---
// PASTE YOUR MONGODB STRING HERE inside the quotes
const mongoURI = "YOUR_MONGO_CONNECTION_STRING";

mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// --- SCHEMAS ---
const StatSchema = new mongoose.Schema({
    gameName: String,
    views: { type: Number, default: 0 },
    plays: { type: Number, default: 0 }
});
const Stat = mongoose.model('Stat', StatSchema);

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String, 
    isAdmin: { type: Boolean, default: false } 
});
const User = mongoose.model('User', UserSchema);

// --- ROUTES ---

// 1. TRACKING (Used by your games)
app.post('/track', async (req, res) => {
    const { gameName, type } = req.body; 
    let stat = await Stat.findOne({ gameName });
    if (!stat) stat = new Stat({ gameName });

    if (type === 'view') stat.views++;
    if (type === 'play') stat.plays++;
    
    await stat.save();
    res.json({ success: true });
});

// 2. REGISTER (Used by login page)
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // AUTO-ADMIN: If the email matches YOURS, make them an admin
        const isAdmin = email.toLowerCase() === "YOUR_EMAIL@HERE.COM"; 
        
        const newUser = new User({ name, email, password, isAdmin });
        await newUser.save();
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false, message: "Email already exists" });
    }
});

// 3. LOGIN (Used by login page)
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
        res.json({ success: true, name: user.name, isAdmin: user.isAdmin });
    } else {
        res.json({ success: false, message: "Invalid credentials" });
    }
});

// 4. STATS (Used by Admin Page)
app.get('/stats', async (req, res) => {
    const stats = await Stat.find();
    res.json(stats);
});

// Listen on the port Render assigns, or 5000 locally
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));