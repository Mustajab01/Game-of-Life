import { useGameOfLifeContext } from "../context/GameOfLifeContext";

import "../styles/Stats.css";

const Stats = () => {
  const { generation, isRunning } = useGameOfLifeContext();

  return (
    <div className="stats">
      <div className="stat-item">
        <span className="stat-label">Generation</span>
        <span className="stat-value">{generation.toLocaleString()}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Status</span>
        <span className={`stat-value ${isRunning ? 'running' : 'paused'}`}>
          {isRunning ? '● Running' : '⏸ Paused'}
        </span>
      </div>
    </div>
  );
};

export default Stats;