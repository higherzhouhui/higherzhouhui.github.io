import{a0 as se,a9 as ne,l as re,ag as d,aj as ie,o as b,c as y,S as N,Y as ue,u as a,X as e,R as o,a as h,Q as R,G as z,a7 as de,V as r,W as f,U as w,az as pe,aA as me}from"../@vue/@vue.ac555ff6.js";import{g as ce}from"./job.a51e817b.js";import{h as q,_ as fe,q as _e}from"../../assets/index.a78b18fa.js";import{u as D}from"../ahooks-vue/ahooks-vue.67dd4886.js";import{a as be,u as ge}from"../vue-router/vue-router.7bf1a7d6.js";import{T as ye}from"../index/index.23d0c00d.js";import{a as k,E as P}from"../element-plus/element-plus.264a2030.js";import"../pinia/pinia.e6361111.js";import"../vue-demi/vue-demi.4f3c4c97.js";import"../js-cookie/js-cookie.431252a9.js";import"../axios/axios.21f17a99.js";import"../path-to-regexp/path-to-regexp.ecb763cd.js";import"../vue-i18n/vue-i18n.d7e01f80.js";import"../@intlify/@intlify.f8bf6d3d.js";import"../mitt/mitt.fcf4f812.js";import"../lodash-es/lodash-es.b08b606b.js";import"../path-browserify/path-browserify.3d3258d8.js";import"../@vueuse/@vueuse.f48a019e.js";import"../file-saver/file-saver.ff99116b.js";import"../@ctrl/@ctrl.95e2c99f.js";import"../side-channel/side-channel.cd9fb761.js";import"../get-intrinsic/get-intrinsic.5afea291.js";import"../has-symbols/has-symbols.37c383d9.js";import"../function-bind/function-bind.20151ab8.js";import"../has/has.21528ef4.js";import"../call-bind/call-bind.89d60758.js";import"../qs/qs.2a7d7167.js";import"../nprogress/nprogress.f1c59d51.js";/* empty css                                 */import"../clipboard/clipboard.091b7d6b.js";import"../@element-plus/@element-plus.86c1a5c4.js";import"../xe-utils/xe-utils.8594097a.js";import"../vxe-table/vxe-table.93a767e7.js";import"../vite-plugin-mock/vite-plugin-mock.db0c3313.js";import"../mockjs/mockjs.c03cea25.js";import"../@popperjs/@popperjs.f1fb8f77.js";import"../dayjs/dayjs.92e8c432.js";import"../async-validator/async-validator.21881447.js";import"../memoize-one/memoize-one.f0fba034.js";import"../escape-html/escape-html.d572c0fd.js";import"../normalize-wheel-es/normalize-wheel-es.94de1731.js";import"../@floating-ui/@floating-ui.5bbd8ca4.js";function he(m){return q.request({url:"/api/agent-job/job/log/list",method:"get",data:m})}function je(m){return q.request({url:"/api/agent-job/job/log/"+m,method:"delete"})}function ve(){return q.request({url:"/api/agent-job/job/log/clean",method:"delete"})}const we=m=>(pe("data-v-2d9bbdbf"),m=m(),me(),m),ke=we(()=>h("div",{class:"titles"},"\u8C03\u5EA6\u65E5\u5FD7",-1)),xe={class:"table-main",style:{"margin-top":"10px"}},Se={class:"warpperTable"},Ve={key:0},qe={key:1},Le={key:0},Ce={key:1},Te={class:"dialog-footer"},Ne={__name:"log",setup(m){const U=be(),G=ge(),l=se({loading:!0,ids:[],multiple:!0,showSearch:!0,total:0,jobLogList:[],open:!1,dateRange:[],form:{},queryParams:{pageNum:1,pageSize:10,jobName:void 0,jobGroup:void 0,status:void 0},queryFormRef:null,formRef:null,columns:[{type:"selection"},{prop:"jobLogId",label:"\u65E5\u5FD7\u7F16\u53F7"},{prop:"jobName",label:"\u4EFB\u52A1\u540D\u79F0"},{prop:"jobGroup",label:"\u4EFB\u52A1\u7EC4\u540D",slot:"dicts"},{prop:"invokeTarget",label:"\u8C03\u7528\u76EE\u6807\u5B57\u7B26\u4E32",width:200},{prop:"jobMessage",label:"\u65E5\u5FD7\u4FE1\u606F",width:180},{prop:"status",label:"\u6267\u884C\u72B6\u6001",slot:"scopes"},{prop:"createTime",label:"\u6267\u884C\u65F6\u95F4",width:180},{prop:"type",field:"right",label:"\u64CD\u4F5C",width:100,slot:"scope"}]}),{queryFormRef:x,formRef:I,loading:M,ids:Re,multiple:Y,showSearch:B,total:E,jobLogList:J,open:j,dateRange:S,form:u,queryParams:_}=ne(l);re(()=>{const t=G.query.jobId;console.log(t),t!==void 0&&t!=0?ce(t).then(s=>{l.queryParams.jobName=s.data.jobName,l.queryParams.jobGroup=s.data.jobGroup,p()}):p()});const p=()=>{l.loading=!0,console.log(),he({...l.queryParams}).then(t=>{l.jobLogList=t.rows,l.total=t.total,l.loading=!1})},F=()=>{U.push("/monitor/monitorJob")},V=()=>{l.queryParams.pageNum=1,p(),console.log("\u8FD9\u662F\u591A\u5C11123",l.queryParams)},A=()=>{l.dateRange=[],x.value!==null&&x.value.resetFields(),V()},K=t=>{l.ids=t.map(s=>s.jobLogId),l.multiple=!t.length},Q=t=>{l.open=!0,l.form=Object.assign({},t)},{run:$}=D(je,{manual:!0,onSuccess(t){console.log("\u8FD9\u662F",t),t.code===200?(p(),k({type:"success",message:"\u6210\u529F"})):k({type:"error",message:t.msg}),p()}}),O=t=>{const s=l.ids;P.confirm('\u662F\u5426\u786E\u8BA4\u5220\u9664\u8C03\u5EA6\u65E5\u5FD7\u7F16\u53F7\u4E3A"'+s+'"\u7684\u6570\u636E\u9879\uFF1F',{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(()=>{$(s)}).catch(()=>{})},{run:W}=D(ve,{manual:!0,onSuccess(t){t.code===200?(p(),k({type:"success",message:"\u6210\u529F"})):k({type:"error",message:t.msg}),p()}}),X=()=>{P.confirm("\u662F\u5426\u786E\u8BA4\u6E05\u7A7A\u6240\u6709\u8C03\u5EA6\u65E5\u5FD7\u6570\u636E\u9879\uFF1F",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(()=>{W()}).catch(()=>{})},H=()=>{_e("/api/agent-job/job/log/export",{...l.queryParams},`log_${new Date().getTime()}.xlsx`)},Z=t=>{console.log(t,"aa1"),l.queryParams.pageNum=t,p()},ee=t=>{console.log(t,"aa2"),l.queryParams.pageSize=t,p()};return(t,s)=>{const oe=d("el-input"),i=d("el-form-item"),v=d("el-option"),L=d("el-select"),te=d("el-date-picker"),c=d("el-button"),C=d("el-form"),T=d("el-row"),g=d("el-col"),ae=d("el-dialog"),le=ie("loading");return b(),y("div",null,[ke,N(e(C,{model:a(_),ref_key:"queryFormRef",ref:x,inline:!0,class:"search-from"},{default:o(()=>[e(i,{label:"",prop:"jobName",class:"form-items-body"},{default:o(()=>[e(oe,{modelValue:a(_).jobName,"onUpdate:modelValue":s[0]||(s[0]=n=>a(_).jobName=n),placeholder:"\u8BF7\u8F93\u5165\u4EFB\u52A1\u540D\u79F0",clearable:"",onKeyup:de(V,["enter"]),class:"form-items"},null,8,["modelValue","onKeyup"])]),_:1}),e(i,{label:" ",prop:"jobGroup",class:"form-items-body"},{default:o(()=>[e(L,{modelValue:a(_).jobGroup,"onUpdate:modelValue":s[1]||(s[1]=n=>a(_).jobGroup=n),placeholder:"\u8BF7\u9009\u62E9\u4EFB\u52A1\u7EC4\u540D",clearable:"",class:"form-items"},{default:o(()=>[e(v,{label:"\u9ED8\u8BA4",value:"DEFAULT"}),e(v,{label:"\u7CFB\u7EDF",value:"SYSTEM"})]),_:1},8,["modelValue"])]),_:1}),e(i,{label:" ",prop:"status",class:"form-items-body"},{default:o(()=>[e(L,{modelValue:a(_).status,"onUpdate:modelValue":s[2]||(s[2]=n=>a(_).status=n),placeholder:"\u8BF7\u9009\u62E9\u6267\u884C\u72B6\u6001",clearable:"",class:"form-items"},{default:o(()=>[e(v,{label:"\u6B63\u5E38",value:"0"}),e(v,{label:"\u5931\u8D25",value:"1"})]),_:1},8,["modelValue"])]),_:1}),e(i,{label:" ",class:"form-items-body"},{default:o(()=>[e(te,{modelValue:a(S),"onUpdate:modelValue":s[3]||(s[3]=n=>z(S)?S.value=n:null),format:"YYYY/MM/DD","value-format":"YYYY-MM-DD",type:"daterange","range-separator":"-","start-placeholder":"\u5F00\u59CB\u65E5\u671F","end-placeholder":"\u7ED3\u675F\u65E5\u671F"},null,8,["modelValue"])]),_:1}),e(c,{icon:"Search",onClick:V,class:"but"},{default:o(()=>[r("\u641C\u7D22")]),_:1}),e(c,{icon:"Refresh",onClick:A,style:{width:"90px",height:"32px"}},{default:o(()=>[r("\u91CD\u7F6E")]),_:1})]),_:1},8,["model"]),[[ue,a(B)]]),e(T,{class:"mb16"},{default:o(()=>[e(c,{type:"danger",icon:"Delete",size:"mini",disabled:a(Y),onClick:O},{default:o(()=>[r("\u5220\u9664")]),_:1},8,["disabled"]),e(c,{type:"danger",icon:"Delete",size:"mini",onClick:X},{default:o(()=>[r("\u6E05\u7A7A")]),_:1}),e(c,{type:"warning",icon:"Download",size:"mini",onClick:H},{default:o(()=>[r("\u5BFC\u51FA")]),_:1}),e(c,{type:"warning",icon:"Close",size:"mini",onClick:F},{default:o(()=>[r("\u5173\u95ED")]),_:1})]),_:1}),h("div",xe,[h("div",Se,[N((b(),R(ye,{data:a(J),columns:l.columns,total:a(E),pageSize:l.queryParams.pageSize,current:l.queryParams.pageNum,pageUpdate:Z,sizeUpdate:ee,onSelectionChange:K},{dicts:o(({row:n})=>[h("div",null,f(n.jobGroup==="DEFAULT"?"\u9ED8\u8BA4":n.jobGroup==="SYSTEM"?"\u7CFB\u7EDF":""),1)]),scopes:o(({row:n})=>[n.status==="0"?(b(),y("div",Ve,"\u6B63\u5E38")):w("",!0),n.status==="1"?(b(),y("div",qe,"\u5931\u8D25")):w("",!0)]),scope:o(({row:n})=>[e(c,{size:"mini",type:"text",icon:"View",onClick:ze=>Q(n)},{default:o(()=>[r("\u8BE6\u7EC6")]),_:2},1032,["onClick"])]),_:1},8,["data","columns","total","pageSize","current"])),[[le,a(M)]])])]),e(ae,{title:"\u8C03\u5EA6\u65E5\u5FD7\u8BE6\u7EC6",modelValue:a(j),"onUpdate:modelValue":s[5]||(s[5]=n=>z(j)?j.value=n:null),width:"700px","append-to-body":""},{footer:o(()=>[h("div",Te,[e(c,{onClick:s[4]||(s[4]=n=>j.value=!1)},{default:o(()=>[r("\u5173 \u95ED")]),_:1})])]),default:o(()=>[e(C,{ref_key:"formRef",ref:I,model:a(u),"label-width":"100px",size:"mini"},{default:o(()=>[e(T,null,{default:o(()=>[e(g,{span:12},{default:o(()=>[e(i,{label:"\u65E5\u5FD7\u5E8F\u53F7\uFF1A"},{default:o(()=>[r(f(a(u).jobLogId),1)]),_:1}),e(i,{label:"\u4EFB\u52A1\u540D\u79F0\uFF1A"},{default:o(()=>[r(f(a(u).jobName),1)]),_:1})]),_:1}),e(g,{span:12},{default:o(()=>[e(i,{label:"\u4EFB\u52A1\u5206\u7EC4\uFF1A"},{default:o(()=>[r(f(a(u).jobGroup),1)]),_:1}),e(i,{label:"\u6267\u884C\u65F6\u95F4\uFF1A"},{default:o(()=>[r(f(a(u).createTime),1)]),_:1})]),_:1}),e(g,{span:24},{default:o(()=>[e(i,{label:"\u8C03\u7528\u65B9\u6CD5\uFF1A"},{default:o(()=>[r(f(a(u).invokeTarget),1)]),_:1})]),_:1}),e(g,{span:24},{default:o(()=>[e(i,{label:"\u65E5\u5FD7\u4FE1\u606F\uFF1A"},{default:o(()=>[r(f(a(u).jobMessage),1)]),_:1})]),_:1}),e(g,{span:24},{default:o(()=>[e(i,{label:"\u6267\u884C\u72B6\u6001\uFF1A"},{default:o(()=>[a(u).status==0?(b(),y("div",Le,"\u6B63\u5E38")):a(u).status==1?(b(),y("div",Ce,"\u5931\u8D25")):w("",!0)]),_:1})]),_:1}),e(g,{span:24},{default:o(()=>[a(u).status==1?(b(),R(i,{key:0,label:"\u5F02\u5E38\u4FE1\u606F\uFF1A"},{default:o(()=>[r(f(a(u).exceptionInfo),1)]),_:1})):w("",!0)]),_:1})]),_:1})]),_:1},8,["model"])]),_:1},8,["modelValue"])])}}};var ko=fe(Ne,[["__scopeId","data-v-2d9bbdbf"]]);export{ko as default};
