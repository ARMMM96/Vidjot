const mogooes = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const IdeaSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    details:{
        type:String,
        require: true
    },
    date:{
        type: Date, 
        default: Date.now
    }
});

mongoose.modle('ideas', IdeaSchema);