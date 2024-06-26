"use client";
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/client";
import AddToCartIcon from "../../icons/AddToCartIcon";
import { ProductCardProps } from "../ProductCard.type";
import { selectProductCart, update } from "@/lib/client/slicer/product";
import MinusIcon from "../../icons/MinusIcon";
import PlusIcon from "../../icons/PlusIcon";

export default function ProductCardCart({ product }: ProductCardProps) {
  const { name } = product;
  const quantity = parseInt(product.quantity || "");
  const dispatch = useAppDispatch();
  const productCart = useAppSelector(selectProductCart(name));

  if (!quantity) {
    return <></>;
  }

  if (!productCart) {
    return (
      <button onClick={() => dispatch(update({ name, diff: 1 }))}>
        <AddToCartIcon />
      </button>
    );
  }

  const isPlusDisabled = productCart >= quantity;

  return (
    <div className="grid grid-cols-3 gap-2">
      <button onClick={() => dispatch(update({ name, diff: -1 }))}>
        <MinusIcon />
      </button>
      <p className="text-center">{productCart}</p>

      <button
        className={`${isPlusDisabled ? "text-gray-400" : ""}`}
        onClick={() => !isPlusDisabled && dispatch(update({ name, diff: 1 }))}
        disabled={isPlusDisabled}
      >
        <PlusIcon />
      </button>
    </div>
  );
}
