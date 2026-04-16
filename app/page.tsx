import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import Link from "next/link";




export default async function Home() {

  const snippets = await prisma.snippet.findMany();


  return (
    <div>


      <nav className="flex items-center justify-between bg-gray-100 h-14 mb-8 rounded">
        <h1 className="font-semibold text-2xl">Home</h1>
        <Link href={"/signup"}>
          <Button
            className="bg-gray-100 text-black font-semibold text-xl"
          >SignUp</Button>
        </Link>

        <Link href={"/login"}>
          <Button>Login</Button>
        </Link>
      </nav>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-orange-500">Snippets</h1>
          <Link href={"/snippet/new"}>
            <Button className="bg-green-400 text-black w-20 ">
              Creat New
            </Button>
          </Link>
        </div>

        {
          snippets.map((snippet) => (
            <div key={snippet.id}>

              <div className="flex items-center bg-green-200 justify-between p-4 transition duration-700 hover:-translate-y-1">
                <h1>{snippet.title}</h1>
                <Link href={`/snippet/${snippet.id}`}>
                  <Button className="bg-gray-400 text-gray-100 w-18">View</Button>
                </Link>

              </div>
            </div>
          ))
        }
      </div>


    </div>

  );
}
