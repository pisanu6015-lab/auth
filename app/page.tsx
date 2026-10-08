import Link from "next/link"; 
import { auth } from "@/auth"; 
import { getProducts } from "@/lib/products"; 
import { AuthButtons } from "@/components/auth-buttons"; 

export default async function HomePage() { 
  const session = await auth(); 
  const products = getProducts(); 
  const isLoggedIn = Boolean(session?.user); 

  return ( 
    <>
      <header> 
        <h1>สินค้า</h1> 
        <AuthButtons isLoggedIn={isLoggedIn} userName={session?.user?.name} /> 
      </header> 

      <main> 
        <div className="product-grid"> 
          {products.map((product) => ( 
            <article key={product.id} className="product-card" data-testid="product"> 
              <h2>{product.name}</h2> 
              <p>{product.description}</p> 
              <div className="price">฿{product.price}</div> 
              
              {isLoggedIn && ( 
                <div className="actions"> 
                  <Link href={`/products/${product.id}/edit`} className="button-edit">
                    แก้ไข
                  </Link> 
                  <Link href={`/products/${product.id}/delete`} className="button-delete">
                    ลบ
                  </Link> 
                </div> 
              )} 
            </article> 
          ))} 

          {products.length === 0 && (
            <div className="empty-state">
              <p>ไม่มีสินค้า</p>
            </div>
          )} 
        </div> 
      </main> 
    </>
  ); 
}