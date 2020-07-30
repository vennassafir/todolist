import React from 'react';
import './Bootstrap.css';
import './App.css';

import List from "./components/list"

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      input: "",
      list: [],
      progress: [],
      done: [],
    };
  }

  componentDidMount() {
    var list = this.get("list");
    var progress = this.get("inprogress");
    var done = this.get("done");


    var scope = this;
    if (list !== null) {
      scope.setState({
        list: JSON.parse(list),
      })
    }

    if (progress !== null) {
      scope.setState({
        progress: JSON.parse(progress),
      })
    }

    if (done !== null) {
      scope.setState({
        done: JSON.parse(done),
      })
    }

  }

  set = (key, value) => {
    localStorage.setItem(key, value);
  }

  get = (key) => {
    return localStorage.getItem(key);
  }

  add = (e) => {
    var scope = this;
    if (this.state.input !== "") {
      var arr = scope.state.list;
      arr.push(scope.state.input);

      scope.setState({
        list: arr
      })

      scope.setState({
        input: ""
      })
      scope.set("list", JSON.stringify(arr))
    }
    else {
      alert("NO BOŞ")
    }
  }

  remove = (e, target) => {

    if (target == "todo") {
      var arr = this.state.list;
      arr.splice(e, 1);
      this.setState({
        list: arr
      })
      this.set("list", JSON.stringify(arr))
    }

    if (target == "progress") {
      var arr = this.state.progress;
      arr.splice(e, 1);
      this.setState({
        progress: arr
      })
      this.set("inprogress", JSON.stringify(arr))
    }


  }

  getInputValue = (e) => {

    var value = e.target.value;
    this.setState({
      input: value
    })
  }

  done = (e) => {
    var arr = this.state.progress;
    var done = this.state.done;
    var index = e;
    done.push(arr[e]);
    this.remove(index, "progress")
    this.setState({
      done: done
    })

    this.set("done", JSON.stringify(done))
  }

  inProgress = (e) => {
    var arr = this.state.list;
    var progress = this.state.progress;
    var index = e;
    progress.push(arr[e]);
    this.remove(index, "todo")
    this.setState({
      progress: progress
    })

    this.set("inprogress", JSON.stringify(progress))
  }

  moveList = (index) => {

    var progress = this.state.progress;
    var move = progress[index];
    progress.splice(index, 1)

    this.setState({
      progress: progress
    })

    var list = this.state.list;
    list.push(move);

    this.setState({
      list: list
    })

    this.set("inprogress", JSON.stringify(progress))
    this.set("list", JSON.stringify(list))
  }

  delete = (index) => {
    var list = this.state.list;
    list.splice(index, 1);
    this.setState({
      list: list
    })
    this.set("list", JSON.stringify(list))
  }

  _listItem = (item, index, board) => {
    return (
      <li className="list-group-item" key={index}>
        <span className="row">
          <span className="col-6">
            <span>{item}</span>
          </span>
          <span className="col-6 text-right">

            {board == "todo" &&
              <span>
                <span><button className="btn btn-warning" onClick={(e) => this.inProgress(index)}>IN PROGRESS</button></span>
                <span><button className="btn btn-danger" onClick={(e) => this.delete(index)}>DELETE</button></span>
              </span>
            }

            {board == "progress" &&
              <span>
                <span><button className="btn btn-info" onClick={(e) => this.moveList(index)}>MOVE LIST</button></span>
                <span><button className="btn btn-success" onClick={(e) => this.done(index)}>DONE</button></span>
              </span>
            }

          </span>
        </span>
      </li>
    )
  }


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>React - ToDo App</h1>
            <div className="form-group">
              <label> ADD ITEM </label>
              <input type="text" className="form-control" value={this.state.input} onChange={(e) => this.getInputValue(e)} />
            </div>
            <button className="btn btn-primary" onClick={(e) => this.add(e)}>
              ADD
            </button>
          </div>

          <div className="col-12">
            {this.state.list.length > 0 &&
              <div>
                <h2>TODO LIST</h2>
                <ul className="list-group">
                  {this.state.list.map((item, index) => (
                    <List inProgress={(e) => this.inProgress(index)} delete={(e) => this.delete(index)} moveList={(e) => this.moveList(index)} done={(e) => this.done(index)} item={item} index={index} key={index} board={"todo"} ></List>
                  ))}
                </ul>
              </div>
            }

            {this.state.progress.length > 0 &&
              <div>
                <h2>IN PROGRESS LIST</h2>
                <ul className="list-group">
                  {this.state.progress.map((item, index) => (
                    <List inProgress={(e) => this.inProgress(index)} delete={(e) => this.delete(index)} moveList={(e) => this.moveList(index)} done={(e) => this.done(index)} item={item} index={index} key={index} board={"progress"} ></List>
                  
                  ))}
                </ul>
              </div>
            }

            {this.state.done.length > 0 &&
              <div>
                <h2>DONE LIST</h2>
                <ul className="list-group">
                  {this.state.done.map((item, index) => (
                    <List inProgress={(e) => this.inProgress(index)} delete={(e) => this.delete(index)} moveList={(e) => this.moveList(index)} done={(e) => this.done(index)} item={item} index={index} key={index} board={"done"} ></List>
                  
                  ))}
                </ul>
              </div>
            }

          </div>
        </div>
      </div>
    );
  }

}

export default App;
