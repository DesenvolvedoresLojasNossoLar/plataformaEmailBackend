const moongose = require('mongoose');
const checklist = require('./checklist');

const taskSchema = mongoose.Schema({
    name:{type: String, require:true},
    done:{type: Boolean, require:false},
    checklist:{
        type:mongoose.Schema.types.ObjectId
    }
})

module.exports = moongose.model('task', taskSchema);