const Service = require('egg').Service

class VipDataService extends Service {
  async create(payload) {
    return this.ctx.model.VipData.create(payload) 

  }

  async destroy(_id) {
    const { ctx, service } = this
    const vipData = await ctx.service.vipData.find(_id)
    if (!vipData) {
      ctx.throw(404, 'vipData not found')
    }
    return ctx.model.VipData.findByIdAndRemove(_id)
  }

  async update(_id, payload) {
    const { ctx, service } = this
    const vipData = await ctx.service.vipData.find(_id)
    if (!vipData) {
      ctx.throw(404, 'vipData not found')
    }
    return ctx.model.VipData.findByIdAndUpdate(_id, payload)
  }

  async show(_id) {
    const vipData = await this.ctx.service.vipData.find(_id)
    if (!vipData) {
      this.ctx.throw(404, 'vipData not found')
    }
    return this.ctx.model.VipData.findById(_id)
  }

  async index(payload) {

    const { pageNo, pageSize, isPaging, search,user,vipDay } = payload
    let res = []
    let count = 0
    let skip = ((Number(pageNo)) - 1) * Number(pageSize || 10)

    res = await this.ctx.model.VipData.find({user: user }).populate('user').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()

    if(user) {
      if(vipDay) {
        // console.log('here')
        res = await this.ctx.model.VipData.find({user: user,vipDay:vipDay }).populate('user').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        // console.log(res)
        count = res.length
      } else {
        res = await this.ctx.model.VipData.find({user: user }).populate('user').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = res.length
      }
    } else {
      res = await this.ctx.model.VipData.find().skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
      count = await this.ctx.model.VipData.count({}).exec()
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
    return this.ctx.model.VipData.remove({ _id: { $in: values } })
  }

  async find(id) {
    return this.ctx.model.VipData.findById(id)
  }

}

module.exports = VipDataService