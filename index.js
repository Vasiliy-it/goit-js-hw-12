import{a as b,i as a,S as L}from"./assets/vendor-Cn7RiZ6s.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const S="46887130-d3f8e3821f1ed34df6d7a3ffd",E="https://pixabay.com/api/";async function y(r,t=1){try{const s=await b.get(E,{params:{key:S,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}}),{hits:i,totalHits:e}=s.data;return{images:i,totalHits:e}}catch(s){throw console.error("Error fetching images:",s),s}}async function q(r,t){return await y(r,t)}function v(r){return r.map(({webformatURL:t,largeImageURL:s,tags:i,likes:e,views:o,comments:n,downloads:w})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${s}">
            <img
              class="gallery-image"
              src="${t}"
              alt="${i}"
            />
          </a>
          <div class="info">
            <div class="info__item">
              <p class="title">Likes</p>
              <p class="value">${e}</p>
            </div>
            <div class="info__item">
              <p class="title">Views</p>
              <p class="value">${o}</p>
            </div>
            <div class="info__item">
              <p class="title">Comments</p>
              <p class="value">${n}</p>
            </div>
            <div class="info__item">
              <p class="title">Downloads</p>
              <p class="value">${w}</p>
            </div>
          </div>
        </li>
      `).join("")}const _=document.querySelector(".search-form"),h=_.querySelector("input[type=search]"),p=document.querySelector(".gallery__list"),u=document.querySelector(".load-more-button"),m=document.querySelector(".loader__container");let c,f=1,g=0,l=0,d="";_.addEventListener("submit",async r=>{if(r.preventDefault(),d=h.value.trim(),d===""){a.error({title:"Error",message:"Fill search input!",position:"topRight"});return}p.innerHTML="",f=1,l=0,u.style.display="none",m.style.display="none";try{const{images:t,totalHits:s}=await y(d,f);if(g=s,l+=t.length,t.length===0){a.info({title:"Info",message:"No images found.",position:"topRight"});return}p.innerHTML=v(t),c?c.refresh():c=new L(".gallery__list a",{captionsData:"alt",captionDelay:250}),h.value="",l<g?u.style.display="block":a.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}catch{a.error({title:"Error",message:"Something went wrong with the search request.",position:"topRight"})}});u.addEventListener("click",async r=>{r.preventDefault(),f+=1,m.style.display="block";try{const{images:t}=await q(d,f);l+=t.length,p.insertAdjacentHTML("beforeend",v(t)),c.refresh(),I(),l>=g&&(u.style.display="none",a.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{a.error({title:"Error",message:"Failed to load more images.",position:"topRight"})}finally{m.style.display="none"}});function I(){const{height:r}=p.firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
