import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea as UITextarea } from "@/components/ui/textarea";

interface TextInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
  placeholder?: string;
  field: any;
}

function Textarea(props: TextInputProps) {
  return (
    <FormItem>
      {props.label && <FormLabel>{props.label}</FormLabel>}
      <FormControl>
        <UITextarea className="bg-zinc-50 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600" {...props} {...props.field} />
      </FormControl>
      {props.description && <FormDescription>{props.description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}

export { Textarea };
