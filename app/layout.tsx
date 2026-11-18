import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Minhas tarefas | Next.js 15',
  description: 'Aplicação simples de tarefas com testes unitários em Jest e Testing Library.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
