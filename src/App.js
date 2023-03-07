import './App.css';
import { useState } from 'react';
import * as math from 'mathjs';


function App (){
  const [ calc, setCalc ] = useState ('');
  const [ result, setResult] = useState('');

  const oprs = [ '/', '*', '+', '-', '.'];


  const updateCalc = value => {
    if (
      (oprs.includes(value) && calc === '') ||
      (oprs.includes(value) && oprs.includes (calc.slice(-1)))
    ){
      return;
    }
    setCalc (calc + value);

    if (!oprs.includes(value)) {
      try {
        const expr = math.compile(calc + value);
        const result = expr.evaluate();
        setResult(result.toString());
      } catch (error) {
        console.error(error);
      }
    }
  }

  const createDigits = () => {
    const digits =[];

    for (let i=1; i<10; i++) {
      digits.push(
        <button 
          onClick={ () => updateCalc (i.toString()) } 
          key={i}> 
          {i}
        </button>
      )
    }
    return digits;
  } 

  const calculate = () => {
    try {
      const result = math.evaluate(calc);
      setCalc(result.toString());
    } catch (error) {
      console.error(error);
    }
  }
  
  const deleteLast = () => {
    if (calc === '') {
      return;
    }

    const value = calc.slice(0, -1);
    setCalc (value);
  }

  return(
    <div className="App">

      <div className="calculator">

          <div className='display'>
            {result ? <span>({result})</span> : ''} 
            {calc  || '0'}
          </div>

        <div className="operator">
          <button onClick={() => updateCalc ('/')}>/</button>
          <button onClick={() => updateCalc ('*')}>*</button>
          <button onClick={() => updateCalc ('+')}>+</button>
          <button onClick={() => updateCalc ('-')}>-</button>

          <button onClick={deleteLast}>DEL</button>
        </div>

        <div className="digits">
          { createDigits () }
          <button onClick={() => updateCalc ('0')}>0</button>
          <button onClick={() => updateCalc ('.')}>.</button>

          <button onClick={calculate}>=</button>
        </div>



      </div>

    </div>
  )
}

export default App;