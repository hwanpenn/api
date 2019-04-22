const Service = require('egg').Service

class UserService extends Service {
  // create======================================================================================================>
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

    payload.password = await this.ctx.genHash(payload.password)
    return ctx.model.User.create(payload)
  }
  async createAdmin(payload) {
    const res = await this.ctx.model.Role.find({access: 'ROLE_ADMIN'})
    // console.log(res)
    payload.role=res[0]._id
    const { ctx, service } = this
    const role = await service.role.show(payload.role)
    // console.log(role)
    if (!role) {
      ctx.throw(404, 'role is not found')
    }
    payload.password = await this.ctx.genHash(payload.password)
    return ctx.model.User.create(payload)
  }

  // destroy======================================================================================================>
  async destroy(_id) {
    const { ctx, service } = this
    const user = await ctx.service.user.find(_id)
    if (!user) {
      ctx.throw(404, 'user not found')
    }
    return ctx.model.User.findByIdAndRemove(_id)
  }

  // update======================================================================================================>
  async updatebyMobile(payload) {
    const { ctx, service } = this
    // const user = await ctx.service.user.find('5b7d6fe7fd77180d35faaebb')
    const user = await ctx.model.User.find({mobile: payload.mobile })
    payload.password = await this.ctx.genHash(payload.password)
    return ctx.model.User.findByIdAndUpdate(user[0]._id, payload)
  }
  // update======================================================================================================>
  async update(_id, payload) {
    const { ctx, service } = this
    const user = await ctx.service.user.find(_id)
    if (!user) {
      ctx.throw(404, 'user not found')
    }
    return ctx.model.User.findByIdAndUpdate(_id, payload)
  }
  // show======================================================================================================>
  async show(_id) {
    const user = await this.ctx.service.user.find(_id)
    if (!user) {
      this.ctx.throw(404, 'user not found')
    }
    return this.ctx.model.User.findById(_id)
    // return this.ctx.model.User.findById(_id).populate('role').populate('club')
  }

  // index======================================================================================================>
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
    // 整理数据源 -> Ant Design Pro
    // console.log(res)
    let data = res.map((e,i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.password = 'this is password'
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })
    // console.log(data)
    return { total: count, rows: data, pageSize: Number(pageSize), pageNo: Number(pageNo) }
  }

  // index======================================================================================================>
  async index(payload) {
    const { pageNo, pageSize, isPaging, search,vip } = payload
    let res = []
    let count = 0
    let skip = ((Number(pageNo)) - 1) * Number(pageSize || 10)
    
    if(true) {
      if(search) {
        if(vip){
          res = await this.ctx.model.User.find({vip:vip,realName: { $regex: search } ,role:"user"}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
          count = res.length
        }else{
          res = await this.ctx.model.User.find({realName: { $regex: search } ,role:"user"}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
          count = res.length
        }
        
      } else {
        if(vip){
          res = await this.ctx.model.User.find({vip:vip,role:"user"}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
          count = await this.ctx.model.User.count({}).exec()
        }else{
          res = await this.ctx.model.User.find({role:"user"}).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
          count = await this.ctx.model.User.count({}).exec()
        }
        
      }
    } else {
      if(search) {
        if(vip){
          res = await this.ctx.model.User.find({vip:vip,realName: { $regex: search } ,role:"user"}).sort({ createdAt: -1 }).exec()
          count = res.length
        }else{
          res = await this.ctx.model.User.find({realName: { $regex: search } ,role:"user"}).sort({ createdAt: -1 }).exec()
          count = res.length
        }
        
      } else {
        if(vip){
          res = await this.ctx.model.User.find({vip:vip,role:"user"}).sort({ createdAt: -1 }).exec()
          count = await this.ctx.model.User.count({}).exec()
        }else{
          res = await this.ctx.model.User.find({role:"user"}).sort({ createdAt: -1 }).exec()
          count = await this.ctx.model.User.count({}).exec()
        }
        
      }
    }

    
    // 整理数据源 -> Ant Design Pro
    // console.log(res)
    let data = res.map((e,i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.password = 'this is password'
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })
    // console.log(data)
    return { total: count, rows: data, pageSize: Number(pageSize), pageNo: Number(pageNo) }
  }

   // index======================================================================================================>
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

    
    // 整理数据源 -> Ant Design Pro
    // console.log(res)
    let data = res.map((e,i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.password = 'this is password'
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })
    // console.log(data)
    return { total: count, rows: data, pageSize: Number(pageSize), pageNo: Number(pageNo) }
  }

  // allAdmin======================================================================================================>
  async allAdmin(payload) {
    const { pageNo, pageSize, isPaging, search,club } = payload
    let res = []
    let count = 0
    let skip = ((Number(pageNo)) - 1) * Number(pageSize || 10)
    const roleSuper = await this.ctx.service.role.findByName('admin')
    // const userAll = await this.ctx.model.User.find({role:roleSuper._id})
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
      if(search) {
        if(club){
          res = await this.ctx.model.User.find({club: club,realName: { $regex: search },role:roleSuper._id }).populate('role').populate('club').sort({ createdAt: -1 }).exec()
          count = res.length
        }else{
          res = await this.ctx.model.User.find({realName: { $regex: search },role:roleSuper._id }).populate('role').populate('club').sort({ createdAt: -1 }).exec()
          count = res.length
        }
        
      } else {
        if(club){
          res = await this.ctx.model.User.find({club: club,role:roleSuper._id}).populate('role').populate('club').sort({ createdAt: -1 }).exec()
          count = await this.ctx.model.User.count({role:roleSuper._id}).exec()
        }else{
          res = await this.ctx.model.User.find({role:roleSuper._id}).populate('role').populate('club').sort({ createdAt: -1 }).exec()
          count = await this.ctx.model.User.count({role:roleSuper._id}).exec()
        }
        
      }
    }
    // 整理数据源 -> Ant Design Pro
    let data = res.map((e,i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.password = 'this is password'
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })
    return { total: count, rows: data, pageSize: Number(pageSize), pageNo: Number(pageNo) }
  }
  // allCoach======================================================================================================>
  async allCoach(payload) {
    const { pageNo, pageSize, isPaging, search, club } = payload
    let res = []
    let count = 0
    let skip = ((Number(pageNo)) - 1) * Number(pageSize || 10)
    const roleSuper = await this.ctx.service.role.findByName('coach')
    // const userAll = await this.ctx.model.User.find({role:roleSuper._id})
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
      if(search) {
        if(club){
          res = await this.ctx.model.User.find({club: club,realName: { $regex: search },role:roleSuper._id }).populate('role').populate('club').sort({ createdAt: -1 }).exec()
          count = res.length
        }else{
          res = await this.ctx.model.User.find({realName: { $regex: search },role:roleSuper._id }).populate('role').populate('club').sort({ createdAt: -1 }).exec()
          count = res.length
        }
        
      } else {
        if(club){
          res = await this.ctx.model.User.find({club: club,role:roleSuper._id}).populate('role').populate('club').sort({ createdAt: -1 }).exec()
          count = await this.ctx.model.User.count({role:roleSuper._id}).exec()
        }else{
          res = await this.ctx.model.User.find({role:roleSuper._id}).populate('role').populate('club').sort({ createdAt: -1 }).exec()
          count = await this.ctx.model.User.count({role:roleSuper._id}).exec()
        }
        
      }
    }
    // 整理数据源 -> Ant Design Pro
    let data = res.map((e,i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.password = 'this is password'
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })
    return { total: count, rows: data, pageSize: Number(pageSize), pageNo: Number(pageNo) }
  }
  // allUser======================================================================================================>
  async allUser(payload) {
    const { pageNo, pageSize, isPaging, search, club } = payload
    let res = []
    let count = 0
    let skip = ((Number(pageNo)) - 1) * Number(pageSize || 10)
    const roleSuper = await this.ctx.service.role.findByName('user')
    // const userAll = await this.ctx.model.User.find({role:roleSuper._id})
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
      if(search) {
        if(club){
          res = await this.ctx.model.User.find({club: club,realName: { $regex: search },role:roleSuper._id }).populate('role').populate('club').sort({ createdAt: -1 }).exec()
          count = res.length
        }else{
          res = await this.ctx.model.User.find({realName: { $regex: search },role:roleSuper._id }).populate('role').populate('club').sort({ createdAt: -1 }).exec()
          count = res.length
        }
        
      } else {
        if(club){
          res = await this.ctx.model.User.find({club: club,role:roleSuper._id}).populate('role').populate('club').sort({ createdAt: -1 }).exec()
          count = await this.ctx.model.User.count({role:roleSuper._id}).exec()
        }else{
          res = await this.ctx.model.User.find({role:roleSuper._id}).populate('role').populate('club').sort({ createdAt: -1 }).exec()
          count = await this.ctx.model.User.count({role:roleSuper._id}).exec()
        }
        
      }
    }
    // 整理数据源 -> Ant Design Pro
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
    console.log(user)
    if (!user) {
      ctx.throw(404, 'user is not found')
    }
    let values = {}
    values.password = await ctx.genHash('1234')
    return ctx.model.User.findByIdAndUpdate(id, values)
    
  }

  // Commons======================================================================================================>
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
