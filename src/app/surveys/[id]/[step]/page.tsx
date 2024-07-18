import getSurvey from "@/app/utils/api-calls/getSurvey";
import ProgressBar from "@/app/components/progress-bar";
import StepContent from "@/app/components/step-content";

type Props = {
  params: {
    step: string;
    id: string;
  }
}

export default async function PollStep({ params }: Props) {
  const { data: survey } = await getSurvey(params.id);
  const itemIndex = parseInt(params.step) - 1;
  const stepItem = survey.attributes.items[itemIndex];

  return (
      <div className="flex flex-col gap-8 justify-center items-center pt-16">
        <div>
          <h3 className="text-2xl max-w-md text-center">{survey.attributes.title}</h3>
        </div>
        <ProgressBar
          surveyId={params.id}
          currentStep={params.step}
          items={survey.attributes.items}
        />
        <div>
          <StepContent item={stepItem} />
        </div>
      </div>
  );
}
