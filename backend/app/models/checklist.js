const moongose = require('mongoose');

const checklistSchema = mongoose.Schema({
    name:{type: String, require:true},
    email:{type: String, require:true},
    permisao:{
        type: mongoose.Schema.types.ObjectId,
        ref: 'task',
        required:true

    }
})

module.exports = moongose.model('checklist', checklistSchema)