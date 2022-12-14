import{T as z}from"../index/index.23d0c00d.js";import{b as V}from"../agaentaccount/agaentaccount.a838f357.js";import{u as q}from"../vue-i18n/vue-i18n.d7e01f80.js";import{u as x,a as R}from"../vue-router/vue-router.7bf1a7d6.js";import{_ as B,u as E,r as G}from"../../assets/index.a78b18fa.js";import{a0 as W,a9 as P,l as Y,w as S,ag as p,aj as j,o as c,c as f,a as g,u,W as s,U as b,V as T,X as r,R as n,S as F,L as H}from"../@vue/@vue.ac555ff6.js";import"../element-plus/element-plus.264a2030.js";import"../lodash-es/lodash-es.b08b606b.js";import"../@element-plus/@element-plus.86c1a5c4.js";import"../@popperjs/@popperjs.f1fb8f77.js";import"../@ctrl/@ctrl.95e2c99f.js";import"../dayjs/dayjs.92e8c432.js";import"../async-validator/async-validator.21881447.js";import"../memoize-one/memoize-one.f0fba034.js";import"../escape-html/escape-html.d572c0fd.js";import"../normalize-wheel-es/normalize-wheel-es.94de1731.js";import"../@floating-ui/@floating-ui.5bbd8ca4.js";import"../@intlify/@intlify.f8bf6d3d.js";import"../pinia/pinia.e6361111.js";import"../vue-demi/vue-demi.4f3c4c97.js";import"../js-cookie/js-cookie.431252a9.js";import"../axios/axios.21f17a99.js";import"../path-to-regexp/path-to-regexp.ecb763cd.js";import"../mitt/mitt.fcf4f812.js";import"../path-browserify/path-browserify.3d3258d8.js";import"../@vueuse/@vueuse.f48a019e.js";import"../file-saver/file-saver.ff99116b.js";import"../side-channel/side-channel.cd9fb761.js";import"../get-intrinsic/get-intrinsic.5afea291.js";import"../has-symbols/has-symbols.37c383d9.js";import"../function-bind/function-bind.20151ab8.js";import"../has/has.21528ef4.js";import"../call-bind/call-bind.89d60758.js";import"../qs/qs.2a7d7167.js";import"../nprogress/nprogress.f1c59d51.js";/* empty css                                 */import"../clipboard/clipboard.091b7d6b.js";import"../xe-utils/xe-utils.8594097a.js";import"../vxe-table/vxe-table.93a767e7.js";import"../vite-plugin-mock/vite-plugin-mock.db0c3313.js";import"../mockjs/mockjs.c03cea25.js";const X={class:"user-list-wrap"},J={class:"titles"},K={class:"title"},O={key:0},Z={key:0},ee={class:"warpperTable"},te={key:0,class:"normal"},ae={key:1,class:"frozen"},oe=["onClick"],re={__name:"subordinateMember",setup(ne){const{t:a}=q(),_=x(),y=R(),I=E(),e=W({recordList:[],columns:[{prop:"agentId",label:a("CUST.dlID")},{prop:"useruid",label:a("CUST.translate222"),slot:"uid"},{prop:"firstDepositAmt",label:a("CUST.translate225")},{prop:"lastDepositAmt",label:a("CUST.translate224")},{prop:"totalDepositAmt",label:a("AGENT.translate4")},{prop:"totalWithdrawAmt",label:a("AGENT.translate5")},{prop:"totalGiftAmt",label:a("AGENT.translate6")},{prop:"totalBetAmt",label:a("CUST.translate233")},{prop:"netProfitAmt",label:a("CUST.translate39"),slot:"makeMoney"},{prop:"createTime",label:a("CUST.translate64"),minWidth:120},{prop:"lastLoginTime",label:a("CUST.translate226"),minWidth:120}],total:30,pageSize:10,current:1,formInline:{uid:"",endDate:"",startDate:""},checkDia:!1,checkFormRef:null,checkForm:{uid:"",endDate:"",startDate:""},checkDiaType:"",rangeTime:[],loading:!0,routeQueryId:"",routeQueryName:"",downloadLoading:!1});P(e);const C=()=>{e.formInline={uid:"",endDate:"",startDate:""},e.rangeTime="",e.current=1,d()};Y(async()=>{e.routeQueryId=_.query.agentId,e.routeQueryName=_.query.agentAcccount,d()}),S(()=>_.query.agentId,t=>{e.routeQueryId=t,d()}),S(()=>_.query.agentAcccount,t=>{e.routeQueryName=t});const D=()=>{const t=String(e.routeQueryId).split(","),o=String(e.routeQueryName).split("->");t.pop(),o.pop();const m=t.join(","),i=o.join("->");m?y.push({name:"subordinateAgent",query:{agentId:m,agentAcccount:i}}):y.push({name:"subordinateAgent"})},U=()=>{y.push({name:"subordinateMember"})},A=t=>{e.routeQueryId?y.push({name:"subordinateMemberDetail",query:{agentId:e.routeQueryId,agentAcccount:e.routeQueryName,detailId:t}}):y.push({name:"subordinateMemberDetail",query:{detailId:t}})},d=()=>{e.loading=!0,e.rangeTime!==null?(e.formInline.startDate=e.rangeTime[0],e.formInline.endDate=e.rangeTime[1]):(e.formInline.startDate=null,e.formInline.endDate=null),v()};function k(t){e.current=t,d()}function N(t){e.pageSize=t,d()}const v=()=>{let t;e.routeQueryId&&(t=String(e.routeQueryId).split(",").pop()*1,isNaN(t)&&(t=void 0)),V({...e.formInline,pageNum:e.current,pageSize:e.pageSize,agentId:t}).then(o=>{const m=(o==null?void 0:o.rows)||[];m.map(i=>{i.totalWithdrawAmt=Math.abs(i.totalWithdrawAmt)}),e.recordList=[...m],e.total=o==null?void 0:o.total,e.loading=!1})},Q=async()=>{e.rangeTime!==null?(e.formInline.startDate=e.rangeTime[0],e.formInline.endDate=e.rangeTime[1]):(e.formInline.startDate=null,e.formInline.endDate=null);let t;e.routeQueryId&&(t=String(e.routeQueryId).split(",").pop()*1,isNaN(t)&&(t=void 0)),e.downloadLoading=!0,await G({...e.formInline,agentId:t},a("CUST.translate221"),"","/user/directMemberList/export"),e.downloadLoading=!1};return(t,o)=>{const m=p("el-input"),i=p("el-form-item"),w=p("el-date-picker"),h=p("el-button"),M=p("el-form"),L=p("el-scrollbar"),$=j("loading");return c(),f("div",X,[g("div",J,[g("span",K,[u(I).account?(c(),f("span",O,s(e.routeQueryName?`${u(I).account}->${e.routeQueryName}`:""),1)):b("",!0),T(" "+s(t.$t("CUST.translate221")),1)]),u(_).query.agentId?(c(),f("span",Z,[g("span",{onClick:U,class:"myAgent"},s(t.$t("AGENT.translate2")),1),g("span",{class:"return",onClick:D},s(t.$t("AGENT.translate3")),1)])):b("",!0)]),r(L,null,{default:n(()=>[r(M,{inline:!0,model:e.formInline,class:"demo-form-inline"},{default:n(()=>[r(i,{label:`${u(a)("CUST.translate222")}\uFF1A`,class:"form-items-body"},{default:n(()=>[r(m,{modelValue:e.formInline.uid,"onUpdate:modelValue":o[0]||(o[0]=l=>e.formInline.uid=l),placeholder:u(a)("CUST.translate223"),class:"form-items",clearable:""},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),r(i,{label:`${u(a)("CUST.translate64")}\uFF1A`,class:"form-items-body"},{default:n(()=>[r(w,{modelValue:e.rangeTime,"onUpdate:modelValue":o[1]||(o[1]=l=>e.rangeTime=l),type:"daterange","range-separator":u(a)("CUST.translate192"),"start-placeholder":u(a)("CUST.translate193"),"end-placeholder":u(a)("CUST.translate194"),style:{width:"250px"},"value-format":"YYYY-MM-DD"},null,8,["modelValue","range-separator","start-placeholder","end-placeholder"])]),_:1},8,["label"]),r(i,null,{default:n(()=>[r(h,{onClick:d,class:"but",icon:"Search",style:{"margin-left":"10px","margin-right":"10px"}},{default:n(()=>[T(s(t.$t("CUST.translate195")),1)]),_:1})]),_:1}),r(i,null,{default:n(()=>[r(h,{onClick:C,class:"resetButton",style:{"margin-right":"10px"}},{default:n(()=>[T(s(t.$t("CUST.translate196")),1)]),_:1})]),_:1}),r(i,null,{default:n(()=>[r(h,{class:"resetButton",loading:e.downloadLoading,type:"success",icon:"Document",onClick:Q},{default:n(()=>[T(s(u(a)("exportReport")),1)]),_:1},8,["loading"])]),_:1})]),_:1},8,["model"])]),_:1}),F((c(),f("div",ee,[r(z,{data:e.recordList,columns:e.columns,total:e.total,pageSize:e.pageSize,current:e.current,pageUpdate:k,sizeUpdate:N,maxHeight:"calc(100vh - 320px)"},{status:n(({row:l})=>[l.status==="2"?(c(),f("div",te,s(t.$t("CUST.translate116")),1)):b("",!0),l.status==="3"?(c(),f("div",ae,s(t.$t("CUST.translate191")),1)):b("",!0)]),uid:n(({row:l})=>[g("div",{class:"link_font",onClick:le=>A(l.uid)},s(l.uid),9,oe)]),makeMoney:n(({row:l})=>[g("div",{class:H(Number(l.netProfitAmt)<0?"loseColor":"winColor")},s(l.netProfitAmt),3)]),_:1},8,["data","columns","total","pageSize","current"])])),[[$,e.loading]])])}}};var He=B(re,[["__scopeId","data-v-4415148a"]]);export{He as default};
