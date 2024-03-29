import { UserType } from "@/types";

export const DB_NAME = "shop";

// temporary data
export const USER: UserType = {
  id: 123,
  name: "John Doe",
  avatar: "https://i.pravatar.cc/150?img=60",
};

export const PRODUCTS = [
  {
    name: "Italian pizza",
    price: 11,
    description: "Pizza with tomato, mozzarella, and basil",
    image: "italian-pizza.png",
  },
  {
    name: "Combo plate",
    price: 20,
    description: "Potatoes with tomato, mozzarella, and basil + soda",
    image: "combo-plate.png",
  },
  {
    name: "Spanish risotto",
    price: 30,
    description: "Rice with tomato, mozzarella, and mushrooms",
    image: "spanish-risotto.png",
  },
];

export const CARD_TYPES = [
  {
    name: "Visa",
    image: "visa.png",
  },
  {
    name: "Mastercard",
    image: "master-card.png",
  },
  {
    name: "Rupay",
    image: "ru-pay.png",
  },
];
