"use client"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { ArrowLeft, Dice1, Minus, Plus } from "lucide-react"
import { useCartStore } from "@/app/store/cartStore"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"


const Cart = () => {
    
    const [advanceAmount, setAdvanceAmount] = useState(0)
    const router = useRouter()
    const cart = useCartStore((state) => state.cart)
    const clearCart = useCartStore((state) => state.clearCart)
    const increaseQuantity = useCartStore((state) => state.increaseQuantity)
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
    const cartSubTotal = useCartStore((state) => state.getCartSubTotal())
    useEffect(() => {
      if(cartSubTotal === 0 && advanceAmount != 0) {
        setAdvanceAmount(0)
      }
    }, [cartSubTotal, advanceAmount])
    const balance = cartSubTotal - advanceAmount
    useEffect(() => {
      if(cart.length === 0) {
        router.push("/pages/itemList")
      }
    }, [cart.length])

    const handlePlaceOrder = () => {
      console.log(cart)
    }
    return (
    <div>
        <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
              <Link href="/pages/itemList">
                <Button className="bg-white text-black ">
                  <ArrowLeft />Go Back
                </Button>
              </Link>
  
              <Button onClick={() => clearCart()} className="text-red-500 bg-white ">Clear Cart</Button>
            </div>
        </CardHeader>
        <CardContent className='space-y-4'>

          <div className="border border-amber-500 p-2 space-y-4">
            <Input placeholder="Husni"/>
            <Input placeholder="0774677023"/>
          </div>

          {cart.map((item) => (
            <div className="border border-red-500 p-2" key={item.id}>
              <Label>{item.itemName}</Label>
              <div className="flex justify-between items-center">
                <Label>{item.itemPrice}</Label>
                <div className="flex items-center gap-3">
                  <Button className="bg-gray-100 text-black" onClick={() => decreaseQuantity(item.id)}><Minus /></Button>
                  <Label>{item.quantity}</Label>
                  
                  <Button className="bg-gray-100 text-black" onClick={() => increaseQuantity(item.id)}><Plus /></Button>
                </div>
              </div>
            </div>
          ))}

          <div className="border border-green-500 p-2 space-y-2">
            <div className="flex justify-between items-center">
                <Label>Total</Label>
                <Label>{cartSubTotal}</Label>
            </div>
            <div className="flex justify-between items-center">
                <Label>Advance</Label>
                <Input
                  type="number"
                  min={0}
                  className="w-25 text-end"
                  value={advanceAmount}
                  onChange={(e) => setAdvanceAmount(Number(e.target.value || 0))}
                />
            </div>
            <div className="flex justify-between items-center">
                <Label>Balance</Label>
                <Label>{balance}</Label>
            </div>
          </div> 
          
        </CardContent>
        <CardFooter > 
          <Button className="bg-green-500 hover:bg-green-600 w-full" onClick={handlePlaceOrder}>Place Order</Button>
        </CardFooter>
        </Card>
    </div>
  )
}

export default Cart