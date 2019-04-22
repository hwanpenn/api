const Service = require('egg').Service

class TaskService extends Service {
  // create======================================================================================================>
  async create(payload) {
    // console.log('这里是role-----------service')
    return this.ctx.model.Task.create(payload) 
  }

  // destroy======================================================================================================>  
  async destroy(_id) {
    const { ctx, service } = this
    const task = await ctx.service.task.find(_id)
    if (!task) {
      ctx.throw(404, 'task not found')
    }
    return ctx.model.Task.findByIdAndRemove(_id)
  }

  // update======================================================================================================>
  async update(_id, payload) {
    const { ctx, service } = this
    const task = await ctx.service.task.find(_id)
    if (!task) {
      ctx.throw(404, 'task not found')
    }
    return ctx.model.Task.findByIdAndUpdate(_id, payload)
  }

  // show======================================================================================================>
  async show(_id) {
    const task = await this.ctx.service.task.find(_id)
    if (!task) {
      this.ctx.throw(404, 'task not found')
    }
    return this.ctx.model.Task.findById(_id)
  }

  // index======================================================================================================>
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
      if(day) {
        res = await this.ctx.model.Task.find({day: { $regex: day } }).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.Task.find({}).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.Task.count({}).exec()
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
  // index======================================================================================================>
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
      if(search) {
        res = await this.ctx.model.Task.find({name: { $regex: search } }).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.Task.find({}).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.Task.count({}).exec()
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
    return this.ctx.model.Task.remove({ _id: { $in: values } })
  }

  // Commons======================================================================================================>
  async find(id) {
    return this.ctx.model.Task.findById(id)
  }

}

module.exports = TaskService