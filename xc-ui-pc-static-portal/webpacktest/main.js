var {add} = require("./model01")
var {add} = require("./vue.min")
//编写MVVM中的model部分及VM（ViewModel）部分
var VM = new Vue({
    el:'#app',//vm接管了app区域的管理

    data:{//model数据
        name:'黑马程序员',
        num0:0,
        num1:0,
        result:-1,
        url:'http://www.itcast.cn',
        size:10
    },
    methods:{
        change:function () {
            this.result = add(Number.parseInt(this.num1)+Number.parseInt(this.num2)  )
            //alert("计算结果："+this.result)
        }
    }
});