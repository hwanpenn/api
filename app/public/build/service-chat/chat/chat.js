//加密
function encryptData(data, publicKey){            
  data = JSON.stringify(data)
  var encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  var encrypted = encrypt.encrypt(data);
  encrypted=encodeURIComponent(encrypted) 
  encrypted=encodeURIComponent(encrypted) 
  return encrypted;
}
//机器人服务地址
var robotHttpUrl = "http://192.168.21.198:5000"
//客服系统后台服务地址
var serviceUrl = "http://192.168.21.198:8013"
//转人工服务地址
var robotSocketUrl = "ws://192.168.21.198:9322"
var publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDRoXWHKSkmbrar8+xstOgOl2VNM8PARvbFSlFepiFnqv7Arc1zpjkVUYDRauagZEabxrmja8phaRMy9NW3/IpEZhBzUQpwNVriOYH8YmZ1hLrrOxFeAtqv43DwUo7ah2hzRYMIUi0KFssGYPaFMAueIXQO7a3jHERcfaleUS1R/QIDAQAB'
var socket = '';
var tenantId = '1112'
var userId = ""
var userName = "我"
var isLoginOnOtherPlace = false

var ipTemp = window.location.host;
var portTemp = window.location.port;
var group = ''
var enterpriseCode = ''
var chatUserData = ''
var status = ''
var timerHeartbeat = ''
var reconnectedWebsocket = false
var resrows = ''
var robotShowName = '小玥'
var isSetByUser = false
function refreshCount() {
  console.log('heartbeat')
  socket.send('heartbeat');  
}
function addEnent(socket,isDoByUser,layim){
  socket.onopen = function (evt) {
    // window.clearInterval(reconnected);
    console.log("连接成功")
    isSetByUser=false
    if(reconnectedWebsocket){
      obj = {
        username: robotShowName
        ,avatar: "/user-chat/chat/picture/xiaoyue.png"
        ,id: 2222
        ,type: "robot"
        ,content: "重连成功"
      }
      layim.getMessage(obj); 
      // window.clearInterval(reconnected);
    }else{
      
    };
    var dataTemp = {role:'0',operationType:'0',type:'11',group:group};
    // socket.emit('open', dataTemp);
    socket.send(JSON.stringify(dataTemp));
    // var dataTempValue = encryptData(dataTemp,publicKey)
    // socket.send(JSON.stringify({"systemName":tenantId,"sign":dataTempValue}));
    console.log('添加心跳')
    timerHeartbeat=window.setInterval(refreshCount, 5000);
    if(isDoByUser==='isDoByUser'){
      console.log('上线')
      var dataTemp = {role:'0',operationType:'1',type:'11',group:group};
      // socket.emit('open', dataTemp);
      socket.send(JSON.stringify(dataTemp));
      // var dataTempValue = encryptData(dataTemp,publicKey)
      // socket.send(JSON.stringify({"systemName":tenantId,"sign":dataTempValue}));  
    }  
  };
  socket.onclose = function (evt) {
      console.log("断开链接")
      // window.clearTimeout(timerHeartbeat);
      window.clearInterval(timerHeartbeat);
      if(isSetByUser){
        console.log('用户主动断开')
        socket = ''
      }else if(isLoginOnOtherPlace){

      }else{
        var obj = {};
        obj = {
          username: robotShowName
          ,avatar: "/service-chat/chat/picture/xiaoyue.png"
          ,id: 1111
          ,type: "robot"
          ,content: "非常抱歉，连接断开了，正在尝试重连"
        }
        layim.getMessage(obj);
        reconnectedWebsocket=true
        socket = ''
        // reconnectWebsocket=window.setInterval(reconnected(layim), 5000); 
        // reconnected()
        // var data = {userId:userId,userName:userName};
        // var encryptValue = encryptData(data,publicKey) 
        // console.log("重连websocket")
        // socket = new WebSocket(robotSocketUrl+"?systemName="+tenantId+"&sign="+encryptValue);
        // addEnent(socket,'',layim)
      }
  };
  socket.onerror = function(evt){
    // doing something
    console.log(evt)
  };
  socket.onmessage = function (evt) {
    // console.log('evt.data')
    // console.log(evt.data)
    // console.log(JSON.parse(evt.data))
    var data = JSON.parse(evt.data)
    if(data.type==='16'){
        isLoginOnOtherPlace = true
        var obj = {};
            obj = {
              username: robotShowName
              ,avatar: "/service-chat/chat/picture/xiaoyue.png"
              ,id: 1111
              ,type: "robot"
              ,content: '您已在其他地方登录'
            }
            layim.getMessage(obj);
        // console.log('type=====16')
    }
    console.log('客服端socket数据包')
    console.log(data);
    if(data.type==='11'){
        if(data.status===0){
            var obj = {};
            obj = {
              username: robotShowName
              ,avatar: "/service-chat/chat/picture/xiaoyue.png"
              ,id: 1111
              ,type: "robot"
              ,content: '登录成功'
            }
            layim.getMessage(obj);
            var obj1 = {};
            obj1 = {
              username: robotShowName
              ,avatar: "/user-chat/chat/picture/xiaoyue.png"
              ,id: 1111
              ,type: "robot"
              ,content: resrows.welcomeSentence===''?'连接成功，很高兴为您服务':resrows.welcomeSentence
            }
            layim.getMessage(obj1);
            // status=data.status
        }
        if(data.status===1){
            var obj = {};
            obj = {
              username: robotShowName
              ,avatar: "/chat/picture/xiaoyue.png"
              ,id: 1111
              ,type: "robot"
              ,content: '上线成功'
            }
            layim.getMessage(obj);
            status='1'
        }
        if(data.status===5){
          chatUserData = data
          // status=data.status
            var obj = {};
            obj = {
              username: robotShowName
              ,avatar: "/service-chat/chat/picture/xiaoyue.png"
              ,id: 1111
              ,type: "robot"
              ,content: '您可以开始与用户：'+chatUserData.userName+'对话了'
              // ,content: '连接成功，客户名称：'+chatUserData.userName
            }
            layim.getMessage(obj);
        }
        if(data.status===6){
            var obj = {};
            obj = {
              username: robotShowName
              ,avatar: "/service-chat/chat/picture/xiaoyue.png"
              ,id: 1111
              ,type: "robot"
              ,content: '已经结束与用户：'+chatUserData.userName+'的对话'
            }
            layim.getMessage(obj);
            // status=data.status
            chatUserData = ''
        }
        if(data.status===2){
            var obj = {};
            obj = {
              username: robotShowName
              ,avatar: "/service-chat/chat/picture/xiaoyue.png"
              ,id: 1111
              ,type: "robot"
              ,content: '已将状态改为忙碌'
            }
            layim.getMessage(obj);
            // status=data.status
        }
        if(data.status===3){
            var obj = {};
            obj = {
              username: robotShowName
              ,avatar: "/service-chat/chat/picture/xiaoyue.png"
              ,id: 1111
              ,type: "robot"
              ,content: '已成功下线'
            }
            layim.getMessage(obj);
            status='0'
            isSetByUser=true
            socket.close()
        }
    }else{
      console.log('接受数据')
      if(data.respType==='2'){
        var obj = {};
            obj = {
              username: data.fromUserName
              ,avatar: "/service-chat/chat/picture/yonghu.png"
              ,id: 1111
              ,type: "robot"
              ,content: data.content
            }
            layim.getMessage(obj);

        var dataTemp = {type:'10',uqIdentNo:data.uqIdentNo};
        // console.log(dataTemp)
        socket.send(JSON.stringify(dataTemp));
        // var dataTempValue = encryptData(dataTemp,publicKey)
        // socket.send(JSON.stringify({"systemName":tenantId,"sign":dataTempValue})); 
      }
    }
  }
}
function reconnected(layim) {
  // if(socket.readyState===1||socket.readyState==='1'){
  //   // reconnected()
  //     window.clearInterval(reconnected);
  //     addEnent(socket,'',layim)
  //   }
  var data = {userId:userId,userName:userName};
  var encryptValue = encryptData(data,publicKey) 
  console.log("重连websocket")
  socket = new WebSocket(robotSocketUrl+"?systemName="+tenantId+"&sign="+encryptValue);
  // console.log(socket.readyState)
  // if(socket.readyState!=1){
  //   reconnected()
  //   }
}
function initRobotConfig(layim,userName){
  //窗口配置
  layim.config({
    tool: [
    {
      alias: 'start'
      ,title: '上线'
      ,icon: '上线'
    },{
      alias: 'hangup'
      ,title: '挂断'
      ,icon: '挂断'
    },{
      alias: 'end'
      ,title: '下线'
      ,icon: '下线'
    },{
      alias: 'busy'
      ,title: '忙碌'
      ,icon: '忙碌'
    }],
    init: {
      mine: {
        "username": userName
        ,"id": 1111
        ,"status": "online"
        ,"remark": "kefu"
        ,"avatar": "/service-chat/chat/picture/ktkf.png"
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
  layim = layim
 
  //初始化机器人
  initRobotConfig(layim,userName)

  //监听advice
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
  
  //监听start
  layim.on('tool(start)', function(insert, send, obj){ 
    console.log(status)
    // if(socket===''){
    //   console.log('重新上线')
    //   reconnectedWebsocket=true
    //   reconnectWebsocket=window.setInterval(reconnected, 5000); 
    //   // reconnected()
    // }
    if(status==='1'){
      var obj = {};
              obj = {
                username: robotShowName
                ,avatar: "/service-chat/chat/picture/xiaoyue.png"
                ,id: 1111
                ,type: "robot"
                ,content: '您已上线'
              }
              layim.getMessage(obj);
    }else if(status==='0'){
      console.log("发起websocket")
      var data = {userId:userId,userName:userName};
      var encryptValue = encryptData(data,publicKey) 
      socket = new WebSocket(robotSocketUrl+"?systemName="+tenantId+"&sign="+encryptValue);
      addEnent(socket,'isDoByUser',layim)
    }else if(status==='2'){
      console.log("忙碌转上线")
      var dataTemp = {role:'0',operationType:'1',type:'11',group:group};
      socket.send(JSON.stringify(dataTemp));
      // socket.emit('open', dataTemp);
      // var dataTempValue = encryptData(dataTemp,publicKey)
      // socket.send(JSON.stringify({"systemName":tenantId,"sign":dataTempValue}));
    }else{
      console.log('上线')
      var dataTemp = {role:'0',operationType:'1',type:'11',group:group};
      socket.send(JSON.stringify(dataTemp));
      // socket.emit('open', dataTemp);
      // var dataTempValue = encryptData(dataTemp,publicKey)
      // socket.send(JSON.stringify({"systemName":tenantId,"sign":dataTempValue}));  
    }
  });
  
  //监听hangup
  layim.on('tool(hangup)', function(insert, send, obj){ 
    if(chatUserData===''){
      var obj = {};
              obj = {
                username: robotShowName
                ,avatar: "/service-chat/chat/picture/xiaoyue.png"
                ,id: 1111
                ,type: "robot"
                ,content: '没有连接的用户'
              }
              layim.getMessage(obj);
    }else{
      console.log('挂断')
      var dataTemp = {role:'0',operationType:'2',type:'11',group:group,overUserId:chatUserData.userId};
      // socket.emit('open', dataTemp);
      socket.send(JSON.stringify(dataTemp));
      // var dataTempValue = encryptData(dataTemp,publicKey)
      // socket.send(JSON.stringify({"systemName":tenantId,"sign":dataTempValue})); 
    }
    
  });

  //监听end
  layim.on('tool(end)', function(insert, send, obj){
    console.log(status)
    if(status==='0'){
      // console.log("go")
      status='0'
      var obj = {};
              obj = {
                username: robotShowName
                ,avatar: "/service-chat/chat/picture/xiaoyue.png"
                ,id: 1111
                ,type: "robot"
                ,content: '您还没有上线'
              }
              layim.getMessage(obj);
    }else if(status==='1'){
      status='0'
      var dataTemp = {role:'0',operationType:'4',type:'11',group:group};
      socket.send(JSON.stringify(dataTemp));
      // var dataTempValue = encryptData(dataTemp,publicKey)
      // socket.send(JSON.stringify({"systemName":tenantId,"sign":dataTempValue}));  
    }else if(status==='2'){
      var obj = {};
      obj = {
        username: robotShowName
        ,avatar: "/service-chat/chat/picture/xiaoyue.png"
        ,id: 1111
        ,type: "robot"
        ,content: '请先挂断用户'
      }
      layim.getMessage(obj);
    }
    
  });

  //监听busy
  layim.on('tool(busy)', function(insert, send, obj){
    if(status!=='1'){
      var obj = {};
              obj = {
                username: robotShowName
                ,avatar: "/service-chat/chat/picture/xiaoyue.png"
                ,id: 1111
                ,type: "robot"
                ,content: '您还没有上线'
              }
              layim.getMessage(obj);
    }else{
      status='2'
      var dataTemp = {role:'0',operationType:'3',type:'11',group:group,overUserId:chatUserData.userId};
      socket.send(JSON.stringify(dataTemp));
      // var dataTempValue = encryptData(dataTemp,publicKey)
      // socket.send(JSON.stringify({"systemName":"test","sign":dataTempValue})); 
    }
    
  });

  layim.chat({
    name: '在线答疑'
    ,type: 'robot'
    ,avatar: '/service-chat/chat/picture/xiaoyue.png'
    ,id: 1111
  });
  layim.setChatMin();

  var $ = layui.jquery;
  $('.layim-chat-main').children("ul").children("li").remove();

  $('#mytempid').on('click', function(){
    window.onbeforeunload = function(){
      status='0'
      var dataTemp = {role:'0',operationType:'4',type:'11',group:group,overUserId:chatUserData.userId};
      socket.send(JSON.stringify(dataTemp));
      // var dataTempValue = encryptData(dataTemp,publicKey)
      // socket.send(JSON.stringify({"systemName":tenantId,"sign":dataTempValue}));  
    } 

    console.log('初始化socket---空值')
    console.log(socket)
    // 去sessionstorage里去权限数据 publicKey group 企业编码 userId
    // publicKey = window.sessionStorage.getItem('publicKey')
    userId = window.sessionStorage.getItem('userId')
    userName = window.sessionStorage.getItem('userName')
    tenantId = window.sessionStorage.getItem('tenantId')
    group = window.sessionStorage.getItem('tenantId')  
    enterpriseCode = window.sessionStorage.getItem('tenantId')  
    // console.log('获取网站系统用户数据')
    // console.log('userName:'+userName+'--'+'userId:'+userId)
    //更新机器人
    initRobotConfig(layim,userName)

    var params = {enterpriseCode:enterpriseCode,sortNum:'',source:'0'}
      $.ajax({
        type : "get", 
        async:false,
        url : serviceUrl+"/cs/api/robot/achieveChatWindow", 
        data: params,
        success : function(res){ 
            console.log('http请求返回值')
            console.log(res.rows)
            resrows = res.rows
            uniqueKey = resrows.robotId
            robotShowName = resrows.robotShowName===''?robotShowName:resrows.robotShowName
        } 
    });

    var cache =  layui.layim.cache();
    if(cache!==undefined&&cache.chatlog!==undefined){
      delete cache.chatlog;
    }
    var local = layui.data('layim')[cache.mine.id];
    if(local!==undefined&&local.chatlog!==undefined){
      delete local.chatlog;
    }
    layui.data('layim', {
      key: cache.mine.id
      ,value: local
    });
   
    var data = {userId:userId,userName:userName};
    var encryptValue = encryptData(data,publicKey) 

    if(socket===''){
      if(reconnectedWebsocket){
        
      }else{
        console.log("发起websocket")
        socket = new WebSocket(robotSocketUrl+"?systemName="+tenantId+"&sign="+encryptValue);
      };
    }
    addEnent(socket,'',layim)
      
    S4 = () => {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    guid = () => {
        return (S4()+S4()+S4());
    }
    layim.on('sendMessage', function(data){
      var dataTemp = {content:data.mine.content,toUserId:chatUserData.userId,toUserName:chatUserData.userName,type:'3',uqIdentNo:Date.parse(new Date())};
      // console.log(dataTemp)
      socket.send(JSON.stringify(dataTemp));
      // var dataTempValue = encryptData(dataTemp,publicKey)
      // socket.send(JSON.stringify({"systemName":tenantId,"sign":dataTempValue})); 
    });
  });
});
