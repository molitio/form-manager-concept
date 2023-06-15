import React from "react";
import SurveyEdit from "./SurveyEdit";
import { Survey } from "../types";

const Surveys: React.FC = () => {
  //reads redux store to display surveys

  const [toggleNewSurvey, setToggleNewSurvey] = React.useState<boolean>(false);

  const handleNewSurvey = (event: React.MouseEvent) => {
    setToggleNewSurvey(!toggleNewSurvey);
  };

  return (
    <>
      surveys
      <br />
      <br />
      <button onClick={handleNewSurvey}>
        {toggleNewSurvey ? "Cancel" : "New Survey"}
      </button>
      <br />
      <br />
      {toggleNewSurvey ? <SurveyEdit /> : ""}
      {/* 


*/}
    </>
  );
};

export default Surveys;
