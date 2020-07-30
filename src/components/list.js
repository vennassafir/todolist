import React, { Fragment } from 'react';

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { item, board, index } = this.props;
        return (
            <Fragment>
                <li className="list-group-item" key={index}>
                    <span className="row">
                        <span className="col-6">
                            <span>{item}</span>
                        </span>
                        <span className="col-6 text-right">
                            {board === "todo" &&
                                <span>
                                    <span><button className="btn btn-warning" onClick={this.props.inProgress}>IN PROGRESS</button></span>
                                    <span><button className="btn btn-danger" onClick={this.props.delete}>DELETE</button></span>
                                </span>
                            }
                            {board === "progress" &&
                                <span>
                                    <span><button className="btn btn-info" onClick={this.props.moveList}>MOVE LIST</button></span>
                                    <span><button className="btn btn-success" onClick={this.props.done}>DONE</button></span>
                                </span>
                            }
                        </span>
                    </span>
                </li>
            </Fragment>

        );
    }

}

export default List;
