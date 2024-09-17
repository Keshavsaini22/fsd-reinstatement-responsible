import React from "react";
import { SelectProps } from "@mui/material/Select";
import { FormControlProps } from "@mui/material";
import {
  FormHelperText,
  ThemeProvider,
  createTheme,
  styled,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import theme from "@/shared/theme/theme";

/**
 * Custom Select component with customizable options.
 *
 * @param {object[]} OptionsArray - An array of objects containing value-key pairs for select options.
 * @param {string} inputLabel - The label for the select input.
 * @param {object} props - Additional props for the Select component.
 *
 * Usage:
 *
 * // Import the component
 * import { SelectMenu } from './SelectMenu';
 *
 * // Inside a component, use the SelectMenu component
 * <SelectMenu
 *     OptionsArray={[{ value: '1', key: 'Option 1' }, { value: '2', key: 'Option 2' }]}
 *     inputLabelText="Select"
 *     key={selectedkey}
 *     onChange={handleChange}
 * />
 */
interface OptionWithoutIconProps {
  value: string;
  key: string;
}
interface OptionWithIconProps {
  value: string;
  key: string;
  icon: React.ReactNode;
}
/**
 * Props interface for the CustomSelect component.
 */
export interface CustomSelectProps {
  /**
   * Array of options for the select component.
   */
  OptionsArray?: (OptionWithoutIconProps | OptionWithIconProps)[];

  /**
   * Helper text to be displayed below the select component.
   */
  HelperText?: string;

  /**
   * Label text for the input of the select component.
   */
  InputLabelText?: string;
  /**
   * Props for the form control of the select component.
   */
  FormControlProps?: FormControlProps;
}

export const CustomizedMuiButton = styled(Select)<CustomSelectProps>(({ color, theme }) => ({
  borderColor: theme.palette[color || "primary"]?.main || theme.palette.primary.main,
}));
export const SelectMenu: React.FC<SelectProps & CustomSelectProps> = ({
  OptionsArray,
  InputLabelText,
  HelperText,
  FormControlProps,
  ...props
}) => (
  <ThemeProvider theme={theme}>
    <FormControl
      {...FormControlProps}
      size={props.size === "small" ? "small" : "medium"}
      variant={
        props.variant === "filled"
          ? "filled"
          : props.variant === "outlined"
          ? "outlined"
          : props.variant === "standard"
          ? "standard"
          : undefined
      }
      error={props.error}
      fullWidth
    >
      {InputLabelText && (
        <InputLabel
          sx={{
            "&.Mui-focused": {
              color: props.error ? theme.palette.error.main : theme.palette[props.color || "primary"].main,
            },
          }}
        >
          {InputLabelText}
        </InputLabel>
      )}
      <Select
        SelectDisplayProps={{
          style: {
            display: "flex",
          },
        }}
        MenuProps={{ elevation: 2 }}
        label={InputLabelText}
        {...props}
      >
        {OptionsArray?.map((option, index) => (
          <MenuItem key={index} value={option.value} disabled={props.value === option.value}>
            <> {"icon" in option && <>{option.icon}</>}</>
            <>{option.key}</>
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{HelperText}</FormHelperText>
    </FormControl>
  </ThemeProvider>
);
