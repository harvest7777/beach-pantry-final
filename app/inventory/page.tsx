"use client";
import { useState, useEffect, useRef } from "react";
import { Product } from "./_data/products";
import { products } from "./_data/products";
import { TFilter } from "./_data/filters";
import { prettyFilters } from "./_data/filters";
import ProductDisplay from "./_components/ProductDisplay";
import FilterButton from "./_components/Filter";
import Title from "../_components/Title";

export default function InventoryPage() {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<TFilter>({
    isVegan: false,
    isDairyFree: false,
    isHighProtein: false,
    isGlutenFree: false,
    isFreshProduce: false,
  });

  const handleSearch = () => {
    setSearchTerm(input);
  };

  const filteredProducts: Product[] = products.filter((product) => {
    try {
      const regex = new RegExp(searchTerm, "i");

      const matchesSearch = regex.test(product.name);

      const matchesFilters =
        (!filters.isVegan || product.isVegan) &&
        (!filters.isDairyFree || product.isDairyFree) &&
        (!filters.isHighProtein || product.isHighProtein) &&
        (!filters.isFreshProduce || product.isFreshProduce) &&
        (!filters.isGlutenFree || product.isGlutenFree);

      return matchesSearch && matchesFilters;
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if Ctrl + K is pressed
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Title>Inventory</Title>
      <section className="w-full px-5">
        <div className="w-full">
          <div className="flex gap-x-2 mt-5">
            <input
              type="text"
              ref={inputRef}
              placeholder="ex: watermelon   ⌘ K"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="w-full"
            />

            <button onClick={handleSearch}>Search</button>
            <FilterButton filters={filters} setFilters={setFilters} />
          </div>
          {/* filter display */}
          <ul className="italic text-gray-400 w-full flex gap-x-2 mb-5">
            <p>* Applied filters: </p>
            {Object.values(filters).filter(Boolean).length === 0 && (
              <li>None</li>
            )}
            {Object.entries(filters).map(
              ([key, enabled]) =>
                enabled && (
                  <li key={key}>{prettyFilters[key as keyof TFilter]}</li>
                )
            )}
          </ul>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2  gap-8">
          {filteredProducts.length === 0 && (
            <p className="col-span-full text-center">
              No results found. Try searching something else or removing some
              filters!
            </p>
          )}

          {filteredProducts.map((product) => (
            <div className="flex justify-center" key={product.id}>
              <ProductDisplay product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
