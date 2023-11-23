"use client"

import { redirect } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect } from "react"
import { fetchUser } from "@/redux/userSlice"

export default function Profile() {
  const currentUser = useSelector((state: any) => state.user)
  console.log(currentUser.currentUser.isAdmin)
  console.log(currentUser)

  return (
    <div className="pt-5">
      {currentUser.currentUser.isAdmin && redirect("/products")}
      {!currentUser.isAdmin && (
        <Tabs defaultValue="account" className="">
          <TabsList className="w-full flex justify-start gap-5 px-5">
            <TabsTrigger value="account">Orders</TabsTrigger>
            <TabsTrigger value="password">Personal information</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Make changes to your account here.</TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      )}
    </div>
  )
}
