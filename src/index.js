const express = require("express");
const path = require("path");
const app = express();
const User = require("./mongo"); 
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const tempelatePath = path.join(__dirname, '../tempelates');
const publicPath = path.join(__dirname, '../public');
console.log(publicPath);

app.set('view engine', 'hbs');
app.set('views', tempelatePath);
app.use(express.static(publicPath));

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/', (req, res) => {
    res.render('login');
});

app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    };

    const checking = await User.findOne({ name: req.body.name });

    try {
        if (checking) {
            res.send("User details already exist.");
        } else {
            await User.create(data); 
        }
    } catch (error) {
        res.send("Wrong inputs.");
    }

    res.status(201).render("home", {
        naming: req.body.name
    });
});

app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ name: req.body.name });

        if (user && user.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` });
        } else {
            res.send("Incorrect password or user does not exist.");
        }
    } catch (error) {
        res.send("Wrong details.");
    }
});

app.listen(port, () => {
    console.log('Port connected');
});
