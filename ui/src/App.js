
import './App.css';
import Spending from './components/Spending';

function App() {

  return (
      <div className="App">
        <header className="App-header">
          <div style={{"width":"75vw"}}>
            <h3>Is galactic spending of long, long ago in a galaxy far, far away decreasing over time?</h3>
            <h5>
              When measuring spending as the sum of starship cost in credits per film, 
              the data shows that galactic spending peaked with the first film (thanks in chief to the Death Star).
              Spending has since decreased steadily between 1980 and 2022, with a modest uptick in 2006.
            </h5>
          </div>
        </header>
        <div className="main-content">
          <Spending />
        </div>
      </div>
  );
}

export default App;
