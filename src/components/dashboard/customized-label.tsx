import { LabelProps } from "recharts";

export const CustomizedLabel = ({ y = 0, value }: LabelProps) => {
  return (
    <text
      x={45}
      y={Number(y) - 3}
      fill="#000000"
      fontSize={12}
      textAnchor="start"
      dominantBaseline="bottom">
      {value}
    </text>
  );
};
