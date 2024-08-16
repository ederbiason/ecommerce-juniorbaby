"use client"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { ProductInterface } from "@/interfaces"
import axios from "axios"
import { Star } from "lucide-react"
import { useEffect, useState } from "react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Rate } from "antd"

export function ProductReviews({ product }: { product: ProductInterface }) {
    const [reviews, setReviews] = useState<any[]>([])
    const [comment, setComment] = useState<string>("")
    const [rating, setRating] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [loadingSubmit, setLoadingSubmit] = useState(false)

    const getReviews = async () => {
        try {
            const endPoint = `/api/reviews?product=${product._id}`
            const response = await axios.get(endPoint)

            setReviews(response.data)
        } catch (error: any) {
            toast({
                title: 'Erro na busca das avaliações',
                description: error.message,
                variant: 'destructive'
            })
        } finally {
            setLoading(false)
        }
    }

    const onSubmiReview = async () => {
        try {
            setLoadingSubmit(true)

            const endPoint = "/api/reviews"

            await axios.post(endPoint, {
                comment,
                rating,
                product: product._id
            })

            toast({
                title: 'Sucesso',
                description: "Avaliação criada com sucesso!",
            })

            getReviews()
        } catch (error: any) {
            toast({
                title: 'Erro na criação da avaliação',
                description: error.message,
                variant: 'destructive'
            })
        } finally {
            setLoadingSubmit(false)
        }
    }

    useEffect(() => {
        getReviews()
    }, [])

    return (
        <div className="mt-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">
                    Reviews
                </h1>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="flex gap-2 items-center justify-center">
                            <Star />
                            Faça sua avaliação!
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-semibold">Escreva uma avaliação</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <span>Comentário</span>

                                <Textarea 
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <span>Avaliação Geral</span>
                                <Rate value={rating} onChange={(value) => setRating(value)} />
                            </div>
                        </div>

                        <DialogFooter className="sm:justify-between">
                            <DialogClose asChild>
                                <Button className="bg-red-600 hover:bg-red-300">
                                    Cancelar
                                </Button>
                            </DialogClose>

                            <Button
                                onClick={onSubmiReview}
                                disabled={loadingSubmit}
                            >
                                Avaliar
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {
                loading ? (
                    <div className="text-gray-500 mt-5">
                        <span>
                            Carregando avaliações...
                        </span>
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="text-gray-500 mt-5">
                        <span>
                            Nenhuma avaliação ainda. Seja o primeiro a avaliar este produto.
                        </span>
                    </div>
                ) : (
                    <div className="mt-5">
                        reviews
                    </div>
                )
            }
        </div>
    )
}
