import React from "react";
import { Survey } from "../types";
import {
  StyledErrorText,
  StyledForm,
  StyledFormLabel,
  StyledFormInput,
  StyledFormButton,
  StyledSurveyEdit,
} from "../styled";
import SurveyView from "./SurveyView";

type SurveyEditProps = {
  surveyId?: string;
};

// can edit existing or create a new Survey

const SurveyEdit: React.FC<SurveyEditProps> = (props) => {
  const { surveyId } = props;

  const [survey, setSurvey] = React.useState<Survey>({
    name: "",
    content: { surveyPages: {} },
  });

  React.useEffect(() => {
    //if survey id present get survey, if not create a new one
  }, [surveyId]);

  const handleCreateNewSurvey = (event: React.FormEvent) => {
    // send to db
  };

  const nanoid = () => "asdfa";

  const handleAddNewPage = (event: React.MouseEvent) => {
    event.preventDefault();
    survey.content.surveyPages = { [nanoid()]: { name: "", questions: {} } };
  };
  {
    /*       <StyledErrorText>
        {loginError.length > 0 ? loginError : ""}
      </StyledErrorText> */
  }

  return (
    <StyledSurveyEdit>
      survey edit id: {surveyId}
      <br />
      survey edit name: {survey.name}
      <br />
      <br />
      <StyledForm onSubmit={handleCreateNewSurvey}>
        <StyledFormLabel htmlFor="survey-name">Survey Name:</StyledFormLabel>
        <StyledFormInput
          type="survey-name"
          id="survey-name"
          name="survey-name"
          value={survey?.name}
          onChange={(e) =>
            setSurvey({
              ...survey,
              name: e.target.value,
            })
          }
          required
        />
        <button onClick={handleAddNewPage}> New Page</button>
        <div />
        <StyledFormButton type="submit">Add</StyledFormButton>
      </StyledForm>
      <SurveyView survey={survey} />
    </StyledSurveyEdit>
  );
};

export default SurveyEdit;
