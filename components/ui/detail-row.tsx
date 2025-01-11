
interface DetailRowProps {
  label: string;
  value: string | number;
  multiLine?: boolean;
}

export const DetailRow = ({ label, value, multiLine }: DetailRowProps) => (
  <div className={`py-2 ${multiLine ? "flex flex-col gap-2" : "flex justify-between items-center border-b border-gray-200"}`}>
    <span className="text-gray-600">{label}</span>
    <span className={multiLine ? "text-gray-600 -mt-2" : "font-medium"}>{value}</span>
  </div>
);
