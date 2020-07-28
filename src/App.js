import React, { useDebugValue } from 'react';
import './Bootstrap.css';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    // Burada this.setState()'i çağırmayınız!
    this.state = {
      input: "",
      list: [],
      done: [],
      progress: []
    };
  }

  componentDidMount() {
    var storage = this.get("list");
    var scope = this;
    if (storage != null) {
      scope.setState({
        list: JSON.parse(storage)
      })
    } else {

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
    if (this.state.input != "") {
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

  remove = (e) => {
    var arr = this.state.list;
    arr.splice(e, 1);
    this.setState({
      list: arr
    })

    this.set("list", JSON.stringify(arr))
  }

  getInputValue = (e) => {

    var value = e.target.value;
    this.setState({
      input: value
    })

  }


  done = (e) => {
    var arr = this.state.list;
    var done = this.state.done;
    var index = e;
    done.push(arr[e]);
    this.remove(index)
    this.setState({
      done: done
    })

  }

  inProgress = (e) => {
    var arr = this.state.list;
    var progress = this.state.progress;
    var index = e;
    progress.push(arr[e]);
    this.remove(index)
    this.setState({
      progress: progress
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
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
                    <li className="list-group-item" key={index}>
                      <span className="row">
                        <span className="col-6">
                          <span>{item}</span>
                        </span>
                        <span className="col-6 text-right">
                          <span><button className="btn btn-danger" onClick={(e) => this.remove(index)}>DELETE</button></span>
                          <span><button className="btn btn-warning" onClick={(e) => this.inProgress(index)}>IN PROGRESS</button></span>
                          <span><button className="btn btn-success" onClick={(e) => this.done(index)}>DONE</button></span>
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            }
            {this.state.done.length > 0 &&
              <div>
                <h2>DONE LIST</h2>
                <ul className="list-group">
                  {this.state.done.map((item, index) => (
                    <li className="list-group-item" key={index}>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            }

            {this.state.progress.length > 0 &&
              <div>
                <h2>IN PROGRESS LIST</h2>
                <ul className="list-group">
                  {this.state.progress.map((item, index) => (
                    <li className="list-group-item" key={index}>
                      <span>{item}</span>
                    </li>
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
