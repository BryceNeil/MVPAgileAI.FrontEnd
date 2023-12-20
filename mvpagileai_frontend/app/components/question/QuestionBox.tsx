"use client"
import ProblemBlock from './blocks/ProblemBlock'
import { useCase} from '@/app/props/CaseProvider'
import RubricBlock from './blocks/RubricBlock';
import FrameworkBlock from './blocks/FrameworkBlock';
import { useLoader } from '@/app/props/LoadProvider';
import Loader from '../Loader';




const QuestionBox = ({
}) => {
  const { setCurrentQuestionIndex, caseData, selectedView, setSelectedView} = useCase();
  const { isLoading } = useLoader();

  if (caseData){
    return (
      <div className="bg-white dark:bg-darkgray rounded-lg flex flex-col relative flex-grow mt-4 px-4 h-full">
        {selectedView === 'problem' && <ProblemBlock currentCase={caseData} />}
        {selectedView === 'rubric' && <RubricBlock />}
        {selectedView === 'framework' && <FrameworkBlock currentCase={caseData}/>}
      </div>
    );
    } else{
      return(
        <div className="bg-white dark:bg-darkgray text-black rounded-lg flex flex-col relative flex-grow mt-4 px-4 h-full">
          
          {isLoading ? (
            <div className="flex flex-col w-full pt-60 h-[60%] items-center">
              <Loader size={60}/>
              <div className="mt-20">
                Please wait while our models customize question for your needs
              </div>
              <div className="text-sm">
                This may take a moment
              </div>
            </div>
            ) : (
            <div className="flex flex-col w-full h-full items-center">
              <div className="flex flex-row items-center mt-24">
                Type ⌘ + J to search job title
              </div>
              <div className="text-sm">
                Our models will generate problems for you
              </div>
            </div>
          )}
        </div>
      )
    }
};

export default QuestionBox;
