// food-item.model.ts
export interface FoodItem {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
  }
  
  export interface SetMeal {
    imageUrl: string;
    id: number;
    name: string;
    items: FoodItem[]; // Danh sách các món ăn trong set
  }
  