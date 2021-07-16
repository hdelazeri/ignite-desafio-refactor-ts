import { Header } from "../../components/Header";
import { Food } from "../../components/Food";
import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";
import { FoodsContainer } from "./styles";
import { useState } from "react";
import { useFoods } from "../../hooks/useFoods";
import { FoodData } from "../../types";

export function Dashboard() {
  const [isAddFoodModalOpen, setIsAddFoodModalOpen] = useState(false);
  const [isEditFoodModalOpen, setIsEditFoodModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodData>();

  const { foods } = useFoods();

  function handleEditFood(food: FoodData) {
    setEditingFood(food);
    setIsEditFoodModalOpen(true);
  }

  return (
    <>
      <Header setAddModalIsOpen={setIsAddFoodModalOpen} />

      <ModalAddFood
        isOpen={isAddFoodModalOpen}
        setIsOpen={setIsAddFoodModalOpen}
      />

      <ModalEditFood
        isOpen={isEditFoodModalOpen}
        setIsOpen={setIsEditFoodModalOpen}
        editingFood={editingFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food key={food.id} food={food} handleEditFood={handleEditFood} />
          ))}
      </FoodsContainer>
    </>
  );
}
