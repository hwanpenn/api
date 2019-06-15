const Service = require('egg').Service

class AreaService extends Service {
  async create(payload) {
    return this.ctx.model.Area.create(payload) 
  }

  async destroy(_id) {
    const { ctx, service } = this
    const Area = await ctx.model.Area.find({id:_id})
    if (!Area) {
      ctx.throw(404, 'Area not found')
    }
    return ctx.model.Area.findByIdAndRemove(_id)
  }

  async update(_id, payload) {
    const { ctx, service } = this
    const Area = await ctx.model.Area.find({id:_id})
    if (!Area) {
      ctx.throw(404, 'Area not found')
    }
    return ctx.model.Area.findByIdAndUpdate(_id, payload)
  }

  async show(_id) {
    const Area = await this.ctx.service.Area.find(_id)
    if (!Area) {
      this.ctx.throw(404, 'Area not found')
    }
    return this.ctx.model.Area.findById(_id)
  }

  async index(payload) {
    const { pageNo, pageSize, isPaging, search } = payload
    let res = []
    let count = 0
    let skip = ((Number(pageNo)) - 1) * Number(pageSize || 10)
    if(true) {
      if(search) {
        res = await this.ctx.model.Area.find({name: { $regex: search } }).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.Area.find({}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.Area.count({}).exec()
      }
    } else {
    }
    let data = res.map((e,i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })

    return { total: count, rows: data, pageSize: Number(pageSize), pageNo: Number(pageNo) }
  }

  async removes(values) {
    return this.ctx.model.Area.remove({ _id: { $in: values } })
  }

  async find(id) {
    return this.ctx.model.Area.findById(id)
  }

}

module.exports = AreaService