"use client"

import { Button } from "@/components/ui/button";

interface AddToCartBtnProps {
    product: any
}

export function AddToCartBtn({product}: AddToCartBtnProps) {
  return (
    <Button>
        Adicionar no carrinho
    </Button>
  )
}
