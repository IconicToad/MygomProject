import "./Card.scss";

interface CardProps {
  openDialog: () => void;
}

export const Card = ({ openDialog }: CardProps) => {
  return (
    <div className="card">
      <h1 className="card__title">Dialog Component</h1>
      <p className="card__description">Dialog component</p>
      <button className="card__button" onClick={openDialog}>
        Open Dialog
      </button>
    </div>
  );
};
