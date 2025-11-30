import React from 'react'
export default function ThemeSwitcher({theme,setTheme}){
  return (
    <div className="theme-switcher">
      <select value={theme} onChange={e=>setTheme(e.target.value)}>
        <option value="theme-a">Clean / Minimalista</option>
        <option value="theme-b">Moderno / Instagram</option>
        <option value="theme-c">Luxo Dark</option>
        <option value="theme-d">Colorido Fashion</option>
      </select>
    </div>
  )
}