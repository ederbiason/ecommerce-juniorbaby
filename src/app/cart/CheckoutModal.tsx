"use client"

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
import { Separator } from "@/components/ui/separator"
import { CheckoutForm } from "./CheckoutForm";
import { toast } from "@/components/ui/use-toast";
import { Loader } from "@/components/Loader";

const stripePromise = loadStripe("pk_test_51MbSfgFgneiQiZOk732xrGvc3cDax5XsbtkhUldSYG0FAf0IaX0YAwLdPU5727WjwEf8ZPGb4zbEHz9uFK6Dpqqa0060zrpOU6")

interface CheckoutModalProps {
    showCheckoutModal: boolean
    setShowCheckoutModal: any
    total: number
}

export function CheckoutModal({ showCheckoutModal, setShowCheckoutModal, total }: CheckoutModalProps) {
    const [clientSecret, setClientSecret] = useState('')
    const [loading, setLoading] = useState(false)

    const loadClientSecret = async () => {
        try {
            setLoading(true);
            const res = await axios.post("/api/stripe_client_secret", {
                amount: total,
            });
            setClientSecret(res.data.clientSecret);
        } catch (error: any) {
            toast({
                title: "Erro",
                description: error.message,
                variant: "destructive"
            })
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadClientSecret()
    }, [])

    return (
        <Dialog
            open={showCheckoutModal}
            onOpenChange={(isOpen) => {
                if (isOpen === true) return
                setShowCheckoutModal(false)
            }}
        >
            {loading && <Loader />}

            <DialogContent>
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
                            <CheckoutForm
                                total={total}
                                setShowCheckoutModal={setShowCheckoutModal}
                            />
                        </Elements>
                    )
                }
            </DialogContent>
        </Dialog>
    )
}
