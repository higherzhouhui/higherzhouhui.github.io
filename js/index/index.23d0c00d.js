import{_ as p}from"../../assets/index.a78b18fa.js";import{f,g as m,h as y}from"../element-plus/element-plus.264a2030.js";import{a0 as _,j as v,af as n}from"../@vue/@vue.ac555ff6.js";const h={name:"Table",props:{data:{type:Array,default:()=>[]},columns:{type:Array,default:()=>[]},total:{type:Number,default:0},current:{type:Number,default:1},pageSize:{type:Number,default:10},align:{type:String,default:"center"},hidePagination:{type:String,default:""},showOverflowTooltip:{type:Boolean,default:!0}},setup(e,o){var i;const d=s=>s.map(a=>{var c;const{slot:t,...r}=a,g={...r,align:e.align,showOverflowTooltip:e.showOverflowTooltip};return n(y,g,(c=o.slots[t])!=null?c:null)}),l=_({key:1,isReRender:!0,columns:[]});v(()=>{l.key+=1,l.columns=d(e.columns)});const u={background:!1,layout:"total, sizes, prev, pager, next, jumper","current-page":1,...(i=e.pageProps)!=null?i:{}};return()=>{var s;return n("div",{key:l.key,class:"config-table-wrap"},[n(f,{data:e.data,style:{width:"100%"},...o.attrs},l.columns),e.hidePagination?null:n("div",{class:"page-wrap mt-20"},n(m,{...u,total:(s=e.total)!=null?s:0,"current-page":e.current,"page-size":e.pageSize,"page-sizes":[10,15,20,25],onCurrentChange(a){var t,r;console.log(e,"props"),l.isReRender=!1,u["current-page"]=a,(r=(t=o.attrs).pageUpdate)==null||r.call(t,a)},onSizeChange(a){var t,r;l.isReRender=!1,u["current-page"]=a,(r=(t=o.attrs).sizeUpdate)==null||r.call(t,a)}}))])}}};var z=p(h,[["__scopeId","data-v-3c6399c1"]]);export{z as T};
