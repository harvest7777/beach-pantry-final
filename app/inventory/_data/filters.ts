export interface TFilter {
  isVegan: boolean;
  isDairyFree: boolean;
  isHighProtein: boolean;
  isGlutenFree: boolean;
  isFreshProduce: boolean;
}

export const prettyFilters: { [key in keyof TFilter]: string } = {
  isVegan: "Vegan",
  isDairyFree: "Dairy Free",
  isHighProtein: "High Protein",
  isGlutenFree: "Gluten Free",
  isFreshProduce: "Fresh Produce",
};
