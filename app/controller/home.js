const Controller = require('egg').Controller

class HomeController extends Controller {
  // async index() {
  //   this.ctx.body = `hi, egg-RESTfulAPI!
  //   A optimized Node.js RESTful API Server Template based on egg.js.
  //   https://github.com/icxcat/egg-RESTfulAPI.git`
  // }
  async index() {
    await this.ctx.render('index.html')
    // await this.ctx.render('index.js')
    // await this.ctx.render('/home.html')
  }
}

module.exports = HomeController
