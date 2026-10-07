export type BranchflowStep = {
  id: string
  label: string
  detail?: string
  status: "complete" | "current" | "upcoming" | "blocked"
  branches?: { label: string; tone?: "neutral" | "positive" | "warning" }[]
}

export function Branchflow({ steps, className = "" }: { steps: BranchflowStep[]; className?: string }) {
  return (
    <ol aria-label="Workflow progress" className={`grid gap-2 ${className}`}>
      {steps.map((step, index) => (
        <li key={step.id} className="relative grid grid-cols-[2rem_1fr] gap-3">
          {index < steps.length - 1 && <span aria-hidden className="absolute left-[.93rem] top-8 h-[calc(100%-1rem)] w-px bg-border" />}
          <span
            aria-current={step.status === "current" ? "step" : undefined}
            className={`relative z-10 mt-1 grid size-8 place-items-center rounded-full border text-xs font-semibold ${
              step.status === "complete" ? "border-emerald-700 bg-emerald-700 text-white" :
              step.status === "current" ? "border-foreground bg-foreground text-background ring-4 ring-muted" :
              step.status === "blocked" ? "border-amber-500 bg-amber-50 text-amber-700" : "bg-background text-muted-foreground"
            }`}
          >{step.status === "complete" ? "✓" : index + 1}</span>
          <div className={`rounded-xl border bg-card p-4 ${step.status === "current" ? "shadow-sm" : ""}`}>
            <div className="flex items-center justify-between gap-3">
              <span className="font-medium">{step.label}</span>
              <span className="text-[10px] uppercase tracking-[.18em] text-muted-foreground">{step.status}</span>
            </div>
            {step.detail && <p className="mt-1 text-sm text-muted-foreground">{step.detail}</p>}
            {!!step.branches?.length && (
              <div className="mt-3 flex flex-wrap gap-2">
                {step.branches.map((branch) => <span key={branch.label} className={`rounded-full border px-2.5 py-1 text-xs ${branch.tone === "positive" ? "bg-emerald-100 text-emerald-900" : branch.tone === "warning" ? "bg-amber-100 text-amber-900" : "bg-muted text-foreground"}`}>↳ {branch.label}</span>)}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
