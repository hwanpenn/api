'use strict'

const Service = require('egg').Service

class UserAccessService extends Service {

  async usernameLogin(payload) {
    const { ctx, service } = this
    const user = await ctx.model.User.find({username: payload.username })
    const role = await ctx.model.Role.findById(user.role)
    if(!user){
      ctx.throw(404, 'user not found')
    }
    let verifyPsw = await ctx.compare(payload.password, user.password)
    if(!verifyPsw) {
      ctx.throw(404, 'user password is error')
    }
    // 生成Token令牌
    return { token: await service.actionToken.apply(user._id), realName:user.realName, role:role }
  }

  async login(payload) {
    const { ctx, service } = this
    const user = await service.user.findByMobile(payload.mobile)
    if(!user){
      ctx.throw(404, 'user not found')
    }
    let verifyPsw = await ctx.compare(payload.password, user.password)
    if(!verifyPsw) {
      ctx.throw(404, 'user password is error')
    }
    return { token: await service.actionToken.apply(user._id),vip:user.vip,  username:user.realName, realName:user.realName, role:user.role, _id:user._id}
  }

  async logout() {
  }

  async resetPsw(values) {
    const { ctx, service  } = this
    // ctx.state.user 可以提取到JWT编码的data
    // const _id = ctx.state.user.data._id
    const _id = values.id
    const user = await service.user.find(_id)
    if (!user) {
      ctx.throw(404, 'user is not found')
    }
    let verifyPsw = await ctx.compare(values.oldPassword, user.password)
    if (!verifyPsw) {
      ctx.throw(404, 'user password error')
    } else {
      values.password = await ctx.genHash(values.password)
      return service.user.findByIdAndUpdate(_id, values)
    }
  }

  async current() {
    const { ctx, service } = this
    const _id = ctx.state.user.data._id
    const user = await service.user.find(_id)
    if (!user) {
      ctx.throw(404, 'user is not found')
    }
    user.password = 'How old are you?'
    return user
  }

  async resetSelf(values) {
    const {ctx, service} = this
    const _id = ctx.state.user.data._id
    const user = await service.user.find(_id)
    if (!user) {
      ctx.throw(404, 'user is not found')
    }
    return service.user.findByIdAndUpdate(_id, values)
  }

  // 更新头像
  async resetAvatar(values) {
    const {ctx, service} = this
    await service.upload.create(values)
    const _id = ctx.state.user.data._id
    const user = await service.user.find(_id)
    if (!user) {
      ctx.throw(404, 'user is not found')
    }
    return service.user.findByIdAndUpdate(_id, {avatar: values.url})
  }

}

module.exports = UserAccessService
