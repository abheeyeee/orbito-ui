"use client"
import * as React from "react"
export type EvidenceItem={id:string;label:string;value:number;note?:string;color?:string}
export function EvidenceLens({items,conclusion,className=""}:{items:EvidenceItem[];conclusion?:string;className?:string}){
 const [selected,setSelected]=React.useState<string>()
 const valid=items.map(item=>({...item,value:Number.isFinite(item.value)?Math.max(0,item.value):0}))
 const maximum=Math.max(0,...valid.map(i=>i.value))
 const total=maximum?valid.reduce((sum,i)=>sum+i.value/maximum,0):0
 const active=valid.find(i=>i.id===selected)??valid[0]
 const palette=['#54752a','#ac482f','#4264a0','#805792']
 return <section aria-label="Evidence comparison" className={`rounded-2xl border border-border bg-card p-5 text-card-foreground ${className}`}>
 {!items.length?<p className="text-sm text-muted-foreground">No evidence available.</p>:<>
 <div aria-hidden className="flex h-3 overflow-hidden rounded-full bg-muted">{valid.map((item,i)=><span key={item.id} style={{width:total?`${item.value/maximum/total*100}%`:'0%',background:item.color??palette[i%palette.length]}}/>)}</div>
 <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">{valid.map(item=><button type="button" key={item.id} aria-pressed={active?.id===item.id} onClick={()=>setSelected(item.id)} className={`rounded-xl border p-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 ${active?.id===item.id?'border-foreground bg-muted':'border-border'}`}><span className="block text-2xl font-semibold tabular-nums">{item.value}</span><span className="text-sm">{item.label}</span></button>)}</div>
 <p aria-live="polite" className="mt-4 min-h-10 border-l-2 border-border pl-3 text-sm text-muted-foreground">{active?.note??'No additional context for this signal.'}</p>
 {total===0&&<p className="mt-2 text-sm text-muted-foreground">No positive values to compare.</p>}
 </>}
 {conclusion&&<p className="mt-4 rounded-xl bg-foreground p-4 text-sm text-background"><span className="mr-2 font-semibold">Reading</span>{conclusion}</p>}
 </section>
}
