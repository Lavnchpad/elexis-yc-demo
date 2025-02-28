import {  FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const InputFormField = ({ mandatory, name, disabled = false, control, placeholder, label, type, className, min, max, ...props }) => {
    return (
        <FormField control={control} name={name} render={({ field }) => (
            <FormItem className={className}>
                <FormLabel className="w-[50%]">{label} {mandatory !== false ? <span className="text-red-500">*</span> : ""}</FormLabel>
                <FormControl>
                    <Input
                        disabled={disabled}
                        type={type}
                        placeholder={placeholder}
                        {...field}
                        min={min}
                        max={max}
                        {...props}
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}>
        </FormField>
    )
}

export default InputFormField
