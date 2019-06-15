const Controller = require('egg').Controller

class PushMsgController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.createRule = {
      name: { type: 'string', required: true, allowEmpty: false },
      access: { type: 'string', required: false, allowEmpty: false }
    }

  }

  async create() {
    const { ctx, service } = this
    ctx.validate(this.createRule)
    const payload = ctx.request.body || {}
    const res = await service.pushMsg.create(payload)
    ctx.helper.success({ctx, res})
  }
  
  async destroy() {
    const { ctx, service } = this
    const { id } = ctx.params
    await service.pushMsg.destroy(id)
    ctx.helper.success({ctx})
  }

  async update() {
    const { ctx, service } = this
    ctx.validate(this.createRule)
    const { id } = ctx.params
    const payload = ctx.request.body || {}
    await service.pushMsg.update(id, payload)
    ctx.helper.success({ctx})
  }

  async show() {
    const { ctx, service } = this
    const { id } = ctx.params
    const res = await service.pushMsg.show(id)
    ctx.helper.success({ctx, res})
  }

  async index() {
    const { ctx, service } = this
    const payload = ctx.query
    const res = await service.pushMsg.index(payload)
    ctx.helper.success({ctx, res})
  }

  async removes() {
    const { ctx, service } = this
    const { id } = ctx.request.body 
    const payload = id.split(',') || []
    const result = await service.pushMsg.removes(payload)
    ctx.helper.success({ctx})
  }

}


module.exports = PushMsgController