"use client"
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'
import { Loader2, CheckCircle2, AlertTriangle } from 'lucide-react'

export default function AuthCallbackPage() {
  const router = useRouter()
  const params = useSearchParams()
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
  const [message, setMessage] = useState('Finalizing sign in…')

  useEffect(() => {
    const run = async () => {
      try {
        if (!supabase) {
          setStatus('error')
          setMessage('Supabase client not available')
          return
        }
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          setStatus('error')
          setMessage(error.message)
          return
        }
        if (data.session) {
          setStatus('success')
          setMessage('Signed in! Redirecting…')
          const next = params.get('next') || '/app/dashboard'
          setTimeout(() => router.replace(next), 800)
        } else {
          setStatus('error')
          setMessage('No active session found.')
        }
      } catch (e: any) {
        setStatus('error')
        setMessage(e.message || 'Unexpected error')
      }
    }
    run()
  }, [router, params])

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-sm rounded-2xl border bg-background/60 backdrop-blur p-8 text-center space-y-6">
        {status === 'verifying' && <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />}
        {status === 'success' && <CheckCircle2 className="mx-auto h-10 w-10 text-green-500" />}
        {status === 'error' && <AlertTriangle className="mx-auto h-10 w-10 text-amber-500" />}
        <div className="space-y-2">
          <h1 className="font-display text-xl font-semibold">Authentication</h1>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
        {status === 'error' && (
          <button
            onClick={() => router.replace('/')}
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium"
          >
            Back Home
          </button>
        )}
      </div>
    </div>
  )
}
