import React from "react";
import ReactDOM from "react-dom";

import {getMergeSortAnimations} from './sortingAlgs.js';
import styles from '../styles/utils.module.css';
import { useRouter } from 'next/router'


// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1.5;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 200;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#87CEEB';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('arrayBar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  heapSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  bubbleSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }
  
  render() {
    const {array} = this.state;

    return (
      <div className="center">
        {this.state.array.map((value, idx) => (
          <div
            className="arrayBar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}>  
          </div>
        ))}
        <br></br>
        <br></br>
        <button className="myBtn" onClick={() => this.resetArray()}>Generate New Array</button> 
        <button className="myBtn" onClick={() => this.mergeSort()}>Merge Sort</button>
        <button className="myBtn" onClick={() => this.quickSort()}>Quick Sort</button>
        <button className="myBtn" onClick={() => this.heapSort()}>Heap Sort</button>
        <button className="myBtn" onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button className="myBtn" onClick={() => this.testSortingAlgorithms()}>
          Test Sorting Algorithms (BROKEN)
        </button>

        <button className="myBtn">
          <a href="/sort-viz/init">Init</a>
        </button>

        <style jsx>{`
        .arrayContainer {
          position: absolute;
          left: 50%;
          top: 5%;
          /* top: 100px; */
        }
        
        .arrayBar {
          width: 2px;
          display: inline-block;
          margin: 0 1px;
        }
        
        .center {
          text-align: center;
          border: 3px solid green;
          padding-top: 20px;
        }

        .myBtn {
          margin-left: 10px;
        }
      `}</style>
      
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}