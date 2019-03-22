module.exports = app => {
  const mongoose = app.mongoose
  
  const PushMsgSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    access: { type: String, required: true, default: 'user' },
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
    pushTime: { type: Date, default: '' },
    status: { type: String, default: '' },
    pushMsg: { type: String, default: '' },
    pushUrl: { type: String, default: '' }
  })

  return mongoose.model('PushMsg', PushMsgSchema)
}