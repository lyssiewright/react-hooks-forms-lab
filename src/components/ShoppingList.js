import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { v4 as uuid } from "uuid";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("")
  const [array, setArray] = useState(items);
  const [itemName, setItemName] = useState("")
  const [itemCategory, setItemCategory] = useState("Produce")
 
  function handleItemName(event){
    setItemName(event.target.value)
  }

  function handleCategory(event){
    setItemCategory(event.target.value)
  }
  function onItemFormSubmit(event){
    event.preventDefault();
    const newItem = {
      id: uuid(),
      name: itemName,
      category: itemCategory
  }
    setArray([...array, newItem])

  }

  function handleSearch(event){
    setSearchText(event.target.value)
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const itemsToDisplay = array.filter((item) => {
    if (selectedCategory === "All") return (true && item.name.toLowerCase().includes(searchText.toLowerCase()));

    return (item.category === selectedCategory &&
    item.name.toLowerCase().includes(searchText.toLowerCase()))
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit} handleCategory={handleCategory} handleItemName={handleItemName} itemName={itemName} itemCategory={itemCategory}/>
      <Filter onCategoryChange={handleCategoryChange} onSearchChange={handleSearch}/>
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
