const Service = require('egg').Service

class BaseDataService extends Service {
  async create(payload) {
    return this.ctx.model.BaseData.create(payload) 
  }

  async destroy(_id) {
    const { ctx, service } = this
    const baseData = await ctx.service.baseData.find(_id)
    if (!baseData) {
      ctx.throw(404, 'baseData not found')
    }
    return ctx.model.BaseData.findByIdAndRemove(_id)
  }

  async update(_id, payload) {
    const { ctx, service } = this
    const baseData = await ctx.service.baseData.find(_id)
    if (!baseData) {
      ctx.throw(404, 'baseData not found')
    }
    return ctx.model.BaseData.findByIdAndUpdate(_id, payload)
  }

  async show(_id) {
    const baseData = await this.ctx.service.baseData.find(_id)
    if (!baseData) {
      this.ctx.throw(404, 'baseData not found')
    }
    return this.ctx.model.BaseData.findById(_id)
  }

  async index(payload) {
    const { pageNo, pageSize, isPaging, search, user } = payload
    let res = []
    let count = 0
    let skip = ((Number(pageNo)) - 1) * Number(pageSize || 10)
    if(true) {
      if(search) {
        res = await this.ctx.model.BaseData.find({user: user,name: { $regex: search } }).populate('user').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.BaseData.find({user: user,}).populate('user').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.BaseData.count({}).exec()
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
    return this.ctx.model.BaseData.remove({ _id: { $in: values } })
  }

  async find(id) {
    return this.ctx.model.BaseData.findById(id)
  }

}

module.exports = BaseDataService