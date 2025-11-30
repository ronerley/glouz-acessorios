import React from 'react'
export default function Cart({cart, updateQty, navigate}){
  const total = cart.reduce((s,i)=>s + i.price * i.qty, 0)
  return (
    <main className="container">
      <h2>Carrinho</h2>
      {cart.length===0 ? <div>Seu carrinho está vazio.</div> :
        <div className="cart-grid">
          <div>
            {cart.map(item=>(
              <div key={item.id} className="cart-item">
                <div>{item.title}</div>
                <div>R$ {item.price.toFixed(2).replace('.',',')}</div>
                <input type="number" min="1" value={item.qty} onChange={(e)=>updateQty(item.id, Number(e.target.value))} />
              </div>
            ))}
          </div>
          <aside>
            <div>Total: R$ {total.toFixed(2).replace('.',',')}</div>
            <button onClick={()=>navigate('/checkout')}>Finalizar compra</button>
          </aside>
        </div>
      }
    </main>
  )
}