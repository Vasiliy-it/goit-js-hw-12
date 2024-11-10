import{a as v,i as c,S as L}from"./assets/vendor-C4-ZuMk8.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const _="46887130-d3f8e3821f1ed34df6d7a3ffd",w="https://pixabay.com/api/";async function g(r,s=1){try{const o=await v.get(w,{params:{key:_,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:15}}),{hits:i,totalHits:e}=o.data;return{images:i,totalHits:e}}catch(o){throw console.error("Error fetching images:",o),o}}async function b(r,s){return await g(r,s)}function p(r){return r.map(({webformatURL:s,largeImageURL:o,tags:i,likes:e,views:t,comments:a,downloads:l})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${o}">
            <img
              class="gallery-image"
              src="${s}"
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
              <p class="value">${t}</p>
            </div>
            <div class="info__item">
              <p class="title">Comments</p>
              <p class="value">${a}</p>
            </div>
            <div class="info__item">
              <p class="title">Downloads</p>
              <p class="value">${l}</p>
            </div>
          </div>
        </li>
      `).join("")}function f(){document.querySelector(".loader__container").classList.add("active")}function m(){document.querySelector(".loader__container").classList.remove("active")}document.addEventListener("DOMContentLoaded",()=>{const r=document.querySelector(".search-form"),s=r.querySelector("input[type=search]"),o=document.querySelector(".gallery__list"),i=document.querySelector(".load-more-button");let e,t=1,a=0,l=0,u="";const h=async()=>{f();try{const{images:n,totalHits:d}=await g(u,t);if(a=d,l=n.length,n.length===0){c.info({title:"Info",message:"No images found.",position:"topRight"});return}o.innerHTML=p(n),e?e.refresh():e=new L(".gallery__list a",{captionsData:"alt",captionDelay:250}),i.style.display=l<a?"block":"none",l>=a&&c.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}catch{c.error({title:"Error",message:"Something went wrong with the search request.",position:"topRight"})}finally{m()}};r.addEventListener("submit",n=>{if(n.preventDefault(),u=s.value.trim(),u===""){c.error({title:"Error",message:"Fill search input!",position:"topRight"});return}o.innerHTML="",t=1,l=0,i.style.display="none",h()}),i.addEventListener("click",async n=>{n.preventDefault(),t+=1,f();try{const{images:d}=await b(u,t);l+=d.length,o.insertAdjacentHTML("beforeend",p(d)),e.refresh(),y(),i.style.display=l<a?"block":"none",l>=a&&c.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}catch{c.error({title:"Error",message:"Failed to load more images.",position:"topRight"})}finally{m()}});function y(){const{height:n}=o.firstElementChild.getBoundingClientRect();window.scrollBy({top:n*2,behavior:"smooth"})}});
//# sourceMappingURL=index.js.map
