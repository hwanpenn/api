const Service = require('egg').Service

class ClubService extends Service {
  // create======================================================================================================>
  async create(payload) {
    // console.log('这里是role-----------service')
    return this.ctx.model.Club.create(payload) 
  }

  // destroy======================================================================================================>  
  async destroy(_id) {
    const { ctx, service } = this
    const club = await ctx.service.club.find(_id)
    if (!club) {
      ctx.throw(404, 'club not found')
    }
    return ctx.model.Club.findByIdAndRemove(_id)
  }

  // update======================================================================================================>
  async update(_id, payload) {
    const { ctx, service } = this
    const club = await ctx.service.club.find(_id)
    if (!club) {
      ctx.throw(404, 'club not found')
    }
    return ctx.model.Club.findByIdAndUpdate(_id, payload)
  }

  // show======================================================================================================>
  async show(_id) {
    const club = await this.ctx.service.club.find(_id)
    if (!club) {
      this.ctx.throw(404, 'club not found')
    }
    return this.ctx.model.Club.findById(_id)
  }

  // index======================================================================================================>
  async index(payload) {
    console.log(payload)
    const { pageNo, pageSize, isPaging, search, area } = payload
    let res = []
    let count = 0
    let skip = ((Number(pageNo)) - 1) * Number(pageSize || 10)
    if(true) {
      if(search) {
        if(area){
          res = await this.ctx.model.Club.find({name: { $regex: search },area: area}).populate('area').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
          count = res.length
        }else{
          res = await this.ctx.model.Club.find({name: { $regex: search } }).populate('area').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
          count = res.length
        }
        
      } else {
        if(area){
          res = await this.ctx.model.Club.find({area: area}).populate('area').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
          count = await this.ctx.model.Club.count({}).exec()
        }else{
          res = await this.ctx.model.Club.find({}).populate('area').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
          count = await this.ctx.model.Club.count({}).exec()
        }
        
      }
    } else {
      if(search) {
        if(area){
          res = await this.ctx.model.Club.find({name: { $regex: search },area: area}).populate('area').sort({ createdAt: -1 }).exec()
          count = res.length
        }else{
          res = await this.ctx.model.Club.find({name: { $regex: search } }).populate('area').sort({ createdAt: -1 }).exec()
          count = res.length
        }
        
      } else {
        if(area){
          res = await this.ctx.model.Club.find({area: area}).populate('area').sort({ createdAt: -1 }).exec()
          count = await this.ctx.model.Club.count({}).exec()
        }else{
          res = await this.ctx.model.Club.find({}).populate('area').sort({ createdAt: -1 }).exec()
          count = await this.ctx.model.Club.count({}).exec()
        }
        
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
    return this.ctx.model.Club.remove({ _id: { $in: values } })
  }

  // Commons======================================================================================================>
  async find(id) {
    return this.ctx.model.Club.findById(id)
  }

}

module.exports = ClubService