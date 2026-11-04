import{mountOrbitalUI as G}from"./plate-entry-CQHVG7pM.js";import{V as b,L as I,k as z,l as B,m as E,C as V,a as O,b as j,n as M,B as W,j as S,Q as N,o as k}from"./three-CWlx7MtU.js";import{C as R,I as T}from"./viewer-3d53alGJ.js";import"./explorer-links-BoXD8NWo.js";import"./embed-bridge-BuKhgJh_.js";const F=e=>e?.name==="upper_near_guide"||e?.name==="upper_far_guide",U=R.find(e=>e.id==="ember").accent;function q(e,l,i,n){const u=e.meshes.filter(F),r=[],t=new T(new b(1,1),e.view,l);t.occluderObjects=e.meshes,t.enabled=!1;let m,p=0,v=0;return{pass:t,sync(f,y){if(t.selectedObjects=y?u:r,t.hoveredObjects=f&&!y?u:r,t.enabled=!!(u.length&&(f||y)),!t.enabled)return;const a=n?.()||U;m!==a&&(m=a,t.visibleEdgeColor.setHex(parseInt(a.slice(1),16),I));const o=i.domElement;(o.width!==p||o.height!==v)&&(p=o.width,v=o.height,t.setSize(p,v)),t.material.uniforms.scale.value=1.55*o.width/Math.max(1,o.clientWidth)},stats:()=>({hovered:!!t.hoveredObjects.length,selected:!!t.selectedObjects.length,rails:u.length,accent:m,enabled:t.enabled}),dispose(){t.dispose()}}}function A(e,l){const i=e.filter(F),n=new z,u=new b,r=[];return(t,m)=>{u.set(t,m),n.setFromCamera(u,l),n.near=l.near,n.far=l.far,r.length=0;for(const p of i)p.visible&&p.raycast(n,r);if(!r.length)return null;for(const p of r)n.far=Math.min(n.far,p.distance);n.far-=1e-5,r.length=0;for(const p of e)if(!(!p.visible||i.includes(p))&&(p.raycast(n,r),r.length))return null;return"guide"}}const H=`
  uniform vec2 cssViewport;
  varying vec2 offsetPx;
  void main() {
    offsetPx = position.xy * 20.0;
    vec4 anchor = projectionMatrix * modelViewMatrix * vec4(0., 0., 0., 1.);
    gl_Position = anchor;
    gl_Position.xy += offsetPx * 2.0 * anchor.w / cssViewport;
  }`,L=`
  varying vec2 offsetPx;
  uniform vec3 ink;
  uniform float radius, core, opacity;
  void main() {
    float d = length(offsetPx);
    float aa = max(0.3, 0.6 * fwidth(d));
    float ring = 1.0 - smoothstep(0.72-aa, 0.72+aa, abs(d-radius));
    float dot = core > 0.0 ? 1.0 - smoothstep(core-aa,core+aa,d) : 0.0;
    float coverage = max(ring, dot) * opacity;
    if (coverage < 0.004) discard;
    gl_FragColor = vec4(ink, coverage);
  }`;function Q(e){const l=[],i=[],n=[],u=[];for(let t=0;t<=64;t++){const m=.04+.92*t/64,p=e(m),v=e(m+1e-4).sub(e(m-1e-4)).normalize();for(const f of[-1,1])l.push(p.x,p.y,p.z),i.push(v.x,v.y,v.z),n.push(f);if(t<64){const f=t*2;u.push(f,f+2,f+1,f+1,f+2,f+3)}}const r=new W;return r.setAttribute("position",new S(l,3)),r.setAttribute("direction",new S(i,3)),r.setAttribute("sideSign",new S(n,1)),r.setIndex(u),r}function D({pointAt:e,stops:l,canvas:i}){const n=new B;n.name="Discharge layer stops";const u=[.04,.5,.96],r={value:new b(1,1)},t=new E(1,1),m=l.map((o,d)=>{const s=e(u[d]),h={cssViewport:r,ink:{value:new V},radius:{value:3.7},core:{value:0},opacity:{value:1}},c=new O(t,new j({uniforms:h,vertexShader:H,fragmentShader:L,transparent:!0,depthTest:!0,depthWrite:!1,toneMapped:!1}));return c.name=o.label,c.position.copy(s),c.frustumCulled=!1,c.renderOrder=3,n.add(c),{...o,point:s,marker:c}}),p={value:m.map(()=>new M)},v={value:new b(1,1)},f=new O(Q(e),new j({transparent:!0,depthTest:!0,depthWrite:!1,toneMapped:!1,uniforms:{cssViewport:r,apertures:p,deviceScale:v,ink:{value:new V(7963263)},fade:{value:1}},vertexShader:`
      uniform vec2 cssViewport;
      attribute vec3 direction; attribute float sideSign;
      varying float crossStroke;
      void main() {
        vec4 anchor = projectionMatrix * modelViewMatrix * vec4(position,1.);
        vec4 delta = projectionMatrix * modelViewMatrix * vec4(direction,0.);
        vec2 tangent = (delta.xy * anchor.w - anchor.xy * delta.w) * cssViewport;
        vec2 perpendicular = vec2(-tangent.y, tangent.x) / max(length(tangent),0.00001);
        crossStroke = sideSign * 1.65;
        gl_Position = anchor;
        gl_Position.xy += perpendicular * crossStroke * 2.0 * anchor.w / cssViewport;
      }`,fragmentShader:`
      uniform vec3 apertures[3], ink; uniform vec2 deviceScale; uniform float fade;
      varying float crossStroke;
      void main() {
        vec2 p = gl_FragCoord.xy / deviceScale;
        float edge = 10000.0;
        for (int i=0;i<3;i++) {
          edge = min(edge, distance(p, apertures[i].xy) - apertures[i].z);
        }
        float aa = max(0.28, 0.52 * fwidth(crossStroke));
        float stroke = 1.0 - smoothstep(0.70-aa, 0.70+aa, abs(crossStroke));
        gl_FragColor = vec4(ink, stroke * smoothstep(-0.5,0.5,edge) * fade);
      }`}));f.frustumCulled=!1,f.renderOrder=2,n.add(f);const y=new M;f.onBeforeRender=(o,d,s)=>{const h=Math.max(1,i.clientWidth),c=Math.max(1,i.clientHeight);r.value.set(h,c),v.value.set(i.width/h,i.height/c),f.material.uniforms.fade.value=f.material.opacity,m.forEach(({point:g,marker:w},x)=>{y.copy(g).project(s),p.value[x].set((y.x+1)*h/2,(y.y+1)*c/2,w.visible?w.material.uniforms.radius.value+3.75:-1)})};function a(o,d,s,h){const c=o.marker.material.uniforms;c.radius.value=d?6:3.7+s*1.25,c.core.value=d?2.3:s*1.45,c.ink.value.set(d?28072:s>0?3423808:5792095),c.opacity.value=h}return{group:n,track:f,nodes:m,opacity:0,paintNode:a}}function C(){return{position:new M,rotation:new N,opacity:0}}function _(e,l,i){e.position.copy(l.position),e.rotation.copy(l.quaternion),e.opacity=i}function X(e){const i=(e.floor?[...e.meshes,e.floor]:e.meshes).map(a=>({mesh:a,original:a.material,fade:null,weight:Number(a.visible),from:C(),to:C()})),n=new Map,u=new Map;let r=!1,t=!1;function m(a,o,d){let s=u.get(a);s||(s=[],u.set(a,s));const h=s.find(w=>w.from===o&&w.to===d);if(h)return h.material;let c=n.get(a);c||(c=[],n.set(a,c));let g=c[s.length];return g||(g=a.clone(),g.transparent=!0,g.depthWrite=!1,g.forceSinglePass=!0,c.push(g)),s.push({from:o,to:d,material:g}),g}function p(){for(const a of i){const{mesh:o}=a,d=t||r?a.weight:Number(o.visible);_(a.from,o,d),a.weight=d}t=!1,r=!0}function v(){if(r){u.clear();for(const a of i){const{mesh:o,original:d,from:s,to:h}=a;if(_(h,o,Number(o.visible)),s.opacity!==h.opacity){const c=g=>m(g,s.opacity,h.opacity);a.fade=Array.isArray(d)?d.map(c):c(d)}else a.fade=null}t=!0,r=!1,f(0)}}function f(a){if(!t)return;const o=k.smoothstep(a,0,1);for(const[d,s]of u)for(const h of s)h.material.opacity=d.opacity*k.lerp(h.from,h.to,o);for(const d of i){const{mesh:s,original:h,fade:c,from:g,to:w}=d,x=k.lerp(g.opacity,w.opacity,o);if(o===0||o===1){const P=o===0?g:w;s.position.copy(P.position),s.quaternion.copy(P.rotation)}else s.position.lerpVectors(g.position,w.position,o),s.quaternion.slerpQuaternions(g.rotation,w.rotation,o);s.visible=x>0,s.material=c&&x>0&&x<1?c:h,d.weight=x}e.view.updateMatrixWorld(!0),o===1&&(t=!1)}function y(){f(1);for(const a of i)a.mesh.material=a.original;for(const a of n.values())for(const o of a)o.dispose();n.clear(),u.clear(),t=r=!1}return{capture:p,target:v,apply:f,dispose:y}}function Y(e,l){const i=e.view?.enabled?e.view:null;return{x:l.left+l.width/2-(i?i.offsetX/i.width*l.width:0),y:l.top+l.height/2-(i?i.offsetY/i.height*l.height:0),scale:l.height*e.zoom}}function $(e,l,i,n,u){const{width:r,height:t}=l;if(!r||!t)return;const m=l.left+r/2,p=l.top+t/2,v=(m-n.x)*(1-u)-i/2*u,f=(p-n.y)*(1-u);e.zoom=n.scale/t*(1-u)+u,v||f?e.setViewOffset(r,t,v,f,r,t):e.clearViewOffset()}function oe(e){return G(e,{createGuideOutline:q,createGuidePicker:A,createStationRail:D,createChapterPose:X,readScreenFrame:Y,applyScreenFrame:$})}export{oe as mountOrbitalUI};
