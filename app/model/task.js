module.exports = app => {
  const mongoose = app.mongoose
  
  const TaskSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    day: { type: String, unique: true, required: true },
    access: { type: String, required: false, default: 'user' },
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
    heat: { type: String, default: '' },
    weight: { type: String, default: '' },
    url: { type: String, default: ''},
    task01: { type: String, default: ''},
    task02: { type: String, default: ''},
    task03: { type: String, default: ''},
    content: { type: String, default: ''}

  })

  return mongoose.model('Task', TaskSchema)
}