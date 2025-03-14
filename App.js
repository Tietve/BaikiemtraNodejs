const express = require('express');
const mongoose = require('mongoose');
const Tree = require('./models/Tree');

const app = express();

mongoose.connect('mongodb://localhost:27017/TreeShop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));
app.get('/treeshop', async (req, res) => {
    try {
        const trees = await Tree.find();
        res.render('treeshop', { trees: trees });
    } catch(err) {
        res.send('Error fetching treeshop');
    }
});
app.get('/aboutme', (req, res) => {
    res.render('aboutme');
});
app.post('/add-tree', (req, res) => {
    const { treename, description, image } = req.body;
    if (!treename || !description) {
        return res.send('Both tree name and description are required');
    }
    const tree = new Tree({ treename, description, image });
    tree.save()
        .then(() => res.send('Tree added successfully'))
        .catch(error => res.send(`Error adding tree: ${error}`));
});
app.post('/reset', async (req, res) => {
    try {
        await Tree.deleteMany({});
        res.send('All trees have been deleted');
    } catch (error) {
        res.send(`Error resetting database: ${error}`);
    }
});
app.get('/', (req, res) => {
    res.redirect('/treeshop');
});
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
