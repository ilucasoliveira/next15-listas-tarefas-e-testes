'use client'

import { useState } from 'react'
import { NovaTarefa } from '@/components/NovaTarefa'
import { useContadorDeTarefas } from '@/hooks/useContadorDeTarefas'
import type { Tarefa } from '@/types/tarefa'

type PainelDeTarefasProps = {
  tarefasIniciais: Tarefa[]
}

export function PainelDeTarefas({ tarefasIniciais }: PainelDeTarefasProps) {
  const [tarefas, setTarefas] = useState<Tarefa[]>(tarefasIniciais)
  const total = useContadorDeTarefas(tarefas)

  function adicionarTarefa(titulo: string) {
    setTarefas((anteriores) => {
      const maiorId = anteriores.reduce((maior, tarefa) => Math.max(maior, tarefa.id), 0)
      return [...anteriores, { id: maiorId + 1, titulo, concluida: false }]
    })
  }

  return (
    <section className="painel" aria-label="Gerenciador de tarefas">
      <p className="eyebrow">Next.js 15 · Projeto de testes</p>
      <h1>Minhas tarefas</h1>
      <p className="subtitulo">Uma lista simples para colocar em prática Server Components, hooks e testes unitários.</p>

      <div className="resumo" aria-label="Resumo das tarefas">
        <output aria-label="Total de tarefas">{total}</output>
        <span>{total === 1 ? 'tarefa cadastrada' : 'tarefas cadastradas'}</span>
      </div>

      <h2>Adicionar nova tarefa</h2>
      <NovaTarefa onAdicionar={adicionarTarefa} />

      <h2>Lista de tarefas</h2>
      {tarefas.length === 0 ? (
        <p className="vazio" role="status">Nenhuma tarefa cadastrada.</p>
      ) : (
        <ul className="lista" aria-label="Lista de tarefas">
          {tarefas.map((tarefa) => (
            <li key={tarefa.id} className="item">
              <span>{tarefa.titulo}</span>
              <span className={`status ${tarefa.concluida ? 'concluida' : ''}`}>
                {tarefa.concluida ? 'Concluída' : 'Pendente'}
              </span>
            </li>
          ))}
        </ul>
      )}

      <p className="rodape">Dados simulados em memória: novas tarefas não persistem após recarregar.</p>
    </section>
  )
}
