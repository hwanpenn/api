const Service = require('egg').Service

class AreaService extends Service {
  // create======================================================================================================>
  async create(payload) {
    // console.log('这里是role-----------service')
    return this.ctx.model.Area.create(payload) 
  }

  // destroy======================================================================================================>  
  async destroy(_id) {
    const { ctx, service } = this
    const Area = await ctx.model.Area.find({id:_id})
    if (!Area) {
      ctx.throw(404, 'Area not found')
    }
    return ctx.model.Area.findByIdAndRemove(_id)
  }

  // update======================================================================================================>
  async update(_id, payload) {
    const { ctx, service } = this
    // console.log(_id)
    // const Area = await ctx.service.Area.find(_id)
    // this.ctx.model.Area.findById(id)
    const Area = await ctx.model.Area.find({id:_id})
    if (!Area) {
      ctx.throw(404, 'Area not found')
    }
    return ctx.model.Area.findByIdAndUpdate(_id, payload)
  }

  // show======================================================================================================>
  async show(_id) {
    const Area = await this.ctx.service.Area.find(_id)
    if (!Area) {
      this.ctx.throw(404, 'Area not found')
    }
    return this.ctx.model.Area.findById(_id)
  }

  // index======================================================================================================>
  async index(payload) {
    const { pageNo, pageSize, isPaging, search } = payload
    let res = []
    let count = 0
    let skip = ((Number(pageNo)) - 1) * Number(pageSize || 10)
    if(isPaging) {
      if(search) {
        res = await this.ctx.model.Area.find({name: { $regex: search } }).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.Area.find({}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.Area.count({}).exec()
      }
    } else {
      if(search) {
        res = await this.ctx.model.Area.find({name: { $regex: search } }).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.Area.find({}).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.Area.count({}).exec()
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
    return this.ctx.model.Area.remove({ _id: { $in: values } })
  }

  // Commons======================================================================================================>
  async find(id) {
    return this.ctx.model.Area.findById(id)
  }

}

module.exports = AreaService