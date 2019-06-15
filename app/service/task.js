const Service = require('egg').Service

class TaskService extends Service {
  async create(payload) {
    return this.ctx.model.Task.create(payload) 
  }

  async destroy(_id) {
    const { ctx, service } = this
    const task = await ctx.service.task.find(_id)
    if (!task) {
      ctx.throw(404, 'task not found')
    }
    return ctx.model.Task.findByIdAndRemove(_id)
  }

  async update(_id, payload) {
    const { ctx, service } = this
    const task = await ctx.service.task.find(_id)
    if (!task) {
      ctx.throw(404, 'task not found')
    }
    return ctx.model.Task.findByIdAndUpdate(_id, payload)
  }

  async show(_id) {
    const task = await this.ctx.service.task.find(_id)
    if (!task) {
      this.ctx.throw(404, 'task not found')
    }
    return this.ctx.model.Task.findById(_id)
  }

  async indexbyday(payload) {
    const { pageNo, pageSize, isPaging, search, day } = payload
    let res = []
    let count = 0
    let skip = ((Number(pageNo)) - 1) * Number(pageSize || 10)
    if(true) {
      if(day) {
        res = await this.ctx.model.Task.find({day: { $regex: day } }).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.Task.find({}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.Task.count({}).exec()
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
        res = await this.ctx.model.Task.find({name: { $regex: search } }).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.Task.find({}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.Task.count({}).exec()
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
    return this.ctx.model.Task.remove({ _id: { $in: values } })
  }

  async find(id) {
    return this.ctx.model.Task.findById(id)
  }

}

module.exports = TaskService