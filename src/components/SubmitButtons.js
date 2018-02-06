import React                                      from 'react';
import PropTypes                                  from 'prop-types';

export default class SubmitButtons extends React.Component {
  static propTypes = {
    runCode: PropTypes.func,
    lockCode: PropTypes.func,
    aiList: PropTypes.array,
    changeAIid: PropTypes.func,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    aiList: [],
    runCode: () => {},
    lockCode: () => {},
    changeAIid: () => {},
    disabled: false
  };

  render() {
    let AIDropDown = (this.props.aiList).map((data, index) => {
      return <li
        key={index}
        className="dropdown-item"
        onClick={() => {
          this.props.changeAIid(data.id);
          this.props.runCode();
        }
        }
      >
        <a>AI {data.id}</a>
      </li>
    });
    return (
      <div style={{position: 'absolute', zIndex: 10, bottom: 0, left: 10}}>
        <div className="btn dropdown btn-success dropdown"
             style={{padding: 0, borderRadius: 0, paddingLeft: 10, paddingRight: 5, cursor: 'pointer', opacity: (!this.props.disabled ? 1 : 0.65)}}
              aria-disabled="true">
          <button className="nav-link dropdown-toggle btn"
                  disabled={this.props.disabled ? "disabled" : ""}
                  data-toggle="dropdown" type="button"
                  style={{margin: '1px 0px', backgroundColor: 'transparent', border: 'none', boxShadow: 'none', color: 'white', fontFamily: 'Rubik'}}>
            RUN CODE<span className="caret"/></button>
          <ul className="dropdown-menu" style={{position: 'absolute', transform: 'translate3d(0px, 35px, 0px)', top: '0px'}}>
                <div>
              <li
                key={-1}
                className="dropdown-item"
                onClick={() => {
                  this.props.changeAIid(-1);
                  this.props.runCode();
                }
                }
              >
                <a>Self</a>
              </li>
                  {AIDropDown}</div>
            </ul>
        </div>
        <button
          className={this.props.disabled ? "btn btn-danger disabled" : "btn btn-danger"}
          style={{borderRadius: 0, margin: 10, cursor: 'pointer'}}
          onClick={() => {if (!this.props.disabled) this.props.lockCode();}}
        >
          Submit Code
        </button>
      </div>
    );
  }
}
