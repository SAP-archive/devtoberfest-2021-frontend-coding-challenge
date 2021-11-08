/*!
 * URI.js - Mutating URLs
 *
 * Version: 1.19.7
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */
(function(e,t){"use strict";if(typeof module==="object"&&module.exports){module.exports=t(require("./punycode"),require("./IPv6"),require("./SecondLevelDomains"))}else if(typeof define==="function"&&define.amd){e.URI=t(e.punycode,e.IPv6,e.SecondLevelDomains,e);define("sap/ui/thirdparty/URI",[],function(){return e.URI})}else{e.URI=t(e.punycode,e.IPv6,e.SecondLevelDomains,e)}})(this,function(e,t,r,n){"use strict";var i=n&&n.URI;function s(e,t){var r=arguments.length>=1;var n=arguments.length>=2;if(!(this instanceof s)){if(r){if(n){return new s(e,t)}return new s(e)}return new s}if(e===undefined){if(r){throw new TypeError("undefined is not a valid argument for URI")}if(typeof location!=="undefined"){e=location.href+""}else{e=""}}if(e===null){if(r){throw new TypeError("null is not a valid argument for URI")}}this.href(e);if(t!==undefined){return this.absoluteTo(t)}return this}function a(e){return/^[0-9]+$/.test(e)}s.version="1.19.7";var o=s.prototype;var u=Object.prototype.hasOwnProperty;function h(e){return e.replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1")}function f(e){if(e===undefined){return"Undefined"}return String(Object.prototype.toString.call(e)).slice(8,-1)}function p(e){return f(e)==="Array"}function l(e,t){var r={};var n,i;if(f(t)==="RegExp"){r=null}else if(p(t)){for(n=0,i=t.length;n<i;n++){r[t[n]]=true}}else{r[t]=true}for(n=0,i=e.length;n<i;n++){var s=r&&r[e[n]]!==undefined||!r&&t.test(e[n]);if(s){e.splice(n,1);i--;n--}}return e}function c(e,t){var r,n;if(p(t)){for(r=0,n=t.length;r<n;r++){if(!c(e,t[r])){return false}}return true}var i=f(t);for(r=0,n=e.length;r<n;r++){if(i==="RegExp"){if(typeof e[r]==="string"&&e[r].match(t)){return true}}else if(e[r]===t){return true}}return false}function d(e,t){if(!p(e)||!p(t)){return false}if(e.length!==t.length){return false}e.sort();t.sort();for(var r=0,n=e.length;r<n;r++){if(e[r]!==t[r]){return false}}return true}function m(e){var t=/^\/+|\/+$/g;return e.replace(t,"")}s._parts=function(){return{protocol:null,username:null,password:null,hostname:null,urn:null,port:null,path:null,query:null,fragment:null,preventInvalidHostname:s.preventInvalidHostname,duplicateQueryParameters:s.duplicateQueryParameters,escapeQuerySpace:s.escapeQuerySpace}};s.preventInvalidHostname=false;s.duplicateQueryParameters=false;s.escapeQuerySpace=true;s.protocol_expression=/^[a-z][a-z0-9.+-]*$/i;s.idn_expression=/[^a-z0-9\._-]/i;s.punycode_expression=/(xn--)/i;s.ip4_expression=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;s.ip6_expression=/^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;s.find_uri_expression=/\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi;s.findUri={start:/\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,end:/[\s\r\n]|$/,trim:/[`!()\[\]{};:'".,<>?«»“”„‘’]+$/,parens:/(\([^\)]*\)|\[[^\]]*\]|\{[^}]*\}|<[^>]*>)/g};s.defaultPorts={http:"80",https:"443",ftp:"21",gopher:"70",ws:"80",wss:"443"};s.hostProtocols=["http","https"];s.invalid_hostname_characters=/[^a-zA-Z0-9\.\-:_]/;s.domAttributes={a:"href",blockquote:"cite",link:"href",base:"href",script:"src",form:"action",img:"src",area:"href",iframe:"src",embed:"src",source:"src",track:"src",input:"src",audio:"src",video:"src"};s.getDomAttribute=function(e){if(!e||!e.nodeName){return undefined}var t=e.nodeName.toLowerCase();if(t==="input"&&e.type!=="image"){return undefined}return s.domAttributes[t]};function g(e){return escape(e)}function v(e){return encodeURIComponent(e).replace(/[!'()*]/g,g).replace(/\*/g,"%2A")}s.encode=v;s.decode=decodeURIComponent;s.iso8859=function(){s.encode=escape;s.decode=unescape};s.unicode=function(){s.encode=v;s.decode=decodeURIComponent};s.characters={pathname:{encode:{expression:/%(24|26|2B|2C|3B|3D|3A|40)/gi,map:{"%24":"$","%26":"&","%2B":"+","%2C":",","%3B":";","%3D":"=","%3A":":","%40":"@"}},decode:{expression:/[\/\?#]/g,map:{"/":"%2F","?":"%3F","#":"%23"}}},reserved:{encode:{expression:/%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/gi,map:{"%3A":":","%2F":"/","%3F":"?","%23":"#","%5B":"[","%5D":"]","%40":"@","%21":"!","%24":"$","%26":"&","%27":"'","%28":"(","%29":")","%2A":"*","%2B":"+","%2C":",","%3B":";","%3D":"="}}},urnpath:{encode:{expression:/%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/gi,map:{"%21":"!","%24":"$","%27":"'","%28":"(","%29":")","%2A":"*","%2B":"+","%2C":",","%3B":";","%3D":"=","%40":"@"}},decode:{expression:/[\/\?#:]/g,map:{"/":"%2F","?":"%3F","#":"%23",":":"%3A"}}}};s.encodeQuery=function(e,t){var r=s.encode(e+"");if(t===undefined){t=s.escapeQuerySpace}return t?r.replace(/%20/g,"+"):r};s.decodeQuery=function(e,t){e+="";if(t===undefined){t=s.escapeQuerySpace}try{return s.decode(t?e.replace(/\+/g,"%20"):e)}catch(t){return e}};var y={encode:"encode",decode:"decode"};var _;var b=function(e,t){return function(r){try{return s[t](r+"").replace(s.characters[e][t].expression,function(r){return s.characters[e][t].map[r]})}catch(e){return r}}};for(_ in y){s[_+"PathSegment"]=b("pathname",y[_]);s[_+"UrnPathSegment"]=b("urnpath",y[_])}var w=function(e,t,r){return function(n){var i;if(!r){i=s[t]}else{i=function(e){return s[t](s[r](e))}}var a=(n+"").split(e);for(var o=0,u=a.length;o<u;o++){a[o]=i(a[o])}return a.join(e)}};s.decodePath=w("/","decodePathSegment");s.decodeUrnPath=w(":","decodeUrnPathSegment");s.recodePath=w("/","encodePathSegment","decode");s.recodeUrnPath=w(":","encodeUrnPathSegment","decode");s.encodeReserved=b("reserved","encode");s.parse=function(e,t){var r;if(!t){t={preventInvalidHostname:s.preventInvalidHostname}}r=e.indexOf("#");if(r>-1){t.fragment=e.substring(r+1)||null;e=e.substring(0,r)}r=e.indexOf("?");if(r>-1){t.query=e.substring(r+1)||null;e=e.substring(0,r)}e=e.replace(/^(https?|ftp|wss?)?:[/\\]*/,"$1://");if(e.substring(0,2)==="//"){t.protocol=null;e=e.substring(2);e=s.parseAuthority(e,t)}else{r=e.indexOf(":");if(r>-1){t.protocol=e.substring(0,r)||null;if(t.protocol&&!t.protocol.match(s.protocol_expression)){t.protocol=undefined}else if(e.substring(r+1,r+3).replace(/\\/g,"/")==="//"){e=e.substring(r+3);e=s.parseAuthority(e,t)}else{e=e.substring(r+1);t.urn=true}}}t.path=e;return t};s.parseHost=function(e,t){if(!e){e=""}e=e.replace(/\\/g,"/");var r=e.indexOf("/");var n;var i;if(r===-1){r=e.length}if(e.charAt(0)==="["){n=e.indexOf("]");t.hostname=e.substring(1,n)||null;t.port=e.substring(n+2,r)||null;if(t.port==="/"){t.port=null}}else{var a=e.indexOf(":");var o=e.indexOf("/");var u=e.indexOf(":",a+1);if(u!==-1&&(o===-1||u<o)){t.hostname=e.substring(0,r)||null;t.port=null}else{i=e.substring(0,r).split(":");t.hostname=i[0]||null;t.port=i[1]||null}}if(t.hostname&&e.substring(r).charAt(0)!=="/"){r++;e="/"+e}if(t.preventInvalidHostname){s.ensureValidHostname(t.hostname,t.protocol)}if(t.port){s.ensureValidPort(t.port)}return e.substring(r)||"/"};s.parseAuthority=function(e,t){e=s.parseUserinfo(e,t);return s.parseHost(e,t)};s.parseUserinfo=function(e,t){var r=e;var n=e.indexOf("\\");if(n!==-1){e=e.replace(/\\/g,"/")}var i=e.indexOf("/");var a=e.lastIndexOf("@",i>-1?i:e.length-1);var o;if(a>-1&&(i===-1||a<i)){o=e.substring(0,a).split(":");t.username=o[0]?s.decode(o[0]):null;o.shift();t.password=o[0]?s.decode(o.join(":")):null;e=r.substring(a+1)}else{t.username=null;t.password=null}return e};s.parseQuery=function(e,t){if(!e){return{}}e=e.replace(/&+/g,"&").replace(/^\?*&*|&+$/g,"");if(!e){return{}}var r={};var n=e.split("&");var i=n.length;var a,o,h;for(var f=0;f<i;f++){a=n[f].split("=");o=s.decodeQuery(a.shift(),t);h=a.length?s.decodeQuery(a.join("="),t):null;if(o==="__proto__"){continue}else if(u.call(r,o)){if(typeof r[o]==="string"||r[o]===null){r[o]=[r[o]]}r[o].push(h)}else{r[o]=h}}return r};s.build=function(e){var t="";var r=false;if(e.protocol){t+=e.protocol+":"}if(!e.urn&&(t||e.hostname)){t+="//";r=true}t+=s.buildAuthority(e)||"";if(typeof e.path==="string"){if(e.path.charAt(0)!=="/"&&r){t+="/"}t+=e.path}if(typeof e.query==="string"&&e.query){t+="?"+e.query}if(typeof e.fragment==="string"&&e.fragment){t+="#"+e.fragment}return t};s.buildHost=function(e){var t="";if(!e.hostname){return""}else if(s.ip6_expression.test(e.hostname)){t+="["+e.hostname+"]"}else{t+=e.hostname}if(e.port){t+=":"+e.port}return t};s.buildAuthority=function(e){return s.buildUserinfo(e)+s.buildHost(e)};s.buildUserinfo=function(e){var t="";if(e.username){t+=s.encode(e.username)}if(e.password){t+=":"+s.encode(e.password)}if(t){t+="@"}return t};s.buildQuery=function(e,t,r){var n="";var i,a,o,h;for(a in e){if(a==="__proto__"){continue}else if(u.call(e,a)){if(p(e[a])){i={};for(o=0,h=e[a].length;o<h;o++){if(e[a][o]!==undefined&&i[e[a][o]+""]===undefined){n+="&"+s.buildQueryParameter(a,e[a][o],r);if(t!==true){i[e[a][o]+""]=true}}}}else if(e[a]!==undefined){n+="&"+s.buildQueryParameter(a,e[a],r)}}}return n.substring(1)};s.buildQueryParameter=function(e,t,r){return s.encodeQuery(e,r)+(t!==null?"="+s.encodeQuery(t,r):"")};s.addQuery=function(e,t,r){if(typeof t==="object"){for(var n in t){if(u.call(t,n)){s.addQuery(e,n,t[n])}}}else if(typeof t==="string"){if(e[t]===undefined){e[t]=r;return}else if(typeof e[t]==="string"){e[t]=[e[t]]}if(!p(r)){r=[r]}e[t]=(e[t]||[]).concat(r)}else{throw new TypeError("URI.addQuery() accepts an object, string as the name parameter")}};s.setQuery=function(e,t,r){if(typeof t==="object"){for(var n in t){if(u.call(t,n)){s.setQuery(e,n,t[n])}}}else if(typeof t==="string"){e[t]=r===undefined?null:r}else{throw new TypeError("URI.setQuery() accepts an object, string as the name parameter")}};s.removeQuery=function(e,t,r){var n,i,a;if(p(t)){for(n=0,i=t.length;n<i;n++){e[t[n]]=undefined}}else if(f(t)==="RegExp"){for(a in e){if(t.test(a)){e[a]=undefined}}}else if(typeof t==="object"){for(a in t){if(u.call(t,a)){s.removeQuery(e,a,t[a])}}}else if(typeof t==="string"){if(r!==undefined){if(f(r)==="RegExp"){if(!p(e[t])&&r.test(e[t])){e[t]=undefined}else{e[t]=l(e[t],r)}}else if(e[t]===String(r)&&(!p(r)||r.length===1)){e[t]=undefined}else if(p(e[t])){e[t]=l(e[t],r)}}else{e[t]=undefined}}else{throw new TypeError("URI.removeQuery() accepts an object, string, RegExp as the first parameter")}};s.hasQuery=function(e,t,r,n){switch(f(t)){case"String":break;case"RegExp":for(var i in e){if(u.call(e,i)){if(t.test(i)&&(r===undefined||s.hasQuery(e,i,r))){return true}}}return false;case"Object":for(var a in t){if(u.call(t,a)){if(!s.hasQuery(e,a,t[a])){return false}}}return true;default:throw new TypeError("URI.hasQuery() accepts a string, regular expression or object as the name parameter")}switch(f(r)){case"Undefined":return t in e;case"Boolean":var o=Boolean(p(e[t])?e[t].length:e[t]);return r===o;case"Function":return!!r(e[t],t,e);case"Array":if(!p(e[t])){return false}var h=n?c:d;return h(e[t],r);case"RegExp":if(!p(e[t])){return Boolean(e[t]&&e[t].match(r))}if(!n){return false}return c(e[t],r);case"Number":r=String(r);case"String":if(!p(e[t])){return e[t]===r}if(!n){return false}return c(e[t],r);default:throw new TypeError("URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter")}};s.joinPaths=function(){var e=[];var t=[];var r=0;for(var n=0;n<arguments.length;n++){var i=new s(arguments[n]);e.push(i);var a=i.segment();for(var o=0;o<a.length;o++){if(typeof a[o]==="string"){t.push(a[o])}if(a[o]){r++}}}if(!t.length||!r){return new s("")}var u=new s("").segment(t);if(e[0].path()===""||e[0].path().slice(0,1)==="/"){u.path("/"+u.path())}return u.normalize()};s.commonPath=function(e,t){var r=Math.min(e.length,t.length);var n;for(n=0;n<r;n++){if(e.charAt(n)!==t.charAt(n)){n--;break}}if(n<1){return e.charAt(0)===t.charAt(0)&&e.charAt(0)==="/"?"/":""}if(e.charAt(n)!=="/"||t.charAt(n)!=="/"){n=e.substring(0,n).lastIndexOf("/")}return e.substring(0,n+1)};s.withinString=function(e,t,r){r||(r={});var n=r.start||s.findUri.start;var i=r.end||s.findUri.end;var a=r.trim||s.findUri.trim;var o=r.parens||s.findUri.parens;var u=/[a-z0-9-]=["']?$/i;n.lastIndex=0;while(true){var h=n.exec(e);if(!h){break}var f=h.index;if(r.ignoreHtml){var p=e.slice(Math.max(f-3,0),f);if(p&&u.test(p)){continue}}var l=f+e.slice(f).search(i);var c=e.slice(f,l);var d=-1;while(true){var m=o.exec(c);if(!m){break}var g=m.index+m[0].length;d=Math.max(d,g)}if(d>-1){c=c.slice(0,d)+c.slice(d).replace(a,"")}else{c=c.replace(a,"")}if(c.length<=h[0].length){continue}if(r.ignore&&r.ignore.test(c)){continue}l=f+c.length;var v=t(c,f,l,e);if(v===undefined){n.lastIndex=l;continue}v=String(v);e=e.slice(0,f)+v+e.slice(l);n.lastIndex=f+v.length}n.lastIndex=0;return e};s.ensureValidHostname=function(t,r){var n=!!t;var i=!!r;var a=false;if(i){a=c(s.hostProtocols,r)}if(a&&!n){throw new TypeError("Hostname cannot be empty, if protocol is "+r)}else if(t&&t.match(s.invalid_hostname_characters)){if(!e){throw new TypeError('Hostname "'+t+'" contains characters other than [A-Z0-9.-:_] and Punycode.js is not available')}if(e.toASCII(t).match(s.invalid_hostname_characters)){throw new TypeError('Hostname "'+t+'" contains characters other than [A-Z0-9.-:_]')}}};s.ensureValidPort=function(e){if(!e){return}var t=Number(e);if(a(t)&&t>0&&t<65536){return}throw new TypeError('Port "'+e+'" is not a valid port')};s.noConflict=function(e){if(e){var t={URI:this.noConflict()};if(n.URITemplate&&typeof n.URITemplate.noConflict==="function"){t.URITemplate=n.URITemplate.noConflict()}if(n.IPv6&&typeof n.IPv6.noConflict==="function"){t.IPv6=n.IPv6.noConflict()}if(n.SecondLevelDomains&&typeof n.SecondLevelDomains.noConflict==="function"){t.SecondLevelDomains=n.SecondLevelDomains.noConflict()}return t}else if(n.URI===this){n.URI=i}return this};o.build=function(e){if(e===true){this._deferred_build=true}else if(e===undefined||this._deferred_build){this._string=s.build(this._parts);this._deferred_build=false}return this};o.clone=function(){return new s(this)};o.valueOf=o.toString=function(){return this.build(false)._string};function Q(e){return function(t,r){if(t===undefined){return this._parts[e]||""}else{this._parts[e]=t||null;this.build(!r);return this}}}function A(e,t){return function(r,n){if(r===undefined){return this._parts[e]||""}else{if(r!==null){r=r+"";if(r.charAt(0)===t){r=r.substring(1)}}this._parts[e]=r;this.build(!n);return this}}}o.protocol=Q("protocol");o.username=Q("username");o.password=Q("password");o.hostname=Q("hostname");o.port=Q("port");o.query=A("query","?");o.fragment=A("fragment","#");o.search=function(e,t){var r=this.query(e,t);return typeof r==="string"&&r.length?"?"+r:r};o.hash=function(e,t){var r=this.fragment(e,t);return typeof r==="string"&&r.length?"#"+r:r};o.pathname=function(e,t){if(e===undefined||e===true){var r=this._parts.path||(this._parts.hostname?"/":"");return e?(this._parts.urn?s.decodeUrnPath:s.decodePath)(r):r}else{if(this._parts.urn){this._parts.path=e?s.recodeUrnPath(e):""}else{this._parts.path=e?s.recodePath(e):"/"}this.build(!t);return this}};o.path=o.pathname;o.href=function(e,t){var r;if(e===undefined){return this.toString()}this._string="";this._parts=s._parts();var n=e instanceof s;var i=typeof e==="object"&&(e.hostname||e.path||e.pathname);if(e.nodeName){var a=s.getDomAttribute(e);e=e[a]||"";i=false}if(!n&&i&&e.pathname!==undefined){e=e.toString()}if(typeof e==="string"||e instanceof String){this._parts=s.parse(String(e),this._parts)}else if(n||i){var o=n?e._parts:e;for(r in o){if(r==="query"){continue}if(u.call(this._parts,r)){this._parts[r]=o[r]}}if(o.query){this.query(o.query,false)}}else{throw new TypeError("invalid input")}this.build(!t);return this};o.is=function(e){var t=false;var n=false;var i=false;var a=false;var o=false;var u=false;var h=false;var f=!this._parts.urn;if(this._parts.hostname){f=false;n=s.ip4_expression.test(this._parts.hostname);i=s.ip6_expression.test(this._parts.hostname);t=n||i;a=!t;o=a&&r&&r.has(this._parts.hostname);u=a&&s.idn_expression.test(this._parts.hostname);h=a&&s.punycode_expression.test(this._parts.hostname)}switch(e.toLowerCase()){case"relative":return f;case"absolute":return!f;case"domain":case"name":return a;case"sld":return o;case"ip":return t;case"ip4":case"ipv4":case"inet4":return n;case"ip6":case"ipv6":case"inet6":return i;case"idn":return u;case"url":return!this._parts.urn;case"urn":return!!this._parts.urn;case"punycode":return h}return null};var P=o.protocol;var x=o.port;var I=o.hostname;o.protocol=function(e,t){if(e){e=e.replace(/:(\/\/)?$/,"");if(!e.match(s.protocol_expression)){throw new TypeError('Protocol "'+e+"\" contains characters other than [A-Z0-9.+-] or doesn't start with [A-Z]")}}return P.call(this,e,t)};o.scheme=o.protocol;o.port=function(e,t){if(this._parts.urn){return e===undefined?"":this}if(e!==undefined){if(e===0){e=null}if(e){e+="";if(e.charAt(0)===":"){e=e.substring(1)}s.ensureValidPort(e)}}return x.call(this,e,t)};o.hostname=function(e,t){if(this._parts.urn){return e===undefined?"":this}if(e!==undefined){var r={preventInvalidHostname:this._parts.preventInvalidHostname};var n=s.parseHost(e,r);if(n!=="/"){throw new TypeError('Hostname "'+e+'" contains characters other than [A-Z0-9.-]')}e=r.hostname;if(this._parts.preventInvalidHostname){s.ensureValidHostname(e,this._parts.protocol)}}return I.call(this,e,t)};o.origin=function(e,t){if(this._parts.urn){return e===undefined?"":this}if(e===undefined){var r=this.protocol();var n=this.authority();if(!n){return""}return(r?r+"://":"")+this.authority()}else{var i=s(e);this.protocol(i.protocol()).authority(i.authority()).build(!t);return this}};o.host=function(e,t){if(this._parts.urn){return e===undefined?"":this}if(e===undefined){return this._parts.hostname?s.buildHost(this._parts):""}else{var r=s.parseHost(e,this._parts);if(r!=="/"){throw new TypeError('Hostname "'+e+'" contains characters other than [A-Z0-9.-]')}this.build(!t);return this}};o.authority=function(e,t){if(this._parts.urn){return e===undefined?"":this}if(e===undefined){return this._parts.hostname?s.buildAuthority(this._parts):""}else{var r=s.parseAuthority(e,this._parts);if(r!=="/"){throw new TypeError('Hostname "'+e+'" contains characters other than [A-Z0-9.-]')}this.build(!t);return this}};o.userinfo=function(e,t){if(this._parts.urn){return e===undefined?"":this}if(e===undefined){var r=s.buildUserinfo(this._parts);return r?r.substring(0,r.length-1):r}else{if(e[e.length-1]!=="@"){e+="@"}s.parseUserinfo(e,this._parts);this.build(!t);return this}};o.resource=function(e,t){var r;if(e===undefined){return this.path()+this.search()+this.hash()}r=s.parse(e);this._parts.path=r.path;this._parts.query=r.query;this._parts.fragment=r.fragment;this.build(!t);return this};o.subdomain=function(e,t){if(this._parts.urn){return e===undefined?"":this}if(e===undefined){if(!this._parts.hostname||this.is("IP")){return""}var r=this._parts.hostname.length-this.domain().length-1;return this._parts.hostname.substring(0,r)||""}else{var n=this._parts.hostname.length-this.domain().length;var i=this._parts.hostname.substring(0,n);var a=new RegExp("^"+h(i));if(e&&e.charAt(e.length-1)!=="."){e+="."}if(e.indexOf(":")!==-1){throw new TypeError("Domains cannot contain colons")}if(e){s.ensureValidHostname(e,this._parts.protocol)}this._parts.hostname=this._parts.hostname.replace(a,e);this.build(!t);return this}};o.domain=function(e,t){if(this._parts.urn){return e===undefined?"":this}if(typeof e==="boolean"){t=e;e=undefined}if(e===undefined){if(!this._parts.hostname||this.is("IP")){return""}var r=this._parts.hostname.match(/\./g);if(r&&r.length<2){return this._parts.hostname}var n=this._parts.hostname.length-this.tld(t).length-1;n=this._parts.hostname.lastIndexOf(".",n-1)+1;return this._parts.hostname.substring(n)||""}else{if(!e){throw new TypeError("cannot set domain empty")}if(e.indexOf(":")!==-1){throw new TypeError("Domains cannot contain colons")}s.ensureValidHostname(e,this._parts.protocol);if(!this._parts.hostname||this.is("IP")){this._parts.hostname=e}else{var i=new RegExp(h(this.domain())+"$");this._parts.hostname=this._parts.hostname.replace(i,e)}this.build(!t);return this}};o.tld=function(e,t){if(this._parts.urn){return e===undefined?"":this}if(typeof e==="boolean"){t=e;e=undefined}if(e===undefined){if(!this._parts.hostname||this.is("IP")){return""}var n=this._parts.hostname.lastIndexOf(".");var i=this._parts.hostname.substring(n+1);if(t!==true&&r&&r.list[i.toLowerCase()]){return r.get(this._parts.hostname)||i}return i}else{var s;if(!e){throw new TypeError("cannot set TLD empty")}else if(e.match(/[^a-zA-Z0-9-]/)){if(r&&r.is(e)){s=new RegExp(h(this.tld())+"$");this._parts.hostname=this._parts.hostname.replace(s,e)}else{throw new TypeError('TLD "'+e+'" contains characters other than [A-Z0-9]')}}else if(!this._parts.hostname||this.is("IP")){throw new ReferenceError("cannot set TLD on non-domain host")}else{s=new RegExp(h(this.tld())+"$");this._parts.hostname=this._parts.hostname.replace(s,e)}this.build(!t);return this}};o.directory=function(e,t){if(this._parts.urn){return e===undefined?"":this}if(e===undefined||e===true){if(!this._parts.path&&!this._parts.hostname){return""}if(this._parts.path==="/"){return"/"}var r=this._parts.path.length-this.filename().length-1;var n=this._parts.path.substring(0,r)||(this._parts.hostname?"/":"");return e?s.decodePath(n):n}else{var i=this._parts.path.length-this.filename().length;var a=this._parts.path.substring(0,i);var o=new RegExp("^"+h(a));if(!this.is("relative")){if(!e){e="/"}if(e.charAt(0)!=="/"){e="/"+e}}if(e&&e.charAt(e.length-1)!=="/"){e+="/"}e=s.recodePath(e);this._parts.path=this._parts.path.replace(o,e);this.build(!t);return this}};o.filename=function(e,t){if(this._parts.urn){return e===undefined?"":this}if(typeof e!=="string"){if(!this._parts.path||this._parts.path==="/"){return""}var r=this._parts.path.lastIndexOf("/");var n=this._parts.path.substring(r+1);return e?s.decodePathSegment(n):n}else{var i=false;if(e.charAt(0)==="/"){e=e.substring(1)}if(e.match(/\.?\//)){i=true}var a=new RegExp(h(this.filename())+"$");e=s.recodePath(e);this._parts.path=this._parts.path.replace(a,e);if(i){this.normalizePath(t)}else{this.build(!t)}return this}};o.suffix=function(e,t){if(this._parts.urn){return e===undefined?"":this}if(e===undefined||e===true){if(!this._parts.path||this._parts.path==="/"){return""}var r=this.filename();var n=r.lastIndexOf(".");var i,a;if(n===-1){return""}i=r.substring(n+1);a=/^[a-z0-9%]+$/i.test(i)?i:"";return e?s.decodePathSegment(a):a}else{if(e.charAt(0)==="."){e=e.substring(1)}var o=this.suffix();var u;if(!o){if(!e){return this}this._parts.path+="."+s.recodePath(e)}else if(!e){u=new RegExp(h("."+o)+"$")}else{u=new RegExp(h(o)+"$")}if(u){e=s.recodePath(e);this._parts.path=this._parts.path.replace(u,e)}this.build(!t);return this}};o.segment=function(e,t,r){var n=this._parts.urn?":":"/";var i=this.path();var s=i.substring(0,1)==="/";var a=i.split(n);if(e!==undefined&&typeof e!=="number"){r=t;t=e;e=undefined}if(e!==undefined&&typeof e!=="number"){throw new Error('Bad segment "'+e+'", must be 0-based integer')}if(s){a.shift()}if(e<0){e=Math.max(a.length+e,0)}if(t===undefined){return e===undefined?a:a[e]}else if(e===null||a[e]===undefined){if(p(t)){a=[];for(var o=0,u=t.length;o<u;o++){if(!t[o].length&&(!a.length||!a[a.length-1].length)){continue}if(a.length&&!a[a.length-1].length){a.pop()}a.push(m(t[o]))}}else if(t||typeof t==="string"){t=m(t);if(a[a.length-1]===""){a[a.length-1]=t}else{a.push(t)}}}else{if(t){a[e]=m(t)}else{a.splice(e,1)}}if(s){a.unshift("")}return this.path(a.join(n),r)};o.segmentCoded=function(e,t,r){var n,i,a;if(typeof e!=="number"){r=t;t=e;e=undefined}if(t===undefined){n=this.segment(e,t,r);if(!p(n)){n=n!==undefined?s.decode(n):undefined}else{for(i=0,a=n.length;i<a;i++){n[i]=s.decode(n[i])}}return n}if(!p(t)){t=typeof t==="string"||t instanceof String?s.encode(t):t}else{for(i=0,a=t.length;i<a;i++){t[i]=s.encode(t[i])}}return this.segment(e,t,r)};var S=o.query;o.query=function(e,t){if(e===true){return s.parseQuery(this._parts.query,this._parts.escapeQuerySpace)}else if(typeof e==="function"){var r=s.parseQuery(this._parts.query,this._parts.escapeQuerySpace);var n=e.call(this,r);this._parts.query=s.buildQuery(n||r,this._parts.duplicateQueryParameters,this._parts.escapeQuerySpace);this.build(!t);return this}else if(e!==undefined&&typeof e!=="string"){this._parts.query=s.buildQuery(e,this._parts.duplicateQueryParameters,this._parts.escapeQuerySpace);this.build(!t);return this}else{return S.call(this,e,t)}};o.setQuery=function(e,t,r){var n=s.parseQuery(this._parts.query,this._parts.escapeQuerySpace);if(typeof e==="string"||e instanceof String){n[e]=t!==undefined?t:null}else if(typeof e==="object"){for(var i in e){if(u.call(e,i)){n[i]=e[i]}}}else{throw new TypeError("URI.addQuery() accepts an object, string as the name parameter")}this._parts.query=s.buildQuery(n,this._parts.duplicateQueryParameters,this._parts.escapeQuerySpace);if(typeof e!=="string"){r=t}this.build(!r);return this};o.addQuery=function(e,t,r){var n=s.parseQuery(this._parts.query,this._parts.escapeQuerySpace);s.addQuery(n,e,t===undefined?null:t);this._parts.query=s.buildQuery(n,this._parts.duplicateQueryParameters,this._parts.escapeQuerySpace);if(typeof e!=="string"){r=t}this.build(!r);return this};o.removeQuery=function(e,t,r){var n=s.parseQuery(this._parts.query,this._parts.escapeQuerySpace);s.removeQuery(n,e,t);this._parts.query=s.buildQuery(n,this._parts.duplicateQueryParameters,this._parts.escapeQuerySpace);if(typeof e!=="string"){r=t}this.build(!r);return this};o.hasQuery=function(e,t,r){var n=s.parseQuery(this._parts.query,this._parts.escapeQuerySpace);return s.hasQuery(n,e,t,r)};o.setSearch=o.setQuery;o.addSearch=o.addQuery;o.removeSearch=o.removeQuery;o.hasSearch=o.hasQuery;o.normalize=function(){if(this._parts.urn){return this.normalizeProtocol(false).normalizePath(false).normalizeQuery(false).normalizeFragment(false).build()}return this.normalizeProtocol(false).normalizeHostname(false).normalizePort(false).normalizePath(false).normalizeQuery(false).normalizeFragment(false).build()};o.normalizeProtocol=function(e){if(typeof this._parts.protocol==="string"){this._parts.protocol=this._parts.protocol.toLowerCase();this.build(!e)}return this};o.normalizeHostname=function(r){if(this._parts.hostname){if(this.is("IDN")&&e){this._parts.hostname=e.toASCII(this._parts.hostname)}else if(this.is("IPv6")&&t){this._parts.hostname=t.best(this._parts.hostname)}this._parts.hostname=this._parts.hostname.toLowerCase();this.build(!r)}return this};o.normalizePort=function(e){if(typeof this._parts.protocol==="string"&&this._parts.port===s.defaultPorts[this._parts.protocol]){this._parts.port=null;this.build(!e)}return this};o.normalizePath=function(e){var t=this._parts.path;if(!t){return this}if(this._parts.urn){this._parts.path=s.recodeUrnPath(this._parts.path);this.build(!e);return this}if(this._parts.path==="/"){return this}t=s.recodePath(t);var r;var n="";var i,a;if(t.charAt(0)!=="/"){r=true;t="/"+t}if(t.slice(-3)==="/.."||t.slice(-2)==="/."){t+="/"}t=t.replace(/(\/(\.\/)+)|(\/\.$)/g,"/").replace(/\/{2,}/g,"/");if(r){n=t.substring(1).match(/^(\.\.\/)+/)||"";if(n){n=n[0]}}while(true){i=t.search(/\/\.\.(\/|$)/);if(i===-1){break}else if(i===0){t=t.substring(3);continue}a=t.substring(0,i).lastIndexOf("/");if(a===-1){a=i}t=t.substring(0,a)+t.substring(i+3)}if(r&&this.is("relative")){t=n+t.substring(1)}this._parts.path=t;this.build(!e);return this};o.normalizePathname=o.normalizePath;o.normalizeQuery=function(e){if(typeof this._parts.query==="string"){if(!this._parts.query.length){this._parts.query=null}else{this.query(s.parseQuery(this._parts.query,this._parts.escapeQuerySpace))}this.build(!e)}return this};o.normalizeFragment=function(e){if(!this._parts.fragment){this._parts.fragment=null;this.build(!e)}return this};o.normalizeSearch=o.normalizeQuery;o.normalizeHash=o.normalizeFragment;o.iso8859=function(){var e=s.encode;var t=s.decode;s.encode=escape;s.decode=decodeURIComponent;try{this.normalize()}finally{s.encode=e;s.decode=t}return this};o.unicode=function(){var e=s.encode;var t=s.decode;s.encode=v;s.decode=unescape;try{this.normalize()}finally{s.encode=e;s.decode=t}return this};o.readable=function(){var t=this.clone();t.username("").password("").normalize();var r="";if(t._parts.protocol){r+=t._parts.protocol+"://"}if(t._parts.hostname){if(t.is("punycode")&&e){r+=e.toUnicode(t._parts.hostname);if(t._parts.port){r+=":"+t._parts.port}}else{r+=t.host()}}if(t._parts.hostname&&t._parts.path&&t._parts.path.charAt(0)!=="/"){r+="/"}r+=t.path(true);if(t._parts.query){var n="";for(var i=0,a=t._parts.query.split("&"),o=a.length;i<o;i++){var u=(a[i]||"").split("=");n+="&"+s.decodeQuery(u[0],this._parts.escapeQuerySpace).replace(/&/g,"%26");if(u[1]!==undefined){n+="="+s.decodeQuery(u[1],this._parts.escapeQuerySpace).replace(/&/g,"%26")}}r+="?"+n.substring(1)}r+=s.decodeQuery(t.hash(),true);return r};o.absoluteTo=function(e){var t=this.clone();var r=["protocol","username","password","hostname","port"];var n,i,a;if(this._parts.urn){throw new Error("URNs do not have any generally defined hierarchical components")}if(!(e instanceof s)){e=new s(e)}if(t._parts.protocol){return t}else{t._parts.protocol=e._parts.protocol}if(this._parts.hostname){return t}for(i=0;a=r[i];i++){t._parts[a]=e._parts[a]}if(!t._parts.path){t._parts.path=e._parts.path;if(!t._parts.query){t._parts.query=e._parts.query}}else{if(t._parts.path.substring(-2)===".."){t._parts.path+="/"}if(t.path().charAt(0)!=="/"){n=e.directory();n=n?n:e.path().indexOf("/")===0?"/":"";t._parts.path=(n?n+"/":"")+t._parts.path;t.normalizePath()}}t.build();return t};o.relativeTo=function(e){var t=this.clone().normalize();var r,n,i,a,o;if(t._parts.urn){throw new Error("URNs do not have any generally defined hierarchical components")}e=new s(e).normalize();r=t._parts;n=e._parts;a=t.path();o=e.path();if(a.charAt(0)!=="/"){throw new Error("URI is already relative")}if(o.charAt(0)!=="/"){throw new Error("Cannot calculate a URI relative to another relative URI")}if(r.protocol===n.protocol){r.protocol=null}if(r.username!==n.username||r.password!==n.password){return t.build()}if(r.protocol!==null||r.username!==null||r.password!==null){return t.build()}if(r.hostname===n.hostname&&r.port===n.port){r.hostname=null;r.port=null}else{return t.build()}if(a===o){r.path="";return t.build()}i=s.commonPath(a,o);if(!i){return t.build()}var u=n.path.substring(i.length).replace(/[^\/]*$/,"").replace(/.*?\//g,"../");r.path=u+r.path.substring(i.length)||"./";return t.build()};o.equals=function(e){var t=this.clone();var r=new s(e);var n={};var i={};var a={};var o,h,f;t.normalize();r.normalize();if(t.toString()===r.toString()){return true}o=t.query();h=r.query();t.query("");r.query("");if(t.toString()!==r.toString()){return false}if(o.length!==h.length){return false}n=s.parseQuery(o,this._parts.escapeQuerySpace);i=s.parseQuery(h,this._parts.escapeQuerySpace);for(f in n){if(u.call(n,f)){if(!p(n[f])){if(n[f]!==i[f]){return false}}else if(!d(n[f],i[f])){return false}a[f]=true}}for(f in i){if(u.call(i,f)){if(!a[f]){return false}}}return true};o.preventInvalidHostname=function(e){this._parts.preventInvalidHostname=!!e;return this};o.duplicateQueryParameters=function(e){this._parts.duplicateQueryParameters=!!e;return this};o.escapeQuerySpace=function(e){this._parts.escapeQuerySpace=!!e;return this};return s});