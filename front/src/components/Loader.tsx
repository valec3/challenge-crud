import { Loader2 } from "lucide-react"

export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      <p className="text-muted-foreground">Loading your delicious pizzas...</p>
    </div>
  )
}