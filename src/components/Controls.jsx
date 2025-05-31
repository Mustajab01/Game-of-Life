import { useGameOfLifeContext } from "../context/GameOfLifeContext";
import "../styles/Controls.css";

const Controls = () => {
  const {
    isRunning,
    handleStartStop,
    step,
    clearGrid,
    randomizeGrid,
  } = useGameOfLifeContext();

  return (
    <div className="controls-container">
      <div className="controls">
        <button
          className={`btn ${isRunning ? "btn-danger" : "btn-primary"}`}
          onClick={handleStartStop}
        >
          {isRunning ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
              Stop
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
              Start
            </>
          )}
        </button>
        <button className="btn btn-secondary" onClick={step}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,4 15,12 5,20" />
            <line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2" />
          </svg>
          Step
        </button>
        <button className="btn btn-secondary" onClick={randomizeGrid}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L13.09 5.26L16 4L14.74 7.09L18 8L16.74 11.09L20 12L16.74 12.91L18 16L14.74 16.91L16 20L13.09 18.74L12 22L10.91 18.74L8 20L9.26 16.91L6 16L7.26 12.91L4 12L7.26 11.09L6 8L9.26 7.09L8 4L10.91 5.26L12 2Z" />
          </svg>
          Random
        </button>
        <button className="btn btn-warning" onClick={clearGrid}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
          Clear
        </button>
      </div>
    </div>
  );
};

export default Controls;