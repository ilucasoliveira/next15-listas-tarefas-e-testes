import { fireEvent, render, screen } from '@testing-library/react'
import { NovaTarefa } from '@/components/NovaTarefa'

describe('NovaTarefa', () => {
  it('exibe um campo controlado e o botão de adicionar', () => {
    const onAdicionar = jest.fn()
    render(<NovaTarefa onAdicionar={onAdicionar} />)

    const campo = screen.getByRole('textbox', { name: /nome da tarefa/i })
    expect(campo).toHaveValue('')
    expect(screen.getByRole('button', { name: /adicionar tarefa/i })).toBeEnabled()

    fireEvent.change(campo, { target: { value: 'Ler documentação' } })
    expect(campo).toHaveValue('Ler documentação')
  })

  it('rejeita campos vazios, espaços e textos menores que 3 caracteres', () => {
    const onAdicionar = jest.fn()
    render(<NovaTarefa onAdicionar={onAdicionar} />)

    const campo = screen.getByRole('textbox', { name: /nome da tarefa/i })
    const botao = screen.getByRole('button', { name: /adicionar tarefa/i })
    fireEvent.click(botao)
    expect(screen.getByRole('alert')).toHaveTextContent(/pelo menos 3 caracteres/i)
    expect(campo).toHaveAttribute('aria-invalid', 'true')

    fireEvent.change(campo, { target: { value: '   ' } })
    fireEvent.click(botao)
    expect(screen.getByRole('alert')).toBeInTheDocument()

    fireEvent.change(campo, { target: { value: 'ab' } })
    fireEvent.click(botao)
    expect(onAdicionar).not.toHaveBeenCalled()
  })

  it('envia o texto sem espaços nas extremidades e limpa o formulário', () => {
    const onAdicionar = jest.fn()
    render(<NovaTarefa onAdicionar={onAdicionar} />)

    const campo = screen.getByRole('textbox', { name: /nome da tarefa/i })
    fireEvent.change(campo, { target: { value: '  Criar teste  ' } })
    fireEvent.click(screen.getByRole('button', { name: /adicionar tarefa/i }))

    expect(onAdicionar).toHaveBeenCalledTimes(1)
    expect(onAdicionar).toHaveBeenCalledWith('Criar teste')
    expect(campo).toHaveValue('')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
