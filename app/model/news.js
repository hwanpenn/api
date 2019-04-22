module.exports = app => {
  const mongoose = app.mongoose
  
  const NewsSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    access: { type: String, required: false, default: 'user' },
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
    author: { type: String, default: '' },
    url: { type: String, default: '' },
    content: { type: String, default: '' }
  })

  return mongoose.model('News', NewsSchema)
}