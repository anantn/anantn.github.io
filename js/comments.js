!function(){var requirejs,require,define;!function(e){function t(e,t){return v.call(e,t)}function n(e,t){var n,i,o,r,a,s,l,u,c,d,p,f=t&&t.split("/"),h=m.map,v=h&&h["*"]||{};if(e&&"."===e.charAt(0))if(t){for(a=(e=e.split("/")).length-1,m.nodeIdCompat&&b.test(e[a])&&(e[a]=e[a].replace(b,"")),e=f.slice(0,f.length-1).concat(e),c=0;c<e.length;c+=1)if("."===(p=e[c]))e.splice(c,1),c-=1;else if(".."===p){if(1===c&&(".."===e[2]||".."===e[0]))break;c>0&&(e.splice(c-1,2),c-=2)}e=e.join("/")}else 0===e.indexOf("./")&&(e=e.substring(2));if((f||v)&&h){for(c=(n=e.split("/")).length;c>0;c-=1){if(i=n.slice(0,c).join("/"),f)for(d=f.length;d>0;d-=1)if((o=h[f.slice(0,d).join("/")])&&(o=o[i])){r=o,s=c;break}if(r)break;!l&&v&&v[i]&&(l=v[i],u=c)}!r&&l&&(r=l,s=u),r&&(n.splice(0,s,r),e=n.join("/"))}return e}function i(t,n){return function(){var i=g.call(arguments,0);return"string"!=typeof i[0]&&1===i.length&&i.push(null),u.apply(e,i.concat([t,n]))}}function o(e){return function(t){p[e]=t}}function r(n){if(t(f,n)){var i=f[n];delete f[n],h[n]=!0,l.apply(e,i)}if(!t(p,n)&&!t(h,n))throw new Error("No "+n);return p[n]}function a(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function s(e){return function(){return m&&m.config&&m.config[e]||{}}}var l,u,c,d,p={},f={},m={},h={},v=Object.prototype.hasOwnProperty,g=[].slice,b=/\.js$/;c=function(e,t){var i,o=a(e),s=o[0];return e=o[1],s&&(i=r(s=n(s,t))),s?e=i&&i.normalize?i.normalize(e,function(e){return function(t){return n(t,e)}}(t)):n(e,t):(s=(o=a(e=n(e,t)))[0],e=o[1],s&&(i=r(s))),{f:s?s+"!"+e:e,n:e,pr:s,p:i}},d={require:function(e){return i(e)},exports:function(e){var t=p[e];return void 0!==t?t:p[e]={}},module:function(e){return{id:e,uri:"",exports:p[e],config:s(e)}}},l=function(n,a,s,l){var u,m,v,g,b,w,y=[],x=typeof s;if(l=l||n,"undefined"===x||"function"===x){for(a=!a.length&&s.length?["require","exports","module"]:a,b=0;b<a.length;b+=1)if("require"===(m=(g=c(a[b],l)).f))y[b]=d.require(n);else if("exports"===m)y[b]=d.exports(n),w=!0;else if("module"===m)u=y[b]=d.module(n);else if(t(p,m)||t(f,m)||t(h,m))y[b]=r(m);else{if(!g.p)throw new Error(n+" missing "+m);g.p.load(g.n,i(l,!0),o(m),{}),y[b]=p[m]}v=s?s.apply(p[n],y):void 0,n&&(u&&u.exports!==e&&u.exports!==p[n]?p[n]=u.exports:v===e&&w||(p[n]=v))}else n&&(p[n]=s)},requirejs=require=u=function(t,n,i,o,a){if("string"==typeof t)return d[t]?d[t](n):r(c(t,n).f);if(!t.splice){if((m=t).deps&&u(m.deps,m.callback),!n)return;n.splice?(t=n,n=i,i=null):t=e}return n=n||function(){},"function"==typeof i&&(i=o,o=a),o?l(e,t,n,i):setTimeout((function(){l(e,t,n,i)}),4),u},u.config=function(e){return u(e)},requirejs._defined=p,define=function(e,n,i){if("string"!=typeof e)throw new Error("See almond README: incorrect module build, no module name");n.splice||(i=n,n=[]),t(p,e)||t(f,e)||(f[e]=[e,n,i])},define.amd={jQuery:!0}}(),define("components/almond/almond",(function(){})),define("app/lib/ready",[],(function(){"use strict";var e=!1,t=function(t){e||(e=!0,t())};return function(e){document.addEventListener("DOMContentLoaded",(function(){t(e)})),("interactive"===document.readyState||"complete"===document.readyState)&&t(e)}})),define("app/config",[],(function(){"use strict";for(var e={css:!0,lang:(navigator.language||navigator.userLanguage).split("-")[0],"reply-to-self":!1,"require-email":!1,"require-author":!1,"max-comments-top":"inf","max-comments-nested":5,"reveal-on-click":5,avatar:!0,"avatar-bg":"#f0f0f0","avatar-fg":["#9abf88","#5698c4","#e279a3","#9163b6","#be5168","#f19670","#e4bf80","#447c69"].join(" "),vote:!0,"vote-levels":null},t=document.getElementsByTagName("script"),n=0;n<t.length;n++)for(var i=0;i<t[n].attributes.length;i++){var o=t[n].attributes[i];if(/^data-isso-/.test(o.name))try{e[o.name.substring(10)]=JSON.parse(o.value)}catch(t){e[o.name.substring(10)]=o.value}}return e["avatar-fg"]=e["avatar-fg"].split(" "),e})),define("app/i18n/en",{"postbox-text":"Type Comment Here (at least 3 chars)","postbox-author":"Name (optional)","postbox-email":"E-mail (optional)","postbox-website":"Website (optional)","postbox-submit":"Submit","num-comments":"One Comment\n{{ n }} Comments","no-comments":"No Comments Yet","comment-reply":"Reply","comment-edit":"Edit","comment-save":"Save","comment-delete":"Delete","comment-confirm":"Confirm","comment-close":"Close","comment-cancel":"Cancel","comment-deleted":"Comment deleted.","comment-queued":"Comment in queue for moderation.","comment-anonymous":"Anonymous","comment-hidden":"{{ n }} Hidden","date-now":"right now","date-minute":"a minute ago\n{{ n }} minutes ago","date-hour":"an hour ago\n{{ n }} hours ago","date-day":"Yesterday\n{{ n }} days ago","date-week":"last week\n{{ n }} weeks ago","date-month":"last month\n{{ n }} months ago","date-year":"last year\n{{ n }} years ago"}),define("app/i18n",["app/config","app/i18n/en"],(function(e,t){"use strict";var n=function(e){return"en"===e?function(e,t){return e[1===t?0:1]}:null},i=e.lang;n(i)||(i="en");var o={en:t},r=n(i),a=function(e){return o[i][e]||t[e]||"???"};return{lang:i,translate:a,pluralize:function(e,t){var n;return(n=a(e)).indexOf("\n")>-1&&(n=r(n.split("\n"),+t)),n?n.replace("{{ n }}",+t):n}}})),define("app/lib/promise",[],(function(){"use strict";var e=function(e){console.log(e)},t=function(){this.success=[],this.errors=[]};t.prototype.then=function(t,n){this.success.push(t),n?this.errors.push(n):this.errors.push(e)};var n=function(){this.promise=new t};n.prototype={promise:t,resolve:function(e){this.promise.success.forEach((function(t){window.setTimeout((function(){t(e)}),0)}))},reject:function(e){this.promise.errors.forEach((function(t){window.setTimeout((function(){t(e)}),0)}))}};return{defer:function(){return new n},when:function(e,n){return e instanceof t?e.then(n):n(e)}}})),define("app/globals",[],(function(){"use strict";var e=function(){this.values=[]};return e.prototype.update=function(e){this.values.push((new Date).getTime()-e.getTime())},e.prototype.localTime=function(){return new Date((new Date).getTime()-this.values.reduce((function(e,t){return e+t}))/this.values.length)},{offset:new e}})),define("app/api",["app/lib/promise","app/globals"],(function(e,t){"use strict";for(var n,i,o=window.location.pathname,r=document.getElementsByTagName("script"),a=0;a<r.length;a++)if(r[a].hasAttribute("data-isso")){i=r[a].getAttribute("data-isso");break}if(!i){for(a=0;a<r.length;a++)if(r[a].getAttribute("async")||r[a].getAttribute("defer"))throw"Isso's automatic configuration detection failed, please refer to https://github.com/posativ/isso#client-configuration and add a custom `data-isso` attribute.";n=r[r.length-1],i=n.src.substring(0,n.src.length-"/js/embed.min.js".length)}"/"===i[i.length-1]&&(i=i.substring(0,i.length-1));var s=function(e,n,i,o,r){var a=new XMLHttpRequest;try{a.open(e,n,!0),a.withCredentials=!0,a.setRequestHeader("Content-Type","application/json"),a.onreadystatechange=function(){4===a.readyState&&function(){var e=a.getResponseHeader("Date");null!==e&&t.offset.update(new Date(e));var n=a.getResponseHeader("X-Set-Cookie");n&&n.match(/^isso-/)&&(document.cookie=n),a.status>=500?r&&r(a.body):o({status:a.status,body:a.responseText})}()}}catch(e){(r||console.log)(e.message)}a.send(i)},l=function(e){var t="";for(var n in e)e.hasOwnProperty(n)&&null!==e[n]&&void 0!==e[n]&&(t+=n+"="+encodeURIComponent(e[n])+"&");return t.substring(0,t.length-1)};return{endpoint:i,salt:"Eech7co8Ohloopo9Ol6baimi",create:function(t,n){var r=e.defer();return s("POST",i+"/new?"+l({uri:t||o}),JSON.stringify(n),(function(e){201===e.status||202===e.status?r.resolve(JSON.parse(e.body)):r.reject(e.body)})),r.promise},modify:function(t,n){var o=e.defer();return s("PUT",i+"/id/"+t,JSON.stringify(n),(function(e){403===e.status?o.reject("Not authorized to modify this comment!"):200===e.status?o.resolve(JSON.parse(e.body)):o.reject(e.body)})),o.promise},remove:function(t){var n=e.defer();return s("DELETE",i+"/id/"+t,null,(function(e){403===e.status?n.reject("Not authorized to remove this comment!"):200===e.status?n.resolve(null===JSON.parse(e.body)):n.reject(e.body)})),n.promise},view:function(t,n){var o=e.defer();return s("GET",i+"/id/"+t+"?"+l({plain:n}),null,(function(e){o.resolve(JSON.parse(e.body))})),o.promise},fetch:function(t,n,r,a,u){void 0===n&&(n="inf"),void 0===r&&(r="inf"),void 0===a&&(a=null);var c={uri:t||o,after:u,parent:a};"inf"!==n&&(c.limit=n),"inf"!==r&&(c.nested_limit=r);var d=e.defer();return s("GET",i+"/?"+l(c),null,(function(e){200===e.status?d.resolve(JSON.parse(e.body)):404===e.status?d.resolve({total_replies:0}):d.reject(e.body)})),d.promise},count:function(t){var n=e.defer();return s("POST",i+"/count",JSON.stringify(t),(function(e){200===e.status?n.resolve(JSON.parse(e.body)):n.reject(e.body)})),n.promise},like:function(t){var n=e.defer();return s("POST",i+"/id/"+t+"/like",null,(function(e){n.resolve(JSON.parse(e.body))})),n.promise},dislike:function(t){var n=e.defer();return s("POST",i+"/id/"+t+"/dislike",null,(function(e){n.resolve(JSON.parse(e.body))})),n.promise}}})),define("app/dom",[],(function(){"use strict";function e(e){this.obj=e,this.replace=function(t){var i=n.htmlify(t);return e.parentNode.replaceChild(i.obj,e),i},this.prepend=function(t){var i=n.htmlify(t);return e.insertBefore(i.obj,e.firstChild),i},this.append=function(t){var i=n.htmlify(t);return e.appendChild(i.obj),i},this.insertAfter=function(t){var i=n.htmlify(t);return e.parentNode.insertBefore(i.obj,e.nextSibling),i},this.on=function(t,n,i){e.addEventListener(t,(function(e){n(e),(void 0===i||i)&&e.preventDefault()}))},this.toggle=function(e,n,i){var o=new t(n,i);this.on(e,(function(){o.next()}))},this.detach=function(){return e.parentNode.removeChild(this.obj),this},this.remove=function(){e.parentNode.removeChild(this.obj)},this.show=function(){e.style.display="block"},this.hide=function(){e.style.display="none"},this.setText=function(t){e.textContent=t},this.setHtml=function(t){e.innerHTML=t},this.blur=function(){e.blur()},this.focus=function(){e.focus()},this.scrollIntoView=function(t){e.scrollIntoView(t)},this.setAttribute=function(t,n){e.setAttribute(t,n)},this.getAttribute=function(t){return e.getAttribute(t)},this.classList=e.classList,Object.defineProperties(this,{textContent:{get:function(){return e.textContent},set:function(t){e.textContent=t}},innerHTML:{get:function(){return e.innerHTML},set:function(t){e.innerHTML=t}},value:{get:function(){return e.value},set:function(t){e.value=t}},placeholder:{get:function(){return e.placeholder},set:function(t){e.placeholder=t}}})}var t=function(e,t){this.state=!1,this.next=function(){this.state?(this.state=!1,t(this)):(this.state=!0,e(this))},this.wait=function(){this.state=!this.state}},n=function(t,n,i){void 0===i&&(i=!0),n||(n=window.document),n instanceof e&&(n=n.obj);var o=[].slice.call(n.querySelectorAll(t),0);return 0===o.length?null:1===o.length&&i?new e(o[0]):(o=[].slice.call(o,0)).map((function(t){return new e(t)}))};return n.htmlify=function(t){if(t instanceof e)return t;if(t instanceof window.Element)return new e(t);var i=n.new("div");return i.innerHTML=t,new e(i.firstChild)},n.new=function(e,t){var n=document.createElement(e.split(".")[0]);return e.split(".").slice(1).forEach((function(e){n.classList.add(e)})),["A","LINK"].indexOf(n.nodeName)>-1&&(n.href="#"),t||0===t||(t=""),["TEXTAREA","INPUT"].indexOf(n.nodeName)>-1?n.value=t:n.textContent=t,n},n.each=function(e,t){Array.prototype.forEach.call(document.getElementsByTagName(e),t)},n})),define("app/utils",["app/i18n"],(function(e){"use strict";var t,n={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};try{localStorage.setItem("x","y"),localStorage.removeItem("x"),t=localStorage}catch(e){t=function(e){return{setItem:function(t,n){e[t]=n},getItem:function(t){return void 0!==e[t]?e[t]:null},removeItem:function(t){delete e[t]}}}({})}return{cookie:function(e){return(document.cookie.match("(^|; )"+e+"=([^;]*)")||0)[2]},pad:function(e,t,n){return n=n||"0",(e+="").length>=t?e:new Array(t-e.length+1).join(n)+e},ago:function(t,n){var i=(t.getTime()-n.getTime())/1e3;(isNaN(i)||0>i)&&(i=0);var o=Math.ceil(i/60),r=Math.ceil(o/60),a=Math.ceil(r/24);return 45>=i&&e.translate("date-now")||90>=i&&e.pluralize("date-minute",1)||45>=o&&e.pluralize("date-minute",o)||90>=o&&e.pluralize("date-hour",1)||22>=r&&e.pluralize("date-hour",r)||36>=r&&e.pluralize("date-day",1)||5>=a&&e.pluralize("date-day",a)||8>=a&&e.pluralize("date-week",1)||21>=a&&e.pluralize("date-week",Math.ceil(a/7))||45>=a&&e.pluralize("date-month",1)||345>=a&&e.pluralize("date-month",Math.ceil(a/30))||547>=a&&e.pluralize("date-year",1)||e.pluralize("date-year",Math.ceil(a/365.25))},text:function(e){var t=document.createElement("div");return t.innerHTML=e.replace(/<div><br><\/div>/gi,"<br>").replace(/<div>/gi,"<br>").replace(/<br>/gi,"\n").replace(/&nbsp;/gi," "),t.textContent.trim()},detext:function(e){return(e=function(e){return String(e).replace(/[&<>"'\/]/g,(function(e){return n[e]}))}(e)).replace(/\n\n/gi,"<br><div><br></div>").replace(/\n/gi,"<br>")},localStorageImpl:t}})),function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define("libjs-jade-runtime",[],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).jade=e()}}((function(){return function e(t,n,i){function o(a,s){if(!n[a]){if(!t[a]){var l="function"==typeof require&&require;if(!s&&l)return l(a,!0);if(r)return r(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var c=n[a]={exports:{}};t[a][0].call(c.exports,(function(e){var n=t[a][1][e];return o(n||e)}),c,c.exports,e,t,n,i)}return n[a].exports}for(var r="function"==typeof require&&require,a=0;a<i.length;a++)o(i[a]);return o}({1:[function(e,t,n){"use strict";function i(e){return null!=e&&""!==e}function o(e){return(Array.isArray(e)?e.map(o):e&&"object"==typeof e?Object.keys(e).filter((function(t){return e[t]})):[e]).filter(i).join(" ")}function r(e){return a[e]||e}n.merge=function e(t,n){if(1===arguments.length){for(var o=t[0],r=1;r<t.length;r++)o=e(o,t[r]);return o}var a=t.class,s=n.class;for(var l in(a||s)&&(a=a||[],s=s||[],Array.isArray(a)||(a=[a]),Array.isArray(s)||(s=[s]),t.class=a.concat(s).filter(i)),n)"class"!=l&&(t[l]=n[l]);return t},n.joinClasses=o,n.cls=function(e,t){for(var i=[],r=0;r<e.length;r++)t&&t[r]?i.push(n.escape(o([e[r]]))):i.push(o(e[r]));var a=o(i);return a.length?' class="'+a+'"':""},n.style=function(e){return e&&"object"==typeof e?Object.keys(e).map((function(t){return t+":"+e[t]})).join(";"):e},n.attr=function(e,t,i,o){return"style"===e&&(t=n.style(t)),"boolean"==typeof t||null==t?t?" "+(o?e:e+'="'+e+'"'):"":0==e.indexOf("data")&&"string"!=typeof t?(-1!==JSON.stringify(t).indexOf("&")&&console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes will be escaped to `&amp;`"),t&&"function"==typeof t.toISOString&&console.warn("Jade will eliminate the double quotes around dates in ISO form after 2.0.0")," "+e+"='"+JSON.stringify(t).replace(/'/g,"&apos;")+"'"):i?(t&&"function"==typeof t.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+e+'="'+n.escape(t)+'"'):(t&&"function"==typeof t.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+e+'="'+t+'"')},n.attrs=function(e,t){var i=[],r=Object.keys(e);if(r.length)for(var a=0;a<r.length;++a){var s=r[a],l=e[s];"class"==s?(l=o(l))&&i.push(" "+s+'="'+l+'"'):i.push(n.attr(s,l,!1,t))}return i.join("")};var a={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"},s=/[&<>"]/g;n.escape=function(e){var t=String(e).replace(s,r);return t===""+e?e:t},n.rethrow=function t(n,i,o,r){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&i||r))throw n.message+=" on line "+o,n;try{r=r||e("fs").readFileSync(i,"utf8")}catch(e){t(n,null,o)}var a=3,s=r.split("\n"),l=Math.max(o-a,0),u=Math.min(s.length,o+a);a=s.slice(l,u).map((function(e,t){var n=t+l+1;return(n==o?"  > ":"    ")+n+"| "+e})).join("\n");throw n.path=i,n.message=(i||"Jade")+":"+o+"\n"+a+"\n\n"+n.message,n},n.DebugItem=function(e,t){this.lineno=e,this.filename=t}},{fs:2}],2:[function(e,t,n){},{}]},{},[1])(1)})),define("jade",{load:function(e){throw new Error("Dynamic load not allowed: "+e)}}),define("jade!app/text/postbox",(function(){return function(e){var t,n=[],i=e||{};return function(e,i,o,r){n.push('<div class="isso-postbox"><div class="form-wrapper"><div class="textarea-wrapper"><div contenteditable="true" class="textarea placeholder">'+jade.escape(null==(t=o("postbox-text"))?"":t)+'</div></div><section class="auth-section"><p class="input-wrapper"><input type="text" name="author"'+jade.attr("placeholder",o("postbox-author"),!0,!1)+jade.attr("value",null!==e?""+e:"",!0,!1)+'/></p><p class="input-wrapper"><input type="email" name="email"'+jade.attr("placeholder",o("postbox-email"),!0,!1)+jade.attr("value",null!=i?""+i:"",!0,!1)+'/></p><p class="input-wrapper"><input type="text" name="website"'+jade.attr("placeholder",o("postbox-website"),!0,!1)+jade.attr("value",null!=r?""+r:"",!0,!1)+'/></p><p class="post-action"><input type="submit"'+jade.attr("value",o("postbox-submit"),!0,!1)+"/></p></section></div></div>")}.call(this,"author"in i?i.author:"undefined"!=typeof author?author:void 0,"email"in i?i.email:"undefined"!=typeof email?email:void 0,"i18n"in i?i.i18n:"undefined"!=typeof i18n?i18n:void 0,"website"in i?i.website:"undefined"!=typeof website?website:void 0),n.join("")}})),define("jade!app/text/comment",(function(){return function(e){var t,n=[],i=e||{};return function(e,i,o,r,a,s,l){n.push("<div"+jade.attr("id","isso-"+i.id,!0,!1)+' class="isso-comment">'),o.avatar&&n.push('<div class="avatar"><svg'+jade.attr("data-hash",""+i.hash,!0,!1)+"></svg></div>"),n.push('<div class="text-wrapper"><div role="meta" class="isso-comment-header">'),e(i.website)?n.push("<a"+jade.attr("href",""+i.website,!0,!1)+' rel="nofollow" class="author">'+jade.escape(null==(t=e(i.author)?i.author:s("comment-anonymous"))?"":t)+"</a>"):n.push('<span class="author">'+jade.escape(null==(t=e(i.author)?i.author:s("comment-anonymous"))?"":t)+"</span>"),n.push('<span class="spacer">&bull;</span><a'+jade.attr("href","#isso-"+i.id,!0,!1)+' class="permalink"><time'+jade.attr("title",""+a(i.created),!0,!1)+jade.attr("datetime",""+r(i.created),!0,!1)+'></time></a><span class="note">'+jade.escape(null==(t=2==i.mode?s("comment-queued"):4==i.mode?s("comment-deleted"):"")?"":t)+'</span></div><div class="text">'),4==i.mode?n.push("<p>&nbsp;</p>"):n.push(null==(t=i.text)?"":t),n.push('</div><div class="isso-comment-footer">'),o.vote&&n.push('<a href="#" class="upvote">'+(null==(t=l["arrow-up"])?"":t)+'</a><span class="spacer">|</span><a href="#" class="downvote">'+(null==(t=l["arrow-down"])?"":t)+"</a>"),n.push('<a href="#" class="reply">'+jade.escape(null==(t=s("comment-reply"))?"":t)+'</a><a href="#" class="edit">'+jade.escape(null==(t=s("comment-edit"))?"":t)+'</a><a href="#" class="delete">'+jade.escape(null==(t=s("comment-delete"))?"":t)+'</a></div><div class="isso-follow-up"></div></div></div>')}.call(this,"bool"in i?i.bool:"undefined"!=typeof bool?bool:void 0,"comment"in i?i.comment:"undefined"!=typeof comment?comment:void 0,"conf"in i?i.conf:"undefined"!=typeof conf?conf:void 0,"datetime"in i?i.datetime:"undefined"!=typeof datetime?datetime:void 0,"humanize"in i?i.humanize:"undefined"!=typeof humanize?humanize:void 0,"i18n"in i?i.i18n:"undefined"!=typeof i18n?i18n:void 0,"svg"in i?i.svg:"undefined"!=typeof svg?svg:void 0),n.join("")}})),define("jade!app/text/comment-loader",(function(){return function(e){var t,n=[],i=e||{};return function(e,i){n.push("<div"+jade.attr("id","isso-loader-"+e.name,!0,!1)+' class="isso-comment-loader"><a href="#" class="load_hidden">'+jade.escape(null==(t=i("comment-hidden",e.hidden_replies))?"":t)+"</a></div>")}.call(this,"comment"in i?i.comment:"undefined"!=typeof comment?comment:void 0,"pluralize"in i?i.pluralize:"undefined"!=typeof pluralize?pluralize:void 0),n.join("")}})),define("app/jade",["libjs-jade-runtime","app/utils","jade!app/text/postbox","jade!app/text/comment","jade!app/text/comment-loader"],(function(runtime,utils,tt_postbox,tt_comment,tt_comment_loader){"use strict";var globals={},templates={},load=function(name,js){templates[name]=function(jade){var fn;return eval("fn = "+js),fn}(runtime)},set=function(e,t){globals[e]=t};return load("postbox",tt_postbox),load("comment",tt_comment),load("comment-loader",tt_comment_loader),set("bool",(function(e){return!!e})),set("humanize",(function(e){return"object"!=typeof e&&(e=new Date(1e3*parseInt(e,10))),e.toString()})),set("datetime",(function(e){return"object"!=typeof e&&(e=new Date(1e3*parseInt(e,10))),[e.getUTCFullYear(),utils.pad(e.getUTCMonth(),2),utils.pad(e.getUTCDay(),2)].join("-")+"T"+[utils.pad(e.getUTCHours(),2),utils.pad(e.getUTCMinutes(),2),utils.pad(e.getUTCSeconds(),2)].join(":")+"Z"})),{set:set,render:function(e,t){var n;if(!templates[e])throw new Error("Template not found: '"+e+"'");t=t||{};var i=[];for(var o in t)t.hasOwnProperty(o)&&!globals.hasOwnProperty(o)&&(i.push(o),globals[o]=t[o]);n=templates[e](globals);for(var r=0;r<i.length;r++)delete globals[i[r]];return n}}})),define("app/lib/editor",["app/dom","app/i18n"],(function(e,t){"use strict";return function(n){return(n=e.htmlify(n)).setAttribute("contentEditable",!0),n.on("focus",(function(){n.classList.contains("placeholder")&&(n.innerHTML="",n.classList.remove("placeholder"))})),n.on("blur",(function(){0===n.textContent.length&&(n.textContent=t.translate("postbox-text"),n.classList.add("placeholder"))})),n}})),define("app/lib/identicons",["app/lib/promise","app/config"],(function(e,t){"use strict";var n=function(e,t,n,i,o,r){var a=document.createElementNS("http://www.w3.org/2000/svg","rect");a.setAttribute("x",i+t*o),a.setAttribute("y",i+n*o),a.setAttribute("width",o),a.setAttribute("height",o),a.setAttribute("style","fill: "+r),e.appendChild(a)},i=function(i,o,r){var a=document.createElementNS("http://www.w3.org/2000/svg","svg");return a.setAttribute("version","1.1"),a.setAttribute("viewBox","0 0 "+r+" "+r),a.setAttribute("preserveAspectRatio","xMinYMin meet"),a.setAttribute("shape-rendering","crispEdges"),n(a,0,0,0,r+2*o,t["avatar-bg"]),null===typeof i||e.when(i,(function(e){var i=function(e,t){return e.length>=t?e:new Array(t-e.length+1).join("0")+e}((parseInt(e,16)%Math.pow(2,18)).toString(2),18),r=0;a.setAttribute("data-hash",e);for(var s=parseInt(i.substring(i.length-3,i.length),2),l=t["avatar-fg"][s%t["avatar-fg"].length],u=0;u<Math.ceil(2.5);u++)for(var c=0;5>c;c++)"1"===i.charAt(r)&&(n(a,u,c,o,8,l),u<Math.floor(2.5)&&n(a,4-u,c,o,8,l)),r++})),a};return{generate:i,blank:function(e,t){var n=parseInt([0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,0].join(""),2).toString(16),o=i(n,e,t);return o.setAttribute("className","blank"),o}}})),define("app/lib",["require","app/lib/editor","app/lib/identicons"],(function(e){return{editorify:e("app/lib/editor"),identicons:e("app/lib/identicons")}})),define("app/isso",["app/dom","app/utils","app/config","app/api","app/jade","app/i18n","app/lib","app/globals"],(function(e,t,n,i,o,r,a,s){"use strict";var l=function(r){var s=t.localStorageImpl,l=e.htmlify(o.render("postbox",{author:JSON.parse(s.getItem("author")),email:JSON.parse(s.getItem("email")),website:JSON.parse(s.getItem("website"))}));return l.onsuccess=function(){},l.validate=function(){return t.text(e(".textarea",this).innerHTML).length<3||e(".textarea",this).classList.contains("placeholder")?(e(".textarea",this).focus(),!1):n["require-email"]&&e("[name='email']",this).value.length<=0?(e("[name='email']",this).focus(),!1):!(n["require-author"]&&e("[name='author']",this).value.length<=0)||(e("[name='author']",this).focus(),!1)},n["require-email"]&&(e("[name='email']",l).placeholder=e("[name='email']",l).placeholder.replace(/ \(.*\)/,"")),n["require-author"]&&(e("[name='author']",l).placeholder=e("[name='author']",l).placeholder.replace(/ \(.*\)/,"")),e("[type=submit]",l).on("click",(function(){if(l.validate()){var n=e("[name=author]",l).value||null,o=e("[name=email]",l).value||null,a=e("[name=website]",l).value||null;s.setItem("author",JSON.stringify(n)),s.setItem("email",JSON.stringify(o)),s.setItem("website",JSON.stringify(a)),i.create(e("#isso-thread").getAttribute("data-isso-id"),{author:n,email:o,website:a,text:t.text(e(".textarea",l).innerHTML),parent:r||null,title:e("#isso-thread").getAttribute("data-title")||null}).then((function(t){e(".textarea",l).innerHTML="",e(".textarea",l).blur(),c(t,!0),null!==r&&l.onsuccess()}))}})),a.editorify(e(".textarea",l)),l},u=function(t,r){var a;null===t.id?(a=e("#isso-root"),t.name="null"):(a=e("#isso-"+t.id+" > .text-wrapper > .isso-follow-up"),t.name=t.id);var s=e.htmlify(o.render("comment-loader",{comment:t}));a.append(s),e("a.load_hidden",s).on("click",(function(){s.remove(),i.fetch(e("#isso-thread").getAttribute("data-isso-id"),n["reveal-on-click"],n["max-comments-nested"],t.id,r).then((function(e){if(0!==e.total_replies){var t=0;e.replies.forEach((function(e){c(e,!1),e.created>t&&(t=e.created)})),e.hidden_replies>0&&u(e,t)}}),(function(e){console.log(e)}))}))},c=function(d,p){var f=e.htmlify(o.render("comment",{comment:d})),m=function(){e(".permalink > time",f).textContent=t.ago(s.offset.localTime(),new Date(1e3*parseInt(d.created,10))),setTimeout(m,6e4)};m(),n.avatar&&e("div.avatar > svg",f).replace(a.identicons.generate(d.hash,4,48)),e(null===d.parent?"#isso-root":"#isso-"+d.parent+" > .text-wrapper > .isso-follow-up").append(f),p&&f.scrollIntoView();var h=e("#isso-"+d.id+" > .text-wrapper > .isso-comment-footer"),v=e("#isso-"+d.id+" > .text-wrapper > .isso-comment-header"),g=e("#isso-"+d.id+" > .text-wrapper > .text"),b=null;if(e("a.reply",h).toggle("click",(function(t){(b=h.insertAfter(new l(null===d.parent?d.id:d.parent))).onsuccess=function(){t.next()},e(".textarea",b).focus(),e("a.reply",h).textContent=r.translate("comment-close")}),(function(){b.remove(),e("a.reply",h).textContent=r.translate("comment-reply")})),n.vote){var w=n["vote-levels"];"string"==typeof w&&(w=w.split(","));var y=function(t){var n=e("span.votes",h);if(null===n?h.prepend(e.new("span.votes",t)):n.textContent=t,t?f.classList.remove("isso-no-votes"):f.classList.add("isso-no-votes"),w)for(var i=!0,o=0;o<=w.length;o++)i&&(o>=w.length||t<w[o])?(f.classList.add("isso-vote-level-"+o),i=!1):f.classList.remove("isso-vote-level-"+o)};e("a.upvote",h).on("click",(function(){i.like(d.id).then((function(e){y(e.likes-e.dislikes)}))})),e("a.downvote",h).on("click",(function(){i.dislike(d.id).then((function(e){y(e.likes-e.dislikes)}))})),y(d.likes-d.dislikes)}e("a.edit",h).toggle("click",(function(o){var s=e("a.edit",h),l=n.avatar?e(".avatar",f,!1)[0]:null;s.textContent=r.translate("comment-save"),s.insertAfter(e.new("a.cancel",r.translate("comment-cancel"))).on("click",(function(){o.canceled=!0,o.next()})),o.canceled=!1,i.view(d.id,1).then((function(n){var i=a.editorify(e.new("div.textarea"));i.innerHTML=t.detext(n.text),i.focus(),g.classList.remove("text"),g.classList.add("textarea-wrapper"),g.textContent="",g.append(i)})),null!==l&&l.hide()}),(function(o){var a=e(".textarea",g),s=n.avatar?e(".avatar",f,!1)[0]:null;if(o.canceled||null===a)g.innerHTML=d.text;else{if(t.text(a.innerHTML).length<3)return a.focus(),void o.wait();i.modify(d.id,{text:t.text(a.innerHTML)}).then((function(e){g.innerHTML=e.text,d.text=e.text}))}g.classList.remove("textarea-wrapper"),g.classList.add("text"),null!==s&&s.show(),e("a.cancel",h).remove(),e("a.edit",h).textContent=r.translate("comment-edit")})),e("a.delete",h).toggle("click",(function(t){var n=e("a.delete",h),i=!t.state;n.textContent=r.translate("comment-confirm"),n.on("mouseout",(function(){n.textContent=r.translate("comment-delete"),t.state=i,n.onmouseout=null}))}),(function(){var t=e("a.delete",h);i.remove(d.id).then((function(n){n?f.remove():(e("span.note",v).textContent=r.translate("comment-deleted"),g.innerHTML="<p>&nbsp;</p>",e("a.edit",h).remove(),e("a.delete",h).remove()),t.textContent=r.translate("comment-delete")}))}));var x=function(n){t.cookie("isso-"+d.id)?setTimeout((function(){x(n)}),15e3):null!==e(n,h)&&e(n,h).remove()};x("a.edit"),x("a.delete");var j=function(e){t.cookie("isso-"+d.id)?setTimeout((function(){j(e)}),15e3):h.append(e)};if(!n["reply-to-self"]&&t.cookie("isso-"+d.id)&&j(e("a.reply",h).detach()),d.hasOwnProperty("replies")){var C=0;d.replies.forEach((function(e){c(e,!1),e.created>C&&(C=e.created)})),d.hidden_replies>0&&u(d,C)}};return{insert:c,insert_loader:u,Postbox:l}})),define("app/count",["app/api","app/dom","app/i18n"],(function(e,t,n){return function(){var i={};t.each("a",(function(e){if(e.href.match(/#isso-thread$/)){var t=e.getAttribute("data-isso-id")||e.href.match(/^(.+)#isso-thread$/)[1].replace(/^.*\/\/[^\/]+/,"");t in i?i[t].push(e):i[t]=[e]}}));var o=Object.keys(i);e.count(o).then((function(e){for(var t in i)if(i.hasOwnProperty(t))for(var r=o.indexOf(t),a=0;a<i[t].length;a++)i[t][a].textContent=n.pluralize("num-comments",e[r])}))}})),define("text",{load:function(e){throw new Error("Dynamic load not allowed: "+e)}}),define("text!app/../../css/isso.css",[],(function(){return""})),define("app/text/css",["text!../../../css/isso.css"],(function(e){return{inline:e}})),define("text!app/text/arrow-down.svg",[],(function(){return'\x3c!-- Generator: IcoMoon.io --\x3e<svg width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="gray">\n  <g>\n    <path d="M 24.773,13.701c-0.651,0.669-7.512,7.205-7.512,7.205C 16.912,21.262, 16.456,21.44, 16,21.44c-0.458,0-0.914-0.178-1.261-0.534 c0,0-6.861-6.536-7.514-7.205c-0.651-0.669-0.696-1.87,0-2.586c 0.698-0.714, 1.669-0.77, 2.522,0L 16,17.112l 6.251-5.995 c 0.854-0.77, 1.827-0.714, 2.522,0C 25.47,11.83, 25.427,13.034, 24.773,13.701z">\n    </path>\n  </g>\n</svg>\n'})),define("text!app/text/arrow-up.svg",[],(function(){return'\x3c!-- Generator: IcoMoon.io --\x3e<svg width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="gray">\n  <g>\n    <path d="M 24.773,18.299c-0.651-0.669-7.512-7.203-7.512-7.203C 16.912,10.739, 16.456,10.56, 16,10.56c-0.458,0-0.914,0.179-1.261,0.536 c0,0-6.861,6.534-7.514,7.203c-0.651,0.669-0.696,1.872,0,2.586c 0.698,0.712, 1.669,0.77, 2.522,0L 16,14.89l 6.251,5.995 c 0.854,0.77, 1.827,0.712, 2.522,0C 25.47,20.17, 25.427,18.966, 24.773,18.299z">\n    </path>\n  </g>\n</svg>\n'})),define("app/text/svg",["text!./arrow-down.svg","text!./arrow-up.svg"],(function(e,t){return{"arrow-down":e,"arrow-up":t}})),require(["app/lib/ready","app/config","app/i18n","app/api","app/isso","app/count","app/dom","app/text/css","app/text/svg","app/jade"],(function(e,t,n,i,o,r,a,s,l,u){"use strict";u.set("conf",t),u.set("i18n",n.translate),u.set("pluralize",n.pluralize),u.set("svg",l),e((function(){if(t.css){var e=a.new("style");e.type="text/css",e.textContent=s.inline,a("head").append(e)}return r(),null===a("#isso-thread")?console.log("abort, #isso-thread is missing"):(a("#isso-thread").append(a.new("h4")),a("#isso-thread").append(new o.Postbox(null)),a("#isso-thread").append('<div id="isso-root"></div>'),void i.fetch(a("#isso-thread").getAttribute("data-isso-id"),t["max-comments-top"],t["max-comments-nested"]).then((function(e){if(0!==e.total_replies){var t=0,i=e.total_replies;e.replies.forEach((function(e){o.insert(e,!1),e.created>t&&(t=e.created),i+=e.total_replies})),a("#isso-thread > h4").textContent=n.pluralize("num-comments",i),e.hidden_replies>0&&o.insert_loader(e,t),window.location.hash.length>0&&a(window.location.hash).scrollIntoView()}else a("#isso-thread > h4").textContent=n.translate("no-comments")}),(function(e){console.log(e)})))}))})),define("embed",(function(){}))}();