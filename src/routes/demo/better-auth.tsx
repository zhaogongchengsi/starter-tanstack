import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { authClient } from '#/lib/auth-client'

export const Route = createFileRoute('/demo/better-auth')({
  component: BetterAuthDemo,
})

function BetterAuthDemo() {
  const { data: session, isPending } = authClient.useSession()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isPending) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-muted border-t-foreground" />
      </main>
    )
  }

  if (session?.user) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center px-4">
        <section className="w-full max-w-md space-y-6 rounded-lg border p-6">
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-muted-foreground">Better Auth</p>
            <h1 className="text-xl font-semibold">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              You're signed in as {session.user.email}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {session.user.image ? (
              <img src={session.user.image} alt="" className="h-10 w-10 rounded-full" />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <span className="text-sm font-medium">
                  {session.user.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {session.user.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              void authClient.signOut()
            }}
            className="w-full rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
          >
            Sign out
          </button>

          <p className="text-center text-xs text-muted-foreground">
            Built with{' '}
            <a
              href="https://better-auth.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              BETTER-AUTH
            </a>
            .
          </p>
        </section>
      </main>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isSignUp) {
        const result = await authClient.signUp.email({
          email,
          password,
          name,
        })
        if (result.error) {
          setError(result.error.message || 'Sign up failed')
        }
      } else {
        const result = await authClient.signIn.email({
          email,
          password,
        })
        if (result.error) {
          setError(result.error.message || 'Sign in failed')
        }
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-[50vh] items-center justify-center px-4">
      <section className="w-full max-w-md rounded-lg border p-6">
        <p className="text-sm font-medium text-muted-foreground">Better Auth</p>
        <h1 className="mt-1.5 text-xl font-semibold">
          {isSignUp ? 'Create an account' : 'Sign in'}
        </h1>
        <p className="mt-2 mb-6 text-sm text-muted-foreground">
          {isSignUp
            ? 'Enter your information to create an account'
            : 'Enter your email below to login to your account'}
        </p>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {isSignUp && (
            <div className="grid gap-2">
              <label
                htmlFor="name"
                className="text-sm font-medium leading-none"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                required
              />
            </div>
          )}

          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium leading-none">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              required
            />
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium leading-none"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              required
              minLength={8}
            />
          </div>

          {error && (
            <div className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                <span>Please wait</span>
              </span>
            ) : isSignUp ? (
              'Create account'
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp)
              setError('')
            }}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {isSignUp
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"}
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Built with{' '}
          <a
            href="https://better-auth.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium"
          >
            BETTER-AUTH
          </a>
          .
        </p>
      </section>
    </main>
  )
}
