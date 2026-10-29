const starterGames = [
 {id:"orbit",title:"Orbit Breaker",category:"Arcade",description:"Keep the little planet alive while everything tries to hit it.",symbol:"◉",color:"#6d55c7",url:"https://itch.io/games"},
 {id:"moss",title:"Moss Mode",category:"Chill",description:"A tiny quiet corner. Click around and let the noise fade out.",symbol:"✳",color:"#4d8068",url:"https://itch.io/games"},
 {id:"wrong",title:"Wrong Answers Only",category:"Weird",description:"A quiz where being confidently incorrect is the entire point.",symbol:"?!",color:"#c65376",url:"https://itch.io/games"},
 {id:"box",title:"Box Factory",category:"Puzzle",description:"Fit the shapes. Question your life choices. Repeat.",symbol:"▧",color:"#bd7b43",url:"https://itch.io/games"},
 {id:"pixel",title:"Pixel Panic",category:"Arcade",description:"Tiny screen, huge panic. See how long you can last.",symbol:"▦",color:"#397bba",url:"https://itch.io/games"},
 {id:"fish",title:"Fish With A Job",category:"Weird",description:"A fish has a job interview in twelve minutes. Help it prepare.",symbol:"≈",color:"#b58c38",url:"https://itch.io/games"}
];
const storageKey="tinygames-submissions-v1";
let games=[...starterGames,...JSON.parse(localStorage.getItem(storageKey)||"[]")];
let activeFilter="All";
const grid=document.querySelector("#gameGrid"),search=document.querySelector("#search");
const safe=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function render(){
 const q=search.value.trim().toLowerCase();
 const visible=games.filter(g=>(activeFilter==="All"||g.category===activeFilter)&&\`\${g.title} \${g.category} \${g.description}\`.toLowerCase().includes(q));
 grid.innerHTML=visible.map(g=>\`<article class="game-card"><div class="cover" style="--cover:\${safe(g.color||"#6d55c7")}"><span class="cover-tag">\${safe(g.category)}</span><span class="cover-art">\${safe(g.symbol||"✦")}</span></div><div class="game-info"><h3>\${safe(g.title)}</h3><p>\${safe(g.description)}</p><div class="game-bottom"><span class="category">\${safe(g.category)}</span><a class="play-link" href="\${safe(g.url)}" target="_blank" rel="noopener noreferrer">Visit game ↗</a></div></div></article>\`).join("");
 document.querySelector("#shownCount").textContent=String(visible.length).padStart(2,"0");
 document.querySelector("#gameCount").textContent=String(games.length).padStart(2,"0");
 document.querySelector("#empty").hidden=visible.length!==0;
}
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{activeFilter=b.dataset.filter;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));render()}));
search.addEventListener("input",render);
const dialog=document.querySelector("#submitDialog");
function openSubmit(){dialog.showModal()}
document.querySelector("#openSubmit").addEventListener("click",openSubmit);
document.querySelector("#closeSubmit").addEventListener("click",()=>dialog.close());
document.querySelector("#randomBtn").addEventListener("click",()=>{const pool=games.filter(g=>g.url);const chosen=pool[Math.floor(Math.random()*pool.length)];if(chosen)window.open(chosen.url,"_blank","noopener,noreferrer")});
document.querySelector("#submitForm").addEventListener("submit",e=>{
 e.preventDefault();const f=new FormData(e.currentTarget);
 const url=String(f.get("url")).trim();
 if(!/^https?:\/\//i.test(url)){alert("Please use a full http:// or https:// game link.");return}
 const item={id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),title:String(f.get("title")).trim(),url,category:String(f.get("category")),description:String(f.get("description")).trim(),symbol:"✦",color:["#6d55c7","#4d8068","#c65376","#bd7b43","#397bba"][games.length%5]};
 games.push(item);const custom=games.filter(g=>!starterGames.some(s=>s.id===g.id));localStorage.setItem(storageKey,JSON.stringify(custom));activeFilter="All";document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b.dataset.filter==="All"));e.currentTarget.reset();dialog.close();render();
});
render();
