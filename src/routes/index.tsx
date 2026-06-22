import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <section className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          TanStack Start Starter
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          A minimal starter template with TanStack Router, Query, Table, and
          more. Type-safe routing, SSR, and modern tooling out of the box.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/about"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            About
          </Link>
          <Link
            to="/demo/table"
            className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
          >
            View Demos
          </Link>
        </div>
      </section>

      <section className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: 'TanStack Table',
            desc: 'Headless UI for building powerful tables & datagrids.',
            to: '/demo/table',
          },
          {
            title: 'Better Auth',
            desc: 'Authentication demo with email/password sign in.',
            to: '/demo/better-auth',
          },
          {
            title: 'tRPC Todo',
            desc: 'End-to-end typesafe APIs with tRPC + TanStack Query.',
            to: '/demo/trpc-todo',
          },
          {
            title: 'TanStack Query',
            desc: 'Powerful asynchronous state management for React.',
            to: '/demo/tanstack-query',
          },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="rounded-lg border p-6 transition-colors hover:bg-accent"
          >
            <h3 className="font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
          </Link>
        ))}
      </section>
    </main>
  )
}
