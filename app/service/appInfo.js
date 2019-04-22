const Service = require('egg').Service

class appInfoService extends Service {
  // create======================================================================================================>
  async create(payload) {
    // console.log('这里是role-----------service')
    return this.ctx.model.appInfo.create(payload) 
  }

  // destroy======================================================================================================>  
  async destroy(_id) {
    const { ctx, service } = this
    const appInfo = await ctx.service.appInfo.find(_id)
    if (!appInfo) {
      ctx.throw(404, 'appInfo not found')
    }
    return ctx.model.appInfo.findByIdAndRemove(_id)
  }

  // update======================================================================================================>
  async update(_id, payload) {
    const { ctx, service } = this
    const appInfo = await ctx.service.appInfo.find(_id)
    if (!appInfo) {
      ctx.throw(404, 'appInfo not found')
    }
    return ctx.model.appInfo.findByIdAndUpdate(_id, payload)
  }

  // show======================================================================================================>
  async show(_id) {
    const appInfo = await this.ctx.service.appInfo.find(_id)
    if (!appInfo) {
      this.ctx.throw(404, 'appInfo not found')
    }
    return this.ctx.model.appInfo.findById(_id)
  }

  // index======================================================================================================>
  async index(payload) {
    const { pageNo, pageSize, isPaging, search } = payload
    let res = []
    let count = 0
    let skip = ((Number(pageNo)) - 1) * Number(pageSize || 10)
    if(true) {
      if(search) {
        res = await this.ctx.model.appInfo.find({name: { $regex: search } }).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.appInfo.find({}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.appInfo.count({}).exec()
      }
    } else {
      if(search) {
        res = await this.ctx.model.appInfo.find({name: { $regex: search } }).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.appInfo.find({}).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.appInfo.count({}).exec()
      }
    }
    // 整理数据源 -> Ant Design Pro
    let data = res.map((e,i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })

    return { total: count, rows: data, pageSize: Number(pageSize), pageNo: Number(pageNo) }
  }

  // removes======================================================================================================>
  async removes(values) {
    return this.ctx.model.appInfo.remove({ _id: { $in: values } })
  }

  // Commons======================================================================================================>
  async find(id) {
    return this.ctx.model.appInfo.findById(id)
  }

}

module.exports = appInfoService