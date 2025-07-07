import { ObjectId } from "mongodb"

export const OrderItemSchema = {
  id: Number,
  name: String,
  price: Number,
  quantity: Number,
  image: String,
}

export const ShippingAddressSchema = {
  name: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
}

export const OrderSchema = {
  _id: { type: ObjectId, auto: true },
  orderNumber: String,
  date: String,
  status: { type: String, enum: ["processing", "shipped", "delivered", "cancelled"] },
  total: Number,
  itemCount: Number,
  trackingNumber: String,
  estimatedDelivery: String,
  paymentMethod: String,
  shippingAddress: ShippingAddressSchema,
  items: [OrderItemSchema],
}

export const UserSchema = {
  _id: { type: ObjectId, auto: true },
  name: String,
  email: { type: String, unique: true },
  password: String,
  emailVerified: { type: Date, default: null },
  image: { type: String, default: null },
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: { type: Date, default: () => new Date() },
  orders: { type: [OrderSchema], default: [] },
  wishlist: { type: Array, default: [] },
} 