const Service = require('egg').Service

class AppDataService extends Service {
  async create(payload) {
    return this.ctx.model.AppData.create(payload) 
  }

  async destroy(_id) {
    const { ctx, service } = this
    const appData = await ctx.service.appData.find(_id)
    if (!appData) {
      ctx.throw(404, 'appData not found')
    }
    return ctx.model.AppData.findByIdAndRemove(_id)
  }

  async update(_id, payload) {
    const { ctx, service } = this
    const appData = await ctx.service.appData.find(_id)
    if (!appData) {
      ctx.throw(404, 'appData not found')
    }
    return ctx.model.AppData.findByIdAndUpdate(_id, payload)
  }

  async show(_id) {
    const appData = await this.ctx.service.appData.find(_id)
    if (!appData) {
      this.ctx.throw(404, 'appData not found')
    }
    return this.ctx.model.AppData.findById(_id)
  }

  async index(payload) {
    const { pageNo, pageSize, isPaging, search } = payload
    let res = []
    let count = 0
    let skip = ((Number(pageNo)) - 1) * Number(pageSize || 10)
    if(true) {
      if(search) {
        res = await this.ctx.model.AppData.find({name: { $regex: search } }).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.AppData.find({}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.AppData.count({}).exec()
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
    return this.ctx.model.AppData.remove({ _id: { $in: values } })
  }

  async find(id) {
    return this.ctx.model.AppData.findById(id)
  }

}

module.exports = AppDataService