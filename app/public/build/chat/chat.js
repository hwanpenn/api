layui.use('layim', function(layim){
    var ipTemp = window.location.host;
    var portTemp = window.location.port;
    console.log(ipTemp+":"+portTemp);
    layim.config({
        tool: [{
            alias: 'code'
            ,title: '投诉建议'
            ,icon: '&#xe60a;'
        }],
        init: {
            //js文件配置在本机
            mine: {
                "username": "我"
                ,"id": "1112"
                ,"status": "online"
                ,"remark": "客户"
                ,"avatar": "/chat/picture/yonghu.png"
                // ,"avatar": "/chat/picture/yonghu.png"
            }
            ,friend: []
            ,group: []
        },
        brief: true,
        voice:false,
        minRight: '0px'
    });

    //监听自定义工具栏点击，以添加代码为例
    layim.on('tool(code)', function(insert, send, obj){ //事件中的tool为固定字符，而code则为过滤器，对应的是工具别名（alias）
        layer.prompt({
            title: '投诉建议'
            ,formType: 2
            ,shade: 0
        }, function(text, index){
            layer.close(index);
            // insert('[pre class=layui-code]' + text + '[/pre]'); //将内容插入到编辑器，主要由insert完成
            //send(); //自动发送
            alert("已提交客服人员，提示内容："+text)
        });
        console.log(this); //获取当前工具的DOM对象
        console.log(obj); //获得当前会话窗口的DOM对象、基础信息
    });

    layim.chat({
        name: '在线咨询'
        ,type: 'robot'
        ,avatar: '/chat/picture/xiaoyue.png'
        ,id: 1111
    });
    layim.setChatMin();
    var $ = layui.jquery;
    $('.layim-chat-main').children("ul").children("li").remove();
    var socket = '';
    $('#mytempid').on('click', function(){
        var obj1 = {};
        var obj2 = {};
        obj1 = {
            username: "小玥"
            ,avatar: "/chat/picture/xiaoyue.png"
            ,id: 1111
            ,type: "robot"
            ,content: "a(https://www.shineyue.com/)[神玥科技]移动端，内容更丰富，快来扫描二维码下载吧"
            // ,content: "1、a(https://www.shineyue.com/)[神玥软件]\n2、a(https://baidu.com)[百度一下]\n3、a(http://www.sjzgjj.cn/)[石家庄住房公积金管理中心]"
        }
        obj2 = {
            username: "小玥"
            ,avatar: "/chat/picture/xiaoyue.png"
            ,id: 1111
            ,type: "robot"
            ,content: "img[/chat/picture/ewm.png]"
        }
        layim.getMessage(obj1);
        layim.getMessage(obj2);
        // console.log(window.sessionStorage);
        var cache =  layui.layim.cache();
        // console.log(cache)
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
        console.log("发起连接")
        if(socket===''){
            // socket = io.connect('http://192.168.21.129:5000/chatbot');
            socket = io.connect('http://192.168.21.188:5000/chatbot');
            // socket = io.connect('http://192.168.21.126:5000/chatbot');
            // socket = io.connect('http://222.222.216.162:10230/chatbot');
            // socket = io.connect('http://192.168.0.238:5000/chatbot');
            // socket = io.connect('http://192.168.21.198:5000/chatbot');
        }
        socket.on('connect',function(){
            // console.log(socket);
            //这需要获取用户名用户ID，和地理位置，以区分不同的业务答案
            console.log("连接成功")
            var dataTemp = {message:"发起连接",userName:"name",userId:"11",city:"test"};
            socket.emit('open', dataTemp);
        });
        socket.on('reconnect_attempt', function(data){
            if(data === 1){
                var obj = {};
                obj = {
                    username: "小玥"
                    ,avatar: "/chat/picture/xiaoyue.png"
                    ,id: 1111
                    ,type: "robot"
                    ,content: "非常抱歉，现在咨询客户太多了。请您稍候再试哦！"
                }
                layim.getMessage(obj);
            }
        });
        socket.on('answer', function(msg) {
            // console.log(msg);
            console.log("后台数据"+msg.answer);
            var primitiveAnswer = msg.answer
            var modifyAnswer = ''
            var arr= primitiveAnswer.split("<br/>")
            console.log(arr)
            var j ;
            var len=arr.length;
            if(len===1){
                modifyAnswer = primitiveAnswer;
            }else {
                for(j = 0; j < len; j++) {
                    modifyAnswer = modifyAnswer + arr[j] + "\n"
                }
            }
            console.log(modifyAnswer)

            var obj = {};
            obj = {
                username: "小玥"
                ,avatar: "/chat/picture/xiaoyue.png"
                ,id: 1111
                ,type: "robot"
                ,content: modifyAnswer
            }
            layim.getMessage(obj);
        });

        // 敏感词过滤，推荐不适用，很影响性能和用户体验
        // var mgcList = ['习近平','共产党','世界末日']
        // function filtration(message) {
        //     var j ;
        //     var filterWord ;
        //     var index;
        //     var len=mgcList.length;
        //     var messageTemp = message;
        //     for(j = 0; j < len; j++) {
        //         filterWord = mgcList[j]
        //         // console.log("敏感词："+filterWord);
        //         index = message.indexOf(filterWord);
        //         // console.log(index);
        //         if(index>-1){
        //             // console.log("发现敏感词，开始修改敏感词------"+message)
        //             messageTemp = messageTemp.replace(filterWord, "***")
        //         }else {
        //             // console.log("未发现发现敏感词")
        //         }
        //     }
        //     return messageTemp;
        // }

        layim.on('sendMessage', function(data){
            var value = data.mine.content;
            // console.log(value)
            //测试敏感词
            // var newValue = filtration(value)
            // console.log(newValue)
            var sendValue = {message:value}
            // var sendValue = {message:newValue}
            socket.emit('chat', sendValue);
        });
    });
    // $('#layui-layer2').on('click', function(){
    //     alert("click")
    // });
});
