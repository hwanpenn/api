const Controller = require('egg').Controller

class UserController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.UserUpdateTransferByMobile = {
      mobile: {type: 'string', required: true, allowEmpty: false, format: /^[0-9]{8,12}$/},
      password: {type: 'password', required: true, allowEmpty: false, min: 6},
    }
    this.UserCreateTransfer = {
      mobile: {type: 'string', required: false, allowEmpty: false, format: /^[0-9]{8,12}$/},
      password: {type: 'password', required: false, allowEmpty: false, min: 4},
      realName: {type: 'string', required: false, allowEmpty: false, }
    }

    this.UserUpdateTransfer = {
      mobile: { type: 'string', required: false, allowEmpty: false },
    }
  }

  // 创建用户
  async create() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.UserCreateTransfer)
    // 组装参数
    const payload = ctx.request.body || {}
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
    await service.user.updatebyMobile(payload)
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
    // 调用 Service 进行业务处理
    const res = await service.user.show(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 获取所有用户(分页/模糊)
  async index() {
    
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.user.index(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  async indexCoach() {
    
    const { ctx, service } = this
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
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.user.sortbyweight(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 获取所有用户(分页/模糊)
  async index1() {
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
    const { ctx, service } = this
    // 校验参数
    const { id } = ctx.params
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
    var buffer = xlsx.build(data)
    fs.writeFile('./resut.xls', buffer, function (err)
    {
      if (err)
        throw err
      xlsx.parse('./' + 'resut.xls')
      var obj1 = xlsx.parse('/Users/hwanpenn/Documents/10week/10week-api/test.xlsx')
      // console.log(JSON.stringify(obj))
    }
    )
    ctx.helper.success({ctx})
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
