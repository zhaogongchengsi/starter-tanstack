import { useCallback, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useTRPC } from '#/integrations/trpc/react'

export const Route = createFileRoute('/demo/trpc-todo')({
  component: TRPCTodos,
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery(
      context.trpc.todos.list.queryOptions(),
    )
  },
})

function TRPCTodos() {
  const trpc = useTRPC()
  const { data, refetch } = useQuery(trpc.todos.list.queryOptions())

  const [todo, setTodo] = useState('')
  const { mutate: addTodo } = useMutation({
    ...trpc.todos.add.mutationOptions(),
    onSuccess: () => {
      refetch()
      setTodo('')
    },
  })

  const submitTodo = useCallback(() => {
    addTodo({ name: todo })
  }, [addTodo, todo])

  return (
    <main className="flex min-h-[50vh] items-center justify-center px-4">
      <section className="w-full max-w-2xl rounded-lg border p-6">
        <p className="text-sm font-medium text-muted-foreground">tRPC</p>
        <h1 className="mt-1.5 mb-6 text-xl font-semibold">Todos</h1>
        <ul className="mb-4 space-y-2">
          {data?.map((t) => (
            <li key={t.id} className="rounded-md border px-4 py-3">
              <span className="text-sm font-medium">{t.name}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                submitTodo()
              }
            }}
            placeholder="Enter a new todo..."
            className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
          <button
            disabled={todo.trim().length === 0}
            onClick={submitTodo}
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            Add todo
          </button>
        </div>
      </section>
    </main>
  )
}
