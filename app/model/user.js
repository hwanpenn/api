// 姓名
// 出生年月
// e-mail
// 收入范围
// 住址
// 性别
// 城市
// 身高
// 体重
// 运动量(轻度，中度，重度)
// 头像
// 昵称
module.exports = app => {
  const mongoose = app.mongoose
  const UserSchema = new mongoose.Schema({
    mobile: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    realName: { type: String, required: true },
    city: { type: String },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    club: { type: mongoose.Schema.Types.ObjectId,required: false, ref: 'Club' },
    userCoach: { type: String,required: false, ref: 'User' },
    clubAdmin: { type: String,required: false, ref: 'User' },
    avatar: { type: String, default: 'https://1.gravatar.com/avatar/a3e54af3cb6e157e496ae430aed4f4a3?s=96&d=mm'},
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },

    birth: { type: Date, default: ''},
    email: { type: String, default: ''},
    income: { type: String, default: ''},
    address: { type: String, default: ''},
    gender: { type: String, default: ''},
    height: { type: String, default: ''},
    weight: { type: String, default: ''},
    exerciseVolume: { type: String, default: ''},
    nickname: { type: String, default: ''}
  })
  return mongoose.model('User', UserSchema)
}
