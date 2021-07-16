import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../services/api";
import { FoodData } from "../types";

type FoodsContextData = {
  foods: FoodData[];
  addFood: (food: FoodData) => void;
  updateFood: (food: FoodData) => void;
  deleteFood: (foodId: number) => void;
};

type FoodsProviderProps = {
  children: ReactNode;
};

const FoodsContext = createContext<FoodsContextData>({} as FoodsContextData);

export function FoodsProvider({ children }: FoodsProviderProps) {
  const [foods, setFoods] = useState<FoodData[]>([]);

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/foods");
      setFoods(response.data);
    }

    loadData();
  }, []);

  async function addFood(food: FoodData) {
    const response = await api.post("/foods", {
      ...food,
      available: true,
    });

    setFoods([...foods, response.data]);
  }

  async function updateFood(food: FoodData) {
    const foodUpdated = await api.put(`/foods/${food.id}`, food);

    setFoods(
      foods.map((food) =>
        food.id === foodUpdated.data.id ? foodUpdated.data : food
      )
    );
  }

  async function deleteFood(foodId: number) {
    await api.delete(`/foods/${foodId}`);

    setFoods(foods.filter((food) => food.id !== foodId));
  }

  return (
    <FoodsContext.Provider value={{ foods, addFood, updateFood, deleteFood }}>
      {children}
    </FoodsContext.Provider>
  );
}

export function useFoods() {
  const data = useContext(FoodsContext);

  return data;
}
