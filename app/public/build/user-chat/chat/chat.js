function encryptData(data, publicKey){            
  data = JSON.stringify(data)
  var encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  var encrypted = encrypt.encrypt(data);
  encrypted=encodeURIComponent(encrypted) 
  encrypted=encodeURIComponent(encrypted) 
  return encrypted;
} 
function parseQueryString(url){
  var obj = {};
  var keyvalue = [];
  var key = "",
      value = "";
  var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
  for (var i in paraString) {
      keyvalue = paraString[i].split("=");
      key = keyvalue[0];
      value = keyvalue[1];
      obj[key] = value;
  }
  return obj;
}



var socket = '';
var tenantId = "502883989623668736";
var group = '502883989623668736'
var publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDRoXWHKSkmbrar8+xstOgOl2VNM8PARvbFSlFepiFnqv7Arc1zpjkVUYDRauagZEabxrmja8phaRMy9NW3/IpEZhBzUQpwNVriOYH8YmZ1hLrrOxFeAtqv43DwUo7ah2hzRYMIUi0KFssGYPaFMAueIXQO7a3jHERcfaleUS1R/QIDAQAB'
var resStatus = ''
var userId = 'userId'+Math.round(500*Math.random());
var userName = 'userName'+Math.round(500*Math.random());
var enterpriseCode = "502883989623668736";
var tenantId = "502883989623668736";
var group = '502883989623668736'
//机器人服务地址
var robotHttpUrl = "http://192.168.21.198:5000"
//客服系统后台服务地址
var serviceUrl = "http://192.168.21.198:8013"
//转人工服务地址
var robotSocketUrl = "ws://192.168.21.198:9322"
var nginxUrl = "http://192.168.21.157:8081"
// robotSocketUrl='ws://'+window.location.host.split(":")[0]+':9322';
// console.log(robotSocketUrl)

window.onload=function(){
  var obj = parseQueryString(window.location.href)
    enterpriseCode = obj.tenantId
    tenantId = obj.tenantId
    group = obj.tenantId
    userId = obj.userId
    userName = obj.userName
    var element = document.getElementById("urlData");
    var para1 = document.createElement("p");
    var para2 = document.createElement("p");
    var para3 = document.createElement("p");
    var tenantIdText = document.createTextNode("中心id---"+tenantId);
    para1.appendChild(tenantIdText);
    var userIdText = document.createTextNode("用户id---"+userId);
    para2.appendChild(userIdText);
    var userNameText = document.createTextNode("用户名---"+userName);
    para3.appendChild(userNameText);
    element.appendChild(para1);
    element.appendChild(para2);
    element.appendChild(para3);
}


