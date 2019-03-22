module.exports = app => {
  const mongoose = app.mongoose
  
  const AppDataSchema = new mongoose.Schema({
    name: { type: String, unique: false, required: true },
    access: { type: String, required: false, default: 'user' },
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
    version: { type: String, default: '' },
    updatedAt: { type: Date, default: '' }
  })

  return mongoose.model('AppData', AppDataSchema)
}