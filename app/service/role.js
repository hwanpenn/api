const Service = require('egg').Service

class RoleService extends Service {
  // create======================================================================================================>
  async create(payload) {
    console.log('这里是role-----------service')
    return this.ctx.model.Role.create(payload) 
  }

  // destroy======================================================================================================>  
  async destroy(_id) {
    const { ctx, service } = this
    const role = await ctx.service.role.find(_id)
    if (!role) {
      ctx.throw(404, 'role not found')
    }
    return ctx.model.Role.findByIdAndRemove(_id)
  }

  // update======================================================================================================>
  async update(_id, payload) {
    const { ctx, service } = this
    const role = await ctx.service.role.find(_id)
    if (!role) {
      ctx.throw(404, 'role not found')
    }
    return ctx.model.Role.findByIdAndUpdate(_id, payload)
  }

  async show(_id) {
    const role = await this.ctx.service.role.find(_id)
    if (!role) {
      this.ctx.throw(404, 'role not found')
    }
    return this.ctx.model.Role.findById(_id)
  }

  async index(payload) {
    const { pageNo, pageSize, isPaging, search } = payload
    let res = []
    let count = 0
    let skip = ((Number(pageNo)) - 1) * Number(pageSize || 10)
    if(true) {
      if(search) {
        res = await this.ctx.model.Role.find({name: { $regex: search } }).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.Role.find({}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.Role.count({}).exec()
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
    return this.ctx.model.Role.remove({ _id: { $in: values } })
  }

  async find(id) {
    return this.ctx.model.Role.findById(id)
  }
  async findByName(name) {
    return this.ctx.model.Role.findOne({name:name})
  }

}

module.exports = RoleService