import React, {useEffect, useState} from 'react'
export default function Product({id, addToCart, navigate}){
  const [p,setP] = useState(null)
  useEffect(()=>{ fetch((import.meta.env.VITE_BACKEND_URL || '') + '/products/'+id).then(r=>r.json()).then(d=>setP(d)).catch(()=>{}) },[id])
  if(!p) return <div className="container">Carregando...</div>
  return (
    <main className="container product-page">
      <div className="grid-2">
        <div className="image">{p.image ? <img src={p.image} alt={p.title} /> : <div className='placeholder'>Imagem</div>}</div>
        <div>
          <h2>{p.title}</h2>
          <div className="price">R$ {p.price.toFixed(2).replace('.',',')}</div>
          <p>{p.description}</p>
          <div className="mt-4">
            <button className="btn" onClick={()=>{ addToCart(p); }}>Adicionar ao carrinho</button>
            <button className="btn ghost" onClick={()=>navigate('/checkout')}>Comprar agora</button>
          </div>
        </div>
      </div>
    </main>
  )
}