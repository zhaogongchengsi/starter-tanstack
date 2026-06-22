import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <section className="rounded-xl border p-6 sm:p-8">
        <p className="text-sm font-medium text-muted-foreground">About</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          A small starter with room to grow.
        </h1>
        <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
          TanStack Start gives you type-safe routing, server functions, and
          modern SSR defaults. Use this as a clean foundation, then layer in
          your own routes, styling, and add-ons.
        </p>
      </section>
    </main>
  )
}
