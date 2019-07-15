const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {
    useNewUrlParser: true
})
    .then(() => {
        console.log('MongoDB connected....');
    })
    .catch(err => {
        console.log(err);
    });

// Load Idea Model
require('./models/Idea');
const Idea = mongoose.model('ideas');

// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Index Route
app.get('/', (req, res) => {
    const title = 'welcome';
    res.render(`index`, { title: title });
});

// About Route 
app.get('/about', (req, res) => {
    res.render('ABOUT');
});

// Process Form
app.post('/ideas', (req, res) => {
    let errors = [];
    if (!req.body.title) {
        errors.push({ text: 'Please add a title' });
    }
    if (req.body.details == ' ') {
        errors.push({ text: 'Please add a details' });
    } else if (!req.body.details) {
        errors.push({ text: 'Please add a details' });
    }
    
    if (errors.length > 0) {
        res.render('ideas/add', {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        });
    } else {
        const newUser = {
            title: req.body.title,
            details: req.body.details
        }
       new Idea(newUser).save()
       .then(idea => {
            res.redirect('/ideas');
       })
    }
});

// Add Idea form
app.get('/ideas/add', (req, res) => {
    res.render('ideas/add');
});
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

