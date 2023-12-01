"use client"

import { redirect } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect } from "react"
import { fetchUser } from "@/redux/userSlice"
import { UsersOrdersTable } from "./components/UsersOrdersTable"
import PersonalInfo from "./components/PersonalInfo"

export default function Profile() {
  const currentUser = useSelector((state: any) => state.user)

  return (
    <div className="p-5">
      {currentUser.currentUser?.isAdmin && redirect("/products")}
      {!currentUser.isAdmin && (
        <Tabs defaultValue="orders" className="">
          <TabsList className="w-full flex justify-start gap-5 px-5">
            <TabsTrigger value="orders">Pedidos</TabsTrigger>
            <TabsTrigger value="personal">Informações pessoais</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <UsersOrdersTable />
          </TabsContent>

          <TabsContent value="personal">
            <PersonalInfo />
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
