import { ICartWithProductPrice } from "@/lib";
import { cn } from "@/lib/utils";
import { UserType } from "@/types";
import { User } from "../User/User";

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
  return (
    <div className={cn("bg-primary-main p-5 rounded-[20px]", className)}>
      <h2 className="capitalize text-[22px] leading-8 text-white">
        Card details
      </h2>
      <User />
    </div>
  );
};
