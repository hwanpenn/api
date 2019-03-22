module.exports = app => {
  const mongoose = app.mongoose
  
  const ClubSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    access: { type: String, required: false, default: 'user' },
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
    endAt: { type: Date, default: '' },
    status: { type: String, default: '' },
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' }
  })

  return mongoose.model('Club', ClubSchema)
}