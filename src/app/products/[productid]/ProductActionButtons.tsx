import { Button } from '@/components/ui/button'
import React from 'react'

export default function ProductActionButtons({product}: {product: any}) {
  return (
    <div className="flex gap-5">
        <Button className="bg-white text-black border border-primary hover:bg-gray-300">Adicionar ao carrinho</Button>
        <Button>Compre agora</Button>
    </div>
  )
}
