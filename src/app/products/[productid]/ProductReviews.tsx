"use client"
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ProductInterface } from "@/interfaces";
import axios from "axios";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

export function ProductReviews({product}: {product: ProductInterface}) {
    const [reviews, setReviews] = useState([]) 

    const getReviews = async () => {
        try {
            const endPoint = `/api/reviews?product=${product._id}`
            const response = await axios.get(endPoint)

            setReviews(response.data)
        } catch (error: any) {
            toast({
                title: 'Erro na busca do produto',
                description: error.message,
                variant: 'destructive'
            })
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

                <Button className="flex gap-2 items-center justify-center">
                    <Star />
                    Faça sua avaliação!
                </Button>
            </div>

            {
                reviews.length === 0 && (
                    <div className="text-gray-500 mt-5">
                        <span>
                            Nenhuma avalição ainda. Seja o primeiro a avaliar este produto.
                        </span>
                    </div>
                )
            }
        </div>
    )
}
