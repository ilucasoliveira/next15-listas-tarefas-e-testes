'use client'

import type { Tarefa } from '@/types/tarefa'

export function useContadorDeTarefas(tarefas: readonly Tarefa[]): number {
  return tarefas.length
}
