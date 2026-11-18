import { render, screen } from '@testing-library/react'
import Page from '@/app/page'

describe('Página inicial (App Router)', () => {
  it('carrega e exibe as tarefas locais sem simular API externa', async () => {
    // O Jest não renderiza diretamente async Server Components.
    // Aqui aguardamos os dados no componente e testamos a árvore React retornada.
    const pagina = await Page()
    render(pagina)

    expect(screen.getByRole('heading', { name: 'Minhas tarefas' })).toBeInTheDocument()
    expect(screen.getByText('Estudar testes unitários')).toBeInTheDocument()
    expect(screen.getByText('Criar formulário de tarefas')).toBeInTheDocument()
    expect(screen.getByText('Publicar projeto no GitHub')).toBeInTheDocument()
    expect(screen.getByLabelText('Total de tarefas')).toHaveTextContent('3')
  })
})
