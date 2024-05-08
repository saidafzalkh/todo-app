import { ScaleLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="h-[350px] flex items-center justify-center">
      <ScaleLoader color="#00B0FF" />
    </div>
  );
}
