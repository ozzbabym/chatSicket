(this.webpackJsonpchat=this.webpackJsonpchat||[]).push([[0],{105:function(e,t,a){},106:function(e,t,a){"use strict";a.r(t);var s=a(1),n=a.n(s),c=a(47),r=a.n(c),o=(a(54),a(3)),i=a(12),u=a.n(i),l=a(17),d=a(9),j=(a(56),a(19)),b=a.n(j),m=a(0);var p=function(e){var t=e.onLogin,a=n.a.useState(""),s=Object(d.a)(a,2),c=s[0],r=s[1],o=n.a.useState(""),i=Object(d.a)(o,2),j=i[0],p=i[1],h=n.a.useState(!1),O=Object(d.a)(h,2),x=O[0],f=O[1],g=function(){var e=Object(l.a)(u.a.mark((function e(){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(j&&c){e.next=2;break}return e.abrupt("return",alert("\u043d\u0435\u0432\u0435\u0440\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435"));case 2:return a={roomId:c,userName:j},f(!0),e.next=6,b.a.post("https://chatroommess.herokuapp.com/rooms",a);case 6:t(a);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(m.jsx)("div",{children:Object(m.jsxs)("div",{className:"joinBlock",children:[Object(m.jsx)("input",{className:"form-control",placeholder:"Room ID",value:c,onChange:function(e){return r(e.target.value)}}),Object(m.jsx)("br",{}),Object(m.jsx)("input",{className:"form-control",placeholder:"Your Name",value:j,onChange:function(e){return p(e.target.value)}}),Object(m.jsx)("br",{}),Object(m.jsx)("button",{disabled:x,className:"btn btn-success",onClick:g,children:x?"\u0412\u0425\u041e\u0414....":"\u0412\u041e\u0419\u0422\u0418"})]})})},h=a(49),O=function(e,t){switch(t.type){case"JOINED":return Object(o.a)(Object(o.a)({},e),{},{joined:!0,roomId:t.payload.roomId,userName:t.payload.userName});case"SET_USERS":return Object(o.a)(Object(o.a)({},e),{},{users:t.payload});case"SET_DATA":return Object(o.a)(Object(o.a)({},e),{},{users:t.payload.users,messages:t.payload.messages});case"NEW_MESSAGE":return Object(o.a)(Object(o.a)({},e),{},{messages:[].concat(Object(h.a)(e.messages),[t.payload])});default:return e}},x=a(48),f=a.n(x)()("wss://chatroommess.herokuapp.com/");a(105);function g(e){var t=e.users,a=e.messages,s=e.userName,c=e.roomId,r=e.onAddMessage,o=n.a.useState(""),i=Object(d.a)(o,2),u=i[0],l=i[1],j=n.a.useRef(null);return n.a.useEffect((function(){j.current.scrollTo(0,99999)}),[a]),Object(m.jsx)("div",{className:"container",style:{width:"100%",maxWidth:"1000px",minWidth:"300px",height:"80%"},children:Object(m.jsx)("div",{className:"containerChat",children:Object(m.jsxs)("div",{className:"row",children:[Object(m.jsxs)("div",{className:"col-4",style:{backgroundColor:"#F5F5F5",padding:"10px",overflow:"hidden"},children:["\u041a\u043e\u043c\u043d\u0430\u0442\u0430: ",Object(m.jsx)("b",{children:c}),Object(m.jsx)("hr",{}),Object(m.jsx)("h6",{children:Object(m.jsxs)("div",{className:"badge bg-secondary",children:["Online(",t.length,"):"]})}),Object(m.jsx)("ul",{children:t.map((function(e,t){return Object(m.jsx)("li",{style:{listStyle:"none"},children:Object(m.jsx)("div",{className:"badge bg-success",children:e})},t)}))})]}),Object(m.jsxs)("div",{className:"col-8",children:[Object(m.jsx)("div",{ref:j,className:"row",style:{height:"600px",overflow:"auto",margin:"5px"},children:Object(m.jsx)("div",{children:a.map((function(e,t){return Object(m.jsxs)("div",{className:"messages",style:{width:"100%"},children:[Object(m.jsx)("div",{style:{float:"right",color:"white",paddingRight:"10px"},children:Object(m.jsx)("span",{children:e.userName})}),Object(m.jsx)("p",{className:"p-3 mb-2 bg-primary text-white",style:{borderRadius:"10px",width:"80%",marginLeft:"20%"},children:e.text})]},t)}))})}),Object(m.jsx)("div",{className:"col",children:Object(m.jsxs)("div",{className:"input-group mb-3",children:[Object(m.jsx)("input",{value:u,onChange:function(e){return l(e.target.value)},type:"text",className:"form-control",placeholder:"your message","aria-label":"Recipient's username","aria-describedby":"button-addon2"}),Object(m.jsx)("button",{onClick:function(){f.emit("ROOM:NEW_MESSAGE",{userName:s,roomId:c,text:u}),r({userName:s,text:u}),l("")},className:"btn btn-primary",type:"button",id:"button-addon2",children:"SEND"})]})})]})]})})})}var v=function(){var e=n.a.useReducer(O,{joined:!1,roomId:null,userName:null,users:[],messages:[]}),t=Object(d.a)(e,2),a=t[0],s=t[1],c=function(){var e=Object(l.a)(u.a.mark((function e(t){var a,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s({type:"JOINED",payload:t}),f.emit("ROOM:JOIN",t),e.next=4,b.a.get("https://chatroommess.herokuapp.com/rooms/".concat(t.roomId));case 4:a=e.sent,n=a.data,s({type:"SET_DATA",payload:n});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),r=function(e){s({type:"SET_USERS",payload:e})},i=function(e){s({type:"NEW_MESSAGE",payload:e})};return n.a.useEffect((function(){f.on("ROOM:SET_USERS",r),f.on("ROOM:NEW_MESSAGE",i)}),[]),Object(m.jsx)("div",{className:"wrapper",children:a.joined?Object(m.jsx)(g,Object(o.a)(Object(o.a)({},a),{},{onAddMessage:i})):Object(m.jsx)(p,{onLogin:c})})};r.a.render(Object(m.jsx)(n.a.StrictMode,{children:Object(m.jsx)(v,{})}),document.getElementById("root"))},54:function(e,t,a){},56:function(e,t,a){}},[[106,1,2]]]);
//# sourceMappingURL=main.472c386a.chunk.js.map