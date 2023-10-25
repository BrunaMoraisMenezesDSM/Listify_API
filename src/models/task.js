const mongoose = require('mongoose');
 
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  createAt: {
    type: String
  },
  dateLimit: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});
 
const Task= mongoose.model('Task', taskSchema);
module.exports = Task;