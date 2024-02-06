import { useUser } from "@/hooks/useUser";
import Image from "next/image";

export const User = () => {
  const user = useUser();

  return (
    <div
      className="relative w-[50px] h-[50px] rounded-lg overflow-hidden"
      title={user.name}
    >
      <Image fill src={user.avatar} alt={user.name} />
    </div>
  );
};
