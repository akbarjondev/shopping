import { ICartWithProductPrice } from "@/lib";
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

  const onSubmit = (data: ValidationSchema) => {
    console.log(data);
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
      </form>
    </div>
  );
};
