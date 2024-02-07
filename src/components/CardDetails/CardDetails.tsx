import {
  ICartWithProductPrice,
  closeCart,
  createCheckout,
  createOrder,
} from "@/lib";
import { cn } from "@/lib/utils";
import { UserType } from "@/types";
import { User } from "../User/User";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Nunito } from "next/font/google";
import { CARD_TYPES } from "@/config/constants";
import Image from "next/image";
import { Button } from "../ui/button";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db";
import { ArrowRight } from "lucide-react";
import { toast } from "../ui/use-toast";

const nunito = Nunito({ weight: ["400", "500"], subsets: ["latin"] });

const Schema = z.object({
  cardHolder: z.string().min(1, "Card holder name is required"),
  cardNumber: z.string().length(16, "Card number must be 16 digits"),
  expiryDate: z.string().length(5, "Expiry date must be in the format MM/YY"),
  cvv: z.string().length(3, "CVV must be 3 digits"),
});

type ValidationSchema = z.infer<typeof Schema>;

interface CardDetailsProps {
  selectedProducts: ICartWithProductPrice[];
  user: UserType;
  className?: string;
}

export const CardDetails = ({
  selectedProducts,
  user,
  className,
}: CardDetailsProps) => {
  const [shopConfig] =
    useLiveQuery(() => db.shopping_config.toArray(), []) || [];

  const tax = shopConfig?.tax || 0;
  const shipping = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(shopConfig?.shipping || 0);
  const accSubtotal = selectedProducts.reduce(
    (acc, { product, quantity }) =>
      product ? acc + product.price * quantity : acc,
    0
  );
  const calcTotal = (accSubtotal + (shopConfig?.shipping || 0)) * (1 + tax);
  const total = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(calcTotal);

  const subtotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(accSubtotal);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    mode: "onBlur",
    resolver: zodResolver(Schema),
    defaultValues: {
      cardHolder: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const onSubmit = async (data: ValidationSchema) => {
    const cartsWillBeClosed = selectedProducts.map((cart) => {
      return cart?.id && closeCart(cart.id);
    });

    try {
      const [checkoutRes, ...cartsRes] = await Promise.all([
        createCheckout({
          user_id: user.id,
          total: calcTotal,
        }),
        ...cartsWillBeClosed,
      ]);

      const createOrderPromises = cartsRes.map((cart) => {
        if (cart && cart.cart_id && checkoutRes && checkoutRes.checkout_id) {
          return createOrder({
            checkout_id: checkoutRes.checkout_id,
            cart_id: cart.cart_id,
          });
        }
      });
      await Promise.all(createOrderPromises);

      toast({
        title: "Success",
        description: "Your order has been placed",
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error placing your order",
        duration: 5000,
      });
    }
  };

  return (
    <div className={cn("bg-primary-main p-5 rounded-[20px]", className)}>
      <div className="flex justify-between items-center">
        <h2 className="capitalize text-[22px] leading-8 text-white">
          Card details
        </h2>
        <User />
      </div>
      <p className={cn("label", nunito.className)}>Card type</p>
      <div className="flex flex-wrap gap-4 mb-7">
        {CARD_TYPES.map((card) => (
          <div
            key={card.name}
            className="relative w-[75px] h-[55px] rounded-[5px] "
          >
            <Image src={`/images/${card.image}`} alt={card.name} fill />
          </div>
        ))}
        <Button className="w-[75px] h-[55px] rounded-[5px] bg-gray-300 bg-opacity-20">
          See all
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
          <label htmlFor="cardHolder" className={cn("label", nunito.className)}>
            Name on card
          </label>
          <input
            type="text"
            id="cardHolder"
            className={cn("input", errors.cardHolder && "error-message")}
            {...register("cardHolder")}
            placeholder="Name"
          />
          {errors.cardHolder && (
            <span className={cn("error-message-bottom", nunito.className)}>
              {errors.cardHolder.message}
            </span>
          )}
        </div>
        <div className="input-wrapper">
          <label htmlFor="cardNumber" className={cn("label", nunito.className)}>
            Card number
          </label>
          <input
            type="text"
            id="cardNumber"
            className={cn("input", errors.cardNumber && "error-message")}
            {...register("cardNumber")}
            placeholder="0000 0000 0000 0000"
          />
          {errors.cardNumber && (
            <span className="error-message-bottom">
              {errors.cardNumber.message}
            </span>
          )}
        </div>
        <div className="flex gap-2 justify-between">
          <div className="input-wrapper">
            <label
              htmlFor="expiryDate"
              className={cn("label", nunito.className)}
            >
              Expiration date
            </label>
            <input
              type="text"
              id="expiryDate"
              className={cn("input", errors.expiryDate && "error-message")}
              {...register("expiryDate")}
              placeholder="mm/yy"
            />
            {errors.expiryDate && (
              <span className="error-message-bottom">
                {errors.expiryDate.message}
              </span>
            )}
          </div>
          <div className="input-wrapper">
            <label htmlFor="cvv" className={cn("label", nunito.className)}>
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              className={cn("input", errors.cvv && "error-message")}
              {...register("cvv")}
              placeholder="000"
            />
            {errors.cvv && (
              <span className="error-message-bottom">{errors.cvv.message}</span>
            )}
          </div>
        </div>
        <div className="h-px bg-[#5f65c3] w-full mt-3 mb-4" />
        <div className="flex flex-col gap-[6px] mb-7">
          <p className="text-white font-medium text-sm flex justify-between">
            <span>Subtotal</span>
            <span>{subtotal}</span>
          </p>
          <p className="text-white font-medium text-sm flex justify-between">
            <span>Shipping</span>
            <span>{shipping}</span>
          </p>
          <p className="text-white font-medium text-sm flex justify-between">
            <span>Total (Tax incl.)</span>
            <span>{total}</span>
          </p>
        </div>
        <Button
          type="submit"
          className="flex justify-between items-center bg-primary-green w-full text-base rounded-xl px-6 py-[18px] font-medium h-auto"
        >
          {total}{" "}
          <span className="flex items-center gap-2">
            Checkout <ArrowRight />
          </span>
        </Button>
      </form>
    </div>
  );
};
