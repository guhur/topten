import { useState } from "react";

/**
 * Add a button to draw cards
 * Each card can be displayed only once.
 * Add a button to reset the cards
 * Add a button to draw a card/hide a card
 */
export default function DrawCards({
  numCards,
  maxValue = 10,
  minValue = 1,
}: {
  numCards: number;
  maxValue?: number;
  minValue?: number;
}) {
  const [cards, setCards] = useState<number[]>([]);
  const [visible, setVisible] = useState(false);

  const handleDraw = () => {
    setCards((oldCards) => {
      if (oldCards.length === numCards) {
        throw new Error("You can't draw more cards");
      }
      // Find a card that hasn't been drawn yet
      let newCard = Math.floor(
        Math.random() * (maxValue - minValue) + minValue
      );
      while (oldCards.includes(newCard)) {
        newCard = Math.floor(Math.random() * (maxValue - minValue) + minValue);
      }
      return [...oldCards, newCard];
    });
    setVisible(true);
  };

  const handleReset = () => {
    setCards([]);
  };

  const handleHide = () => {
    setVisible(false);
  };

  return (
    <div>
      <div>
        {!visible ? (
          <button onClick={handleDraw}>Tirer une carte</button>
        ) : (
          <>
            <button onClick={handleHide}>Cacher la carte</button>
            <div>La carte est : {cards[cards.length - 1]}</div>
          </>
        )}
      </div>
      {cards.length > 0 && (
        <button onClick={handleReset}>Redémarrer la partie</button>
      )}
    </div>
  );
}
