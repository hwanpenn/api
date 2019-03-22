const Service = require('egg').Service

class VipService extends Service {
  // create======================================================================================================>
  async create(payload) {
    // console.log('这里是role-----------service')
    return this.ctx.model.Vip.create(payload) 
  }

  // destroy======================================================================================================>  
  async destroy(_id) {
    const { ctx, service } = this
    const vip = await ctx.service.vip.find(_id)
    if (!vip) {
      ctx.throw(404, 'vip not found')
    }
    return ctx.model.Vip.findByIdAndRemove(_id)
  }

  // update======================================================================================================>
  async update(_id, payload) {
    const { ctx, service } = this
    const vip = await ctx.service.vip.find(_id)
    if (!vip) {
      ctx.throw(404, 'vip not found')
    }
    return ctx.model.Vip.findByIdAndUpdate(_id, payload)
  }

  // show======================================================================================================>
  async show(_id) {
    const vip = await this.ctx.service.vip.find(_id)
    if (!vip) {
      this.ctx.throw(404, 'vip not found')
    }
    return this.ctx.model.Vip.findById(_id)
  }

  // index======================================================================================================>
  async index(payload) {
    const { pageNo, pageSize, isPaging, search } = payload
    let res = []
    let count = 0
    let skip = ((Number(pageNo)) - 1) * Number(pageSize || 10)
    if(isPaging) {
      if(search) {
        res = await this.ctx.model.Vip.find({name: { $regex: search } }).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.Vip.find({}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.Vip.count({}).exec()
      }
    } else {
      if(search) {
        res = await this.ctx.model.Vip.find({name: { $regex: search } }).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.Vip.find({}).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.Vip.count({}).exec()
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
    return this.ctx.model.Vip.remove({ _id: { $in: values } })
  }

  // Commons======================================================================================================>
  async find(id) {
    return this.ctx.model.Vip.findById(id)
  }

}

module.exports = VipService