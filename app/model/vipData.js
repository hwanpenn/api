module.exports = app => {
  const mongoose = app.mongoose
  
  const VipDataSchema = new mongoose.Schema({
    name: { type: String, unique: false, required: false },
    access: { type: String, required: false, default: 'user' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
    mark: { type: String, default: '' },

    bust: { type: String, default: '' },
    waist: { type: String, default: '' },
    hip: { type: String, default: '' },
    thigh: { type: String, default: '' },
    upperHip: { type: String, default: '' },

    strength: { type: String, default: '' },
    sitUp: { type: String, default: '' },
    flatSupport: { type: String, default: '' },
    pushUp: { type: String, default: '' },
    squat: { type: String, default: '' },
    bobbyJump: { type: String, default: '' },

    bodyFatRate: { type: String, default: '' },
    bodyMoistureRate: { type: String, default: '' },
    muscleMass: { type: String, default: '' },
    basalMetabolicRate: { type: String, default: '' },
    boneWeight: { type: String, default: '' },
    visceralFatGrade: { type: String, default: '' }
  })

  return mongoose.model('VipData', VipDataSchema)
}