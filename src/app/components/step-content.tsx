import {StepItemAttributes} from "@/types/StepItemAttributes";

type Props = {
    item: StepItemAttributes;
}

export default function StepContent(props: Props) {
  return (
    <div>
      <p className="font-medium text-lg">{props.item.question}</p>
    </div>
  );
}