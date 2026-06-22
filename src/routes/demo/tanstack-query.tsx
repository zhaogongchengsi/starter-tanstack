import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/demo/tanstack-query')({
  component: TanStackQueryDemo,
})

function TanStackQueryDemo() {
  const { data } = useQuery({
    queryKey: ['todos'],
    queryFn: () =>
      Promise.resolve([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
      ]),
    initialData: [],
  })

  return (
    <main className="flex min-h-[50vh] items-center justify-center px-4">
      <section className="w-full max-w-2xl rounded-lg border p-6">
        <p className="text-sm font-medium text-muted-foreground">TanStack Query</p>
        <h1 className="mt-1.5 mb-6 text-xl font-semibold">
          TanStack Query Simple Promise Handling
        </h1>
        <ul className="mb-4 space-y-2">
          {data.map((todo) => (
            <li key={todo.id} className="rounded-md border px-4 py-3">
              <span className="text-sm font-medium">{todo.name}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
