module.exports = app => {
  const mongoose = app.mongoose
  
  const VideoSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    access: { type: String, required: false, default: 'user' },
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
    discription: { type: String, default: '' },
    duration: { type: String, default: '' },
    url: { type: String, default: '' }
  })

  return mongoose.model('Video', VideoSchema)
}