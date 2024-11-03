import React from "react";
import "./Items.scss";

interface Item {
  id: string;
  text: string;
}

interface ItemListProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  setLastItemDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  fullItemList: Item[];
  hasMoreItems: boolean;
  setHasMoreItems: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ItemList = ({
  items,
  setItems,
  setLastItemDeleted,
  fullItemList,
  hasMoreItems,
  setHasMoreItems,
}: ItemListProps) => {
  const loadMoreItems = () => {
    if (items.length >= fullItemList.length) {
      setHasMoreItems(false);
      return;
    }
    setTimeout(() => {
      setItems((prevItems) => [
        ...prevItems,
        ...fullItemList.slice(prevItems.length, prevItems.length + 20),
      ]);
    }, 500);
  };

  const handleDelete = (index: number) => {
    if (index === items.length - 1) {
      setLastItemDeleted(true);
    }
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <div
      className="item__list"
      onScroll={(e) => {
        const target = e.currentTarget as HTMLElement;
        if (
          target.scrollTop + target.clientHeight >= target.scrollHeight &&
          hasMoreItems
        ) {
          loadMoreItems();
        }
      }}
    >
      {items.map((item) => (
        <div key={item.id} className="item">
          <span>{item.text}</span>
          <button
            className="item__delete-button"
            onClick={() => handleDelete(items.indexOf(item))}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
