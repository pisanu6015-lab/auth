import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getProduct } from "@/lib/products";
import { updateProductAction } from "@/app/actions";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  const { id } = await params;
  const product = getProduct(id);
  if (!product) {
    notFound();
  }

  const updateAction = updateProductAction.bind(null, product.id);

  return (
    <main
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "24px",
        backgroundColor: "rgba(30, 41, 59, 0.6)",
        borderRadius: "12px",
        border: "1px solid rgba(51, 65, 85, 0.6)",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
        color: "#f1f5f9",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "700",
          color: "#22d3ee",
          marginBottom: "24px",
          textAlign: "center",
        }}
      >
        แก้ไขสินค้า
      </h1>

      <form action={updateAction} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* ชื่อสินค้า */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label
            htmlFor="name"
            style={{ fontSize: "14px", fontWeight: "500", color: "#cbd5e1" }}
          >
            ชื่อสินค้า
          </label>
          <input
            id="name"
            name="name"
            defaultValue={product.name}
            required
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              backgroundColor: "#0f172a",
              border: "1px solid #334155",
              color: "#ffffff",
              fontSize: "14px",
              outline: "none",
            }}
          />
        </div>

        {/* ราคา */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label
            htmlFor="price"
            style={{ fontSize: "14px", fontWeight: "500", color: "#cbd5e1" }}
          >
            ราคา (บาท)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            defaultValue={product.price}
            required
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              backgroundColor: "#0f172a",
              border: "1px solid #334155",
              color: "#ffffff",
              fontSize: "14px",
              outline: "none",
            }}
          />
        </div>

        {/* รายละเอียด */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label
            htmlFor="description"
            style={{ fontSize: "14px", fontWeight: "500", color: "#cbd5e1" }}
          >
            รายละเอียด
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={product.description}
            rows={4}
            required
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              backgroundColor: "#0f172a",
              border: "1px solid #334155",
              color: "#ffffff",
              fontSize: "14px",
              outline: "none",
              resize: "vertical",
            }}
          />
        </div>

        {/* ปุ่มกด */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "12px",
            paddingTop: "16px",
            borderTop: "1px solid rgba(51, 65, 85, 0.5)",
          }}
        >
          <button
            type="submit"
            style={{
              flex: 1,
              padding: "10px",
              backgroundColor: "#06b6d4",
              color: "#0f172a",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            บันทึก
          </button>
          
          <Link
            href="/"
            style={{
              flex: 1,
              padding: "10px",
              backgroundColor: "#334155",
              color: "#cbd5e1",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            ยกเลิก
          </Link>
        </div>
      </form>
    </main>
  );
}