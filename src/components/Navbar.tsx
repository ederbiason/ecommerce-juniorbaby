

export function Navbar() {
  return (
    <div className="bg-zinc-100 p-3 border-b border-s-zinc-200 w-full z-10">
        <div className=" flex items-center justify-between">
            <div className="">
                <h1 className="text-2xl font-bold">
                    Sports Store
                </h1>
            </div>

            <div className="">
                <ShoppingCart />
            </div>
        </div>
    </div>
  )
}
