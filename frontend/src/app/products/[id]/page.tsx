"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/utils/formatCurrency";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}`
        );
        if (!res.ok) throw new Error("Error al obtener producto");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el producto");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity: 1,
    });
  };

  return (
    <section>
      <div className="flex flex-col md:flex-row gap-6">
        {product.image_url && (
          <Image
            src={product.image_url}
            alt={product.name}
            width={400}
            height={300}
            className="rounded-md object-contain bg-white p-2"
          />
        )}

        <div>
          <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
          <p className="text-slate-600 mb-4">
            {product.description || "Sin descripción disponible."}
          </p>
          <p className="text-xl font-medium">
            {formatCurrency(Number(product.price))}
          </p>

          <button
            onClick={handleAddToCart}
            className="cursor-pointer rounded-lg bg-sky-600 my-4 px-4 py-2 text-white font-medium hover:bg-sky-700 transition"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </section>
  );
}
