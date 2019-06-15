const Service = require('egg').Service

class UserService extends Service {
  async create(payload) {
    const { ctx, service } = this

    // if(payload.role==='admin'){
    //   // const roleTemp = await this.ctx.service.role.findByName('admin')
    //   payload.role="admin"
    // }else if(payload.role==='coach'){
    //   // const roleTemp = await this.ctx.service.role.findByName('coach')
    //   // payload.role=roleTemp._id
    // }else if(payload.role==='user'){
    //   // const roleTemp = await this.ctx.service.role.findByName('user')
    //   payload.role="user"
    // }
    // const role = await service.role.show(payload.role)
    // console.log(role)
    // if (!role) {
    //   ctx.throw(404, 'role is not found')
    // }
    console.log(payload)
    payload.password = await this.ctx.genHash(payload.password)
    return ctx.model.User.create(payload)
  }
  async createAdmin(payload) {
    const res = await this.ctx.model.Role.find({access: 'ROLE_ADMIN'})
    payload.role=res[0]._id
    const { ctx, service } = this
    const role = await service.role.show(payload.role)
    if (!role) {
      ctx.throw(404, 'role is not found')
    }
    payload.password = await this.ctx.genHash(payload.password)
    return ctx.model.User.create(payload)
  }

  async destroy(_id) {
    const { ctx, service } = this
    const user = await ctx.service.user.find(_id)
    if (!user) {
      ctx.throw(404, 'user not found')
    }
    return ctx.model.User.findByIdAndRemove(_id)
  }

  async updatebyMobile(payload) {
    const { ctx, service } = this
    const user = await ctx.model.User.find({mobile: payload.mobile })
    payload.password = await this.ctx.genHash(payload.password)
    return ctx.model.User.findByIdAndUpdate(user[0]._id, payload)
  }
  async update(_id, payload) {
    const { ctx, service } = this
    const user = await ctx.service.user.find(_id)
    if (!user) {
      ctx.throw(404, 'user not found')
    }
    return ctx.model.User.findByIdAndUpdate(_id, payload)
  }
  async show(_id) {
    const user = await this.ctx.service.user.find(_id)
    if (!user) {
      this.ctx.throw(404, 'user not found')
    }
    return this.ctx.model.User.findById(_id)
  }

  async index1(payload) {
    const { pageNo, pageSize, isPaging, search } = payload
    let res = []
    let count = 0
    let skip = ((Number(pageNo)) - 1) * Number(pageSize || 10)
    if(true) {
      if(search) {
        res = await this.ctx.model.User.find({role: '5bd74c3d0997400d0a5dfd4f' }).populate('role').populate('club').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.User.find({role: '5bd74c3d0997400d0a5dfd4f'}).populate('role').populate('club').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.User.count({}).exec()
      }
    } else {
      if(search) {
        res = await this.ctx.model.User.find({realName: { $regex: search },role: '5bd74c3d0997400d0a5dfd4f' }).populate('role').populate('club').sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.User.find({role: '5bd74c3d0997400d0a5dfd4f'}).populate('role').populate('club').sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.User.count({}).exec()
      }
    }
    let data = res.map((e,i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.password = 'this is password'
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })
    return { total: count, rows: data, pageSize: Number(pageSize), pageNo: Number(pageNo) }
  }

