import { Suspense } from 'react'
import CallbackClient from './callback-client'

export const dynamic = 'force-dynamic'

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<FallbackShell />}> 
      <CallbackClient />
    </Suspense>
  )
}

function FallbackShell() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-sm rounded-2xl border bg-background/60 backdrop-blur p-8 text-center space-y-6 animate-pulse">
        <div className="h-10 w-10 mx-auto rounded-full bg-primary/20" />
        <div className="space-y-2">
          <div className="h-5 w-40 mx-auto rounded bg-foreground/10" />
          <div className="h-3 w-56 mx-auto rounded bg-foreground/10" />
        </div>
      </div>
    </div>
  )
}
