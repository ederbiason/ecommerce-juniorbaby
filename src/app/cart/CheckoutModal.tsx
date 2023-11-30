import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface CheckoutModalProps {
    showCheckoutModal: boolean
    setShowCheckoutModal: any
    total: number
}

export function CheckoutModal({showCheckoutModal, setShowCheckoutModal, total}: CheckoutModalProps) {
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
                    <DialogTitle>Pagamento</DialogTitle>
                </DialogHeader>
                <div className="">
                    dasdasda
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
