import React from "react";
import { Survey } from "../types";
import { StyledSurveyView } from "../styled";

type SurveyViewProps = {
  survey: Survey;
};

const SurveyView: React.FC<SurveyViewProps> = (props) => {
  const { survey } = props;

  const content = survey.content;
  const pages = content.surveyPages;

  return (
    <StyledSurveyView>
      survey name: {survey.name}
      {Object.keys(content).map((page) => (
        <div key={page}>
          <h3>{pages?.[page]?.name}</h3>
          {Object.keys(pages).map((page) => (
            <>
              <div key={page}>{`Question: ${pages?.[page].name}`}</div>
              {/* 
              {Object.keys(page).map((answer) => {
                <div key={page}>{`Answer: ${answer}`}</div>;
              })} */}
            </>
          ))}
        </div>
      ))}
    </StyledSurveyView>
  );
};

export default SurveyView;
