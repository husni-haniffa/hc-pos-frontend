
import {create} from 'zustand'

interface Item {
    id: number
    itemName: string
    itemPrice: number
}
interface CartItem extends Item{
    quantity: number
}

interface CartState {
    cart: CartItem[]
    addToCart: (item: Item) => void
    clearCart: () => void
    increaseQuantity: (itemId: number) => void
    decreaseQuantity: (itemId: number) => void
    getTotalItems: () => number
    getCartSubTotal: () => number
    getBalanceAmount: (cartSubTotal: number, advanceAmount: number) => number


    
}

export const useCartStore = create<CartState>((set, get) => ({
    cart: [],
    addToCart: (item) => {
        set((state) => {
            const isItemExist = state.cart.find((i) => i.id === item.id)
            if (isItemExist) {
                return {
                    cart: state.cart.map((i) => i.id === item.id ? {
                        ...i, quantity: i.quantity + 1
                    } : i)
                }
            } else {
                return { cart: [...state.cart, { ...item, quantity: 1}]}
            }
        })
    },
    clearCart: () => set({cart: []}),
    increaseQuantity: (itemId) => set((state) => ({
        cart: state.cart.map((item) => item.id === itemId ? {
            ...item, quantity: item.quantity + 1
        } : item)
    })),
    decreaseQuantity: (itemId) => set((state) => ({
        cart: state.cart.map((item ) => item.id === itemId ? {
            ...item, quantity: item.quantity - 1
        } : item).filter((item) => item.quantity > 0)
    })),
    getTotalItems: () => {
        const state = get()
        return state.cart.reduce((total, item) => total + item.quantity, 0)
    },
    getCartSubTotal: () => {
        const state = get()
        return state.cart.reduce((total, item) => total + (item.itemPrice * item.quantity), 0)
    },
    getBalanceAmount: (cartSubTotal, advanceAmount) => {
        return cartSubTotal - advanceAmount
    },
   

}))
