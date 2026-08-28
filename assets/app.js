/* Sunny Maniyar · Land & Legality — shared data + UI
   Data transcribed from Sunny's Notion records (Aug 2026). Map pins resolved from his Google links. */
const WA="917666369251";
const IG="https://www.instagram.com/sunny.realestateproperties/";
const WAsvg='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8.5 15.3L2 22l4.8-1.4A10 10 0 1012 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.2.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.5.7 1.8.8 1.9.1.1.1.3 0 .5-.3.6-.6.7-.8 1-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4.1.5-.1.2-.2.6-.7.7-.9.2-.3.4-.2.6-.1.2.1 1.4.7 1.6.8.2.1.4.2.4.3.1.1.1.6-.1 1.2z"/></svg>';
const PIN='<svg viewBox="0 0 24 24"><path d="M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.4"/></svg>';
const VER='<svg viewBox="0 0 24 24" fill="#4a9eff"><path d="M12 2l2.4 2.1 3.1-.5 1.1 3 2.9 1.4-1 3 1 3-2.9 1.4-1.1 3-3.1-.5L12 22l-2.4-2.1-3.1.5-1.1-3L2.5 16.5l1-3-1-3 2.9-1.4 1.1-3 3.1.5z"/><path d="M8.5 12l2.3 2.3 4.7-4.7" stroke="#fff" stroke-width="1.9" fill="none"/></svg>';
const STL={av:["av","Available"],partly:["partly","Partly sold"],pre:["pre","Pre-launch"],sold:["sold","Sold"]};
/* ---------- live data (Google Sheet via Apps Script; falls back to baked-in data) ---------- */
function rowToParcel(r){
  const num=v=>{const n=parseFloat(v);return isNaN(n)?0:n;};
  return {id:String(r.id).trim(),n:r.name||'',type:r.type||'Investment Land',reg:r.region||'Nashik City',
    loc:r.locality||'',area:r.area||'',price:r.price||'',unit:r.unit||'',rank:num(r.rank),
    st:STL[r.status]?r.status:'av',lat:num(r.lat)||19.99,lng:num(r.lng)||73.78,
    ex:(r.exact==1||r.exact==='1'||r.exact===true)?1:0,link:r.maplink||'',tour:r.tour||'',
    q:(r.locality?r.locality+', ':'')+(r.region||'Nashik'),
    hl:String(r.highlights||'').split(';').map(s=>s.trim()).filter(Boolean),
    vf:r.verification||'Verified before sale.',gap:r.gap||'',
    as:{L:1,P:0,V:0,T:r.tour?1:0}};
}
async function loadLive(){
  const api=(window.SRE_CONFIG||{}).api;
  if(!api)return;
  try{
    const res=await Promise.race([
      fetch(api+'?action=list',{redirect:'follow'}),
      new Promise((_,rej)=>setTimeout(()=>rej(new Error('timeout')),4000))
    ]);
    const data=await res.json();
    if(data&&data.ok&&Array.isArray(data.parcels)&&data.parcels.length){
      const fresh=data.parcels.map(rowToParcel).filter(p=>p.id&&p.n);
      if(fresh.length){P.length=0;fresh.forEach(p=>P.push(p));}
    }
  }catch(e){/* offline or not configured — baked-in data stays */}
}
const P=[
{id:"RMS-332",n:"47-Guntha Dam-Touch Agri Land",reg:"Nashik City",loc:"Ramshej",type:"Investment Land",area:"47 Guntha",price:"₹1.18 Cr",unit:"₹2.5L / guntha",rank:11750000,st:"av",lat:20.089,lng:73.660,ex:0,q:"Ramshej, Nashik",hl:["Dam-touch parcel with scenic frontage","Layout drawing (G.No. 332) on file"],vf:"Layout PDF on record — G.No. 332, Ramshej.",as:{L:1}},
{id:"KHM-157",n:"13-Acre Highway-Near Land",reg:"Trimbakeshwar",loc:"Khambale",type:"Investment Land",area:"13 Acre",price:"₹18.2 Cr",unit:"₹1.4Cr / acre",rank:182000000,st:"av",lat:19.905,lng:73.560,ex:0,q:"Khambale, Trimbakeshwar",hl:["650 m from Nashik–Trimbakeshwar highway","Parallel-road market rate ₹3.5–5L/guntha","Whole 13 acres only · slightly negotiable"],vf:"Reference layout + survey nos. 157, 196, 194 on file.",as:{L:1,P:1}},
{id:"BZE-920",n:"4.5-Acre Farmhouse & Plantation Land",reg:"Trimbakeshwar",loc:"Trimbak Beze",type:"Farmhouse",area:"4.5 Acre",price:"₹4.5 Cr",unit:"₹1Cr / acre",rank:45000000,st:"av",lat:19.905,lng:73.575,ex:0,q:"Anjaneri, Trimbakeshwar",hl:["Village road passes through the land","For farmhouse, plantation or long hold"],vf:"Layout PDF (Anjaneri 920) on record.",as:{L:1}},
{id:"BZE-213",n:"River-Front Valley Farmhouse Plots",reg:"Trimbakeshwar",loc:"Beze Dam",type:"Farmhouse",area:"1 Acre",price:"₹1.4 Cr",unit:"₹3.5L / guntha · 4 of 6 acres left",rank:14000000,st:"partly",lat:19.86,lng:73.58,ex:0,q:"Beze Dam, Trimbakeshwar",hl:["Kikvi river-side valley-touch plots","3 km from Viveda Wellness","Plots 1 & 5 sold · slightly negotiable"],vf:"Layout PDF (G.No. 213) with sold plots marked. Video tour available.",as:{L:1,V:1}},
{id:"TRB-9AC",n:"9-Acre Parcel, Khambale Shivar",reg:"Trimbakeshwar",loc:"Khambale Shivar",type:"Investment Land",area:"9 Acre",price:"₹25.2 Cr",unit:"₹7L / guntha",rank:252000000,st:"av",lat:19.90,lng:73.565,ex:0,q:"Khambale, Trimbakeshwar",hl:["9-acre general land, Khambale Shivar","Tentative plan on file"],vf:"Tentative plan on record; survey docs shared on enquiry.",as:{P:1}},
{id:"BHR-2AC",n:"2-Acre Land, Bhramanwade–Wadjire Rd",reg:"Nashik City",loc:"Bhramanwade",type:"Investment Land",area:"2 Acre",price:"₹95 L",unit:"final price",rank:9500000,st:"av",lat:19.92,lng:73.80,ex:0,q:"Bhramanwade, Nashik",hl:["9-metre road access","5 km from Nashik–Pune highway"],vf:"Title and location verified.",gap:"Owner layout pending — flagged, not hidden.",as:{}},
{id:"NPH-417",n:"4-Acre Agri Land with Private Well",reg:"Niphad & Sinnar",loc:"Dharangao, Niphad",type:"Investment Land",area:"4 Acre",price:"₹2.7 Cr",unit:"offer",rank:27000000,st:"av",lat:20.08,lng:74.05,ex:0,q:"Dharangaon, Niphad",hl:["200 m from main highway","Private well · siping done","17 km to Nandur Madhyameshwar Sanctuary"],vf:"Layout PDF (G.No. 417, Dharangaon) on record.",as:{L:1}},
{id:"SNK-2AC",n:"2-Acre Road-Front Land, by Sanskruti Hotel",reg:"Trimbakeshwar",loc:"Trimbakeshwar",type:"Investment Land",area:"2 Acre",price:"₹12 Cr",unit:"₹15L / guntha",rank:120000000,st:"av",lat:19.935,lng:73.530,ex:0,q:"Sanskruti Hotel, Trimbakeshwar",hl:["Prime road-front parcel","Adjacent to Sanskruti Hotel"],vf:"Layout image on file.",as:{P:1}},
{id:"GND-1A",n:"3-Acre 20-Guntha, Nashik–Pune Highway",reg:"Niphad & Sinnar",loc:"Karpe Gonde",type:"Investment Land",area:"128.5 Guntha",price:"₹7.71 Cr",unit:"₹6L / guntha",rank:77100000,st:"av",lat:19.86,lng:73.77,ex:0,q:"Gonde, Sinnar",hl:["3 acre 21 guntha (~128.5 guntha)","Nashik–Pune highway corridor"],vf:"Layout PDF (Karpe Gonde 1A) on record.",as:{L:1}},
{id:"CHN-20Y",n:"20-Guntha Yellow Land, Chandshi",reg:"Chandshi",loc:"Jalalpur Shivar",type:"Yellow Land",area:"20 Guntha",price:"₹3.3 Cr",unit:"₹16.5L / guntha",rank:33000000,st:"av",lat:20.028136,lng:73.730642,ex:1,q:"Chandshi, Nashik",link:"https://maps.app.goo.gl/CxbxbTrB7VeMgXSB9",hl:["Yellow land at Jalalpur Shivar","Layout on file"],vf:"Layout image on record.",as:{L:1,P:1}},
{id:"MDS-29Y",n:"29.5-Guntha Yellow Land, Madsangavi",reg:"Nashik City",loc:"Madsangavi",type:"Yellow Land",area:"29.5 Guntha",price:"₹4.43 Cr",unit:"₹15L / guntha",rank:44250000,st:"av",lat:19.999722,lng:73.869769,ex:1,q:"Madsangavi, Nashik",link:"https://maps.app.goo.gl/MS4ai3P3Gsic6ygL6",hl:["9-metre road front · both-side roads","63-metre frontage"],vf:"Layout + 2 site photos on record.",as:{L:1,P:1}},
{id:"IGT-345",n:"345 Sq.M Valley-View N.A Plot",reg:"Igatpuri",loc:"Manas Resort, Igatpuri",type:"Farmhouse",area:"345 sq.m",price:"₹1.35 Cr",unit:"slightly negotiable",rank:13500000,st:"av",lat:19.699015,lng:73.531618,ex:1,q:"Manas Resort, Igatpuri",link:"https://maps.app.goo.gl/KhoXEbsG7ZeLDTHw9",hl:["Plot 5 · 413 var · valley view","9-metre road front"],vf:"Layout with plot 5 marked on record.",as:{L:1,P:1}},
{id:"IGT-KWN",n:"Dam-View N.A Plots, Kawnai",reg:"Igatpuri",loc:"Kawnai, Igatpuri",type:"Farmhouse",area:"10,000 sq.ft +",price:"₹1,500 / sq.ft",unit:"from · ₹1,900 water-view",rank:15000000,st:"av",lat:19.782624,lng:73.616327,ex:1,q:"Kawnai, Igatpuri",link:"https://maps.app.goo.gl/jyvY5wZBpCYKwpHs6",hl:["All plots 18-metre road front","Plots 24–31: 360° water view"],vf:"Final validated layout PDF (NAMRDA) on record.",as:{L:1}},
{id:"IGT-VAV",n:"Dam-View N.A Plots, Vaitarna",reg:"Igatpuri",loc:"Vaviharsh, Igatpuri",type:"Farmhouse",area:"N.A plots",price:"₹1,300 / sq.ft",unit:"non-negotiable",rank:13000000,st:"pre",lat:19.816807,lng:73.483002,ex:1,q:"Vaitarna Dam, Igatpuri",link:"https://maps.app.goo.gl/xc5Pc2zAUweQt85M8",tour:"https://sivaraa360studio.com/LAND_FACTORY/GRASS%20HOPPER%20VILLAS./",hl:["Gated: 24×7 CCTV, concrete roads","Electricity + water · viewing deck","Near Vaitarna dam"],vf:"Validated layout on file. 360° virtual tour available.",as:{L:1,T:1}},
{id:"IGT-AMK",n:"Plot 54, AMK Hills Villa Community",reg:"Igatpuri",loc:"Bhavali Dam, Igatpuri",type:"Farmhouse",area:"2,948 sq.ft",price:"₹82.5 L",unit:"₹2,800 / sq.ft",rank:8254400,st:"av",lat:19.6261488,lng:73.609997,ex:1,q:"AMK Hills, Igatpuri",link:"https://maps.app.goo.gl/T7MmAWeWYN14por99",hl:["North-East corner · Vastu compliant","Final N.A — ready for construction","Gated: clubhouse, security, wall"],vf:"Layout with plot 54 marked on record.",as:{L:1,P:1}},
{id:"IGT-HYT",n:"N.A Plots near Hyatt, Bhavli",reg:"Igatpuri",loc:"Bhavli, Igatpuri",type:"Farmhouse",area:"5,000–6,000 sq.ft",price:"₹2,500 / sq.ft",unit:"pre-launch rate",rank:12500000,st:"pre",lat:19.623996,lng:73.606626,ex:1,q:"Bhavli, Igatpuri",link:"https://maps.app.goo.gl/eRihfLqdegNE989q6",hl:["Pre-launch offer rate","Near Hyatt, Igatpuri"],vf:"Electrical + site layout PDF on record.",as:{L:1}},
{id:"KLP-194",n:"194-Var N.A Plot, Kalpataru Nagar",reg:"Nashik City",loc:"Near Ashoka Marg",type:"N.A Plot",area:"194 Var",price:"₹1.11 Cr",unit:"₹57,000 / var",rank:11058000,st:"av",lat:19.978005,lng:73.799500,ex:1,q:"Kalpataru Nagar, Nashik",link:"https://maps.app.goo.gl/Af5yuoStt2yyD4aZA",hl:["Plot 41 · sub-division plot"],vf:"Layout copy on record.",as:{L:1,P:1}},
{id:"KLP-WAD",n:"N.A Plots, Kalpataru Nagar (Wadala)",reg:"Nashik City",loc:"Near Ashoka Marg",type:"N.A Plot",area:"221–1470 Var",price:"₹55–60K / var",unit:"corner plots",rank:13260000,st:"av",lat:19.976301,lng:73.800820,ex:1,q:"Kalpataru Nagar, Nashik",link:"https://maps.app.goo.gl/TZvfNs4PNtQe9zwp6",hl:["Plot 6: 221 var corner · ₹60K/var","Plot 3: 870 var corner · ₹60K/var","Plots 1&2: 1470 var together · ₹55K/var"],vf:"Layout + Wadala plan PDF on record.",as:{L:1}},
{id:"SRN-285",n:"285-Var N.A Plot, Serene Meadows",reg:"Gangapur Road",loc:"Gangapur Road",type:"N.A Plot",area:"285 Var",price:"₹3.42 Cr",unit:"₹1.2L / var",rank:34200000,st:"av",lat:20.009665,lng:73.733663,ex:1,q:"Serene Meadows, Gangapur Road",link:"https://maps.app.goo.gl/dEe2e8YsKJRcPsgv8",hl:["Plot 32 in Serene Meadows layout","Rate non-negotiable"],vf:"Serene Meadows layout PDF on record.",as:{L:1}},
{id:"GNG-900",n:"900-Var N.A Plot, near Nashik Lunch Home",reg:"Gangapur Road",loc:"Gangapur Road",type:"N.A Plot",area:"900 Var",price:"₹11.25 Cr",unit:"₹1.25L / var",rank:112500000,st:"av",lat:20.008463,lng:73.742124,ex:1,q:"Nashik Lunch Home, Gangapur Road",link:"https://maps.app.goo.gl/HN5fuVmBgC9cyBcq6",hl:["Plots 12 & 13 in layout","Slightly negotiable"],vf:"Layout image on record.",as:{L:1,P:1}},
{id:"COL-258",n:"5-BHK Bungalow 'Neelkamal', College Road",reg:"Nashik City",loc:"College Road",type:"Bungalow",area:"258 Var",price:"₹4.51 Cr",unit:"offer",rank:45100000,st:"av",lat:20.004325,lng:73.767282,ex:1,q:"College Road, Nashik",link:"https://maps.app.goo.gl/j9X3GZxbDUEQq2Ma8",hl:["5 BHK + servant quarters","7.5-metre front road"],vf:"On-site verification available.",as:{}},
{id:"HWY-BNG",n:"3-BHK Bungalow behind Westside",reg:"Nashik City",loc:"Mumbai–Agra Highway",type:"Bungalow",area:"On request",price:"On request",unit:"details on enquiry",rank:0,st:"av",lat:20.00,lng:73.78,ex:0,q:"Nashik Club, Mumbai Agra Highway",hl:["3 BHK bungalow","Behind Westside, near Nashik Club"],vf:"Full details shared on enquiry.",gap:"Size and price pending from owner.",as:{}},
{id:"SIN-3120",n:"3120-Var N.A Plot, Sinnar Fata",reg:"Niphad & Sinnar",loc:"Sinnar Fata",type:"N.A Plot",area:"3120 Var",price:"₹8.74 Cr",unit:"₹28,000 / var",rank:87360000,st:"av",lat:19.942648,lng:73.843829,ex:1,q:"Sinnar Fata, Nashik Road",link:"https://maps.app.goo.gl/HpSFTMSjUtR5dz7M9",hl:["Plot 5 in layout","Nashik Road corridor"],vf:"Layout PDF on record.",as:{L:1}},
{id:"CHN-310",n:"310-Var N.A Plot, near Alaska Banquet",reg:"Chandshi",loc:"Chandshi",type:"N.A Plot",area:"310 Var",price:"₹1.43 Cr",unit:"₹46,000 / var",rank:14260000,st:"av",lat:20.028003,lng:73.750663,ex:1,q:"Alaska Banquet Hall, Chandshi",link:"https://maps.app.goo.gl/axTZDsA9PwnWEDjk6",hl:["Plot 8 · 9-metre front road"],vf:"Layout image on record.",as:{L:1,P:1}},
{id:"CHN-2000",n:"2000-Var N.A Plot, Main Road Chandshi",reg:"Chandshi",loc:"Jalalpur, Chandshi",type:"N.A Plot",area:"2000 Var",price:"₹11.4 Cr",unit:"₹57,000 / var",rank:114000000,st:"av",lat:20.029504,lng:73.740057,ex:1,q:"Chandshi, Nashik",link:"https://maps.app.goo.gl/cxmwTK39ouwtuaDy5",hl:["Plots 1 & 3 · main-road Chandshi"],vf:"Final layout plan PDF on record.",as:{L:1}},
{id:"TPV-350",n:"350-Var Corner N.A Plot, Tapovan",reg:"Nashik City",loc:"Tapovan, Kathe Galli",type:"N.A Plot",area:"350 Var",price:"₹2.31 Cr",unit:"₹66,000 / var",rank:23100000,st:"av",lat:19.997420,lng:73.812906,ex:1,q:"Tapovan, Nashik",link:"https://maps.app.goo.gl/FoXyApWbuic3RGiq8",hl:["Two-road corner · 18 m + 9 m","Near Karma Galaxy"],vf:"Layout on record.",as:{L:1,P:1}},
{id:"RVS-387",n:"387-Var Corner N.A Plot, Ravishankar Marg",reg:"Nashik City",loc:"Ravishankar Marg",type:"N.A Plot",area:"387 Var",price:"₹2.32 Cr",unit:"₹60,000 / var",rank:23220000,st:"av",lat:19.970786,lng:73.801085,ex:1,q:"Ravishankar Marg, Nashik",link:"https://maps.app.goo.gl/aJofANTmWmigd4Gp8",hl:["Two-road corner · 7.5 m both sides"],vf:"Layout PDF (S.No. 16) on record.",as:{L:1}},
{id:"IND-723",n:"723-Var N.A Plot, Indira Nagar",reg:"Nashik City",loc:"Indira Nagar",type:"N.A Plot",area:"723 Var",price:"₹5.21 Cr",unit:"₹72,000 / var",rank:52056000,st:"av",lat:19.974543,lng:73.789151,ex:1,q:"Indira Nagar, Nashik",link:"https://maps.app.goo.gl/iNCcXDmSs5oC27YV9",hl:["Plot 32 · established address"],vf:"Layout image on record.",as:{L:1,P:1}},
{id:"KMB-3522",n:"22 & 13-Guntha Land, near Flying School",reg:"Nashik City",loc:"Khamb, Indira Nagar",type:"Investment Land",area:"35 Guntha",price:"₹4.55 Cr",unit:"₹13L / guntha",rank:45500000,st:"av",lat:19.947024,lng:73.784844,ex:1,q:"Flying School, Indira Nagar",link:"https://maps.app.goo.gl/nrtAmcyJe2ZiihT18",hl:["22 + 13 guntha (10 g N.A done)","15-foot road approach"],vf:"PT sheet with area marked on record.",as:{L:1,P:1}},
{id:"ADG-726",n:"N.A Final Plots, Adgaon",reg:"Nashik City",loc:"Adgaon",type:"N.A Plot",area:"726 Var",price:"₹2.18 Cr",unit:"₹30,000 / var",rank:21780000,st:"av",lat:20.042606,lng:73.871294,ex:1,q:"Adgaon, Nashik",link:"https://maps.app.goo.gl/uAHz3fADS6tpCC8A9",hl:["Plots 15–26 · 78–83 var each","726 var total available"],vf:"Adgaon final layout plan PDF on record.",as:{L:1}}
];
const REELS=[
 {id:"DbYBPCmovUP",v:"243K",tag:"Most watched"},
 {id:"Db2WMRdIq8q",v:"142K",tag:"№2"},
 {id:"Dbnh7D1INkd",v:"65.1K",tag:"№3"},
 {id:"Dbups_Ko4xx",v:"46.7K",tag:"№4"},
 {id:"DbfQLpWytfk",v:"33.2K",tag:"№5"},
 {id:"DbphTUdhrkg",v:"28.7K",tag:"№6"}
];
/* ---------- shared chrome ---------- */
const PAGE=document.body.dataset.page||"";
const SELLER_URL="https://superprofile.bio/vp/6a8d21478361f600133d4612";
function navHTML(){
  const links=[["parcels.html","Parcels","parcels"],["map.html","Map","map"],["videos.html","Instagram","videos"],["consult.html","Consult","consult"],["about.html","About","about"]];
  return `<nav class="site"><div class="wrap navrow">
    <a href="index.html" class="brand"><img class="mk" src="assets/logo-mark.png" alt="Sunny Real Estate" width="36" height="36"><span><b>Sunny Real Estate</b><small>Land &amp; Legality · Nashik</small></span></a>
    <div class="navlinks">${links.map(l=>`<a class="lk ${PAGE===l[2]?'on':''}" href="${l[0]}">${l[1]}</a>`).join('')}</div>
    <div class="nav-cta">
      <button class="btn line" onclick="openLead(null)">Enquire</button>
      <a class="btn primary" href="${SELLER_URL}" target="_blank" rel="noopener">Submit your property</a>
    </div>
  </div></nav>
  <div class="tabbar">
    <a href="index.html" class="${PAGE==='home'?'on':''}"><svg viewBox="0 0 24 24"><path d="M3 11l9-8 9 8v9a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1z"/></svg>Home</a>
    <a href="parcels.html" class="${PAGE==='parcels'?'on':''}"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>Parcels</a>
    <a href="map.html" class="${PAGE==='map'?'on':''}"><svg viewBox="0 0 24 24"><path d="M9 20l-6-3V4l6 3 6-3 6 3v13l-6-3-6 3z"/><path d="M9 7v13M15 4v13"/></svg>Map</a>
    <a href="videos.html" class="${PAGE==='videos'?'on':''}"><svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M10 9l5 3-5 3z"/></svg>Instagram</a>
    <a href="consult.html" class="${PAGE==='consult'?'on':''}"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>Consult</a>
  </div>`;
}
function footHTML(){
  return `<footer class="site"><div class="wrap">
    <div class="frowf">
      <div class="foot-cta">
        <h2>Found a parcel worth a conversation?</h2>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn primary" onclick="openLead(null)">Enquire</button>
          <a class="btn wa" href="https://wa.me/${WA}" target="_blank" rel="noopener">${WAsvg}WhatsApp Sunny</a>
        </div>
      </div>
      <div class="flinks">
        <div class="col"><span class="h">Browse</span><a href="parcels.html">All parcels</a><a href="map.html">Map</a><a href="videos.html">Instagram</a></div>
        <div class="col"><span class="h">Work with Sunny</span><a href="consult.html">Consultation</a><a href="consult.html#ebook">Free ebook</a><a href="about.html">About</a></div>
        <div class="col"><span class="h">Direct</span><a href="https://wa.me/${WA}" target="_blank" rel="noopener">+91 76663 69251</a><a href="${IG}" target="_blank" rel="noopener">@sunny.realestateproperties</a></div>
      </div>
    </div>
    <div class="fbot">
      <span>© 2026 Sunny Real Estate · by Sunny Maniyar · <a href="admin.html" class="teamlink" style="color:inherit;text-decoration:underline">Team</a></span>
      <span class="disc">Rates, areas and availability are indicative and verified per parcel before sale. Exact map pins shown where confirmed; older parcels show locality view.</span>
    </div>
  </div></footer>`;
}
function modalsHTML(){
  return `
  <div class="ov" id="dov"><div class="modal"><button class="mx" onclick="closeOv('dov')" aria-label="Close">✕</button><div id="dcontent"></div></div></div>
  <div class="ov" id="lov"><div class="modal sm"><button class="mx" onclick="closeOv('lov')" aria-label="Close">✕</button>
    <div id="leadForm">
      <div class="lead-head"><span class="kick">Enquiry</span><h2>Request a callback</h2><p>Sunny replies personally on WhatsApp.</p></div>
      <div class="lead-body">
        <div id="plotTag" style="display:none" class="plot-tag">About: <b id="plotTagName"></b></div>
        <div class="frow2">
          <div class="field" id="fName"><label>Name</label><input id="inName" type="text" placeholder="Your name" autocomplete="name"><div class="hint">Add your name so Sunny knows who to ask for.</div></div>
          <div class="field" id="fPhone"><label>Phone / WhatsApp</label><input id="inPhone" type="tel" inputmode="numeric" placeholder="10-digit mobile" autocomplete="tel"><div class="hint">Enter a 10-digit mobile number.</div></div>
        </div>
        <div class="field"><label>Email <span class="opt">(optional)</span></label><input id="inEmail" type="email" placeholder="you@email.com" autocomplete="email"></div>
        <div class="field"><label>Looking for</label>
          <div class="chip-row" id="lookRow">
            <button class="chip-sel" data-v="Farmhouse / hill plot">Farmhouse</button>
            <button class="chip-sel" data-v="N.A city plot">N.A plot</button>
            <button class="chip-sel" data-v="Investment land">Investment</button>
            <button class="chip-sel" data-v="Bungalow">Bungalow</button>
            <button class="chip-sel" data-v="Not sure yet">Not sure yet</button>
          </div>
        </div>
        <div class="frow2">
          <div class="field"><label>Budget <span class="opt">(optional)</span></label>
            <select id="inBudget"><option value="">Select</option><option>Under ₹50 L</option><option>₹50 L – 1 Cr</option><option>₹1 – 3 Cr</option><option>₹3 – 10 Cr</option><option>₹10 Cr +</option></select></div>
          <div class="field"><label>Timeline <span class="opt">(optional)</span></label>
            <select id="inTime"><option value="">Select</option><option>Immediate</option><option>1–3 months</option><option>3–6 months</option><option>Just exploring</option></select></div>
        </div>
        <div class="lead-submit"><button class="btn wa" id="leadSend" onclick="submitLead()">${WAsvg}Send to Sunny on WhatsApp</button></div>
        <div class="lead-note">Opens WhatsApp with your details pre-filled. Nothing is stored on this site.</div>
      </div>
    </div>
    <div class="lead-success" id="leadOk">
      <div class="tick"><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></div>
      <h2>Sent</h2><p id="leadOkMsg">WhatsApp is opening with your details — press send and Sunny takes it from there.</p>
      <a class="btn wa" id="leadOkBtn" target="_blank" rel="noopener" style="margin-bottom:10px">Open WhatsApp again</a><br>
      <button class="btn line" onclick="closeOv('lov')">Done</button>
    </div>
  </div></div>`;
}
document.addEventListener('DOMContentLoaded',async()=>{
  document.getElementById('sharedNav').innerHTML=navHTML();
  document.getElementById('sharedFoot').innerHTML=footHTML();
  document.body.insertAdjacentHTML('beforeend',modalsHTML());
  bindLead();
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.1});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  await loadLive();
  INIT[PAGE]&&INIT[PAGE]();
});
/* ---------- shared pieces ---------- */
function polySvg(seed){let s=0;for(const c of seed)s+=c.charCodeAt(0);const r=n=>{s=(s*9301+49297)%233280;return s/233280*n;};
  const pts=[];for(let i=0;i<5;i++)pts.push([55+r(50),8+r(55)]);
  return `<svg class="poly" viewBox="0 0 110 110"><polygon points="${pts.map(p=>p.join(',')).join(' ')}" fill="rgba(30,91,65,.05)" stroke="rgba(30,91,65,.3)" stroke-width="1"/></svg>`;}
