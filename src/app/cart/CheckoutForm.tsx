"use client"

import { Loader } from "@/components/Loader"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { CartState, ClearCart } from "@/redux/cartSlice"
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

interface CheckoutFormProps {
    total: number;
    setShowCheckoutModal: any;
}

export function CheckoutForm({ total, setShowCheckoutModal }: CheckoutFormProps) {
    const [loading, setLoading] = useState(false);

    const { cartItems }: CartState = useSelector((state: any) => state.cart)

    const dispatch = useDispatch()
    const router = useRouter()

    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (event: FormEvent) => {
        try {
            setLoading(true)
            event.preventDefault()

            if (!stripe || !elements) {
                throw new Error("Strip.js hasn't loaded yet.")
            }

            const result = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: "http://localhost:3000/cart",
                },
                redirect: "if_required"
            });

            if (result.error) {
                throw result.error
            }

            // salvar pedido no banco de dados
            const orderPayload = {
                items: cartItems,
                paymentStatus: "paid",
                orderStatus: "order placed",
                shippingAddress: result.paymentIntent.shipping,
                transactionId: result.paymentIntent.id,
                total,
            };
            await axios.post("/api/orders/place_order", orderPayload);
            dispatch(ClearCart());

            toast({
                title: "Sucesso.",
                description: "Pedido criado com sucesso!",
            })

            router.push("/profile");
        } catch (error: any) {
            toast({
                title: "Erro",
                description: error.message,
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {loading && <Loader />}
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="h-[400px] overflow-y-scroll pr-5">
                    <PaymentElement />

                    <AddressElement
                        options={{
                            allowedCountries: ["BR"],
                            mode: "shipping",
                        }}
                    />
                </div>

                <div className="flex gap-5 items-center justify-end">
                    <Button
                        type="button"
                        className="bg-white border border-gray-600 text-gray-700 hover:bg-gray-300"
                        onClick={() => setShowCheckoutModal(false)}
                    >
                        Cancelar
                    </Button>

                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        Pagar
                    </Button>
                </div>
            </form>
        </div>
    )
}
