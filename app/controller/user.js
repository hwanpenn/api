const Controller = require('egg').Controller

class UserController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.UserUpdateTransferByMobile = {
      mobile: {type: 'string', required: true, allowEmpty: false, format: /^[0-9]{11}$/},
      password: {type: 'password', required: true, allowEmpty: false, min: 6},
      // realName: {type: 'string', required: true, allowEmpty: false, }
      // realName: {type: 'string', required: true, allowEmpty: false, format: /^[\u2E80-\u9FFF]{2,6}$/}
    }
    this.UserCreateTransfer = {
      mobile: {type: 'string', required: false, allowEmpty: false, format: /^[0-9]{11}$/},
      password: {type: 'password', required: false, allowEmpty: false, min: 4},
      realName: {type: 'string', required: false, allowEmpty: false, }
      // realName: {type: 'string', required: true, allowEmpty: false, format: /^[\u2E80-\u9FFF]{2,6}$/}
    }

    this.UserUpdateTransfer = {
      mobile: { type: 'string', required: false, allowEmpty: false },
      // realName: {type: 'string', required: true, allowEmpty: false, format: /^[\u2E80-\u9FFF]{2,6}$/}
    }
  }

  // 创建用户
  async create() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.UserCreateTransfer)
    // 组装参数
    const payload = ctx.request.body || {}
    // console.log('7777777777')
    // console.log(payload)
    // 调用 Service 进行业务处理
    const res = await service.user.create(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 创建用户
  async createAdmin() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.UserCreateTransfer)
    // 组装参数
    const payload = ctx.request.body || {}
    // console.log('7777777777')
    // console.log(payload)
    // 调用 Service 进行业务处理
    const res = await service.user.createAdmin(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 删除单个用户
  async destroy() {
    const { ctx, service } = this
    // 校验参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    await service.user.destroy(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }

  // 修改用户
  async updateByMobile() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.UserUpdateTransferByMobile)
    // 组装参数
    // const { mobile } = ctx.params
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    // console.log('拿到的数据')
    // console.log(mobile)
    // console.log(payload)
    await service.user.updatebyMobile(payload)
    // console.log(result)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }
  // 修改用户
  async update() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.UserUpdateTransfer)
    // 组装参数
    const { id } = ctx.params
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    await service.user.update(id, payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }

  // 获取单个用户
  async show() {
    const { ctx, service } = this
    // 组装参数
    const { id } = ctx.params
    console.log('-----------------------------')
    console.log(id)
    // 调用 Service 进行业务处理
    const res = await service.user.show(id)
    // console.log('-----------------------------')
    // console.log(res)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 获取所有用户(分页/模糊)
  async index() {
    
    console.log('here------------')
    const { ctx, service } = this
    // const password = await ctx.genHash('1234')
    // console.log(password)
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.user.index(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 获取所有教练用户(分页/模糊)
  async indexCoach() {
    
    console.log('indexcoach here------------')
    const { ctx, service } = this
    // const password = await ctx.genHash('1234')
    // console.log(password)
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.user.indexCoach(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 获取所有用户(分页/模糊)
  async test() {
    const res = {"hwan":"penn"}
    const { ctx } = this
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }
  // 获取所有用户(分页/模糊)
  async sortbyweight() {
    
    console.log('here------------')
    const { ctx, service } = this
    // const password = await ctx.genHash('1234')
    // console.log(password)
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.user.sortbyweight(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 获取所有用户(分页/模糊)
  async index1() {
    // console.log('here------------')
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.user.index(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 获取所有管理员(分页/模糊)
  async allAdmin() {
    // console.log('here------------')
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.user.allAdmin(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 获取所有教练(分页/模糊)
  async allCoach() {
    // console.log('here------------')
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.user.allCoach(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 获取所有教练(分页/模糊)
  async allUser() {
    // console.log('here------------')
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.user.allUser(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 删除所选用户(条件id[])
  async removes() {
    const { ctx, service } = this
    // 组装参数
    // const payload = ctx.queries.id
    const { id } = ctx.request.body
    const payload = id.split(',') || []
    // 调用 Service 进行业务处理
    const result = await service.user.removes(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }

  // 重置单个用户
  async resetPsd() {
    // console.log('resetPsd------------resetPsd-------------')
    const { ctx, service } = this
    // 校验参数
    const { id } = ctx.params
    // console.log(id)
    // 调用 Service 进行业务处理
    await service.user.resetPsd(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }

  // 导入xls
  async importXls() {
    const { ctx, service } = this
    const xlsx = require('node-xlsx')
    const fs = require('fs')
    const data = [
      {name : 'sheet1',data : [
        ['ID','Name','Score'],
        [
          '1',
          'Michael',
          '99'

        ],
        [
          '2',
          'Jordan',
          '98'
        ]
      ]
      },
      {
        name : 'sheet2',
        data : [
          [
            'AA',
            'BB'
          ],
          [
            '23',
            '24'
          ]
        ]
      }]
    // 写xlsx
    console.log('开始读写')
    var buffer = xlsx.build(data)
    fs.writeFile('./resut.xls', buffer, function (err)
    {
      if (err)
        throw err
      console.log('Write to xls has finished')
      
      // 读xlsx
      // var obj = xlsx.parse('./' + 'resut.xls')
      var obj1 = xlsx.parse('/Users/hwanpenn/Documents/10week/10week-api/test.xlsx')
      // console.log(JSON.stringify(obj))
      console.log(JSON.stringify(obj1))
    }
    )
    ctx.helper.success({ctx})
    // // console.log('resetPsd------------resetPsd-------------')
    // const { ctx, service } = this
    // // 校验参数
    // const { id } = ctx.params
    // // console.log(id)
    // // 调用 Service 进行业务处理
    // await service.user.resetPsd(id)
    // // 设置响应内容和响应状态码
    // ctx.helper.success({ctx})
  }
  // 导出xls
  async exportXls() {
    // // console.log('resetPsd------------resetPsd-------------')
    // const { ctx, service } = this
    // // 校验参数
    // const { id } = ctx.params
    // // console.log(id)
    // // 调用 Service 进行业务处理
    // await service.user.resetPsd(id)
    // // 设置响应内容和响应状态码
    // ctx.helper.success({ctx})
  }

}


module.exports = UserController
