"use server"

import { auth } from "@/auth"
import clientPromise from "@/lib/db"

interface OrderItem {
  asin: string
  name: string
  price: number
  quantity: number
  image: string
}

interface OrderData {
  orderNumber: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  shippingInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  paymentMethod: string
  status: "processing" | "shipped" | "delivered" | "cancelled"
  orderDate: string
  estimatedDelivery: string
}

export async function saveOrder(orderData: OrderData) {
  const session = await auth()
  if (!session?.user?.email) {
    return { error: "Not authenticated" }
  }

  const client = await clientPromise
  const db = client.db()
  const users = db.collection("users")

  try {
    await users.updateOne(
      { email: session.user.email },
      { 
        $push: { 
          orders: {
            ...orderData,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        } 
      }
    )
    return { success: true, orderNumber: orderData.orderNumber }
  } catch (error) {
    return { error: "Failed to save order" }
  }
}

export async function getUserOrders() {
  const session = await auth()
  if (!session?.user?.email) {
    return []
  }

  const client = await clientPromise
  const db = client.db()
  const users = db.collection("users")
  
  try {
    const user = await users.findOne({ email: session.user.email })
    return user?.orders || []
  } catch (error) {
    return []
  }
}

export async function getOrderByNumber(orderNumber: string) {
  const session = await auth()
  if (!session?.user?.email) {
    return null
  }

  const client = await clientPromise
  const db = client.db()
  const users = db.collection("users")
  
  try {
    const user = await users.findOne({ 
      email: session.user.email,
      "orders.orderNumber": orderNumber 
    })
    
    if (user?.orders) {
      return user.orders.find((order: any) => order.orderNumber === orderNumber)
    }
    return null
  } catch (error) {
    return null
  }
} 