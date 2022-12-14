function c(o){if(typeof o!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(o))}function A(o,e){for(var r="",i=0,l=-1,t=0,n,f=0;f<=o.length;++f){if(f<o.length)n=o.charCodeAt(f);else{if(n===47)break;n=47}if(n===47){if(!(l===f-1||t===1))if(l!==f-1&&t===2){if(r.length<2||i!==2||r.charCodeAt(r.length-1)!==46||r.charCodeAt(r.length-2)!==46){if(r.length>2){var s=r.lastIndexOf("/");if(s!==r.length-1){s===-1?(r="",i=0):(r=r.slice(0,s),i=r.length-1-r.lastIndexOf("/")),l=f,t=0;continue}}else if(r.length===2||r.length===1){r="",i=0,l=f,t=0;continue}}e&&(r.length>0?r+="/..":r="..",i=2)}else r.length>0?r+="/"+o.slice(l+1,f):r=o.slice(l+1,f),i=f-l-1;l=f,t=0}else n===46&&t!==-1?++t:t=-1}return r}function b(o,e){var r=e.dir||e.root,i=e.base||(e.name||"")+(e.ext||"");return r?r===e.root?r+i:r+o+i:i}var g={resolve:function(){for(var e="",r=!1,i,l=arguments.length-1;l>=-1&&!r;l--){var t;l>=0?t=arguments[l]:(i===void 0&&(i=process.cwd()),t=i),c(t),t.length!==0&&(e=t+"/"+e,r=t.charCodeAt(0)===47)}return e=A(e,!r),r?e.length>0?"/"+e:"/":e.length>0?e:"."},normalize:function(e){if(c(e),e.length===0)return".";var r=e.charCodeAt(0)===47,i=e.charCodeAt(e.length-1)===47;return e=A(e,!r),e.length===0&&!r&&(e="."),e.length>0&&i&&(e+="/"),r?"/"+e:e},isAbsolute:function(e){return c(e),e.length>0&&e.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var e,r=0;r<arguments.length;++r){var i=arguments[r];c(i),i.length>0&&(e===void 0?e=i:e+="/"+i)}return e===void 0?".":g.normalize(e)},relative:function(e,r){if(c(e),c(r),e===r||(e=g.resolve(e),r=g.resolve(r),e===r))return"";for(var i=1;i<e.length&&e.charCodeAt(i)===47;++i);for(var l=e.length,t=l-i,n=1;n<r.length&&r.charCodeAt(n)===47;++n);for(var f=r.length,s=f-n,v=t<s?t:s,u=-1,a=0;a<=v;++a){if(a===v){if(s>v){if(r.charCodeAt(n+a)===47)return r.slice(n+a+1);if(a===0)return r.slice(n+a)}else t>v&&(e.charCodeAt(i+a)===47?u=a:a===0&&(u=0));break}var m=e.charCodeAt(i+a),C=r.charCodeAt(n+a);if(m!==C)break;m===47&&(u=a)}var d="";for(a=i+u+1;a<=l;++a)(a===l||e.charCodeAt(a)===47)&&(d.length===0?d+="..":d+="/..");return d.length>0?d+r.slice(n+u):(n+=u,r.charCodeAt(n)===47&&++n,r.slice(n))},_makeLong:function(e){return e},dirname:function(e){if(c(e),e.length===0)return".";for(var r=e.charCodeAt(0),i=r===47,l=-1,t=!0,n=e.length-1;n>=1;--n)if(r=e.charCodeAt(n),r===47){if(!t){l=n;break}}else t=!1;return l===-1?i?"/":".":i&&l===1?"//":e.slice(0,l)},basename:function(e,r){if(r!==void 0&&typeof r!="string")throw new TypeError('"ext" argument must be a string');c(e);var i=0,l=-1,t=!0,n;if(r!==void 0&&r.length>0&&r.length<=e.length){if(r.length===e.length&&r===e)return"";var f=r.length-1,s=-1;for(n=e.length-1;n>=0;--n){var v=e.charCodeAt(n);if(v===47){if(!t){i=n+1;break}}else s===-1&&(t=!1,s=n+1),f>=0&&(v===r.charCodeAt(f)?--f===-1&&(l=n):(f=-1,l=s))}return i===l?l=s:l===-1&&(l=e.length),e.slice(i,l)}else{for(n=e.length-1;n>=0;--n)if(e.charCodeAt(n)===47){if(!t){i=n+1;break}}else l===-1&&(t=!1,l=n+1);return l===-1?"":e.slice(i,l)}},extname:function(e){c(e);for(var r=-1,i=0,l=-1,t=!0,n=0,f=e.length-1;f>=0;--f){var s=e.charCodeAt(f);if(s===47){if(!t){i=f+1;break}continue}l===-1&&(t=!1,l=f+1),s===46?r===-1?r=f:n!==1&&(n=1):r!==-1&&(n=-1)}return r===-1||l===-1||n===0||n===1&&r===l-1&&r===i+1?"":e.slice(r,l)},format:function(e){if(e===null||typeof e!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return b("/",e)},parse:function(e){c(e);var r={root:"",dir:"",base:"",ext:"",name:""};if(e.length===0)return r;var i=e.charCodeAt(0),l=i===47,t;l?(r.root="/",t=1):t=0;for(var n=-1,f=0,s=-1,v=!0,u=e.length-1,a=0;u>=t;--u){if(i=e.charCodeAt(u),i===47){if(!v){f=u+1;break}continue}s===-1&&(v=!1,s=u+1),i===46?n===-1?n=u:a!==1&&(a=1):n!==-1&&(a=-1)}return n===-1||s===-1||a===0||a===1&&n===s-1&&n===f+1?s!==-1&&(f===0&&l?r.base=r.name=e.slice(1,s):r.base=r.name=e.slice(f,s)):(f===0&&l?(r.name=e.slice(1,n),r.base=e.slice(1,s)):(r.name=e.slice(f,n),r.base=e.slice(f,s)),r.ext=e.slice(n,s)),f>0?r.dir=e.slice(0,f-1):l&&(r.dir="/"),r},sep:"/",delimiter:":",win32:null,posix:null};g.posix=g;var h=g;export{h as p};
