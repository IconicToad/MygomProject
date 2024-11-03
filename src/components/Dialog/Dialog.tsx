import { useState, useEffect } from "react";
import "./Dialog.scss";
import { ItemList } from "../Items/Items";
import { Cat } from "../Cat/Cat";

interface DialogProps {
  closeDialog: () => void;
}

interface Item {
  id: string;
  text: string;
}

export const Dialog = ({ closeDialog }: DialogProps) => {
  const fullItemList: Item[] = Array.from({ length: 500 }, (_, i) => ({
    id: `item-${i + 1}`,
    text: `Item ${i + 1}`,
  }));

  const [items, setItems] = useState<Item[]>(fullItemList.slice(0, 20));
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [lastItemDeleted, setLastItemDeleted] = useState(false);

  const startClosing = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      closeDialog();
    }, 150);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") startClosing();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className={`dialog__backdrop ${isClosing ? "closing" : ""}`}
      onClick={startClosing}
    >
      <div
        className={`dialog ${isClosing ? "closing" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="dialog__title">Dialog</h2>
        <p className="dialog__description">Here are some items:</p>

        <ItemList
          items={items}
          setItems={setItems}
          setLastItemDeleted={setLastItemDeleted}
          fullItemList={fullItemList}
          hasMoreItems={hasMoreItems}
          setHasMoreItems={setHasMoreItems}
        />

        {lastItemDeleted && <Cat />}

        <button className="dialog__close-button" onClick={startClosing}>
          Close
        </button>
      </div>
    </div>
  );
};
