const Controller = require('egg').Controller

class BranchController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.createRule = {
      name: { type: 'string', required: true, allowEmpty: false },
      access: { type: 'string', required: true, allowEmpty: false }
    }

  }

  async create() {
    const { ctx, service } = this
    ctx.validate(this.createRule)
    const payload = ctx.request.body || {}
    const res = await service.branch.create(payload)
    ctx.helper.success({ctx, res})
  }
  
  async destroy() {
    const { ctx, service } = this
    const { id } = ctx.params
    await service.branch.destroy(id)
    ctx.helper.success({ctx})
  }

  async update() {
    const { ctx, service } = this
    ctx.validate(this.createRule)
    const { id } = ctx.params
    const payload = ctx.request.body || {}
    await service.branch.update(id, payload)
    ctx.helper.success({ctx})
  }

  async show() {
    const { ctx, service } = this
    const { id } = ctx.params
    const res = await service.branch.show(id)
    ctx.helper.success({ctx, res})
  }

  async index() {
    const { ctx, service } = this
    const payload = ctx.query
    const res = await service.branch.index(payload)
    ctx.helper.success({ctx, res})
  }

  async removes() {
    const { ctx, service } = this
    const { id } = ctx.request.body // {id: "5a452a44ab122b16a0231b42,5a452a3bab122b16a0231b41"}
    const payload = id.split(',') || []
    const result = await service.branch.removes(payload)
    ctx.helper.success({ctx})
  }

}


module.exports = BranchController