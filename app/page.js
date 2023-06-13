import Header from "./components/Header";
import Link from "next/link";
export default function Home() {
  return (
    <main >
      
      <Header />
      <div className="flex flex-col items-center justify-center   py-8 px-6 space-y-5 mb-24">
        <h1 className="text-2xl font-bold">Home Page </h1>
        <Link href="/cart" className="p-2 bg-white shadow-lg rounded-md font-semibold text-gray-500">
          Go to Cart
        </Link>
      </div>
    </main>
  );
}
