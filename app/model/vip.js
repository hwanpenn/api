module.exports = app => {
  const mongoose = app.mongoose
  
  const VipSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    access: { type: String, required: false, default: 'user' },
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, default: '' },
    price: { type: String, default: '' },
    startAt: { type: Date, default: '' },
    endAt: { type: Date, default: '' },
    vipGrade: { type: String, default: '' },
  })

  return mongoose.model('Vip', VipSchema)
}