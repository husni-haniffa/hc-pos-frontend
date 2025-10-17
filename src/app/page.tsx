import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";



export default function Home() {
  return (
    <div className="">
     <Link href="/pages/itemList" className="bg-amber-600"><Button className="">View cart<MoveRight/></Button></Link>
    </div>
  );
}
