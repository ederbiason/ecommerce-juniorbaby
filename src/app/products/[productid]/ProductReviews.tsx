"use client"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { ProductInterface } from "@/interfaces"
import axios from "axios"
import { Star, User } from "lucide-react"
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
import moment from "moment"

export function ProductReviews({ product }: { product: ProductInterface }) {
    const [reviews, setReviews] = useState<any[]>([])
    const [comment, setComment] = useState<string>("")
    const [rating, setRating] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [open, setOpen] = useState<boolean>(false)

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
            setOpen(false)
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

                <Dialog
                    open={open}
                    onOpenChange={(isOpen) => {
                        if (isOpen === true) return
                        setOpen(false)
                    }}
                >
                    <DialogTrigger asChild>
                        <Button 
                            className="flex gap-2 items-center justify-center" 
                            onClick={() => {
                                setOpen(true)
                                setComment("")
                                setRating(0)
                            }}>
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
                    <div
                        className="flex flex-col gap-5 mt-5"
                    >
                        {reviews.map((review) => (
                            <div
                                key={review._id}
                                className="border border-zinc-700 rounded-lg px-5 py-3 flex flex-col gap-3"
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-5 items-center">
                                        <div className="p-1 bg-zinc-500 rounded-full">
                                            <User size={30} />
                                        </div>

                                        <div className="flex flex-col">
                                            <span>{review.user.name}</span>
                                            <span className="text-sm text-zinc-400">Avaliado em: {moment(review.createdAt).format("DD MMM YYYY HH:mm")}</span>
                                        </div>
                                    </div>

                                    <Rate disabled value={review.rating} />
                                </div>

                                <p className="text-zinc-600 text-lg">
                                    {review.comment !== "" ? review.comment : "Nenhum comentário."}
                                </p>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}
