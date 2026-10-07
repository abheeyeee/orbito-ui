"use client"
import * as React from "react"
export type HaloAction = { id: string; label: string; icon?: React.ReactNode; onSelect: () => void; disabled?: boolean }
export function ActionHalo({ actions, label = "Open actions", className = "" }: { actions: HaloAction[]; label?: string; className?: string }) {
  const [open,setOpen]=React.useState(false)
  const root=React.useRef<HTMLDivElement>(null), trigger=React.useRef<HTMLButtonElement>(null)
  const id=React.useId()
  const close=()=>{setOpen(false);trigger.current?.focus()}
  React.useEffect(()=>{
    if(!open)return
    root.current?.querySelector<HTMLButtonElement>('[role="menuitem"]:not(:disabled)')?.focus()
    const outside=(e:PointerEvent)=>{if(!root.current?.contains(e.target as Node))setOpen(false)}
    document.addEventListener('pointerdown',outside)
    return()=>document.removeEventListener('pointerdown',outside)
  },[open])
  function keydown(e:React.KeyboardEvent){
    if(e.key==='Escape'){e.preventDefault();close();return}
    if(e.key==='Tab'){setOpen(false);return}
    if(!['ArrowDown','ArrowUp','ArrowRight','ArrowLeft','Home','End'].includes(e.key))return
    e.preventDefault()
    const buttons=Array.from(root.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)')??[])
    if(!buttons.length)return
    const current=buttons.indexOf(document.activeElement as HTMLButtonElement)
    const next=e.key==='Home'?0:e.key==='End'?buttons.length-1:(current+(['ArrowUp','ArrowLeft'].includes(e.key)?-1:1)+buttons.length)%buttons.length
    buttons[next]?.focus()
  }
  return <div ref={root} className={`relative inline-flex ${className}`} onKeyDown={keydown}>
    <button type="button" ref={trigger} aria-label={label} aria-haspopup="menu" aria-expanded={open} aria-controls={open?id:undefined} disabled={!actions.length} onClick={()=>setOpen(v=>!v)} onKeyDown={e=>{if(e.key==='ArrowDown'){e.preventDefault();setOpen(true)}}} className="grid size-14 place-items-center rounded-full bg-foreground text-2xl text-background shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 disabled:opacity-40">{open?'×':'+'}</button>
    {open&&<div id={id} role="menu" aria-label={label} className="absolute bottom-18 left-1/2 z-20 flex w-64 -translate-x-1/2 flex-col gap-1 rounded-2xl border border-border bg-card p-2 text-card-foreground shadow-xl">
      {actions.map(action=><button key={action.id} type="button" role="menuitem" tabIndex={-1} disabled={action.disabled} onClick={()=>{close();action.onSelect()}} className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm hover:bg-muted focus:bg-muted focus:outline-none disabled:opacity-40"><span aria-hidden>{action.icon??'↗'}</span>{action.label}</button>)}
    </div>}
  </div>
}
