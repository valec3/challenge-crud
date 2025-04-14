// Simple toast hook inspirado en react-hot-toast
import * as React from "react"
import type { ToastProps, ToastActionElement } from "@/components/ui/toast"

const TOAST_REMOVE_DELAY = 3000 // 3 segundos

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

interface State {
  toasts: ToasterToast[]
}

let toastIdCounter = 0
const genId = () => (++toastIdCounter).toString()

const listeners: Array<(state: State) => void> = []
let memoryState: State = { toasts: [] }

function notifyListeners() {
  listeners.forEach((listener) => listener(memoryState))
}

function showToast(toast: Omit<ToasterToast, "id">) {
  const id = genId()
  const newToast: ToasterToast = {
    ...toast,
    id,
    open: true,
    onOpenChange: (open) => {
      if (!open) hideToast(id)
    },
  }

  memoryState = { toasts: [newToast] }
  notifyListeners()

  setTimeout(() => {
    memoryState = {
      toasts: memoryState.toasts.filter((t) => t.id !== id),
    }
    notifyListeners()
  }, TOAST_REMOVE_DELAY)

  return {
    id,
    dismiss: () => hideToast(id),
  }
}

function hideToast(id: string) {
  memoryState = {
    toasts: memoryState.toasts.map((t) =>
      t.id === id ? { ...t, open: false } : t
    ),
  }
  notifyListeners()
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  return {
    ...state,
    toast: showToast,
    dismiss: hideToast,
  }
}

export { useToast, showToast as toast }
