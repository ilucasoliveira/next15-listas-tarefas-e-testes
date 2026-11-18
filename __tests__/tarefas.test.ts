import { buscarTarefas } from '@/lib/tarefas'

describe('buscarTarefas', () => {
  it('obtém tarefas simuladas sem dependência de rede', async () => {
    const tarefas = await buscarTarefas()
    expect(tarefas).toHaveLength(3)
    expect(tarefas[0]).toEqual({
      id: 1,
      titulo: 'Estudar testes unitários',
      concluida: true,
    })
  })

  it('não compartilha o mesmo objeto mutável entre chamadas', async () => {
    const primeira = await buscarTarefas()
    primeira[0].titulo = 'Modificada no teste'
    primeira.push({ id: 999, titulo: 'Extra', concluida: false })

    const segunda = await buscarTarefas()
    expect(segunda).toHaveLength(3)
    expect(segunda[0].titulo).toBe('Estudar testes unitários')
  })
})
