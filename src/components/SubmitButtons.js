import React                                      from 'react';
import PropTypes                                  from 'prop-types';

export default class SubmitButtons extends React.Component {
  static propTypes = {
    runCode: PropTypes.func,
    lockCode: PropTypes.func,
    aiList: PropTypes.array,
    changeAIid: PropTypes.func
  };

  static defaultProps = {
    aiList: [],
    runCode: () => {},
    lockCode: () => {},
    changeAIid: () => {}
  };

  render() {
    let AIDropDown = (this.props.aiList).map((data, index) => {
      return <span
        key={index}
        className="dropdown-item"
        onClick={() => {
          this.props.changeAIid(data.id);
          this.props.runCode();
        }
        }
      >
        AI {data.id}
      </span>
    });
    return (
      <div style={{position: 'absolute', zIndex: 10, bottom: 0, left: 10}}>
        <div className="btn dropdown btn-success" style={{padding: 0, borderRadius: 0, paddingLeft: 10, paddingRight: 5, cursor: 'pointer'}}>
          <span className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" style={{color: 'white'}} aria-expanded="true">RUN CODE</span>
          <div className="dropdown-menu" style={{position: 'absolute', transform: 'translate3d(0px, 35px, 0px)', top: '0px', willChange: 'transform'}}>
            <span
              key={-1}
              className="dropdown-item"
              onClick={() => {
                this.props.changeAIid(-1);
                this.props.runCode();
              }
              }
            >
              Self
            </span>
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
