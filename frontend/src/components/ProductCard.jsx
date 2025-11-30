import React from 'react'
export default function ProductCard({p, onView, onAdd}){
  return (
    <article className="card">
      <div className="thumb">{p.image ? <img src={p.image} alt={p.title} /> : <div className="placeholder">Imagem</div>}</div>
      <h3>{p.title}</h3>
      <div className="price">R$ {p.price.toFixed(2).replace('.',',')}</div>
      <div className="actions">
        <button onClick={()=>onView(p.id)}>Ver</button>
        <button onClick={()=>onAdd(p)}>Adicionar</button>
      </div>
    </article>
  )
}