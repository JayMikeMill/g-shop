import { useFormContext } from "react-hook-form";

const OrderNotesForm: React.FC = () => {
  const { register } = useFormContext();
  return (
    <textarea
      {...register("notes")}
      className="border rounded px-2 py-1 w-full h-24"
    />
  );
};

export default OrderNotesForm;
