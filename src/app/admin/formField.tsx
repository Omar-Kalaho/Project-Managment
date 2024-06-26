import React, { ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormFieldProps {
    label: string;
    name: string;
    placeholder: string;
    type?: string;
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void; // Add onChange prop
}

const FormField: React.FC<FormFieldProps> = (props) => {
    const { label, name, placeholder, type = "text", value, onChange } = props; // Destructure onChange prop

    return (
        <div className="md:col-span-3">
            <Label htmlFor={name}>{label}</Label>
            <Input
                type={type}
                name={name}
                id={name}
                className="h-10 border mt-1 rounded px-4 w-full "
                placeholder={placeholder}
                value={value}
                onChange={onChange} // Pass onChange prop to Input component
            />
        </div>
    );
};

export default FormField;
