(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{13:function(e,t,n){"use strict";n.r(t);var r=n(14),s=n.n(r);for(var a in r)"default"!==a&&function(e){n.d(t,e,function(){return r[e]})}(a);t.default=s.a},14:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{username:"",password:""}},methods:{handleLogin:function(){if(""!==this.username&&""!==this.password){var e={id:"123",name:"某某人",accessToken:"myToken"};this.$store.dispatch("addUserInfo",e);var t=sessionStorage.getItem("targetUrl");t&&!t.match(/\/user\/?.*/)||(t="/user/"+e.id),sessionStorage.removeItem("targetUrl"),this.$router.push(t)}else alert("请输入用户名或密码！")}}}},47:function(e,t,n){"use strict";n.d(t,"a",function(){return r}),n.d(t,"b",function(){return s});var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],attrs:{type:"text",placeholder:"用户名"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}}),n("br"),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password",placeholder:"密码"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),n("br"),t._v(" "),n("button",{on:{click:t.handleLogin}},[t._v("登录")])])},s=[];r._withStripped=!0},71:function(e,t,n){"use strict";n.r(t);var r=n(47),s=n(13);for(var a in s)"default"!==a&&function(e){n.d(t,e,function(){return s[e]})}(a);var o=n(0),u=Object(o.a)(s.default,r.a,r.b,!1,null,null,null);u.options.__file="src/js/views/login.vue",t.default=u.exports}}]);