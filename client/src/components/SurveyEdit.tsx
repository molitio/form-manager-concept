import React from "react";
import { SurveyPage } from "../types";
import {
  StyledForm,
  StyledFormButton,
  StyledSurveyEdit,
  StyledFormTextArea,
} from "../styled";
import SurveyView from "./SurveyView";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setSelectedSurveyFromInput } from "../context";

type SurveyEditProps = {
  surveyId?: string;
};

// can edit existing or create a new Survey

const SurveyEdit: React.FC<SurveyEditProps> = (props) => {
  const { surveyId } = props;

  const dispatch = useDispatch();

  const selectedSurvey = useSelector(
    (state: RootState) => state.survey?.selectedSurvey
  );

  React.useEffect(() => {
    //if survey id present get survey, if not create a new one
  }, [surveyId]);

  const handleCreateNewSurvey = (event: React.FormEvent) => {
    // send to db
  };

  return (
    <StyledSurveyEdit>
      <StyledForm onSubmit={handleCreateNewSurvey}>
        survey edit id: {surveyId}
        <br />
        survey edit name: {selectedSurvey?.name}
        <br />
        <br />
        <StyledFormTextArea
          id="survey-name"
          name="survey-name"
          placeholder="Start typing the survey..."
          onChange={(e) => {
            dispatch(setSelectedSurveyFromInput(e.target.value));
          }}
          required
        />
        <StyledFormButton type="submit">Add</StyledFormButton>
        <SurveyView survey={selectedSurvey} />
      </StyledForm>
    </StyledSurveyEdit>
  );
};

export default SurveyEdit;
