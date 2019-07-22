 /**
 * Jeeliz Face Filter - https://github.com/jeeliz/jeelizFaceFilter
 *
 * Copyright 2018 Jeeliz ( https://jeeliz.com )
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

var JEEFACEFILTERAPI=(function(){function ja(b,c,f){return b*(1-f)+c*f}function ya(b,c){var f=new XMLHttpRequest;f.open("GET",b,!0);f.withCredentials=!1;f.onreadystatechange=function(){4===f.readyState&&200===f.status&&c(f.responseText)};f.send()}function Da(b,c,f){return Math.min(Math.max((f-b)/(c-b),0),1)}
function Ea(b){switch(b){case "relu":return"gl_FragColor=max(vec4(0.,0.,0.,0.),gl_FragColor);";case "elu":return"gl_FragColor=mix(exp(-abs(gl_FragColor))-vec4(1.,1.,1.,1.),gl_FragColor,step(0.,gl_FragColor));";case "elu01":return"gl_FragColor=mix(0.1*exp(-abs(gl_FragColor))-vec4(0.1,0.1,0.1,0.1),gl_FragColor,step(0.,gl_FragColor));";case "arctan":return"gl_FragColor=atan(3.14159265359*texture2D(u0,vUV))/3.14159265359;";case "copy":return"";default:return!1}}
function Fa(b,c){var f=c%8;return b[(c-f)/8]>>7-f&1}
function Ha(b){var c=JSON.parse(b);b=c.ne;var f=c.nf,l=c.n,m="undefined"===typeof btoa?Buffer.from(c.data,"base64").toString("latin1"):atob(c.data),k=m.length,t;c=new Uint8Array(k);for(t=0;t<k;++t)c[t]=m.charCodeAt(t);m=new Float32Array(l);k=new Float32Array(f);t=b+f+1;var n,h;for(n=0;n<l;++n){var p=t*n;var v=0===Fa(c,p)?1:-1;var u=p+1;var E=1,H=0;for(h=u+b-1;h>=u;--h)H+=E*Fa(c,h),E*=2;h=H;u=c;E=p+1+b;H=k;var Q=0,R=H.length;for(p=E;p<E+R;++p)H[Q]=Fa(u,p),++Q;for(p=u=0;p<f;++p)u+=k[p]*Math.pow(2,-p-
1);v=0===u&&0===h?0:v*(1+u)*Math.pow(2,1+h-Math.pow(2,b-1));m[n]=v}return m}
var r=function(){function b(g,B){g=a.createShader(g);a.shaderSource(g,B);a.compileShader(g);return a.getShaderParameter(g,a.COMPILE_STATUS)?g:!1}function c(g,B){g=b(a.VERTEX_SHADER,g);B=b(a.FRAGMENT_SHADER,B);var C=a.createProgram();a.attachShader(C,g);a.attachShader(C,B);a.linkProgram(C);return C}function f(g){void 0===g.Y&&(g.Y="precision lowp float;attribute vec2 a0;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=a0*.5+vec2(.5,.5);}");void 0===g.sa&&(g.sa=["a0"]);void 0===g.da&&(g.da=
[2]);if(void 0===g.precision||"highp"===g.precision)g.precision=h;g.id=t++;void 0!==g.Pc&&g.Pc.forEach(function(C,da){g.c=g.c.replace(C,g.Da[da])});g.bb=0;g.da.forEach(function(C){g.bb+=4*C});g.Ca=c(g.Y,"precision "+g.precision+" float;\n"+g.c);g.m={};g.f.forEach(function(C){g.m[C]=a.getUniformLocation(g.Ca,C)});g.attributes={};g.ea=[];g.sa.forEach(function(C){var da=a.getAttribLocation(g.Ca,C);g.attributes[C]=da;g.ea.push(da)});if(g.h){a.useProgram(g.Ca);k=g;m=g.id;for(var B in g.h)a.uniform1i(g.m[B],
g.h[B])}g.Kd=!0}function l(g){Ia.Wc(L);m!==g.id&&(L.X(),m=g.id,k=g,a.useProgram(g.Ca),g.ea.forEach(function(B){0!==B&&a.enableVertexAttribArray(B)}))}var m=-1,k=!1,t=0,n=!1,h="highp",p=["u1"],v=["u0"],u={u1:0},E={u0:0},H={u1:0,u2:1},Q={u3:0},R={s0:{c:"uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",f:p,h:u},s1:{c:"uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",f:p,h:u,precision:"lowp"},s2:{c:"uniform sampler2D u1,u2;varying vec2 vv0;void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a*b;}",
f:["u1","u2"],h:H},s3:{c:"uniform sampler2D u1;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a.r*f;}",f:p,h:u},s4:{c:"uniform sampler2D u1,u2;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a.a*b.r*f;}",f:["u1","mask"],h:H},s5:{c:"uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(1.-vv0.x,vv0.y));}",f:p,h:u},s6:{c:"uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(vv0.x,1.-vv0.y));}",
f:p,h:u},s7:{c:"uniform sampler2D u0;uniform float u4;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=a*u4;}",f:["u0","u4"],h:E},s8:{c:"uniform sampler2D u0;uniform float u4;varying vec2 vv0;const vec4 g=vec4(.25,.25,.25,.25),e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);float b=dot(a*u4,g);gl_FragColor=b*e;}",f:["u0","u4"],h:E},s9:{c:"uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){float a=.25*dot(e,texture2D(u1,vv0));gl_FragColor=a*e;}",
f:p,h:u},s10:{c:"uniform sampler2D u1,u5;uniform float u6;const vec4 f=vec4(1.,1.,1.,1.);varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u5,vv0);gl_FragColor=mix(b,a,u6*f);}",f:["u1","u5","u6"],h:{u1:0,u5:1}},s11:{c:"uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;void main(){gl_FragColor=.25*(texture2D(u1,vv0+u7)+texture2D(u1,vv0+u7*vec2(1.,-1.))+texture2D(u1,vv0+u7*vec2(-1.,-1.))+texture2D(u1,vv0+u7*vec2(-1.,1.)));}",f:["u1","u7"],h:u},s12:{c:"uniform sampler2D u1;uniform vec4 u8;varying vec2 vv0;float g(float a,float b){a=floor(a)+.5;return floor(a/exp2(b));}float h(float a,float b){return floor(a*exp2(b)+.5);}float i(float a,float b){return mod(a,h(1.,b));}float e(float c,float a,float b){a=floor(a+.5),b=floor(b+.5);return i(g(c,a),b-a);}vec4 k(float a){if(a==0.)return vec4(0.,0.,0.,0.);float l=128.*step(a,0.);a=abs(a);float c=floor(log2(a)),m=c+127.,b=(a/exp2(c)-1.)*8388608.,d=m/2.,n=fract(d)*2.,o=floor(d),p=e(b,0.,8.),q=e(b,8.,16.),r=n*128.+e(b,16.,23.),j=l+o;return vec4(p,q,r,j)/255.;}void main(){float a=dot(texture2D(u1,vv0),u8);gl_FragColor=k(a);}",
f:["u1","u8"],h:u},s13:{c:"uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=e/(e+exp(-a));gl_FragColor=b;}",f:v,h:E},s14:{c:"uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(0.,0.,0.,0.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=max(e,a);}",f:v,h:E},s15:{c:"uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=mix(exp(-abs(a))-e,a,step(0.,a));}",f:v,h:E},s16:{c:"uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=exp(-abs(a))-e;gl_FragColor=mix(.1*b,a,step(0.,a));}",
f:v,h:E},s17:{c:"uniform sampler2D u0,u6,u9;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),c=texture2D(u6,vv0),d=texture2D(u9,vv0),b=a/d;gl_FragColor=c*mix(exp(-abs(b))-f,b,step(0.,a));}",f:["u0","u6","u9"],h:{u0:0,u6:1,u9:2}},s18:{c:"uniform sampler2D u0;const float e=3.141593;varying vec2 vv0;void main(){gl_FragColor=atan(e*texture2D(u0,vv0))/e;}",f:v,h:E},s19:{c:"uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(.5,.5,.5,.5);void main(){vec4 a=texture2D(u0,vv0),b=log(e+a);gl_FragColor=b;}",
f:v,h:E},s20:{c:"uniform sampler2D u0;uniform float gain;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=exp(a);}",f:["u0","u10"],h:E},s21:{c:"uniform sampler2D u0,u11;uniform float u12;const vec2 f=vec2(.5,.5);const float g=1e-5;const vec4 h=vec4(1.,1.,1.,1.),i=vec4(0.,0.,0.,0.);varying vec2 vv0;void main(){vec4 a=texture2D(u11,f);float b=u12*u12;vec4 c=max(b*a,g*h);gl_FragColor=texture2D(u0,vv0)/c;}",f:["u0","u13","u12"],h:{u0:0,u13:1}},s22:{c:"uniform sampler2D u1;uniform vec2 u14;varying vec2 vv0;void main(){float a=u14.x*u14.y;vec2 b=floor(vv0*a)/a,c=fract(vv0*a),d=floor(b*u14.y),g=floor(u14.x*fract(b*u14.y)),f=(g*u14.y+d)/a;gl_FragColor=texture2D(u1,f+c/a);}",
f:["u1","u14"],h:u},s23:{c:"uniform sampler2D u15,u16,u17;varying vec2 vv0;void main(){vec4 a=texture2D(u17,vv0);vec2 b=a.rg,c=a.ba;vec4 d=texture2D(u15,b),e=texture2D(u16,c);gl_FragColor=d*e;}",f:["u15","u16","u17"],h:{u16:0,u15:1,u17:2}},s24:{c:"uniform float u18;uniform sampler2D u15,u16;varying vec2 vv0;void main(){vec2 a=fract(vv0*u18);vec4 b=texture2D(u15,vv0),c=texture2D(u16,a);gl_FragColor=b*c;}",f:["u16","u15","u18"],h:{u16:0,u15:1}},s25:{c:"uniform float u18;uniform sampler2D u15,u16,u19,u20,u21,u22;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(1e-3,1e-3,1e-3,1e-3);void main(){vec2 i=vv0*u18,m=floor(i),c=i-m;vec4 n=texture2D(u15,vv0),d=texture2D(u16,c),a=texture2D(u22,vv0);a=a*255.;vec4 o=texture2D(u19,c),p=texture2D(u20,c),q=texture2D(u21,c),j=step(-g,-a),b=e-j,k=b*step(-e-g,-a);b*=e-k;vec4 h=b*step(-2.*e-g,-a);b*=e-h;vec4 l=b;d=j*d+k*o+h*p+l*q,gl_FragColor=n*d;}",
f:"u15 u16 u18 u22 u19 u20 u21".split(" "),h:{u16:0,u15:1,u22:3,u19:4,u20:5,u21:6}},s26:{c:"uniform sampler2D u15,u16,u23;uniform float u18,u24,u25,u26;varying vec2 vv0;const vec2 j=vec2(1.,1.);void main(){vec2 a=floor(u24*vv0),g=u24*vv0-a;float b=u18/u24;vec2 c=floor(g*b),d=g*b-c,h=(a+d)/u24;float l=u24*u26/u18;vec2 m=l*c,i=(m+d*u25)/u26,e=step(i,j);vec4 n=texture2D(u15,h),o=texture2D(u16,i),p=n*o*e.x*e.y,k=texture2D(u23,h);gl_FragColor=p*u25*u25+k;}",f:"u15 u16 u18 u24 u25 u26 u23".split(" "),h:{u16:0,
u15:1,u23:2}},s27:{c:"uniform sampler2D u15,u16;varying vec2 vv0;void main(){vec4 a=texture2D(u15,vv0),b=texture2D(u16,vv0);gl_FragColor=a*b;}",f:["u15","u16"],h:{u16:0,u15:1}},s28:{c:"uniform sampler2D u1,u23;uniform float u27;varying vec2 vv0;void main(){gl_FragColor=texture2D(u23,vv0)+u27*texture2D(u1,vv0);}",f:["u1","u23","u27"],h:{u1:0,u23:1}},s29:{c:"varying vec2 vv0;uniform sampler2D u1;const vec4 g=vec4(1.,1.,1.,1.),e=vec4(.299,.587,.114,0.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=dot(a,e)*g;}",
f:p,h:u,precision:"lowp"},s30:{c:"varying vec2 vv0;uniform sampler2D u1;uniform float u28;const vec3 e=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u28)).rgb,c=texture2D(u1,vv0+vec2(u28,u28)).rgb,d=texture2D(u1,vv0+vec2(u28,0.)).rgb;gl_FragColor=vec4(dot(a,e),dot(b,e),dot(c,e),dot(d,e));}",f:["u1","u28"],h:u,precision:"lowp"},s31:{c:"varying vec2 vv0;uniform sampler2D u1;uniform float u28;const vec3 f=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u28)).rgb,c=texture2D(u1,vv0+vec2(u28,u28)).rgb,d=texture2D(u1,vv0+vec2(u28,0.)).rgb;gl_FragColor=vec4(a.r,b.g,c.b,dot(d,f));}",
f:["u1","u28"],h:u,precision:"lowp"},s32:{c:"varying vec2 vv0;uniform sampler2D u1,u2;uniform float u29;const vec4 g=vec4(1.,1.,1.,1.);void main(){vec4 a=vec4(0.);a-=texture2D(u1,vec2(vv0.x-u29,vv0.y-u29))*1.,a-=texture2D(u1,vec2(vv0.x-u29,vv0.y))*2.,a-=texture2D(u1,vec2(vv0.x-u29,vv0.y+u29))*1.,a+=texture2D(u1,vec2(vv0.x+u29,vv0.y-u29))*1.,a+=texture2D(u1,vec2(vv0.x+u29,vv0.y))*2.,a+=texture2D(u1,vec2(vv0.x+u29,vv0.y+u29))*1.;vec4 b=vec4(0.);b-=texture2D(u1,vec2(vv0.x-u29,vv0.y-u29))*1.,b-=texture2D(u1,vec2(vv0.x,vv0.y-u29))*2.,b-=texture2D(u1,vec2(vv0.x+u29,vv0.y-u29))*1.,b+=texture2D(u1,vec2(vv0.x-u29,vv0.y+u29))*1.,b+=texture2D(u1,vec2(vv0.x,vv0.y+u29))*2.,b+=texture2D(u1,vec2(vv0.x+u29,vv0.y+u29))*1.;vec3 c=sqrt(a.rgb*a.rgb+b.rgb*b.rgb);vec4 e=vec4(c,texture2D(u1,vv0).a),f=texture2D(u2,vv0);gl_FragColor=f.a*e.r*g;}",
f:["u1","u2","u29"],h:H},s33:{c:"varying vec2 vv0;uniform sampler2D u1,u2;uniform float u29;const vec4 j=vec4(1.,1.,1.,1.);const vec2 k=vec2(1.,1.);void main(){float i=0.;vec2 l=k*u29,b,c;float d,a,g=0.;for(float f=-4.;f<=4.;f+=1.)for(float e=-4.;e<=4.;e+=1.)b=vec2(f,e),d=length(b)/2.,a=exp(-d*d),c=vv0+l*b,a=1.,i+=a*texture2D(u1,c).r,g+=a;vec4 m=texture2D(u2,vv0);gl_FragColor=m.a*(texture2D(u1,c).r-i/g)*j;}",f:["u1","u2","u29"],h:H},s34:{c:"uniform sampler2D u3;uniform vec2 u7;varying vec2 vv0;vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}const vec2 h=vec2(.5,.5),i=vec2(1.,0.),j=vec2(0.,1.);void main(){vec2 a=vv0-u7*h;vec4 b=texture2D(u3,a),c=texture2D(u3,a+u7*i),d=texture2D(u3,a+u7*j),k=texture2D(u3,a+u7),l=e(b,c),g=e(d,k);gl_FragColor=e(l,g);}",
f:["u3","u7"],h:Q},s35:{c:"uniform sampler2D u3;uniform vec2 u7;varying vec2 vv0;const vec2 j=vec2(1.,0.),k=vec2(0.,1.),l=vec2(2.,0.),m=vec2(0.,2.);vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}vec4 f(vec2 a){vec4 b=texture2D(u3,a),c=texture2D(u3,a+u7*j),d=texture2D(u3,a+u7*k),g=texture2D(u3,a+u7),i=e(b,c),h=e(d,g);return e(i,h);}void main(){vec2 a=vv0+u7*vec2(-.55,-1.05);vec4 b=f(a),c=f(a+u7*l),d=f(a+u7*2.),g=f(a+u7*m),i=e(b,c),h=e(d,g);gl_FragColor=e(i,h);}",f:["u3","u7"],h:Q},s36:{c:"uniform sampler2D u1;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a*a;}",
f:["u1"],h:u,precision:"lowp"},s37:{c:"uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;const vec4 g=vec4(1.,1.,1.,1.);const float d=15444.;void main(){vec4 a=1001./d*texture2D(u1,vv0-3.*u7)+2002./d*texture2D(u1,vv0-2.*u7)+3003./d*texture2D(u1,vv0-u7)+3432./d*texture2D(u1,vv0)+3003./d*texture2D(u1,vv0+u7)+2002./d*texture2D(u1,vv0+2.*u7)+1001./d*texture2D(u1,vv0+3.*u7);gl_FragColor=a;}",f:["u7","u1"],h:u,precision:"lowp"},s38:{c:"uniform sampler2D u1,u30,u31;varying vec2 vv0;const vec4 g=vec4(1.,1.,1.,1.);const float h=.1;void main(){vec4 a=texture2D(u30,vv0),b=texture2D(u31,vv0),c=texture2D(u1,vv0),d=max(g*h,b-a*a),f=sqrt(d);gl_FragColor=(c-a)/f;}",
f:["u1","u30","u31"],h:{u1:0,u30:1,u31:2}}},M={s39:{c:"uniform float u18,u32;uniform sampler2D u15,u16,u23;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(.01,.01);void main(){vec4 sum=texture2D(u23,vv0);float toSparsity=1.1111;vec2 uvFrom,uvWeight,xyPatch=ZERO2,eps2=EPS2/u18,xyTo=floor(vv0*u18+eps2);float weightSize=toSparsity*u18;vec2 halfFromSparsity=ONE2*(toSparsity-1.)/2.;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.)xyPatch.y=patch_y,uvFrom=(xyTo+HALF2+u32*(xyPatch-halfFromSparsity))/u18,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),uvWeight=(xyTo*toSparsity+xyPatch+HALF2)/weightSize,sum+=texture2D(u15,uvWeight)*texture2D(u16,uvFrom);}gl_FragColor=sum,gl_FragColor*=2.2222;}",
f:["u18","u15","u16","u23","u32"],Da:["1.1111","gl_FragColor\\*=2.2222;"]},s40:{c:"uniform float u18,u32,u26;uniform sampler2D u15,u16,u23;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(.01,.01);void main(){vec4 sum=texture2D(u23,vv0);float fromSparsity=1.1111,shrinkFactor=3.3333;vec2 uvFrom,uvWeight,xyFrom,xyPatchTo,xyPatch=ZERO2,xyShrink=ZERO2,eps2=EPS2/u26,xyTo=floor(vv0*u18+eps2);float weightSize=fromSparsity*u26;vec2 halfFromSparsity=ONE2*(fromSparsity-1.)/2.;float toSparsity=weightSize/u18;vec2 xyFrom0=xyTo*shrinkFactor;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.){xyPatch.y=patch_y;for(float shrink_x=0.;shrink_x<3.3333;shrink_x+=1.){xyShrink.x=shrink_x;for(float shrink_y=0.;shrink_y<3.3333;shrink_y+=1.)xyShrink.y=shrink_y,xyFrom=xyFrom0+xyShrink+shrinkFactor*u32*(xyPatch-halfFromSparsity),uvFrom=(xyFrom+HALF2)/u26,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),xyPatchTo=xyPatch*shrinkFactor+xyShrink,uvWeight=(xyTo*toSparsity+xyPatchTo+HALF2)/weightSize,sum+=texture2D(u15,uvWeight)*texture2D(u16,uvFrom);}}}gl_FragColor=sum,gl_FragColor*=2.2222;}",
f:"u18 u26 u15 u16 u23 u32".split(" "),Da:["1.1111","gl_FragColor\\*=2.2222;","3.3333"]}},L={Ua:function(){return n},l:function(){if(!n){h="highp";for(var g in R)f(R[g],g);r.set("s0");a.enableVertexAttribArray(0);g=Ja.l();n=!0;return g}},Wb:function(g){g.forEach(function(B){L.fb(B)})},fb:function(g){R[g.id]=g;f(g,g.id)},ub:function(g,B,C){B||(B=g);R[B]=Object.create(M[g]);M[g].Da&&M[g].Da.forEach(function(da,xa){R[B].c=R[B].c.replace(new RegExp(da,"g"),C[xa])});f(R[B],B)},set:function(g){l(R[g])},
qc:function(g){return"undefined"!==typeof R[g]},vd:function(){return k.sd},X:function(){-1!==m&&(m=-1,k.ea.forEach(function(g){0!==g&&a.disableVertexAttribArray(g)}))},$a:function(){var g=0;k.ea.forEach(function(B,C){C=k.da[C];a.vertexAttribPointer(B,C,a.FLOAT,!1,k.bb,g);g+=4*C})},mb:function(){a.enableVertexAttribArray(0)},na:function(){a.vertexAttribPointer(k.ea[0],2,a.FLOAT,!1,8,0)},Ob:function(g,B){a.uniform1i(k.m[g],B)},u:function(g,B){a.uniform1f(k.m[g],B)},P:function(g,B,C){a.uniform2f(k.m[g],
B,C)},Xd:function(g,B){a.uniform2fv(k.m[g],B)},Yd:function(g,B){a.uniform3fv(k.m[g],B)},Xc:function(g,B,C,da){a.uniform3f(k.m[g],B,C,da)},Pb:function(g,B){a.uniform4fv(k.m[g],B)},Zd:function(g,B){a.uniformMatrix2fv(k.m[g],!1,B)},$d:function(g,B){a.uniformMatrix3fv(k.m[g],!1,B)},ae:function(g,B){a.uniformMatrix4fv(k.m[g],!1,B)},H:function(g,B){L.set(g);B.forEach(function(C){switch(C.type){case "4f":a.uniform4fv(k.m[C.name],C.value);break;case "3f":a.uniform3fv(k.m[C.name],C.value);break;case "2f":a.uniform2fv(k.m[C.name],
C.value);break;case "1f":a.uniform1f(k.m[C.name],C.value);break;case "1i":a.uniform1i(k.m[C.name],C.value);break;case "mat2":a.uniformMatrix2fv(k.m[C.name],!1,C.value);break;case "mat3":a.uniformMatrix3fv(k.m[C.name],!1,C.value);break;case "mat4":a.uniformMatrix4fv(k.m[C.name],!1,C.value)}})},Ed:function(){return"lowp"}};return L}(),a=!1,La=function(){function b(h){console.log("ERROR in ContextFeedForward : ",h);return!1}var c=!1,f=!1,l=!1,m=!1,k=!0,t=!1,n={w:function(){return c.width},L:function(){return c.height},
wd:function(){return c},ud:function(){return a},o:function(){return k},flush:function(){a.flush()},vc:function(){t||(t=new Uint8Array(c.width*c.height*4));a.readPixels(0,0,c.width,c.height,a.RGBA,a.UNSIGNED_BYTE,t);return t},yd:function(){return c.toDataURL("image/jpeg")},zd:function(){I.J();f||(f=document.createElement("canvas"),l=f.getContext("2d"));f.width=c.width;f.height=c.height;var h=n.vc(),p=l.createImageData(f.width,f.height),v,u,E=f.width,H=f.height,Q=p.data;for(u=0;u<H;++u){var R=H-u-1;
for(v=0;v<E;++v){var M=4*(u*E+v);var L=4*(R*E+v);Q[M]=h[L];Q[M+1]=h[L+1];Q[M+2]=h[L+2];Q[M+3]=h[L+3]}}l.putImageData(p,0,0);return f.toDataURL("image/png")},xd:function(h){!f&&h&&(f=document.createElement("canvas"),l=f.getContext("2d"));var p=h?f:document.createElement("canvas");p.width=c.width;p.height=c.height;(h?l:p.getContext("2d")).drawImage(c,0,0);return p},l:function(h){h.jc&&!h.ha?c=document.getElementById(h.jc):h.ha&&(c=h.ha);c||(c=document.createElement("canvas"));c.width=h&&void 0!==h.width?
h.width:512;c.height=h&&void 0!==h.height?h.height:512;"undefined"===typeof h&&(h={});void 0===h.premultipliedAlpha&&(h.premultipliedAlpha=!1);void 0===h.wb&&(h.wb=!0);void 0===h.antialias&&(h.antialias=!1);var p={antialias:h.antialias,alpha:!0,preserveDrawingBuffer:!0,premultipliedAlpha:h.premultipliedAlpha,stencil:!1,depth:h.wb};a:{if(/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream){var v=navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);v=[parseInt(v[1],10),parseInt(v[2],10),
parseInt(v[3]||0,10)];if(12===v[0]||13===v[0]){v=!0;break a}}v=!1}v||(a=c.getContext("webgl2",p));a?k=!0:((a=c.getContext("webgl",p))||(a=c.getContext("experimental-webgl",p)),k=!1);if(!a)return b("WebGL is not enabled");(m=a.getExtension("WEBGL_lose_context"))&&c.addEventListener("webglcontextlost",h.Lc,!1);if(!Ka.l())return b("Not enough capabilities");if(!Ka.ec()&&k)return b("Your configuration cannot process color buffer float");a.clearColor(0,0,0,0);a.disable(a.DEPTH_TEST);a.disable(a.BLEND);
a.disable(a.DITHER);a.disable(a.STENCIL_TEST);a.GENERATE_MIPMAP_HINT&&a.hint(a.GENERATE_MIPMAP_HINT,a.FASTEST);a.disable(a.SAMPLE_ALPHA_TO_COVERAGE);a.disable(a.SAMPLE_COVERAGE);return!0},Cc:function(){if(!r.l())return!1;a.depthFunc(a.LEQUAL);a.clearDepth(1);return!0}};return n}(),Ia=function(){var b="undefined"===typeof r?JEShaders:r;return{Wc:function(c){b!==c&&(b.X(),b=c)},Ua:function(){return b.Ua()},na:function(){b.na()},$a:function(){b.$a()},X:function(){b.X()},set:function(c){b.set(c)}}}(),
O=function(){var b,c,f=0,l=-2,m=-2,k=!1,t={reset:function(){m=l=-2},l:function(){k||(b=a.createBuffer(),a.bindBuffer(a.ARRAY_BUFFER,b),a.bufferData(a.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),a.STATIC_DRAW),c=a.createBuffer(),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,c),a.bufferData(a.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2]),a.STATIC_DRAW),t.fa(),k=!0)},a:function(n){var h=f++,p=n.T?n.T.length:0,v="undefined"===typeof n.mode?a.STATIC_DRAW:n.mode,u=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,
u);a.bufferData(a.ARRAY_BUFFER,n.Sb instanceof Float32Array?n.Sb:new Float32Array(n.Sb),v);l=h;if(n.T){var E=a.createBuffer();a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,E);if(65536>n.T.length){var H=Uint16Array;var Q=a.UNSIGNED_SHORT;var R=2}else H=Uint32Array,Q=a.UNSIGNED_INT,R=4;a.bufferData(a.ELEMENT_ARRAY_BUFFER,n.T instanceof H?n.T:new H(n.T),v);m=h}var M={dc:function(L){l!==h&&(a.bindBuffer(a.ARRAY_BUFFER,u),l=h);L&&Ia.$a()},bc:function(){m!==h&&(a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,E),m=h)},bind:function(L){M.dc(L);
M.bc()},qd:function(){a.drawElements(a.TRIANGLES,p,Q,0)},rd:function(L,g){a.drawElements(a.TRIANGLES,L,Q,g*R)},remove:function(){a.deleteBuffer(u);n.T&&a.deleteBuffer(E);M=null}};return M},fa:function(){-1!==l&&(a.bindBuffer(a.ARRAY_BUFFER,b),l=-1);-1!==m&&(a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,c),m=-1)},g:function(n,h){n&&O.fa();h&&Ia.na();a.drawElements(a.TRIANGLES,3,a.UNSIGNED_SHORT,0)},uc:function(){a.deleteBuffer(b);a.deleteBuffer(c)}};return t}(),I=function(){var b,c,f,l=!1,m={v:-2,sc:1};return{l:function(){if(!l){b=
a.createFramebuffer();var k=Ka.o();c=k&&a.DRAW_FRAMEBUFFER?a.DRAW_FRAMEBUFFER:a.FRAMEBUFFER;f=k&&a.READ_FRAMEBUFFER?a.READ_FRAMEBUFFER:a.FRAMEBUFFER;l=!0}},Bd:function(){return c},Qa:function(){return f},aa:function(){return a.FRAMEBUFFER},Fd:function(){return m},td:function(){return b},a:function(k){void 0===k.vb&&(k.vb=!1);var t=k.oa?k.oa:!1,n=k.width,h=void 0!==k.height?k.height:k.width,p=b,v=!1,u=!1,E=0;t&&(n=n?n:t.w(),h=h?h:t.L());var H={Nb:function(){u||(p=a.createFramebuffer(),u=!0,E=m.sc++)},
Vb:function(){H.Nb();H.j();v=a.createRenderbuffer();a.bindRenderbuffer(a.RENDERBUFFER,v);a.renderbufferStorage(a.RENDERBUFFER,a.DEPTH_COMPONENT16,n,h);a.framebufferRenderbuffer(c,a.DEPTH_ATTACHMENT,a.RENDERBUFFER,v);a.clearDepth(1)},bind:function(Q,R){E!==m.v&&(a.bindFramebuffer(c,p),m.v=E);t&&t.j();R&&a.viewport(0,0,n,h);Q&&a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT)},jd:function(){E!==m.v&&(a.bindFramebuffer(c,p),m.v=E)},clear:function(){a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT)},md:function(){a.clear(a.COLOR_BUFFER_BIT)},
nd:function(){a.clear(a.DEPTH_BUFFER_BIT)},Yc:function(){a.viewport(0,0,n,h)},j:function(){E!==m.v&&(a.bindFramebuffer(c,p),m.v=E)},rtt:function(Q){t=Q;m.v!==E&&(a.bindFramebuffer(a.FRAMEBUFFER,p),m.v=E);Q.j()},J:function(){a.bindFramebuffer(c,null);m.v=-1},resize:function(Q,R){n=Q;h=R;v&&(a.bindRenderbuffer(a.RENDERBUFFER,v),a.renderbufferStorage(a.RENDERBUFFER,a.DEPTH_COMPONENT16,n,h))},remove:function(){a.bindFramebuffer(c,p);a.framebufferTexture2D(c,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,null,0);v&&
a.framebufferRenderbuffer(c,a.DEPTH_ATTACHMENT,a.RENDERBUFFER,null);a.bindFramebuffer(c,null);a.deleteFramebuffer(p);v&&a.deleteRenderbuffer(v);H=null}};k.vb&&H.Vb();return H},J:function(){a.bindFramebuffer(c,null);m.v=-1},dd:function(){a.bindFramebuffer(c,null);a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT);a.viewport(0,0,Ka.w(),Ka.L());m.v=-1},reset:function(){m.v=-2},R:function(){0!==m.v&&(a.bindFramebuffer(c,b),m.v=0)},clear:function(){a.viewport(0,0,Ka.w(),Ka.L());a.clear(a.COLOR_BUFFER_BIT)}}}(),
X=function(){function b(d){a.bindTexture(a.TEXTURE_2D,d)}function c(d){xa[0]=d;d=za[0];var G=d>>16&32768,N=d>>12&2047,U=d>>23&255;return 103>U?G:142<U?G|31744|((255==U?0:1)&&d&8388607):113>U?(N|=2048,G|(N>>114-U)+(N>>113-U&1)):G=(G|U-112<<10|N>>1)+(N&1)}function f(d){var G=new Uint16Array(d.length);d.forEach(function(N,U){G[U]=c(N)});return G}function l(){if(null!==ra.Ra)return ra.Ra;var d=k(f([1,1,1,1]));return null===d?!0:ra.Ra=d}function m(){if(null!==ra.Sa)return ra.Sa;var d=k(new Uint8Array([255,
255,255,255]));return null===d?!0:ra.Sa=d}function k(d){if(!Ia.Ua()||!Q)return null;try{var G=a.getError(),N=Z.a({isFloat:!1,I:!0,array:d,width:1});G=a.getError();if(G!==a.NO_ERROR)return!1}catch(U){return!1}I.J();a.viewport(0,0,1,1);a.clearColor(0,0,0,0);a.clear(a.COLOR_BUFFER_BIT);Ia.set("s0");N.hb(0);O.g(!1,!0);d=new Uint8Array(4);a.readPixels(0,0,1,1,a.RGBA,a.UNSIGNED_BYTE,d);d=.9<d[0];N.remove();I.R();return d}var t=0,n,h=0,p,v=!1,u,E,H,Q=!1,R=!1,M,L,g,B=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,
1]],C=!1,da=!1,xa=new Float32Array(1),za=new Int32Array(xa.buffer),ra={Ra:null,Sa:null},Z={l:function(){if(!Q){E=[a.RGB,!1,a.RGB,a.RGBA];H=[a.RGB,!1,a.RGB,a.RGBA];n=[a.TEXTURE0,a.TEXTURE1,a.TEXTURE2,a.TEXTURE3,a.TEXTURE4,a.TEXTURE5,a.TEXTURE6,a.TEXTURE7];C="undefined"!==typeof JEContext;da="undefined"!==typeof Ka;C&&JEContext.Rd()&&n.push(a.TEXTURE8,a.TEXTURE9);p=[-1,-1,-1,-1,-1,-1,-1,-1];u=[a.UNSIGNED_BYTE,a.FLOAT,a.FLOAT];if(!v){for(var d=new Float32Array(16384),G=0;16384>G;++G)d[G]=2*Math.random()-
1;v={random:Z.a({isFloat:!0,isPot:!0,array:d,width:64}),Rb:Z.a({isFloat:!1,isPot:!0,width:1,array:new Uint8Array([0,0,0,0])})}}Q=!0}},Bc:function(){Z.ed()},Id:function(){return v.Rb},ed:function(){u[1]=Ka.va()},Sc:function(){H=E=[a.RGBA,a.RGBA,a.RGBA,a.RGBA]},Td:function(d,G){r.set("s1");I.J();var N=d.w(),U=d.L();a.viewport(0,0,N,U);d.b(0);O.g(!1,!1);a.readPixels(0,0,N,U,a.RGBA,a.UNSIGNED_BYTE,G)},tc:function(d,G,N){a.activeTexture(a.TEXTURE0);t=0;var U=a.createTexture();b(U);var ea=Ka.o()&&a.RGBA32F?
a.RGBA32F:a.FLOAT;G=G instanceof Float32Array?G:new Float32Array(G);var ca=Math.log2(G.length);ca!==Math.floor(ca)&&(a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE));a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST);a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,N);a.texImage2D(a.TEXTURE_2D,0,a.RGBA,d.w(),d.L(),0,a.RGBA,ea,G);b(null);a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,
!1);I.R();r.set("s0");d.A();a.clearColor(0,0,0,0);a.clear(a.COLOR_BUFFER_BIT);b(U);O.g(!0,!1);a.deleteTexture(U)},a:function(d){function G(){b(la);pa&&a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,pa);d.isPot?(a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,d.zb?a.MIRRORED_REPEAT:a.REPEAT),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,d.U?a.MIRRORED_REPEAT:a.REPEAT)):(a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE));d.xa&&"undefined"!==
typeof JESETTINGS&&a.texParameterf(a.TEXTURE_2D,JEContext.Ad().TEXTURE_MAX_ANISOTROPY_EXT,JESETTINGS.gd);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,d.isLinear?a.LINEAR:a.NEAREST);d.isLinear?a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,d.isMipmap&&!ua?a.NEAREST_MIPMAP_LINEAR:a.LINEAR):a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,d.isMipmap&&!ua?a.NEAREST_MIPMAP_NEAREST:a.NEAREST);aa=E[d.la-1];ba=H[d.la-1];fa=u[N];if(Ka.o()){var w=a.RGBA32F;aa===a.RGBA&&fa===a.FLOAT&&w&&(ba=w);aa===
a.RGB&&fa===a.FLOAT&&w&&(ba=w,aa=a.RGBA)}if(d.I&&!d.isFloat||d.isFloat&&d.isMipmap&&Ja.Ec())(w=a.RGBA16F)&&(ba=w),fa=Ka.va();d.Cb&&"undefined"!==typeof a.texStorage2D&&(Aa=d.Cb);d.Ab&&4===d.la&&(aa=JEContext.Gd());if(d.D)a.texImage2D(a.TEXTURE_2D,0,ba,aa,fa,d.D);else if(d.url)a.texImage2D(a.TEXTURE_2D,0,ba,aa,fa,ma);else if(D){try{a.getError(),a.texImage2D(a.TEXTURE_2D,0,ba,F,y,0,aa,fa,D),a.getError()!==a.NO_ERROR&&(a.texImage2D(a.TEXTURE_2D,0,ba,F,y,0,aa,fa,null),a.getError()!==a.NO_ERROR&&a.texImage2D(a.TEXTURE_2D,
0,a.RGBA,F,y,0,a.RGBA,a.UNSIGNED_BYTE,null))}catch(e){a.texImage2D(a.TEXTURE_2D,0,ba,F,y,0,aa,fa,null)}d.isKeepArray||(D=null)}else a.texImage2D(a.TEXTURE_2D,0,ba,F,y,0,aa,fa,null);if(d.isMipmap)if(!ua&&W)W.Pa(),na=!0;else if(ua){w=Math.log(Math.min(F,y))/Math.log(2);var x;wa=Array(1+w);wa[0]=la;for(x=1;x<=w;++x){var K=Math.pow(2,x);var va=F/K;K=y/K;var ka=a.createTexture();b(ka);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST);
a.texImage2D(a.TEXTURE_2D,0,ba,va,K,0,aa,fa,null);b(null);wa[x]=ka}na=!0}b(null);p[t]=-1;pa&&a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1);P=!0;Y&&W&&(Y(W),Y=!1)}"undefined"===typeof d.isFloat&&(d.isFloat=!1);"undefined"===typeof d.I&&(d.I=!1);"undefined"===typeof d.isPot&&(d.isPot=!0);"undefined"===typeof d.isLinear&&(d.isLinear=!1);"undefined"===typeof d.isMipmap&&(d.isMipmap=!1);"undefined"===typeof d.Ha&&(d.Ha=!1);void 0===d.xa&&(d.xa=!1);void 0===d.U&&(d.U=!1);void 0===d.zb&&(d.zb=!1);void 0===d.Ab&&
(d.Ab=!1);void 0===d.la&&(d.la=4);void 0===d.xb&&(d.xb=!1);"undefined"===typeof d.isFlipY&&(d.isFlipY=d.url||d.array?!0:!1);"undefined"===typeof d.isKeepArray&&(d.isKeepArray=!1);d.data&&(d.array="string"===typeof d.data?Ha(d.data):d.isFloat?new Float32Array(d.data):new Uint8Array(d.data),d.isFlipY=!1);var N=0,U=d.D?!0:!1,ea=null,ca=null,ha=!1,sa=null;d.isFloat&&(d.I=!0);d.I&&(N=1);d.xb||Ka.o()||!d.isFloat||!da||Ka.jb()||(d.isFloat=!1);d.isFloat&&(N=2);d.xa&&C&&!JEContext.Md()&&(d.xa=!1);var la=a.createTexture(),
Y=d.Ha,ma=null,D=!1,F=0,y=0,P=!1,z=h++,J=!1,oa,T,ta,Ba,ba,aa,fa,pa=d.isFlipY,ua=d.I&&d.isMipmap&&"undefined"!==typeof Ja&&!Ja.gc()?!0:!1,wa,Aa=-1,na=!1;"undefined"!==typeof d.width&&d.width&&(F=d.width,y="undefined"!==typeof d.height&&d.height?d.height:F);var W={get:function(){return la},w:function(){return F},L:function(){return y},Jd:function(){return d.url},Nd:function(){return d.isFloat},Pd:function(){return d.I},Qd:function(){return d.isLinear},Pa:function(){a.generateMipmap(a.TEXTURE_2D)},ib:function(w,
x){ua?(w||(w=W.rb()),W.Fa(x),b(wa[w]),p[x]=-1):W.b(x)},rb:function(){-1===Aa&&(Aa=Math.log(F)/Math.log(2));return Aa},pb:function(w){if(ua){w||(w=W.rb());r.set("s11");W.Fa(0);var x,K=F,va=y;for(x=1;x<=w;++x)K/=2,va/=2,r.P("u7",.25/K,.25/va),a.viewport(0,0,K,va),b(wa[x-1]),a.framebufferTexture2D(I.aa(),a.COLOR_ATTACHMENT0,a.TEXTURE_2D,wa[x],0),O.g(!1,1===x);p[0]=-1}else W.Pa()},Fa:function(w){w!==t&&(a.activeTexture(n[w]),t=w)},b:function(w){if(!P)return!1;W.Fa(w);if(p[w]===z)return!1;b(la);p[w]=z;
return!0},hb:function(w){a.activeTexture(n[w]);t=w;b(la);p[w]=z},j:function(){a.framebufferTexture2D(I.aa(),a.COLOR_ATTACHMENT0,a.TEXTURE_2D,la,0)},A:function(){a.viewport(0,0,F,y);a.framebufferTexture2D(I.aa(),a.COLOR_ATTACHMENT0,a.TEXTURE_2D,la,0)},de:function(){a.framebufferTexture2D(I.aa(),a.COLOR_ATTACHMENT0,a.TEXTURE_2D,null,0)},resize:function(w,x){F=w;y=x;G()},clone:function(w){w=Z.a({width:F,height:y,I:d.I,isFloat:d.isFloat,isLinear:d.isLinear,U:d.U,isFlipY:w?!pa:pa,isPot:d.isPot});Ia.set("s0");
I.R();w.j();a.viewport(0,0,F,y);W.b(0);O.g(!0,!0);return w},Yc:function(){a.viewport(0,0,F,y)},remove:function(){a.deleteTexture(la);W=null},refresh:function(){W.hb(0);pa&&a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!0);U?a.texImage2D(a.TEXTURE_2D,0,ba,aa,a.UNSIGNED_BYTE,d.D):a.texImage2D(a.TEXTURE_2D,0,ba,F,y,0,aa,fa,D);pa&&a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1)},kb:function(){var w=F*y*4;T=[new Uint8Array(w),new Uint8Array(w),new Uint8Array(w),new Uint8Array(w)];oa=[new Float32Array(T[0].buffer),new Float32Array(T[1].buffer),
new Float32Array(T[2].buffer),new Float32Array(T[3].buffer)];ta=new Uint8Array(4*w);Ba=new Float32Array(ta.buffer);J=!0},Mb:function(){J||W.kb();a.readPixels(0,0,F,4*y,a.RGBA,a.UNSIGNED_BYTE,ta);var w,x=F*y,K=2*x,va=3*x;for(w=0;w<x;++w)oa[0][w]=Ba[w],oa[1][w]=Ba[w+x],oa[2][w]=Ba[w+K],oa[3][w]=Ba[w+va];return oa},lb:function(){I.J();r.set("s12");W.b(0);for(var w=0;4>w;++w)a.viewport(0,y*w,F,y),r.Pb("u8",B[w]),O.g(!1,0===w)},ee:function(w){var x=fa===u[0]&&!m();b(la);pa&&a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,
pa);x?(ha||(ea=document.createElement("canvas"),ea.width=F,ea.height=y,ca=ea.getContext("2d"),sa=ca.createImageData(F,y),ha=!0),sa.data.set(w),ca.putImageData(sa,0,0),a.texImage2D(a.TEXTURE_2D,0,ba,aa,fa,ea)):a.texImage2D(a.TEXTURE_2D,0,ba,F,y,0,aa,fa,w);p[t]=z;pa&&a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1)},fe:function(w,x){b(la);a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,x);a.texImage2D(a.TEXTURE_2D,0,ba,aa,fa,w);p[t]=z;x&&a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1)},Vd:function(w,x){var K=F*y,va=4*K;w=d.I?w?
"RGBE":"JSON":"RGBA";x&&(w=x);x=Ka.o()&&!1;switch(w){case "RGBE":var ka="s41";break;case "JSON":ka=x?"s0":"s12";break;case "RGBA":case "RGBAARRAY":ka="s6"}J||("RGBA"===w||"RGBE"===w||"RGBAARRAY"===w?(T=new Uint8Array(va),J=!0):"JSON"!==w||x||W.kb());I.J();r.set(ka);W.b(0);if("RGBA"===w||"RGBE"===w||"RGBAARRAY"===w){a.viewport(0,0,F,y);O.g(!0,!0);a.readPixels(0,0,F,y,a.RGBA,a.UNSIGNED_BYTE,T);if("RGBAARRAY"===w)return{data:T};R||(M=document.createElement("canvas"),L=M.getContext("2d"),R=!0);M.width=
F;M.height=y;g=L.createImageData(F,y);g.data.set(T);L.putImageData(g,0,0);var e=M.toDataURL("image/png")}else if("JSON"===w)if(x)e=new Float32Array(K),a.viewport(0,0,F,y),O.g(!0,!0),a.readPixels(0,0,F,y,a.RGBA,a.FLOAT,e);else{for(e=0;4>e;++e)a.viewport(0,y*e,F,y),r.Pb("u8",B[e]),O.g(!e,!e);W.Mb();e=Array(K);for(ka=0;ka<K;++ka)e[4*ka]=oa[0][ka],e[4*ka+1]=oa[1][ka],e[4*ka+2]=oa[2][ka],e[4*ka+3]=oa[3][ka]}return{format:w,data:e,width:F,height:y,isMirrorY:d.U,isFlipY:"RGBA"===w?d.isFlipY:!d.isFlipY}}};
d.isMipmap&&!ua&&P&&!na&&(W.Pa(),na=!0);if(d.url)b(la),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,1,1,0,a.RGBA,a.UNSIGNED_BYTE,null),ma=new Image,ma.pd="Anonymous",ma.crossOrigin="Anonymous",ma.src=d.url,ma.onload=function(){F=ma.width;y=ma.height;G()};else if(d.D){var Ca=function(){F=void 0!==d.D.videoWidth?d.D.videoWidth:d.D.width;y=void 0!==d.D.videoHeight?d.D.videoHeight:d.D.height;F?G():setTimeout(Ca,1)};Ca()}else d.array?(d.I&&!d.isFloat?d.array instanceof Uint16Array?(D=d.array,G()):l()?(D=f(d.array),
G()):(G(),Z.tc(W,d.array,pa)):(D=d.isFloat?d.array instanceof Float32Array?d.array:new Float32Array(d.array):d.array instanceof Uint8Array?d.array:new Uint8Array(d.array),G()),d.isKeepArray||(D&&D!==d.array&&(D=null),delete d.array)):G();W.yc=W.w;Y&&P&&(Y(W),Y=!1);return W},J:function(d){d!==t&&(a.activeTexture(n[d]),t=d);p[d]=-1;b(null)},kd:function(d){v.random.b(d)},reset:function(){for(var d=0;d<n.length;++d)p[d]=-1;t=-1},Ud:function(){t=-1},be:function(){for(var d=0;d<n.length;++d)Z.J(d)},uc:function(){v&&
(v.random.remove(),v.Rb.remove())},ce:function(d,G){if("RGBA"===d.format||"RGBE"===d.format){var N=new Image;N.src=d.data;N.onload=function(){Z.a({U:d.isMirrorY,isFlipY:d.isFlipY,isFloat:!1,D:N,Ha:function(U){if("RGBA"===d.format)G(U);else{var ea=d.width,ca=d.height,ha=Z.a({U:d.isMirrorY,isFloat:!0,width:ea,height:ca,isFlipY:d.isFlipY});I.R();a.viewport(0,0,ea,ca);r.set("s42");ha.j();U.b(0);O.g(!0,!0);Z.J(0);G(ha);a.flush();setTimeout(U.remove,50)}}})}}else"JSON"===d.format?G(Z.a({isFloat:!0,isFlipY:d.isFlipY,
width:d.width,height:d.height,array:new Float32Array(d.data)})):G(!1)}};return Z}(),Ma={a:function(b){var c=[X.a(b),X.a(b)],f=[c[1],c[0]],l=f,m={Vc:function(k){l[1].j();l[0].b(k);m.Qb()},Wd:function(k){l[1].A();l[0].b(k);m.Qb()},Qb:function(){l=l===c?f:c},refresh:function(){l[0].refresh();l[1].refresh()},b:function(k){l[0].b(k)},Cd:function(){return l[0]}};return m}},Ka=function(){function b(){c="undefined"===typeof La?JEContext:La;f=!0}var c,f=!1,l=!1,m=!1,k=!1,t=!1,n=!1,h=!1,p=!1,v=!1,u=!1,E=!1,
H=!0,Q=!0,R=!0,M=!1,L="undefined"===typeof window?{}:window,g={l:function(){if(f)return!0;b();g.nb();g.Oa();g.oc();g.pc();I.l();X.l();if(!g.kc())return!1;O.l();X.Bc();return!0},w:function(){f||b();return c.w()},L:function(){f||b();return c.L()},o:function(){f||b();return c.o()},oc:function(){E=(u=a.getExtension("EXT_color_buffer_float")||a.getExtension("WEBGL_color_buffer_float")||a.getExtension("OES_color_buffer_float"))?!0:!1;L.GL_EXT_COLORBUFFERFLOAT=u},pc:function(){a.getExtension("EXT_color_buffer_half_float")||
a.getExtension("WEBGL_color_buffer_half_float")||a.getExtension("OES_color_buffer_half_float")},nb:function(){if(!l){this.o()||(m=a.getExtension("OES_texture_float")||a.getExtension("MOZ_OES_texture_float")||a.getExtension("WEBKIT_OES_texture_float"),t=(L.GL_EXT_FLOAT=m)?!0:!1);if(t||this.o())k=a.getExtension("OES_texture_float_linear")||a.getExtension("MOZ_OES_texture_float_linear")||a.getExtension("WEBKIT_OES_texture_float_linear"),L.GL_EXT_FLOATLINEAR=k;l=!0}},Oa:function(){if(!v){if(!this.o()){if(n=
a.getExtension("OES_texture_half_float")||a.getExtension("MOZ_OES_texture_half_float")||a.getExtension("WEBKIT_OES_texture_half_float"))M=n.HALF_FLOAT_OES,h=!0;!M&&a.HALF_FLOAT&&(M=a.HALF_FLOAT);!M&&a.FLOAT&&(M=a.FLOAT);L.GL_EXT_HALFFLOAT=n}if(h||this.o())p=a.getExtension("OES_texture_half_float_linear")||a.getExtension("MOZ_OES_texture_half_float_linear")||a.getExtension("WEBKIT_OES_texture_half_float_linear"),L.GL_EXT_HALFFLOATLINEAR=p;v=!0}},va:function(){if(g.o())return a.HALF_FLOAT;g.Oa();return h?
M:a.FLOAT},jb:function(){return H},fc:function(){return Q},ld:function(){return R},ec:function(){return E},mc:function(){Q=H=!0;var B=a.createFramebuffer();a.bindFramebuffer(a.FRAMEBUFFER,B);var C=a.createTexture();a.bindTexture(a.TEXTURE_2D,C);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST);a.texImage2D(a.TEXTURE_2D,0,g.o()&&a.RGBA32F?a.RGBA32F:a.RGBA,1,1,0,a.RGBA,a.FLOAT,null);a.framebufferTexture2D(I.aa(),a.COLOR_ATTACHMENT0,
a.TEXTURE_2D,C,0);var da=a.checkFramebufferStatus(I.Qa());da!==a.FRAMEBUFFER_COMPLETE&&(H=!1);a.texImage2D(a.TEXTURE_2D,0,g.o()&&a.RGBA16F?a.RGBA16F:a.RGBA,1,1,0,a.RGBA,g.va(),null);a.framebufferTexture2D(I.aa(),a.COLOR_ATTACHMENT0,a.TEXTURE_2D,C,0);da=a.checkFramebufferStatus(I.Qa());da!==a.FRAMEBUFFER_COMPLETE&&(Q=!1);a.bindTexture(a.TEXTURE_2D,null);a.bindFramebuffer(a.FRAMEBUFFER,null);a.deleteTexture(C);a.deleteFramebuffer(B)},lc:function(){var B=I.a({width:1});B.Nb();var C=X.a({width:1,isFloat:!0,
la:3});B.j();C.j();a.flush();a.checkFramebufferStatus(I.Qa())!==a.FRAMEBUFFER_COMPLETE?(X.Sc(),R=!1):R=!0;B.remove();C.remove()},kc:function(){g.mc();if(!H&&!Q)return!1;g.lc();return!0}};return g}(),Ja=function(){function b(H,Q,R,M){a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,M?a.NEAREST_MIPMAP_NEAREST:a.LINEAR);try{var L=a.getError();L!==a.NO_ERROR&&console.log("GLERR in test_mipmapping() :",L);a.texImage2D(a.TEXTURE_2D,0,H,2,2,0,a.RGBA,Q,R);L=a.getError();if(L!==a.NO_ERROR)return!1}catch(g){return!1}M&&
a.generateMipmap(a.TEXTURE_2D);O.fa();O.g(!1,!0);a.readPixels(0,0,1,1,a.RGBA,a.UNSIGNED_BYTE,n);L=a.getError();L===a.INVALID_OPERATION&&"undefined"!==typeof a.PIXEL_PACK_BUFFER&&(a.bindBuffer(a.PIXEL_PACK_BUFFER,null),a.readPixels(0,0,1,1,a.RGBA,a.UNSIGNED_BYTE,n),L=a.getError());return L!==a.NO_ERROR?!1:0!==n[0]}function c(H){return Ka.jb()&&b(internalPixelFormat32f,a.FLOAT,new Float32Array(p),H)?(k=m.eb,!0):!1}function f(H){return Ka.fc()?b(u,Ka.va(),new Uint16Array(p),H)||b(u,a.FLOAT,new Float32Array(p),
H)?(k=m.Ea,!0):!1:!1}var l=!1,m={eb:3,Ea:2,RGBA8:0},k=m.RGBA8,t,n=new Uint8Array(4),h=[.8,1,.8,1],p=h.concat(h,h,h),v=!0,u,E={l:function(){Ka.nb();Ka.Oa();u=a.RGBA;if(La.o()){var H=a.RGBA16F;H&&(u=H)}O.l();I.reset();I.J();a.viewport(0,0,1,1);r.set("s0");l=!0;t=a.createTexture();a.activeTexture(a.TEXTURE0);a.bindTexture(a.TEXTURE_2D,t);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.REPEAT);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.REPEAT);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST);
if(f(!0)||c(!0))return!0;v=!1;if(f(!1)||c(!1))return!0;if(La.o()){u=a.RGBA;if(f(!0)||c(!0))return!0;v=!1;if(f(!1)||c(!1))return!0}return!1},gc:function(){return v},Dd:function(){return k},Od:function(){l||E.l();return k===m.eb},Ec:function(){l||E.l();return k===m.Ea}};return E}(),Na={a:function(b){var c=X.a(b.alpha),f=X.a(b.beta);return{nc:function(){c.b(1);f.b(2)}}}},Qa={a:function(b){var c=b.$c;c.index=b.index;c.V=b.V;c.parent=b.parent;switch(c.type){case "input":b=Oa.a(c);break;default:b=Pa.a(c)}return b}},
Oa={a:function(b){"undefined"===typeof b.sift&&(b.sift=!1);"undefined"===typeof b.DWT&&(b.DWT=!1);"undefined"===typeof b.blur&&(b.blur=!1);"undefined"===typeof b.siftOutWidth&&(b.siftOutWidth=!1);"undefined"===typeof b.density&&(b.density=1);var c=!1;if(b.mask){c=!0;SETTINGS&&void 0!==SETTINGS.ac&&(b.mask=SETTINGS.ac+b.mask);var f=X.a({isFloat:!1,url:b.mask})}var l=!1,m="undefined"!==typeof b.preprocessing?b.preprocessing:!1,k=!1,t=!1;b.sift?Sift.l({Ac:a,ha:!1,width:b.size,Sd:b.siftOutWidth}):b.DWT&&
DWT.l({Ac:a,ha:!1,width:b.size});var n=!1;b.customInputShader&&(n="s43",r.fb({name:"_",id:n,c:b.customInputShader,f:["uSource"],precision:"lowp"}),r.H(n,[{type:"1i",name:"_",value:0}]));switch(m){case "sobel":var h="s32";k=!0;break;case "meanNormalization":h="s33";k=!0;break;case "grayScale":h="s29";k=!1;break;case "grayScaleTilt":h="s30";t=!0;k=!1;break;case "rgbGrayTilt":h="s31";t=!0;k=!1;break;case "copy":h=n?n:"s0";break;case "inputLightRegulation":h=n?n:"s29";Ra.l({width:b.size,Eb:b.nBlurPass,
Dc:!1});l=!0;break;case "direct":case "none":h=!1;break;default:h="s3"}t&&r.H(h,[{name:"u28",type:"1f",value:b.tilt}]);c&&(h+="Mask");if(b.blur)var p=X.a({isFloat:!1,isPot:!1,width:b.size});var v=X.a({isFloat:!1,isPot:!1,width:b.size}),u={w:function(){return b.sift?Sift.ka():b.size},ka:function(){return u.w()},xc:function(){return b.sift?Sift.wa():b.DWT?DWT.wa():l?Ra.wa():v},F:function(){I.R();b.blur&&(p.A(),r.set("s44"),r.P("u7",1/b.size,1/b.size),O.g(!1,!0),p.b(0));h&&(r.set(h),k&&r.u("u29",1/b.size),
v.A(),c&&f.b(1),O.g(!1,!1),v.b(0),l?Ra.Xa(v):b.sift?(r.X(),Sift.Xa()):b.DWT&&(r.X(),DWT.Xa(4)))}};return u}},Pa={a:function(b){"undefined"===typeof b.disableNormalize&&(b.disableNormalize=!1);var c=[],f=[],l,m,k=!1,t,n=!0,h,p,v=b.isReorganize?b.isReorganize:!1,u=b.kernelsNumber?!0:!1,E=b.dynPelu?Na.a(b.dynPelu):!1,H=E?!0:!1,Q={isEnabled:!1},R;if("softmax"===b.type){b.activation="softmax";b.size=Math.pow(2,Math.ceil(Math.log2(Math.sqrt(b.num_classes))));b.sparsity="undefined"!==typeof b.sparsity?b.sparsity:
b.V.ka();b.gain="undefined"!==typeof b.gain?b.gain:1;r.H("s20",[{type:"1f",name:"u10",value:b.gain}]);var M=X.a({isFloat:!0,isPot:!1,width:b.size}),L=X.a({isFloat:!0,isPot:!1,width:b.size,isMipmap:!0});n=!1;var g=new Uint8Array(Math.pow(4*b.size,2)),B;for(B=0;B<b.size*b.size;++B){var C=B<b.num_classes?255:0;g[4*B]=C;g[4*B+1]=C;g[4*B+2]=C;g[4*B+3]=C}var da=X.a({isFloat:!1,isPot:!1,width:b.size,array:g})}else b.cost?(b.sparsity="undefined"!==typeof b.sparsity?b.sparsity:b.V.ka(),n=!1):"full"===b.connectivityUp&&
(b.sparsity=b.V.ka());var xa={elu:"s15",elu01:"s16",relu:"s14",arctan:"s18",sigmoid:"s13",copy:"s0",softplus:"s19",softmax:"s20",dynPelu:"s17"}[b.activation],za=b.sparsity*b.sparsity,ra=!1,Z=b.size;if(b.maxPooling){switch(b.maxPooling.size){case 2:var d="s34";break;case 4:d="s35"}ra=!0;Z/=b.maxPooling.size;var G=X.a({isFloat:!0,isPot:!1,width:Z})}var N=void 0!==b.Kc&&b.Kc?!0:!1,U=null,ea=null,ca=null;N&&(U="s45"+b.index.toString(),r.ub("s45",U,[((b.normalization.n-1)/2).toFixed(1)]),r.H(U,[{type:"1i",
name:"u1",value:0},{type:"2f",name:"u7",value:[1/b.size,1/b.size]},{type:"1f",name:"u6",value:b.normalization.alpha},{type:"1f",name:"u9",value:b.normalization.beta},{type:"1f",name:"u33",value:b.normalization.k}]),ea=X.a({isFloat:!0,isPot:!0,width:b.size}),ca=X.a({isFloat:!0,isPot:!0,width:b.size}));var ha,sa,la,Y;n&&(Y=X.a({isFloat:!0,isPot:!1,width:b.size}));var ma=X.a(b.bias),D,F={w:function(){return b.size},ka:function(){return Z},sb:function(){return b.num_classes},cc:function(y){R.b(y)},Nc:function(){b.remap&&
b.remap.isEnabled&&(Q={isEnabled:!0,Gc:X.a({isFloat:!1,isFlipY:!1,array:new Uint8Array(b.remap.maskTexture.data),width:b.remap.maskTexture.width,isPot:!1}),layers:b.remap.layers.map(function(y){return b.parent.wc(y)}),depth:b.remap.depth})},Uc:function(){switch(b.connectivityUp){case "gaussian":D=Sa.a(b.connectivity);break;case "direct":D=Ta.a(b.connectivity);break;case "square":D=Ua.a(b.connectivity);break;case "squareFast":D=Va.a(b.connectivity,b.activation);break;case "full":D=Wa.a(b.connectivity);
break;case "conv":p=b.kernelsNumber,D=Xa.a(b.connectivity),v&&(h=X.a({width:Z,isFloat:!0,isFlipY:!1,isPot:!1}))}if(D.W){var y=b.size*b.sparsity;sa=Math.log(y/b.size)/Math.log(2);ha=X.a({isMipmap:!0,isFloat:!0,isPot:!0,width:y,Cb:sa});la=X.a({isFloat:!0,isPot:!0,width:b.size})}},F:function(y,P){R=y;D.W?(ha.A(),u&&ma.b(2),D.F(Q),ha.b(0),ha.pb(sa),la.A(),u?r.set("s0"):(r.set("s28"),r.u("u27",za),ma.b(1)),ha.ib(sa,0),O.g(!1,!1),r.set(xa),N?ea.j():Y.j(),la.b(0),H&&E.nc(),O.g(!1,!1)):(Y.A(),ma.b(1),D.F());
N&&(r.set(U),ca.j(),ea.b(0),O.g(!1,!1),r.set("s46"),r.u("u6",1),Y.j(),ca.b(1),O.g(!1,!1));if(n)return ra?(G.A(),Y.b(0),r.set(d),r.P("u7",1/b.size,1/b.size),O.g(!1,!1),P=G):P=Y,P.b(0),v&&(h.j(),r.set("s22"),r.P("u14",p,Z/p),O.g(!1,!1),P=h,h.b(0)),P;if("softmax"===b.type){r.set("s20");Y.b(0);M.j();O.g(!1,!1);b.disableNormalize?y=M:(r.set("s2"),M.b(0),da.b(1),L.j(),O.g(!1,!1),r.set("s0"),m.A(),L.b(0),L.pb(!1),O.g(!1,!1),r.set("s21"),l.A(),L.ib(!1,0),r.u("u12",Y.yc()),m.b(1),O.g(!1,!1),y=l);if(P){switch(k){case "cpuRGBAAvg":break;
default:var z=F.Lb(y)}return z}return!1}if(b.cost){r.set("gpuRawAvg"===k?"s8":"s7");P=Y;b.disableNormalize||(r.u("u4",1/b.size),l.A(),Y.b(0),O.g(!1,!1),P=l);switch(k){case "cpuRGBA2Float":P.lb();z=F.Lb(P);t(z);break;case "gpuRawAvg":case "gpuRaw":P.b(0),t(P)}return!1}},ic:function(y){y&&"undefined"!==typeof y.Jb&&(k=y.Jb,t=y.Mc);Y=X.a({isFloat:!0,isPot:!0,isMipmap:"softmax"===b.type,width:b.size});"softmax"===b.type&&(m=X.a({isFloat:!0,isPot:!0,width:1}));var P=0,z=0,J="undefined"!==typeof b.num_classes&&
b.num_classes?b.num_classes:b.size*b.size;for(y=0;y<J;++y)c.push(P+(b.size-1-z)*b.size),f.push([-1,-1,-1,-1]),++P,P===b.size&&(P=0,++z);b.disableNormalize||(l=X.a({isFloat:!0,isPot:!0,width:b.size}))},Lb:function(y){y.lb();var P=y.Mb();c.forEach(function(z,J){f[J][0]=P[0][z];f[J][1]=P[1][z];f[J][2]=P[2][z];f[J][3]=P[3][z]});return f}};b.V&&F.Uc(b.V);return F}};
function Ya(){var b={Ld:!1},c,f,l;b||(b={});this.wc=function(m){return c[m]};this.Qc=function(m){var k=!1;c=m.map(function(t,n){return k=t=Qa.a({index:n,parent:this,$c:t,V:k})});f=c[0];l=c[c.length-1];c.forEach(function(t,n){0!==n&&t.Nc()})};this.F=function(m,k){var t=k;c.forEach(function(n){t=n.F(t,m)});return t};this.qb=function(){return f.w()};this.wa=function(){return l.xc()};this.Tc=function(m){l.ic(m)};this.sb=function(){return l.sb()}}
var Ta={a:function(b){var c=X.a(b.weights);delete b.weights.data;return{W:!0,ja:function(){return 1},zc:function(){return c},F:function(){r.set("s27");c.b(1);O.g(!1,!1)}}}},Wa={a:function(b){var c=b.fromLayerSize,f=X.a(b.weights);return{W:!0,ja:function(){return c},F:function(l){if(l.isEnabled){r.set("s25");l.Gc.b(3);var m,k=Math.min(l.layers.length,l.depth);for(m=0;m<k;++m)l.layers[m].cc(4+m)}else r.set("s24");r.u("u18",b.toLayerSize);f.b(1);O.g(!1,!1)}}}},Sa={a:function(b){var c=b.toSparsity*b.toLayerSize,
f=c/b.fromLayerSize,l=X.a(b.weights);X.a({width:c,isFloat:!0,array:new Float32Array(b.fromBindings),isPot:!0});var m=X.a({width:c,isFloat:!0,array:new Float32Array(b.toBindings),isPot:!0});return{W:!0,ja:function(){return f},F:function(){r.set("s23");l.b(1);m.b(2);O.g(!1,!0)}}}},Ua={a:function(b){var c=b.fromLayerSize,f=b.toLayerSize,l=b.toSparsity,m=l*f,k=m/c,t=c/f,n,h,p,v,u=0,E=0,H=0,Q=Array(l*f*l*f*4),R=Array(l*f*l*f*4),M=Array(c*c);for(n=0;n<M.length;++n)M[n]=0;var L=Math.floor(l/2),g=.5/f,B=
.5/c,C=.5/m;for(n=0;n<f;++n)for(h=0;h<f;++h){var da=Math.round(n*t);var xa=Math.round(h*t);var za=n/f;var ra=h/f;za+=g;ra+=g;for(p=0;p<l;++p)for(v=0;v<l;++v){var Z=u/m;var d=E/m;var G=da+p-L;var N=xa+v-L;0>G&&(G+=c);0>N&&(N+=c);G>=c&&(G-=c);N>=c&&(N-=c);var U=G/c;var ea=N/c;d=1-d-1/m;U+=B;ea+=B;Z+=C;d+=C;var ca=n*l+p,ha=h*l+v;ha=f*l-ha-1;ca=ha*f*l+ca;Q[4*ca]=Z;Q[4*ca+1]=d;Q[4*ca+2]=U;Q[4*ca+3]=ea;U=M[N*c+G]++;ea=U%k;G=G*k+ea;N=N*k+(U-ea)/k;N=c*k-1-N;N=N*c*k+G;R[4*N]=Z;R[4*N+1]=d;R[4*N+2]=za;R[4*N+
3]=ra;++u>=m&&(u=0,++E);++H}}var sa=X.a(b.weights);X.a({width:m,isFloat:!0,array:new Float32Array(R),isPot:!0});R=null;var la=X.a({width:m,isFloat:!0,array:new Float32Array(Q),isPot:!0});Q=null;return{W:!0,ja:function(){return k},F:function(){r.set("s23");sa.b(1);la.b(2);O.g(!1,!1)}}}},Xa={a:function(b){var c=b.kernelsNumber,f=b.toSparsity,l=f*b.toLayerSize/b.fromLayerSize,m=X.a(b.weights);return{W:!0,ja:function(){return l},Hd:function(){return f},zc:function(){return m},F:function(){r.set("s26");
r.u("u24",c);r.u("u25",f);r.u("u18",b.toLayerSize);r.u("u26",b.fromLayerSize);m.b(1);O.g(!1,!1)}}}},Va={a:function(b,c){var f=b.fromLayerSize,l=b.toLayerSize,m=b.toSparsity,k=b.stride?b.stride:1,t=m*l/f,n=l<f,h=f/l,p=X.a(b.weights),v="s47"+[f.toString(),l.toString(),m.toString(),k.toString(),c].join("_");r.qc(v)||(b=Ea(c),l=[{type:"1f",name:"u18",value:l},{type:"1f",name:"u32",value:k}],n&&l.push({type:"1f",name:"u26",value:f}),f=[(n?t:m).toFixed(1),b],n&&f.push(h.toFixed(1)),r.ub(n?"s40":"s39",v,
f),r.H(v,l.concat([{type:"1i",name:"u16",value:0},{type:"1i",name:"u23",value:1},{type:"1i",name:"u15",value:3}])));return{W:!1,ja:function(){return t},F:function(){r.set(v);p.b(3);O.g(!1,!1)}}}},Ra=function(){var b,c,f,l,m,k,t,n,h;return{l:function(p){b=p.Eb?p.Eb:3;c=p.width?p.width:64;l=p.Dc?!0:!1;p={isFloat:!1,width:c,isPot:!1,isFlipY:!1};m=X.a(p);k=X.a(p);t=X.a(p);n=X.a(p);h=X.a({isFloat:!0,width:c,isPot:!1,isFlipY:!1});f=1/c},Xa:function(p){r.set("s37");for(var v=0;v<b;++v)m.j(),r.P("u7",f,0),
O.g(l,!1),k.j(),m.b(0),r.P("u7",0,f),O.g(l,!1),k.b(0);r.set("s36");n.j();p.b(0);O.g(l);r.set("s37");for(v=0;v<b;++v)t.j(),n.b(0),r.P("u7",f,0),O.g(l,!1),n.j(),t.b(0),r.P("u7",0,f),O.g(l,!1);r.set("s38");h.j();p.b(0);k.b(1);n.b(2);O.g(l,!1);h.b(0)},wa:function(){return h}}}();function Za(b,c){b[c]=!0;b.setAttribute(c,"true")}function $a(){return/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream}
function ab(){var b=navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);return[parseInt(b[1],10),parseInt(b[2],10),parseInt(b[3]||0,10)]}function bb(){var b=navigator.userAgent.toLowerCase();return-1!==b.indexOf("safari")&&-1===b.indexOf("chrome")?!0:!1}function cb(){return navigator.mediaDevices&&navigator.mediaDevices.getUserMedia?!0:!1}
function db(b){if(!b)return b;var c=!1;if(b.video){var f=function(l){var m={};"undefined"!==typeof l.min&&(m.min=l.min);"undefined"!==typeof l.max&&(m.max=l.max);"undefined"!==typeof l.ideal&&(m.ideal=l.ideal);return m};c={};"undefined"!==typeof b.video.width&&(c.width=f(b.video.width));"undefined"!==typeof b.video.height&&(c.height=f(b.video.height));"undefined"!==typeof b.video.facingMode&&(c.facingMode=b.video.facingMode)}c={audio:b.audio,video:c};"undefined"!==typeof b.deviceId&&(c.deviceId=b.deviceId);
return c}function eb(b){var c=b.video.width;b.video.width=b.video.height;b.video.height=c;return b}
function fb(b){function c(u){return[480,576,640,648,720,768,800,960,1080,1152,1280,1366,1920].sort(function(E,H){return Math.abs(E-u)-Math.abs(H-u)})}function f(u){var E=db(b);l.push(u(E))}var l=[];if(!b||!b.video)return l;if(b.video.width&&b.video.height){if(b.video.width.ideal&&b.video.height.ideal)for(var m=c(b.video.width.ideal).slice(0,3),k=c(b.video.height.ideal).slice(0,3),t=0,n;t<m.length;++t){n=m[t];for(var h=0,p;h<k.length;++h)if(p=k[h],n!==b.video.width.ideal||p!==b.video.height.ideal){var v=
Math.max(n,p)/Math.min(n,p);v<4/3-.1||v>16/9+.1||f(function(u){u.video.width.ideal=n;u.video.height.ideal=p;return u})}}f(function(u){return eb(u)})}b.video.width&&b.video.height&&(b.video.width.ideal&&b.video.height.ideal&&f(function(u){delete u.video.width.ideal;delete u.video.height.ideal;return u}),f(function(u){delete u.video.width;delete u.video.height;return u}));b.video.facingMode&&(f(function(u){delete u.video.facingMode;return u}),b.video.width&&b.video.height&&f(function(u){eb(u);delete u.video.facingMode;
return u}));l.push({audio:b.audio,video:!0});return l}function gb(b){try{var c=window.matchMedia("(orientation: portrait)").matches?!0:!1}catch(l){c=window.innerHeight>window.innerWidth}if(c&&b&&b.video){c=b.video.width;var f=b.video.height;c&&f&&c.ideal&&f.ideal&&c.ideal>f.ideal&&(b.video.height=c,b.video.width=f)}}
function hb(b){b.volume=0;Za(b,"muted");if(bb()){if(1===b.volume){var c=function(){b.volume=0;window.removeEventListener("mousemove",c,!1);window.removeEventListener("touchstart",c,!1)};window.addEventListener("mousemove",c,!1);window.addEventListener("touchstart",c,!1)}setTimeout(function(){b.volume=0;Za(b,"muted")},5)}}
function ib(b,c,f,l){function m(t){k||(k=!0,f(t))}var k=!1;navigator.mediaDevices.getUserMedia(l).then(function(t){function n(){setTimeout(function(){if(b.currentTime){var h=b.videoWidth,p=b.videoHeight;if(0===h||0===p)m("VIDEO_NULLSIZE");else{h&&(b.style.width=h.toString()+"px");p&&(b.style.height=p.toString()+"px");h={hc:null,Zc:null,Hc:null};try{var v=t.getVideoTracks()[0];v&&(h.Hc=v,h.hc=v.getCapabilities(),h.Zc=v.getSettings())}catch(u){}bb()||$a()?b.parentNode&&null!==b.parentNode?(k||c(b,t,
h),setTimeout(function(){b.play()},100)):(document.body.appendChild(b),hb(b),k||c(b,t,h),setTimeout(function(){b.style.transform="scale(0.0001,0.0001)";b.style.position="fixed";b.style.bottom="0px";b.style.right="0px";hb(b);setTimeout(function(){b.play()},100)},80)):k||c(b,t,h)}}else m("VIDEO_NOTSTARTED")},700)}"undefined"!==typeof b.srcObject?b.srcObject=t:(b.src=window.URL.createObjectURL(t),b.videoStream=t);hb(b);b.addEventListener("loadeddata",function(){var h=b.play();hb(b);"undefined"===typeof h?
n():h.then(function(){n()}).catch(function(){m("VIDEO_PLAYPROMISEREJECTED")})},!1)}).catch(function(t){m(t)})}
function jb(b,c,f){var l=cb()?document.createElement("video"):!1;if(l)if(cb()){if(f&&f.video){if($a()){var m=ab();(12>m[0]||12===m[0]&&2>m[1])&&gb(f)}f.video.width&&f.video.width.ideal&&(l.style.width=f.video.width.ideal+"px");f.video.height&&f.video.height.ideal&&(l.style.height=f.video.height.ideal+"px")}Za(l,"autoplay");Za(l,"playsinline");f&&f.audio?l.volume=0:Za(l,"muted");ib(l,b,function(){function k(n){if(0===n.length)c("INVALID_FALLBACKCONSTRAINS");else{var h=n.shift();ib(l,b,function(){k(n)},
h)}}var t=fb(f);k(t)},f)}else c&&c("MEDIASTREAMAPI_NOTFOUND");else c&&c("VIDEO_NOTPROVIDED")}function kb(b){if(!navigator.mediaDevices||!navigator.mediaDevices.enumerateDevices)return b(!1,"NOTSUPPORTED"),!1;navigator.mediaDevices.enumerateDevices().then(function(c){(c=c.filter(function(f){return f.kind&&-1!==f.kind.toLowerCase().indexOf("video")&&f.label&&f.deviceId}))&&c.length&&0<c.length?b(c,!1):b(!1,"NODEVICESFOUND")}).catch(function(){b(!1,"PROMISEREJECTED")})}
window.JEEFACEFILTERAPI=function(){var b,c,f,l,m,k,t,n,h,p,v,u,E,H;function Q(e){if(P!==y.pause){var q=P===y.play?J.ra:D.$b;W=setTimeout(g.bind(null,e),q)}}function R(){if(P===y.play)return!1;P=y.play;K.timestamp=Date.now();Ca&&window.cancelAnimationFrame(Ca);g(0)}function M(e,q,A,V,S){e=4*(3*q+e)+A;return V+(wa[e]/255+wa[e+12]/65025)*(S-V)}function L(){I.R();O.reset();X.reset();r.X();r.mb();a.disable(a.DEPTH_TEST);a.disable(a.BLEND);O.fa();r.na()}function g(){if(P!==y.pause){r.mb();O.reset();O.fa();
a.disable(a.DEPTH_TEST);I.R();r.na();if(!z.Ta){var e=z.element.currentTime-z.Ba;0>e&&(z.Ba=z.element.currentTime);1E3*e<D.fd||(z.oa.refresh(),z.Ba+=e,r.set("s50"),z.pa.A(),z.oa.b(0),O.g(!1,!1))}if(x.K.length>K.G)x.K.splice(0,x.K.length-K.G);else for(;x.K.length<K.G;)x.K.push(0);if(1!==x.i)if(na.every(Z)){for(var q=0,A=e=0;A<na.length;++A)na[A].detected>q&&(q=na[A].detected,e=0);for(q=0;q<K.G;++q)x.K[q]=e}else{q=0;e=!1;for(A=x.Bb;q<K.G;++q){if(Z(na[A]))if(e){do++A===x.i&&(A=0);while(Z(na[A]))}else e=
!0;x.K[q]=A++;A>=x.i&&(A=0)}x.Bb=A}for(e=0;e<K.G;++e)x.S=x.K[e],x.Wa=(.5+x.S)/x.i,x.yb=x.K.lastIndexOf(x.S)===e,r.set("s51"),J.$&&r.u("u38",na[x.S].rz),1!==x.i&&r.u("u37",x.Wa),pa.A(),z.pa.b(0),ua.b(1),O.g(!1,!1),pa.b(0),oa.F(!1,pa);e=Date.now();K.ia=e-K.timestamp;K.timestamp=e;-1!==T.nDetectsPerLoop?K.G=T.nDetectsPerLoop:(e=D.Ga,K.Gb=K.Fb/K.ia,K.Hb=K.Gb*e+K.Hb*(1-e),K.Ib=1E3/K.ia,K.ba=K.Ib*D.Ga+K.ba*(1-D.Ga),K.ba>D.Z[1]?(e=D.qa[1],1<x.i&&(e+=1,q=na.filter(d).length,e*=Math.max(1,q)),K.G=Math.min(K.G+
1,e),K.ba=(D.Z[0]+D.Z[1])/2):K.ba<D.Z[0]&&(K.G=Math.max(K.G-1,D.qa[0]),K.ba=(D.Z[0]+D.Z[1])/2));I.J();a.viewport(0,0,3,2*x.i);r.set("s49");ua.b(0);O.g(!1,!1);a.readPixels(0,0,3,2*x.i,a.RGBA,a.UNSIGNED_BYTE,wa);for(e=0;e<x.i;++e)if(-1!==x.K.indexOf(e)){var V=e;q=Aa[V];var S=[V];A=na[V];var ia=va[V],qa=2*V;q.ua=M(1,qa,3,0,1);A.detected=ja(A.detected,q.ua,D.Xb);if(q.ua<D.Va)J.$&&(A.rz=0);else{q.x=M(0,qa,1,-1,1);q.y=M(0,qa,2,-1,1);q.M=M(0,qa,3,0,1);q.Ya=M(1,qa,0,-w[0],w[0]);q.Za=M(1,qa,1,-w[1],w[1]);
q.ma=M(1,qa,2,-w[2],w[2]);for(var Ga=0;Ga<D.Aa;++Ga)q.ob[Ga]=D.rc[Ga](M(2,qa,Ga,0,1));S.Ma=q.x-A.x;S.Na=q.y-A.y;S.La=q.M-A.s;S.Ia=q.Ya-A.rx;S.Ja=q.Za-A.ry;S.Ka=J.$?q.ma:q.ma-A.rz;qa=Math.sqrt(S.Ma*S.Ma+S.Na*S.Na+S.La*S.La)/K.ia;S=Math.sqrt(S.Ia*S.Ia+S.Ja*S.Ja+S.Ka*S.Ka)/K.ia;qa=1-Da(ta.translationFactorRange[0],ta.translationFactorRange[1],qa);S=1-Da(ta.rotationFactorRange[0],ta.rotationFactorRange[1],S);S=qa*S*Da(ta.qualityFactorRange[0],ta.qualityFactorRange[1],q.ua);V=ia[++ka[V]%ia.length]=S;for(qa=
0;qa<ia.length;++qa)V=Math.min(V,ia[qa]);V=Math.max(.5,V);S=Math.min(V,S);ia=ja(ta.alphaRange[1],ta.alphaRange[0],Math.pow(S,D.Zb));A.x=ja(A.x,q.x,ia);A.y=ja(A.y,q.y,ia);A.s=ja(A.s,q.M,ia);A.rx=ja(A.rx,q.Ya,ia);A.ry=ja(A.ry,q.Za,ia);A.rz=J.$?A.rz+ia*q.ma:ja(A.rz,q.ma,ia);ia=Math.max(ia,D.Yb);for(V=0;V<D.Aa;++V)A.expressions[V]=ja(A.expressions[V],q.ob[V],ia);++q.za}}I.dd();I.reset();X.reset();a.enable(a.DEPTH_TEST);J.ta&&(1===x.i?J.ta(na[0]):J.ta(na));a.disable(a.BLEND);P===y.play&&(Ca=window.requestAnimationFrame(Q))}}
function B(){function e(A){for(var V=[],S=0;S<x.i;++S)V.push(Object.assign({},A));return V}z.pa=X.a({isPot:!1,isLinear:!0,isFloat:!1,width:ba,height:aa});pa=X.a({isPot:!0,isFloat:!1,width:oa.qb()});var q={width:3,height:x.i,isFloat:!0,isPot:!1,array:function(A){for(var V=new Float32Array(A.length*x.i),S=0,ia;S<x.i;++S)for(ia=0;ia<A.length;++ia)V[S*A.length+ia]=A[ia];return V}(new Float32Array([0,T.borderWidth,T.borderHeight,0,0,0,0,0,0,0,0,0]))};ua=Ma.a(q);wa=new Uint8Array(8*q.width*x.i);Aa=e({ua:0,
x:0,y:0,M:1,Ya:0,Za:0,ma:0,ob:new Float32Array(D.Aa),za:0});na=e({detected:0,x:0,y:0,s:1,rx:0,ry:0,rz:0,expressions:new Float32Array(D.Aa)});e({Ma:0,Na:0,La:0,Ia:0,Ja:0,Ka:0})}function C(){r.H("s51",[{type:"1i",name:"u1",value:0},{type:"1i",name:"u35",value:1},{type:"2f",name:"u36",value:fa},{type:"1f",name:"u37",value:.5},{type:"1f",name:"u38",value:0}]);r.H("s52",[{type:"1i",name:"u39",value:0},{type:"1i",name:"u35",value:1},{type:"1f",name:"u42",value:D.cd},{type:"1f",name:"u43",value:D.Ub},{type:"1f",
name:"u44",value:D.Tb},{type:"3f",name:"u41",value:[D.ab[0]*fa[0],D.ab[1]*fa[1],D.ab[2]]},{type:"1f",name:"u37",value:.5},{type:"1f",name:"u45",value:1},{type:"1f",name:"u38",value:0}]);var e=[{type:"1i",name:"u39",value:0}];r.H("s53",e);r.H("s54",e);r.H("s49",[{type:"1i",name:"u35",value:0},{type:"1f",name:"u48",value:fa[0]},{type:"2f",name:"u47",value:[0,.5/x.i]}])}function da(){var e=oa.qb(),q=ba/e;k=T.minScale*q;t=T.maxScale*q;n=(1-2*T.borderWidth)/T.nStepsX;h=(1-2*T.borderHeight)/T.nStepsY;p=
(t-k)/T.nStepsScale;v=T.borderWidth;u=T.borderHeight;E=1-T.borderWidth;H=1-T.borderHeight;fa=[e/ba,e/aa];b=T.borderWidth;c=T.borderHeight;f=k;l=T.borderWidth;m=T.borderHeight;Ba=k}function xa(e){if(J.ca)za("string"===typeof J.ca?JSON.parse(J.ca):J.ca,e);else{var q=J.cb;"JSON"!==q.toUpperCase().split(".").pop()&&(q+=D.save);ya(q,function(A){A=JSON.parse(A);za(A,e)})}}function za(e,q){e.exportData&&e.exportData.thetaXYZfactor&&(w=e.exportData.thetaXYZfactor);q(e)}function ra(){if(La.l({ha:J.N,width:ba,
height:aa,debug:!1,Lc:function(){Y("GLCONTEXT_LOST")},antialias:!0,premultipliedAlpha:!0})){if(La.Cc())return!0;Y("GL_INCOMPATIBLE");return!1}Y("GL_INCOMPATIBLE");return!1}function Z(e){return e.detected<D.Va}function d(e){return e.detected>D.Va}function G(e,q,A,V){return A>e?Math.max(0,e+q/2-(A-V/2)):Math.max(0,A+V/2-(e-q/2))}function N(){return Aa.some(function(e,q){if(q===x.S)return!1;q=Aa[x.S];if(q.za>e.za||3>e.za||G(q.x/2,q.M,e.x/2,e.M)<D.Db*q.M)return!1;var A=ba/aa;return G(q.y/2,q.M*A,e.y/
2,e.M*A)>D.Db*q.M*A})}function U(){var e=x.S;ua.Vc(1);1!==x.i&&(a.viewport(0,0,3,x.i),r.set("s0"),r.Ob("u1",1),O.g(!1,!1),r.Ob("u1",0));a.viewport(0,e,1,1);r.set("s52");J.$&&r.u("u38",na[e].rz);1!==x.i&&r.u("u37",x.Wa);if(1<x.i){var q=N()?0:1;r.u("u45",q)}r.Xc("u40",l,m,Ba);O.g(!1,!1);x.yb&&(a.viewport(1,e,1,1),r.set("s53"),O.g(!1,!1),a.viewport(2,e,1,1),r.set("s54"),O.g(!1,!1));f+=p;f>t&&(b+=n,f=k,b>E&&(b=v,c+=h,c>H&&(c=u)));l=b+.8*(Math.random()-.5)*n;m=c+.8*(Math.random()-.5)*h;Ba=f+.8*(Math.random()-
.5)*p}function ea(){z.oa=X.a({D:z.element,isPot:!1,isFloat:!1,isFlipY:!0})}function ca(){r.H("s50",[{type:"1i",name:"u1",value:0},{type:"mat2",name:"u34",value:z.C}])}function ha(){z.B[0]=.5;z.B[1]=.5;var e=z.O[1]/z.O[0],q=La.L()/La.w();90===Math.abs(F.rotate)&&(e=1/e);e>q?z.B[1]*=q/e:z.B[0]*=e/q;r.H("s52",[{name:"u46",type:"1f",value:q}]);z.C[0]=0;z.C[1]=0;z.C[2]=0;z.C[3]=0;switch(F.rotate){case 0:z.C[0]=z.B[0];z.C[3]=z.B[1];break;case 180:z.C[0]=-z.B[0];z.C[3]=-z.B[1];break;case 90:z.C[1]=z.B[0];
z.C[2]=-z.B[1];break;case -90:z.C[1]=-z.B[0],z.C[2]=z.B[1]}}function sa(e,q){if(P===y.error)return!1;var A=e.videoHeight;z.O[0]=e.videoWidth;z.O[1]=A;z.element=e;q&&q();return!0}function la(e,q,A){e&&e();e={video:{facingMode:{ideal:F.facingMode},width:{min:F.minWidth,max:F.maxWidth,ideal:F.idealWidth},height:{min:F.minHeight,max:F.maxHeight,ideal:F.idealHeight}},audio:!1};F.deviceId&&(e.deviceId=F.deviceId);jb(function(V){q&&q(V);A(V)},function(){Y("WEBCAM_UNAVAILABLE")},e)}function Y(e){P!==y.error&&
(P=y.error,J.ga_&&J.ga_(e))}function ma(e,q){for(var A in e)"undefined"!==typeof q[A]&&(e[A]=q[A]);q===T&&T.nDetectsPerLoop&&(K.G=T.nDetectsPerLoop,K.Fb=T.nDetectsPerLoop)}var D={save:"NNC.json",gb:0,$b:25,Ga:.2,Z:[45,55],hd:1/3.5,qa:[2,6],Oc:{minScale:.15,maxScale:.6,borderWidth:.2,borderHeight:.2,nStepsX:6,nStepsY:5,nStepsScale:3,nDetectsPerLoop:-1},ab:[.092,.092,.3],cd:50,Db:.12,Va:.6,Ic:8,Ub:.75,Tb:1,ad:{translationFactorRange:[.0015,.005],rotationFactorRange:[.003,
.02],qualityFactorRange:[.9,.98],alphaRange:[.05,1]},bd:[.65,1,.262],Xb:.2,Zb:2,Yb:.1,Jc:8,Aa:1,rc:[Da.bind(null,.3,.75)],fd:20},F={facingMode:"user",idealWidth:800,idealHeight:600,minWidth:480,maxWidth:1280,minHeight:480,maxHeight:1280,rotate:0},y={Fc:-1,error:-2,tb:0,play:1,pause:2},P=y.tb,z={Ta:!1,element:!1,oa:!1,pa:!1,O:[0,0],B:[.5,.5],C:[.5,0,0,.5],Ba:0},J={ga_:!1,ta:!1,cb:"./",ca:!1,N:!1,ra:D.gb,Kb:D.gb,ya:!1,$:!1},oa,T=Object.create(D.Oc),ta=Object.create(D.ad);var Ba=f=m=l=c=b=t=k=H=E=u=v=
p=h=n=0;var ba,aa,fa,pa,ua,wa,Aa,na,W=!1,Ca=!1,w=D.bd,x={i:1,S:0,K:[0],yb:!1,Bb:0,Wa:0},K={ia:0,timestamp:0,Gb:0,Hb:0,G:D.qa[0],Fb:D.qa[0],Ib:0,ba:0,od:1},va=[],ka=[];return{init:function(e){function q(){P!==y.error&&2===++V&&(ha(),ea(),ca(),J.ga_&&(J.ga_(!1,{GL:a,canvasElement:J.N,videoTexture:z.pa.get(),maxFacesDetected:x.i}),L()),R())}if(P!==y.tb)return e.callbackReady&&e.callbackReady("ALREADY_INITIALIZED"),!1;P=y.Fc;e.callbackReady&&(J.ga_=e.callbackReady);e.callbackTrack&&(J.ta=e.callbackTrack);
"undefined"!==typeof e.animateDelay&&(J.ra=e.animateDelay);"undefined"!==typeof e.NNCpath&&(J.cb=e.NNCpath);"undefined"!==typeof e.NNC&&(J.ca=e.NNC);"undefined"!==typeof e.maxFacesDetected&&(x.i=Math.max(1,e.maxFacesDetected));"undefined"!==typeof e.followZRot&&(J.$=e.followZRot?!0:!1);if(x.i>D.Ic)return Y("MAXFACES_TOOHIGH"),!1;if(!e.canvasId&&!e.canvas)return Y("NO_CANVASID"),!1;J.N=e.canvas?e.canvas:document.getElementById(e.canvasId);if(!J.N)return Y("INVALID_CANVASID"),!1;ba=J.N.width;aa=J.N.height;
if(!ba||!aa)return Y("INVALID_CANVASDIMENSIONS"),!1;for(var A=0;A<x.i;++A)va.push(new Float32Array(D.Jc)),ka.push(0);e.scanSettings&&ma(T,e.scanSettings);e.stabilizationSettings&&ma(ta,e.stabilizationSettings);var V=0;e.videoSettings&&e.videoSettings.videoElement?sa(e.videoSettings.videoElement,q):(e.videoSettings&&ma(F,e.videoSettings),la(e.onWebcamAsk,e.onWebcamGet,function(S){sa(S,q)}));xa(function(S){if(!ra())return!1;oa=new Ya;oa.Qc(S.layers);oa.Tc({Jb:"gpuRawAvg",Mc:U});r.Wb([{id:"s50",name:"_",
Y:"attribute vec2 a0;uniform mat2 u34;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=vec2(.5,.5)+u34*a0;}",sa:["a0"],da:[2],c:"uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",f:["u1","u34"],precision:"lowp"},{id:"s51",name:"_",c:"uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",Y:"attribute vec2 a0;uniform sampler2D u35;uniform vec2 u36;uniform float u37,u38;varying vec2 vv0;void main(){vec4 a=texture2D(u35,vec2(.17,u37));vec2 d=a.gb,e=a.a*u36;float b=cos(u38),c=sin(u38);vec2 g=mat2(b,c,-c,b)*a0;vv0=d+g*.5*e,gl_Position=vec4(a0,0.,1.);}",
sa:["a0"],da:[2],f:["u1","u35","u36","u37","u38"],precision:"lowp"},{id:"s52",name:"_",c:"uniform sampler2D u39,u35;uniform vec3 u40,u41;uniform float u42,u43,u44,u37,u45,u38,u46;const vec4 n=vec4(1.,1.,1.,1.),o=vec4(0.,0.,0.,0.),e=vec4(.25,.25,.25,.25);void main(){vec4 g=texture2D(u39,vec2(.625,.625)),h=texture2D(u39,vec2(.875,.625)),a=texture2D(u35,vec2(.17,u37));float b=dot(g,e),i=dot(h,e);bool j=b>u43&&b>i+u44;j?a.r=2.:a.r>u42?a.r=0.:a.r>1.9?a.r+=1.:0.,a.r*=u45;if(a.r<.9)a=vec4(1.,u40);else{a.r*=step(1.9,a.r);float k=dot(e,texture2D(u39,vec2(.875,.875))),l=dot(e,texture2D(u39,vec2(.125,.625))),m=dot(e,texture2D(u39,vec2(.375,.625))),c=cos(u38),d=sin(u38);vec2 f=mat2(c,d*u46,-d/u46,c)*vec2(k,l);a.gba+=vec3(f,m)*u41*a.a;}gl_FragColor=a;}",
Y:"attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",f:"u39 u35 u40 u42 u41 u45 u38 u46 u43 u44 u37".split(" ")},{id:"s53",name:"_",Y:"attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",c:"uniform sampler2D u39;const vec4 e=vec4(.25,.25,.25,.25);const vec3 g=vec3(.5,.5,.5);void main(){float a=dot(e,texture2D(u39,vec2(.125,.875))),b=dot(e,texture2D(u39,vec2(.375,.875))),c=dot(e,texture2D(u39,vec2(.625,.875))),d=dot(e,texture2D(u39,vec2(.625,.625)));vec3 f=vec3(a,b,c)*.5+g;gl_FragColor=vec4(f,d);}",
f:["u39"]},{id:"s54",name:"_",Y:"attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",c:"uniform sampler2D u39;const vec4 e=vec4(.25,.25,.25,.25);void main(){float a=dot(e,texture2D(u39,vec2(.25,.25)));gl_FragColor=vec4(a,0.,0.,0.);}",f:["u39"]},{id:"s49",name:"_",c:"uniform sampler2D u35;uniform vec2 u47;uniform float u48;varying vec2 vv0;void main(){float g=step(.5,mod(gl_FragCoord.y+1.5,2.)),c=step(.33,vv0.x);vec4 a=texture2D(u35,vv0+u47);a.a=mix(a.a*u48,a.a,c);vec4 d=floor(255.*a),f=255.*(255.*a-d),b=mix(d,f,g)/255.;b.x=mix(step(a.x,1.5),b.x,c),gl_FragColor=b;}",
f:["u35","u48","u47"]}]);B();da();C();q()});return!0},toggle_pause:function(e){if(-1!==[y.play,y.pause].indexOf(P))return e?P!==y.play?e=!1:(W&&(clearTimeout(W),W=!1),Ca&&(window.cancelAnimationFrame(Ca),Ca=!1),P=y.pause,e=!0):e=R(),e},toggle_slow:function(e){-1!==[y.play,y.pause].indexOf(P)&&P===y.play&&(e&&!J.ya?(J.Kb=J.ra,T.nDetectsPerLoop=1,this.Rc(100),J.ya=!0):!e&&J.ya&&(T.nDetectsPerLoop=-1,this.Rc(J.Kb),J.ya=!1))},set_animateDelay:function(e){J.ra=e},resize:function(){var e=J.N.width,q=J.N.height;
if(e===ba&&q===aa)return!1;ba=e;aa=q;da();C();ha();ca();return!0},set_inputTexture:function(e,q,A){z.O[0]=q;z.O[1]=A;z.Ta=!0;ha();L();ca();r.set("s50");z.pa.A();a.activeTexture(a.TEXTURE0);a.bindTexture(a.TEXTURE_2D,e);O.g(!0,!0)},reset_inputTexture:function(){z.O[0]=z.element.videoWidth;z.O[1]=z.element.videoHeight;z.Ta=!1;ha();ca()},get_videoDevices:function(e){return kb(e)},set_scanSettings:function(e){ma(T,e);da();C()},set_stabilizationSettings:function(e){ma(ta,e)},update_videoElement:function(e,
q){sa(e,function(){ea();ha();q&&q()})}}}();
;return JEEFACEFILTERAPI;})();
 const JeelizResizer = (function(){
   //private vars :
   var _domCanvas, _whCanvasPx, _resizeAttemptsCounter=0, _overSamplingFactor=1, _isFullScreen=false, _timerFullScreen=false, _callbackResize=false;
   const _cameraResolutions=[ //all resolutions should be in landscape mode
     [640,480],
     [768,480],
     [800,600],
     [960,640],
     [960,720],
     [1024,768],
     [1280,720]
   ];
   var _isInvFullscreenWH = false;

   //private functions
   function add_CSStransform(domElement, CSS){
     var CSStransform=domElement.style.transform;
     if (CSStransform.indexOf(CSS) !== -1) return;
     domElement.style.transform=CSS+' '+CSStransform;
   }

   //compute overlap between 2 rectangles A and B
   //characterized by their width and their height in pixels
   //the rectangles are centered
   //return the ratio (pixels overlaped)/(total pixels)
   function compute_overlap(whA, whB){
     const aspectRatioA = whA[0] / whA[1];
     const aspectRatioB = whB[0] / whB[1]; //higher aspectRatio -> more landscape

     var whLandscape, whPortrait;
     if (aspectRatioA>aspectRatioB){
       whLandscape = whA, whPortrait = whB;
     } else {
       whLandscape = whB, whPortrait = whA;
     }

     //the overlapped area will be always a rectangle
     const areaOverlap = Math.min(whLandscape[0], whPortrait[0])*Math.min(whLandscape[1], whPortrait[1]);

     var areaTotal;
     if (whLandscape[0]>=whPortrait[0] && whLandscape[1]>=whPortrait[1]){ //union is a rectangle
       areaTotal = whLandscape[0]*whLandscape[1];
     } else if (whPortrait[0]>whLandscape[0] && whPortrait[1]>whLandscape[1]){ //union is a rectangle
       areaTotal = whPortrait[0]*whPortrait[1];
     } else { //union is a cross
       areaTotal = whLandscape[0]*whLandscape[1];
       areaTotal += (whPortrait[1]-whLandscape[1])*whPortrait[0];
     }

     return areaOverlap / areaTotal;
   } //end compute_overlap()

   function update_sizeCanvas(){
     const domRect = _domCanvas.getBoundingClientRect();
     _whCanvasPx=[
       Math.round(_overSamplingFactor * domRect.width),
       Math.round(_overSamplingFactor * domRect.height)
     ];
     _domCanvas.setAttribute('width',  _whCanvasPx[0]);
     _domCanvas.setAttribute('height', _whCanvasPx[1]);
   }

   function on_windowResize(){
     if (_timerFullScreen){
       clearTimeout(_timerFullScreen);
     }
     _timerFullScreen = setTimeout(resize_fullScreen, 50);
   }

   function resize_canvasToFullScreen(){
     _whCanvasPx=[window['innerWidth'], window['innerHeight']];
     if (_isInvFullscreenWH){
       _whCanvasPx.reverse();
     }
     _domCanvas.setAttribute('width',  _whCanvasPx[0]);
     _domCanvas.setAttribute('height', _whCanvasPx[1]);
   }

   function resize_fullScreen(){
     resize_canvasToFullScreen();
     JEEFACEFILTERAPI.resize();
     _timerFullScreen=false;
     if (_callbackResize) {
       _callbackResize();
     }
   }

   //public methods :
   const that = { //return true or false if the device is in portrait or landscape mode
     is_portrait: function(){ //https://stackoverflow.com/questions/4917664/detect-viewport-orientation-if-orientation-is-portrait-display-alert-message-ad
       try{
         if (window['matchMedia']("(orientation: portrait)")['matches']){
           return true;
         } else {
           return false;
         }
       } catch(e){
         return (window['innerHeight'] > window['innerWidth']);
       }
     },

     //size canvas to the right resolution
     //should be called after the page loading
     //when the canvas has already the right size
     //options:
     // - <string> canvasId: id of the canvas
     // - <function> callback: function to launch if there was an error or not
     // - <float> overSamplingFactor: facultative. If 1, same resolution than displayed size (default).
     //   If 2, resolution twice higher than real size
     // - <boolean> isFlipY: if we should flip the canvas or not. Default: false
     // - <boolean> isFullScreen: if we should set the canvas fullscreen. Default : false
     // - <function> onResize: function called when the window is resized. Only enabled if isFullScreen=true
     // - <boolean> isInvWH: if we should invert width and height for fullscreen mode only. default=false
     size_canvas: function(options){
       _domCanvas = document.getElementById(options.canvasId);
       _isFullScreen = (typeof(options.isFullScreen)!=='undefined' && options.isFullScreen);
       _isInvFullscreenWH = (typeof(options.isInvWH)!=='undefined' && options.isInvWH);

       if (_isFullScreen){
         //we are in fullscreen mode
         if (typeof(options.onResize)!=='undefined'){
           _callbackResize = options.onResize;
         }
         resize_canvasToFullScreen();
         window.addEventListener('resize', on_windowResize, false);
       } else { //not fullscreen mode

         //get display size of the canvas
         const domRect = _domCanvas.getBoundingClientRect();
         if (domRect.width===0 || domRect.height===0){
           console.log('WARNING in JeelizResize.size_canvas() : the canvas has its width or its height null, Retry a bit later...');
           if (++_resizeAttemptsCounter > 20){
             options.callback('CANNOT_RESIZECANVAS');
             return;
           }
           setTimeout(that.size_canvas.bind(null, options), 50);
           return;
         }

         //do resize canvas :
         _resizeAttemptsCounter=0;
         _overSamplingFactor=(typeof(options.overSamplingFactor)==='undefined') ? 1 : options.overSamplingFactor;
         update_sizeCanvas();
       }

       //flip horizontally if required :
       if (typeof(options.isFlipY)!=='undefined' && options.isFlipY){
         add_CSStransform(_domCanvas, 'rotateY(180deg)');
       }

       //compute the best camera resolutions :
       const allResolutions = _cameraResolutions.slice(0);

       //if we are in portrait mode, the camera is also in portrait mode
       //so we need to set all resolutions to portrait mode
       if (that.is_portrait()){
         allResolutions.forEach(function(wh){
           wh.reverse();
         });
       }

       //sort camera resolutions from the best to the worst :
       allResolutions.sort(function(resA, resB){
         return compute_overlap(resB, _whCanvasPx)-compute_overlap(resA, _whCanvasPx);
       });

       //pick the best camera resolution
       const bestCameraResolution = {
         'idealWidth': allResolutions[0][0],
         'idealHeight':allResolutions[0][1]
       };

       //launch the callback function after a small interval to let it
       //some time to size
       setTimeout(options.callback.bind(null, false, bestCameraResolution), 1);
     }, //end size_canvas()

     resize_canvas: function(){ //should be called if the canvas is resized to update the canvas resolution
       if (_isFullScreen){
         return;
       }
       update_sizeCanvas();
     }
   }; //end that
   return that;
 })();

 THREE.JeelizHelper = (function(){
   //internal settings
   const _settings = {
     rotationOffsetX: 0, //negative -> look upper. in radians
     pivotOffsetYZ: [0.4,0.2], //[0.2,0.2], //XYZ of the distance between the center of the cube and the pivot. enable _settings.isDebugPivotPoint to set this value

     detectionThreshold: 0.75, //sensibility, between 0 and 1. Less -> more sensitive
     detectionHysteresis: 0.05,

     tweakMoveYRotateY: 0.5, //tweak value: move detection window along Y axis when rotate the face

     isDebugPivotPoint: false //display a small cube for the pivot point
   };

   //private vars :
   var _threeRenderer, _threeScene, _maxFaces, _isMultiFaces, _threeCompositeObjects=[], _threePivotedObjects=[], _detect_callback=null,
     _threeVideoMesh, _gl, _glVideoTexture, _threeVideoTexture, _isVideoTextureReady=false, _isSeparateThreejsCanvas=false, _faceFilterCv, _glShpCopy, _isDetected;

   //private funcs :
   function create_threeCompositeObjects(){
     for (let i=0; i<_maxFaces; ++i){
       //COMPOSITE OBJECT WHICH WILL TRACK A DETECTED FACE
       //in fact we create 2 objects to be able to shift the pivot point
       const threeCompositeObject = new THREE.Object3D();
       threeCompositeObject.frustumCulled = false;
       threeCompositeObject.visible = false;

       const threeCompositeObjectPIVOTED = new THREE.Object3D();
       threeCompositeObjectPIVOTED.frustumCulled = false;
       threeCompositeObject.add(threeCompositeObjectPIVOTED);

       _threeCompositeObjects.push(threeCompositeObject);
       _threePivotedObjects.push(threeCompositeObjectPIVOTED);
       _threeScene.add(threeCompositeObject);

       if (_settings.isDebugPivotPoint){
         const pivotCubeMesh = new THREE.Mesh(new THREE.BoxGeometry(0.1,0.1,0.1), new THREE.MeshNormalMaterial({
           side: THREE.DoubleSide,
           depthTest: false
         }));
         pivotCubeMesh.position.copy(threeCompositeObjectPIVOTED.position);
         threeCompositeObject.add(pivotCubeMesh);
         window.pivot = pivotCubeMesh;
         console.log('DEBUG in JeelizHelper: set the position of <pivot> in the console and report the value into JeelizThreejsHelper.js for _settings.pivotOffsetYZ');
       }
     }
   }

   function create_videoScreen(){
     const videoScreenVertexShaderSource = "attribute vec2 position;\n\
        varying vec2 vUV;\n\
        void main(void){\n\
          gl_Position = vec4(position, 0., 1.);\n\
          vUV = 0.5+0.5*position;\n\
        }";
     const videoScreenFragmentShaderSource = "precision lowp float;\n\
        uniform sampler2D samplerVideo;\n\
        varying vec2 vUV;\n\
        void main(void){\n\
          gl_FragColor = texture2D(samplerVideo, vUV);\n\
        }";

     if (_isSeparateThreejsCanvas){
       const compile_shader = function(source, type, typeString) {
         const shader = _gl.createShader(type);
         _gl.shaderSource(shader, source);
         _gl.compileShader(shader);
         if (!_gl.getShaderParameter(shader, _gl.COMPILE_STATUS)) {
           alert("ERROR IN " + typeString + " SHADER : " + _gl.getShaderInfoLog(shader));
           return false;
         }
         return shader;
       };

       const shader_vertex =   compile_shader(videoScreenVertexShaderSource, _gl.VERTEX_SHADER, 'VERTEX');
       const shader_fragment = compile_shader(videoScreenFragmentShaderSource, _gl.FRAGMENT_SHADER, 'FRAGMENT');

       _glShpCopy = _gl.createProgram();
       _gl.attachShader(_glShpCopy, shader_vertex);
       _gl.attachShader(_glShpCopy, shader_fragment);

       _gl.linkProgram(_glShpCopy);
       const samplerVideo = _gl.getUniformLocation(_glShpCopy, 'samplerVideo');

       return;
     }

     //init video texture with red
     _threeVideoTexture = new THREE.DataTexture( new Uint8Array([255,0,0]), 1, 1, THREE.RGBFormat);
     _threeVideoTexture.needsUpdate=true;

     //CREATE THE VIDEO BACKGROUND
     const videoMaterial = new THREE.RawShaderMaterial({
       depthWrite: false,
       depthTest: false,
       vertexShader: videoScreenVertexShaderSource,
       fragmentShader: videoScreenFragmentShaderSource,
       uniforms:{
         samplerVideo: {value: _threeVideoTexture}
       }
     });
     const videoGeometry = new THREE.BufferGeometry()
     const videoScreenCorners = new Float32Array([-1,-1,   1,-1,   1,1,   -1,1]);
     videoGeometry.addAttribute( 'position', new THREE.BufferAttribute( videoScreenCorners, 2 ) );
     videoGeometry.setIndex(new THREE.BufferAttribute(new Uint16Array([0,1,2, 0,2,3]), 1));
     _threeVideoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
     that.apply_videoTexture(_threeVideoMesh);
     _threeVideoMesh.renderOrder = -1000; //render first
     _threeVideoMesh.frustumCulled = false;
     _threeScene.add(_threeVideoMesh);
   } //end create_videoScreen()

   function detect(detectState){
     _threeCompositeObjects.forEach(function(threeCompositeObject, i){
       _isDetected = threeCompositeObject.visible;
       const ds = detectState[i];
       if (_isDetected && ds.detected<_settings.detectionThreshold-_settings.detectionHysteresis){

         //DETECTION LOST
         if (_detect_callback) _detect_callback(i, false);
         threeCompositeObject.visible = false;
       } else if (!_isDetected && ds.detected>_settings.detectionThreshold+_settings.detectionHysteresis){

         //FACE DETECTED
         if (_detect_callback) _detect_callback(i, true);
         threeCompositeObject.visible = true;
       }
     }); //end loop on all detection slots
   }

   function update_positions3D(ds, threeCamera){
     const halfTanFOV = Math.tan(threeCamera.aspect * threeCamera.fov * Math.PI/360); //tan(<horizontal FoV>/2), in radians (threeCamera.fov is vertical FoV)

     _threeCompositeObjects.forEach(function(threeCompositeObject, i){
       if (!threeCompositeObject.visible) return;
       const detectState = ds[i];

       //tweak Y position depending on rx (see)
       const tweak = _settings.tweakMoveYRotateY * Math.tan(detectState.rx);
       const cz = Math.cos(detectState.rz), sz = Math.sin(detectState.rz);

       const xTweak = sz * tweak * detectState.s;
       const yTweak = cz * tweak * (detectState.s/threeCamera.aspect);

       //move the cube in order to fit the head
       const W = detectState.s;    //relative width of the detection window (1-> whole width of the detection window)
       const D = 1 / (2*W*halfTanFOV); //distance between the front face of the cube and the camera

       //coords in 2D of the center of the detection window in the viewport :
       const xv = detectState.x + xTweak;
       const yv = detectState.y + yTweak;

       //coords in 3D of the center of the cube (in the view coordinates system)
       const z = -D - 0.5;   // minus because view coordinate system Z goes backward. -0.5 because z is the coord of the center of the cube (not the front face)
       const x = xv * D * halfTanFOV;
       const y = yv * D * halfTanFOV/threeCamera.aspect;

       //the pivot position depends on rz rotation
       _threePivotedObjects[i].position.set(-sz*_settings.pivotOffsetYZ[0], -cz*_settings.pivotOffsetYZ[0], -_settings.pivotOffsetYZ[1]);

       //move and rotate the cube
       threeCompositeObject.position.set(x,y+_settings.pivotOffsetYZ[0], z+_settings.pivotOffsetYZ[1]);
       threeCompositeObject.rotation.set(detectState.rx+_settings.rotationOffsetX, detectState.ry, detectState.rz, "ZXY");
     }); //end loop on composite objects
   }

   //public methods :
   var that={
     init: function(spec, detectCallback){ //launched with the same spec object than callbackReady. set spec.threejsCanvasId to the ID of the threejsCanvas to be in 2 canvas mode
       _maxFaces = spec.maxFacesDetected;
       _glVideoTexture = spec.videoTexture;
       _gl = spec.GL;
       _faceFilterCv = spec.canvasElement;
       _isMultiFaces = (_maxFaces>1);

       //enable 2 canvas mode if necessary
       var threejsCanvas;
       if (spec.threejsCanvasId){
         _isSeparateThreejsCanvas = true;
         //set the threejs canvas size to the threejs canvas
         threejsCanvas = document.getElementById(spec.threejsCanvasId);
         threejsCanvas.setAttribute('width', _faceFilterCv.width);
         threejsCanvas.setAttribute('height', _faceFilterCv.height);
       } else {
         threejsCanvas = _faceFilterCv;
       }

       if (typeof(detectCallback) !== 'undefined'){
         _detect_callback = detectCallback;
       }

       //INIT THE THREE.JS context
       _threeRenderer = new THREE.WebGLRenderer({
         context: (_isSeparateThreejsCanvas)?null:_gl,
         canvas: threejsCanvas,
         alpha: (_isSeparateThreejsCanvas || spec.alpha)?true:false
       });

       _threeScene = new THREE.Scene();

       create_threeCompositeObjects();
       create_videoScreen();

       const returnedDict = {
         videoMesh: _threeVideoMesh,
         renderer: _threeRenderer,
         scene: _threeScene
       };
       if (_isMultiFaces){
         returnedDict.faceObjects = _threePivotedObjects;
       } else {
         returnedDict.faceObject = _threePivotedObjects[0];
       }
       return returnedDict;
     }, //end that.init()

     detect: function(detectState){
       const ds = (_isMultiFaces) ? detectState : [detectState];

       // update detection states:
       detect(ds);
     },

     get_isDetected: function() {
       return _isDetected;
     },

     render: function(detectState, threeCamera){
       const ds = (_isMultiFaces) ? detectState : [detectState];

       //update detection states
       detect(ds);
       update_positions3D(ds, threeCamera);

       if (_isSeparateThreejsCanvas){
         //render the video texture on the faceFilter canvas :
         _gl.viewport(0,0, _faceFilterCv.width, _faceFilterCv.height);
         _gl.useProgram(_glShpCopy);
         _gl.activeTexture(_gl.TEXTURE0);
         _gl.bindTexture(_gl.TEXTURE_2D, _glVideoTexture);
         _gl.drawElements(_gl.TRIANGLES, 3, _gl.UNSIGNED_SHORT, 0);
       } else {
         //reinitialize the state of THREE.JS because JEEFACEFILTER have changed stuffs
         // -> can be VERY costly !
         _threeRenderer.state.reset();
       }

       //trigger the render of the THREE.JS SCENE
       _threeRenderer.render(_threeScene, threeCamera);
     },

     sortFaces: function(bufferGeometry, axis, isInv){ //sort faces long an axis
       // Useful when a bufferGeometry has alpha : we should render the last faces first
       const axisOffset = {X:0, Y:1, Z:2}[axis.toUpperCase()];
       const sortWay = (isInv) ? -1 : 1;

       // fill the faces array:
       const nFaces = bufferGeometry.index.count/3;
       const faces = new Array(nFaces);
       for (let i=0; i<nFaces; ++i){
         faces[i]=[bufferGeometry.index.array[3*i], bufferGeometry.index.array[3*i+1], bufferGeometry.index.array[3*i+2]];
       }

       // compute centroids:
       const aPos = bufferGeometry.attributes.position.array;
       const centroids = faces.map(function(face, faceIndex){
         return [
           (aPos[3*face[0]]+aPos[3*face[1]]+aPos[3*face[2]])/3,       //X
           (aPos[3*face[0]+1]+aPos[3*face[1]+1]+aPos[3*face[2]+1])/3, //Y
           (aPos[3*face[0]+2]+aPos[3*face[1]+2]+aPos[3*face[2]+2])/3, //Z
           face
         ];
       });

       // sort centroids:
       centroids.sort(function(ca, cb){
         return (ca[axisOffset]-cb[axisOffset])*sortWay;
       });

       // reorder bufferGeometry faces:
       centroids.forEach(function(centroid, centroidIndex){
         const face=centroid[3];
         bufferGeometry.index.array[3*centroidIndex]=face[0];
         bufferGeometry.index.array[3*centroidIndex+1]=face[1];
         bufferGeometry.index.array[3*centroidIndex+2]=face[2];
       });
     }, //end sortFaces

     get_threeVideoTexture: function(){
       return _threeVideoTexture;
     },

     apply_videoTexture: function(threeMesh){
       if (_isVideoTextureReady){
         return;
       }
       threeMesh.onAfterRender = function(){
         // Replace _threeVideoTexture.__webglTexture by the real video texture:
         try {
           _threeRenderer.properties.update(_threeVideoTexture, '__webglTexture', _glVideoTexture);
           _threeVideoTexture.magFilter=THREE.LinearFilter;
           _threeVideoTexture.minFilter=THREE.LinearFilter;
           _isVideoTextureReady=true;
         } catch(e){
           console.log('WARNING in THREE.JeelizHelper : the glVideoTexture is not fully initialized');
         }
         delete(threeMesh.onAfterRender);
       };
     },

     // create an occluder, IE a transparent object which writes on the depth buffer:
     create_threejsOccluder: function(occluderURL, callback){
       const occluderMesh = new THREE.Mesh();
       new THREE.BufferGeometryLoader().load(occluderURL, function(occluderGeometry){
         const mat = new THREE.ShaderMaterial({
           vertexShader: THREE.ShaderLib.basic.vertexShader,
           fragmentShader: "precision lowp float;\n void main(void){\n gl_FragColor=vec4(1.,0.,0.,1.);\n }",
           uniforms: THREE.ShaderLib.basic.uniforms,
           colorWrite: false
         });

         occluderMesh.renderOrder = -1; //render first
         occluderMesh.material = mat;
         occluderMesh.geometry = occluderGeometry;
         if (typeof(callback)!=='undefined' && callback) callback(occluderMesh);
       });
       return occluderMesh;
     },

     set_pivotOffsetYZ(pivotOffset) {
       _settings.pivotOffsetYZ = pivotOffset;
     }
   }
   return that;
 })();