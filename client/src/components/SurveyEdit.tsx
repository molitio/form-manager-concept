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
  setSelectedSurveyContentAndName,
} from "../context";
import {
  submitSurvey,
  isSurveyValid,
  getSurvey,
  updateSurvey,
} from "../services";

type SurveyEditProps = {
  surveyId?: number;
};

const SurveyEdit: React.FC<SurveyEditProps> = (props) => {
  const { surveyId } = props;

  const [inputDisabled, setInputDisabled] = React.useState<boolean>(true);

  const [inputValue, setInputValue] = React.useState<string>("");

  const dispatch = useDispatch();

  const selectedSurvey = useSelector(
    (state: RootState) => state.survey?.selectedSurvey
  );
  const selectedSurveyContentObject = useSelector(
    (state: RootState) => state.survey?.selectedSurvey?.contentObject
  );
  /* 

  const selectedSurveyName = useSelector(
    (state: RootState) => state.survey?.selectedSurvey?.name
    );
    */
  const authenticatedUser = useSelector(
    (state: RootState) => state?.auth?.user?.authenticatedUser
  );

  React.useEffect(() => {
    if (inputValue.length === 0 && !surveyId) {
      dispatch(setSelectedSurvey({ name: "" }));
    }

    dispatch(setSelectedSurveyContentAndName(inputValue));
  }, [inputValue]);

  React.useEffect(() => {
    if (!surveyId || !authenticatedUser) return;

    const getExistingSurvey = async () => {
      const survey = await getSurvey(
        surveyId,
        authenticatedUser.id,
        authenticatedUser?.accessToken
      );

      if (survey) {
        dispatch(setSelectedSurvey(survey));
        setInputValue(survey.content ?? "");
      }
    };
    getExistingSurvey();
    setInputDisabled(!isSurveyValid(selectedSurvey ?? { name: "" }));
  }, [surveyId]);

  React.useEffect(() => {
    if (!selectedSurvey) return;
    console.log("fire validation", selectedSurvey);
    setInputDisabled(!isSurveyValid(selectedSurvey));
  }, [selectedSurvey]);

  const handleSubmitNewSurvey = (event: React.FormEvent) => {
    if (!selectedSurvey) return;
    event.preventDefault();
    if (!isSurveyValid(selectedSurvey)) {
      return;
    }

    const submit = async () => {
      const submitSurveyResponse = await submitSurvey(
        selectedSurvey ?? { name: "" },
        authenticatedUser?.accessToken ?? ""
      );
      if (submitSurveyResponse === "Resolved") {
        dispatch(setSelectedSurvey({ name: "" }));
        setInputValue("");
      }
    };

    const edit = async () => {
      const editSurveyResponse = await updateSurvey(
        selectedSurvey ?? { name: "" },
        authenticatedUser?.accessToken ?? ""
      );
      if (editSurveyResponse === "Resolved") {
        dispatch(setSelectedSurvey({ name: "" }));
        setInputValue("");
      }
    };

    surveyId ? edit() : submit();
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
      {selectedSurvey?.createdAt ?? "empty"}
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
          {surveyId ? "Edit" : "Submit"}
        </StyledFormButton>
        {selectedSurvey ? <SurveyView survey={selectedSurvey} /> : ""}
      </StyledForm>
    </StyledSurveyEdit>
  );
};

export default SurveyEdit;
