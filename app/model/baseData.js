// 体重
// 身高
// 年龄
// 性别
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

  const BaseDataSchema = new mongoose.Schema({
    name: { type: String, unique: false, required: false },
    access: { type: String, required: false, default: 'user' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
    mark: { type: String, default: '' },
    mark: { type: String, default: '' },
    mark: { type: String, default: '' },
    mark: { type: String, default: '' },
    mark: { type: String, default: '' },
    mark: { type: String, default: '' },
    mark: { type: String, default: '' }

  })

  return mongoose.model('BaseData', BaseDataSchema)
}