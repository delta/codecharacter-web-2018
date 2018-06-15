import React, { Component } from "react";

export default class NotFoundComponent extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="error-template">
              <h1>Oops!</h1>
              <h2>404 Not Found</h2>
              <div className="error-details">
                Sorry, an error has occured, Codecharacter cannot find what you asked for!
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
