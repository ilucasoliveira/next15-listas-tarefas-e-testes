import type { Tarefa } from '@/types/tarefa'

const tarefasSimuladas: Tarefa[] = [
  { id: 1, titulo: 'Estudar testes unitários', concluida: true },
  { id: 2, titulo: 'Criar formulário de tarefas', concluida: false },
  { id: 3, titulo: 'Publicar projeto no GitHub', concluida: false },
]

// Simula uma API. Devolve uma cópia para evitar compartilhar estado mutável.
export function buscarTarefas(): Promise<Tarefa[]> {
  return Promise.resolve(tarefasSimuladas.map((tarefa) => ({ ...tarefa })))
}
