import{T as N}from"../index/index.23d0c00d.js";import{b as k}from"../reportForm/reportForm.2ebde4b5.js";import{_ as I,c as z,r as x}from"../../assets/index.a78b18fa.js";import{u as V}from"../vue-i18n/vue-i18n.d7e01f80.js";import{a0 as L,a9 as Y,l as B,ag as c,aj as D,o as C,c as S,a as _,W as n,X as l,R as r,S as M,u as d,V as g,L as P}from"../@vue/@vue.ac555ff6.js";import"../element-plus/element-plus.264a2030.js";import"../lodash-es/lodash-es.b08b606b.js";import"../@element-plus/@element-plus.86c1a5c4.js";import"../@popperjs/@popperjs.f1fb8f77.js";import"../@ctrl/@ctrl.95e2c99f.js";import"../dayjs/dayjs.92e8c432.js";import"../async-validator/async-validator.21881447.js";import"../memoize-one/memoize-one.f0fba034.js";import"../escape-html/escape-html.d572c0fd.js";import"../normalize-wheel-es/normalize-wheel-es.94de1731.js";import"../@floating-ui/@floating-ui.5bbd8ca4.js";import"../pinia/pinia.e6361111.js";import"../vue-demi/vue-demi.4f3c4c97.js";import"../js-cookie/js-cookie.431252a9.js";import"../axios/axios.21f17a99.js";import"../vue-router/vue-router.7bf1a7d6.js";import"../path-to-regexp/path-to-regexp.ecb763cd.js";import"../mitt/mitt.fcf4f812.js";import"../path-browserify/path-browserify.3d3258d8.js";import"../@vueuse/@vueuse.f48a019e.js";import"../file-saver/file-saver.ff99116b.js";import"../side-channel/side-channel.cd9fb761.js";import"../get-intrinsic/get-intrinsic.5afea291.js";import"../has-symbols/has-symbols.37c383d9.js";import"../function-bind/function-bind.20151ab8.js";import"../has/has.21528ef4.js";import"../call-bind/call-bind.89d60758.js";import"../qs/qs.2a7d7167.js";import"../nprogress/nprogress.f1c59d51.js";/* empty css                                 */import"../clipboard/clipboard.091b7d6b.js";import"../xe-utils/xe-utils.8594097a.js";import"../vxe-table/vxe-table.93a767e7.js";import"../vite-plugin-mock/vite-plugin-mock.db0c3313.js";import"../mockjs/mockjs.c03cea25.js";import"../@intlify/@intlify.f8bf6d3d.js";const R={class:"user-list-wrap"},$={class:"titles"},A={class:"displayf"},G={class:"warpperTable"},j={__name:"gameClassification",setup(q){const s=z(),{t:a}=V(),e=L({recordList:[],columns:[{prop:"agentId",label:a("CUST.dlID")},{prop:"gameTypeName",label:a("CUST.translate237")},{prop:"totalBetAmt",label:a("CUST.translate233")},{prop:"totalBetValidAmt",label:a("CUST.translate234")},{prop:"totalProfit",label:a("CUST.translate235"),slot:"totalProfit"}],total:30,pageSize:10,current:1,formInline:{month:null},downloadLoading:!1,selectTime:[{name:"\u4ECA\u65E5",Check:!0},{name:"\u6628\u65E5",Check:!1},{name:"\u672C\u5468",Check:!1},{name:"\u4E0A\u5468",Check:!1},{name:"\u672C\u6708",Check:!1},{name:"\u4E0A\u6708",Check:!1}],loading:!0});Y(e);const T=()=>{e.formInline={month:null},e.current=1,i()};B(()=>{h()});const h=()=>{e.loading=!0,k({...e.formInline,pageNum:e.current,pageSize:e.pageSize}).then(t=>{(t.rows||[]).map(o=>{s.lang==="zh"&&(o.gameTypeName=o.typeNameZh),s.lang==="vi"&&(o.gameTypeName=o.typeNameVi),s.lang==="jp"&&(o.gameTypeName=o.typeNameJp),s.lang==="th"&&(o.gameTypeName=o.typeNameTh)}),e.recordList=t.rows,e.total=t.total,e.loading=!1})},y=async()=>{e.downloadLoading=!0,await x(e.formInline,a("CUST.translate236"),"agentGameTypeStatis"),e.downloadLoading=!1},i=()=>{h(),console.log(e.formInline)};function v(t){e.current=t,i()}function U(t){e.pageSize=t,i()}return(t,u)=>{const o=c("el-date-picker"),m=c("el-form-item"),f=c("el-button"),b=c("el-form"),w=D("loading");return C(),S("div",R,[_("div",$,n(t.$t("CUST.translate236")),1),_("div",A,[l(b,{inline:!0,model:e.formInline,class:"demo-form-inline"},{default:r(()=>[l(m,{label:`${d(a)("CUST.translate228")}\uFF1A`,class:"form-items-body"},{default:r(()=>[l(o,{modelValue:e.formInline.month,"onUpdate:modelValue":u[0]||(u[0]=p=>e.formInline.month=p),type:"month",placeholder:d(a)("CUST.translate229"),style:{width:"200px"},format:"YYYY/MM","value-format":"YYYY-MM"},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),l(m,null,{default:r(()=>[l(f,{onClick:i,class:"but",icon:"Search"},{default:r(()=>[g(n(t.$t("CUST.translate195")),1)]),_:1})]),_:1}),l(m,null,{default:r(()=>[l(f,{onClick:T,class:"resetButton"},{default:r(()=>[g(n(t.$t("CUST.translate196")),1)]),_:1})]),_:1}),l(m,null,{default:r(()=>[l(f,{class:"resetButton",loading:e.downloadLoading,type:"success",icon:"Document",onClick:y},{default:r(()=>[g(n(d(a)("exportReport")),1)]),_:1},8,["loading"])]),_:1})]),_:1},8,["model"])]),M((C(),S("div",G,[l(N,{data:e.recordList,columns:e.columns,total:e.total,pageSize:e.pageSize,current:e.current,pageUpdate:v,sizeUpdate:U,"summary-method":t.getSummaries,"show-summary":"","sum-text":d(a)("CUST.translate230"),maxHeight:"calc(100vh - 330px)"},{totalProfit:r(({row:p})=>[_("div",{class:P(Number(p.totalProfit)<0?"loseColor":"winColor")},n(p.totalProfit),3)]),_:1},8,["data","columns","total","pageSize","current","summary-method","sum-text"])])),[[w,e.loading]])])}}};var Ve=I(j,[["__scopeId","data-v-1310950a"]]);export{Ve as default};
