const Service = require('egg').Service

class NewsService extends Service {
  async create(payload) {
    return this.ctx.model.News.create(payload) 
  }

  async destroy(_id) {
    const { ctx, service } = this
    const news = await ctx.service.news.find(_id)
    if (!news) {
      ctx.throw(404, 'news not found')
    }
    return ctx.model.News.findByIdAndRemove(_id)
  }

  async update(_id, payload) {
    const { ctx, service } = this
    const news = await ctx.service.news.find(_id)
    if (!news) {
      ctx.throw(404, 'news not found')
    }
    return ctx.model.News.findByIdAndUpdate(_id, payload)
  }

  async show(_id) {
    const news = await this.ctx.service.news.find(_id)
    if (!news) {
      this.ctx.throw(404, 'news not found')
    }
    return this.ctx.model.News.findById(_id)
  }

  async index(payload) {
    const { pageNo, pageSize, isPaging, search } = payload
    
    let res = []
    let count = 0
    let skip = ((Number(pageNo)) - 1) * Number(pageSize || 10)
    if(true) {
      if(search) {
        res = await this.ctx.model.News.find({name: { $regex: search } }).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.News.find({}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.News.count({}).exec()
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
    return this.ctx.model.News.remove({ _id: { $in: values } })
  }

  async find(id) {
    return this.ctx.model.News.findById(id)
  }

}

module.exports = NewsService