import { Poppins } from "next/font/google";
import Image from "next/image";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets:["latin"],
  weight:['200','300','400','500','600','700','800']
})

export const Logo = ()=>{
  return <div className="lg:flex  items-center gap-x-4 hover:opacity-75 transition">
    <div className=" bg-white rounded-full p-1 mr-2 shrink-0 lg:mr-0 lg:shrink">
      <Image
      src='/alien-svgrepo-com.svg'
      alt="Edunax GameHub"
      height={32}
      width={32}
      ></Image>
    </div>
    <div className={cn(
      "hidden lg:block",
      font.className)}>
      <p className=" text-lg font-semibold">Edunax Gamehub</p>
      <p className=" text-xs text-muted-foreground">Creator dashboard</p>
    </div>
  </div>
}