import React from "react";
import { Survey } from "../types";
import { StyledSurveyView } from "../styled";

type SurveyViewProps = {
  survey?: Survey;
};

const SurveyView: React.FC<SurveyViewProps> = (props) => {
  const { survey } = props;

  const content = survey?.content;
  const pages = content?.surveyPages;

  return survey ? (
    <StyledSurveyView>
      s: {survey.name}
      {Object.keys(pages ?? {}).map((page) => (
        <div key={page}>
          <h3>{pages?.[page]?.name}</h3>
          {Object.keys(pages?.[page]?.questions ?? {}).map((question) => (
            <>
              <div key={question}>{`q: ${
                pages?.[page]?.questions[parseInt(question)].question
              }`}</div>

              {/*       {Object.keys(pages?.[page].questions ?? {}).map((question) => {
                <div key={page}>{`q: ${question}`}</div>; 
              })}*/}
            </>
          ))}
        </div>
      ))}
    </StyledSurveyView>
  ) : (
    ""
  );
};

export default SurveyView;
