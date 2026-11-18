import { fireEvent, render, screen, within } from '@testing-library/react'
import { PainelDeTarefas } from '@/components/PainelDeTarefas'
import type { Tarefa } from '@/types/tarefa'

const tarefas: Tarefa[] = [
  { id: 1, titulo: 'Escrever testes', concluida: true },
  { id: 2, titulo: 'Revisar o projeto', concluida: false },
]

describe('PainelDeTarefas', () => {
  it('renderiza as tarefas iniciais e o contador', () => {
    render(<PainelDeTarefas tarefasIniciais={tarefas} />)

    const lista = screen.getByRole('list', { name: /lista de tarefas/i })
    expect(within(lista).getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText('Escrever testes')).toBeInTheDocument()
    expect(screen.getByText('Revisar o projeto')).toBeInTheDocument()
    expect(screen.getByLabelText('Total de tarefas')).toHaveTextContent('2')
    expect(screen.getByText('Concluída')).toBeInTheDocument()
  })

  it('adiciona uma tarefa e atualiza o contador sem recarregar', () => {
    render(<PainelDeTarefas tarefasIniciais={tarefas} />)

    fireEvent.change(screen.getByRole('textbox', { name: /nome da tarefa/i }), {
      target: { value: 'Enviar atividade' },
    })
    fireEvent.click(screen.getByRole('button', { name: /adicionar tarefa/i }))

    expect(screen.getByText('Enviar atividade')).toBeInTheDocument()
    expect(screen.getByLabelText('Total de tarefas')).toHaveTextContent('3')
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  it('informa quando não existem tarefas', () => {
    render(<PainelDeTarefas tarefasIniciais={[]} />)

    expect(screen.getByText('Nenhuma tarefa cadastrada.')).toBeInTheDocument()
    expect(screen.getByLabelText('Total de tarefas')).toHaveTextContent('0')
  })
})
