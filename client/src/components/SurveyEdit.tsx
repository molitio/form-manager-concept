import React from "react";
import { Survey, SurveyPage } from "../types";
import {
  StyledForm,
  StyledFormLabel,
  StyledFormInput,
  StyledFormButton,
  StyledSurveyEdit,
  StyledInputButton,
  StyledInputButtonInput,
} from "../styled";
import SurveyView from "./SurveyView";
import PageSelectDropdown from "./PageSelectDropdown";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setNewPage, setSelectedSurveyName } from "../context";

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

  /* const [survey, setSurvey] = React.useState<Survey>({
    name: "",
    content: { surveyPages: {} },
  }); */

  const [surveyName, setSurveyName] = React.useState<string>("");
  const [selectedPage, setSelectedPage] = React.useState<SurveyPage>();
  const [pageName, setPageName] = React.useState<string>("");

  React.useEffect(() => {
    //if survey id present get survey, if not create a new one
  }, [surveyId]);

  const handleCreateNewSurvey = (event: React.FormEvent) => {
    // send to db
  };

  const handleAddNewPage = (event: React.MouseEvent) => {
    event.preventDefault();

    if (selectedSurvey) {
      dispatch(
        setNewPage({
          key: Object.keys(selectedSurvey.content.surveyPages).length + 1,
          page: { name: pageName, questions: {} },
        })
      );
    }
  };

  const handlePageSelect = (selectedPageName: string) => {
    /*     setSelectedPage(selectedPage); */
  };

  /*   const handlePageNameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setPageName(event.target.value);
  }; */

  /* 
  React.useEffect(() => {
    console.log("survey", survey);

    const currentSelectedPage = survey?.content?.surveyPages?.[selectedPage];
    if (currentSelectedPage) {
      currentSelectedPage.name = pageName;

      setSurvey({
        ...survey,
        content: {
          ...survey.content,
          [selectedPage]: currentSelectedPage,
        },
      });
    }
  }, [pageName]); */

  /*   const updateSurveyQuestion = (
    pageKey: string,
    questionKey: string,
    value: string
  ) => {
    const selectedQuestion =
      survey?.content?.surveyPages?.[pageKey]?.questions?.[questionKey];
    if (selectedQuestion) {
      selectedQuestion.question = value;
      setSurvey({
        ...survey,
      });
    }
  }; */

  return (
    <StyledSurveyEdit>
      survey edit id: {surveyId}
      <br />
      survey edit name: {selectedSurvey?.name}
      <br />
      <br />
      <StyledForm onSubmit={handleCreateNewSurvey}>
        {/* match grid layout to image */}
        <StyledFormLabel htmlFor="survey-name">Survey Name:</StyledFormLabel>
        <StyledFormInput
          type="survey-name"
          id="survey-name"
          name="survey-name"
          placeholder="Type the survey name..."
          onChange={(e) => {
            dispatch(setSelectedSurveyName(e.target.value));
          }}
          required
        />
        <StyledInputButton onClick={handleAddNewPage}>
          <p>✔</p>
        </StyledInputButton>
        <StyledInputButtonInput
          onChange={(e) => setPageName(e.target.value)}
          placeholder="Type page name..."
        />
        <p>select page</p>
        <PageSelectDropdown
          options={Object.values(
            selectedSurvey?.content?.surveyPages ?? []
          ).map((p) => p.name)}
          handlePageSelect={handlePageSelect}
        />
        <StyledFormButton type="submit">Add</StyledFormButton>
        <SurveyView survey={selectedSurvey} />
      </StyledForm>
      {/*   <QuestionsEdit
        survey={survey}
        pageName={"insert name"}
        questionName={"insert question"}
      /> */}
    </StyledSurveyEdit>
  );
};

export default SurveyEdit;
