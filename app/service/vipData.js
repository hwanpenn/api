const Service = require('egg').Service

class VipDataService extends Service {
  // create======================================================================================================>
  async create(payload) {
    // console.log(payload)
    // console.log('这里是role-----------service')
    return this.ctx.model.VipData.create(payload) 

  }

  // destroy======================================================================================================>  
  async destroy(_id) {
    const { ctx, service } = this
    const vipData = await ctx.service.vipData.find(_id)
    if (!vipData) {
      ctx.throw(404, 'vipData not found')
    }
    return ctx.model.VipData.findByIdAndRemove(_id)
  }

  // update======================================================================================================>
  async update(_id, payload) {
    const { ctx, service } = this
    const vipData = await ctx.service.vipData.find(_id)
    if (!vipData) {
      ctx.throw(404, 'vipData not found')
    }
    return ctx.model.VipData.findByIdAndUpdate(_id, payload)
  }

  // show======================================================================================================>
  async show(_id) {
    const vipData = await this.ctx.service.vipData.find(_id)
    if (!vipData) {
      this.ctx.throw(404, 'vipData not found')
    }
    return this.ctx.model.VipData.findById(_id)
  }

  // index======================================================================================================>
  async index(payload) {

    const { pageNo, pageSize, isPaging, search,user } = payload
    console.log('user----------------')
    console.log(user)
    let res = []
    let count = 0
    let skip = ((Number(pageNo)) - 1) * Number(pageSize || 10)
    if(true) {
      if(search) {
        res = await this.ctx.model.VipData.find({user: user,name: { $regex: search } }).populate('user').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.VipData.find({user: user}).populate('user').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.VipData.count({}).exec()
      }
    } else {
      if(search) {
        res = await this.ctx.model.VipData.find({user: user,name: { $regex: search } }).populate('user').sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.VipData.find({user: user,}).populate('user').sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.VipData.count({}).exec()
      }
    }
    if(user) {
      res = await this.ctx.model.VipData.find({user: user }).populate('user').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
      count = res.length
    } else {
      res = await this.ctx.model.VipData.find().skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
      count = await this.ctx.model.VipData.count({}).exec()
    }
    res = await this.ctx.model.VipData.find()
    console.log(res)
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
    return this.ctx.model.VipData.remove({ _id: { $in: values } })
  }

  // Commons======================================================================================================>
  async find(id) {
    return this.ctx.model.VipData.findById(id)
  }

}

module.exports = VipDataService