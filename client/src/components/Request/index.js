import { Component } from "react";
import ResultCard from "../ResultCard";
import "./index.css";

const bodyPartsList = ["chest", "back", "legs"];

class Request extends Component {
  state = {
    selectedEquipments: [],
    inputEquipmentName: "",
    equipmentsSearchList: [],
    selectedBodyPart: "",
    numExercises: 5,
    showBodyPartsList: false,
    exercises: [],
  };

  renderEquipmentSearchItem = (itemDetails) => {
    const { image, name } = itemDetails;

    return (
      <li
        className="equipment-search-item"
        onClick={() => {
          this.setState((prevState) => ({
            selectedEquipments: [...prevState.selectedEquipments, itemDetails],
            inputEquipmentName: "",
            equipmentsSearchList: [],
          }));
        }}
      >
        <img alt={name} src={image} className="equipment-image" />
        <p className="equipment-name">{name}</p>
      </li>
    );
  };

  onChangeEquipmentName = async (event) => {
    const name = event.target.value;
    this.setState({
      inputEquipmentName: name,
    });

    if (name.length === 0) {
      this.setState({
        equipmentsSearchList: [],
      });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/equipments?name=${name}`
      );
      if (response.ok) {
        const data = await response.json();
        const { selectedEquipments } = this.state;

        // Filter out the equipments that are already selected
        const filteredEquipments = data.equipments.filter(
          (equipment) =>
            !selectedEquipments.some(
              (selected) => selected.name === equipment.name
            )
        );

        this.setState({
          equipmentsSearchList: filteredEquipments,
        });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  removeEquipment = (event) => {
    const { selectedEquipments } = this.state;
    const selectedName = event.target.id;
    const filteredEquipments = selectedEquipments.filter((eachItem) => {
      return eachItem.name !== selectedName;
    });
    this.setState({
      selectedEquipments: filteredEquipments,
    });
  };

  renderSelectedEquipment = (itemDetails) => {
    const { name, image } = itemDetails;
    return (
      <li className="selected-equipment-card">
        <img alt={name} src={image} className="selected-equipment-image" />
        <h5 className="selected-equipment-name">{name}</h5>
        <h5
          className="selected-equipment-name"
          id={name}
          onClick={this.removeEquipment}
        >
          x
        </h5>
      </li>
    );
  };

  getExcercises = async (event) => {
    event.preventDefault();

    const { selectedEquipments, selectedBodyPart, numExercises } = this.state;

    // Prepare query parameters
    const equipmentNames = selectedEquipments
      .map((equipment) => equipment.name)
      .join(",");
    const bodyPart = selectedBodyPart;
    const count = numExercises;

    try {
      // Make the GET request
      const response = await fetch(
        `http://localhost:5000/exercises?equipments=${equipmentNames}&bodyPart=${bodyPart}&limit=${count}`
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Exercises:", data);

        // Handle the exercises data as needed
        // For example, you can store the exercises in the state and render them
        this.setState({ exercises: data });
      } else {
        console.log("Failed to fetch exercises");
      }
    } catch (error) {
      console.log("Error fetching exercises:", error);
    }
  };

  render() {
    const {
      selectedEquipments,
      inputEquipmentName,
      equipmentsSearchList,
      selectedBodyPart,
      numExercises,
      showBodyPartsList,
      exercises,
    } = this.state;

    console.log(numExercises);
    console.log("exercises in requestsection: ", exercises);

    return (
      <div className="request-section">
        <div className="request-main-section">
          <img
            alt="home-page-image"
            src="https://res.cloudinary.com/dpla1hz0i/image/upload/v1725371061/sample_fit_img-transformed_vguqre.jpg"
            className="home-page-image"
          />
          <form className="request-form" onSubmit={this.getExcercises}>
            <div className="text-container">
              <h1 className="main-heading">Find Exercises</h1>
              <p className="main-description">
                Find excercises by giving equipments and body part that you want
                to train
              </p>
            </div>
            <label htmlFor="equipments">Equipments</label>
            <div className="selected-equipments-container">
              {selectedEquipments.length === 0
                ? "select equipments"
                : selectedEquipments.map((eachItem) => {
                    return this.renderSelectedEquipment(eachItem);
                  })}
            </div>
            <input
              id="equipments"
              name="equipments"
              type="text"
              placeholder="search equipment"
              value={inputEquipmentName}
              onChange={this.onChangeEquipmentName}
            />
            {equipmentsSearchList.length > 0 && (
              <div className="equipments-search-list-container">
                <ul className="equipments-search-list">
                  {equipmentsSearchList.map((eachItem) => {
                    return this.renderEquipmentSearchItem(eachItem);
                  })}
                </ul>
              </div>
            )}

            <div className="bodyPart-and-numberOfExcercises-card">
              <div className="bodyPart-card">
                <label htmlFor="bodyPart">Body Part</label>
                <div
                  id="bodyPart"
                  name="bodyPart"
                  className="body-part-header"
                  onClick={() => {
                    this.setState((prevState) => ({
                      showBodyPartsList: !prevState.showBodyPartsList,
                    }));
                  }}
                >
                  <span>
                    {selectedBodyPart ? selectedBodyPart : "Select body part"}
                  </span>{" "}
                  <span>D</span>
                </div>
                {showBodyPartsList && (
                  <ul className="body-part-list">
                    {bodyPartsList.map((eachItem) => {
                      return (
                        <li
                          onClick={() => {
                            this.setState({
                              showBodyPartsList: false,
                              selectedBodyPart: eachItem,
                            });
                          }}
                          className="body-part"
                        >
                          {eachItem}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <div className="numberOfExcercises-card">
                <label htmlFor="exercisesCount">No. of exercises</label>
                <input
                  id="exercisesCount"
                  placeholder="no of exercises"
                ></input>
              </div>
            </div>

            <button type="submit" className="submit-button">
              Get Exercises
            </button>
          </form>
        </div>
        {exercises.length > 0 && (
          <div className="result-section">
            <h2 className="result-section-heading">Your Excercises</h2>
            <hr />
            <ul className="exercises-list">
              {exercises.map((eachItem) => {
                return <ResultCard resultCard={eachItem} />;
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Request;
