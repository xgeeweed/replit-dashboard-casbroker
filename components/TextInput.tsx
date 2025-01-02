import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  placeholder?: string;
  field: any;
}

function TextInput(props: TextInputProps) {
  return (
    <FormItem>
      {props.label && <FormLabel>{props.label}</FormLabel>}
      <FormControl>
        <Input className="bg-zinc-50 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600" {...props} {...props.field} />
      </FormControl>
      {props.description && <FormDescription>{props.description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}

export { TextInput };
