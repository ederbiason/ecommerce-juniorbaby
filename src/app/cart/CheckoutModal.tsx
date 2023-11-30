"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import axios from "axios"
import { useEffect, useState } from "react"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import { Separator } from "@/components/ui/separator"

const stripePromise = loadStripe("pk_test_51MbSfgFgneiQiZOk732xrGvc3cDax5XsbtkhUldSYG0FAf0IaX0YAwLdPU5727WjwEf8ZPGb4zbEHz9uFK6Dpqqa0060zrpOU6")

interface CheckoutModalProps {
    showCheckoutModal: boolean
    setShowCheckoutModal: any
    total: number
}

export function CheckoutModal({ showCheckoutModal, setShowCheckoutModal, total }: CheckoutModalProps) {
    const [clientSecret, setclientSecret] = useState('')

    useEffect(() => {
        axios.post('/api/stripe_client_secret', { amount: total }).then(res => {
            setclientSecret(res.data.clientSecret)
        })
    }, [total])

    return (
        <Dialog
            open={showCheckoutModal}
            onOpenChange={(isOpen) => {
                if (isOpen === true) return
                setShowCheckoutModal(false)
            }}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">Pagamento</DialogTitle>
                    <DialogDescription className="font-semibold text-base">Total: R$ {total}</DialogDescription>
                </DialogHeader>

                <Separator />

                {
                    stripePromise && clientSecret && (
                        <Elements stripe={stripePromise} options={{
                            clientSecret: clientSecret,
                        }}>
                            <form className="flex flex-col gap-5">
                                <PaymentElement />
                                <Button type="submit" className="text-lg">
                                    Pagar
                                </Button>
                            </form>
                        </Elements>
                    )
                }
            </DialogContent>
        </Dialog>
    )
}
