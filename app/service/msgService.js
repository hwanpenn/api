'use strict'

const Service = require('egg').Service

class msgService extends Service {
  async getMsg(mobile) {
    let rnd=''
    if(mobile.substr(0, 2)==='04'){
      const SMSSDK = require('transmitsms-node-sdk').transmitsms
      let SMS = new SMSSDK()

      rnd=''
      for(let i=0;i<4;i++)
        rnd+=Math.floor(Math.random()*10)

      let message = {
        Authorization : 'Basic ' + Buffer.from('4d7de74a6b14003cd99e80aa965baad4:jetek.com').toString('base64'),
        message : '【十周挑战】您正在申请短信验证码，如非本人操作，请忽略本短信，验证码：'+rnd,
        to : '+61'+mobile
      }

      SMS.send(message).then(function fulfill(result){
        console.log(result)
      },function reject(result){
        console.log(result)
      })

    }else{
    console.log("alibaba手机号：------------------------------"+mobile)
    const SMSClient = require('@alicloud/sms-sdk')
    // const accessKeyId = 'LTAIjVuxkAGRsy4J'
    const accessKeyId = 'LTAIpuiRDF3EdnkC'
    // const secretAccessKey = 'DC2U5TvXcFKfH1AAaeTVTPFazVD1E6'
    const secretAccessKey = 'BZllFazyiPiwCHma7lkvaxqnrwq2LO'
    const smsClient = new SMSClient({ accessKeyId, secretAccessKey })

    rnd=''
    for(let i=0;i<4;i++)
      rnd+=Math.floor(Math.random()*10)

    //阿里
    smsClient.sendSMS({
      PhoneNumbers: mobile,
      SignName: '十周挑战APP',
      TemplateCode: 'SMS_164509157',
      TemplateParam: '{"code":"'+rnd+'"}',
    }).then(function(res) {
      const { Code } = res
      if (Code === 'OK') {
        console.log(res)
      }
    }, function(err) {
      console.log(err)
    })

    }

    return { code: rnd }
  }
}

module.exports = msgService
