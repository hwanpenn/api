'use strict'

/**
 * 云通信基础能力业务短信发送、查询详情以及消费消息示例，供参考。
 * Created on 2017-07-31
 */

const Service = require('egg').Service

class msgService extends Service {
  async getMsg(mobile) {

    //阿里
    const SMSClient = require('@alicloud/sms-sdk')
    const accessKeyId = 'LTAIjVuxkAGRsy4J'
    const secretAccessKey = 'DC2U5TvXcFKfH1AAaeTVTPFazVD1E6'
    const smsClient = new SMSClient({ accessKeyId, secretAccessKey })
    //sms
    // const SMSSDK = require('transmitsms-node-sdk').transmitsms
    // let SMS = new SMSSDK()

    let rnd=''
    for(let i=0;i<4;i++)
      rnd+=Math.floor(Math.random()*10)

    let message = {
      Authorization : 'Basic ' + new Buffer('4d7de74a6b14003cd99e80aa965baad4:jetek.com').toString('base64'),
      message : '十周挑战，验证码：'+rnd,
      to : mobile.substr(0, 2)=='04'?mobile:'+86'+mobile
    }

    // SMS.send(message).then(function fulfill(result){
    //   // console.log("手机号：------------------------------"+mobile)
    //   console.log(result)
    // //logic handle succes
    // },function reject(result){
    //   console.log(result)
    // //logic to handle failure
    // })
    //阿里
    smsClient.sendSMS({
      PhoneNumbers: mobile.substr(0, 2)=='04'?'61'+mobile:mobile,
      SignName: '黄鹏',
      TemplateCode: 'SMS_141905004',
      TemplateParam: '{"code":"'+rnd+'"}',
    }).then(function(res) {
      const { Code } = res
      if (Code === 'OK') {
        console.log(res)
      }
    }, function(err) {
      console.log(err)
    })
    return { code: rnd }
  }
}

module.exports = msgService
