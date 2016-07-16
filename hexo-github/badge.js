!function(t,i){function e(t,i){var e=document.createElement(t);return i&&(e.className=i.join(" ")),e}function o(t){return g+t}function s(t,i){return g+t+"/"+i}function n(t,i,e){return g+t+"/"+i+"/commit/"+e}function a(t,i,e){return e=e||"",'<a href="'+i+'" target="_blank" class="'+e+'">'+t+"</a>"}function c(t){return a(t,o(t),"user-link")}function r(t,i){return a(i,s(t,i),"repo-link")}function m(t,i,e){return a(e,n(t,i,e),"commit-link")}function l(t,i){var e=['<div class="icon">','  <span class="mega-octicon octicon-mark-github"></span>','  <div class="avatar"><img /></div>',"</div>",'<div class="content">','  <h3 class="user">'+c(t)+"</h3>",'  <h3 class="repo">'+r(t,i)+"</h3>","</div>"].join("");return e}function h(t,i,e){var o=['<div class="icon">','  <div class="circle"></div>','  <span class="octicon octicon-git-commit"></span>',"</div>",'<div class="status">',m(t,i,e),"  <span></span>","</div>"].join("");return o}function u(t,i,e,o){var s=['<div class="item '+i+'">','  <div class="icon">','    <div class="circle'+(o?" active":"")+'"></div>','    <span class="'+t+'"></span>',"  </div>",'  <div class="text'+(o?" active":"")+'">'+e+"</div>","</div>"].join("");return s}function d(t,i,e){var o=['<div class="line">',"</div>",'<div class="entry">',u("octicon octicon-code","commit-before",'<span class="commits-count-before">N/A</span> commits'),u("octicon octicon-pencil","commit-current",m(t,i,e)+", referenced in this article",!0),u("octicon octicon-code","commit-after",'<span class="commits-count-after">N/A</span> commits'),u("octicon octicon-clock","commit-latest",m(t,i,"N/A")+", latest"),u("octicon octicon-check","commit-up-to-date","Up-to-date"),"</div>"].join("");return o}function p(t,i,e){var o=new XMLHttpRequest;o.open("GET",t,!0),i&&o.setRequestHeader("If-None-Match",i),o.onload=function(){var t=o.getResponseHeader("ETag");if(console.log("Rate limit remaing: "+o.getResponseHeader("X-RateLimit-Remaining")),304==o.status)e(t,null,null);else if(o.status>=200&&o.status<400){var i=JSON.parse(o.responseText);e(t,null,i)}else{var i=JSON.parse(o.responseText);console.error(i.message);var s=new Error(i.message);s.raw=i,e(t,s)}},o.onerror=function(t){console.error(t),e(i,t)},o.send()}function f(t,i){var e=JSON.parse(localStorage.getItem(t))||{data:null,etag:null};p(t+"?per_page=100",e.etag,function(o,s,n){return s?(console.log("Something wrong, use cached data"),i(s,e.data)):n?(console.log("Update cache"),localStorage.setItem(t,JSON.stringify({data:n,etag:o})),i(null,n)):(console.log("Cache hit"),localStorage.setItem(t,JSON.stringify({data:e.data,etag:o})),i(null,e.data))})}function v(t,o,s,n,a){this.container=i(t),this.user=o,this.repo=s,this.commit=n,this.autoExpand=a?!0:!1,this.el=e("div",["github-badge"]),this.info=e("div",["info"]),this.header=e("div",["header"]),this.commits=e("div",["commits","fold"]),this.header.innerHTML=l(o,s),this.info.innerHTML=h(o,s,n),this.commits.innerHTML=d(o,s,n),this.header.avatarContainer=this.header.querySelector(".avatar"),this.header.avatar=this.header.querySelector(".avatar>img"),this.header.logo=this.header.querySelector(".icon>span"),this.header.user=this.header.querySelector(".user"),this.info.commitLink=this.info.querySelector(".status>a"),this.info.statusText=this.info.querySelector(".status>span"),this.info.icon=this.info.querySelector(".icon>span"),this.header.user.addEventListener("mouseover",this.toggleAvatar.bind(this)),this.header.user.addEventListener("mouseout",this.toggleAvatar.bind(this)),this.info.addEventListener("click",this.toggleFold.bind(this));var c=this.commits.querySelectorAll(".commit-link");this.commits.beforeCounter=this.commits.querySelector(".commits-count-before"),this.commits.afterCounter=this.commits.querySelector(".commits-count-after"),this.commits.currentCommitLink=c[0],this.commits.latestCommitLink=c[1],this.commits.afterEntry=this.commits.querySelector(".commit-after"),this.commits.latestCommitEntry=this.commits.querySelector(".commit-latest"),this.commits.upToDateEntry=this.commits.querySelector(".commit-up-to-date"),this.el.appendChild(this.header),this.el.appendChild(this.info),this.el.appendChild(this.commits),this.container.appendChild(this.el),this.update()}t.LOADED_STYLES=t.LOADED_STYLES||{},t.loadStyle=function(i){if(!t.LOADED_STYLES[i]){var e=document.createElement("link");e.setAttribute("rel","stylesheet"),e.setAttribute("type","text/css"),e.setAttribute("href",i),document.getElementsByTagName("head")[0].appendChild(e),t.LOADED_STYLES[i]=!0}};var g="https://github.com/";v.prototype.updateCommitLink=function(t,i){t.title=i.commit.message,t.innerHTML=i.sha.substr(0,6),t.href=n(this.user,this.repo,i.sha)},v.prototype.updateCommits=function(t){for(var i,e,o=0;o<t.length;o++){var s=t[o];0==s.sha.indexOf(this.commit)&&(i=o,e=s)}var n=t[0],a=i,c="octicon-history";this.info.statusText.innerHTML=a>0?", "+a+" commits behind":", up-to-date",this.commits.afterEntry.style.display="none",this.commits.latestCommitEntry.style.display="none",this.commits.upToDateEntry.style.display="none",0==a?(this.commits.upToDateEntry.style.display="block",c="octicon-check"):1==a?this.commits.latestCommitEntry.style.display="block":(this.commits.afterEntry.style.display="block",this.commits.latestCommitEntry.style.display="block"),this.commits.beforeCounter.innerHTML=t.length-i-1,this.commits.afterCounter.innerHTML=a-1,this.updateCommitLink(this.info.commitLink,e),this.updateCommitLink(this.commits.currentCommitLink,e),this.updateCommitLink(this.commits.latestCommitLink,n),this.toggleSyncAnimation(c),this.autoExpand&&"commits"!==this.commits.className&&this.toggleFold()},v.prototype.toggleAvatar=function(){var t=this.header.avatarContainer.className;this.header.avatarContainer.className="avatar"===t?"avatar show":"avatar",this.header.logo.className="avatar"===t?"mega-octicon octicon-mark-github back":"mega-octicon octicon-mark-github"},v.prototype.toggleFold=function(){this.commits.className="commits"===this.commits.className?"commits fold":"commits"},v.prototype.toggleSyncAnimation=function(t){t=t||"octicon-git-commit";var i=this.info.icon.className;this.info.icon.className="octicon octicon-sync spinner"===i?"octicon "+t:"octicon octicon-sync spinner"};var y="https://api.github.com";v.prototype.update=function(){var t=y+"/users/"+this.user,i=y+"/repos/"+this.user+"/"+this.repo,e=i+"/commits";this.toggleSyncAnimation();var o=this;f(t,function(t,i){o.header.avatar.src=i.avatar_url}),f(e,function(t,i){t&&!i?(o.info.statusText.innerHTML=", something is wrong",o.toggleSyncAnimation("octicon-x")):o.updateCommits(i)})},t.Badge=v}(window,document.querySelector.bind(document));