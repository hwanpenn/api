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
// 年龄
// 性别
module.exports = app => {
  const mongoose = app.mongoose
  const UserSchema = new mongoose.Schema({
    mobile: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    realName: { type: String, required: true },
    city: { type: String },
    role: { type: String,default: 'user' },
    vip: { type: String , default: 'false' },
    vipDay: { type: Number , default: 0 },
    markTime: { type: String , default: '2018-11-11' },
    lose: { type: Number , default: 0 },
    vipCreatedAt: { type: Date , default: '' },
    picture: { type: String , default: '' },

    userCoach: { type: String,required: false, ref: 'User' },
    coachId: { type: String,required: false, default: '' },
    coachName: { type: String,required: false, default: '' },
    clubAdmin: { type: String,required: false, ref: 'User' },
    avatar: { type: String, default: 'https://1.gravatar.com/avatar/a3e54af3cb6e157e496ae430aed4f4a3?s=96&d=mm'},
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },

    birth: { type: String, default: ''},
    email: { type: String, default: ''},
    income: { type: String, default: ''},
    address: { type: String, default: ''},
    gender: { type: String, default: ''},
    height: { type: String, default: ''},
    weight: { type: String, default: ''},
    age: { type: String, default: ''},
    sex: { type: String, default: ''},
    exerciseVolume: { type: String, default: ''},
    nickname: { type: String, default: ''}
    
  })
  return mongoose.model('User', UserSchema)
}
