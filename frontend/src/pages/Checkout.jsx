import React, {useState} from 'react'
export default function Checkout({cart, clearCart, navigate}){
  const [loading,setLoading] = useState(false)
  const total = cart.reduce((s,i)=>s + i.price * i.qty, 0)
  const createOrder = async ()=>{
    if(cart.length===0) return alert('Carrinho vazio')
    setLoading(true)
    try{
      const res = await fetch((import.meta.env.VITE_BACKEND_URL || '') + '/create-order', {
        method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ items: cart, customer_email: 'cliente@exemplo.com' })
      })
      const data = await res.json()
      if(data.checkout_url) window.location.href = data.checkout_url
      else alert('Erro ao criar pedido')
    }catch(e){ alert('Erro de rede') }finally{ setLoading(false) }
  }
  return (
    <main className="container">
      <h2>Checkout</h2>
      <div className="checkout-grid">
        <div>
          <label>Nome</label><input />
          <label>Endereço</label><input />
        </div>
        <aside>
          <div>Total: R$ {total.toFixed(2).replace('.',',')}</div>
          <button onClick={createOrder} disabled={loading}>{loading ? 'Aguarde...' : 'Pagar com InfinitePay'}</button>
        </aside>
      </div>
    </main>
  )
}