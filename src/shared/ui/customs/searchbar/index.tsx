import React, { useState, ChangeEvent, useEffect } from "react";
import { InputBase, alpha, styled } from "@mui/material";
import { InputBaseProps } from "@mui/material/InputBase";
import { Clear as ClearIcon, Search as SearchIcon } from "@mui/icons-material";

interface SearchBarProps extends Omit<InputBaseProps, "onChange"> {
  /**
   * The delay in milliseconds before triggering the search after user input.
   */
  delay?: number;

  /**
   * Flag to determine whether to display a clear icon.
   */
  withClearIcon?: boolean;

  /**
   * Additional properties for the clear icon.
   */
  clearIconProps?: {
    /**
     * Custom styles for the clear icon.
     */
    action?: () => void;
    sx?: React.CSSProperties;
  };

  /**
   * Additional properties for the search icon.
   */
  searchIconProps?: {
    /**
     * Custom styles for the search icon.
     */
    sx?: React.CSSProperties;
  };

  /**
   * The width of the search bar.
   */
  width?: string | { sm: string; xs: string };

  /**
   * React node representing an action icon.
   */
  actionIcon?: JSX.Element;

  /**
   * Event handler triggered when the search term changes.
   * @param event - The change event.
   * @param value - The new value of the search input.
   */
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: string) => void;

  hookValue?: string;

  identifier: string;
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "auto",
  display: "flex",
  alignItems: "center",
  border: "1px solid #9e9e9e",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: "0 10px",
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ClearIconWrapper = styled("div")(({ theme }) => ({
  padding: "0 10px",
  height: "100%",
  position: "absolute",
  display: "flex",
  right: 0,
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    fontSize: "14px",
    color: "var(--secondary-600)",
    lineHeight: "20px",
    padding: "8px 8px 8px 0",
    paddingLeft: `calc(1em + 24px)`,
    paddingRight: `calc(1em + 24px)`,
    transition: theme.transitions.create("width"),
    "&:placeholder": {
      color: "var(--secondary-600)",
    },
  },
}));

const SearchBar: React.FC<SearchBarProps> = ({
  delay = 0,
  clearIconProps,
  searchIconProps,
  withClearIcon,
  width,
  actionIcon,
  onChange,
  hookValue,
  identifier,
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    if (delay) {
      const newTimeoutId = window.setTimeout(() => {
        if (onChange) {
          onChange(event, value);
        }
      }, delay);
      setTimeoutId(newTimeoutId);
    } else {
      if (onChange) {
        onChange(event, value);
      }
    }
  };

  const handleClear = () => {
    if (clearIconProps?.action) {
      clearIconProps?.action();
    }
    setSearchTerm("");
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
  };

  useEffect(() => {
    if (hookValue?.trim() === "") handleClear();
  }, [hookValue]);

  return (
    <Search sx={{ width: width ? width : "100%" }}>
      <SearchIconWrapper>
        <SearchIcon
          sx={{
            ...searchIconProps?.sx,
            height: "20px",
            width: "20px",
            cursor: "pointer",
          }}
          data-test-id={`icon-search-${identifier}`}
        />
      </SearchIconWrapper>
      <StyledInputBase
        data-test-id={`input-search-${identifier}`}
        value={searchTerm}
        onChange={handleInput}
        size="small"
        fullWidth
        {...props}
      />
      <ClearIconWrapper data-test-id={`icon-clear-wrapper-${identifier}`}>
        {withClearIcon && searchTerm !== "" && (
          <ClearIcon
            data-test-id={`icon-clear-${identifier}`}
            className="clear-icon"
            onClick={handleClear}
            htmlColor="var(--secondary-800)"
            sx={{
              ...clearIconProps?.sx,
              height: "20px",
              width: "20px",
              cursor: "pointer",
            }}
          />
        )}
        {actionIcon && searchTerm === "" && actionIcon}
      </ClearIconWrapper>
    </Search>
  );
};

export { SearchBar };
