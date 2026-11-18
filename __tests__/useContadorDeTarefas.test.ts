import { renderHook } from '@testing-library/react'
import { useContadorDeTarefas } from '@/hooks/useContadorDeTarefas'
import type { Tarefa } from '@/types/tarefa'

const tarefa: Tarefa = { id: 1, titulo: 'Estudar Jest', concluida: false }

describe('useContadorDeTarefas', () => {
  it('retorna zero quando a lista está vazia', () => {
    const { result } = renderHook(() => useContadorDeTarefas([]))
    expect(result.current).toBe(0)
  })

  it('retorna a quantidade de tarefas e acompanha atualizações', () => {
    const { result, rerender } = renderHook(
      ({ tarefas }: { tarefas: Tarefa[] }) => useContadorDeTarefas(tarefas),
      { initialProps: { tarefas: [tarefa] } },
    )

    expect(result.current).toBe(1)
    rerender({ tarefas: [tarefa, { ...tarefa, id: 2 }] })
    expect(result.current).toBe(2)
  })
})
