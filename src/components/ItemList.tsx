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
import { items } from '@/app/api/items'
import { Label } from '@radix-ui/react-label'
import { Button } from './ui/button'
import { Minus, Plus, ArrowRight, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useCartStore } from "@/app/store/cartStore"
import Link from "next/link"


const ItemList = () => {

  
  
    
  const addToCart = useCartStore((state) => state.addToCart)
  const cart = useCartStore((state) => state.cart)
  const itemCount = cart.length
   const increaseQuantity = useCartStore((state) => state.increaseQuantity)
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
    const totalItems = useCartStore((state) => state.getTotalItems())
     const cartSubTotal = useCartStore((state) => state.getCartSubTotal())
  return (
    <div>
        <Card>
        <CardHeader>
            <div>
                <Link href="/">
                    <Button className="bg-white text-black ">
                        Go Back<ArrowLeft />
                    </Button>
                </Link>
               
            </div>
        </CardHeader>
        <CardContent className='space-y-4'>
           

            {items.map((item) => {
        const cartItem = cart.find((c) => c.id === item.id)
        const quantity = cartItem?.quantity || 0

        return (
          <div key={item.id} className="flex justify-between items-center border p-2 rounded-md">
            <div className="flex flex-col justify-center">
              <Label>{item.itemName}</Label>
              <Label>{item.itemPrice}</Label>
            </div>

            {quantity > 0 ? (
              <div className="flex items-center gap-2 border border-amber-600 p-1 rounded-xl">
                <Button onClick={() => decreaseQuantity(item.id)} className="bg-gray-100 text-black"><Minus /></Button>
                <Label>{quantity}</Label>
                <Button onClick={() => increaseQuantity(item.id)} className="bg-amber-100 border-none text-amber-600"><Plus /></Button>
              </div>
            ) : (
              <Button onClick={() => addToCart(item)} className="bg-amber-100 border border-amber-600 text-black">Add <Plus /></Button>
            )}
          </div>
        )
      })}   
      {totalItems > 0 && cartSubTotal > 0 ? (
         <div className="flex justify-between items-center bg-amber-100 rounded-xl p-2">
                <div className="flex flex-col">
                    <Label className="text-sm">{totalItems}</Label>
                    <Label className="font-semibold">{cartSubTotal}</Label>
                </div>
                <Link href="/pages/cart"><Button className="bg-amber-700">View Cart<ArrowRight/></Button></Link>
                
            </div> 
      ): ""}
           
        </CardContent>
        <CardFooter > 
        </CardFooter>
        </Card>
    </div>
  )
}

export default ItemList