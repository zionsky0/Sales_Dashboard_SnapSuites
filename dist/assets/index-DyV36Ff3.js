(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function a(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(i){if(i.ep)return;i.ep=!0;const c=a(i);fetch(i.href,c)}})();var tt={};(function e(n,a,r,i){var c=!!(n.Worker&&n.Blob&&n.Promise&&n.OffscreenCanvas&&n.OffscreenCanvasRenderingContext2D&&n.HTMLCanvasElement&&n.HTMLCanvasElement.prototype.transferControlToOffscreen&&n.URL&&n.URL.createObjectURL),l=typeof Path2D=="function"&&typeof DOMMatrix=="function",u=function(){if(!n.OffscreenCanvas)return!1;try{var o=new OffscreenCanvas(1,1),t=o.getContext("2d");t.fillRect(0,0,1,1);var h=o.transferToImageBitmap();t.createPattern(h,"no-repeat")}catch{return!1}return!0}();function T(){}function R(o){var t=a.exports.Promise,h=t!==void 0?t:n.Promise;return typeof h=="function"?new h(o):(o(T,T),null)}var m=function(o,t){return{transform:function(h){if(o)return h;if(t.has(h))return t.get(h);var b=new OffscreenCanvas(h.width,h.height),f=b.getContext("2d");return f.drawImage(h,0,0),t.set(h,b),b},clear:function(){t.clear()}}}(u,new Map),k=function(){var o=Math.floor(16.666666666666668),t,h,b={},f=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(t=function(x){var C=Math.random();return b[C]=requestAnimationFrame(function y(S){f===S||f+o-1<S?(f=S,delete b[C],x()):b[C]=requestAnimationFrame(y)}),C},h=function(x){b[x]&&cancelAnimationFrame(b[x])}):(t=function(x){return setTimeout(x,o)},h=function(x){return clearTimeout(x)}),{frame:t,cancel:h}}(),_=function(){var o,t,h={};function b(f){function x(C,y){f.postMessage({options:C||{},callback:y})}f.init=function(y){var S=y.transferControlToOffscreen();f.postMessage({canvas:S},[S])},f.fire=function(y,S,N){if(t)return x(y,null),t;var I=Math.random().toString(36).slice(2);return t=R(function($){function W(H){H.data.callback===I&&(delete h[I],f.removeEventListener("message",W),t=null,m.clear(),N(),$())}f.addEventListener("message",W),x(y,I),h[I]=W.bind(null,{data:{callback:I}})}),t},f.reset=function(){f.postMessage({reset:!0});for(var y in h)h[y](),delete h[y]}}return function(){if(o)return o;if(!r&&c){var f=["var CONFETTI, SIZE = {}, module = {};","("+e.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{o=new Worker(URL.createObjectURL(new Blob([f])))}catch(x){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",x),null}b(o)}return o}}(),oe={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function ie(o,t){return t?t(o):o}function le(o){return o!=null}function M(o,t,h){return ie(o&&le(o[t])?o[t]:oe[t],h)}function de(o){return o<0?0:Math.floor(o)}function ce(o,t){return Math.floor(Math.random()*(t-o))+o}function pe(o){return parseInt(o,16)}function Be(o){return o.map(Ne)}function Ne(o){var t=String(o).replace(/[^0-9a-f]/gi,"");return t.length<6&&(t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]),{r:pe(t.substring(0,2)),g:pe(t.substring(2,4)),b:pe(t.substring(4,6))}}function Te(o){var t=M(o,"origin",Object);return t.x=M(t,"x",Number),t.y=M(t,"y",Number),t}function $e(o){o.width=document.documentElement.clientWidth,o.height=document.documentElement.clientHeight}function Le(o){var t=o.getBoundingClientRect();o.width=t.width,o.height=t.height}function Me(o){var t=document.createElement("canvas");return t.style.position="fixed",t.style.top="0px",t.style.left="0px",t.style.pointerEvents="none",t.style.zIndex=o,t}function Ie(o,t,h,b,f,x,C,y,S){o.save(),o.translate(t,h),o.rotate(x),o.scale(b,f),o.arc(0,0,1,C,y,S),o.restore()}function We(o){var t=o.angle*(Math.PI/180),h=o.spread*(Math.PI/180);return{x:o.x,y:o.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:o.startVelocity*.5+Math.random()*o.startVelocity,angle2D:-t+(.5*h-Math.random()*h),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:o.color,shape:o.shape,tick:0,totalTicks:o.ticks,decay:o.decay,drift:o.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:o.gravity*3,ovalScalar:.6,scalar:o.scalar,flat:o.flat}}function Ae(o,t){t.x+=Math.cos(t.angle2D)*t.velocity+t.drift,t.y+=Math.sin(t.angle2D)*t.velocity+t.gravity,t.velocity*=t.decay,t.flat?(t.wobble=0,t.wobbleX=t.x+10*t.scalar,t.wobbleY=t.y+10*t.scalar,t.tiltSin=0,t.tiltCos=0,t.random=1):(t.wobble+=t.wobbleSpeed,t.wobbleX=t.x+10*t.scalar*Math.cos(t.wobble),t.wobbleY=t.y+10*t.scalar*Math.sin(t.wobble),t.tiltAngle+=.1,t.tiltSin=Math.sin(t.tiltAngle),t.tiltCos=Math.cos(t.tiltAngle),t.random=Math.random()+2);var h=t.tick++/t.totalTicks,b=t.x+t.random*t.tiltCos,f=t.y+t.random*t.tiltSin,x=t.wobbleX+t.random*t.tiltCos,C=t.wobbleY+t.random*t.tiltSin;if(o.fillStyle="rgba("+t.color.r+", "+t.color.g+", "+t.color.b+", "+(1-h)+")",o.beginPath(),l&&t.shape.type==="path"&&typeof t.shape.path=="string"&&Array.isArray(t.shape.matrix))o.fill(Re(t.shape.path,t.shape.matrix,t.x,t.y,Math.abs(x-b)*.1,Math.abs(C-f)*.1,Math.PI/10*t.wobble));else if(t.shape.type==="bitmap"){var y=Math.PI/10*t.wobble,S=Math.abs(x-b)*.1,N=Math.abs(C-f)*.1,I=t.shape.bitmap.width*t.scalar,$=t.shape.bitmap.height*t.scalar,W=new DOMMatrix([Math.cos(y)*S,Math.sin(y)*S,-Math.sin(y)*N,Math.cos(y)*N,t.x,t.y]);W.multiplySelf(new DOMMatrix(t.shape.matrix));var H=o.createPattern(m.transform(t.shape.bitmap),"no-repeat");H.setTransform(W),o.globalAlpha=1-h,o.fillStyle=H,o.fillRect(t.x-I/2,t.y-$/2,I,$),o.globalAlpha=1}else if(t.shape==="circle")o.ellipse?o.ellipse(t.x,t.y,Math.abs(x-b)*t.ovalScalar,Math.abs(C-f)*t.ovalScalar,Math.PI/10*t.wobble,0,2*Math.PI):Ie(o,t.x,t.y,Math.abs(x-b)*t.ovalScalar,Math.abs(C-f)*t.ovalScalar,Math.PI/10*t.wobble,0,2*Math.PI);else if(t.shape==="star")for(var E=Math.PI/2*3,z=4*t.scalar,q=8*t.scalar,G=t.x,Z=t.y,s=5,d=Math.PI/s;s--;)G=t.x+Math.cos(E)*q,Z=t.y+Math.sin(E)*q,o.lineTo(G,Z),E+=d,G=t.x+Math.cos(E)*z,Z=t.y+Math.sin(E)*z,o.lineTo(G,Z),E+=d;else o.moveTo(Math.floor(t.x),Math.floor(t.y)),o.lineTo(Math.floor(t.wobbleX),Math.floor(f)),o.lineTo(Math.floor(x),Math.floor(C)),o.lineTo(Math.floor(b),Math.floor(t.wobbleY));return o.closePath(),o.fill(),t.tick<t.totalTicks}function De(o,t,h,b,f){var x=t.slice(),C=o.getContext("2d"),y,S,N=R(function(I){function $(){y=S=null,C.clearRect(0,0,b.width,b.height),m.clear(),f(),I()}function W(){r&&!(b.width===i.width&&b.height===i.height)&&(b.width=o.width=i.width,b.height=o.height=i.height),!b.width&&!b.height&&(h(o),b.width=o.width,b.height=o.height),C.clearRect(0,0,b.width,b.height),x=x.filter(function(H){return Ae(C,H)}),x.length?y=k.frame(W):$()}y=k.frame(W),S=$});return{addFettis:function(I){return x=x.concat(I),N},canvas:o,promise:N,reset:function(){y&&k.cancel(y),S&&S()}}}function ye(o,t){var h=!o,b=!!M(t||{},"resize"),f=!1,x=M(t,"disableForReducedMotion",Boolean),C=c&&!!M(t||{},"useWorker"),y=C?_():null,S=h?$e:Le,N=o&&y?!!o.__confetti_initialized:!1,I=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,$;function W(E,z,q){for(var G=M(E,"particleCount",de),Z=M(E,"angle",Number),s=M(E,"spread",Number),d=M(E,"startVelocity",Number),v=M(E,"decay",Number),p=M(E,"gravity",Number),P=M(E,"drift",Number),B=M(E,"colors",Be),V=M(E,"ticks",Number),te=M(E,"shapes"),Q=M(E,"scalar"),X=!!M(E,"flat"),ae=Te(E),K=G,Y=[],ne=o.width*ae.x,se=o.height*ae.y;K--;)Y.push(We({x:ne,y:se,angle:Z,spread:s,startVelocity:d,color:B[K%B.length],shape:te[ce(0,te.length)],ticks:V,decay:v,gravity:p,drift:P,scalar:Q,flat:X}));return $?$.addFettis(Y):($=De(o,Y,S,z,q),$.promise)}function H(E){var z=x||M(E,"disableForReducedMotion",Boolean),q=M(E,"zIndex",Number);if(z&&I)return R(function(d){d()});h&&$?o=$.canvas:h&&!o&&(o=Me(q),document.body.appendChild(o)),b&&!N&&S(o);var G={width:o.width,height:o.height};y&&!N&&y.init(o),N=!0,y&&(o.__confetti_initialized=!0);function Z(){if(y){var d={getBoundingClientRect:function(){if(!h)return o.getBoundingClientRect()}};S(d),y.postMessage({resize:{width:d.width,height:d.height}});return}G.width=G.height=null}function s(){$=null,b&&(f=!1,n.removeEventListener("resize",Z)),h&&o&&(document.body.contains(o)&&document.body.removeChild(o),o=null,N=!1)}return b&&!f&&(f=!0,n.addEventListener("resize",Z,!1)),y?y.fire(E,G,s):W(E,G,s)}return H.reset=function(){y&&y.reset(),$&&$.reset()},H}var ue;function be(){return ue||(ue=ye(null,{useWorker:!0,resize:!0})),ue}function Re(o,t,h,b,f,x,C){var y=new Path2D(o),S=new Path2D;S.addPath(y,new DOMMatrix(t));var N=new Path2D;return N.addPath(S,new DOMMatrix([Math.cos(C)*f,Math.sin(C)*f,-Math.sin(C)*x,Math.cos(C)*x,h,b])),N}function He(o){if(!l)throw new Error("path confetti are not supported in this browser");var t,h;typeof o=="string"?t=o:(t=o.path,h=o.matrix);var b=new Path2D(t),f=document.createElement("canvas"),x=f.getContext("2d");if(!h){for(var C=1e3,y=C,S=C,N=0,I=0,$,W,H=0;H<C;H+=2)for(var E=0;E<C;E+=2)x.isPointInPath(b,H,E,"nonzero")&&(y=Math.min(y,H),S=Math.min(S,E),N=Math.max(N,H),I=Math.max(I,E));$=N-y,W=I-S;var z=10,q=Math.min(z/$,z/W);h=[q,0,0,q,-Math.round($/2+y)*q,-Math.round(W/2+S)*q]}return{type:"path",path:t,matrix:h}}function Fe(o){var t,h=1,b="#000000",f='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof o=="string"?t=o:(t=o.text,h="scalar"in o?o.scalar:h,f="fontFamily"in o?o.fontFamily:f,b="color"in o?o.color:b);var x=10*h,C=""+x+"px "+f,y=new OffscreenCanvas(x,x),S=y.getContext("2d");S.font=C;var N=S.measureText(t),I=Math.ceil(N.actualBoundingBoxRight+N.actualBoundingBoxLeft),$=Math.ceil(N.actualBoundingBoxAscent+N.actualBoundingBoxDescent),W=2,H=N.actualBoundingBoxLeft+W,E=N.actualBoundingBoxAscent+W;I+=W+W,$+=W+W,y=new OffscreenCanvas(I,$),S=y.getContext("2d"),S.font=C,S.fillStyle=b,S.fillText(t,H,E);var z=1/h;return{type:"bitmap",bitmap:y.transferToImageBitmap(),matrix:[z,0,0,z,-I*z/2,-$*z/2]}}a.exports=function(){return be().apply(this,arguments)},a.exports.reset=function(){be().reset()},a.exports.create=ye,a.exports.shapeFromPath=He,a.exports.shapeFromText=Fe})(function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}}(),tt,!1);const kt=tt.exports;tt.exports.create;const J=[{id:"digital-2h",name:"2-Hour Digital Package",price:250,duration:2,badge:"Popular for Intimate Parties",includesPrints:!1,description:"Perfect for lively digital-focused celebrations with instant social sharing.",features:["2 hours of photobooth hire","Unlimited visits to the booth","Instant sharing via Email, SMS or QR code","Luxury props curated for your event","Choice of Burgundy or Ivory curtain backdrop","Personalised interactive rear screen display"]},{id:"birthday-3h",name:"3-Hour Birthday / Celebration Package",price:350,duration:3,badge:"Recommended & Best Seller",includesPrints:!0,description:"The sweet spot for full evening celebrations with physical prints & digital memories.",features:["3 hours of photobooth hire","Unlimited visits to the booth","Up to 6 high-quality prints per visit","Instant digital sharing (Email/SMS/QR)","Luxury props curated for your theme","Choice of Burgundy or Ivory curtain backdrop","Personalised rear screen with guest of honour photos/videos"]},{id:"corporate-custom",name:"Custom Corporate & VIP Package",price:500,duration:4,badge:"Custom Corporate",includesPrints:!0,description:"Bespoke activation setup with custom branding on prints and back screen.",features:["4+ hours of continuous hire","Custom branded print strip layout & logo","Branded video loops on rear screen","Unlimited physical prints & instant digital sharing","VIP Luxury Props & Custom Backdrop","Post-event digital analytics & photo zip gallery"]}],Ee=[{id:"extra_hour",name:"Extra Photobooth Hire Hour",price:75,unit:"per hour",description:"Extend the fun by another hour of booth operation"},{id:"guestbook",name:"Luxury Memory Guestbook & Pens",price:40,unit:"per event",description:"Hardcover album for guests to stick prints & write messages"},{id:"rear_screen_custom",name:"Bespoke Rear Screen Slideshow Setup",price:25,unit:"per event",description:"Custom curated slideshow/video compilation of guest of honour"},{id:"neon_sign",name:"Custom Neon Sign Backdrop Accent",price:35,unit:"per event",description:`Warm glowing "Let's Party" or custom neon light backdrop accent`},{id:"extra_prints",name:"Extra Print Strips Set (Unlimited Double Prints)",price:30,unit:"per event",description:"Ensures every guest in group shots gets a physical print copy"},{id:"travel_surcharge",name:"Extended Location Travel Fee",price:35,unit:"flat fee",description:"Coverage for events outside core Manchester/Leeds North West area"}],st=[{id:"burgundy",name:"Burgundy Velvet",description:"Rich, luxurious dark red velvet backdrop"},{id:"ivory",name:"Ivory Elegance",description:"Timeless satin ivory silk curtain backdrop"}],Pe=[{id:"new",name:"New Enquiry",color:"#3B82F6",icon:"📥"},{id:"quote_sent",name:"Quote Sent / Follow-up",color:"#F59E0B",icon:"💬"},{id:"negotiation",name:"Date Hold / Negotiating",color:"#8B5CF6",icon:"🤝"},{id:"secured",name:"Deposit Paid (Won)",color:"#10B981",icon:"🎉"},{id:"completed",name:"Event Completed",color:"#06B6D4",icon:"🏁"},{id:"lost",name:"Declined / Lost",color:"#EF4444",icon:"❌"}],we=[{id:"not_contacted",name:"Not Contacted Yet",color:"#EF4444",icon:"🔴"},{id:"initial_outreach",name:"Outreach Sent",color:"#F59E0B",icon:"🟡"},{id:"followup_sent",name:"Follow-up Sent",color:"#8B5CF6",icon:"🟣"},{id:"meeting_scheduled",name:"Call / Meeting Scheduled",color:"#3B82F6",icon:"🔵"},{id:"converted",name:"Converted to Lead",color:"#10B981",icon:"🟢"},{id:"not_interested",name:"Not Interested",color:"#6B7280",icon:"⚪"}],Ce=[{id:"prospect-1",name:"Peckforton Castle Events Team",contactPerson:"Claire Higgins (Wedding Coordinator)",category:"Wedding Venue Partner",location:"Tarporley, Cheshire",preferredChannel:"Email",contactEmail:"weddings@peckfortoncastle.co.uk",contactPhone:"01829 260901",status:"initial_outreach",nextActionDate:"2026-08-25",notes:"Sent luxury brochure email proposing SnapSuites photobooth for their recommended supplier list.",targetPackage:"birthday-3h"},{id:"prospect-2",name:"Victoria Warehouse Event Management",contactPerson:"Alex Turner",category:"Corporate & Party Venue",location:"Trafford Park, Manchester",preferredChannel:"Phone",contactEmail:"events@victoriawarehouse.com",contactPhone:"0161 660 7000",status:"not_contacted",nextActionDate:"2026-08-21",notes:"High-volume venue for large corporate Christmas parties and 30th birthday galas.",targetPackage:"corporate-custom"},{id:"prospect-3",name:"Jessica M. (30th Birthday Host)",contactPerson:"Jessica Myers",category:"Private Party Host",location:"Didsbury, Manchester",preferredChannel:"Instagram DM",contactEmail:"jess.myers30@example.com",contactPhone:"07788 123456",status:"followup_sent",nextActionDate:"2026-08-22",notes:"Inquired via Instagram DM for Nov 2026 birthday. Sent quote for 2-Hour Digital Package (£250).",targetPackage:"digital-2h"},{id:"prospect-4",name:"Grantley Hall Luxury Weddings",contactPerson:"Rebecca Vance (Events Mgr)",category:"Wedding Venue Partner",location:"Ripon, North Yorkshire",preferredChannel:"Email",contactEmail:"events@grantleyhall.co.uk",contactPhone:"01765 620070",status:"not_contacted",nextActionDate:"2026-08-24",notes:"Ultra-luxury 5-star venue in Yorkshire. Perfect match for SnapSuites mahogany vintage aesthetic.",targetPackage:"birthday-3h"}],Se=[{id:"lead-1",clientName:"Chris",contactEmail:"chris.event2027@example.com",contactPhone:"07700 900123",eventType:"Birthday Celebration",eventDate:"2027-06-19",eventTime:"19:00 - 22:00",recommendedTiming:"7pm–10pm",venue:"Bark Enquiry (Manchester / Cheshire)",source:"Bark",packageId:"birthday-3h",backdrop:"burgundy",guestCount:80,dealValue:350,stage:"quote_sent",notes:"Inquired via Bark for Birthday celebration on Sat 19th June 2027. Sent 3-Hour Birthday Package quote (£350) with recommended 7pm-10pm sweet spot.",addOns:["rear_screen_custom"],commissionRate:10,createdAt:"2026-08-19T10:15:00Z",lastContactDate:"2026-08-19T11:30:00Z"},{id:"lead-2",clientName:"Sarah & Mark",contactEmail:"sarah.m.wedding@example.co.uk",contactPhone:"07891 234567",eventType:"Wedding",eventDate:"2027-08-14",eventTime:"19:30 - 23:30",recommendedTiming:"7:30pm–11:30pm",venue:"Peckforton Castle, Tarporley, Cheshire",source:"Bridebook",packageId:"birthday-3h",backdrop:"ivory",guestCount:120,dealValue:465,stage:"secured",notes:"3-Hour Birthday/Wedding package (£350) + Extra Hour (£75) + Luxury Memory Guestbook (£40). £100 deposit paid. Ivory curtain backdrop selected.",addOns:["extra_hour","guestbook"],commissionRate:12,createdAt:"2026-08-10T14:20:00Z",lastContactDate:"2026-08-15T09:00:00Z"},{id:"lead-3",clientName:"Aethel Technology Gala",contactEmail:"events@aetheltech.co.uk",contactPhone:"0113 496 0888",eventType:"Corporate Gala",eventDate:"2026-12-04",eventTime:"18:30 - 22:30",recommendedTiming:"6:30pm–10:30pm",venue:"Royal Armouries, Leeds",source:"Direct Website",packageId:"corporate-custom",backdrop:"burgundy",guestCount:200,dealValue:625,stage:"negotiation",notes:"Annual corporate celebration. Requires custom logo on print strips & custom company slideshow loop on rear screen. Holding date for invoice sign-off.",addOns:["rear_screen_custom","neon_sign","extra_prints"],commissionRate:15,createdAt:"2026-08-12T16:45:00Z",lastContactDate:"2026-08-18T16:00:00Z"},{id:"lead-4",clientName:"Victoria Hastings",contactEmail:"victoria.h21@example.com",contactPhone:"07712 345678",eventType:"21st Birthday",eventDate:"2026-11-20",eventTime:"20:00 - 22:00",recommendedTiming:"8pm–10pm",venue:"Revolucion de Cuba, Manchester",source:"Instagram DM",packageId:"digital-2h",backdrop:"burgundy",guestCount:50,dealValue:250,stage:"new",notes:"Asked via Instagram about 2-hour photobooth hire for her 21st party. Wants burgundy backdrop and QR digital sharing.",addOns:[],commissionRate:10,createdAt:"2026-08-19T14:00:00Z",lastContactDate:"2026-08-19T14:00:00Z"},{id:"lead-5",clientName:"David & Chloe",contactEmail:"david.chloe.anniversary@example.com",contactPhone:"07900 888111",eventType:"Silver Wedding Anniversary",eventDate:"2026-09-12",eventTime:"19:00 - 22:00",recommendedTiming:"7pm–10pm",venue:"Harrogate Majestic Hotel, Harrogate",source:"Referral",packageId:"birthday-3h",backdrop:"ivory",guestCount:65,dealValue:390,stage:"completed",notes:"3-Hour Package (£350) + Guestbook (£40). Event completed smoothly! Client left 5-star review on Google.",addOns:["guestbook"],commissionRate:10,createdAt:"2026-07-01T11:00:00Z",lastContactDate:"2026-09-13T10:00:00Z"}],it=[{id:"bark-birthday",title:"Bark Enquiry Response (Birthday / Private Party)",category:"Bark Lead Reply",subject:"SnapSuites Interactive Vintage Photobooth Quote for {CLIENT_NAME}",body:`Hi {CLIENT_NAME},

Thanks for getting in touch through Bark regarding your {EVENT_TYPE} on {EVENT_DATE}.

Our interactive vintage photobooth is a stylish, statement booth designed to be part of the evening rather than just a photo-taking station. It features a large screen on the back, which can be personalised to display photos or videos of the guest of honour throughout the event.

Guests can enjoy unlimited visits to the booth, with luxury props and a choice of burgundy or ivory curtain backdrop to suit the style of your celebration.

For your evening, we’d recommend {TIMING} as the sweet spot — giving everyone time to arrive and settle in, while capturing the fun, lively atmosphere once the celebrations are in full swing.

We have two main packages available:

2-Hour Digital Package – £250
• 2 hours of photobooth hire
• Unlimited visits to the booth
• Instant sharing via email, SMS or QR code
• Luxury props
• Choice of burgundy or ivory curtain backdrop

3-Hour Birthday Package – £350
• 3 hours of photobooth hire
• Unlimited visits to the booth
• Up to 6 prints per visit
• Instant digital sharing
• Luxury props
• Choice of burgundy or ivory curtain backdrop

If you have any questions or would like to go ahead, just let me know and we’d be happy to get your date secured.

Best wishes,
Luca
SnapSuites Luxury Photobooth Hire
www.snapsuites.co.uk | bookings@snapsuites.co.uk`},{id:"bark-wedding",title:"Bark Enquiry Response (Luxury Wedding)",category:"Bark Lead Reply",subject:"SnapSuites Interactive Vintage Photobooth for {CLIENT_NAME}'s Wedding",body:`Hi {CLIENT_NAME},

Congratulations on your upcoming wedding! Thank you for reaching out regarding photobooth hire for {EVENT_DATE} at {VENUE}.

SnapSuites provides a truly statement vintage photobooth designed to elevate your reception aesthetic. Unlike basic pop-up booths, ours features a beautiful mahogany finish, brass details, and an interactive back screen that can play a romantic photo slideshow of your journey together during the night.

We recommend a 3-hour hire during your evening reception (typically {TIMING}) when your evening guests arrive and the dancefloor opens.

Our recommended Wedding & Celebration Package (£350):
• 3 hours of continuous photobooth hire
• Unlimited visits & up to 6 high-definition instant physical prints per visit
• Instant digital sharing via QR code, SMS & Email
• Premium curated prop collection (stylish & high-end)
• Luxury Burgundy Velvet or Ivory Satin curtain backdrop
• Full personalized rear screen photo/video compilation
• Online digital photo gallery access after the wedding

Optional Add-on:
• Hardcover Memory Guestbook & Metallic Pens (+£40) - where guests paste a print and leave warm wishes for your wedding book!

Would you like us to check exact availability and lock in your wedding date?

Warmest congratulations,
Luca & The SnapSuites Team
www.snapsuites.co.uk`},{id:"venue-partnership",title:"Venue / Event Coordinator Cold Pitch",category:"Venue Outreach",subject:"Recommended Photobooth Supplier Partnership - SnapSuites (North West & Yorkshire)",body:`Hi {COORDINATOR_NAME},

I hope you are having a fantastic week.

I’m reaching out from SnapSuites — we specialize in interactive vintage photobooth hire across North West and Yorkshire venues.

Unlike standard black box photo pods, our booth is styled as a luxury piece of furniture with rich mahogany, brass accents, and a customizable digital rear display screen (perfect for displaying couple photos or company branding).

We’d love to explore being added to your recommended supplier directory for {VENUE_NAME}. We offer venue partners:
1. Special exclusive rates/upgrades for your clients
2. Complimentary guestbook setup for venue-managed weddings
3. Clean, insured (PAT & Public Liability £5M) professional setup

I would love to send over our digital brochure or drop off sample print strips if you’re open to a quick 5-minute chat.

Best regards,
Luca
SnapSuites Photobooth Hire
www.snapsuites.co.uk`}],wt=[{objection:'"Why choose SnapSuites over a cheaper £150 selfie pod?"',talkingPoints:["**Statement Furniture Design**: SnapSuites is an interactive vintage luxury booth (mahogany & brass trim) that acts as an eye-catching focal point at luxury venues, not a plastic tripod pod.","**Dual Screen Experience**: Features a huge personalized interactive rear screen displaying guest of honour photos/videos all night long to entertain waiting guests.","**High Quality Prints & Lighting**: Studio-grade lighting and instant thermal printing up to 6 prints per turn vs budget webcams.","**Attendant Service**: Includes professional setup & friendly booth attendant so host doesn't worry about paper jams or tech issues."]},{objection:'"Is 2 hours or 3 hours better for our event?"',talkingPoints:["**Sweet Spot Timing**: For evening celebrations starting at 7pm, 7pm–10pm (3 hours) is ideal because guests settle in during hour 1, and the booth peaks during hours 2 & 3 as drinks flow.","**Digital vs Print**: If you want physical print souvenirs for guests to keep on their fridge (or stick in a guestbook), the 3-Hour £350 package offers maximum value with up to 6 prints per visit."]},{objection:'"Can we play custom videos or photo slideshows on the back screen?"',talkingPoints:["**Yes! Fully Personalised**: You can send us up to 30 photos or short video clips of the birthday host, couple, or brand logo beforehand. We compile and load them so it continuously rotates in high definition behind the booth."]},{objection:'"What backdrops do you offer?"',talkingPoints:["**Burgundy Velvet**: Warm, rich, vintage theatrical vibe. Stunning contrast for glam photo strips.","**Ivory Elegance**: Timeless, bright, romantic satin curtain backdrop perfect for weddings & classic birthday themes."]}],Ct=[{feature:"Aesthetic & Design",snapsuites:"Luxury Mahogany & Brass Vintage Furniture",cheapPod:"Plastic White Ringlight Tripod",magicMirror:"Large Mirror Frame"},{feature:"Interactive Rear Screen",snapsuites:"✅ YES (Displays guest photos/videos all night)",cheapPod:"❌ NO (Blank rear)",magicMirror:"❌ NO"},{feature:"Print Quality & Copies",snapsuites:"Dye-Sub Thermal (Up to 6 prints/turn)",cheapPod:"Digital only or slow inkjet",magicMirror:"Standard thermal"},{feature:"Prop Collection",snapsuites:"Curated Luxury Props (Gold, Velvet, Feather)",cheapPod:"Basic paper props on sticks",magicMirror:"Standard props"},{feature:"Average Price",snapsuites:"£250 - £350 (Premium Value)",cheapPod:"£150 - £200 (Low quality)",magicMirror:"£350 - £450 (Clunky setup)"}],Oe=[],he=[{id:"dir-1",name:"Colshaw Hall",venueName:"Colshaw Hall",companyName:"Colshaw Hall",contactName:"Weddings & Events Team",boothStyle:"Vintage Handcrafted Booth & Glam Pods",category:"Luxury Venue",area:"Knutsford, Cheshire",bestAngle:"Vintage Booth, Glam Pods",email:"enquiries@colshawhall.com",phone:"01565 724060",status:"not_contacted",notes:"Luxury country estate in Knutsford. Target recommended vendor list.",targetWeek:"Week 1"},{id:"dir-2",name:"Merrydale Manor",venueName:"Merrydale Manor",companyName:"Merrydale Manor",contactName:"Events Team",boothStyle:"High-End Evening Mirror & Pods",category:"Luxury Venue",area:"Knutsford, Cheshire",bestAngle:"High-End Evening Mirror & Pods",email:"enquiries@merrydalemanor.com",phone:"01565 724060",status:"not_contacted",notes:"Sister venue to Colshaw. Focus on sleek aesthetic and zero staff hassle.",targetWeek:"Week 1"},{id:"dir-3",name:"Delamere Manor",venueName:"Delamere Manor",companyName:"Delamere Manor",contactName:"Weddings Team",boothStyle:"Vintage Booth & VIP Glam Pods",category:"Luxury Venue",area:"Cuddington, Cheshire",bestAngle:"VIP Weddings & Private Parties",email:"enquiries@delameremanor.co.uk",phone:"01606 827617",status:"not_contacted",notes:"High-budget VIP venue with dedicated nightclub and terrace.",targetWeek:"Week 1"},{id:"dir-4",name:"Peckforton Castle",venueName:"Peckforton Castle",companyName:"Peckforton Castle",contactName:"Wedding Coordinators",boothStyle:"Vintage Handcrafted Wooden Booth & Magic Mirror",category:"Castle Venue",area:"Tarporley, Cheshire",bestAngle:"Magic Mirror, Vintage Booth",email:"PCEnquiries@BHGUK.com",phone:"01829 260930",status:"not_contacted",notes:"Iconic North West castle. Vintage mahogany aesthetic matches Great Hall.",targetWeek:"Week 1"},{id:"dir-5",name:"The Oak Tree of Peover",venueName:"The Oak Tree of Peover",companyName:"The Oak Tree of Peover",contactName:"Events Team",boothStyle:"Vintage Wood Booth & Rustic Sets",category:"Rustic Venue",area:"Knutsford, Cheshire",bestAngle:"Vintage Wood Booth & Rustic Sets",email:"info@oaktreeofpeover.co.uk",phone:"01565 723337",status:"not_contacted",notes:"Oak-framed barn. Rustic photo booth styling matches venue interior perfectly.",targetWeek:"Week 1"},{id:"dir-6",name:"Nunsmere Hall",venueName:"Nunsmere Hall",companyName:"Nunsmere Hall",contactName:"Weddings Team",boothStyle:"Luxury Marquee & Garden Pods",category:"Country Venue",area:"Northwich, Cheshire",bestAngle:"Marquee & Garden Pods",email:"NHEnquiries@BHGUK.com",phone:"01606 889100",status:"not_contacted",notes:"Lakeside estate with large luxury marquee for evening receptions.",targetWeek:"Week 1"},{id:"dir-7",name:"Stock Farm Events Barn",venueName:"Stock Farm Events Barn",companyName:"Stock Farm Events Barn",contactName:"Events Team",boothStyle:"Casual & Festival Vintage Booth Packages",category:"Barn Venue",area:"Altrincham, Cheshire",bestAngle:"Casual/Festival Booth Packages",email:"info@tattonweddings.co.uk",phone:"01565 830040",status:"not_contacted",notes:"Tatton Estate rustic wedding barn.",targetWeek:"Week 1"},{id:"dir-8",name:"Styal Lodge",venueName:"Styal Lodge",companyName:"Styal Lodge",contactName:"Weddings Team",boothStyle:"Open-Air Selfie Pods & Vintage Sets",category:"Barn Venue",area:"Wilmslow, Cheshire",bestAngle:"Open-Air Selfie Pods",email:"weddings@styallodge.co.uk",phone:"01625 416322",status:"not_contacted",notes:"Family-run contemporary wooden lodge in Wilmslow.",targetWeek:"Week 1"},{id:"dir-9",name:"Arley Hall & Gardens",venueName:"Arley Hall & Gardens",companyName:"Arley Hall & Gardens",contactName:"Weddings Team",boothStyle:"Vintage Handcrafted Booth with Velvet Backdrops",category:"Historic Venue",area:"Northwich, Cheshire",bestAngle:"Vintage Booth, Classic Backdrops",email:"weddings@arleyhallandgardens.com",phone:"01565 777353",status:"not_contacted",notes:"Stately historic estate. Burgundy velvet backdrop and classic gold prints.",targetWeek:"Week 1"},{id:"dir-10",name:"Combermere Abbey",venueName:"Combermere Abbey",companyName:"Combermere Abbey",contactName:"Weddings Team",boothStyle:"Luxury Walled Garden & Marquee Pods",category:"Country Estate",area:"Whitchurch, Cheshire",bestAngle:"Luxury Walled Garden & Marquees",email:"weddings@combermereabbey.co.uk",phone:"01948 871662",status:"not_contacted",notes:"Historic abbey & glasshouse walled garden.",targetWeek:"Week 1"},{id:"dir-11",name:"Owen House Wedding Barn",venueName:"Owen House Wedding Barn",companyName:"Owen House Wedding Barn",contactName:"Events Team",boothStyle:"Retro/Wooden Photo Booth Sets",category:"Rustic Venue",area:"Mobberley, Cheshire",bestAngle:"Retro/Wooden Photo Booth Sets",email:"enquiries@owenhouseweddingbarn.co.uk",phone:"07732 183020",status:"not_contacted",notes:"Bespoke converted rustic barn in Mobberley.",targetWeek:"Week 1"},{id:"dir-12",name:"Heaton House Farm",venueName:"Heaton House Farm",companyName:"Heaton House Farm",contactName:"Events Team",boothStyle:"High-Capacity Evening Mirror & Pods",category:"Barn Venue",area:"Macclesfield, Cheshire",bestAngle:"High-Capacity Evening Mirror",email:"events@heatonhouse.co.uk",phone:"01260 226503",status:"not_contacted",notes:"Award-winning high-volume wedding venue.",targetWeek:"Week 1"},{id:"dir-13",name:"Capesthorne Hall",venueName:"Capesthorne Hall",companyName:"Capesthorne Hall",contactName:"Events Team",boothStyle:"Magic Mirror & Grand Stately Setups",category:"Historic Venue",area:"Macclesfield, Cheshire",bestAngle:"Magic Mirror & Grand Setups",email:"events@capesthorne.com",phone:"01625 861221",status:"not_contacted",notes:"Jacobean style stately home with luxury marquees.",targetWeek:"Week 1"},{id:"dir-14",name:"Wrenbury Hall",venueName:"Wrenbury Hall",companyName:"Wrenbury Hall",contactName:"Weddings Team",boothStyle:"Glam Filter Pod & VIP Booths",category:"Country Venue",area:"Nantwich, Cheshire",bestAngle:"Glam Filter Pod & VIP Parties",email:"enquiries@wrenburyhall.co.uk",phone:"01270 780115",status:"not_contacted",notes:"Exclusive luxury country house with Orangerie.",targetWeek:"Week 1"},{id:"dir-15",name:"Grosvenor Pulford Hotel",venueName:"Grosvenor Pulford Hotel",companyName:"Grosvenor Pulford Hotel",contactName:"Weddings Team",boothStyle:"Large Wedding Reception Glam Pods",category:"Hotel & Spa",area:"Chester, Cheshire",bestAngle:"Large Wedding Receptions",email:"weddings@grosvenorpulfordhotel.co.uk",phone:"01244 570560",status:"not_contacted",notes:"Grosvenor Suite for large gala weddings.",targetWeek:"Week 1"},{id:"dir-16",name:"Abbeywood Estate",venueName:"Abbeywood Estate",companyName:"Abbeywood Estate",contactName:"Events Team",boothStyle:"Roamer Booth & Garden Party Sets",category:"Garden Venue",area:"Delamere, Cheshire",bestAngle:"Roamer Booth & Garden Parties",email:"info@abbeywoodestate.com",phone:"01606 888221",status:"not_contacted",notes:"45-acre estate in Delamere forest.",targetWeek:"Week 1"},{id:"dir-17",name:"Carden Park Hotel",venueName:"Carden Park Hotel",companyName:"Carden Park Hotel",contactName:"Events Team",boothStyle:"Large Corporate Gala & Wedding Pods",category:"Luxury Resort",area:"Chester, Cheshire",bestAngle:"Large Corporate Galas & Awards",email:"events@cardenpark.co.uk",phone:"01829 731000",status:"not_contacted",notes:"1,000 acre resort for corporate galas and luxury Asian/Western weddings.",targetWeek:"Week 1"},{id:"dir-18",name:"Mottram Hall",venueName:"Mottram Hall",companyName:"Mottram Hall",contactName:"Weddings Team",boothStyle:"Luxury Vintage Booth & Glam Mirror",category:"Luxury Resort",area:"Prestbury, Cheshire",bestAngle:"Golf Days & Luxury Weddings",email:"mottramweddings@theelitevenueselection.co.uk",phone:"01625 828135",status:"not_contacted",notes:"18th-century Georgian country house hotel.",targetWeek:"Week 1"},{id:"dir-19",name:"Oddfellows Chester",venueName:"Oddfellows Chester",companyName:"Oddfellows Chester",contactName:"Events Team",boothStyle:"Quirky Selfie Pod & Glam Setups",category:"Boutique Venue",area:"Chester, Cheshire",bestAngle:"Quirky Selfie Pod Setups",email:"events@oddfellowschester.com",phone:"01244 345454",status:"not_contacted",notes:"Eclectic Georgian townhouse boutique hotel.",targetWeek:"Week 1"},{id:"dir-20",name:"Thornton Manor",venueName:"Thornton Manor",companyName:"Thornton Manor",contactName:"Events Team",boothStyle:"Grand Stately & Walled Garden Pods",category:"Historic Estate",area:"Wirral, Merseyside",bestAngle:"Large Asian & Western Weddings",email:"info@thorntonmanor.co.uk",phone:"0151 353 1155",status:"not_contacted",notes:"Grade II listed manor house with walled garden marquee.",targetWeek:"Week 1"},{id:"dir-21",name:"Kimpton Clocktower Hotel",venueName:"Kimpton Clocktower Hotel",companyName:"Kimpton Clocktower Hotel",contactName:"Conference & Events Team",boothStyle:"Corporate Ball & Banquet Glam Pods",category:"Luxury Hotel",area:"Manchester City Centre",bestAngle:"Corporate Balls & Banquets",email:"manchesterconference@ihg.com",phone:"0161 288 1111",status:"not_contacted",notes:"Massive ballroom for Manchester corporate award dinners.",targetWeek:"Week 1"},{id:"dir-22",name:"King Street Townhouse",venueName:"King Street Townhouse",companyName:"King Street Townhouse",contactName:"Weddings & Events Team",boothStyle:"Rooftop Glam Pod & Roamer Booth",category:"Boutique Hotel",area:"Manchester City Centre",bestAngle:"Rooftop Events & Brand Launches",email:"weddings@kingstreettownhouse.co.uk",phone:"0161 667 0707",status:"not_contacted",notes:"Iconic rooftop infinity pool and private event suites.",targetWeek:"Week 1"},{id:"dir-23",name:"The Edwardian Manchester",venueName:"The Edwardian Manchester",companyName:"The Edwardian Manchester",contactName:"Events Team",boothStyle:"5-Star Corporate Dinner Photo Sets",category:"5-Star Hotel",area:"Manchester City Centre",bestAngle:"High-Profile Corporate Dinners",email:"manchesterevents@edwardian.com",phone:"0161 835 9929",status:"not_contacted",notes:"Radisson Collection hotel in historic Free Trade Hall.",targetWeek:"Week 1"},{id:"dir-24",name:"Victoria Warehouse",venueName:"Victoria Warehouse",companyName:"Victoria Warehouse",contactName:"Special Events Team",boothStyle:"Roamer Booth & Brand Activation Sets",category:"Industrial Venue",area:"Trafford, Manchester",bestAngle:"Roamer Booth & Brand Activations",email:"specialevents@victoriawarehouse.com",phone:"0161 660 7000",status:"not_contacted",notes:"Massive industrial event spaces & brand experiences.",targetWeek:"Week 1"},{id:"dir-25",name:"The Lowry Hotel",venueName:"The Lowry Hotel",companyName:"The Lowry Hotel",contactName:"Events Team",boothStyle:"VIP Corporate & Awards Glam Mirror",category:"5-Star Hotel",area:"Salford / Manchester",bestAngle:"Corporate & Sports Awards",email:"events@thelowryhotel.com",phone:"0161 827 4000",status:"not_contacted",notes:"Premier hotel for celebrity, VIP, and corporate galas.",targetWeek:"Week 1"},{id:"dir-26",name:"The Monastery Manchester",venueName:"The Monastery Manchester",companyName:"The Monastery Manchester",contactName:"Events Team",boothStyle:"High-Capacity Gala Vintage Booth",category:"Historic Venue",area:"Manchester",bestAngle:"High-Capacity Corporate Galas",email:"events@themonastery.co.uk",phone:"0161 223 3211",status:"not_contacted",notes:"Spectacular Gothic architecture for grand banquets.",targetWeek:"Week 1"},{id:"dir-27",name:"Great Northern Warehouse",venueName:"Great Northern Warehouse",companyName:"Great Northern Warehouse",contactName:"Events Team",boothStyle:"Experiential Pop-Up & Selfie Pods",category:"Event Space",area:"Manchester City Centre",bestAngle:"Experiential Pop-Ups",email:"events@thegreatnorthern.com",phone:"0161 833 0155",status:"not_contacted",notes:"Pop-up retail & experiential events.",targetWeek:"Week 1"},{id:"dir-28",name:"Ducie Street Warehouse",venueName:"Ducie Street Warehouse",companyName:"Ducie Street Warehouse",contactName:"Events Team",boothStyle:"Influencer & Private Party Pods",category:"Modern Space",area:"Manchester City Centre",bestAngle:"Influencer & Private Parties",email:"events@duciestreet.com",phone:"0161 507 4999",status:"not_contacted",notes:"Trendy lounge, mini-cinema & event spaces.",targetWeek:"Week 1"},{id:"dir-29",name:"Hotel Gotham",venueName:"Hotel Gotham",companyName:"Hotel Gotham",contactName:"Events Team",boothStyle:"Art Deco / Vintage Glam Handcrafted Booth",category:"Luxury Boutique",area:"Manchester City Centre",bestAngle:"Art Deco / Vintage Glam Booth",email:"events@hotelgotham.co.uk",phone:"0161 694 4800",status:"not_contacted",notes:"Art Deco themed boutique hotel for high-end luxury soirées.",targetWeek:"Week 1"},{id:"dir-30",name:"Etihad Stadium",venueName:"Etihad Stadium",companyName:"Etihad Stadium",contactName:"Special Events Team",boothStyle:"Large-Scale Stadium Gala Pods",category:"Stadium Venue",area:"Manchester",bestAngle:"Large-Scale Corporate Galas",email:"specialevents@mancity.com",phone:"0161 444 1894",status:"not_contacted",notes:"Manchester City FC hospitality suites & awards.",targetWeek:"Week 1"},{id:"dir-31",name:"Old Trafford",venueName:"Old Trafford",companyName:"Old Trafford",contactName:"Events Team",boothStyle:"Conference & Roamer Pod Activations",category:"Stadium Venue",area:"Manchester",bestAngle:"Dinners & Roamer Activations",email:"events@manutd.co.uk",phone:"0161 868 8000",status:"not_contacted",notes:"Manchester United FC conference suites.",targetWeek:"Week 1"},{id:"dir-32",name:"The Midland Hotel",venueName:"The Midland Hotel",companyName:"The Midland Hotel",contactName:"Events Team",boothStyle:"Historic Banquet & Wedding Mirror",category:"Historic Hotel",area:"Manchester City Centre",bestAngle:"Banquets & Traditional Weddings",email:"events@themidlandmanchester.co.uk",phone:"0161 236 3333",status:"not_contacted",notes:"Historic Manchester hotel with grand ballroom.",targetWeek:"Week 1"},{id:"dir-33",name:"Albert Hall",venueName:"Albert Hall",companyName:"Albert Hall",contactName:"Events Team",boothStyle:"High-Energy Party & Glam Pods",category:"Music / Event Hall",area:"Manchester City Centre",bestAngle:"High-Energy Evening Celebrations",email:"info@alberthallmanchester.com",phone:"0161 817 3490",status:"not_contacted",notes:"Restored chapel event hall for high-energy parties.",targetWeek:"Week 1"},{id:"dir-34",name:"Whitworth Locke",venueName:"Whitworth Locke",companyName:"Whitworth Locke",contactName:"Events Team",boothStyle:"Boutique Pop-Up Pods & Social Sets",category:"Boutique Space",area:"Manchester City Centre",bestAngle:"Pop-Up Pods & Brand Gatherings",email:"whitworthevents@lockeliving.com",phone:"0161 823 8484",status:"not_contacted",notes:"Civic spaces and atrium for lifestyle brand events.",targetWeek:"Week 1"},{id:"dir-35",name:"Browsholme Hall & Barn",venueName:"Browsholme Hall & Barn",companyName:"Browsholme Hall & Barn",contactName:"Events Team",boothStyle:"Destination Country Wedding Vintage Booth",category:"Luxury Barn",area:"Ribble Valley, Lancashire",bestAngle:"Destination Country Weddings",email:"info@browsholme.com",phone:"01254 827160",status:"not_contacted",notes:"Historic hall and Tithe Barn in the Ribble Valley.",targetWeek:"Week 1"},{id:"dir-36",name:"Eaves Hall",venueName:"Eaves Hall",companyName:"Eaves Hall",contactName:"Events Team",boothStyle:"Exclusive Estate Luxury Glam Booth",category:"Historic Estate",area:"Ribble Valley, Lancashire",bestAngle:"High-End Country House Parties",email:"events@eaveshall.co.uk",phone:"01200 425244",status:"not_contacted",notes:"Exclusive use country house wedding venue.",targetWeek:"Week 1"},{id:"dir-37",name:"Julie Perry Events",venueName:"Julie Perry Events",companyName:"Julie Perry Events",contactName:"Julie & Events Team",boothStyle:"VIP Celebrity Handcrafted Booths & Glam Mirrors",category:"Luxury Planner",area:"Cheshire",bestAngle:"Celebrity & VIP High-Budget Events",email:"info@julieperryevents.com",phone:"0845 901 0215",status:"not_contacted",notes:"Top celebrity & Premier League footballer wedding planner.",targetWeek:"Week 2"},{id:"dir-38",name:"Kate Park Events",venueName:"Kate Park Events",companyName:"Kate Park Events",contactName:"Kate & Team",boothStyle:"Luxury Wedding & Milestone Celebration Booths",category:"Luxury Planner",area:"Cheshire",bestAngle:"Cheshire Weddings & Milestones",email:"info@kateparkevents.co.uk",phone:"0161 905 2052",status:"not_contacted",notes:"High-end luxury wedding and private celebration planner.",targetWeek:"Week 2"},{id:"dir-39",name:"Charlotte Elise Events",venueName:"Charlotte Elise Events",companyName:"Charlotte Elise Events",contactName:"Charlotte & Team",boothStyle:"Country Estate Handcrafted Vintage Booths",category:"Wedding Planner",area:"Cheshire",bestAngle:"Country Estate Weddings",email:"charlotte@charlotteelise.co.uk",phone:"07824 380494",status:"not_contacted",notes:"Specialist in luxury country house weddings across Cheshire & North West.",targetWeek:"Week 2"},{id:"dir-40",name:"Taylor & Co Events",venueName:"Taylor & Co Events",companyName:"Taylor & Co Events",contactName:"Production Team",boothStyle:"Staged Production & Custom Backdrop Sets",category:"Event Production",area:"Cheshire",bestAngle:"Staged Setups & Photo Backdrops",email:"info@taylorandco.events",phone:"01606 853245",status:"not_contacted",notes:"Full event production, floral staging & lighting.",targetWeek:"Week 2"},{id:"dir-41",name:"Out There Events",venueName:"Out There Events",companyName:"Out There Events",contactName:"Corporate Planning Team",boothStyle:"B2B Dinner & Conference Roamer Pods",category:"Corporate Planner",area:"Cheshire & Manchester",bestAngle:"B2B Dinners & Annual Conferences",email:"info@outthereevents.com",phone:"0161 941 4535",status:"not_contacted",notes:"Award-winning corporate event management.",targetWeek:"Week 2"},{id:"dir-42",name:"TLC Event Management",venueName:"TLC Event Management",companyName:"TLC Event Management",contactName:"Liz & Planning Team",boothStyle:"High-Profile Gala & Charity Ball Booths",category:"Luxury Planner",area:"Manchester",bestAngle:"High-Profile Corporate & Charity Galas",email:"enquiries@tlcevents.co.uk",phone:"0161 876 6412",status:"not_contacted",notes:"Led by Liz Taylor. High-budget charity balls and private galas.",targetWeek:"Week 2"},{id:"dir-43",name:"Qube Events & Productions",venueName:"Qube Events & Productions",companyName:"Qube Events & Productions",contactName:"Styling Team",boothStyle:"Complete Event Production & Styling Add-ons",category:"Styling & Decor",area:"Bury, Greater Manchester",bestAngle:"Complete Event Production Add-on",email:"info@qubeevents.co.uk",phone:"0845 615 6667",status:"not_contacted",notes:"Luxury event design, floral arches & styling.",targetWeek:"Week 2"},{id:"dir-44",name:"Balloons by Sarah",venueName:"Balloons by Sarah",companyName:"Balloons by Sarah",contactName:"Sarah & Team",boothStyle:"Joint Balloon Styling + Luxury Booth Sets",category:"Decorator",area:"Cheshire",bestAngle:"Joint Balloon + Booth Packages",email:"info@balloonsbysarah.co.uk",phone:"07540 274888",status:"not_contacted",notes:"Luxury balloon installations & backdrop styling.",targetWeek:"Week 2"},{id:"dir-45",name:"Six15 Events",venueName:"Six15 Events",companyName:"Six15 Events",contactName:"Bookings Team",boothStyle:"Sax/DJ & Luxury Photo Booth Combos",category:"Music Agency",area:"Manchester",bestAngle:"Sax/DJ & Photo Booth Packages",email:"info@six15.co.uk",phone:"0161 870 3977",status:"not_contacted",notes:"Leading live saxophone, DJ & entertainment agency.",targetWeek:"Week 2"},{id:"dir-46",name:"Andy Murphy DJ",venueName:"Andy Murphy DJ",companyName:"Andy Murphy DJ",contactName:"Andy Murphy",boothStyle:"Wedding Evening Entertainment & Booth Combos",category:"Host / DJ",area:"Cheshire",bestAngle:"Wedding Cross-Referrals",email:"info@andymurphydj.co.uk",phone:"07775 976380",status:"not_contacted",notes:"Award-winning Cheshire wedding DJ & host.",targetWeek:"Week 2"},{id:"dir-47",name:"DFC Events",venueName:"DFC Events",companyName:"DFC Events",contactName:"Entertainment Team",boothStyle:"DJ & Evening Entertainment Cross-Sell Pods",category:"Entertainment Agency",area:"North West / Lancashire",bestAngle:"DJ & Evening Entertainment Cross-Sell",email:"info@dfcevents.co.uk",phone:"01772 733337",status:"not_contacted",notes:"Leading regional wedding entertainment specialists.",targetWeek:"Week 2"},{id:"dir-48",name:"Carousel PR",venueName:"Carousel PR",companyName:"Carousel PR",contactName:"Campaigns Team",boothStyle:"Brand Launch & Lead Capture Roamer Pods",category:"PR Agency",area:"Manchester City Centre",bestAngle:"Brand Launches & Lead Capture",email:"hello@carouselpr.com",phone:"0161 236 0606",status:"not_contacted",notes:"Consumer PR & brand activations agency.",targetWeek:"Week 3"},{id:"dir-49",name:"Brazen PR",venueName:"Brazen PR",companyName:"Brazen PR",contactName:"Experiential Team",boothStyle:"Branded Wraps & Roamer Activations",category:"PR Agency",area:"Manchester City Centre",bestAngle:"Branded Wraps & Roamer Activations",email:"info@brazenpr.com",phone:"0161 923 4994",status:"not_contacted",notes:"Famous PR agency handling experiential campaigns.",targetWeek:"Week 3"},{id:"dir-50",name:"Tangerine Communications",venueName:"Tangerine Communications",companyName:"Tangerine Communications",contactName:"Comms & Activations Team",boothStyle:"Corporate Activation & Social Media Pods",category:"Creative Comms",area:"Manchester City Centre",bestAngle:"Corporate Activations & Social Media Pods",email:"info@tangerinepr.com",phone:"0161 817 6600",status:"not_contacted",notes:"Major Manchester communications agency for experiential brand events.",targetWeek:"Week 3"}],Ge="snapsuites_sales_leads_v1",Ue="snapsuites_sales_prospects_v1",Ke="snapsuites_sales_settings_v1",Ye="snapsuites_social_posts_v2",Je="snapsuites_target_directory_v1";function lt(){try{const e=localStorage.getItem(Je);if(!e)return localStorage.setItem(Je,JSON.stringify(he)),he;const n=JSON.parse(e);return Array.isArray(n)&&n.length?n:he}catch(e){return console.error("Error reading directory:",e),he}}function xe(e){try{localStorage.setItem(Je,JSON.stringify(e))}catch(n){console.error("Error saving directory:",n)}}function St(){try{const e=localStorage.getItem(Ye);return e?JSON.parse(e):(localStorage.setItem(Ye,JSON.stringify(Oe)),Oe)}catch(e){return console.error("Error reading stored social posts:",e),Oe}}function at(){try{const e=localStorage.getItem(Ge);return e?JSON.parse(e):(localStorage.setItem(Ge,JSON.stringify(Se)),Se)}catch(e){return console.error("Error reading stored leads:",e),Se}}function me(e){try{localStorage.setItem(Ge,JSON.stringify(e))}catch(n){console.error("Error saving leads to storage:",n)}}function dt(){try{const e=localStorage.getItem(Ue);return e?JSON.parse(e):(localStorage.setItem(Ue,JSON.stringify(Ce)),Ce)}catch(e){return console.error("Error reading prospects:",e),Ce}}function ze(e){try{localStorage.setItem(Ue,JSON.stringify(e))}catch(n){console.error("Error saving prospects:",n)}}function ct(){try{const e=localStorage.getItem(Ke);if(!e){const n={salesRepName:"Sales Representative",monthlyTarget:3e3,defaultCommissionRate:10,currencySymbol:"£"};return localStorage.setItem(Ke,JSON.stringify(n)),n}return JSON.parse(e)}catch{return{salesRepName:"Sales Representative",monthlyTarget:3e3,defaultCommissionRate:10,currencySymbol:"£"}}}function Et(e){try{localStorage.setItem(Ke,JSON.stringify(e))}catch(n){console.error("Error saving settings:",n)}}function Pt(){return localStorage.setItem(Ge,JSON.stringify(Se)),localStorage.setItem(Ue,JSON.stringify(Ce)),localStorage.setItem(Ye,JSON.stringify(Oe)),localStorage.setItem(Je,JSON.stringify(he)),{leads:Se,prospects:Ce,directory:he}}function Bt(e=[]){if(!e.length)return;const n=["Email","Venue_Name","Company_Name","Contact_Name","Booth_Style","Category","Area","Phone","Status","Target_Week","Notes"],a=e.map(u=>[`"${u.email||""}"`,`"${(u.venueName||u.name||"").replace(/"/g,'""')}"`,`"${(u.companyName||u.name||"").replace(/"/g,'""')}"`,`"${(u.contactName||"Events Team").replace(/"/g,'""')}"`,`"${(u.boothStyle||u.bestAngle||"Vintage Handcrafted Booth").replace(/"/g,'""')}"`,`"${(u.category||"").replace(/"/g,'""')}"`,`"${(u.area||"").replace(/"/g,'""')}"`,`"${u.phone||""}"`,`"${u.status||"not_contacted"}"`,`"${u.targetWeek||"Week 1"}"`,`"${(u.notes||"").replace(/"/g,'""')}"`]),r=[n.join(","),...a.map(u=>u.join(","))].join(`
`),i=new Blob([r],{type:"text/csv;charset=utf-8;"}),c=URL.createObjectURL(i),l=document.createElement("a");l.href=c,l.download=`snapsuites_mailmerge_targets_${new Date().toISOString().slice(0,10)}.csv`,l.click(),URL.revokeObjectURL(c)}function Nt(){const e=at();if(!e.length)return;const n=["Client Name","Event Type","Event Date","Venue","Deal Value (£)","Stage","Source","Email","Phone"],a=e.map(u=>[`"${u.clientName}"`,`"${u.eventType}"`,`"${u.eventDate}"`,`"${u.venue}"`,u.dealValue,`"${u.stage}"`,`"${u.source}"`,`"${u.contactEmail}"`,`"${u.contactPhone}"`]),r=[n.join(","),...a.map(u=>u.join(","))].join(`
`),i=new Blob([r],{type:"text/csv;charset=utf-8;"}),c=URL.createObjectURL(i),l=document.createElement("a");l.href=c,l.download=`snapsuites_leads_${new Date().toISOString().slice(0,10)}.csv`,l.click(),URL.revokeObjectURL(c)}function Tt(){const e=at(),n=dt(),a=ct(),r=lt(),i={appName:"SnapSuites Sales Dashboard",exportedAt:new Date().toISOString(),leads:e,prospects:n,settings:a,directory:r},c=JSON.stringify(i,null,2),l=new Blob([c],{type:"application/json"}),u=URL.createObjectURL(l),T=document.createElement("a");T.href=u,T.download=`snapsuites_sales_backup_${new Date().toISOString().slice(0,10)}.json`,T.click(),URL.revokeObjectURL(u)}function F(e){return new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP",maximumFractionDigits:0}).format(e||0)}function $t(e){if(!e)return"TBD";try{const n=new Date(e);return isNaN(n.getTime())?e:n.toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short",year:"numeric"})}catch{return e}}function pt(e,n){const a=e.length,r=e.filter(k=>k.stage!=="lost"&&k.stage!=="completed"),i=r.reduce((k,_)=>k+(Number(_.dealValue)||0),0),c=e.filter(k=>k.stage==="secured"||k.stage==="completed"),l=c.reduce((k,_)=>k+(Number(_.dealValue)||0),0),u=e.filter(k=>k.stage==="secured"||k.stage==="completed"||k.stage==="lost").length,T=u>0?Math.round(c.length/u*100):Math.round(c.length/(a||1)*100),R=c.reduce((k,_)=>{const oe=Number(_.commissionRate)||n.defaultCommissionRate||10;return k+Number(_.dealValue)*(oe/100)},0),m=e.filter(k=>k.stage==="quote_sent"||k.stage==="negotiation").reduce((k,_)=>{const oe=Number(_.commissionRate)||n.defaultCommissionRate||10;return k+Number(_.dealValue)*(oe/100)},0);return{totalLeads:a,activeLeadsCount:r.length,pipelineValue:i,securedValue:l,conversionRate:T,totalCommissionEarned:R,pendingCommission:m}}function Lt(e,n,a){const r=pt(e,n),i=Math.min(Math.round(r.securedValue/(n.monthlyTarget||3e3)*100),100);return`
    <header class="top-header">
      <div class="brand-section">
        <div class="brand-logo-container">
          <span class="brand-logo-icon">📸</span>
        </div>
        <div class="brand-text">
          <h1>SnapSuites Sales Hub</h1>
          <div class="brand-subtitle">
            <span>Luxury Photobooth Hire • North West & Yorkshire</span>
            <span class="brand-badge">Sales Rep Portal</span>
          </div>
        </div>
      </div>

      <div class="header-actions">
        <button class="btn btn-gold" id="btn-quick-new-lead">
          <i>➕</i> New Lead
        </button>
        <button class="btn btn-burgundy" id="btn-quick-quote">
          <i>🧮</i> Instant Quote
        </button>
        <button class="btn btn-glass btn-icon" id="btn-settings-trigger" title="Settings">
          ⚙️
        </button>
        <button class="btn btn-glass btn-icon" id="btn-export-trigger" title="Export Backup JSON/CSV">
          📥
        </button>
      </div>
    </header>

    <!-- Metrics Cards Row -->
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-header">
          <span class="metric-title">Pipeline Value</span>
          <span class="metric-icon">💼</span>
        </div>
        <div class="metric-value">${F(r.pipelineValue)}</div>
        <div class="metric-subtext">
          <span>${r.activeLeadsCount} active opportunities</span>
        </div>
      </div>

      <div class="metric-card" style="border-left-color: var(--accent-success);">
        <div class="metric-header">
          <span class="metric-title">Secured Sales</span>
          <span class="metric-icon">🎉</span>
        </div>
        <div class="metric-value" style="color: var(--accent-success);">${F(r.securedValue)}</div>
        <div class="metric-subtext">
          <span class="metric-trend-positive">Conversion Rate: ${r.conversionRate}%</span>
        </div>
      </div>

      <div class="metric-card" style="border-left-color: var(--gold-primary);">
        <div class="metric-header">
          <span class="metric-title">Earned Commission</span>
          <span class="metric-icon">💰</span>
        </div>
        <div class="metric-value" style="color: var(--gold-light);">${F(r.totalCommissionEarned)}</div>
        <div class="metric-subtext">
          <span>+ ${F(r.pendingCommission)} pending quote closure</span>
        </div>
      </div>

      <div class="metric-card" style="border-left-color: var(--accent-info);">
        <div class="metric-header">
          <span class="metric-title">Sales Target Progress</span>
          <span class="metric-icon">🎯</span>
        </div>
        <div class="metric-value">${i}%</div>
        <div class="target-progress-container">
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${i}%;"></div>
          </div>
          <div style="font-size: 11px; color: var(--text-muted); display: flex; justify-content: space-between; margin-top: 4px;">
            <span>Target: ${F(n.monthlyTarget||3e3)}</span>
            <span>${F(r.securedValue)} won</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <nav class="tab-nav">
      <button class="tab-btn ${a==="pipeline"?"active":""}" data-tab="pipeline">
        📊 CRM Lead Pipeline
      </button>
      <button class="tab-btn ${a==="prospecting"?"active":""}" data-tab="prospecting">
        🎯 Prospecting Radar
      </button>
      <button class="tab-btn ${a==="directory"?"active":""}" data-tab="directory">
        🏢 Target Directory (50 Venues)
      </button>
      <button class="tab-btn ${a==="guide"?"active":""}" data-tab="guide">
        🚀 Beginner Sales Guide
      </button>
      <button class="tab-btn ${a==="quote"?"active":""}" data-tab="quote">
        🧮 Instant Quote Builder
      </button>
      <button class="tab-btn ${a==="playbook"?"active":""}" data-tab="playbook">
        💬 Bark & Outreach Playbook
      </button>
      <button class="tab-btn ${a==="calendar"?"active":""}" data-tab="calendar">
        📅 Event Schedule
      </button>
      <button class="tab-btn ${a==="analytics"?"active":""}" data-tab="analytics">
        📈 Commission Analytics
      </button>
    </nav>
  `}function Mt(e,n="",a="all",r="all"){const i=e.filter(c=>{const l=!n||c.clientName.toLowerCase().includes(n.toLowerCase())||c.venue.toLowerCase().includes(n.toLowerCase())||c.eventType.toLowerCase().includes(n.toLowerCase()),u=a==="all"||c.stage===a,T=r==="all"||c.source===r;return l&&u&&T});return`
    <div class="pipeline-container">
      <div class="kanban-controls">
        <div class="search-filter-group">
          <input 
            type="text" 
            class="input-search" 
            id="pipeline-search-input" 
            placeholder="🔍 Search client name, venue, event type..." 
            value="${n}"
          />
          <select class="select-filter" id="pipeline-stage-filter">
            <option value="all" ${a==="all"?"selected":""}>All Stages</option>
            ${Pe.map(c=>`<option value="${c.id}" ${a===c.id?"selected":""}>${c.icon} ${c.name}</option>`).join("")}
          </select>
          <select class="select-filter" id="pipeline-source-filter">
            <option value="all" ${r==="all"?"selected":""}>All Lead Sources</option>
            <option value="Bark" ${r==="Bark"?"selected":""}>Bark</option>
            <option value="Bridebook" ${r==="Bridebook"?"selected":""}>Bridebook</option>
            <option value="Instagram DM" ${r==="Instagram DM"?"selected":""}>Instagram DM</option>
            <option value="Direct Website" ${r==="Direct Website"?"selected":""}>Direct Website</option>
            <option value="Referral" ${r==="Referral"?"selected":""}>Referral</option>
          </select>
        </div>
        <div>
          <button class="btn btn-gold btn-sm" id="btn-add-lead-kanban">
            ➕ Add New Lead
          </button>
        </div>
      </div>

      <div class="kanban-board">
        ${Pe.map(c=>{const l=i.filter(T=>T.stage===c.id),u=l.reduce((T,R)=>T+(Number(R.dealValue)||0),0);return`
            <div class="kanban-column" data-stage-id="${c.id}">
              <div class="column-header">
                <div class="column-title" style="color: ${c.color};">
                  <span>${c.icon}</span>
                  <span>${c.name}</span>
                </div>
                <div class="column-count">${l.length} (${F(u)})</div>
              </div>

              <div class="kanban-cards-wrapper">
                ${l.length===0?`
                  <div style="font-size: 12px; color: var(--text-dim); text-align: center; padding: 24px 0; border: 1px dashed rgba(255,255,255,0.06); border-radius: 8px;">
                    No leads in this stage
                  </div>
                `:l.map(T=>It(T)).join("")}
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `}function It(e){const n=J.find(a=>a.id===e.packageId)||{name:"Custom Package"};return`
    <div class="lead-card" data-lead-id="${e.id}">
      <div class="lead-card-header">
        <div>
          <div class="client-name">${e.clientName}</div>
          <span class="event-type-tag">${e.eventType}</span>
        </div>
        <div class="lead-deal-value">${F(e.dealValue)}</div>
      </div>

      <div class="lead-details">
        <div class="detail-item">
          <span>📅</span> <span>${$t(e.eventDate)}</span>
        </div>
        <div class="detail-item">
          <span>📍</span> <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 180px;">${e.venue}</span>
        </div>
        <div class="detail-item">
          <span>📸</span> <span>${n.name}</span>
        </div>
        ${e.recommendedTiming?`
          <div class="detail-item" style="color: var(--gold-light); font-size: 11px;">
            <span>⏰</span> Sweet spot: ${e.recommendedTiming}
          </div>
        `:""}
      </div>

      <div class="lead-card-footer">
        <span class="lead-source">${e.source||"Bark"}</span>
        <div style="display: flex; gap: 4px;">
          <button class="btn btn-glass btn-sm btn-lead-quote" data-lead-id="${e.id}" title="Generate/View Quote">
            🧮 Quote
          </button>          <button class="btn btn-glass btn-sm btn-edit-lead" data-lead-id="${e.id}" title="Edit details">
            ✏️
          </button>
        </div>
      </div>

      <!-- Quick Stage Switcher Dropdown -->
      <div style="margin-top: 6px;">
        <select class="stage-select-sm stage-change-trigger" data-lead-id="${e.id}">
          ${Pe.map(a=>`<option value="${a.id}" ${a.id===e.stage?"selected":""}>Move to: ${a.icon} ${a.name}</option>`).join("")}
        </select>
      </div>
    </div>
  `}function Wt(e,n="",a="all"){const r=e.filter(i=>{const c=!n||i.name.toLowerCase().includes(n.toLowerCase())||i.contactPerson.toLowerCase().includes(n.toLowerCase())||i.location.toLowerCase().includes(n.toLowerCase())||i.category.toLowerCase().includes(n.toLowerCase()),l=a==="all"||i.status===a;return c&&l});return`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <!-- Header Banner -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div>
          <h2 style="font-size: 22px; font-weight: 700; color: #FFF; margin-bottom: 4px;">🎯 Potential Customers & Outreach Radar</h2>
          <p style="font-size: 13px; color: var(--text-muted);">Track potential venues, event coordinators, Bark prospects, and whether you've contacted them yet.</p>
        </div>
        <button class="btn btn-gold" id="btn-add-prospect">
          ➕ Add Potential Customer / Venue
        </button>
      </div>

      <!-- Controls & Search -->
      <div class="kanban-controls">
        <div class="search-filter-group">
          <input 
            type="text" 
            class="input-search" 
            id="prospect-search-input" 
            placeholder="🔍 Search prospect name, venue, contact person, location..." 
            value="${n}"
          />
          <select class="select-filter" id="prospect-status-filter">
            <option value="all" ${a==="all"?"selected":""}>All Outreach Statuses</option>
            ${we.map(i=>`<option value="${i.id}" ${a===i.id?"selected":""}>${i.icon} ${i.name}</option>`).join("")}
          </select>
        </div>
      </div>

      <!-- Prospects Data Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px;">
        ${r.length===0?`
          <div style="grid-column: 1 / -1; background: var(--bg-card); border: 1px dashed var(--border-light); padding: 40px; text-align: center; border-radius: 16px; color: var(--text-muted);">
            No potential customers found matching filter. Click "Add Potential Customer" to add one!
          </div>
        `:r.map(i=>At(i)).join("")}
      </div>
    </div>
  `}function At(e){const n=we.find(a=>a.id===e.status)||we[0];return J.find(a=>a.id===e.targetPackage)||J[1],`
    <div class="lead-card" style="border-left: 4px solid ${n.color};">
      <div class="lead-card-header">
        <div>
          <div class="client-name">${e.name}</div>
          <span class="event-type-tag" style="background: rgba(255,255,255,0.06); color: var(--text-main);">${e.category}</span>
        </div>
        <span class="badge" style="background: ${n.color}22; color: ${n.color}; border: 1px solid ${n.color}55;">
          ${n.icon} ${n.name}
        </span>
      </div>

      <div class="lead-details">
        <div class="detail-item">
          <span>👤 Contact:</span> <strong style="color: #FFF;">${e.contactPerson}</strong>
        </div>
        <div class="detail-item">
          <span>📍 Location:</span> <span>${e.location}</span>
        </div>
        <div class="detail-item">
          <span>📱 Preferred:</span> <span class="badge" style="background: rgba(212,175,55,0.1); color: var(--gold-light); font-size: 11px;">${e.preferredChannel||"Email"}</span>
        </div>
        ${e.contactEmail?`
          <div class="detail-item">
            <span>✉️ Email:</span> <a href="mailto:${e.contactEmail}" style="color: var(--gold-primary);">${e.contactEmail}</a>
          </div>
        `:""}
        ${e.contactPhone?`
          <div class="detail-item">
            <span>📞 Phone:</span> <span>${e.contactPhone}</span>
          </div>
        `:""}
        <div class="detail-item" style="color: var(--text-dim); font-size: 11px;">
          <span>📝 Notes:</span> ${e.notes||"No notes added"}
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="lead-card-footer">
        <select class="stage-select-sm prospect-status-change" data-prospect-id="${e.id}">
          ${we.map(a=>`<option value="${a.id}" ${a.id===e.status?"selected":""}>Status: ${a.icon} ${a.name}</option>`).join("")}
        </select>
        
        <div style="display: flex; gap: 6px;">
          <button class="btn btn-gold btn-sm btn-convert-prospect" data-prospect-id="${e.id}" title="Convert into active CRM Lead & Quote">
            ⚡ Convert to Lead
          </button>
          <button class="btn btn-glass btn-sm btn-edit-prospect" data-prospect-id="${e.id}">
            ✏️
          </button>
        </div>
      </div>
    </div>
  `}function Dt(){return`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <!-- Hero Header -->
      <div style="background: linear-gradient(135deg, var(--bg-card-solid), rgba(128,0,32,0.4)); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: 32px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span class="badge" style="background: var(--gold-primary); color: #000; font-weight: 800; font-size: 11px; margin-bottom: 12px;">BEGINNER'S SALES MASTERCLASS</span>
          <h2 style="font-size: 28px; font-weight: 800; color: #FFF; margin-bottom: 8px;">How to Get Started & Close Photobooth Jobs Like a Pro</h2>
          <p style="font-size: 14px; color: var(--text-muted); max-width: 700px; line-height: 1.6;">
            Never done sales before? No problem! This step-by-step playbook breaks down exactly where to find high-paying clients, what to say, how to follow up, and how to turn simple conversations into secured £250–£350 bookings.
          </p>
        </div>
        <div style="font-size: 64px;">🚀</div>
      </div>

      <!-- Step 1: Lead Generation Channels -->
      <div class="playbook-card">
        <h3 style="font-size: 20px; font-weight: 700; color: var(--gold-light); display: flex; align-items: center; gap: 10px;">
          <span>📍 Step 1: Where to Find Potential Customers Today</span>
        </h3>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-top: 8px;">
          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-light); padding: 18px; border-radius: 12px;">
            <div style="font-size: 16px; font-weight: 700; color: #FFF; margin-bottom: 6px;">1. Bark.com & AddToEvent Alerts</div>
            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
              Set up instant email alerts for <strong>Photobooth Hire in Manchester, Cheshire, Leeds, Harrogate, and Liverpool</strong>. Reply within 15 minutes using our 1-click Quote Generator — fast replies close 70% of Bark jobs!
            </p>
          </div>

          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-light); padding: 18px; border-radius: 12px;">
            <div style="font-size: 16px; font-weight: 700; color: #FFF; margin-bottom: 6px;">2. Instagram Hashtags & Venue Search</div>
            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
              Search Instagram for <code>#CheshireWedding</code>, <code>#ManchesterPartyPlanner</code>, <code>#LeedsEvents</code>. Send a friendly DM to brides-to-be or 30th birthday hosts showing photos of the SnapSuites mahogany booth!
            </p>
          </div>

          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-light); padding: 18px; border-radius: 12px;">
            <div style="font-size: 16px; font-weight: 700; color: #FFF; margin-bottom: 6px;">3. Local Venue Partnerships</div>
            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
              Reach out to wedding coordinators at country estates & luxury hotels (e.g. Peckforton Castle, Grantley Hall). Offer them exclusive £25 upgrades for their clients if they put SnapSuites on their supplier list.
            </p>
          </div>
        </div>
      </div>

      <!-- Step 2: The 4 Magic Selling Points -->
      <div class="playbook-card">
        <h3 style="font-size: 20px; font-weight: 700; color: var(--gold-light); display: flex; align-items: center; gap: 10px;">
          <span>✨ Step 2: The 4 Magic Selling Points of SnapSuites</span>
        </h3>
        <p style="font-size: 13px; color: var(--text-muted);">Whenever talking to a client, highlight these 4 features to make SnapSuites stand out from cheap competition:</p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-top: 8px;">
          <div style="background: rgba(212,175,55,0.06); border: 1px solid var(--border-glass); padding: 16px; border-radius: 12px;">
            <div style="font-size: 15px; font-weight: 700; color: var(--gold-primary);">1. Statement Furniture</div>
            <div style="font-size: 12px; color: var(--text-main); margin-top: 4px;">Styled in mahogany & gold brass trim that enhances luxury decor instead of a plastic tripod.</div>
          </div>

          <div style="background: rgba(128,0,32,0.15); border: 1px solid rgba(128,0,32,0.3); padding: 16px; border-radius: 12px;">
            <div style="font-size: 15px; font-weight: 700; color: #FFA0B4;">2. Interactive Rear Screen</div>
            <div style="font-size: 12px; color: var(--text-main); margin-top: 4px;">Displays a live custom slideshow of birthday host / couple photos continuously throughout the night.</div>
          </div>

          <div style="background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.2); padding: 16px; border-radius: 12px;">
            <div style="font-size: 15px; font-weight: 700; color: #93C5FD;">3. 7pm–10pm Sweet Spot</div>
            <div style="font-size: 12px; color: var(--text-main); margin-top: 4px;">Give expert advice! Suggest 7pm–10pm as the sweet spot when guests settle in & celebrations peak.</div>
          </div>

          <div style="background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.2); padding: 16px; border-radius: 12px;">
            <div style="font-size: 15px; font-weight: 700; color: #6EE7B7;">4. Instant Thermal Prints</div>
            <div style="font-size: 12px; color: var(--text-main); margin-top: 4px;">Up to 6 high-definition prints per turn + instant digital QR sharing to guest smartphones.</div>
          </div>
        </div>
      </div>

      <!-- Step 3: The 4-Phase Sales Workflow -->
      <div class="playbook-card">
        <h3 style="font-size: 20px; font-weight: 700; color: var(--gold-light); display: flex; align-items: center; gap: 10px;">
          <span>🔄 Step 3: The 4-Phase Sales Workflow (First Contact to Deposit)</span>
        </h3>

        <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 8px;">
          <div style="background: var(--bg-card-solid); border: 1px solid var(--border-light); padding: 16px; border-radius: 12px; display: flex; gap: 16px; align-items: flex-start;">
            <div style="background: var(--gold-primary); color: #000; font-weight: 800; padding: 8px 14px; border-radius: 8px; font-size: 16px;">1</div>
            <div>
              <div style="font-weight: 700; font-size: 15px; color: #FFF;">Phase 1: Send the Tailored Quote (Within 1 Hour)</div>
              <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
                Use the <strong>Quote Builder</strong> tab to create a personalized proposal. Mention their name, event date, and recommend the 7pm–10pm hire window. Copy the generated Bark/Email text and send it immediately!
              </div>
            </div>
          </div>

          <div style="background: var(--bg-card-solid); border: 1px solid var(--border-light); padding: 16px; border-radius: 12px; display: flex; gap: 16px; align-items: flex-start;">
            <div style="background: #8B5CF6; color: #FFF; font-weight: 800; padding: 8px 14px; border-radius: 8px; font-size: 16px;">2</div>
            <div>
              <div style="font-weight: 700; font-size: 15px; color: #FFF;">Phase 2: Friendly Follow-Up (Day 2)</div>
              <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
                If they haven't replied in 48 hours, send a short non-pushy message: <em>"Hi Sarah, just following up on your June 19th birthday photobooth quote! Would you like to see examples of our custom rear-screen slideshow setup?"</em>
              </div>
            </div>
          </div>

          <div style="background: var(--bg-card-solid); border: 1px solid var(--border-light); padding: 16px; border-radius: 12px; display: flex; gap: 16px; align-items: flex-start;">
            <div style="background: #F59E0B; color: #000; font-weight: 800; padding: 8px 14px; border-radius: 8px; font-size: 16px;">3</div>
            <div>
              <div style="font-weight: 700; font-size: 15px; color: #FFF;">Phase 3: Add a Sweetener to Close (Day 4)</div>
              <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
                If they are hesitant on price, offer a free add-on bonus: <em>"If you'd like to get your date secured this week, I'd be happy to throw in our Memory Guestbook & Metallic Pens (£40 value) for free!"</em>
              </div>
            </div>
          </div>

          <div style="background: var(--bg-card-solid); border: 1px solid var(--border-light); padding: 16px; border-radius: 12px; display: flex; gap: 16px; align-items: flex-start;">
            <div style="background: var(--accent-success); color: #000; font-weight: 800; padding: 8px 14px; border-radius: 8px; font-size: 16px;">4</div>
            <div>
              <div style="font-weight: 700; font-size: 15px; color: #FFF;">Phase 4: Collect £100 Deposit & Celebrate!</div>
              <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
                Send bank transfer / invoice details for the £100 date-hold deposit. Once paid, switch the lead stage in the CRM to <strong>"Deposit Paid (Won)"</strong> to earn your commission!
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 4: Daily Checklist -->
      <div class="playbook-card" style="background: linear-gradient(135deg, var(--bg-card-solid), rgba(212,175,55,0.1)); border-color: var(--border-glass);">
        <h3 style="font-size: 18px; font-weight: 700; color: var(--gold-primary);">✅ Your Daily 10-Minute Sales Routine</h3>
        <ul class="talking-points-list" style="font-size: 14px; line-height: 1.8; margin-top: 8px;">
          <li><strong style="color: #FFF;">Check Bark & Instagram Notifications</strong> (Reply to new enquiries immediately).</li>
          <li><strong style="color: #FFF;">Check CRM Pipeline for Follow-ups Due</strong> (Send Day 2 or Day 4 follow-up messages).</li>
          <li><strong style="color: #FFF;">Add 2 New Potential Venues / Planners</strong> to your <strong>Prospecting Radar</strong>.</li>
          <li><strong style="color: #FFF;">Log Contact Activity</strong> & celebrate your commission growth!</li>
        </ul>
      </div>
    </div>
  `}function Rt(e,n=[]){const a=J.find(l=>l.id===e.packageId)||J[1];let r=a.price;const i=(e.selectedAddons||[]).map(l=>Ee.find(u=>u.id===l)).filter(Boolean);i.forEach(l=>{r+=l.price});const c=ut(e,a,i,r);return`
    <div class="quote-builder-grid">
      <!-- Left Panel: Calculator Inputs -->
      <div class="calculator-panel">
        <h2 class="panel-title">🧮 Interactive Quote & Package Builder</h2>

        <!-- Event & Client Details -->
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Client Name</label>
            <input type="text" id="quote-client-name" class="form-control" value="${e.clientName||"Chris"}" placeholder="e.g. Chris" />
          </div>
          <div class="form-group">
            <label class="form-label">Event Type</label>
            <input type="text" id="quote-event-type" class="form-control" value="${e.eventType||"Birthday Celebration"}" placeholder="e.g. Birthday Celebration" />
          </div>
          <div class="form-group">
            <label class="form-label">Event Date</label>
            <input type="date" id="quote-event-date" class="form-control" value="${e.eventDate||"2027-06-19"}" />
          </div>
          <div class="form-group">
            <label class="form-label">Recommended Hire Times</label>
            <input type="text" id="quote-recommended-timing" class="form-control" value="${e.recommendedTiming||"7pm–10pm"}" placeholder="e.g. 7pm–10pm" />
          </div>
        </div>

        <!-- Package Selection Cards -->
        <div class="form-group">
          <label class="form-label">Select Photobooth Package</label>
          <div class="packages-selection-grid">
            ${J.map(l=>`
              <div class="package-card ${l.id===a.id?"selected":""}" data-package-id="${l.id}">
                ${l.badge?`<span class="package-badge">${l.badge}</span>`:""}
                <div class="package-name">${l.name}</div>
                <div class="package-price">${F(l.price)}</div>
                <div style="font-size: 12px; color: var(--text-muted);">${l.description}</div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Backdrop Selection -->
        <div class="form-group">
          <label class="form-label">Curtain Backdrop Choice</label>
          <div style="display: flex; gap: 12px;">
            ${st.map(l=>`
              <label style="flex: 1; background: var(--bg-card-solid); border: 1px solid ${(e.backdrop||"burgundy")===l.id?"var(--gold-primary)":"var(--border-light)"}; padding: 10px 14px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                <input type="radio" name="backdrop-choice" value="${l.id}" ${(e.backdrop||"burgundy")===l.id?"checked":""} style="accent-color: var(--gold-primary);" />
                <div>
                  <div style="font-weight: 600; font-size: 13px; color: #FFF;">${l.name}</div>
                  <div style="font-size: 11px; color: var(--text-muted);">${l.description}</div>
                </div>
              </label>
            `).join("")}
          </div>
        </div>

        <!-- Optional Add-ons Checkboxes -->
        <div class="addons-section">
          <label class="form-label">Custom Upgrades & Add-ons</label>
          ${Ee.map(l=>{const u=(e.selectedAddons||[]).includes(l.id);return`
              <div class="addon-row" data-addon-id="${l.id}">
                <div class="addon-info">
                  <input type="checkbox" class="addon-checkbox" ${u?"checked":""} data-addon-id="${l.id}" />
                  <div>
                    <div class="addon-title">${l.name}</div>
                    <div class="addon-desc">${l.description}</div>
                  </div>
                </div>
                <div class="addon-price">+${F(l.price)}</div>
              </div>
            `}).join("")}
        </div>
      </div>

      <!-- Right Panel: Summary & Live Text Generator -->
      <div class="quote-summary-panel">
        <h2 class="panel-title">📋 Live Quote Breakdown & Sales Copy</h2>

        <div style="background: rgba(212, 175, 55, 0.08); border: 1px solid var(--border-glass); padding: 18px; border-radius: var(--radius-lg); display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 12px; color: var(--text-muted); text-transform: uppercase;">Total Calculated Deal</div>
            <div style="font-size: 32px; font-weight: 800; color: var(--gold-primary); font-family: 'Outfit', sans-serif;">
              ${F(r)}
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 12px; color: var(--text-muted);">Est. Commission (10%)</div>
            <div style="font-size: 18px; font-weight: 700; color: var(--accent-success);">
              ${F(r*.1)}
            </div>
          </div>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <label class="form-label" style="margin: 0;">Bark / Email Proposal Text</label>
            <button class="btn btn-gold btn-sm" id="btn-copy-quote-text">
              📋 Copy Proposal Text
            </button>
          </div>
          <div class="proposal-text-box" id="proposal-text-preview">${c}</div>
        </div>

        <div style="display: flex; gap: 12px; margin-top: auto;">
          <button class="btn btn-burgundy" style="flex: 1;" id="btn-open-printable-proposal">
            🖼️ View Client PDF / HTML Proposal
          </button>
          <button class="btn btn-glass" style="flex: 1;" id="btn-save-quote-to-pipeline">
            💾 Save as Active Lead
          </button>
        </div>
      </div>
    </div>
  `}function ut(e,n,a,r){const i=e.clientName||"Chris",c=e.eventType||"birthday celebration",l=e.eventDate?new Date(e.eventDate):new Date("2027-06-19"),u=isNaN(l.getTime())?"Saturday 19th June 2027":l.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"}),T=e.recommendedTiming||"7pm–10pm";e.backdrop;let R="";return a.length>0&&(R=`

Selected Tailored Add-ons:
`+a.map(m=>`• ${m.name} (+£${m.price})`).join(`
`)),`Hi ${i},

Thanks for getting in touch through Bark regarding your ${c} on ${u}.

Our interactive vintage photobooth is a stylish, statement booth designed to be part of the evening rather than just a photo-taking station. It features a large screen on the back, which can be personalised to display photos or videos of the guest of honour throughout the event.

Guests can enjoy unlimited visits to the booth, with luxury props and a choice of burgundy or ivory curtain backdrop to suit the style of your celebration.

For your evening, we’d recommend ${T} as the sweet spot — giving everyone time to arrive and settle in, while capturing the fun, lively atmosphere once the celebrations are in full swing.

We have two main packages available:

2-Hour Digital Package – £250
• 2 hours of photobooth hire
• Unlimited visits to the booth
• Instant sharing via email, SMS or QR code
• Luxury props
• Choice of burgundy or ivory curtain backdrop

3-Hour Birthday Package – £350
• 3 hours of photobooth hire
• Unlimited visits to the booth
• Up to 6 prints per visit
• Instant digital sharing
• Luxury props
• Choice of burgundy or ivory curtain backdrop${R}

Total Quote for your selected option (${n.name}): £${r}

If you have any questions or would like to go ahead, just let me know and we’d be happy to get your date secured.

Best wishes,
Luca
SnapSuites Luxury Photobooth Hire
www.snapsuites.co.uk | bookings@snapsuites.co.uk`}function Ht(e="all"){return`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <!-- Header Banner -->
      <div style="background: linear-gradient(135deg, var(--bg-card-solid), rgba(128,0,32,0.3)); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: 24px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h2 style="font-size: 22px; font-weight: 700; color: #FFF; margin-bottom: 4px;">💬 Bark & Venue Sales Playbook</h2>
          <p style="font-size: 13px; color: var(--text-muted);">High-converting response scripts, venue cold outreach templates, competitor benchmarks, and objection handling.</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-glass btn-sm playbook-filter-btn ${e==="all"?"active":""}" data-category="all">
            All Guides
          </button>
          <button class="btn btn-glass btn-sm playbook-filter-btn ${e==="Bark Lead Reply"?"active":""}" data-category="Bark Lead Reply">
            Bark Replies
          </button>
          <button class="btn btn-glass btn-sm playbook-filter-btn ${e==="Venue Outreach"?"active":""}" data-category="Venue Outreach">
            Venue Outreach
          </button>
        </div>
      </div>

      <!-- Competitor Value Benchmark Matrix -->
      <div class="playbook-card" style="border-color: var(--border-glass);">
        <h3 style="font-size: 18px; font-weight: 700; color: var(--gold-primary);">⚔️ Competitor Comparison Matrix (Why SnapSuites Wins)</h3>
        <p style="font-size: 13px; color: var(--text-muted);">Use these points when clients ask why SnapSuites costs £250–£350 compared to cheap £150 selfie pods:</p>

        <div style="overflow-x: auto; margin-top: 12px;">
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-light); color: var(--gold-light); font-size: 12px; text-transform: uppercase;">
                <th style="padding: 10px;">Feature / Value</th>
                <th style="padding: 10px; color: var(--gold-primary);">📸 SnapSuites Vintage Booth</th>
                <th style="padding: 10px; color: #94A3B8;">📱 Cheap Selfie Pod (£150)</th>
                <th style="padding: 10px; color: #94A3B8;">🪞 Magic Mirror (£350)</th>
              </tr>
            </thead>
            <tbody>
              ${Ct.map(n=>`
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.04);">
                  <td style="padding: 12px 10px; font-weight: 700; color: #FFF;">${n.feature}</td>
                  <td style="padding: 12px 10px; color: var(--gold-primary); font-weight: 700; background: rgba(212,175,55,0.05);">${n.snapsuites}</td>
                  <td style="padding: 12px 10px; color: var(--text-muted);">${n.cheapPod}</td>
                  <td style="padding: 12px 10px; color: var(--text-muted);">${n.magicMirror}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
        <!-- Column 1: Fast Outreach & Response Templates -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <h3 style="font-size: 18px; font-weight: 700; color: var(--gold-light);">📤 Outreach & Response Scripts</h3>
          
          ${it.filter(n=>e==="all"||n.category===e).map(n=>`
            <div class="playbook-card">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="badge" style="background: rgba(212, 175, 55, 0.15); color: var(--gold-primary);">${n.category}</span>
                <button class="btn btn-gold btn-sm btn-copy-template" data-template-id="${n.id}">
                  📋 Copy Script
                </button>
              </div>
              <h4 style="font-size: 16px; color: #FFF; font-weight: 700;">${n.title}</h4>
              <div style="font-size: 12px; color: var(--gold-light); font-family: monospace;">Subject: ${n.subject}</div>
              <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--border-light); padding: 14px; border-radius: 8px; font-size: 12px; color: var(--text-muted); white-space: pre-wrap; max-height: 200px; overflow-y: auto;">${n.body}</div>
            </div>
          `).join("")}
        </div>

        <!-- Column 2: Objection Handling Cheatsheet -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <h3 style="font-size: 18px; font-weight: 700; color: var(--gold-light);">🛡️ Sales Objection Handling Cheatsheet</h3>
          
          <div class="playbook-card">
            <p style="font-size: 13px; color: var(--text-muted);">Key answers when potential clients ask about pricing comparisons, photobooth timing, or features:</p>
            
            ${wt.map(n=>`
              <div class="objection-box">
                <div class="objection-title">${n.objection}</div>
                <ul class="talking-points-list">
                  ${n.talkingPoints.map(a=>`<li>${Ft(a)}</li>`).join("")}
                </ul>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
  `}function Ft(e){return e.replace(/\*\*(.*?)\*\*/g,'<strong style="color: #FFF;">$1</strong>')}function Vt(e){return`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: 24px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h2 style="font-size: 22px; font-weight: 700; color: #FFF; margin-bottom: 4px;">📅 Event Schedule & Date Hold Calendar</h2>
          <p style="font-size: 13px; color: var(--text-muted);">Overview of confirmed bookings, date holds, and upcoming quote dates to avoid scheduling conflicts.</p>
        </div>
        <div>
          <button class="btn btn-gold btn-sm" id="btn-add-event-calendar">
            ➕ Schedule New Event Date
          </button>
        </div>
      </div>

      <!-- Schedule Cards List -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px;">
        ${[...e].sort((a,r)=>new Date(a.eventDate)-new Date(r.eventDate)).map(a=>{const r=Pe.find(T=>T.id===a.stage)||{name:a.stage,color:"#6B7280",icon:"📌"},i=new Date(a.eventDate),c=isNaN(i.getTime())?"DEC":i.toLocaleString("en-GB",{month:"short"}).toUpperCase(),l=isNaN(i.getTime())?"19":i.getDate(),u=isNaN(i.getTime())?"2027":i.getFullYear();return`
            <div style="background: var(--bg-card-solid); border: 1px solid var(--border-light); border-left: 4px solid ${r.color}; border-radius: var(--radius-lg); padding: 18px; display: flex; gap: 16px; align-items: center; position: relative;">
              <!-- Date Block Badge -->
              <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--border-light); border-radius: 12px; min-width: 65px; height: 75px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <span style="font-size: 11px; font-weight: 700; color: var(--gold-primary); text-transform: uppercase;">${c}</span>
                <span style="font-size: 24px; font-weight: 800; color: #FFF; line-height: 1;">${l}</span>
                <span style="font-size: 10px; color: var(--text-muted);">${u}</span>
              </div>

              <!-- Event Info -->
              <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <div style="font-weight: 700; font-size: 16px; color: #FFF;">${a.clientName}</div>
                  <span class="badge" style="background: ${r.color}22; color: ${r.color}; font-size: 10px;">
                    ${r.icon} ${r.name}
                  </span>
                </div>

                <div style="font-size: 12px; color: var(--gold-light); font-weight: 600;">${a.eventType}</div>
                <div style="font-size: 12px; color: var(--text-muted);">📍 ${a.venue}</div>
                <div style="font-size: 11px; color: var(--text-dim); margin-top: 4px;">
                  ⏰ ${a.recommendedTiming||"7pm–10pm"} • ${F(a.dealValue)}
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `}function zt(e,n){const a=pt(e,n),r={};e.forEach(c=>{const l=c.source||"Bark";r[l]||(r[l]={count:0,totalValue:0,securedValue:0}),r[l].count+=1,r[l].totalValue+=Number(c.dealValue)||0,(c.stage==="secured"||c.stage==="completed")&&(r[l].securedValue+=Number(c.dealValue)||0)});const i={};return e.forEach(c=>{const l=J.find(u=>u.id===c.packageId)||{name:"Custom Package"};i[l.name]=(i[l.name]||0)+1}),`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <!-- Header Banner -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: 24px;">
        <h2 style="font-size: 22px; font-weight: 700; color: #FFF; margin-bottom: 4px;">📈 Sales Commission & Channel Analytics</h2>
        <p style="font-size: 13px; color: var(--text-muted);">Track your total earnings, high-converting lead channels, and popular photobooth packages.</p>
      </div>

      <!-- Financial Metrics Summary Cards -->
      <div class="metrics-grid">
        <div class="metric-card" style="border-left-color: var(--gold-primary);">
          <div class="metric-header">
            <span class="metric-title">Total Earned Payout</span>
            <span class="metric-icon">💵</span>
          </div>
          <div class="metric-value" style="color: var(--gold-primary);">${F(a.totalCommissionEarned)}</div>
          <div class="metric-subtext">Based on secured & completed jobs</div>
        </div>

        <div class="metric-card" style="border-left-color: var(--accent-info);">
          <div class="metric-header">
            <span class="metric-title">Pending Quote Commission</span>
            <span class="metric-icon">⏳</span>
          </div>
          <div class="metric-value" style="color: var(--accent-info);">${F(a.pendingCommission)}</div>
          <div class="metric-subtext">Pending client deposit confirmation</div>
        </div>

        <div class="metric-card" style="border-left-color: var(--accent-success);">
          <div class="metric-header">
            <span class="metric-title">Total Revenue Generated</span>
            <span class="metric-icon">🏆</span>
          </div>
          <div class="metric-value" style="color: var(--accent-success);">${F(a.securedValue)}</div>
          <div class="metric-subtext">Total photobooth bookings value</div>
        </div>
      </div>

      <!-- Breakdown Grids -->
      <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 24px;">
        <!-- Lead Source ROI Table -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: 24px; display: flex; flex-direction: column; gap: 16px;">
          <h3 style="font-size: 18px; font-weight: 700; color: #FFF;">🎯 Lead Channels ROI Breakdown</h3>
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
              <thead>
                <tr style="border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-size: 11px; text-transform: uppercase;">
                  <th style="padding: 10px;">Lead Source</th>
                  <th style="padding: 10px;">Enquiries</th>
                  <th style="padding: 10px;">Pipeline Value</th>
                  <th style="padding: 10px;">Secured Value</th>
                  <th style="padding: 10px;">Est. Commission</th>
                </tr>
              </thead>
              <tbody>
                ${Object.entries(r).map(([c,l])=>`
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.04);">
                    <td style="padding: 12px 10px; font-weight: 700; color: #FFF;">${c}</td>
                    <td style="padding: 12px 10px;">${l.count}</td>
                    <td style="padding: 12px 10px;">${F(l.totalValue)}</td>
                    <td style="padding: 12px 10px; color: var(--accent-success); font-weight: 600;">${F(l.securedValue)}</td>
                    <td style="padding: 12px 10px; color: var(--gold-primary); font-weight: 700;">${F(l.securedValue*.1)}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Package Popularity Breakdown -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: 24px; display: flex; flex-direction: column; gap: 16px;">
          <h3 style="font-size: 18px; font-weight: 700; color: #FFF;">📸 Package Demand Share</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${Object.entries(i).map(([c,l])=>{const u=Math.round(l/(e.length||1)*100);return`
                <div style="background: var(--bg-card-solid); border: 1px solid var(--border-light); padding: 14px; border-radius: 12px; display: flex; flex-direction: column; gap: 6px;">
                  <div style="display: flex; justify-content: space-between; font-weight: 600; font-size: 13px; color: #FFF;">
                    <span>${c}</span>
                    <span style="color: var(--gold-primary);">${l} bookings (${u}%)</span>
                  </div>
                  <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: ${u}%;"></div>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    </div>
  `}function _t(e=[],n="",a="all",r="all",i="all"){const c=e.length,l=e.filter(m=>m.status==="pitch_sent"||m.status==="meeting_booked"||m.status==="partner_agreed").length,u=e.filter(m=>m.status==="partner_agreed").length,T=e.filter(m=>m.status==="meeting_booked").length,R=e.filter(m=>{if(n&&n.trim()){const k=n.toLowerCase().trim(),_=(m.name||"").toLowerCase().includes(k),oe=(m.area||"").toLowerCase().includes(k),ie=(m.category||"").toLowerCase().includes(k),le=(m.bestAngle||"").toLowerCase().includes(k),M=(m.email||"").toLowerCase().includes(k),de=(m.phone||"").toLowerCase().includes(k),ce=(m.notes||"").toLowerCase().includes(k);if(!_&&!oe&&!ie&&!le&&!M&&!de&&!ce)return!1}return!(a!=="all"&&(a==="Venues"&&!m.category.toLowerCase().includes("venue")&&!m.category.toLowerCase().includes("hotel")&&!m.category.toLowerCase().includes("hall")&&!m.category.toLowerCase().includes("barn")&&!m.category.toLowerCase().includes("estate")&&!m.category.toLowerCase().includes("resort")&&!m.category.toLowerCase().includes("stadium")&&!m.category.toLowerCase().includes("castle")||a==="Planners"&&!m.category.toLowerCase().includes("planner")&&!m.category.toLowerCase().includes("production")&&!m.category.toLowerCase().includes("management")||a==="Entertainment"&&!m.category.toLowerCase().includes("music")&&!m.category.toLowerCase().includes("dj")&&!m.category.toLowerCase().includes("entertainment")&&!m.category.toLowerCase().includes("decor")&&!m.category.toLowerCase().includes("decorator")||a==="PR"&&!m.category.toLowerCase().includes("pr")&&!m.category.toLowerCase().includes("comms"))||r!=="all"&&m.status!==r||i!=="all"&&m.targetWeek!==i)});return`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <!-- Hero Banner -->
      <div style="background: linear-gradient(135deg, var(--bg-card-solid), rgba(212,175,55,0.2), rgba(128,0,32,0.3)); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: 26px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div style="max-width: 780px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span class="badge" style="background: var(--gold-primary); color: #000; font-weight: 800; font-size: 11px;">
              🏢 50 NORTH WEST VENUES & PARTNERS DIRECTORY
            </span>
            <span class="badge" style="background: rgba(16,185,129,0.2); color: var(--accent-success); border: 1px solid var(--accent-success);">
              ● Google Sheet Sync Enabled
            </span>
          </div>
          <h2 style="font-size: 26px; font-weight: 800; color: #FFF; margin-bottom: 6px;">
            Target Venues, Planners, PR & Agency Directory
          </h2>
          <p style="font-size: 14px; color: var(--text-muted); line-height: 1.5;">
            Unified target database of 50 luxury venues, high-end wedding planners, music agencies, and PR firms across Cheshire, Manchester, and the North West with direct emails, phone numbers, and tailored pitch angles.
          </p>
        </div>

        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button class="btn btn-gold" id="btn-export-directory-csv" style="font-weight: 700;">
            📥 Export to Google Sheet (CSV)
          </button>
          <button class="btn btn-glass" id="btn-open-sync-sheet-modal">
            📋 Sync / Paste Sheet Data
          </button>
          <button class="btn btn-burgundy" id="btn-add-partner-modal">
            ➕ Add Partner
          </button>
        </div>
      </div>

      <!-- Quick Stats Metrics Row -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
        <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-lg); padding: 18px; border-left: 4px solid var(--gold-primary);">
          <div style="font-size: 12px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Total Target Directory</div>
          <div style="font-size: 24px; font-weight: 800; color: #FFF; margin-top: 4px;">${c} Organizations</div>
          <div style="font-size: 11px; color: var(--gold-light); margin-top: 4px;">Cheshire, MCR, Ribble Valley & NW</div>
        </div>

        <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-lg); padding: 18px; border-left: 4px solid var(--accent-info);">
          <div style="font-size: 12px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Outreach Initiated</div>
          <div style="font-size: 24px; font-weight: 800; color: var(--accent-info); margin-top: 4px;">${l} / ${c}</div>
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">${Math.round(l/(c||1)*100)}% coverage</div>
        </div>

        <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-lg); padding: 18px; border-left: 4px solid var(--gold-light);">
          <div style="font-size: 12px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Meetings & Demos Booked</div>
          <div style="font-size: 24px; font-weight: 800; color: var(--gold-light); margin-top: 4px;">${T} Booked</div>
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Open days & showroom visits</div>
        </div>

        <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-lg); padding: 18px; border-left: 4px solid var(--accent-success);">
          <div style="font-size: 12px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Preferred Partnerships Won</div>
          <div style="font-size: 24px; font-weight: 800; color: var(--accent-success); margin-top: 4px;">${u} Agreed</div>
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Active referral engines</div>
        </div>
      </div>

      <!-- Outreach Plan of Attack Interactive Roadmap -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: 22px; display: flex; flex-direction: column; gap: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <h3 style="font-size: 17px; font-weight: 700; color: var(--gold-light); display: flex; align-items: center; gap: 8px;">
            <span>🎯 3-Week Targeted Outreach Plan of Attack</span>
          </h3>
          <span style="font-size: 12px; color: var(--text-muted);">Click a week to filter directory</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 14px;">
          <div class="week-filter-card ${i==="Week 1"?"active-week-card":""}" data-week="Week 1" style="background: rgba(255,255,255,0.03); border: 1px solid ${i==="Week 1"?"var(--gold-primary)":"var(--border-light)"}; border-radius: 12px; padding: 16px; cursor: pointer; transition: all 0.2s ease;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span class="badge" style="background: rgba(212,175,55,0.15); color: var(--gold-primary); font-weight: 800;">WEEK 1 STRATEGY</span>
              <span style="font-size: 11px; color: var(--gold-light); font-weight: 700;">36 Venues</span>
            </div>
            <h4 style="font-size: 15px; font-weight: 700; color: #FFF; margin-bottom: 4px;">Cheshire & North West Wedding Venues</h4>
            <p style="font-size: 12px; color: var(--text-muted); line-height: 1.4;">
              Pitch <strong>Colshaw, Merrydale, Delamere, Peckforton & Oak Tree</strong> positioning SnapSuites as a vetted, £5M PLI / PAT-tested luxury supplier to join their recommended vendor list.
            </p>
          </div>

          <div class="week-filter-card ${i==="Week 2"?"active-week-card":""}" data-week="Week 2" style="background: rgba(255,255,255,0.03); border: 1px solid ${i==="Week 2"?"var(--gold-primary)":"var(--border-light)"}; border-radius: 12px; padding: 16px; cursor: pointer; transition: all 0.2s ease;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span class="badge" style="background: rgba(16,185,129,0.15); color: var(--accent-success); font-weight: 800;">WEEK 2 STRATEGY</span>
              <span style="font-size: 11px; color: var(--accent-success); font-weight: 700;">11 Planners & DJs</span>
            </div>
            <h4 style="font-size: 15px; font-weight: 700; color: #FFF; margin-bottom: 4px;">Luxury Wedding Planners, DJs & Stylists</h4>
            <p style="font-size: 12px; color: var(--text-muted); line-height: 1.4;">
              Contact <strong>Julie Perry, Kate Park, Charlotte Elise, Six15 & DFC</strong> as their go-to photo booth partner, sending over trade pricing brochures and cross-referral packages.
            </p>
          </div>

          <div class="week-filter-card ${i==="Week 3"?"active-week-card":""}" data-week="Week 3" style="background: rgba(255,255,255,0.03); border: 1px solid ${i==="Week 3"?"var(--gold-primary)":"var(--border-light)"}; border-radius: 12px; padding: 16px; cursor: pointer; transition: all 0.2s ease;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span class="badge" style="background: rgba(59,130,246,0.15); color: var(--accent-info); font-weight: 800;">WEEK 3 STRATEGY</span>
              <span style="font-size: 11px; color: var(--accent-info); font-weight: 700;">3 PR Agencies</span>
            </div>
            <h4 style="font-size: 15px; font-weight: 700; color: #FFF; margin-bottom: 4px;">Manchester PR & Brand Comms Agencies</h4>
            <p style="font-size: 12px; color: var(--text-muted); line-height: 1.4;">
              Pitch <strong>Carousel PR, Brazen PR & Tangerine</strong> for corporate brand activations, roamer pods, and custom vinyl wrap photo experiences.
            </p>
          </div>
        </div>
      </div>

      <!-- Search & Filters Toolbar -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: 22px; display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <div style="flex: 3; min-width: 280px; position: relative;">
            <input 
              type="text" 
              id="directory-search-input" 
              class="input-search" 
              style="width: 100%; padding: 12px 14px 12px 42px; font-size: 14px;" 
              placeholder="Search by venue name, area, angle, email, or phone (e.g. Colshaw, Knutsford, Julie Perry, 01565)..." 
              value="${n}"
            />
            <span style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 16px; color: var(--gold-primary);">🔍</span>
          </div>

          <button class="btn btn-gold" id="btn-submit-directory-search" style="font-weight: 700; padding: 0 24px;">
            Search Directory
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
          <div>
            <label style="font-size: 11px; color: var(--text-muted); font-weight: 700; text-transform: uppercase; margin-bottom: 4px; display: block;">Category</label>
            <select id="directory-category-filter" class="select-filter" style="width: 100%;">
              <option value="all" ${a==="all"?"selected":""}>🏢 All Categories (50 Orgs)</option>
              <option value="Venues" ${a==="Venues"?"selected":""}>🏰 Luxury Venues, Barns & Castles</option>
              <option value="Planners" ${a==="Planners"?"selected":""}>📋 Wedding & Event Planners</option>
              <option value="Entertainment" ${a==="Entertainment"?"selected":""}>🎵 Music, DJs & Stylists</option>
              <option value="PR" ${a==="PR"?"selected":""}>📣 PR & Brand Comms</option>
            </select>
          </div>

          <div>
            <label style="font-size: 11px; color: var(--text-muted); font-weight: 700; text-transform: uppercase; margin-bottom: 4px; display: block;">Outreach Status</label>
            <select id="directory-status-filter" class="select-filter" style="width: 100%;">
              <option value="all" ${r==="all"?"selected":""}>🎯 All Outreach Statuses</option>
              <option value="not_contacted" ${r==="not_contacted"?"selected":""}>⚪ Not Contacted</option>
              <option value="pitch_sent" ${r==="pitch_sent"?"selected":""}>🟣 Pitch Sent</option>
              <option value="meeting_booked" ${r==="meeting_booked"?"selected":""}>🟡 Meeting / Demo Booked</option>
              <option value="partner_agreed" ${r==="partner_agreed"?"selected":""}>🟢 Preferred Partner Agreed</option>
            </select>
          </div>

          <div>
            <label style="font-size: 11px; color: var(--text-muted); font-weight: 700; text-transform: uppercase; margin-bottom: 4px; display: block;">Roadmap Week</label>
            <select id="directory-week-filter" class="select-filter" style="width: 100%;">
              <option value="all" ${i==="all"?"selected":""}>📅 All Strategy Weeks</option>
              <option value="Week 1" ${i==="Week 1"?"selected":""}>Week 1: Cheshire Barns & Venues</option>
              <option value="Week 2" ${i==="Week 2"?"selected":""}>Week 2: Planners & Music</option>
              <option value="Week 3" ${i==="Week 3"?"selected":""}>Week 3: Manchester PR Agencies</option>
            </select>
          </div>
        </div>

        ${n||a!=="all"||r!=="all"||i!=="all"?`
          <div style="display: flex; justify-content: flex-end;">
            <button class="btn btn-burgundy btn-sm" id="btn-reset-directory-filters">
              ✕ Clear All Filters
            </button>
          </div>
        `:""}
      </div>

      <!-- Directory Cards Grid Header -->
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h3 style="font-size: 19px; font-weight: 700; color: #FFF; display: flex; align-items: center; gap: 8px;">
          <span>📋 Target Partners & Venues</span>
          <span style="font-size: 13px; color: var(--gold-light); background: rgba(212,175,55,0.15); padding: 2px 10px; border-radius: 12px; border: 1px solid var(--border-glass);">
            ${R.length} matching
          </span>
        </h3>
      </div>

      <!-- Directory Cards Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 20px;">
        ${R.length===0?`
          <div style="grid-column: 1 / -1; background: var(--bg-card); border: 1px dashed var(--border-light); padding: 40px; text-align: center; border-radius: var(--radius-lg); color: var(--text-muted);">
            <div style="font-size: 32px; margin-bottom: 10px;">🔍</div>
            <h4 style="color: #FFF; font-size: 16px; margin-bottom: 6px;">No organizations match your filters</h4>
            <p style="font-size: 13px; margin-bottom: 16px;">Try clearing your search term or selecting "All Categories".</p>
            <button class="btn btn-gold btn-sm" id="btn-empty-reset-directory">Show All 50 Organizations</button>
          </div>
        `:R.map(m=>{let k='<span class="badge" style="background: rgba(255,255,255,0.1); color: var(--text-muted);">⚪ Not Contacted</span>';return m.status==="pitch_sent"?k='<span class="badge" style="background: rgba(168,85,247,0.2); color: #C084FC; border: 1px solid #C084FC;">🟣 Pitch Sent</span>':m.status==="meeting_booked"?k='<span class="badge" style="background: rgba(234,179,8,0.2); color: #FACC15; border: 1px solid #FACC15;">🟡 Meeting Booked</span>':m.status==="partner_agreed"&&(k='<span class="badge" style="background: rgba(16,185,129,0.2); color: var(--accent-success); border: 1px solid var(--accent-success);">🟢 Preferred Partner</span>'),`
            <div class="lead-card" style="border-left: 4px solid var(--gold-primary); padding: 20px; display: flex; flex-direction: column; gap: 14px;">
              <!-- Card Header -->
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px;">
                <div>
                  <h4 style="font-size: 17px; font-weight: 800; color: #FFF; margin-bottom: 2px;">${m.name}</h4>
                  <div style="font-size: 13px; color: var(--gold-light); font-weight: 600;">
                    ${m.category} • <span style="color: var(--text-muted); font-weight: 400;">${m.area}</span>
                  </div>
                </div>
                <div>${k}</div>
              </div>

              <!-- Best Angle Callout Box -->
              <div style="background: rgba(212,175,55,0.08); border: 1px solid var(--border-glass); border-radius: 8px; padding: 10px 12px;">
                <div style="font-size: 11px; color: var(--gold-primary); font-weight: 800; text-transform: uppercase; margin-bottom: 2px;">
                  ⚡ Best Angle for SnapSuites:
                </div>
                <div style="font-size: 13px; color: #FFF; font-weight: 600;">
                  ${m.bestAngle}
                </div>
              </div>

              <!-- Contact Info -->
              <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-light); border-radius: 8px; padding: 10px 12px; display: flex; flex-direction: column; gap: 6px; font-size: 13px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: var(--text-muted);">📧 Email:</span>
                  <a href="mailto:${m.email}" style="color: var(--gold-light); text-decoration: none; font-weight: 600; word-break: break-all;">
                    ${m.email}
                  </a>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: var(--text-muted);">📞 Phone:</span>
                  <a href="tel:${m.phone.replace(/\s+/g,"")}" style="color: #FFF; text-decoration: none; font-weight: 600;">
                    ${m.phone}
                  </a>
                </div>
                ${m.notes?`
                  <div style="font-size: 11px; color: var(--text-dim); margin-top: 4px; border-top: 1px dashed var(--border-light); padding-top: 4px;">
                    📝 <em>${m.notes}</em>
                  </div>
                `:""}
              </div>

              <!-- Outreach Status Selector -->
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                <span style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Status:</span>
                <select class="directory-status-select select-filter" data-id="${m.id}" style="padding: 4px 8px; font-size: 12px; flex: 1;">
                  <option value="not_contacted" ${m.status==="not_contacted"?"selected":""}>⚪ Not Contacted</option>
                  <option value="pitch_sent" ${m.status==="pitch_sent"?"selected":""}>🟣 Pitch Sent</option>
                  <option value="meeting_booked" ${m.status==="meeting_booked"?"selected":""}>🟡 Meeting / Demo Booked</option>
                  <option value="partner_agreed" ${m.status==="partner_agreed"?"selected":""}>🟢 Preferred Partner</option>
                </select>
              </div>

              <!-- Action Suite -->
              <div style="display: flex; flex-direction: column; gap: 8px; margin-top: auto; padding-top: 10px; border-top: 1px dashed var(--border-light);">
                <button class="btn btn-gold btn-sm btn-directory-pitch-trigger" data-id="${m.id}" style="width: 100%; font-weight: 700;">
                  ⚡ 1-Click Tailored Pitch Script
                </button>

                <div style="display: flex; gap: 8px;">
                  <button class="btn btn-burgundy btn-sm btn-convert-partner-to-crm" data-id="${m.id}" style="flex: 1;">
                    📥 Push to CRM Deals
                  </button>
                  <a href="mailto:${m.email}?subject=${encodeURIComponent("Exclusive Luxury Photobooth Partnership - SnapSuites x "+m.name)}" class="btn btn-glass btn-sm" style="text-decoration: none;" title="Send direct email">
                    ✉️ Email
                  </a>
                </div>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `}function Ot(e=null){return`
    <div class="modal-overlay active" id="directory-sync-modal-overlay">
      <div class="modal-container" style="max-width: 680px;">
        <div class="modal-header">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 24px;">📊</span>
            <div>
              <h3 class="modal-title" style="font-size: 18px;">
                ${e?"Edit Target Organization":"Google Sheet & Mailmerge Sync"}
              </h3>
              <div style="font-size: 12px; color: var(--text-muted);">
                Formatted for 1-click export to Google Sheets, Mailmeteor, and YAMM
              </div>
            </div>
          </div>
          <button class="modal-close-btn" id="btn-close-sync-modal">&times;</button>
        </div>

        <div class="modal-body" style="gap: 16px;">
          <!-- Mode Tabs -->
          <div style="display: flex; gap: 10px; border-bottom: 1px solid var(--border-light); padding-bottom: 10px;">
            <button class="btn btn-sm ${e?"btn-glass":"btn-gold"}" id="tab-add-single-partner">
              ➕ Add Single Partner
            </button>
            <button class="btn btn-sm btn-glass" id="tab-paste-sheet-data">
              📋 Paste Sheet Data / CSV
            </button>
          </div>

          <!-- Form 1: Single Partner Add/Edit -->
          <form id="form-single-partner" style="display: flex; flex-direction: column; gap: 12px;">
            <input type="hidden" id="partner-id" value="${(e==null?void 0:e.id)||""}" />

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label class="form-label" style="font-size: 11px;">Venue_Name / Company_Name *</label>
                <input type="text" id="partner-name" class="form-control" placeholder="e.g. Peckforton Castle / Julie Perry Events" required value="${(e==null?void 0:e.name)||""}" />
              </div>

              <div class="form-group">
                <label class="form-label" style="font-size: 11px;">Category *</label>
                <input type="text" id="partner-category" class="form-control" placeholder="e.g. Luxury Venue / Wedding Planner / DJ" required value="${(e==null?void 0:e.category)||"Luxury Venue"}" />
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label class="form-label" style="font-size: 11px;">Contact_Name (Person / Team) *</label>
                <input type="text" id="partner-contact" class="form-control" placeholder="e.g. Wedding Coordinators / Events Team" required value="${(e==null?void 0:e.contactName)||"Events Team"}" />
              </div>

              <div class="form-group">
                <label class="form-label" style="font-size: 11px;">Area / Location *</label>
                <input type="text" id="partner-area" class="form-control" placeholder="e.g. Knutsford, Cheshire" required value="${(e==null?void 0:e.area)||""}" />
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label class="form-label" style="font-size: 11px;">Email Address (For Mailmerge) *</label>
                <input type="email" id="partner-email" class="form-control" placeholder="enquiries@colshawhall.com" required value="${(e==null?void 0:e.email)||""}" />
              </div>

              <div class="form-group">
                <label class="form-label" style="font-size: 11px;">Phone Number *</label>
                <input type="text" id="partner-phone" class="form-control" placeholder="01565 724060" required value="${(e==null?void 0:e.phone)||""}" />
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 12px;">
              <div class="form-group">
                <label class="form-label" style="font-size: 11px;">Booth_Style (Fits into {{Booth_Style}} tag) *</label>
                <input type="text" id="partner-angle" class="form-control" placeholder="e.g. Vintage Handcrafted Booth or Glam Pod" required value="${(e==null?void 0:e.boothStyle)||(e==null?void 0:e.bestAngle)||"Vintage Handcrafted Booth"}" />
              </div>

              <div class="form-group">
                <label class="form-label" style="font-size: 11px;">Roadmap Week</label>
                <select id="partner-week" class="form-control">
                  <option value="Week 1" ${(e==null?void 0:e.targetWeek)==="Week 1"?"selected":""}>Week 1: Venues</option>
                  <option value="Week 2" ${(e==null?void 0:e.targetWeek)==="Week 2"?"selected":""}>Week 2: Planners & DJs</option>
                  <option value="Week 3" ${(e==null?void 0:e.targetWeek)==="Week 3"?"selected":""}>Week 3: PR Agencies</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" style="font-size: 11px;">Outreach Notes</label>
              <textarea id="partner-notes" class="form-control" rows="2" placeholder="e.g. Fully £5M PLI insured & PAT tested recommended supplier pitch...">${(e==null?void 0:e.notes)||""}</textarea>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 6px;">
              <button type="button" class="btn btn-glass" id="btn-cancel-sync-modal">Cancel</button>
              <button type="submit" class="btn btn-gold" style="font-weight: 700;">
                💾 Save to Target Directory
              </button>
            </div>
          </form>

          <!-- Form 2: Bulk CSV / Sheet Paste (Hidden by default) -->
          <div id="form-bulk-sheet" style="display: none; flex-direction: column; gap: 12px;">
            <div style="font-size: 13px; color: var(--text-muted); line-height: 1.4;">
              Paste rows from your Google Sheet or CSV below (Columns: <code>Email, Venue_Name, Company_Name, Contact_Name, Booth_Style, Category, Area, Phone</code>):
            </div>

            <textarea id="bulk-csv-input" class="form-control" rows="8" style="font-family: monospace; font-size: 12px;" placeholder="Email, Venue_Name, Company_Name, Contact_Name, Booth_Style, Category, Area, Phone
enquiries@colshawhall.com, Colshaw Hall, Colshaw Hall, Events Team, Vintage Handcrafted Booth, Luxury Venue, Knutsford, 01565 724060"></textarea>

            <div style="display: flex; justify-content: flex-end; gap: 10px;">
              <button type="button" class="btn btn-glass" id="btn-cancel-bulk-modal">Cancel</button>
              <button type="button" class="btn btn-gold" id="btn-submit-bulk-import" style="font-weight: 700;">
                ⚡ Import & Append to Directory
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}function jt(e=null){const n=!!e,a=e||{id:"lead-"+Date.now(),clientName:"",contactEmail:"",contactPhone:"",eventType:"Birthday Celebration",eventDate:new Date().toISOString().slice(0,10),recommendedTiming:"7pm–10pm",venue:"",source:"Bark",packageId:"birthday-3h",backdrop:"burgundy",dealValue:350,stage:"new",notes:""};return`
    <div class="modal-overlay active" id="lead-modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h3 class="modal-title">${n?"✏️ Edit Lead Details":"➕ Add New Sales Lead"}</h3>
          <button class="modal-close-btn" id="btn-close-lead-modal">&times;</button>
        </div>

        <form id="lead-form" class="modal-body">
          <input type="hidden" id="lead-id-field" value="${a.id}" />

          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Client Name *</label>
              <input type="text" id="lead-client-name" class="form-control" value="${a.clientName}" required placeholder="e.g. Chris / Sarah & Mark" />
            </div>

            <div class="form-group">
              <label class="form-label">Event Type *</label>
              <input type="text" id="lead-event-type" class="form-control" value="${a.eventType}" required placeholder="e.g. Birthday Celebration / Wedding" />
            </div>

            <div class="form-group">
              <label class="form-label">Contact Email</label>
              <input type="email" id="lead-email" class="form-control" value="${a.contactEmail}" placeholder="client@example.com" />
            </div>

            <div class="form-group">
              <label class="form-label">Contact Phone</label>
              <input type="tel" id="lead-phone" class="form-control" value="${a.contactPhone}" placeholder="07700 900123" />
            </div>

            <div class="form-group">
              <label class="form-label">Event Date *</label>
              <input type="date" id="lead-event-date" class="form-control" value="${a.eventDate}" required />
            </div>

            <div class="form-group">
              <label class="form-label">Recommended Hire Times</label>
              <input type="text" id="lead-timing" class="form-control" value="${a.recommendedTiming||"7pm–10pm"}" placeholder="e.g. 7pm–10pm" />
            </div>

            <div class="form-group">
              <label class="form-label">Venue / Location *</label>
              <input type="text" id="lead-venue" class="form-control" value="${a.venue}" required placeholder="e.g. Peckforton Castle, Cheshire" />
            </div>

            <div class="form-group">
              <label class="form-label">Lead Source</label>
              <select id="lead-source" class="form-control">
                <option value="Bark" ${a.source==="Bark"?"selected":""}>Bark</option>
                <option value="Bridebook" ${a.source==="Bridebook"?"selected":""}>Bridebook</option>
                <option value="Instagram DM" ${a.source==="Instagram DM"?"selected":""}>Instagram DM</option>
                <option value="Direct Website" ${a.source==="Direct Website"?"selected":""}>Direct Website</option>
                <option value="Referral" ${a.source==="Referral"?"selected":""}>Referral</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Photobooth Package</label>
              <select id="lead-package" class="form-control">
                ${J.map(r=>`<option value="${r.id}" ${r.id===a.packageId?"selected":""}>${r.name} (£${r.price})</option>`).join("")}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Pipeline Stage</label>
              <select id="lead-stage" class="form-control">
                ${Pe.map(r=>`<option value="${r.id}" ${r.id===a.stage?"selected":""}>${r.icon} ${r.name}</option>`).join("")}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Deal Value (£)</label>
              <input type="number" id="lead-deal-value" class="form-control" value="${a.dealValue}" required min="0" step="10" />
            </div>

            <div class="form-group">
              <label class="form-label">Backdrop Choice</label>
              <select id="lead-backdrop" class="form-control">
                ${st.map(r=>`<option value="${r.id}" ${r.id===a.backdrop?"selected":""}>${r.name}</option>`).join("")}
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Notes & Communication History</label>
            <textarea id="lead-notes" class="form-control" rows="3" placeholder="Log client requirements, custom rear screen video details, or Bark messages...">${a.notes}</textarea>
          </div>

          <div class="modal-footer" style="padding: 0; margin-top: 12px;">
            ${n?`<button type="button" class="btn btn-burgundy btn-sm" id="btn-delete-lead" data-lead-id="${a.id}">🗑️ Delete Lead</button>`:""}
            <button type="button" class="btn btn-glass" id="btn-cancel-lead-modal">Cancel</button>
            <button type="submit" class="btn btn-gold">💾 Save Lead</button>
          </div>
        </form>
      </div>
    </div>
  `}function qt(e=null){const n=!!e,a=e||{id:"prospect-"+Date.now(),name:"",contactPerson:"",category:"Wedding Venue Partner",location:"",preferredChannel:"Email",contactEmail:"",contactPhone:"",status:"not_contacted",notes:""};return`
    <div class="modal-overlay active" id="prospect-modal-overlay">
      <div class="modal-container" style="max-width: 650px;">
        <div class="modal-header">
          <h3 class="modal-title">${n?"✏️ Edit Potential Customer":"🎯 Add Potential Customer / Venue"}</h3>
          <button class="modal-close-btn" id="btn-close-prospect-modal">&times;</button>
        </div>

        <form id="prospect-form" class="modal-body">
          <input type="hidden" id="prospect-id-field" value="${a.id}" />

          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Business / Prospect Name *</label>
              <input type="text" id="prospect-name" class="form-control" value="${a.name}" required placeholder="e.g. Peckforton Castle / Sarah's 30th" />
            </div>

            <div class="form-group">
              <label class="form-label">Contact Person Name</label>
              <input type="text" id="prospect-contact-person" class="form-control" value="${a.contactPerson}" placeholder="e.g. Claire Higgins" />
            </div>

            <div class="form-group">
              <label class="form-label">Category</label>
              <select id="prospect-category" class="form-control">
                <option value="Wedding Venue Partner" ${a.category==="Wedding Venue Partner"?"selected":""}>Wedding Venue Partner</option>
                <option value="Corporate & Party Venue" ${a.category==="Corporate & Party Venue"?"selected":""}>Corporate & Party Venue</option>
                <option value="Event Coordinator / Planner" ${a.category==="Event Coordinator / Planner"?"selected":""}>Event Coordinator / Planner</option>
                <option value="Private Party Host" ${a.category==="Private Party Host"?"selected":""}>Private Party Host</option>
                <option value="Bark Prospect" ${a.category==="Bark Prospect"?"selected":""}>Bark Prospect</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Location / Region</label>
              <input type="text" id="prospect-location" class="form-control" value="${a.location}" placeholder="e.g. Tarporley, Cheshire / Manchester" />
            </div>

            <div class="form-group">
              <label class="form-label">Preferred Contact Channel</label>
              <select id="prospect-channel" class="form-control">
                <option value="Email" ${a.preferredChannel==="Email"?"selected":""}>Email</option>
                <option value="Instagram DM" ${a.preferredChannel==="Instagram DM"?"selected":""}>Instagram DM</option>
                <option value="Phone" ${a.preferredChannel==="Phone"?"selected":""}>Phone</option>
                <option value="Bark" ${a.preferredChannel==="Bark"?"selected":""}>Bark</option>
                <option value="LinkedIn" ${a.preferredChannel==="LinkedIn"?"selected":""}>LinkedIn</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Outreach Status *</label>
              <select id="prospect-status" class="form-control">
                ${we.map(r=>`<option value="${r.id}" ${r.id===a.status?"selected":""}>${r.icon} ${r.name}</option>`).join("")}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Contact Email</label>
              <input type="email" id="prospect-email" class="form-control" value="${a.contactEmail}" placeholder="contact@example.co.uk" />
            </div>

            <div class="form-group">
              <label class="form-label">Contact Phone</label>
              <input type="tel" id="prospect-phone" class="form-control" value="${a.contactPhone}" placeholder="01829 260901" />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Notes & Follow-up History</label>
            <textarea id="prospect-notes" class="form-control" rows="3" placeholder="Notes on outreach date, response, or preferred package...">${a.notes}</textarea>
          </div>

          <div class="modal-footer" style="padding: 0; margin-top: 12px;">
            ${n?`<button type="button" class="btn btn-burgundy btn-sm" id="btn-delete-prospect" data-prospect-id="${a.id}">🗑️ Delete</button>`:""}
            <button type="button" class="btn btn-glass" id="btn-cancel-prospect-modal">Cancel</button>
            <button type="submit" class="btn btn-gold">💾 Save Prospect</button>
          </div>
        </form>
      </div>
    </div>
  `}function Gt(){return`
    <div class="modal-overlay active" id="clip-modal-overlay">
      <div class="modal-container" style="max-width: 550px;">
        <div class="modal-header">
          <h3 class="modal-title">📌 Clip Real Live Social Post to CRM</h3>
          <button class="modal-close-btn" id="btn-close-clip-modal">&times;</button>
        </div>

        <form id="clip-post-form" class="modal-body">
          <div class="form-group">
            <label class="form-label">Real Post or Enquiry URL *</label>
            <input type="url" id="clip-post-url" class="form-control" placeholder="https://www.instagram.com/p/... or Bark link" required />
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">
              Paste the exact link to the real Instagram post, Facebook group inquiry, or Bark listing.
            </div>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Client / Profile Name *</label>
              <input type="text" id="clip-client-name" class="form-control" placeholder="e.g. @sarah_wedding2027" required />
            </div>

            <div class="form-group">
              <label class="form-label">Platform</label>
              <select id="clip-platform" class="form-control">
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="Bark">Bark</option>
                <option value="TikTok">TikTok</option>
                <option value="Other Web">Other Web</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Event Type</label>
              <input type="text" id="clip-event-type" class="form-control" placeholder="e.g. Wedding / 30th Birthday" value="Wedding" />
            </div>

            <div class="form-group">
              <label class="form-label">Venue / Location</label>
              <input type="text" id="clip-venue" class="form-control" placeholder="e.g. Peckforton Castle, Cheshire" />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Post Caption / Notes</label>
            <textarea id="clip-caption" class="form-control" rows="3" placeholder="Paste what they said in the post..."></textarea>
          </div>

          <div class="modal-footer" style="padding: 0; margin-top: 12px;">
            <button type="button" class="btn btn-glass" id="btn-cancel-clip-modal">Cancel</button>
            <button type="submit" class="btn btn-gold">📌 Save Real Post</button>
          </div>
        </form>
      </div>
    </div>
  `}function Ut(e,n="Founder"){var R;if(!e)return"";const a=e.venueName||e.name||"Venue",r=e.companyName||e.name||"Company",i=e.contactName||((R=e.category)!=null&&R.toLowerCase().includes("venue")?"Weddings & Events Team":"Events Team"),c=e.boothStyle||e.bestAngle||"Vintage Handcrafted Booth",l=e.phone||"07700 900123",u=(e.category||"").toLowerCase();return u.includes("venue")||u.includes("hotel")||u.includes("hall")||u.includes("barn")||u.includes("castle")||u.includes("estate")||u.includes("resort")||u.includes("stadium")||u.includes("space")||u.includes("boutique")?`Subject: Supplier Introduction: SnapSuites Photo Booths x ${a}

Hi ${i},

I hope you're having a great week.

I’m reaching out from SnapSuites (https://www.snapsuites.co.uk/). We provide luxury, aesthetic photo booths across Cheshire and Greater Manchester—specialising in our ${c} which fits the aesthetic at ${a} perfectly.

We work regularly across the North West, carry full £5M Public Liability Insurance (PLI), and all equipment is fully PAT-tested to meet venue compliance standards.

As couples frequently ask venues for trusted supplier recommendations, could you let me know who manages your recommended vendor list or how we can get our brochure over to your events team?

Best regards,

${n}
Founder | SnapSuites
${l} | https://www.snapsuites.co.uk/`:`Subject: Preferred Supplier / Collaboration: SnapSuites x ${r}

Hi ${i},

Hope your event season is going strong.

I’m contacting you from SnapSuites (https://www.snapsuites.co.uk/). We supply high-end photo booths (Vintage Booths, Roamer Booths, Magic Mirrors, and custom backdrops) for luxury weddings and private parties across the North West.

We know how crucial it is to have reliable, professional suppliers on site that make the overall event look incredible. We’d love to connect with ${r} as a go-to photo booth partner for any upcoming events where your clients need premium photo entertainment.

If you have a moment, take a quick look at our setups on the site, and let me know if you’d like our trade pricing brochure sent over.

Best regards,

${n}
SnapSuites | ${l} | https://www.snapsuites.co.uk/`}function Jt(e,n="Founder"){if(!e)return"";const a=(e.category||"").toLowerCase().includes("venue")||(e.category||"").toLowerCase().includes("hotel")||(e.category||"").toLowerCase().includes("hall")||(e.category||"").toLowerCase().includes("barn")||(e.category||"").toLowerCase().includes("castle")||(e.category||"").toLowerCase().includes("estate"),r=e.venueName||e.companyName||e.name||"Organization",i=Ut(e,n),c=encodeURIComponent(a?`Supplier Introduction: SnapSuites Photo Booths x ${r}`:`Preferred Supplier / Collaboration: SnapSuites x ${r}`),l=i.replace(/^Subject:.*?\n\n/i,""),u=encodeURIComponent(l),T=e.email?`mailto:${e.email}?subject=${c}&body=${u}`:`mailto:?subject=${c}&body=${u}`;return`
    <div class="modal-overlay active" id="quick-pitch-modal-overlay">
      <div class="modal-container" style="max-width: 720px;">
        <div class="modal-header">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 38px; height: 38px; border-radius: 10px; background: rgba(212,175,55,0.15); border: 1px solid var(--gold-primary); display: flex; align-items: center; justify-content: center; font-size: 20px;">
              ${a?"🏰":"🤝"}
            </div>
            <div>
              <h3 class="modal-title" style="font-size: 18px;">
                ${a?"Supplier Introduction Pitch":"Preferred Partner Collaboration Pitch"}
              </h3>
              <div style="font-size: 12px; color: var(--text-muted);">
                Target: <strong style="color: #FFF;">${r}</strong> (${e.category||"Partner"} • ${e.area||"North West"})
              </div>
            </div>
          </div>
          <button class="modal-close-btn" id="btn-close-quick-pitch-modal">&times;</button>
        </div>

        <div class="modal-body" style="gap: 16px;">
          <!-- Target Summary Details -->
          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 14px; display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
              <span class="badge" style="background: rgba(212,175,55,0.15); color: var(--gold-primary); font-weight: 700;">
                ${e.category||"Organization"}
              </span>
              <span style="font-size: 13px; color: #FFF; font-weight: 600;">
                📍 ${e.area||"North West"}
              </span>
              ${e.email?`<span style="font-size: 12px; color: var(--gold-light);">📧 ${e.email}</span>`:""}
              ${e.phone?`<span style="font-size: 12px; color: var(--text-muted);">📞 ${e.phone}</span>`:""}
            </div>

            <div style="font-size: 12px; color: var(--text-main); background: rgba(212,175,55,0.08); border: 1px solid var(--border-glass); padding: 8px 12px; border-radius: 6px;">
              <strong style="color: var(--gold-primary);">🎯 Booth Style / Match:</strong> ${e.boothStyle||e.bestAngle||"Vintage Handcrafted Booth"}
            </div>
          </div>

          <!-- Generated Commercial Pitch Script -->
          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label class="form-label" style="margin-bottom: 0;">Direct Commercial Email Template (Ready to Send)</label>
              <button type="button" class="btn btn-gold btn-sm" id="btn-copy-pitch-script">
                📋 Copy Script
              </button>
            </div>
            <textarea id="pitch-script-textarea" class="form-control" rows="13" style="font-family: monospace; font-size: 12px; line-height: 1.5; color: #E2E8F0; background: rgba(10, 12, 16, 0.95);">${i}</textarea>
          </div>

          <!-- Action Controls -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; padding-top: 4px;">
            <a href="${T}" class="btn btn-gold" style="text-decoration: none; justify-content: center; font-weight: 700;">
              ✉️ Open in Email Client ↗
            </a>
            <button type="button" class="btn btn-glass" id="btn-mark-pitch-sent" data-id="${e.id}">
              🟣 Mark as "Pitch Sent"
            </button>
            <button type="button" class="btn btn-burgundy btn-convert-partner-to-crm" data-id="${e.id}">
              📥 Push to CRM Deals
            </button>
          </div>
        </div>

        <div class="modal-footer" style="justify-content: space-between;">
          <span style="font-size: 11px; color: var(--text-muted);">
            Tip: Export CSV anytime to run automated batch mailings via Mailmeteor or YAMM.
          </span>
          <button type="button" class="btn btn-glass btn-sm" id="btn-cancel-pitch-modal">Close</button>
        </div>
      </div>
    </div>
  `}function Qt(e){const n=e.clientName||"Chris",a=e.eventType||"Birthday Celebration",r=e.eventDate||"2027-06-19",i=e.recommendedTiming||"7pm–10pm",c=e.packageName||"3-Hour Birthday Package",l=e.totalPrice||350,u=e.backdrop==="ivory"?"Ivory Elegance Silk Curtain":"Burgundy Velvet Curtain";return`
    <div class="modal-overlay active" id="proposal-modal-overlay">
      <div class="modal-container" style="max-width: 900px;">
        <div class="modal-header">
          <h3 class="modal-title">🖼️ SnapSuites Luxury Client Proposal</h3>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-gold btn-sm" id="btn-print-proposal">
              🖨️ Print / Save as PDF
            </button>
            <button class="modal-close-btn" id="btn-close-proposal-modal">&times;</button>
          </div>
        </div>

        <div class="modal-body" style="background: #F8FAFC;">
          <div class="printable-proposal-card" id="printable-area">
            <div class="proposal-banner">
              <div>
                <div class="proposal-logo">📸 SNAPSUITES</div>
                <div style="font-size: 12px; color: #64748B; font-weight: 600;">LUXURY PHOTOBOOTH HIRE • NORTH WEST & YORKSHIRE</div>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 14px; font-weight: 700; color: #800020;">OFFICIAL QUOTE PROPOSAL</div>
                <div style="font-size: 12px; color: #64748B;">Date: ${new Date().toLocaleDateString("en-GB")}</div>
              </div>
            </div>

            <div style="margin-bottom: 20px;">
              <h2 style="font-size: 20px; font-weight: 700; color: #0F172A; margin-bottom: 4px;">Prepared for ${n}</h2>
              <p style="font-size: 14px; color: #475569;">${a} • ${r}</p>
            </div>

            <div class="proposal-image-gallery">
              <img src="/assets/snapsuites_booth.jpg" alt="SnapSuites Vintage Photobooth" class="proposal-img" />
              <img src="/assets/snapsuites_prints.jpg" alt="SnapSuites Photo Print Strips" class="proposal-img" />
            </div>

            <div style="background: #F1F5F9; border-radius: 12px; padding: 20px; margin: 20px 0;">
              <h3 style="font-size: 16px; font-weight: 700; color: #800020; margin-bottom: 12px;">The Interactive Vintage Photobooth Experience</h3>
              <p style="font-size: 13px; color: #334155; line-height: 1.6; margin-bottom: 12px;">
                Our interactive vintage photobooth is a stylish, statement booth designed to be a centerpiece of the evening rather than just a photo-taking station. It features a large interactive screen on the back, personalised with photos or videos of the guest of honour throughout your event.
              </p>
              <ul style="font-size: 13px; color: #334155; line-height: 1.8; padding-left: 18px;">
                <li><strong>Recommended Hire Time:</strong> ${i} (the evening sweet-spot)</li>
                <li><strong>Backdrop Choice:</strong> ${u}</li>
                <li><strong>Props:</strong> Luxury curated prop selection</li>
                <li><strong>Sharing:</strong> Instant digital sharing via QR code, SMS & Email</li>
              </ul>
            </div>

            <div style="border: 2px solid #800020; border-radius: 12px; padding: 20px; display: flex; justify-content: space-between; align-items: center; background: #FFF5F7;">
              <div>
                <div style="font-size: 12px; font-weight: 700; color: #800020; text-transform: uppercase;">Selected Package</div>
                <div style="font-size: 18px; font-weight: 800; color: #0F172A;">${c}</div>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 12px; color: #64748B;">Total Investment</div>
                <div style="font-size: 28px; font-weight: 800; color: #800020; font-family: sans-serif;">${F(l)}</div>
              </div>
            </div>

            <div style="margin-top: 28px; text-align: center; border-top: 1px solid #E2E8F0; padding-top: 20px; font-size: 12px; color: #64748B;">
              <div>SnapSuites Luxury Photobooth Hire • www.snapsuites.co.uk</div>
              <div>Contact: bookings@snapsuites.co.uk</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}function Kt(e){return`
    <div class="modal-overlay active" id="settings-modal-overlay">
      <div class="modal-container" style="max-width: 500px;">
        <div class="modal-header">
          <h3 class="modal-title">⚙️ Sales Rep Settings</h3>
          <button class="modal-close-btn" id="btn-close-settings-modal">&times;</button>
        </div>

        <form id="settings-form" class="modal-body">
          <div class="form-group">
            <label class="form-label">Sales Representative Name</label>
            <input type="text" id="settings-rep-name" class="form-control" value="${e.salesRepName||"Sales Representative"}" required />
          </div>

          <div class="form-group">
            <label class="form-label">Monthly Sales Revenue Target (£)</label>
            <input type="number" id="settings-monthly-target" class="form-control" value="${e.monthlyTarget||3e3}" required step="100" min="500" />
          </div>

          <div class="form-group">
            <label class="form-label">Default Sales Commission Rate (%)</label>
            <input type="number" id="settings-commission-rate" class="form-control" value="${e.defaultCommissionRate||10}" required step="0.5" min="1" max="50" />
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">
              E.g., 10% commission on a £350 Birthday booking = £35 payout.
            </div>
          </div>

          <div style="border-top: 1px solid var(--border-light); padding-top: 16px; margin-top: 8px;">
            <div style="font-size: 13px; font-weight: 700; color: var(--gold-light); margin-bottom: 8px;">Data & Backup Tools</div>
            <div style="display: flex; gap: 8px;">
              <button type="button" class="btn btn-glass btn-sm" id="btn-reset-demo-data">
                🔄 Reset to Demo Data
              </button>
              <button type="button" class="btn btn-glass btn-sm" id="btn-export-csv-settings">
                📄 Export Leads CSV
              </button>
            </div>
          </div>

          <div class="modal-footer" style="padding: 0; margin-top: 12px;">
            <button type="button" class="btn btn-glass" id="btn-cancel-settings">Cancel</button>
            <button type="submit" class="btn btn-gold">💾 Save Settings</button>
          </div>
        </form>
      </div>
    </div>
  `}let D=at(),U=dt(),ee=ct();St();let O=lt(),j="directory",ge="",je="all",qe="all",ve="all",Ze=null,mt="",gt="all",vt="all",ht="",yt="all",L={clientName:"Chris",eventType:"Birthday Celebration",eventDate:"2027-06-19",recommendedTiming:"7pm–10pm",packageId:"birthday-3h",backdrop:"burgundy",selectedAddons:["rear_screen_custom"]},bt="all",w=null,ke=null,Xe=null,et=null,ft=null;function Yt(){g()}function g(){const e=document.getElementById("app"),n=document.getElementById("modal-root"),a=Lt(D,ee,j);let r="";j==="pipeline"?r=Mt(D,mt,gt,vt):j==="directory"?r=_t(O,ge,je,qe,ve):j==="prospecting"?r=Wt(U,ht,yt):j==="guide"?r=Dt():j==="quote"?r=Rt(L,D):j==="playbook"?r=Ht(bt):j==="calendar"?r=Vt(D):j==="analytics"&&(r=zt(D,ee)),e.innerHTML=`
    ${a}
    <main class="tab-content-container">
      ${r}
    </main>
  `,w==="lead"?n.innerHTML=jt(ke):w==="prospect"?n.innerHTML=qt(Xe):w==="clip"?n.innerHTML=Gt():w==="pitch"?n.innerHTML=Jt(et,ee.salesRepName||"Luca"):w==="directory_sync"?n.innerHTML=Ot(Ze):w==="proposal"?n.innerHTML=Qt(ft||L):w==="settings"?n.innerHTML=Kt(ee):n.innerHTML="",Zt()}function Zt(){var r,i,c,l,u,T,R,m,k,_,oe,ie,le,M,de,ce,pe,Be,Ne,Te,$e,Le,Me,Ie,We,Ae,De,ye,ue,be,Re,He,Fe,o,t,h,b,f,x,C,y,S,N,I,$,W,H,E,z,q,G,Z;document.querySelectorAll(".tab-btn").forEach(s=>{s.addEventListener("click",d=>{j=d.currentTarget.dataset.tab,g()})}),(r=document.getElementById("btn-quick-new-lead"))==null||r.addEventListener("click",()=>{ke=null,w="lead",g()}),(i=document.getElementById("btn-quick-quote"))==null||i.addEventListener("click",()=>{j="quote",g()}),(c=document.getElementById("btn-settings-trigger"))==null||c.addEventListener("click",()=>{w="settings",g()}),(l=document.getElementById("btn-export-trigger"))==null||l.addEventListener("click",()=>{Tt(),A("📥 Data backup exported successfully as JSON!")});const e=document.getElementById("pipeline-search-input");e&&e.addEventListener("input",s=>{mt=s.target.value,g()}),(u=document.getElementById("pipeline-stage-filter"))==null||u.addEventListener("change",s=>{gt=s.target.value,g()}),(T=document.getElementById("pipeline-source-filter"))==null||T.addEventListener("change",s=>{vt=s.target.value,g()}),(R=document.getElementById("btn-add-lead-kanban"))==null||R.addEventListener("click",()=>{ke=null,w="lead",g()}),document.querySelectorAll(".stage-change-trigger").forEach(s=>{s.addEventListener("change",d=>{const v=d.target.dataset.leadId,p=d.target.value;Xt(v,p)})}),document.querySelectorAll(".btn-edit-lead").forEach(s=>{s.addEventListener("click",d=>{const v=d.currentTarget.dataset.leadId;ke=D.find(p=>p.id===v),w="lead",g()})}),document.querySelectorAll(".btn-lead-quote").forEach(s=>{s.addEventListener("click",d=>{const v=d.currentTarget.dataset.leadId,p=D.find(P=>P.id===v);p&&(L={clientName:p.clientName,eventType:p.eventType,eventDate:p.eventDate,recommendedTiming:p.recommendedTiming||"7pm–10pm",packageId:p.packageId||"birthday-3h",backdrop:p.backdrop||"burgundy",selectedAddons:p.addOns||[]},j="quote",g())})});const n=document.getElementById("prospect-search-input");n&&n.addEventListener("input",s=>{ht=s.target.value,g()}),(m=document.getElementById("prospect-status-filter"))==null||m.addEventListener("change",s=>{yt=s.target.value,g()}),(k=document.getElementById("btn-add-prospect"))==null||k.addEventListener("click",()=>{Xe=null,w="prospect",g()}),document.querySelectorAll(".prospect-status-change").forEach(s=>{s.addEventListener("change",d=>{const v=d.target.dataset.prospectId,p=d.target.value,P=U.find(B=>B.id===v);P&&(P.status=p,ze(U),A("Outreach status updated!"),g())})}),document.querySelectorAll(".btn-edit-prospect").forEach(s=>{s.addEventListener("click",d=>{const v=d.currentTarget.dataset.prospectId;Xe=U.find(p=>p.id===v),w="prospect",g()})}),document.querySelectorAll(".btn-convert-prospect").forEach(s=>{s.addEventListener("click",d=>{const v=d.currentTarget.dataset.prospectId,p=U.find(P=>P.id===v);if(p){p.status="converted",ze(U);const P={id:"lead-"+Date.now(),clientName:p.contactPerson||p.name,contactEmail:p.contactEmail||"",contactPhone:p.contactPhone||"",eventType:p.category.includes("Wedding")?"Wedding":"Celebration",eventDate:new Date(Date.now()+60*24*60*60*1e3).toISOString().slice(0,10),recommendedTiming:"7pm–10pm",venue:p.name+" ("+p.location+")",source:p.preferredChannel||"Outreach",packageId:p.targetPackage||"birthday-3h",backdrop:"burgundy",dealValue:350,stage:"quote_sent",notes:`Converted from Prospecting Radar. ${p.notes||""}`,addOns:[],commissionRate:ee.defaultCommissionRate||10,createdAt:new Date().toISOString()};D.unshift(P),me(D),A(`⚡ ${p.name} converted to active CRM lead & quote!`),j="pipeline",g()}})});const a=document.getElementById("directory-search-input");a&&(a.addEventListener("input",s=>{ge=s.target.value}),a.addEventListener("keydown",s=>{s.key==="Enter"&&(ge=s.target.value,g())})),(_=document.getElementById("btn-submit-directory-search"))==null||_.addEventListener("click",()=>{const s=document.getElementById("directory-search-input");s&&(ge=s.value),g()}),(oe=document.getElementById("directory-category-filter"))==null||oe.addEventListener("change",s=>{je=s.target.value,g()}),(ie=document.getElementById("directory-status-filter"))==null||ie.addEventListener("change",s=>{qe=s.target.value,g()}),(le=document.getElementById("directory-week-filter"))==null||le.addEventListener("change",s=>{ve=s.target.value,g()}),document.querySelectorAll(".week-filter-card").forEach(s=>{s.addEventListener("click",d=>{const v=d.currentTarget.dataset.week;ve=ve===v?"all":v,g()})}),(M=document.getElementById("btn-reset-directory-filters"))==null||M.addEventListener("click",()=>{ge="",je="all",qe="all",ve="all",g()}),(de=document.getElementById("btn-empty-reset-directory"))==null||de.addEventListener("click",()=>{ge="",je="all",qe="all",ve="all",g()}),(ce=document.getElementById("btn-export-directory-csv"))==null||ce.addEventListener("click",()=>{Bt(O),A("📥 Target Directory exported as CSV for Google Sheets!")}),(pe=document.getElementById("btn-open-sync-sheet-modal"))==null||pe.addEventListener("click",()=>{Ze=null,w="directory_sync",g()}),(Be=document.getElementById("btn-add-partner-modal"))==null||Be.addEventListener("click",()=>{Ze=null,w="directory_sync",g()}),document.querySelectorAll(".directory-status-select").forEach(s=>{s.addEventListener("change",d=>{const v=d.target.dataset.id,p=d.target.value,P=O.find(B=>B.id===v);P&&(P.status=p,xe(O),A(`Updated status for ${P.name}!`),g())})}),document.querySelectorAll(".btn-directory-pitch-trigger").forEach(s=>{s.addEventListener("click",d=>{const v=d.currentTarget.dataset.id;et=O.find(p=>p.id===v),et&&(w="pitch",g())})}),document.querySelectorAll(".btn-convert-partner-to-crm").forEach(s=>{s.addEventListener("click",d=>{const v=d.currentTarget.dataset.id,p=O.find(P=>P.id===v);if(p){const P={id:"lead-"+Date.now(),clientName:p.name+" ("+p.category+")",contactEmail:p.email||"",contactPhone:p.phone||"",eventType:"Strategic B2B Partnership",eventDate:new Date(Date.now()+2592e6).toISOString().slice(0,10),recommendedTiming:"7pm–10pm",venue:p.name+", "+p.area,source:"B2B Directory ("+p.category+")",packageId:"birthday-3h",backdrop:"burgundy",dealValue:500,stage:p.status==="partner_agreed"?"won":p.status==="pitch_sent"?"contacted":"new",notes:`Target Directory Partner. Best Angle: ${p.bestAngle}. Phone: ${p.phone}. Email: ${p.email}. ${p.notes||""}`,addOns:["rear_screen_custom"],commissionRate:ee.defaultCommissionRate||10,createdAt:new Date().toISOString()};D.unshift(P),me(D),p.status="pitch_sent",xe(O),w=null,A(`🎉 ${p.name} pushed to CRM Pipeline as an active B2B deal!`),j="pipeline",g()}})}),(Ne=document.getElementById("btn-copy-pitch-script"))==null||Ne.addEventListener("click",()=>{var d;const s=(d=document.getElementById("pitch-script-textarea"))==null?void 0:d.value;s&&(navigator.clipboard.writeText(s),A("📋 Pitch script copied! Ready to paste into your email or DM."))}),(Te=document.getElementById("btn-mark-pitch-sent"))==null||Te.addEventListener("click",s=>{const d=s.currentTarget.dataset.id,v=O.find(p=>p.id===d);v&&(v.status="pitch_sent",xe(O)),A('🟣 Outreach marked as "Pitch Sent"!'),w=null,g()}),($e=document.getElementById("btn-close-quick-pitch-modal"))==null||$e.addEventListener("click",()=>{w=null,g()}),(Le=document.getElementById("btn-cancel-pitch-modal"))==null||Le.addEventListener("click",()=>{w=null,g()}),(Me=document.getElementById("tab-add-single-partner"))==null||Me.addEventListener("click",()=>{const s=document.getElementById("form-single-partner"),d=document.getElementById("form-bulk-sheet");s&&d&&(s.style.display="flex",d.style.display="none",document.getElementById("tab-add-single-partner").className="btn btn-sm btn-gold",document.getElementById("tab-paste-sheet-data").className="btn btn-sm btn-glass")}),(Ie=document.getElementById("tab-paste-sheet-data"))==null||Ie.addEventListener("click",()=>{const s=document.getElementById("form-single-partner"),d=document.getElementById("form-bulk-sheet");s&&d&&(s.style.display="none",d.style.display="flex",document.getElementById("tab-add-single-partner").className="btn btn-sm btn-glass",document.getElementById("tab-paste-sheet-data").className="btn btn-sm btn-gold")}),(We=document.getElementById("form-single-partner"))==null||We.addEventListener("submit",s=>{var K,Y,ne,se,re,fe,Ve,ot,nt,rt;s.preventDefault();const d=(K=document.getElementById("partner-id"))==null?void 0:K.value,v=(Y=document.getElementById("partner-name"))==null?void 0:Y.value.trim(),p=(ne=document.getElementById("partner-category"))==null?void 0:ne.value.trim(),P=(se=document.getElementById("partner-contact"))==null?void 0:se.value.trim(),B=(re=document.getElementById("partner-area"))==null?void 0:re.value.trim(),V=(fe=document.getElementById("partner-week"))==null?void 0:fe.value,te=(Ve=document.getElementById("partner-email"))==null?void 0:Ve.value.trim(),Q=(ot=document.getElementById("partner-phone"))==null?void 0:ot.value.trim(),X=(nt=document.getElementById("partner-angle"))==null?void 0:nt.value.trim(),ae=(rt=document.getElementById("partner-notes"))==null?void 0:rt.value.trim();if(d){const Qe=O.findIndex(xt=>xt.id===d);Qe!==-1&&(O[Qe]={...O[Qe],name:v,venueName:v,companyName:v,contactName:P||"Events Team",category:p,area:B,targetWeek:V,email:te,phone:Q,boothStyle:X,bestAngle:X,notes:ae})}else O.unshift({id:"dir-"+Date.now(),name:v,venueName:v,companyName:v,contactName:P||"Events Team",category:p,area:B,boothStyle:X,bestAngle:X,email:te,phone:Q,status:"not_contacted",targetWeek:V,notes:ae});xe(O),w=null,A(`💾 Saved ${v} to Target Directory!`),g()}),(Ae=document.getElementById("btn-submit-bulk-import"))==null||Ae.addEventListener("click",()=>{var p;const s=(p=document.getElementById("bulk-csv-input"))==null?void 0:p.value.trim();if(!s){A("⚠️ Please paste CSV lines first.");return}const d=s.split(`
`).filter(P=>P.trim().length>0);let v=0;d.forEach(P=>{const B=P.split(",").map(V=>V.replace(/^"|"$/g,"").trim());if(B.length>=2&&!B[0].toLowerCase().includes("email")&&!B[0].toLowerCase().includes("organization")){const V=B[0].includes("@"),te=V?B[0]:B[4]||"",Q=V?B[1]||"Partner Venue":B[0],X=V?B[2]||Q:B[1]||Q,ae=V?B[3]||"Events Team":B[2]||"Events Team",K=V?B[4]||"Vintage Handcrafted Booth":B[3]||"Vintage Handcrafted Booth",Y=V?B[5]||"Luxury Venue":B[1]||"Luxury Venue",ne=V?B[6]||"Cheshire":B[2]||"Cheshire",se=V?B[7]||"":B[5]||"";O.push({id:"dir-"+Math.random().toString(36).substring(2,9),name:Q,venueName:Q,companyName:X,contactName:ae,boothStyle:K,bestAngle:K,category:Y,area:ne,email:te,phone:se,status:"not_contacted",targetWeek:"Week 1",notes:"Imported from Google Sheet / CSV"}),v++}}),xe(O),w=null,A(`✅ Imported ${v} organizations into Target Directory!`),g()}),(De=document.getElementById("btn-close-sync-modal"))==null||De.addEventListener("click",()=>{w=null,g()}),(ye=document.getElementById("btn-cancel-sync-modal"))==null||ye.addEventListener("click",()=>{w=null,g()}),(ue=document.getElementById("btn-cancel-bulk-modal"))==null||ue.addEventListener("click",()=>{w=null,g()}),(be=document.getElementById("quote-client-name"))==null||be.addEventListener("input",s=>{L.clientName=s.target.value,_e()}),(Re=document.getElementById("quote-event-type"))==null||Re.addEventListener("input",s=>{L.eventType=s.target.value,_e()}),(He=document.getElementById("quote-event-date"))==null||He.addEventListener("change",s=>{L.eventDate=s.target.value,_e()}),(Fe=document.getElementById("quote-recommended-timing"))==null||Fe.addEventListener("input",s=>{L.recommendedTiming=s.target.value,_e()}),document.querySelectorAll(".package-card").forEach(s=>{s.addEventListener("click",d=>{L.packageId=d.currentTarget.dataset.packageId,g()})}),document.querySelectorAll('input[name="backdrop-choice"]').forEach(s=>{s.addEventListener("change",d=>{L.backdrop=d.target.value,g()})}),document.querySelectorAll(".addon-checkbox").forEach(s=>{s.addEventListener("change",d=>{const v=d.target.dataset.addonId;d.target.checked?L.selectedAddons.includes(v)||L.selectedAddons.push(v):L.selectedAddons=L.selectedAddons.filter(p=>p!==v),g()})}),(o=document.getElementById("btn-copy-quote-text"))==null||o.addEventListener("click",()=>{var d;const s=(d=document.getElementById("proposal-text-preview"))==null?void 0:d.innerText;s&&(navigator.clipboard.writeText(s),A("📋 Bark / Email Proposal copied to clipboard!"))}),(t=document.getElementById("btn-open-printable-proposal"))==null||t.addEventListener("click",()=>{const s=J.find(v=>v.id===L.packageId)||J[1];let d=s.price;(L.selectedAddons||[]).forEach(v=>{const p=Ee.find(P=>P.id===v);p&&(d+=p.price)}),ft={...L,packageName:s.name,totalPrice:d},w="proposal",g()}),(h=document.getElementById("btn-save-quote-to-pipeline"))==null||h.addEventListener("click",()=>{const s=J.find(p=>p.id===L.packageId)||J[1];let d=s.price;(L.selectedAddons||[]).forEach(p=>{const P=Ee.find(B=>B.id===p);P&&(d+=P.price)});const v={id:"lead-"+Date.now(),clientName:L.clientName||"New Client",contactEmail:"",contactPhone:"",eventType:L.eventType||"Party",eventDate:L.eventDate||new Date().toISOString().slice(0,10),recommendedTiming:L.recommendedTiming||"7pm–10pm",venue:"North West Venue",source:"Bark",packageId:L.packageId,backdrop:L.backdrop,dealValue:d,stage:"quote_sent",notes:`Generated quote for ${s.name}. Total: £${d}.`,addOns:[...L.selectedAddons],commissionRate:ee.defaultCommissionRate||10,createdAt:new Date().toISOString()};D.unshift(v),me(D),A("💾 Quote saved as active lead in CRM!"),j="pipeline",g()}),document.querySelectorAll(".playbook-filter-btn").forEach(s=>{s.addEventListener("click",d=>{bt=d.currentTarget.dataset.category,g()})}),document.querySelectorAll(".btn-copy-template").forEach(s=>{s.addEventListener("click",d=>{const v=d.currentTarget.dataset.templateId,p=it.find(P=>P.id===v);p&&(navigator.clipboard.writeText(p.body),A("📋 Script copied to clipboard!"))})}),(b=document.getElementById("btn-add-event-calendar"))==null||b.addEventListener("click",()=>{ke=null,w="lead",g()}),(f=document.getElementById("lead-form"))==null||f.addEventListener("submit",s=>{s.preventDefault();const d=document.getElementById("lead-id-field").value,v=document.getElementById("lead-client-name").value,p=document.getElementById("lead-event-type").value,P=document.getElementById("lead-email").value,B=document.getElementById("lead-phone").value,V=document.getElementById("lead-event-date").value,te=document.getElementById("lead-timing").value,Q=document.getElementById("lead-venue").value,X=document.getElementById("lead-source").value,ae=document.getElementById("lead-package").value,K=document.getElementById("lead-stage").value,Y=Number(document.getElementById("lead-deal-value").value)||350,ne=document.getElementById("lead-backdrop").value,se=document.getElementById("lead-notes").value,re=D.findIndex(Ve=>Ve.id===d),fe={id:d,clientName:v,eventType:p,contactEmail:P,contactPhone:B,eventDate:V,recommendedTiming:te,venue:Q,source:X,packageId:ae,stage:K,dealValue:Y,backdrop:ne,notes:se,addOns:re>=0?D[re].addOns||[]:[],commissionRate:ee.defaultCommissionRate||10,createdAt:re>=0?D[re].createdAt:new Date().toISOString()};re>=0?(D[re]=fe,A("✏️ Lead updated successfully!")):(D.unshift(fe),A("🎉 New lead added to CRM pipeline!")),me(D),w=null,g()}),(x=document.getElementById("btn-delete-lead"))==null||x.addEventListener("click",s=>{const d=s.currentTarget.dataset.leadId;confirm("Are you sure you want to delete this lead?")&&(D=D.filter(v=>v.id!==d),me(D),w=null,A("🗑️ Lead deleted."),g())}),(C=document.getElementById("btn-cancel-lead-modal"))==null||C.addEventListener("click",()=>{w=null,g()}),(y=document.getElementById("btn-close-lead-modal"))==null||y.addEventListener("click",()=>{w=null,g()}),(S=document.getElementById("prospect-form"))==null||S.addEventListener("submit",s=>{s.preventDefault();const d=document.getElementById("prospect-id-field").value,v=document.getElementById("prospect-name").value,p=document.getElementById("prospect-contact-person").value,P=document.getElementById("prospect-category").value,B=document.getElementById("prospect-location").value,V=document.getElementById("prospect-channel").value,te=document.getElementById("prospect-status").value,Q=document.getElementById("prospect-email").value,X=document.getElementById("prospect-phone").value,ae=document.getElementById("prospect-notes").value,K=U.findIndex(ne=>ne.id===d),Y={id:d,name:v,contactPerson:p,category:P,location:B,preferredChannel:V,status:te,contactEmail:Q,contactPhone:X,notes:ae,targetPackage:"birthday-3h"};K>=0?(U[K]=Y,A("✏️ Prospect updated!")):(U.unshift(Y),A("🎯 New potential customer added to Radar!")),ze(U),w=null,g()}),(N=document.getElementById("btn-delete-prospect"))==null||N.addEventListener("click",s=>{const d=s.currentTarget.dataset.prospectId;confirm("Delete this potential customer?")&&(U=U.filter(v=>v.id!==d),ze(U),w=null,A("🗑️ Prospect deleted."),g())}),(I=document.getElementById("btn-cancel-prospect-modal"))==null||I.addEventListener("click",()=>{w=null,g()}),($=document.getElementById("btn-close-prospect-modal"))==null||$.addEventListener("click",()=>{w=null,g()}),(W=document.getElementById("btn-close-proposal-modal"))==null||W.addEventListener("click",()=>{w=null,g()}),(H=document.getElementById("btn-print-proposal"))==null||H.addEventListener("click",()=>{window.print()}),(E=document.getElementById("settings-form"))==null||E.addEventListener("submit",s=>{s.preventDefault(),ee.salesRepName=document.getElementById("settings-rep-name").value,ee.monthlyTarget=Number(document.getElementById("settings-monthly-target").value)||3e3,ee.defaultCommissionRate=Number(document.getElementById("settings-commission-rate").value)||10,Et(ee),w=null,A("⚙️ Settings saved!"),g()}),(z=document.getElementById("btn-cancel-settings"))==null||z.addEventListener("click",()=>{w=null,g()}),(q=document.getElementById("btn-close-settings-modal"))==null||q.addEventListener("click",()=>{w=null,g()}),(G=document.getElementById("btn-reset-demo-data"))==null||G.addEventListener("click",()=>{if(confirm("Reset all leads and prospects to initial demo dataset?")){const s=Pt();D=s.leads,U=s.prospects,saveRealPosts([]),w=null,A("🔄 Dataset reset to demo defaults."),g()}}),(Z=document.getElementById("btn-export-csv-settings"))==null||Z.addEventListener("click",()=>{Nt(),A("📄 Leads exported as CSV!")})}function Xt(e,n){const a=D.find(r=>r.id===e);a&&(a.stage=n,me(D),n==="secured"?(kt({particleCount:120,spread:70,origin:{y:.6}}),A(`🎉 CONGRATS! Booking secured for ${a.clientName} (£${a.dealValue})!`)):A(`Stage updated to ${n.replace("_"," ")}`),g())}function _e(){const e=J.find(i=>i.id===L.packageId)||J[1];let n=e.price;const a=(L.selectedAddons||[]).map(i=>Ee.find(c=>c.id===i)).filter(Boolean);a.forEach(i=>n+=i.price);const r=document.getElementById("proposal-text-preview");r&&(r.innerText=ut(L,e,a,n))}function A(e){const n=document.getElementById("toast-container");if(!n)return;const a=document.createElement("div");a.className="toast",a.innerHTML=`<span>${e}</span>`,n.appendChild(a),setTimeout(()=>{a.remove()},3500)}document.addEventListener("DOMContentLoaded",Yt);
