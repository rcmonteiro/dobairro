import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const currency = (number: number) => {
  return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export const formatNumber = (number: number) => {
  if (!number) number = 0
  return number.toLocaleString('pt-BR')
}

export const distanceToNow = (date: string | Date | null) => {
  if (!date) date = new Date()
  return formatDistanceToNow(new Date(date), { locale: ptBR, addSuffix: true })
}
