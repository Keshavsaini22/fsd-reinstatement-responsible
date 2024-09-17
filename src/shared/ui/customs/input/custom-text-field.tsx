import React from "react";
import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface CustomTextFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
  required?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  inputType?: "text" | "number"; // Allow customization of input type
  multiline?: boolean;
  disabled?: boolean;
  identifier: string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  required,
  inputType = "text",
  control,
  label,
  name,
  placeholder,
  inputProps,
  multiline = false,
  disabled,
  identifier,
}) => {
  const helperTextValue = required ? "" : "Optional";
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          data-test-id={`customtextfield-${identifier}`}
          disabled={disabled}
          {...field}
          value={String(field.value)}
          label={label}
          placeholder={placeholder}
          variant="outlined"
          fullWidth
          margin="normal"
          size="small"
          multiline={multiline}
          rows={multiline ? 4 : 1}
          inputProps={{
            ...inputProps,
            type: inputType === "number" ? "tel" : inputType,
          }}
          error={!!error}
          helperText={!!error ? error?.message : helperTextValue}
        ></TextField>
      )}
    />
  );
};

export default CustomTextField;
