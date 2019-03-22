'use strict'

const Controller = require('egg').Controller

class msgsController extends Controller {
  // async list() {
  //   const dataList = {
  //     list: [
  //       { id: 1, title: 'this is news 1', url: '/news/1' },
  //       { id: 2, title: 'this is news 2', url: '/news/2' },
  //     ],
  //   };
  //   await this.ctx.render('news/list.tpl', dataList);
  // }
  // async list1() {
  //   const ctx = this.ctx;
  //   const page = ctx.query.page || 1;
  //   const newsList = await ctx.service.news.list(page);
  //   await ctx.render('news/list.tpl', { list: newsList });
  // }
  constructor(ctx) {
    super(ctx)

    this.createRule = {
      mobile: { type: 'string', required: true, allowEmpty: false },
    }

  }
  async getMsg() {
    const ctx = this.ctx
    const payload = ctx.request.body || {}
    // const { mobile } = ctx.params
    // console.log(payload)
    // console.log(ctx.params)
    // console.log(mobile)
    // console.log('开始调用')
    // let rnd = ''
    // rnd = ctx.service.msgService.getMsg(payload.mobile)
    const res = await ctx.service.msgService.getMsg(payload.mobile)
    // console.log('调用完成')
    ctx.helper.success({ctx, res})
  }
}

module.exports = msgsController