function recCard(p){
  return `<article class="rec reveal${p.st==='sold'?' soldcard':''}" onclick="openDetail('${p.id}')">${polySvg(p.id)}
    ${p.st==='sold'?'<div class="stamp">Sold<small>Sunny Real Estate</small></div>':''}
    <div class="rec-top"><span class="id">${p.id} · ${p.type}</span><span class="status ${STL[p.st][0]}">${STL[p.st][1]}</span></div>
    <div class="rec-body">
      <h3>${p.n}</h3>
      <div class="loc">${PIN}${p.loc} · ${p.reg}</div>
      <div class="price"><b>${p.price}</b><span>${p.unit}</span></div>
      <div class="meta"><span class="tagchip">${p.area}</span>${p.as.L?'<span class="tagchip">Layout</span>':''}${p.as.P?'<span class="tagchip">Photos</span>':''}${(p.as.V||p.as.T)?'<span class="tagchip">Video</span>':''}<span class="tagchip gold">${p.ex?'Exact pin':'Approx. pin'}</span></div>
    </div></article>`;
}
function mapEmbed(p){const q=p.ex?`${p.lat},${p.lng}`:encodeURIComponent(p.q);return `https://www.google.com/maps?q=${q}&hl=en&z=${p.ex?16:13}&output=embed`;}
function openDetail(id){
  const p=P.find(x=>x.id===id);if(!p)return;
  const gml=p.ex&&p.link?p.link:`https://www.google.com/maps/search/${encodeURIComponent(p.q)}`;
  const soldStamp=p.st==='sold'?'<div class="stamp instamp">Sold<small>Sunny Real Estate</small></div>':'';
  document.getElementById('dcontent').innerHTML=`<div class="mgrid">
    <div class="mleft" style="position:relative">${soldStamp}
      <div class="mtoprow"><span class="status ${STL[p.st][0]}">${STL[p.st][1]}</span><span class="id">${p.id} · ${p.type}</span></div>
      <h2>${p.n}</h2>
      <div class="mloc">${PIN}${p.loc} · ${p.reg}</div>
      <div class="mprice"><span class="b">${p.price}</span><span class="s">${p.unit}</span></div>
      <div class="mfacts">
        <div class="f"><div class="k">Area</div><div class="v">${p.area}</div></div>
        <div class="f"><div class="k">Locality</div><div class="v">${p.reg}</div></div>
        <div class="f"><div class="k">Type</div><div class="v">${p.type}</div></div>
        <div class="f"><div class="k">Map pin</div><div class="v">${p.ex?'Exact':'Approximate'}</div></div>
      </div>
      <div class="mst">On the ground</div>
      <ul class="mhl">${p.hl.map(h=>`<li>${h}</li>`).join('')}</ul>
      <div class="vbox"><div class="vt"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8.5 12l2.3 2.3 4.7-4.7"/></svg>Verification on file</div>
        <p>${p.vf}${p.gap?` <span class="gap">${p.gap}</span>`:""}</p></div>
    </div>
    <div class="mright">
      <div class="mmap"><div class="loadk">Loading map…</div><iframe loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${mapEmbed(p)}" title="Map of ${p.n}"></iframe></div>
      <div class="mright-pad">
        ${p.ex?'':'<span class="apx">Approximate area view</span>'}
        <div class="mcta">
          <button class="btn primary" onclick="closeOv('dov');openLead('${p.id}')">${p.st==='sold'?'Sold — ask about similar parcels':'Enquire about this parcel'}</button>
          <a class="btn line" href="${gml}" target="_blank" rel="noopener">Open in Google Maps</a>
          ${p.tour?`<a class="btn line" href="${p.tour}" target="_blank" rel="noopener">View 360° tour</a>`:''}
        </div>
      </div>
    </div>
  </div>`;
  showOv('dov');
}
/* ---------- lead ---------- */
let leadPlot=null,leadLook=null;
function bindLead(){
  document.querySelectorAll('#lookRow .chip-sel').forEach(c=>c.onclick=()=>{document.querySelectorAll('#lookRow .chip-sel').forEach(x=>x.classList.remove('on'));c.classList.add('on');leadLook=c.dataset.v;});
}
function openLead(id){
  leadPlot=id?P.find(x=>x.id===id):null;leadLook=null;
  document.getElementById('leadForm').style.display='block';
  document.getElementById('leadOk').classList.remove('show');
  document.querySelectorAll('#lookRow .chip-sel').forEach(x=>x.classList.remove('on'));
  ['inName','inPhone','inEmail'].forEach(i=>document.getElementById(i).value='');
  document.getElementById('inBudget').value='';document.getElementById('inTime').value='';
  document.querySelectorAll('#leadForm .field').forEach(f=>f.classList.remove('bad'));
  const tag=document.getElementById('plotTag');
  if(leadPlot){tag.style.display='inline-flex';document.getElementById('plotTagName').textContent=`${leadPlot.n} (${leadPlot.id})`;
    const map={"Farmhouse":"Farmhouse / hill plot","N.A Plot":"N.A city plot","Investment Land":"Investment land","Bungalow":"Bungalow","Yellow Land":"Investment land"};
    const want=map[leadPlot.type];document.querySelectorAll('#lookRow .chip-sel').forEach(x=>{if(x.dataset.v===want){x.classList.add('on');leadLook=want;}});
  } else tag.style.display='none';
  showOv('lov');
}
function submitLead(){
  const name=document.getElementById('inName').value.trim();
  const phone=document.getElementById('inPhone').value.replace(/\D/g,'');
  const email=document.getElementById('inEmail').value.trim();
  const budget=document.getElementById('inBudget').value,time=document.getElementById('inTime').value;
  let ok=true;
  const fN=document.getElementById('fName'),fP=document.getElementById('fPhone');
  if(!name){fN.classList.add('bad');ok=false;}else fN.classList.remove('bad');
  if(phone.length<10){fP.classList.add('bad');ok=false;}else fP.classList.remove('bad');
  if(!ok)return;
  let m=`New enquiry from your website —\n\nName: ${name}\nPhone: ${phone}\n`;
  if(email)m+=`Email: ${email}\n`;
  m+=`Looking for: ${leadLook||'Not specified'}\n`;
  if(budget)m+=`Budget: ${budget}\n`;
  if(time)m+=`Timeline: ${time}\n`;
  if(leadPlot)m+=`Parcel: ${leadPlot.n} (${leadPlot.id})\n`;
  const url=`https://wa.me/${WA}?text=${encodeURIComponent(m)}`;
  document.getElementById('leadOkBtn').href=url;
  document.getElementById('leadOkMsg').textContent=leadPlot?`WhatsApp is opening with your details and ${leadPlot.id} tagged — press send.`:'WhatsApp is opening with your details — press send and Sunny takes it from there.';
  window.open(url,'_blank');
  document.getElementById('leadForm').style.display='none';
  document.getElementById('leadOk').classList.add('show');
}
/* ---------- overlays ---------- */
function showOv(id){document.getElementById(id).classList.add('show');document.body.style.overflow='hidden';}
function closeOv(id){document.getElementById(id).classList.remove('show');document.body.style.overflow='';}
document.addEventListener('click',e=>{if(e.target.classList&&e.target.classList.contains('ov'))closeOv(e.target.id);});
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.ov.show').forEach(o=>closeOv(o.id));});
/* ---------- maps ---------- */
const TILES='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_OPTS={attribution:'© OpenStreetMap contributors',subdomains:'abc',maxZoom:19};
function addPins(map,list,layer){
  list.forEach(p=>{
    const m=L.marker([p.lat,p.lng],{icon:L.divIcon({className:'',html:`<div class="pin ${p.ex?'exact':'approx'}"></div>`,iconSize:[15,15],iconAnchor:[8,8]})}).addTo(layer||map);
    m.bindPopup(`<div class="pp-t">${p.n}</div><div class="pp-p">${p.price}</div><div class="pp-b" onclick="openDetail('${p.id}')">View parcel</div>`);
    p._m=m;
  });
}
/* ---------- page inits ---------- */
const INIT={
 home(){
   const soldN=P.filter(p=>p.st==='sold').length;
   const listedN=P.length-soldN;
   const listedEl=document.getElementById('credListed');
   if(listedEl)listedEl.textContent=listedN;
   if(soldN){const w=document.getElementById('credClosedWrap');if(w){w.style.display='';document.getElementById('credClosed').textContent=soldN;}}
   const browseBtn=document.getElementById('heroBrowseBtn');
   if(browseBtn)browseBtn.textContent=`Browse ${listedN} parcels`;
   const mapLabel=document.getElementById('heroMapLabel');
   if(mapLabel)mapLabel.innerHTML=`<b>●</b> ${listedN} parcels · live map`;
   const allLink=document.getElementById('allParcelsLink');
   if(allLink)allLink.textContent=`All ${listedN} parcels →`;
   const curated=['IGT-VAV','SRN-285','BZE-213'];
   let feat=curated.map(id=>P.find(x=>x.id===id)).filter(p=>p&&p.st!=='sold');
   P.forEach(p=>{if(feat.length<3&&p.st!=='sold'&&feat.indexOf(p)<0)feat.push(p);});
   document.getElementById('featured').innerHTML=feat.slice(0,3).map(recCard).join('');
   document.querySelectorAll('#featured .reveal').forEach(el=>el.classList.add('in'));
   if(!window.L)return;
   try{
     const map=L.map('heroMap',{zoomControl:false,scrollWheelZoom:false,attributionControl:true}).setView([19.90,73.72],9);
     L.tileLayer(TILES,TILE_OPTS).addTo(map);
     addPins(map,P.filter(p=>p.st!=='sold'));
     setTimeout(()=>map.invalidateSize(),300);
   }catch(e){}
 },
 parcels(){
   let fType='all',fReg='all',fSort=0;
   const grid=document.getElementById('grid');
   function draw(){
     let list=P.filter(p=>(fType==='all'||p.type===fType)&&(fReg==='all'||p.reg===fReg));
     list.sort((a,b)=>{
       const soldDiff=(a.st==='sold'?1:0)-(b.st==='sold'?1:0);
       if(soldDiff)return soldDiff;
       const x=a.rank||9e15,y=b.rank||9e15;return fSort?y-x:x-y;});
     grid.innerHTML=list.length?list.map(recCard).join(''):
       `<div class="empty" style="grid-column:1/-1"><b>No parcels match these filters</b>Clear the filters to see all ${P.length} parcels.<br><button class="btn line" onclick="document.querySelector('#typeChips .chip').click();document.getElementById('regSel').value='all';document.getElementById('regSel').dispatchEvent(new Event('change'))">Clear filters</button></div>`;
     grid.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));
     const sold=P.filter(p=>p.st==='sold').length;
     document.getElementById('fcount').textContent=list.length+' of '+P.length+' parcels'+(sold?' · '+sold+' closed':'');
     const cb=document.getElementById('closedBar');
     if(cb){cb.className=sold?'closedbar':'';
       cb.innerHTML=sold?`<span class="cb-stamp">SOLD</span><b>${sold} parcel${sold>1?'s':''} closed till date</b><span>Verified, negotiated and registered through Sunny. The rest won't wait either.</span>`:'';}
   }
   document.querySelectorAll('#typeChips .chip').forEach(c=>c.onclick=()=>{document.querySelectorAll('#typeChips .chip').forEach(x=>x.classList.remove('on'));c.classList.add('on');fType=c.dataset.f;draw();});
   document.getElementById('regSel').onchange=e=>{fReg=e.target.value;draw();};
   document.getElementById('sortBtn').onclick=function(){fSort=fSort?0:1;this.textContent='Price '+(fSort?'high → low':'low → high');draw();};
   draw();
 },
 map(){
   let bigMap=null,layer=null,fil='all',selId=null;
   if(window.L){try{
     bigMap=L.map('bigMap',{zoomControl:true,scrollWheelZoom:true}).setView([19.88,73.70],10);
     L.tileLayer(TILES,TILE_OPTS).addTo(bigMap);
   }catch(e){}}
   window.selectItem=(id,fly)=>{
     selId=id;const p=P.find(x=>x.id===id);
     document.querySelectorAll('.mitem').forEach(x=>x.classList.remove('sel'));
     const mi=document.getElementById('mi-'+id);if(mi){mi.classList.add('sel');mi.scrollIntoView({block:'nearest'});}
     if(p&&p._m&&bigMap){if(fly)bigMap.flyTo([p.lat,p.lng],p.ex?15:12,{duration:.8});p._m.openPopup();}
   };
   function draw(){
     const list=P.filter(p=>p.st!=='sold'&&(fil==='all'||p.type===fil));
     if(bigMap){if(layer)layer.remove();layer=L.layerGroup().addTo(bigMap);addPins(bigMap,list,layer);
       list.forEach(p=>p._m&&p._m.on('click',()=>selectItem(p.id,false)));
       if(list.length&&fil!=='all'){try{bigMap.fitBounds(list.map(p=>[p.lat,p.lng]),{padding:[40,40],maxZoom:13});}catch(e){}}}
     document.getElementById('bigCount').textContent=list.length+' parcels · Nashik district';
     document.getElementById('mlist').innerHTML=list.map(p=>`
       <div class="mitem ${selId===p.id?'sel':''}" id="mi-${p.id}" onclick="selectItem('${p.id}',true)">
         <div class="t">${p.n}</div>
         <div class="r"><span class="p">${p.price}</span><span class="l">${p.loc}</span><span class="go" onclick="event.stopPropagation();openDetail('${p.id}')">Details</span></div>
       </div>`).join('');
   }
   document.querySelectorAll('#bigChips .chip').forEach(c=>c.onclick=()=>{document.querySelectorAll('#bigChips .chip').forEach(x=>x.classList.remove('on'));c.classList.add('on');fil=c.dataset.f;draw();});
   draw();
   setTimeout(()=>bigMap&&bigMap.invalidateSize(),250);
 },
 videos(){
   document.getElementById('igGrid').innerHTML=REELS.map(r=>`
     <div class="reel-direct">
       <div class="rframe"><iframe src="https://www.instagram.com/reel/${r.id}/embed/" allowfullscreen loading="lazy" scrolling="no" title="Instagram reel — ${r.v} views"></iframe></div>
       <div class="reel-cap"><b>${r.v}</b> views · ${r.tag}</div>
     </div>`).join('');
 },
 consult(){},
 about(){
   const statParcels=document.getElementById('statParcels');
   if(statParcels)statParcels.dataset.count=P.filter(p=>p.st!=='sold').length;
   const reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
   const nums=document.querySelectorAll('[data-count]');
   const run=el=>{
     const target=parseFloat(el.dataset.count),suf=el.dataset.suffix||'';
     const dec=(target%1!==0)?1:0;
     if(reduce){el.textContent=target.toFixed(dec)+suf;return;}
     const dur=1100,t0=performance.now();
     const tick=now=>{
       const p=Math.min(1,(now-t0)/dur),e=1-Math.pow(1-p,3);
       el.textContent=(target*e).toFixed(dec)+suf;
       if(p<1)requestAnimationFrame(tick);
     };
     requestAnimationFrame(tick);
   };
   const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){run(e.target);io.unobserve(e.target);}}),{threshold:.4});
   nums.forEach(n=>io.observe(n));
 }
};
