import { useGameOfLifeContext } from "../context/GameOfLifeContext";
import Cell from "./Cell";
import "../styles/Grid.css";
import "../styles/Cell.css";

const Grid = () => {
  const { grid, toggleCell, gridRows, gridCols } = useGameOfLifeContext();

  // Create an array of all cells for rendering
  const cells = [];
  for (let rowIndex = 0; rowIndex < gridRows; rowIndex++) {
    for (let colIndex = 0; colIndex < gridCols; colIndex++) {
      const coord = `${rowIndex}-${colIndex}`;
      const isAlive = grid.has(coord); // Check if the cell is in the Set of alive cells

      cells.push(
        <Cell
          key={coord} // Use the coordinate string as key
          isAlive={isAlive}
          onClick={() => toggleCell(rowIndex, colIndex)}
        />
      );
    }
  }

  return (
    <div className="grid-container">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
          gridTemplateRows: `repeat(${gridRows}, 1fr)`
        }}
      >
        {cells}
      </div>
    </div>
  );
};

export default Grid;