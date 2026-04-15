import { Button } from "@/components/ui/button";
import Link from "next/link";




export default function Home() {
  return (
    <div>


      <nav className="flex items-center justify-between bg-gray-100 h-14 mb-8 rounded">
        <h1 className="font-semibold text-2xl">Home</h1>
        <Button
          className="bg-gray-100 text-black font-semibold text-xl"
        >SignUp</Button>
      </nav>

      <div className="flex items-center justify-between">
        <h1>Snippets</h1>
       <Link href={"/snippet/new"}> <Button> New </Button></Link>
      </div>
    </div>

  );
}
