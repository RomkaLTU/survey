import { CheckIcon } from '@heroicons/react/20/solid'
import { StepItemAttributes } from "@/types/StepItemAttributes";
import Link from "next/link";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type Props = {
  surveyId: string;
  currentStep: string;
  items: StepItemAttributes[];
}

export default function ProgressBar({ currentStep, items, surveyId }: Props) {
  const currentStepNumber = parseInt(currentStep, 10);

  const renderStepItem = (step: StepItemAttributes, index: number) => {
    const stepNumber = index + 1;
    const isCompleted = stepNumber < currentStepNumber;
    const isCurrent = stepNumber === currentStepNumber;

    return (
        <li key={step.name} className={classNames(index !== items.length - 1 ? 'pr-8 sm:pr-20' : '', 'relative')}>
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className={classNames(
                "h-0.5 w-full",
                stepNumber <= currentStepNumber ? "bg-indigo-600" : "bg-gray-200"
            )}/>
          </div>
          <Link
              href={`/surveys/${surveyId}/${stepNumber}`}
              className={classNames(
                  "relative flex h-8 w-8 items-center justify-center rounded-full",
                  isCompleted ? "bg-indigo-600 hover:bg-indigo-900" :
                      isCurrent ? "border-2 border-indigo-600 bg-white" :
                          "border-2 border-gray-300 bg-white hover:border-gray-400"
              )}
              aria-current={isCurrent ? "step" : undefined}
          >
            {isCompleted ? (
                <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
            ) : isCurrent ? (
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" aria-hidden="true" />
            ) : (
                <span
                    className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                    aria-hidden="true"
                />
            )}
            <span className="sr-only">{step.name}</span>
          </Link>
        </li>
    );
  }

  return (
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center">
          {items.map((item, index) => renderStepItem(item, index))}
        </ol>
      </nav>
  )
}