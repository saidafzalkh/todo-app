import { Card } from "./ui/card";
import { ScaleLoader } from "react-spinners";

export default function Loading() {
  return (
    <Card className="h-[250px] flex items-center justify-center">
      <ScaleLoader color="#00B0FF" />
    </Card>
  );
}
