const mongoose = require('mongoose')

const treeSchema = new mongoose.Schema({
    treeName: String,
    description: String,
    image: String,
})

const Tree = mongoose.model('Tree', treeSchema, 'TreeCollection')
module.exports = Tree;