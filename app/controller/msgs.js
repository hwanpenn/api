'use strict'

const Controller = require('egg').Controller

class msgsController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.createRule = {
      mobile: { type: 'string', required: true, allowEmpty: false },
    }

  }
  async getMsg() {
    const ctx = this.ctx
    const payload = ctx.request.body || {}
    const res = await ctx.service.msgService.getMsg(payload.mobile)
    ctx.helper.success({ctx, res})
  }
}

module.exports = msgsController

