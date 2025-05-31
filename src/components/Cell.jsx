import "../styles/Cell.css";

const Cell = ({ isAlive, onClick }) => {
  return (
    <div
      className={`cell ${isAlive ? 'alive' : 'dead'}`}
      onClick={onClick}
    />
  );
};

export default Cell;