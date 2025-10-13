import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@components/ui";

const OrderStatusHistoryForm: React.FC = () => {
  const { control, register } = useFormContext();
  const { fields, append, update } = useFieldArray({
    control,
    name: "statusHistory",
  });

  return (
    <div className="flex flex-col gap-2">
      {fields.map((h, idx) => (
        <div key={h.id || idx} className="flex gap-2 items-center">
          <select
            {...register(`statusHistory.${idx}.status`)}
            className="border rounded px-2 py-1"
          >
            {/* Status options */}
          </select>
          <input
            type="datetime-local"
            {...register(`statusHistory.${idx}.timestamp`)}
            className="border rounded px-2 py-1"
          />
        </div>
      ))}
      <Button
        type="button"
        onClick={() =>
          append({ status: "PENDING", timestamp: new Date().toISOString() })
        }
      >
        Add Status
      </Button>
    </div>
  );
};

export default OrderStatusHistoryForm;
