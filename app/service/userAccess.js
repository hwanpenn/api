'use strict'

const Service = require('egg').Service

class UserAccessService extends Service {

  async usernameLogin(payload) {
    const { ctx, service } = this
    // const user = await service.user.findByMobile(payload.mobile)
    const user = await ctx.model.User.find({username: payload.username })
    // const user = await ctx.model.Role.findById(user.role)
    const role = await ctx.model.Role.findById(user.role)
    // console.log(user)
    // console.log(role)
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
    const role = await ctx.model.Role.findById(user.role)
    console.log(user)
    // console.log(role)
    if(!user){
      ctx.throw(404, 'user not found')
    }
    // console.log(payload.password)
    // console.log(user.password)
    let verifyPsw = await ctx.compare(payload.password, user.password)
    if(!verifyPsw) {
      ctx.throw(404, 'user password is error')
    }
    // 生成Token令牌
    return { token: await service.actionToken.apply(user._id), realName:user.realName, role:role, _id:user._id}
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
    // console.log('1234')
    // console.log(values.oldPassword)
    // console.log(user.password)
    let verifyPsw = await ctx.compare(values.oldPassword, user.password)
    if (!verifyPsw) {
      ctx.throw(404, 'user password error')
    } else {
      // 重置密码
      values.password = await ctx.genHash(values.password)
      return service.user.findByIdAndUpdate(_id, values)
    }
  }

  async current() {
    const { ctx, service } = this
    // ctx.state.user 可以提取到JWT编码的data
    const _id = ctx.state.user.data._id
    const user = await service.user.find(_id)
    if (!user) {
      ctx.throw(404, 'user is not found')
    }
    user.password = 'How old are you?'
    return user
  }

  // 修改个人信息
  async resetSelf(values) {
    const {ctx, service} = this
    // 获取当前用户
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
    // 获取当前用户
    const _id = ctx.state.user.data._id
    const user = await service.user.find(_id)
    if (!user) {
      ctx.throw(404, 'user is not found')
    }
    return service.user.findByIdAndUpdate(_id, {avatar: values.url})
  }

}

module.exports = UserAccessService
