import { useEffect, useState } from 'react';
import CircularCarousel, { type CircularCarouselItem } from './CircularCarousel';
type Item = CircularCarouselItem & { href: string };
export default function PropertyCollection({items}: {items: Item[]}) {
 const [active,setActive]=useState(0);
 const [width,setWidth]=useState(340);
 const [reduced,setReduced]=useState(false);
 const [mounted,setMounted]=useState(false);
 useEffect(()=>{
   const query=matchMedia('(prefers-reduced-motion: reduce)');
   const update=()=>{setReduced(query.matches);setWidth(window.innerWidth<600?240:window.innerWidth<1000?290:380);};
   update();setMounted(true);query.addEventListener('change',update);window.addEventListener('resize',update);
   return ()=>{query.removeEventListener('change',update);window.removeEventListener('resize',update);};
 },[]);
 return <div className="collection-island">
  {mounted && !reduced ? <>
   <div className="ring-shell"><CircularCarousel items={items} preset="cylinder" intro="none" autoplay="off" cardWidth={width} aspectRatio={1.36} gap={36} curve={0} tilt={-7} perspective={1000} cornerRadius={0} parallax={0} stretch={0} depthFade={0.65} fadeColor="#e8e6df" captions={false} onChange={setActive}/></div>
   <div className="active-caption"><span className="eyebrow">{String(active+1).padStart(2,'0')} / {String(items.length).padStart(2,'0')}</span><div><h3>{items[active].title}</h3><p>{items[active].subtitle}</p></div><a className="text-link" href={items[active].href}>Explore this view <span aria-hidden="true">↗</span></a></div>
   <p className="carousel-instruction">Drag to explore <span aria-hidden="true">·</span> or use the arrow controls</p>
  </> : <div className="static-collection">{items.map(item=><a href={item.href} key={item.href}><img src={item.src} alt={item.alt} width="640" height="470" loading="lazy"/><h3>{item.title}</h3><p>{item.subtitle}</p><span className="text-link">Explore this view ↗</span></a>)}</div>}
 </div>;
}
