const Service = require('egg').Service

class VideoService extends Service {
  async create(payload) {
    return this.ctx.model.Video.create(payload) 
  }

  async destroy(_id) {
    const { ctx, service } = this
    const video = await ctx.service.video.find(_id)
    if (!video) {
      ctx.throw(404, 'video not found')
    }
    return ctx.model.Video.findByIdAndRemove(_id)
  }

  async update(_id, payload) {
    const { ctx, service } = this
    const video = await ctx.service.video.find(_id)
    if (!video) {
      ctx.throw(404, 'video not found')
    }
    return ctx.model.Video.findByIdAndUpdate(_id, payload)
  }

  async show(_id) {
    const video = await this.ctx.service.video.find(_id)
    if (!video) {
      this.ctx.throw(404, 'video not found')
    }
    return this.ctx.model.Video.findById(_id)
  }

  async index(payload) {
    const { pageNo, pageSize, isPaging, search } = payload
    let res = []
    let count = 0
    let skip = ((Number(pageNo)) - 1) * Number(pageSize || 10)
    if(true) {
      if(search) {
        res = await this.ctx.model.Video.find({name: { $regex: search } }).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.Video.find({}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.Video.count({}).exec()
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
    return this.ctx.model.Video.remove({ _id: { $in: values } })
  }

  async find(id) {
    return this.ctx.model.Video.findById(id)
  }

}

module.exports = VideoService