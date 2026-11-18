import { PainelDeTarefas } from '@/components/PainelDeTarefas'
import { buscarTarefas } from '@/lib/tarefas'

// Server Component assíncrono do App Router: busca os dados no servidor.
export default async function Page() {
  const tarefas = await buscarTarefas()

  return (
    <main className="pagina">
      <PainelDeTarefas tarefasIniciais={tarefas} />
    </main>
  )
}
