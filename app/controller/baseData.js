const Controller = require('egg').Controller

class BaseDataController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.createRule = {
      name: { type: 'string', required: false, allowEmpty: false },
      access: { type: 'string', required: false, allowEmpty: false }
    }

  }

  async create() {
    const { ctx, service } = this
    ctx.validate(this.createRule)
    const payload = ctx.request.body || {}
    const res = await service.baseData.create(payload)
    ctx.helper.success({ctx, res})
  }
  
  async destroy() {
    const { ctx, service } = this
    const { id } = ctx.params
    await service.baseData.destroy(id)
    ctx.helper.success({ctx})
  }

  async update() {
    const { ctx, service } = this
    ctx.validate(this.createRule)
    const { id } = ctx.params
    const payload = ctx.request.body || {}
    await service.baseData.update(id, payload)
    ctx.helper.success({ctx})
  }

  async show() {
    const { ctx, service } = this
    const { id } = ctx.params
    const res = await service.baseData.show(id)
    ctx.helper.success({ctx, res})
  }

  async index() {
    const { ctx, service } = this
    const payload = ctx.query
    const res = await service.baseData.index(payload)
    ctx.helper.success({ctx, res})
  }

  async removes() {
    const { ctx, service } = this
    const { id } = ctx.request.body 
    const payload = id.split(',') || []
    const result = await service.baseData.removes(payload)
    ctx.helper.success({ctx})
  }

}


module.exports = BaseDataController