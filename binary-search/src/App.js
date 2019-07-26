import React from 'react';

import './App.css';

const dataset = ["89", "30", "25", "32", "72", "70", "51", "42", "25", "24", "53", "55", "78", "50", "13", "40", "48", "32", "26", "2", "14", "33", "45", "72", "56", "44", "21", "88", "27", "68", "15", "62", "93", "98", "73", "28", "16", "46", "87", "28", "65", "38", "67", "16", "85", "63", "23", "69", "64", "91", "9", "70", "81", "27", "97", "82", "6", "88", "3", "7", "46", "13", "11", "64", "76", "31", "26", "38", "28", "13", "17", "69", "90", "1", "6", "7", "64", "43", "9", "73", "80", "98", "46", "27", "22", "87", "49", "83", "6", "39", "42", "51", "54", "84", "34", "53", "78", "40", "14", "5"];

let counter = 0

class App extends React.Component {
  state = {
    linearSearchSteps: null,
    binarySearchSteps: null
  }
  handleLinearSubmit = (ev) => {
    ev.preventDefault()
    const input = ev.target.linear.value
    console.log('input-linear', input)
    for (let i = 0; i <= dataset.length; i++) {
      if (dataset[i] === input) {
        this.setState({ linearSearchSteps: i + 1 })
        return
      } else if (i === dataset.length) {
        const steps = i + 1
        this.setState({ linearSearchSteps: `It took ${steps} steps and didn't find it` })
        return
      }
    }
  }

  handleBinarySubmit = (ev) => {
    ev.preventDefault()
    const input = Number(ev.target.binary.value)
    const sorted = dataset.sort((a, b) => a - b)
    const numbers = sorted.map(str => parseInt(str))

    this.binarySearch(numbers, input)
    counter = 0
    // console.log(this.state.counter)
  }

  binarySearch = (array, value, start, end) => {
    start = start === undefined ? 0 : start;
    end = end === undefined ? array.length : end;
    if (start > end) {
      return -1;
    }

    const index = Math.floor((start + end) / 2)
    const item = array[index]
    counter++
    this.setState({
      binarySearchSteps: counter
    })
    console.log('counter outside if', counter)

    if (item === value) {
      return index
    }
    else if (item > value) {
      return this.binarySearch(array, value, start, index - 1)
    }
    else if (item < value) {
      return this.binarySearch(array, value, index + 1, end)
    }
    else {
      this.setState({ binarySearchSteps: `It took ${counter} steps and didn't find it` })
    }
  }
  render() {
    return (
      <div className="App">
        <form onSubmit={(ev) => this.handleLinearSubmit(ev)}>
          <label>Enter dataset for linear search: </label>
          <input id="linear" type="text" />
          <button type="submit">Submit</button>
        </form>
        {this.state.linearSearchSteps && <p>{this.state.linearSearchSteps}</p>}
        <form onSubmit={(ev) => this.handleBinarySubmit(ev)}>
          <label>Enter dataset for binary search: </label>
          <input id="binary" type="text" />
          <button type="submit">Submit</button>
        </form>
        {this.state.binarySearchSteps && <p>{this.state.binarySearchSteps}</p>}
      </div>
    )
  }

}

export default App;
