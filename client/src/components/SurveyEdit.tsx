import React from "react";
import { Survey, SurveyPage } from "../types";
import {
  StyledForm,
  StyledFormButton,
  StyledSurveyEdit,
  StyledFormTextArea,
} from "../styled";
import SurveyView from "./SurveyView";
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  setSelectedSurvey,
  setSelectedSurveyFromInput,
} from "../context";
import { SubmitSurvey, isSurveyValid } from "../services";

type SurveyEditProps = {
  surveyId?: string;
};

const SurveyEdit: React.FC<SurveyEditProps> = (props) => {
  const { surveyId } = props;

  const [inputDisabled, setInputDisabled] = React.useState<boolean>(true);

  const [inputValue, setInputValue] = React.useState<string>("");

  const dispatch = useDispatch();

  const selectedSurvey = useSelector(
    (state: RootState) => state.survey?.selectedSurvey
  );
  const token = useSelector(
    (state: RootState) => state?.auth?.user?.authenticatedUser?.accessToken
  );

  React.useEffect(() => {
    //if survey id present get survey, if not create a new one
    console.log("update");
    dispatch(setSelectedSurveyFromInput(inputValue));
  }, [inputValue, surveyId]);

  React.useEffect(() => {
    console.log("isSurveyValid: ", isSurveyValid(selectedSurvey));
    setInputDisabled(!isSurveyValid(selectedSurvey));
  }, [selectedSurvey]);

  const handleSubmitNewSurvey = (event: React.FormEvent) => {
    console.log("submit");
    console.log("isSurveyValid: ", isSurveyValid(selectedSurvey));
    event.preventDefault();
    if (!isSurveyValid(selectedSurvey)) {
      return;
    }

    const Submit = async () => {
      const submitSurveyResponse = await SubmitSurvey(
        token ?? "",
        selectedSurvey
      );
      if (submitSurveyResponse === "Resolved") {
        dispatch(setSelectedSurvey({ name: "" }));
        setInputValue("");
        setInputDisabled(!isSurveyValid(selectedSurvey));
      }
      console.log("response: ", submitSurveyResponse);
    };

    Submit();
  };

  const handleFormInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    {
      setInputValue(event.target.value);
    }
  };

  return (
    <StyledSurveyEdit>
      <StyledForm onSubmit={handleSubmitNewSurvey}>
        <StyledFormTextArea
          id="survey-name"
          name="survey-name"
          placeholder="Start typing the survey..."
          value={inputValue}
          onChange={handleFormInputChange}
          rows={12}
          required
        />
        <StyledFormButton
          disabled={inputDisabled}
          inputDisabled={inputDisabled}
          type="submit"
        >
          Submit
        </StyledFormButton>
        {selectedSurvey ? <SurveyView survey={selectedSurvey} /> : ""}
      </StyledForm>
    </StyledSurveyEdit>
  );
};

export default SurveyEdit;
