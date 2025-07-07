"use server"

import { auth } from "@/auth"
import clientPromise from "@/lib/db"
import data from '@/data.json';

export async function getWishlistItems() {
  const session = await auth();
  if (!session?.user?.email) return [];
  const client = await clientPromise;
  const db = client.db();
  const users = db.collection("users");
  const user = await users.findOne({ email: session.user.email });
  const savedAsins = user?.savedForLater || [];
  const allProducts = Object.values(data).flat();
  return allProducts.filter((p: any) => savedAsins.includes(p.asin));
} 