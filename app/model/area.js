module.exports = app => {
  const mongoose = app.mongoose
  
  const AreaSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    access: { type: String, default: 'user' },
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
    endAt: { type: Date  },
    status: { type: String, default: '' },
    desc: { type: String, default: '' },
    city: { type: String, default: '' }
  })

  return mongoose.model('Area', AreaSchema)
}