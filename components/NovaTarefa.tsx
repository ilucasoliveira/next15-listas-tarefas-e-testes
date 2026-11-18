'use client'

import { useState, type FormEvent } from 'react'

type NovaTarefaProps = {
  onAdicionar: (titulo: string) => void
}

export function NovaTarefa({ onAdicionar }: NovaTarefaProps) {
  const [titulo, setTitulo] = useState('')
  const [erro, setErro] = useState('')

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    const tituloLimpo = titulo.trim()

    if (tituloLimpo.length < 3) {
      setErro('Digite pelo menos 3 caracteres para a tarefa.')
      return
    }

    onAdicionar(tituloLimpo)
    setTitulo('')
    setErro('')
  }

  return (
    <form className="formulario" onSubmit={enviar} noValidate>
      <label htmlFor="titulo-tarefa">Nome da tarefa</label>
      <div className="linha-formulario">
        <input
          id="titulo-tarefa"
          name="titulo"
          type="text"
          placeholder="Ex.: Revisar componentes React"
          maxLength={120}
          value={titulo}
          onChange={(evento) => {
            setTitulo(evento.target.value)
            if (erro) setErro('')
          }}
          aria-invalid={Boolean(erro)}
          aria-describedby={erro ? 'erro-tarefa' : undefined}
        />
        <button type="submit">Adicionar tarefa</button>
      </div>
      {erro && <p id="erro-tarefa" className="erro" role="alert">{erro}</p>}
    </form>
  )
}
