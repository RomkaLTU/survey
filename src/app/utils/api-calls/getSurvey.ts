import process from "node:process";
import {notFound} from "next/navigation";
import {StepItemAttributes} from "@/types/StepItemAttributes";

type Response = {
  data: {
    id: string;
    attributes: {
        title: string;
        items: StepItemAttributes[];
    }
  }
}

export default async function getSurvey(id: string): Promise<Response> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}/surveys/${id}`);
  const res = await fetch(url.href, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if ([401, 403, 404].includes(res.status)) {
    notFound();
  }

  return res.json();
}