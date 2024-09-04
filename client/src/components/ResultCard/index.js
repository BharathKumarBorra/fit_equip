import { Component } from "react";
import "./index.css";

class ResultCard extends Component {
  state = {
    showInstructions: false,
  };

  render() {
    const { showInstructions } = this.state;
    const { resultCard } = this.props;

    const { name, instructions } = resultCard;

    return (
      <li className="exercise-card">
        <img
          alt={name}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNvDEw8sjIWk5XndGGs4CUZgVYoE6cxpiytg&s"
          className={`${showInstructions && "full-width-image"} exercise-image`}
        />
        <div
          className={`exercise-card-main-container ${
            showInstructions && "show-instructions"
          }`}
        >
          <div className="exercise-card-text-container">
            <h4 className="exercise-name">{name}</h4>

            <h5
              className="instructions-heading"
              style={{ display: showInstructions ? "none" : "block" }}
            >
              Instructions
            </h5>

            <p
              className="exercise-instructions"
              style={{ display: showInstructions ? "none" : "block" }}
            >
              {instructions}{" "}
            </p>
          </div>

          <h5
            className="show-more"
            onClick={() => {
              this.setState((prevState) => ({
                showInstructions: !prevState.showInstructions,
              }));
            }}
          >
            X
          </h5>
        </div>
      </li>
    );
  }
}

export default ResultCard;
