import{T as ae}from"../index/index.23d0c00d.js";import{Q as M}from"../qrcode.vue/qrcode.vue.22e91596.js";import{h as ne}from"../html2canvas/html2canvas.7f4d72e6.js";import{h as k,_ as oe,c as le}from"../../assets/index.a78b18fa.js";import{u as ie}from"../vue-i18n/vue-i18n.d7e01f80.js";import{a as O}from"../element-plus/element-plus.264a2030.js";import{a0 as se,a9 as re,l as ce,ag as h,aj as z,o as p,c as g,a as b,W as d,X as s,R as i,S,a8 as pe,u as m,G as de,V as f,F as _,a6 as y,Q as w,U as B,az as me,aA as ue}from"../@vue/@vue.ac555ff6.js";import"../pinia/pinia.e6361111.js";import"../vue-demi/vue-demi.4f3c4c97.js";import"../js-cookie/js-cookie.431252a9.js";import"../axios/axios.21f17a99.js";import"../vue-router/vue-router.7bf1a7d6.js";import"../path-to-regexp/path-to-regexp.ecb763cd.js";import"../mitt/mitt.fcf4f812.js";import"../lodash-es/lodash-es.b08b606b.js";import"../path-browserify/path-browserify.3d3258d8.js";import"../@vueuse/@vueuse.f48a019e.js";import"../file-saver/file-saver.ff99116b.js";import"../@ctrl/@ctrl.95e2c99f.js";import"../side-channel/side-channel.cd9fb761.js";import"../get-intrinsic/get-intrinsic.5afea291.js";import"../has-symbols/has-symbols.37c383d9.js";import"../function-bind/function-bind.20151ab8.js";import"../has/has.21528ef4.js";import"../call-bind/call-bind.89d60758.js";import"../qs/qs.2a7d7167.js";import"../nprogress/nprogress.f1c59d51.js";/* empty css                                 */import"../clipboard/clipboard.091b7d6b.js";import"../@element-plus/@element-plus.86c1a5c4.js";import"../xe-utils/xe-utils.8594097a.js";import"../vxe-table/vxe-table.93a767e7.js";import"../vite-plugin-mock/vite-plugin-mock.db0c3313.js";import"../mockjs/mockjs.c03cea25.js";import"../@popperjs/@popperjs.f1fb8f77.js";import"../dayjs/dayjs.92e8c432.js";import"../async-validator/async-validator.21881447.js";import"../memoize-one/memoize-one.f0fba034.js";import"../escape-html/escape-html.d572c0fd.js";import"../normalize-wheel-es/normalize-wheel-es.94de1731.js";import"../@floating-ui/@floating-ui.5bbd8ca4.js";import"../@intlify/@intlify.f8bf6d3d.js";var ve="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA/CAYAAABXXxDfAAAAAXNSR0IArs4c6QAABCNJREFUaEPtW19sU2UU//1u7Z+NPwsaA2jZug0Sdrs3MxINbyQYHsSYuKmoa6NkifFBidEoEDaMQ4Ix6IMhWaJp/YO6mWjwASXxjcgD4W0tJrK1G1UkRkjZ2LqW3kPuusKWuHIzbtt1372v9/vOOb/z7zv3u+cQ93g6O8W1KpZ82IA0AtwF4HGCmwD4Aay91/4KvL8BICWQywDOAXJaA8dvBgP/Dg0xX4o/F38pDLVfboGR7wK4GyJtIK8AiAHynwiug8hUAFxJFprAJ8Q6gA8BCEJkI8iLgJyC5hqMDm8aBSj/R2RR8OFgco8IDgKyGeQpUBswjNwfdRmkr2evZpFKZYfQVVKzlVBMJwZd8Ps96zzrPdM+NGiaeyvE6IHIboCXSHwQiQVOWgLf03KtIeub2Ccw9ovwPMlD0XjTb5UAYiePkD62Q0TeJ6WD0I54MmuOD4w+mJ7PY4HlTeAzvvRRgHtAfnFrJvvxN5e2pOwUqpK0Xtz8p/8Br+ctiLwCyElvpuHd+QpYAD6sj/UJZB/At7117q8HLjwyVUlhy8Gr57G/62emcy8B8hHB45F4U1+Rzxx4YTg49oKIREDtM6/PfWAlAC+CnFVAJtcPMV4nGY7Emr41k+As+FD7eCsM42czg+dzuedq2dUX8x4zBFxu9/c0TwZNeyo63DhC8xyvjyXfAXAY0HbVYnKzGi5mEgSM0wB6p4KBYwzriQ0G8BPJVDQWeNYqoVpdFwomf4DgUUKeYbc+uo3CM3C5uqLDjWdqFZRVuUPt4zuRzw8KZSe79UQvwecN5J/8Kt46bpVIra57WR9p1OD6VSDfmeB/IbQJb+bW3oHR1gVFQK0CLCV3T8tIw4zP9blAVjOkJ81a/ezUjStvDqWemF6JgOdj6vT/Xle/duMnALeb4NMicmL64vkDy6FWL7fyzW+BuraOfpKvmeBFIIe/jDffqXzKLUC16XfriT6CvQ54x/KO21c7GivD34n5aia8kJ54j8AbAnwajTd/WBmbF7hU3fIhfWwCkNUAJ6PxpjWKgU/euVGNxgMlbpHtV8sysLwDftasjuXt9+5FKTpuX92jzon5lRfzZgEDaPsL5/j9PpwEjCN2FkJljfmwnvhHwPX3C7u4n5CrkXjzBrvolRW80pa3YiHzBqm4zjnnrWjMpjVldXsrMjqWn9OS4/ZW3MWmNY7bO+VtlX5aKH6To/Adnk25a0lkqp7wliS1TZsc8NXM9jYZcUlkHMs7lteTaYqcuKlQZ8aqto5+mevMULcnp9CNxUlvJv+qct1YivfhKdyBafbeCvgjiL+U671VuuvaLJGU7bcv1IcKT1oUC2RFZ2wK8JWerioqQMm5uvnfh0pOVN5VwN1ZWgGepmBrYZaWw4BxbbnM0kLgm52YsnOWtqiElTxFfRvsVquhURZkNgAAAABJRU5ErkJggg==",ge="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA/CAYAAABXXxDfAAAAAXNSR0IArs4c6QAAA4RJREFUaEPtm0FoFGcUx39vd92kSVBEikrXHOKiX9ZjsCB4Eyw9WCmIWvFQqgjiRRFLq2JU1BZLSS+lICg9FE2DoLSHGKE3wUPxZjcjrDnoioqopI1pHHfnyYybsBGTLDizyWa+uc7s+97ve9/3/97OvCfMcCkkyeU+pFRqJ5H4FFgHrAAywMKZfl+H+/8CReA+cBPP6yeVukc+/0SgPN34MtVNBSGb7SCV2gp8hmonIg+Bf4CnqD5HZKwOcNMPodqMyGJgCbAG1eWIDAJ/UCr1USgMCei7jEwNb8wOVI8ikg0MwTkSCYexsWFc16VYdGea2XpMTLAyM5k06XSa5uZFeJ4B9lQCVkDklDjOxZrgtaNjEen0AeAw8DeJxDHJ5/+qB0iYY2gutwHPOwmsBc7guj0yNDRcPcakyAfgTU3fo7oDkQu8evWjFAr+fmrIS7PZDAsWHET1K0Qu8vLlN9UTMBnemOOAH/VDtLb+JrdujTYkdZXT2tXVwosXO4EfgB5xHJ8xuAL4QNyM+QL4FZGfaWk5Mh/AxyGDCRgdPY3qPuBLHOeSL4Jv4LPZlSSTfyLynFJpWyMv9SlPL38LpFK/o7qYcnmTFAp3JVBLY74GTvjneCOKW61bsyKC/UA3jnNWNJdbhupVVIviOFtqNdSoz6kxl4GPSCQ+F1216mNEriOyVRzneqNC1eq3GrMR1T5UN4oa043qdpLJTySfv1erkUZ9TnO5dsrlAUR6ffhrwH+47u63k4BGBZzO70oSdx5o8+H9XP0GIyP7pVj8fz4CVzNpJvMBbW0/Aet9+GFUf+HOnSNzIVePevKD02316tOI7PXh/X88J6ozn6gdmG37+iaT7bbwNvJVCf9sL8uox7fL3u55q/b2qJt4wxG14My2fSt4VvCs4FnBs4I320pcj/EjVXs15tvK5662EGBG/M9N4jjfhWArMBEtfGfnI1SXhuUsIo9lcHBZWPaihY9z5MOKUFR2Io18VE6HZdfC2/TWprc2vbXpbViKOpftWLW3am/V3qq9Vfu5rNJh+WbVvqL2sa7MiHVNjl+NNYLr7opjNVb86vA8bwDojXkFpl9763lXgAfxq72Nc9V18BI/rvX2AXycOy3G08ZK2hevHpsJ+Dh3VwVbIK59dZNKs+PYUTmxBap7aUU2V9o0HyJyG3g2J3tpVdcA799LWzUJ87aL+jU+SMC6QVnTbAAAAABJRU5ErkJggg==";function fe(v){return k.request({url:"/api/agent-server/agent/promote/list",method:"post",data:v})}function be(v){return k.request({url:"/api/agent-server/agent/promote/bind",method:"post",data:v})}function Ae(v){return k.request({url:"/api/agent-server/api/promotionDoMain/getCnameIpInfo",method:"get",data:v})}function R(v){return k.request({url:"/api/agent-server/agent/promote/getPrivateDomainByCname",method:"get",data:v})}const K=v=>(me("data-v-2ee582fb"),v=v(),ue(),v),he={class:"user-list-wrap"},Ce={class:"titles"},Ue={class:"warpperTable"},Ie={key:0},Se={class:"private"},_e=K(()=>b("img",{src:ve,alt:"",class:"inputs_img"},null,-1)),ye=K(()=>b("img",{src:ge,alt:"",class:"inputs_img"},null,-1)),De={key:1,class:"share"},ke={class:"share_div"},Te={class:"share_div2"},Le={class:"share_div"},Ve={class:"share_div2"},je={class:"but"},Oe={__name:"extensionDomainName",setup(v){const{t:o}=ie(),N=le(),e=se({recordList:[],columns:[{prop:"agentId",label:o("CUST.dlID")},{prop:"agentAccount",label:o("CUST.translate209")},{prop:"agentLevel",label:o("CUST.translate320"),slot:"agentLevel"},{prop:"parentAccount",label:o("CUST.translate203"),slot:"parentAccount"},{prop:"promoteDomain",label:o("CUST.translate321"),slot:"copyLink",minWidth:250},{prop:"defaultCname",label:o("CUST.translate322"),width:200,slot:"cname"},{prop:"privateDomainList",label:o("CUST.translate316"),minWidth:250,slot:"privateDomainList"},{label:o("CUST.translate143"),fixed:"right",slot:"action",width:155}],levelList:[{label:o("CUST.translate190"),value:""},{label:o("CUST.translate197"),value:0},{label:o("CUST.translate323"),value:1},{label:o("CUST.translate324"),value:2},{label:o("CUST.translate325"),value:3},{label:o("CUST.translate326"),value:4},{label:o("CUST.translate326"),value:5},{label:o("CUST.translate326"),value:6},{label:o("CUST.translate326"),value:7},{label:o("CUST.translate326"),value:8}],total:0,pageSize:10,current:1,formInline:{},checkDia:!1,checkFormRef:null,checkForm:{cnameId:"",account1:"",rules:[]},checkDiaType:"",agentId:"",domainId:"",cnameId:null,promoteDomain:"",promoteDomains:"",datas1:{},privates:[],canmeOptions:[],loading:!0,actionLoading:!0,privatesObj:{}}),{checkDia:D,checkForm:q,checkFormRef:T,recordList:we}=re(e);ce(()=>{L()});const L=()=>{e.loading=!0,fe(e.formInline).then(a=>{if(e.loading=!1,a.code===200){const n=a.rows||[];let t=a.total;n.map(c=>{c.privateDomainList=[],c.privateDomains&&(c.privateDomains||"").split("|").map(C=>{C&&c.bindCname&&c.privateDomainList.push(`${C}(${c.bindCname})`)})});let r=[],u=[];for(let c=0;c<n.length;c++){const C=u.indexOf(n[c].agentId);C===-1?(u.push(n[c].agentId),r.push(n[c])):(r[C].privateDomainList=r[C].privateDomainList.concat(n[c].privateDomainList),t=t-1)}e.recordList=r,e.total=t}})},X=()=>{e.formInline={agentAccount:""},F()},F=()=>{L(),console.log(e.formInline)},H=a=>{e.actionLoading=!0,e.checkDia=!0,e.checkDiaType="1",e.agentId=a.agentId,e.canmeOptions=[],e.privatesObj={},Ae({groupId:a.groupId}).then(n=>{e.actionLoading=!1,n.data&&(e.canmeOptions=n.data||[],e.canmeOptions.length&&(e.cnameId=e.canmeOptions[0].cnameId,e.privatesObj[e.cnameId]=[{cnameId:e.cnameId,privateDomain:""}],e.actionLoading=!0,R({agentId:a.agentId,cnameId:e.canmeOptions[0].cnameId}).then(t=>{e.actionLoading=!1,t!=null&&t.data.length&&(e.privatesObj[e.canmeOptions[0].cnameId]=t==null?void 0:t.data)}).catch(()=>{e.actionLoading=!1})))}).catch(()=>{e.actionLoading=!1})},P=async a=>{let n=!1;Object.keys(e.privatesObj).map(t=>{t==a&&(n=!0)}),n||(e.actionLoading=!0,e.privatesObj[a]=[{canme:e.cname,cnameId:a,privateDomain:""}],R({agentId:e.agentId,cnameId:a}).then(t=>{e.actionLoading=!1,t!=null&&t.length&&(e.privatesObj[a]=t==null?void 0:t.data),(t==null?void 0:t.data)&&(t==null?void 0:t.data.length)&&(e.privatesObj[a]=t==null?void 0:t.data)}))},J=a=>{ne(document.querySelector(`#${a}`)).then(n=>{let t=n.toDataURL("image/png"),r=document.createElement("a");r.href=t,r.download=new Date().toLocaleString()+".png",document.body.appendChild(r),r.click(),document.body.removeChild(r)})},G=()=>{e.privatesObj[e.cnameId]=[...e.privatesObj[e.cnameId],{cnameId:e.cnameId,privateDomain:""}]},Z=a=>{const n=e.privatesObj[e.cnameId].filter((t,r)=>r!==a);e.privatesObj[e.cnameId]=n},V=()=>{T.value!==null&&T.value.resetFields(),D.value=!1,e.checkForm.rules=[]},E=async()=>{const a=[];e.actionLoading=!0,Object.keys(e.privatesObj).map(n=>{e.privatesObj[n].map(r=>{const u={privateDomain:r.privateDomain,cnameId:r.cnameId,agentId:e.agentId,operator:JSON.parse(sessionStorage.getItem("userInfo")).agentAccount};a.push(u)})}),be(a).then(n=>{e.actionLoading=!1,n.code===200?(V(),L(),O.success(o("CUST.translate146"))):O.error(n.msg)})};function Y(a){}function Q(a){}const j=()=>{O.success(`${o("CUST.translate144")}\uFF01`)};return(a,n)=>{const t=h("el-input"),r=h("el-form-item"),u=h("el-button"),c=h("el-form"),C=h("el-option"),$=h("el-select"),W=h("el-icon"),ee=h("el-scrollbar"),te=h("el-dialog"),I=z("clipboard"),x=z("loading");return p(),g("div",he,[b("div",Ce,d(a.$t("CUST.translate308")),1),s(c,{inline:!0,model:e.formInline,class:"demo-form-inline"},{default:i(()=>[s(r,{label:`${m(o)("CUST.translate209")}\uFF1A`,class:"form-items-body"},{default:i(()=>[s(t,{modelValue:e.formInline.agentAccount,"onUpdate:modelValue":n[0]||(n[0]=l=>e.formInline.agentAccount=l),placeholder:m(o)("CUST.translate242"),class:"form-items",clearable:""},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),s(r,null,{default:i(()=>[s(u,{class:"buts",onClick:F},{default:i(()=>[f(d(a.$t("CUST.translate195")),1)]),_:1})]),_:1}),s(r,null,{default:i(()=>[s(u,{onClick:X,class:"resetButton"},{default:i(()=>[f(d(a.$t("CUST.translate196")),1)]),_:1})]),_:1})]),_:1},8,["model"]),S((p(),g("div",Ue,[s(ae,{data:e.recordList,columns:e.columns,total:e.total,pageSize:e.pageSize,current:e.current,pageUpdate:Y,sizeUpdate:Q,maxHeight:"calc(100vh - 330px)"},{agentLevel:i(({row:l})=>[f(d(isNaN(l.agentLevel*1)?l.agentLevel:e.levelList[l.agentLevel].label),1)]),parentAccount:i(({row:l})=>[f(d(l.parentAccount!==null&&l.parentAccount!==void 0?l.parentAccount:m(o)("CUST.translate309")),1)]),copyLink:i(({row:l})=>[(p(!0),g(_,null,y((l.otherDomain||"").split("|"),(A,U)=>S((p(),g("div",{style:{cursor:"copy","margin-bottom":"5px"},key:U},[f(d(A),1)])),[[I,A,"copy"],[I,j,"success"]])),128))]),cname:i(({row:l})=>[(p(!0),g(_,null,y((l.otherCname||"").split("|"),(A,U)=>S((p(),g("div",{style:{cursor:"copy"},key:U},[f(d(A),1)])),[[I,A,"copy"],[I,j,"success"]])),128))]),privateDomainList:i(({row:l})=>[b("div",null,[(p(!0),g(_,null,y(l.privateDomainList,(A,U)=>S((p(),g("p",{key:U,class:"cname",style:{cursor:"copy","margin-bottom":"5px"}},[f(d(A),1)])),[[I,A,"copy"],[I,j,"success"]])),128))])]),action:i(({row:l})=>[s(u,{type:"success",size:"small",plain:"",onClick:A=>H(l)},{default:i(()=>[f(d(a.$t("CUST.translate311")),1)]),_:2},1032,["onClick"])]),_:1},8,["data","columns","total","pageSize","current"])])),[[x,e.loading]]),s(te,{modelValue:m(D),"onUpdate:modelValue":n[4]||(n[4]=l=>de(D)?D.value=l:null),"before-close":V,title:e.checkDiaType==="1"?m(o)("CUST.translate312"):m(o)("CUST.translate313"),width:(m(N).lang==="zh",600)},pe({default:i(()=>[e.checkDiaType==="1"?S((p(),g("div",Ie,[s(ee,{"max-height":"400px"},{default:i(()=>[s(c,{model:m(q),ref_key:"checkFormRef",ref:T,"label-width":m(N).lang==="zh"?"150px":"180px","label-position":"right",style:{"min-height":"200px"}},{default:i(()=>[s(r,{prop:"cnameId",label:`${m(o)("CUST.translate314")}\uFF1A`},{default:i(()=>[s($,{modelValue:e.cnameId,"onUpdate:modelValue":n[1]||(n[1]=l=>e.cnameId=l),class:"selectStyle",placeholder:m(o)("CUST.translate420"),size:"large",onChange:P},{default:i(()=>[(p(!0),g(_,null,y(e.canmeOptions,l=>(p(),w(C,{key:l.cnameId,value:l.cnameId,label:l.cname},null,8,["value","label"]))),128))]),_:1},8,["modelValue","placeholder"])]),_:1},8,["label"]),(p(!0),g(_,null,y(e.privatesObj[e.cnameId],(l,A)=>(p(),w(r,{prop:"account1",label:`${m(o)("CUST.translate316")}\uFF1A`,key:l.id},{default:i(()=>[b("div",Se,[s(t,{modelValue:l.privateDomain,"onUpdate:modelValue":U=>l.privateDomain=U,placeholder:m(o)("CUST.translate317"),clearable:"",class:"inputs"},null,8,["modelValue","onUpdate:modelValue","placeholder"]),s(u,{onClick:G,style:{"margin-left":"15px",border:"none",background:"none"}},{default:i(()=>[s(W,null,{default:i(()=>[_e]),_:1})]),_:1}),e.privatesObj[e.cnameId].length>1?(p(),w(u,{key:0,onClick:U=>Z(A),style:{"margin-left":"10px",border:"none",background:"none"}},{default:i(()=>[s(W,null,{default:i(()=>[ye]),_:1})]),_:2},1032,["onClick"])):B("",!0)])]),_:2},1032,["label"]))),128))]),_:1},8,["model","label-width"])]),_:1})])),[[x,e.actionLoading]]):B("",!0),e.checkDiaType==="2"?(p(),g("div",De,[b("div",ke,[b("div",Te,[s(M,{value:m(o)("CUST.translate318"),id:"captureId",style:{width:"120px",height:"120px"}},null,8,["value"]),b("div",null,d(a.$t("CUST.translate318")),1)]),s(u,{round:"",onClick:n[2]||(n[2]=l=>J("captureId")),class:"share_div_but"},{default:i(()=>[f(d(a.$t("CUST.translate72")),1)]),_:1})]),b("div",Le,[b("div",Ve,[s(M,{value:m(o)("CUST.translate319"),id:"captureId2",style:{width:"120px",height:"120px"}},null,8,["value"]),b("div",null,d(a.$t("CUST.translate319")),1)]),s(u,{round:"",onClick:n[3]||(n[3]=l=>J("captureId2")),class:"share_div_but"},{default:i(()=>[f(d(a.$t("CUST.translate72")),1)]),_:1})])])):B("",!0)]),_:2},[e.checkDiaType==="1"?{name:"footer",fn:i(()=>[b("div",je,[s(u,{size:"medium",onClick:V,class:"buts1"},{default:i(()=>[f(d(a.$t("CUST.translate97")),1)]),_:1}),s(u,{type:"primary",size:"medium",onClick:E,loading:e.actionLoading,class:"buts2"},{default:i(()=>[f(d(a.$t("CUST.translate98")),1)]),_:1},8,["loading"])])]),key:"0"}:void 0]),1032,["modelValue","title","width"])])}}};var It=oe(Oe,[["__scopeId","data-v-2ee582fb"]]);export{It as default};