  async index(payload) {
    const { pageNo, pageSize, isPaging, search,vip ,coachName} = payload
    let res = []
    let count = 0
    let skip = ((Number(pageNo)) - 1) * Number(pageSize || 10)
    
    if(true) {
      if(search) {
        if(vip){
          if(coachName){
            res = await this.ctx.model.User.find({coachName:coachName,vip:vip,realName: { $regex: search } ,role:"user"}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
            count = res.length
          }else{
            res = await this.ctx.model.User.find({vip:vip,realName: { $regex: search } ,role:"user"}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
            count = await this.ctx.model.User.count({}).exec()
          }
        }else{
          if(coachName){
            res = await this.ctx.model.User.find({coachName:coachName,realName: { $regex: search } ,role:"user"}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
            count = res.length
          }else{
            res = await this.ctx.model.User.find({realName: { $regex: search } ,role:"user"}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
            count = await this.ctx.model.User.count({}).exec()
          }
          
        }
        
      } else {
        if(vip){
          if(coachName){
            res = await this.ctx.model.User.find({coachName:coachName,vip:vip,role:"user"}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
            count = res.length
          }else{
            res = await this.ctx.model.User.find({vip:vip,role:"user"}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
            count = await this.ctx.model.User.count({}).exec()
          }
          
        }else{
          if(coachName){
            res = await this.ctx.model.User.find({coachName:coachName,role:"user"}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
            count = res.length
          }else{
            res = await this.ctx.model.User.find({role:"user"}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
            count = await this.ctx.model.User.count({}).exec()
          }
          
        }
        
      }
    }

    
    let data = res.map((e,i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.password = 'this is password'
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })
    return { total: count, rows: data, pageSize: Number(pageSize), pageNo: Number(pageNo) }
  }


   async indexCoach(payload) {
    const { pageNo, pageSize, isPaging, search,vip } = payload
    let res = []
    let count = 0
    let skip = ((Number(pageNo)) - 1) * Number(pageSize || 10)
    
    if(true) {
      if(search) {
        if(vip){
          res = await this.ctx.model.User.find({vip:vip,realName: { $regex: search } ,role:"coach"}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
          count = res.length
        }else{
          res = await this.ctx.model.User.find({realName: { $regex: search } ,role:"coach"}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
          count = res.length
        }
        
      } else {
        if(vip){
          res = await this.ctx.model.User.find({vip:vip,role:"coach"}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
          count = res.length
        }else{
          res = await this.ctx.model.User.find({role:"coach"}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
          count = res.length
        }
        
      }
    }

    
    let data = res.map((e,i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.password = 'this is password'
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })
    return { total: count, rows: data, pageSize: Number(pageSize), pageNo: Number(pageNo) }
  }

   async sortbyweight(payload) {
    const { pageNo, pageSize, isPaging, search,vip } = payload
    let res = []
    let count = 0
    let skip = ((Number(pageNo)) - 1) * Number(pageSize || 10)
    
    if(true) {
      if(search) {
        if(vip){
          res = await this.ctx.model.User.find({vip:vip,realName: { $regex: search } ,role:"user"}).skip(skip).limit(Number(pageSize)).sort({ lose: 1 }).exec()
          count = res.length
        }else{
          res = await this.ctx.model.User.find({realName: { $regex: search } ,role:"user"}).skip(skip).limit(Number(pageSize)).sort({ lose: 1 }).exec()
          count = res.length
        }
        
      } else {
        if(vip){
          res = await this.ctx.model.User.find({vip:vip,role:"user"}).skip(skip).limit(Number(pageSize)).sort({ lose: 1 }).exec()
          count = await this.ctx.model.User.count({}).exec()
        }else{
          res = await this.ctx.model.User.find({role:"user"}).skip(skip).limit(Number(pageSize)).sort({ lose: 1 }).exec()
          count = await this.ctx.model.User.count({}).exec()
        }
        
      }
    }

    
    let data = res.map((e,i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.password = 'this is password'
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })
    return { total: count, rows: data, pageSize: Number(pageSize), pageNo: Number(pageNo) }
  }

  async allAdmin(payload) {
    const { pageNo, pageSize, isPaging, search,club } = payload
    let res = []
    let count = 0
    let skip = ((Number(pageNo)) - 1) * Number(pageSize || 10)
    const roleSuper = await this.ctx.service.role.findByName('admin')
    if(true) {
      if(search) {
        if(club){
          res = await this.ctx.model.User.find({club: club,realName: { $regex: search }, role:roleSuper._id}).populate('role').populate('club').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
          count = res.length
        }else{
          res = await this.ctx.model.User.find({realName: { $regex: search }, role:roleSuper._id}).populate('role').populate('club').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
          count = res.length
        }
        
      } else {
        if(club){
          res = await this.ctx.model.User.find({club: club,role:roleSuper._id}).populate('role').populate('club').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
          count = await this.ctx.model.User.count({role:roleSuper._id}).exec()
        }else{
          res = await this.ctx.model.User.find({role:roleSuper._id}).populate('role').populate('club').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
          count = await this.ctx.model.User.count({role:roleSuper._id}).exec()
        }
        
      }
    } else {
    }
    let data = res.map((e,i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.password = 'this is password'
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })
    return { total: count, rows: data, pageSize: Number(pageSize), pageNo: Number(pageNo) }
  }
  async allCoach(payload) {
    const { pageNo, pageSize, isPaging, search, club } = payload
    let res = []
    let count = 0
    let skip = ((Number(pageNo)) - 1) * Number(pageSize || 10)
    const roleSuper = await this.ctx.service.role.findByName('coach')
    if(true) {
      if(search) {
        if(club){
          res = await this.ctx.model.User.find({club: club,realName: { $regex: search }, role:roleSuper._id}).populate('role').populate('club').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
          count = res.length
        }else{
          res = await this.ctx.model.User.find({realName: { $regex: search }, role:roleSuper._id}).populate('role').populate('club').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
          count = res.length
        }
        
      } else {
        if(club){
          res = await this.ctx.model.User.find({club: club,role:roleSuper._id}).populate('role').populate('club').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
          count = await this.ctx.model.User.count({role:roleSuper._id}).exec()
        }else{
          res = await this.ctx.model.User.find({role:roleSuper._id}).populate('role').populate('club').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
          count = await this.ctx.model.User.count({role:roleSuper._id}).exec()
        }
        
      }
    } else {
      
    }
    let data = res.map((e,i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.password = 'this is password'
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })
    return { total: count, rows: data, pageSize: Number(pageSize), pageNo: Number(pageNo) }
  }
  async allUser(payload) {
    const { pageNo, pageSize, isPaging, search, club } = payload
    let res = []
    let count = 0
    let skip = ((Number(pageNo)) - 1) * Number(pageSize || 10)
    const roleSuper = await this.ctx.service.role.findByName('user')
    if(true) {
      if(search) {
        if(club){
          res = await this.ctx.model.User.find({club: club,realName: { $regex: search }, role:roleSuper._id}).populate('role').populate('club').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
          count = res.length
        }else{
          res = await this.ctx.model.User.find({realName: { $regex: search }, role:roleSuper._id}).populate('role').populate('club').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
          count = res.length
        }
        
      } else {
        if(club){
          res = await this.ctx.model.User.find({club: club,role:roleSuper._id}).populate('role').populate('club').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
          count = await this.ctx.model.User.count({role:roleSuper._id}).exec()
        }else{
          res = await this.ctx.model.User.find({role:roleSuper._id}).populate('role').populate('club').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
          count = await this.ctx.model.User.count({role:roleSuper._id}).exec()
        }
        
      }
    } else {
      
    }
    let data = res.map((e,i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.password = 'this is password'
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })
    return { total: count, rows: data, pageSize: Number(pageSize), pageNo: Number(pageNo) }
  }


  async removes(payload) {
    return this.ctx.model.User.remove({ _id: { $in: payload } })
  }

  async resetPsd(id) {
    const { ctx, service } = this
    // ctx.state.user 可以提取到JWT编码的data
    const user = await ctx.model.User.findById(id)
    if (!user) {
      ctx.throw(404, 'user is not found')
    }
    let values = {}
    values.password = await ctx.genHash('1234')
    return ctx.model.User.findByIdAndUpdate(id, values)
    
  }

  async findByMobile(mobile) {
    return this.ctx.model.User.findOne({mobile: mobile})
  }

  async find(id) {
    return this.ctx.model.User.findById(id)
  }

  async findByIdAndUpdate(id, values) {
    return this.ctx.model.User.findByIdAndUpdate(id, values)
  }



}


module.exports = UserService
