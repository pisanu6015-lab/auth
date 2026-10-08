import Link from "next/link"; 
import { auth } from "@/auth"; 
import { getProducts } from "@/lib/products"; 
import { AuthButtons } from "@/components/auth-buttons"; 
 
export default async function HomePage() { 
  const session = await auth(); 
  const products = getProducts(); 
  const isLoggedIn = Boolean(session?.user); 
 
  return ( 
    <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-8 sm:px-8"> 
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="flex items-center justify-between bg-slate-900/80 border border-slate-800 p-4 rounded-2xl shadow-xl backdrop-blur"> 
          <h1 className="text-2xl font-bold text-cyan-400">สินค้า</h1> 
          <AuthButtons isLoggedIn={isLoggedIn} userName={session?.user?.name} /> 
        </header> 

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
          {products.map((product) => ( 
            <article 
              key={product.id} 
              data-testid="product"
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition shadow-lg"
            > 
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-white">{product.name}</h2> 
                <p className="text-slate-400 text-sm leading-relaxed">{product.description}</p> 
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-4">
                <p className="text-xl font-extrabold text-cyan-400">
                  ฿{product.price.toLocaleString("th-TH")}
                </p> 

                {isLoggedIn && ( 
                  <div className="flex gap-2"> 
                    <Link 
                      href={`/products/${product.id}/edit`}
                      className="flex-1 text-center bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium py-2 rounded-xl transition"
                    >
                      แก้ไข
                    </Link> 
                    <Link 
                      href={`/products/${product.id}/delete`}
                      className="flex-1 text-center bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-sm font-medium py-2 rounded-xl transition"
                    >
                      ลบ
                    </Link> 
                  </div> 
                )} 
              </div>
            </article> 
          ))} 

          {products.length === 0 && (
            <p className="col-span-full text-center text-slate-500 py-12">
              ไม่มีสินค้า
            </p>
          )} 
        </div> 

      </div>
    </main> 
  ); 
}