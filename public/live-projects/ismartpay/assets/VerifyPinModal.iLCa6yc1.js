import{j as r}from"./query-vendor.DCyrj0Pe.js";import{u as b,b as h,r as x}from"./react-vendor.BKnltXzs.js";import{u as f}from"./utils-vendor.DCR81sMe.js";import{u as v,L as w}from"./index.DbxdI2Sr.js";import{s as S}from"./securityService.CSoRZ_ZB.js";const P=({open:p,onClose:c})=>{const g=b(),{t:o}=f();if(!p)return null;const n=()=>{const e=JSON.parse(localStorage.getItem("userData")||"{}"),l=localStorage.getItem("userType")||localStorage.getItem("user_type"),s=(e?.userType||e?.user_type||e?.usertype||l||"individual").toLowerCase(),m=s==="business"||s==="business_contact";c(),m&&localStorage.setItem("businessSettingsActiveTab","security"),g(`${m?"/settings/business":"/settings/individual"}#security`,{replace:!0}),setTimeout(()=>{window.location.hash!=="#security"&&(window.location.hash="security")},100)},i=e=>{e.target===e.currentTarget&&c()},a=e=>{e.stopPropagation()};return h.createPortal(r.jsxs("div",{style:{position:"fixed",inset:0,backgroundColor:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:10002,backdropFilter:"blur(4px)"},onClick:i,children:[r.jsxs("div",{style:{backgroundColor:"var(--card)",borderRadius:16,padding:32,width:"100%",maxWidth:420,boxShadow:"var(--shadow-xl)",animation:"slideIn 0.3s ease-out",position:"relative",zIndex:10003},onClick:a,children:[r.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:24},children:[r.jsx("div",{style:{width:64,height:64,borderRadius:"50%",background:"linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16,boxShadow:"0 4px 12px rgba(245, 158, 11, 0.3)"},children:r.jsx("span",{className:"material-symbols-outlined",style:{fontSize:32,color:"white"},children:"lock_open"})}),r.jsx("h3",{style:{margin:0,marginBottom:8,color:"var(--text-primary)",fontSize:"24px",fontWeight:700,textAlign:"center"},children:o("securityPinRequired",{ns:"common"})}),r.jsx("p",{style:{margin:0,color:"var(--text-muted)",fontSize:"14px",textAlign:"center",lineHeight:"20px"},children:o("setSecurityPinBeforeAction",{ns:"common"})})]}),r.jsxs("div",{style:{display:"flex",gap:12,flexDirection:"column"},children:[r.jsxs("button",{type:"button",onClick:e=>{e.preventDefault(),e.stopPropagation(),n()},style:{width:"100%",padding:"14px 20px",borderRadius:10,border:"none",background:"var(--accent)",color:"var(--text-inverse)",cursor:"pointer",fontSize:"15px",fontWeight:600,transition:"all 0.2s ease",boxShadow:"var(--shadow-md)",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},onMouseEnter:e=>{e.target.style.background="var(--accent-hover)",e.target.style.boxShadow="var(--shadow-lg)",e.target.style.transform="translateY(-1px)"},onMouseLeave:e=>{e.target.style.background="var(--accent)",e.target.style.boxShadow="var(--shadow-md)",e.target.style.transform="translateY(0)"},children:[r.jsx("span",{className:"material-symbols-outlined",style:{fontSize:"20px"},children:"settings"}),o("goToSettings",{ns:"common"})]}),r.jsx("button",{type:"button",onClick:e=>{e.preventDefault(),e.stopPropagation(),c()},style:{width:"100%",padding:"14px 20px",borderRadius:10,border:"2px solid var(--border-primary)",background:"var(--bg-input)",color:"var(--text-secondary)",cursor:"pointer",fontSize:"15px",fontWeight:600,transition:"all 0.2s ease"},onMouseEnter:e=>{e.target.style.borderColor="var(--border-secondary)",e.target.style.background="var(--bg-hover)"},onMouseLeave:e=>{e.target.style.borderColor="var(--border-primary)",e.target.style.background="var(--bg-input)"},children:o("cancel",{ns:"common"})})]})]}),r.jsx("style",{children:`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 1024px) {
          div[style*="maxWidth: 420"] {
            max-width: min(90vw, 400px) !important;
          }
          div[style*="padding: 32"] {
            padding: 24px !important;
          }
        }

        @media (max-width: 768px) {
          div[style*="maxWidth: 420"] {
            max-width: min(95vw, 380px) !important;
          }
          div[style*="padding: 32"] {
            padding: 20px !important;
          }
          h3[style*="fontSize: '24px'"] {
            font-size: 20px !important;
          }
          div[style*="marginBottom: 24"] {
            margin-bottom: 18px !important;
          }
        }

        @media (max-width: 480px) {
          div[style*="maxWidth: 420"] {
            max-width: calc(100vw - 16px) !important;
          }
          div[style*="padding: 32"] {
            padding: 16px !important;
          }
          h3[style*="fontSize: '24px'"] {
            font-size: 18px !important;
          }
          p[style*="fontSize: '14px'"] {
            font-size: 12px !important;
          }
          div[style*="marginBottom: 24"] {
            margin-bottom: 16px !important;
          }
          button[style*="padding: '14px 20px'"] {
            padding: 10px 14px !important;
            font-size: 13px !important;
          }
          div[style*="width: 64"][style*="height: 64"] {
            width: 48px !important;
            height: 48px !important;
          }
          span[style*="fontSize: 32"][style*="color: 'white'"] {
            font-size: 24px !important;
          }
        }
      `})]}),document.body)},W=({open:p,onClose:c,onVerified:g})=>{const{t:o}=f(),[n,i]=x.useState(""),[a,e]=x.useState(!1),{error:l}=v(),s=x.useRef(null);if(x.useEffect(()=>{p&&setTimeout(()=>s.current?.focus(),100)},[p]),!p)return null;const m=async()=>{if(!a){if(!/^\d{4}$/.test(n)){l(o("pleaseEnterValid4DigitPIN",{ns:"common"})),i(""),s.current?.focus();return}try{e(!0);const t=await S.verifySecurityPIN(n),d=t?.code||t?.data?.code;if(d&&d!=="00"){l(d==="03"||d===3?o("wrongPIN",{ns:"common"}):t?.message||o("pinVerificationFailed",{ns:"common"})),i(""),s.current?.focus();return}i(""),g?.()}catch(t){const d=(t?.message||"").toLowerCase(),y=t?.code||t?.response?.data?.code;y==="03"||y===3||d.includes("03")||d.includes("invalid")||d.includes("wrong")?l(o("wrongPIN",{ns:"common"})):l(t?.message||o("pinVerificationFailed",{ns:"common"})),i(""),s.current?.focus()}finally{e(!1)}}},u=t=>{t.key==="Enter"&&n.length===4&&!a&&m()};return h.createPortal(r.jsxs(r.Fragment,{children:[r.jsx("div",{style:{position:"fixed",inset:0,backgroundColor:"rgba(0,0,0,0.5)",backdropFilter:"blur(4px)",zIndex:10001}}),r.jsxs("div",{style:{position:"fixed",inset:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:10002,pointerEvents:"none"},children:[r.jsxs("div",{style:{backgroundColor:"var(--card)",borderRadius:16,padding:32,width:"100%",maxWidth:420,boxShadow:"var(--shadow-xl)",animation:"slideIn 0.3s ease-out",pointerEvents:"auto"},children:[r.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:24},children:[r.jsx("div",{style:{width:64,height:64,borderRadius:"50%",background:"linear-gradient(135deg, #004895 0%, #003d7a 100%)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16,boxShadow:"0 4px 12px rgba(0, 72, 149, 0.3)"},children:r.jsx("span",{className:"material-symbols-outlined",style:{fontSize:32,color:"white"},children:"lock"})}),r.jsx("h3",{style:{margin:0,marginBottom:8,color:"var(--text-primary)",fontSize:"24px",fontWeight:700},children:o("enterPIN",{ns:"common",defaultValue:"Enter PIN"})}),r.jsx("p",{style:{margin:0,color:"var(--text-muted)",fontSize:"14px",textAlign:"center",lineHeight:"20px"},children:o("enter4DigitPIN",{ns:"common"})})]}),r.jsx("div",{style:{marginBottom:24},children:r.jsx("input",{ref:s,type:"password",inputMode:"numeric",pattern:"\\\\d{4}",maxLength:4,placeholder:"",value:n,onChange:t=>i(t.target.value.replace(/[^0-9]/g,"")),onKeyDown:u,autoFocus:!0,style:{width:"100%",padding:"16px 20px",fontSize:"24px",fontWeight:600,letterSpacing:"8px",textAlign:"center",borderRadius:12,border:n?"2px solid var(--accent)":"2px solid var(--border-primary)",background:"var(--bg-tertiary)",color:"var(--text-primary)",transition:"all 0.2s ease",boxSizing:"border-box"},onFocus:t=>{t.target.style.borderColor="var(--accent)",t.target.style.background="var(--bg-input)",t.target.style.boxShadow="0 0 0 4px rgba(59, 130, 246, 0.1)"},onBlur:t=>{t.target.style.borderColor=n?"var(--accent)":"var(--border-primary)",t.target.style.background="var(--bg-tertiary)",t.target.style.boxShadow="none"}})}),r.jsxs("div",{style:{display:"flex",gap:12},children:[r.jsx("button",{type:"button",onClick:()=>{i(""),c?.()},style:{flex:1,padding:"14px 20px",borderRadius:10,border:"2px solid var(--border-primary)",background:"var(--bg-input)",color:"var(--text-secondary)",cursor:"pointer",fontSize:"15px",fontWeight:600,transition:"all 0.2s ease"},onMouseEnter:t=>{t.target.style.borderColor="var(--border-secondary)",t.target.style.background="var(--bg-hover)"},onMouseLeave:t=>{t.target.style.borderColor="var(--border-primary)",t.target.style.background="var(--bg-input)"},children:o("cancel",{ns:"common"})}),r.jsx("button",{type:"button",onClick:m,disabled:a||n.length!==4,style:{flex:1,padding:"14px 20px",borderRadius:10,border:"none",background:a||n.length!==4?"var(--text-muted)":"var(--accent)",color:"var(--text-inverse)",cursor:a||n.length!==4?"not-allowed":"pointer",fontSize:"15px",fontWeight:600,transition:"all 0.2s ease",boxShadow:a||n.length!==4?"none":"var(--shadow-md)"},onMouseEnter:t=>{!a&&n.length===4&&(t.target.style.background="var(--accent-hover)",t.target.style.boxShadow="var(--shadow-lg)",t.target.style.transform="translateY(-1px)")},onMouseLeave:t=>{!a&&n.length===4&&(t.target.style.background="var(--accent)",t.target.style.boxShadow="var(--shadow-md)",t.target.style.transform="translateY(0)")},children:a?o("verifying",{ns:"common",defaultValue:"Verifying..."}):o("verify",{ns:"common",defaultValue:"Verify"})})]}),a&&r.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(255, 255, 255, 0.4)",backdropFilter:"blur(1px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:10,borderRadius:16},children:r.jsx(w,{size:"medium"})})]}),r.jsx("style",{children:`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 1024px) {
          div[style*="maxWidth: 420"] {
            max-width: min(90vw, 400px) !important;
          }
          div[style*="padding: 32"] {
            padding: 24px !important;
          }
        }

        @media (max-width: 768px) {
          div[style*="maxWidth: 420"] {
            max-width: min(95vw, 380px) !important;
          }
          div[style*="padding: 32"] {
            padding: 20px !important;
          }
          h3[style*="fontSize: '24px'"] {
            font-size: 20px !important;
          }
          div[style*="marginBottom: 24"] {
            margin-bottom: 18px !important;
          }
        }

        @media (max-width: 480px) {
          div[style*="maxWidth: 420"] {
            max-width: calc(100vw - 16px) !important;
          }
          div[style*="padding: 32"] {
            padding: 16px !important;
          }
          h3[style*="fontSize: '24px'"] {
            font-size: 18px !important;
          }
          p[style*="fontSize: '14px'"] {
            font-size: 12px !important;
          }
          div[style*="marginBottom: 24"] {
            margin-bottom: 16px !important;
          }
          input[style*="padding: '16px 20px'"] {
            padding: 12px 16px !important;
            font-size: 20px !important;
            letter-spacing: 4px !important;
          }
          button[style*="padding: '14px 20px'"] {
            padding: 10px 14px !important;
            font-size: 13px !important;
          }
          div[style*="width: 64"][style*="height: 64"] {
            width: 48px !important;
            height: 48px !important;
          }
          span[style*="fontSize: 32"][style*="color: 'white'"] {
            font-size: 24px !important;
          }
        }
      `})]})]}),document.body)};export{P as S,W as V};
//# sourceMappingURL=VerifyPinModal.iLCa6yc1.js.map
