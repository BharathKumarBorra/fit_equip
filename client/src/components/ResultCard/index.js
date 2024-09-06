import { Component } from "react";
import { IoIosArrowDown } from "react-icons/io";
import "./index.css";

class ResultCard extends Component {
  state = {
    showInstructions: false, // State to toggle visibility of instructions
  };

  render() {
    const { showInstructions } = this.state;
    const { resultCard } = this.props; // Destructure resultCard from props

    const { name, instructions, instructionVideo } = resultCard; // Destructure values from resultCard

    return (
      <li className="exercise-card">
        <img
          alt={name}
          src={instructionVideo}
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
              style={{ display: showInstructions ? "block" : "none" }}
            >
              Instructions
            </h5>

            <p
              className="exercise-instructions"
              style={{ display: showInstructions ? "block" : "none" }}
            >
              {instructions}{" "}
            </p>
          </div>

          <IoIosArrowDown
            onClick={() => {
              this.setState((prevState) => ({
                showInstructions: !prevState.showInstructions,
              }));
            }}
            className={`show-more down-arrow ${showInstructions && "rotate"}`}
          />
        </div>
      </li>
    );
  }
}

export default ResultCard;
