import React, {useEffect, useState} from 'react'
import Catalog from './pages/Catalog'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ThankYou from './pages/ThankYou'
import ThemeSwitcher from './components/ThemeSwitcher'

export default function App(){
  const [route, setRoute] = useState(window.location.pathname)
  const [cart, setCart] = useState([])
  const [theme, setTheme] = useState(localStorage.getItem('glouz_theme') || 'theme-a')

  useEffect(()=>{
    document.documentElement.className = theme
    localStorage.setItem('glouz_theme', theme)
  },[theme])

  useEffect(()=>{
    const onPop = ()=> setRoute(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return ()=> window.removeEventListener('popstate', onPop)
  },[])

  const navigate = (path)=>{ window.history.pushState({}, '', path); setRoute(path) }

  const addToCart = (product, qty=1)=>{ setCart(prev=>{ const found = prev.find(p=>p.id===product.id); if(found) return prev.map(p=>p.id===product.id?{...p,qty:p.qty+qty}:p); return [...prev,{...product,qty}] }) }

  const updateQty = (id, qty)=> setCart(prev=> prev.map(p=> p.id===id?{...p,qty}:p))

  const clearCart = ()=> setCart([])

  if(route.startsWith('/product/')){
    const id = Number(route.split('/product/')[1]); return <Product id={id} addToCart={addToCart} navigate={navigate} />
  }
  if(route === '/cart') return <Cart cart={cart} updateQty={updateQty} navigate={navigate} />
  if(route === '/checkout') return <Checkout cart={cart} clearCart={clearCart} navigate={navigate} />
  if(route === '/thank-you') return <ThankYou />

  return <div>
    <header className="site-header">
      <div className="container">
        <h1 className="logo">Glouz Acessórios</h1>
        <nav className="nav">
          <button onClick={()=>navigate('/')}>Início</button>
          <button onClick={()=>navigate('/cart')}>Carrinho ({cart.length})</button>
          <ThemeSwitcher theme={theme} setTheme={setTheme} />
        </nav>
      </div>
    </header>
    <Catalog addToCart={addToCart} navigate={navigate} />
    <footer className="site-footer">Glouz Acessórios — Demo</footer>
  </div>
}