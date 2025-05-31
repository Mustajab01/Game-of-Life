import React from "react";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import Stats from "./components/Stats";
import "./styles/App.css";

export default function App() {
  return (

    <div className="app">
      <div className="header">
        <h1 className="title">Conway's Game of Life</h1>
        <p className="subtitle">
          Witness the emergence of complex patterns from simple rules
        </p>
      </div>

      <Stats />
      <Controls />
      <Grid />

      <div className="instructions">
        <h3>How to Play</h3>
        <p>
          Click on cells to toggle them between alive and dead states. Use the controls to start the simulation,
          step through generations, or generate random patterns. Watch as simple rules create complex, beautiful patterns.
        </p>

        <div className="rules">
          <div className="rule">
            <div className="rule-title">🏝️ Underpopulation</div>
            <div className="rule-desc">Live cells with fewer than 2 neighbors die from loneliness</div>
          </div>
          <div className="rule">
            <div className="rule-title">🏡 Survival</div>
            <div className="rule-desc">Live cells with 2-3 neighbors survive to the next generation</div>
          </div>
          <div className="rule">
            <div className="rule-title">💀 Overpopulation</div>
            <div className="rule-desc">Live cells with more than 3 neighbors die from overcrowding</div>
          </div>
          <div className="rule">
            <div className="rule-title">👶 Birth</div>
            <div className="rule-desc">Dead cells with exactly 3 neighbors become alive</div>
          </div>
        </div>
      </div>
    </div>

  );
}