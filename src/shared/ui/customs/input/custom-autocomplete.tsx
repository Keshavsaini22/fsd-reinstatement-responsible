import { Autocomplete, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";
import { Control, Controller } from "react-hook-form";

type CustomAutocompleteProps = {
  name: string;
  label: string;
  control: Control<any, any>;
  options: SelectChipOption[];
  onInputChange?: (event: React.ChangeEvent<{}>, value: string) => void;
  helperText?: string;
  required?: boolean;
  defaultValue?: string[];
  identifier: string;
};

const CustomAutocomplete = ({
  name,
  label,
  control,
  options,
  onInputChange,
  helperText,
  required,
  defaultValue,
  identifier,
}: CustomAutocompleteProps) => {
  const t = useTranslations();
  const helperTextValue = helperText ? helperText : required ? t("optional") : undefined;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, value, ...field }, fieldState: { error } }) => (
        <Autocomplete
          data-test-id={`autocomplete-select-${identifier}`}
          disablePortal
          id={name}
          disableClearable
          sx={{
            width: "100%",
            "& .MuiAutocomplete-option": {
              fontSize: "14px",
              lineHeight: "20px",
            },
            "& .MuiAutocomplete-select.noOptions": {
              fontSize: "14px",
              lineHeight: "20px",
            },
            "& .MuiFormControl-root": {
              "& legend": {
                fontSize: "10px",
              },
            },
          }}
          options={options}
          renderOption={(props, option, { selected }) => (
            <li {...props} data-test-id={`autocomplete-option-${identifier}-${option.value}`} key={option.value}>
              {option.label}
            </li>
          )}
          value={value}
          onChange={(event, value) => field.onChange(value ?? { label: "", value: "" })}
          onInputChange={onInputChange}
          noOptionsText={t("select.noOptions")}
          closeText=""
          openText=""
          clearText=""
          renderInput={params => (
            <TextField
              data-test-id={`autocompletetextfield-display-${identifier}`}
              error={!!error}
              helperText={!!error ? error?.message : helperTextValue}
              {...params}
              label={label}
              variant="outlined"
              margin="normal"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused": {
                    "& fieldset": {
                      borderColor: error ? "var(--error)" : "var(--primary-900)",
                    },
                  },
                },
                "& .MuiInputLabel-root": {
                  fontSize: "14px",
                  lineHeight: "20px",
                  "&.Mui-focused": {
                    color: error ? "var(--error)" : "var(--primary-900)",
                  },
                },
              }}
              inputRef={ref}
            />
          )}
        />
      )}
    />
  );
};

export default CustomAutocomplete;
