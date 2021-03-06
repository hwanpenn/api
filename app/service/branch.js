const Service = require('egg').Service

class BranchService extends Service {
  async create(payload) {
    return this.ctx.model.Branch.create(payload) 
  }

  async destroy(_id) {
    const { ctx, service } = this
    const branch = await ctx.service.branch.find(_id)
    if (!branch) {
      ctx.throw(404, 'branch not found')
    }
    return ctx.model.Branch.findByIdAndRemove(_id)
  }

  async update(_id, payload) {
    const { ctx, service } = this
    const branch = await ctx.service.branch.find(_id)
    if (!branch) {
      ctx.throw(404, 'branch not found')
    }
    return ctx.model.Branch.findByIdAndUpdate(_id, payload)
  }

  async show(_id) {
    const branch = await this.ctx.service.branch.find(_id)
    if (!branch) {
      this.ctx.throw(404, 'branch not found')
    }
    return this.ctx.model.Branch.findById(_id)
  }

  async index(payload) {
    const { currentPage, pageSize, isPaging, search } = payload
    let res = []
    let count = 0
    let skip = ((Number(currentPage)) - 1) * Number(pageSize || 10)
    if(true) {
      if(search) {
        res = await this.ctx.model.Branch.find({name: { $regex: search } }).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.Branch.find({}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.Branch.count({}).exec()
      }
    } else {
    }
    let data = res.map((e,i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })

    return { count: count, list: data, pageSize: Number(pageSize), currentPage: Number(currentPage) }
  }

  async removes(values) {
    return this.ctx.model.Branch.remove({ _id: { $in: values } })
  }

  async find(id) {
    return this.ctx.model.Branch.findById(id)
  }

}

module.exports = BranchService