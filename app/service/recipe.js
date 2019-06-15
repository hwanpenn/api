const Service = require('egg').Service

class RecipeService extends Service {
  async create(payload) {
    return this.ctx.model.Recipe.create(payload) 
  }

  async destroy(_id) {
    const { ctx, service } = this
    const recipe = await ctx.service.recipe.find(_id)
    if (!recipe) {
      ctx.throw(404, 'recipe not found')
    }
    return ctx.model.Recipe.findByIdAndRemove(_id)
  }

  async update(_id, payload) {
    const { ctx, service } = this
    const recipe = await ctx.service.recipe.find(_id)
    if (!recipe) {
      ctx.throw(404, 'recipe not found')
    }
    return ctx.model.Recipe.findByIdAndUpdate(_id, payload)
  }

  async show(_id) {
    const recipe = await this.ctx.service.recipe.find(_id)
    if (!recipe) {
      this.ctx.throw(404, 'recipe not found')
    }
    return this.ctx.model.Recipe.findById(_id)
  }

  async indexbyday(payload) {
    const { pageNo, pageSize, isPaging, search,day } = payload
    let res = []
    let count = 0
    let skip = ((Number(pageNo)) - 1) * Number(pageSize || 10)
    if(true) {
      if(day) {
        res = await this.ctx.model.Recipe.find({day: { $regex: day } }).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.Recipe.find({}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.Recipe.count({}).exec()
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
  async index(payload) {
    const { pageNo, pageSize, isPaging, search } = payload
    let res = []
    let count = 0
    let skip = ((Number(pageNo)) - 1) * Number(pageSize || 10)
    if(true) {
      if(search) {
        res = await this.ctx.model.Recipe.find({name: { $regex: JSON.parse(search).search } }).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.Recipe.find({}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.Recipe.count({}).exec()
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
    return this.ctx.model.Recipe.remove({ _id: { $in: values } })
  }

  async find(id) {
    return this.ctx.model.Recipe.findById(id)
  }

}

module.exports = RecipeService