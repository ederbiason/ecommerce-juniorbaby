"use client"
import { LoaderIcon } from "lucide-react";

export function Loader() {
  return (
    <div className="bg-gray-300 bg-opacity-75 h-screen w-full fixed inset-0 flex justify-center items-center">
        <LoaderIcon
            className="w-16 h-16 animate-spin"
        />
    </div>
  )
}
