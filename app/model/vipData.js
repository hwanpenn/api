// 胸围
// 腰围
// 臀围
// 大腿围
// 上臀围

// 力量测试   
// 仰卧起坐 
// 平板支撑   
// 俯卧撑  
// 深蹲   
// 波比跳

// 体脂率
// 身体水分率
// 肌肉量
// 基础代谢率
// 骨重量
// 内脏脂肪等级
module.exports = app => {
  const mongoose = app.mongoose
  
  const VipDataSchema = new mongoose.Schema({
    name: { type: String, unique: false, required: false },
    access: { type: String, required: false, default: 'user' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
    mark: { type: String, default: '' },
    markTime: { type: String, default: '' },

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
    visceralFatGrade: { type: String, default: '' },


    rate: { type: String, default: '' },
    weight: { type: Number, default: '' },
    picture: { type: String, default: '' },
    vipDay: { type: String, default: '' }

    
  })

  return mongoose.model('VipData', VipDataSchema)
}