import React, {useEffect, useState, useRef} from 'react'
import ProductCard from '../components/ProductCard'

export default function Catalog({addToCart,navigate}){
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const loader = useRef(null)

  useEffect(()=>{ fetchPage(1) },[])

  const fetchPage = async (p)=>{
    const res = await fetch((import.meta.env.VITE_BACKEND_URL || '') + `/products?page=${p}&limit=12`)
    if(!res.ok) return
    const data = await res.json()
    if(p===1) setProducts(data.items); else setProducts(prev=>[...prev,...data.items])
    setHasMore(data.has_more)
    setPage(p)
  }

  useEffect(()=>{
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(ent=>{ if(ent.isIntersecting && hasMore){ fetchPage(page+1) } })
    }, {root:null, rootMargin:'200px'})
    if(loader.current) obs.observe(loader.current)
    return ()=> obs.disconnect()
  },[page,hasMore])

  return (
    <main className="container">
      <h2>Catálogo</h2>
      <div className="grid">
        {products.map(p=> <ProductCard key={p.id} p={p} onView={(id)=>navigate('/product/'+id)} onAdd={addToCart} />)}
      </div>
      <div ref={loader} style={{height:80,display:'flex',alignItems:'center',justifyContent:'center'}}>{hasMore ? 'Carregando...' : 'Fim do catálogo'}</div>
    </main>
  )
}