function refreshCount() {
  console.log('heartbeat')
  socket.send('heartbeat');  
}
function reconnected() {
  console.log("重连websocket")
  socket = new WebSocket(robotSocketUrl+"?systemName="+tenantId+"&sign="+encryptValue);  
}
function refreshSocket() {
  console.log('refreshSocket')
  // console.log('refreshSocket--'+group+'--'+publicKey+'--'+tenantId)
  var dataTemp = {role:'1',operationType:'5',type:'11',group:group};
  // var dataTempValue = encryptData(dataTemp,publicKey)
  // socket.send(JSON.stringify({"systemName":tenantId,"sign":dataTempValue})); 
  socket.send(JSON.stringify(dataTemp)); 
}
function initRobotConfig(layim,userName,userId){
  //窗口配置
  layim.config({
    tool: [
    {
      alias: 'start'
      ,title: '人工服务'
      ,icon: '人工服务'
    }],
    init: {
      mine: {
        "username": userName
        ,"id": 2222
        ,"status": "online"
        ,"remark": "客户"
        ,"avatar": nginxUrl+"/user-chat/chat/picture/yonghu.png"
      }
      ,friend: []
      ,group: []
    },
    brief: true,
    voice:false,
    minRight: '0px'
  });
}
layui.use('layim', function(layim){
  var ipTemp = window.location.host;
  var portTemp = window.location.port;
  // userId = 
  //   userName = 
  
  var data = {userId:userId,userName:userName};
  var encryptValue = encryptData(data,publicKey) 
  var status = '';
  
  var uniqueKey = ''
  var timer = ''
  var timerHeartbeat = ''
  var reconnectWebsocket = ''
  var reconnectedWebsocket = false
  var refreshMapping = ''
  var resrows = ''
  var robotShowName = ''
  var isSetByUser = false

  var chatStatus = 'robot'
  var chatServiceData = ''
  //初始化机器人
  initRobotConfig(layim,userName,userId)


  layim.on('tool(advice)', function(insert, send, obj){ 
    layer.prompt({
      title: '建议'
      ,formType: 2
      ,shade: 0
    }, function(text, index){
      layer.close(index);
      // alert("已提交客服人员，提示内容："+text)
    });
  });
  layim.on('tool(start)', function(insert, send, obj){ 
    // chatStatus = 'service'
    var params = {enterpriseCode:enterpriseCode,sortNum:'',source:'1'}
      $.ajax({
        type : "get", 
        async:false,
        url : serviceUrl+"/cs/api/robot/achieveChatWindow", 
        data: params,
        success : function(res){ 
            if(res.rows.isWork==='0'){
              var obj1 = {};
              obj1 = {
                username: robotShowName
                ,avatar: nginxUrl+"/user-chat/chat/picture/xiaoyue.png"
                ,id: 2222
                ,type: "robot"
                ,content: "客服已经下班了"
              }
              layim.getMessage(obj1);
            }else{
              if(socket===''){
                if(reconnectedWebsocket){
                  
                }else{
                  console.log("发起websocket")
                  socket = new WebSocket(robotSocketUrl+"?systemName="+tenantId+"&sign="+encryptValue);  
                };
              socket.onopen = function (evt) {
                console.log("连接成功")
                console.log(reconnectedWebsocket)
                isSetByUser=false
                if(!reconnectedWebsocket){
                  obj = {
                    username: robotShowName
                    ,avatar: nginxUrl+"/user-chat/chat/picture/xiaoyue.png"
                    ,id: 2222
                    ,type: "robot"
                    ,content: "正在转人工服务..."
                  }
                  layim.getMessage(obj); 
                }else{
                  obj = {
                    username: robotShowName
                    ,avatar: nginxUrl+"/user-chat/chat/picture/xiaoyue.png"
                    ,id: 2222
                    ,type: "robot"
                    ,content: "重连成功"
                  }
                  layim.getMessage(obj); 
                  window.clearInterval(reconnected);
                };
                reconnectedWebsocket=false
                var dataTemp = {role:'1',operationType:'0',type:'11',group:group};
                // var dataTempValue = encryptData(dataTemp,publicKey)
                // socket.send(JSON.stringify({"systemName":tenantId,"sign":dataTempValue})); 
                socket.send(JSON.stringify(dataTemp)); 
                timerHeartbeat=window.setInterval(refreshCount, 5000); 
            }
              socket.onclose = function (evt) {
                if(resStatus==='7'){
                  var obj = {};
                  obj = {
                    username: robotShowName
                    ,avatar: nginxUrl+"/user-chat/chat/picture/xiaoyue.png"
                    ,id: 2222
                    ,type: "robot"
                    ,content: "已取消转人工服务"
                  }
                  layim.getMessage(obj);
                }else{
                  console.log("断开链接")
                  window.clearInterval(timerHeartbeat);
                  if(isSetByUser){
                    chatStatus = 'robot'
                    socket = ''
                  }else{
                    var obj = {};
                    obj = {
                      username: robotShowName
                      ,avatar: nginxUrl+"/user-chat/chat/picture/xiaoyue.png"
                      ,id: 2222
                      ,type: "robot"
                      ,content: "非常抱歉，连接断开了，正在尝试重连"
                    }
                    layim.getMessage(obj);
                    // reconnectedWebsocket=true
                    // reconnectWebsocket=window.setInterval(reconnected, 5000); 
                    reconnectedWebsocket=true
                    socket===''
                  // reconnectWebsocket=window.setInterval(reconnected(layim), 5000); 
                  // reconnected()
                  // var data = {userId:userId,userName:userName};
                  // var encryptValue = encryptData(data,publicKey) 
                  // console.log("重连websocket")
                  // socket = new WebSocket(robotSocketUrl+"?systemName="+tenantId+"&sign="+encryptValue);
                  // addEnent(socket,'',layim)
                  }
                }
                status='0'
              };
              socket.onerror = function(evt){
                // doing something
                console.log(evt)
              };
              socket.onmessage = function (evt) {
                var data = JSON.parse(evt.data)
                console.log('用户端socket数据包')
                console.log(data);
                if(data.type==='16'){
                  // isLoginOnOtherPlace = true
                  var obj = {};
                      obj = {
                        username: robotShowName
                        ,avatar: nginxUrl+"/service-chat/chat/picture/xiaoyue.png"
                        ,id: 2222
                        ,type: "robot"
                        ,content: '您已在其他地方登录'
                      }
                      layim.getMessage(obj);
                  // console.log('type=====16')
                }
                if(data.status===3){
                  
                  // status=data.status
                  // var obj = {};
                  // obj = {
                  //   username: robotShowName
                  //   ,avatar: nginxUrl+"/user-chat/chat/picture/xiaoyue.png"
                  //   ,id: 2222
                  //   ,type: "robot"
                  //   ,content: '已为您成功转人工服务'
                  // }
                  // layim.getMessage(obj);
                }else if(data.status===0){
                  status=data.status
                  refreshMapping=window.setInterval(refreshSocket, 3000);
                }else if(data.status===4){
                  //正在匹配中
                  var obj = {};
                    obj = {
                      username: robotShowName
                      ,avatar: nginxUrl+"/user-chat/chat/picture/xiaoyue.png"
                      ,id: 2222
                      ,type: "robot"
                      ,content: '队列前还有'+data.waitingCount+'位用户'
                    }
                    layim.getMessage(obj);
                }else if(data.status===7){
                  resStatus = '7'
                  window.clearInterval(refreshMapping);
                  socket.close();
                  //正在匹配中
                  var obj = {};
                  obj = {
                    username: robotShowName
                    ,avatar: nginxUrl+"/user-chat/chat/picture/xiaoyue.png"
                    ,id: 2222
                    ,type: "robot"
                    ,content: resrows.failApologySentence
                  }
                  layim.getMessage(obj);
                }else if(data.status===5){
                  var obj = {};
                  obj = {
                    username: robotShowName
                    ,avatar: nginxUrl+"/user-chat/chat/picture/xiaoyue.png"
                    ,id: 2222
                    ,type: "robot"
                    ,content: '已为您分配'+data.customerCode+'号客服：'+data.customerName
                  }
                  layim.getMessage(obj);
                  chatServiceData = data
                  chatStatus = 'service'
                  console.log('清楚定时器')
                  window.clearInterval(refreshMapping);
                  // status=data.status
                  // if(data.waitingCount===0||data.waitingCount==='0'){
                  //   var obj = {};
                  // obj = {
                  //   username: robotShowName
                  //   ,avatar: nginxUrl+"/user-chat/chat/picture/xiaoyue.png"
                  //   ,id: 2222
                  //   ,type: "robot"
                  //   ,content: resrows.apologySentence
                  // }
                  // layim.getMessage(obj);
                  // }else{
                  //   var obj = {};
                  //   obj = {
                  //     username: robotShowName
                  //     ,avatar: nginxUrl+"/user-chat/chat/picture/xiaoyue.png"
                  //     ,id: 2222
                  //     ,type: "robot"
                  //     ,content: '队列前还有'+data.waitingCount+'位用户'
                  //   }
                  //   layim.getMessage(obj);
                  // }
                  
                }else if(data.status===1){
                  // var obj = {};
                  // obj = {
                  //   username: robotShowName
                  //   ,avatar: nginxUrl+"/user-chat/chat/picture/xiaoyue.png"
                  //   ,id: 2222
                  //   ,type: "robot"
                  //   ,content: '已为您分配'+data.customerCode+'号客服：'+data.customerName
                  // }
                  // layim.getMessage(obj);
                  // chatServiceData = data
                  // chatStatus = 'service'
                  // window.sessionStorage.setItem('chatstatus',data.status)
                }else if(data.status===6){
                  // window.clearTimeout(timerHeartbeat);
                  // window.clearInterval(timerHeartbeat);
                  status='0'
                  var obj = {};
                  obj = {
                    username: robotShowName
                    ,avatar: nginxUrl+"/user-chat/chat/picture/xiaoyue.png"
                    ,id: 2222
                    ,type: "robot"
                    ,content: '服务结束'
                  }
                  layim.getMessage(obj);
                  isSetByUser=true
                  socket.close(); 
                  chatStatus = 'robot'
                  // status = '2'
                  // chatServiceData = data
                }else{
                  if(data.respType==='2'){
                    var obj = {};
                    obj = {
                      username: data.fromUserName
                      ,avatar: nginxUrl+"/user-chat/chat/picture/ktkf.png"
                      ,id: 2222
                      ,type: "robot"
                      ,content: data.content
                    }
                    layim.getMessage(obj);
                    var dataTemp = {type:'10',uqIdentNo:data.uqIdentNo};
                    // console.log(dataTemp)
                    // var dataTempValue = encryptData(dataTemp,publicKey)
                    // socket.send(JSON.stringify({"systemName":tenantId,"sign":dataTempValue})); 
                    socket.send(JSON.stringify(dataTemp)); 
                  }
                }
                };
            }else{
              if(status==='7'){
                layui.use('layer', function(){
                  layer = layui.layer; 
                  layer.msg('客服不在线，请稍后再试', {
                    time: 1000, 
                  });
                })
              }else{
                if(status==='0'){
                  layui.use('layer', function(){
                    layer = layui.layer; 
                    layer.msg('连接已断开，请刷新页面重试', {
                      time: 1000, 
                    });
                  })
                }else{
                  layui.use('layer', function(){
                    layer = layui.layer; 
                    layer.msg('已转人工服务', {
                      time: 1000, 
                    });
                  })
                }
              }
              
            }
            }
        } 
    }); 

    
  });

  layim.chat({
    name: '在线咨询'
    ,type: 'robot'
    ,avatar: '/user-chat/chat/picture/xiaoyue.png'
    ,id: 2222
  });
  layim.setChatMin();

  var $ = layui.jquery;
  $('.layim-chat-main').children("ul").children("li").remove();
  $('#mytempid').on('click', function(){
    // var obj = parseQueryString(window.location.href)
    // enterpriseCode = obj.tenantId
    // tenantId = obj.tenantId
    // group = obj.tenantId
    // userId = obj.userId
    // userName = obj.userName
    // var element = document.getElementById("urlData");
    // var para1 = document.createElement("p");
    // var para2 = document.createElement("p");
    // var para3 = document.createElement("p");
    // var tenantIdText = document.createTextNode("中心id---"+tenantId);
    // para1.appendChild(tenantIdText);
    // var userIdText = document.createTextNode("用户id---"+userId);
    // para2.appendChild(userIdText);
    // var userNameText = document.createTextNode("用户名---"+userName);
    // para3.appendChild(userNameText);
    // element.appendChild(para1);
    // element.appendChild(para2);
    // element.appendChild(para3);
    // console.log('打印url路径')
    // console.log(window.location.href)
    // console.log('打印参数')
    // console.log(obj)

    window.onbeforeunload = function(){
      status='0'
      var dataTemp = {role:'0',operationType:'4',type:'11',group:group,overUserId:chatUserData.userId};
      // var dataTempValue = encryptData(dataTemp,publicKey)
      // socket.send(JSON.stringify({"systemName":tenantId,"sign":dataTempValue}));  
      socket.send(JSON.stringify(dataTemp));  
    } 

    console.log('初始化socket---空值')
    console.log(socket)
    //去sessionstorage里去权限数据 publicKey group enterpriseCode userId
    // enterpriseCode = window.sessionStorage.getItem('tenantId')
    // tenantId = window.sessionStorage.getItem('tenantId')
    // group = window.sessionStorage.getItem('tenantId')
    // userId = window.sessionStorage.getItem('userId')
    // userName = window.sessionStorage.getItem('userName')
    //更新机器人
    // var timestamp = Date.parse(new Date());
    // userId = 'userid'+Math.round(500*Math.random())
    // userName = 'userName'+Math.round(500*Math.random())
    initRobotConfig(layim,userName,userId)

    var params = {enterpriseCode:enterpriseCode,sortNum:'',source:'1'}
      $.ajax({
        type : "get", 
        async:false,
        url : serviceUrl+"/cs/api/robot/achieveChatWindow", 
        data: params,
        success : function(res){ 
            resrows = res.rows
            uniqueKey = resrows.robotId
            console.log(resrows)
            var obj1 = {};
            robotShowName = resrows.robotShowName===''?robotShowName:resrows.robotShowName
            obj1 = {
              username: robotShowName
              ,avatar: nginxUrl+"/user-chat/chat/picture/xiaoyue.png"
              ,id: 2222
              ,type: "robot"
              ,content: resrows.welcomeSentence===''?'连接成功，很高兴为您服务':resrows.welcomeSentence
            }
            layim.getMessage(obj1);
        } 
    }); 

    var cache =  layui.layim.cache();
    if(cache.chatlog!==undefined){
      delete cache.chatlog;
    }
    var local = layui.data('layim')[cache.mine.id];
    if(local.chatlog!==undefined){
      delete local.chatlog;
    }
    layui.data('layim', {
      key: cache.mine.id
      ,value: local
    });

    layim.on('sendMessage', function(data){

      var value = data.mine.content;
      var sendValue = {message:value,uniqueKey:uniqueKey,userId:userId,userName:userName,enterpriseCode:enterpriseCode,apologySentence:resrows.apologySentence}
      // socket.send(sendValue);
      if(chatStatus==='robot'){
        $.ajax({
          type : "post", 
          async:false,
          url : robotHttpUrl+"/bot/chat", 
          data: sendValue, 
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(sendValue),
          dataType: "json",
          success : function(msg){ 
            var primitiveAnswer = msg.answer
            if(primitiveAnswer==='DEFAULT_PROMPT_MESSAGE'){
              var obj = {};
              obj = {
                  username: robotShowName
                  ,avatar: nginxUrl+"/user-chat/chat/picture/xiaoyue.png"
                  ,id: 2222
                  ,type: "robot"
                  ,content: resrows.apologySentence===''?'不明白你说的什么，回头我去问问':resrows.apologySentence
              }
              layim.getMessage(obj);
            }else{
              var modifyAnswer = ''
              var arr= primitiveAnswer.split("<br/>")
              // console.log(arr)
              var j ;
              var len=arr.length;
              if(len===1){
                  modifyAnswer = primitiveAnswer;
              }else {
                  for(j = 0; j < len; j++) {
                      modifyAnswer = modifyAnswer + arr[j] + "\n"
                  }
              }
              // console.log(modifyAnswer)
              var obj = {};
              obj = {
                  username: robotShowName
                  ,avatar: nginxUrl+"/user-chat/chat/picture/xiaoyue.png"
                  ,id: 2222
                  ,type: "robot"
                  ,content: modifyAnswer
              }
              layim.getMessage(obj);
            }
          } 
        });
      }else{
        socket.send(sendValue);
        var dataTemp = {content:data.mine.content,toUserId:chatServiceData.customerCode,toUserName:chatServiceData.customerName,type:'3',uqIdentNo:Date.parse(new Date())};
        // console.log(dataTemp)
        // var dataTempValue = encryptData(dataTemp,publicKey)
        // socket.send(JSON.stringify({"systemName":tenantId,"sign":dataTempValue})); 
        socket.send(JSON.stringify(dataTemp)); 
      }
       
    });
  });
});
// console.log('设置dispaly')
// document.getElementById("layui-layer2").style.display='none'