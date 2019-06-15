const Service = require('egg').Service

class ClubService extends Service {
  async create(payload) {
    return this.ctx.model.Club.create(payload) 
  }

  async destroy(_id) {
    const { ctx, service } = this
    const club = await ctx.service.club.find(_id)
    if (!club) {
      ctx.throw(404, 'club not found')
    }
    return ctx.model.Club.findByIdAndRemove(_id)
  }

  async update(_id, payload) {
    const { ctx, service } = this
    const club = await ctx.service.club.find(_id)
    if (!club) {
      ctx.throw(404, 'club not found')
    }
    return ctx.model.Club.findByIdAndUpdate(_id, payload)
  }

  async show(_id) {
    const club = await this.ctx.service.club.find(_id)
    if (!club) {
      this.ctx.throw(404, 'club not found')
    }
    return this.ctx.model.Club.findById(_id)
  }

  async index(payload) {
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
    return this.ctx.model.Club.remove({ _id: { $in: values } })
  }

  async find(id) {
    return this.ctx.model.Club.findById(id)
  }

}

module.exports = ClubService