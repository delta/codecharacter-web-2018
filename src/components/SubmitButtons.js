import React                                      from 'react';
import PropTypes                                  from 'prop-types';
import { Link }                                   from 'react-router-dom';

export default class SubmitButtons extends React.Component {
  static propTypes = {
    runCode: PropTypes.func,
    lockCode: PropTypes.func,
    aiList: PropTypes.array,
  };

  static defaultProps = {
    runCode: () => {},
    lockCode: () => {},
    aiList: []
  };

  startMatchWithAI = () => {

  };

  render() {
    console.log(this.props.aiList, "AI List isgetting updated");
    let AIDropDown = (this.props.aiList).map((data, index) => {return <span className="dropdown-item" onClick={() => this.props.runCode()}>AI {data.id}</span>});
    console.log("AI DropDown is ", AIDropDown);
    return (
      <div style={{position: 'absolute', zIndex: 4, bottom: 0, left: 0}}>
        {/*<button
          className="btn btn-success"
          style={{borderRadius: 0, margin: 10}}
          onClick={this.props.runCode}
        >
          Run Code
        </button>*/}
        <div className="btn dropdown btn-success" style={{padding: 0, borderRadius: 0, paddingLeft: 10, paddingRight: 5, cursor: 'pointer'}}>
          <span className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" style={{color: 'white'}} aria-expanded="true">RUN CODE</span>
          <div className="dropdown-menu" style={{position: 'absolute', transform: 'translate3d(0px, 35px, 0px)', top: '0px', willChange: 'transform'}}>
            {AIDropDown}
          </div>
        </div>
        <button
          className="btn btn-danger"
          style={{borderRadius: 0, margin: 10}}
          onClick={this.props.lockCode}
        >
          Submit Code
        </button>
      </div>
    );
  }
}
