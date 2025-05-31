import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";

const ROWS = 25;
const COLS = 40;

// Using a Set to store only the "alive" cells
// This significantly reduces the data size and iteration time for sparse grids
const createEmptyGrid = () => new Set();

// Generate random alive cells and store them in a Set
const createRandomGrid = () => {
  const aliveCells = new Set();
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (Math.random() > 0.7) {
        aliveCells.add(`${r}-${c}`);
      }
    }
  }
  return aliveCells;
};

// Singleton pattern to share state across components
// This state will now be managed directly within the context provider
let sharedState = {
  grid: createEmptyGrid(),
  isRunning: false,
  intervalId: null,
  generation: 0,
  speed: 200,
};

let listeners = [];

const notifyListeners = () => {
  listeners.forEach((listener) => listener());
};

const GameOfLifeContext = createContext(null);

export const GameOfLifeProvider = ({ children }) => {
  const [, forceUpdate] = useState({});
  const gridRef = useRef(sharedState.grid);

  const rerender = useCallback(() => {
    forceUpdate({});
  }, []);


  useEffect(() => {
    listeners.push(rerender);
    return () => {
      listeners = listeners.filter((listener) => listener !== rerender);
    };
  }, [rerender]);

  useEffect(() => {
    gridRef.current = sharedState.grid;
  });

  const getNeighborCoordinates = useCallback((x, y) => {
    const neighbors = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newX = x + i;
        const newY = y + j;
        if (newX >= 0 && newX < ROWS && newY >= 0 && newY < COLS) {
          neighbors.push(`${newX}-${newY}`);
        }
      }
    }
    return neighbors;
  }, []);

  const step = useCallback(() => {
    const currentAliveCells = gridRef.current;
    const nextAliveCells = new Set();
    const cellsToConsider = new Set();

    currentAliveCells.forEach((coord) => {
      cellsToConsider.add(coord);
      const [r, c] = coord.split("-").map(Number);
      getNeighborCoordinates(r, c).forEach((neighborCoord) =>
        cellsToConsider.add(neighborCoord)
      );
    });

    cellsToConsider.forEach((coord) => {
      const [r, c] = coord.split("-").map(Number);
      let liveNeighbors = 0;
      getNeighborCoordinates(r, c).forEach((neighborCoord) => {
        if (currentAliveCells.has(neighborCoord)) {
          liveNeighbors++;
        }
      });

      const isAlive = currentAliveCells.has(coord);

      if (isAlive) {
        if (liveNeighbors === 2 || liveNeighbors === 3) {
          nextAliveCells.add(coord);
        }
      } else {
        if (liveNeighbors === 3) {
          nextAliveCells.add(coord);
        }
      }
    });

    sharedState.grid = nextAliveCells;
    sharedState.generation += 1;
    gridRef.current = nextAliveCells;
    notifyListeners();
  }, [getNeighborCoordinates]);

  const toggleCell = useCallback((row, col) => {
    const newGrid = new Set(sharedState.grid);
    const coord = `${row}-${col}`;
    if (newGrid.has(coord)) {
      newGrid.delete(coord);
    } else {
      newGrid.add(coord);
    }
    sharedState.grid = newGrid;
    gridRef.current = newGrid;
    notifyListeners();
  }, []);

  const startGame = useCallback(() => {
    if (!sharedState.isRunning) {
      sharedState.isRunning = true;
      sharedState.intervalId = setInterval(() => {
        step();
      }, sharedState.speed);
      notifyListeners();
    }
  }, [step]);

  const stopGame = useCallback(() => {
    sharedState.isRunning = false;
    if (sharedState.intervalId) {
      clearInterval(sharedState.intervalId);
      sharedState.intervalId = null;
    }
    notifyListeners();
  }, []);

  const clearGrid = useCallback(() => {
    stopGame();
    sharedState.grid = createEmptyGrid();
    sharedState.generation = 0;
    gridRef.current = sharedState.grid;
    notifyListeners();
  }, [stopGame]);

  const randomizeGrid = useCallback(() => {
    stopGame();
    sharedState.grid = createRandomGrid();
    sharedState.generation = 0;
    gridRef.current = sharedState.grid;
    notifyListeners();
  }, [stopGame]);

  const handleStartStop = useCallback(() => {
    if (sharedState.isRunning) {
      stopGame();
    } else {
      startGame();
    }
  }, [startGame, stopGame]);

  const setSpeed = useCallback(
    (newSpeed) => {
      sharedState.speed = newSpeed;

      if (sharedState.isRunning) {
        stopGame();
        setTimeout(() => startGame(), 50);
      }
    },
    [startGame, stopGame]
  );

  useEffect(() => {
    return () => {
      if (sharedState.intervalId) {
        clearInterval(sharedState.intervalId);
        sharedState.intervalId = null;
        sharedState.isRunning = false;
      }
    };
  }, []);

  const gameOfLifeControls = {
    grid: sharedState.grid,
    isRunning: sharedState.isRunning,
    generation: sharedState.generation,
    speed: sharedState.speed,
    startGame,
    stopGame,
    step,
    clearGrid,
    randomizeGrid,
    toggleCell,
    handleStartStop,
    setSpeed,
    gridRows: ROWS,
    gridCols: COLS,
  };

  return (
    <GameOfLifeContext.Provider value={gameOfLifeControls}>
      {children}
    </GameOfLifeContext.Provider>
  );
};

export const useGameOfLifeContext = () => useContext(GameOfLifeContext);

