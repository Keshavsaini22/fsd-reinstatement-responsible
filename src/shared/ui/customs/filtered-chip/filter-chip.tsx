import { Box, ButtonBase, Checkbox, FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { ArrowDropDown, ArrowDropUp, Cancel, Done } from "@mui/icons-material";
import { MouseEvent, useState } from "react";
import Badge from "@mui/material/Badge";
import "./styles.css";
import { useTranslations } from "next-intl";
import { AutocompleteFilter } from "../../autocomplete-filter";
import { getOptionsMap } from "@/shared/common/options-maps";

type FilterChipProps = {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  handleChangeValue: ({ name, value }: SelectChipOnChange) => void;
  value: string[] | string;
  WithoutCheckbox?: boolean;
  multiple?: boolean;
  translate?: boolean;
  autoComplete?: boolean;
  identifier?: string;
};

export const FilterChip = ({
  label,
  options,
  name,
  handleChangeValue,
  value,
  WithoutCheckbox,
  multiple,
  translate,
  autoComplete,
  identifier,
}: FilterChipProps) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const statusMap = getOptionsMap(options);
  const handleClear = () => {
    handleChangeValue({ name, value: !multiple ? "" : [] });
  };
  const handleChange = (event: SelectChangeEvent<string[] | string>) => {
    const selectedValue: string[] | string =
      typeof event.target.value === "string" && multiple ? event.target.value.split(",") : event.target.value;
    handleChangeValue({ name, value: selectedValue });
  };
  const handleAutoCompleteChange = (value: string[] | string) => {
    handleChangeValue({ name, value });
  };

  const renderValue = (values: string[] | string) => {
    const labels = statusMap.get(typeof value === "object" ? values[0] : value);

    if (!values.length)
      return (
        <Box data-test-id={`label-render-value-${identifier}`} sx={{ mt: 0.5, mb: 0.5, ml: 0.5 }}>
          {" "}
          {label}
        </Box>
      );
    if (typeof value === "string")
      return (
        typeof value === "string" && (
          <Box data-test-id={`label2-render-value-${identifier}`} sx={{ mt: 0.5, mb: 0.5, ml: 0.5 }}>
            {" "}
            {t(labels)}
          </Box>
        )
      );

    return (
      typeof value === "object" && (
        <Box sx={{ mt: 0.5, mb: 0.5, ml: 0.5 }} data-test-id={`label3-render-value-${identifier}`}>
          {translate ? t(labels) : labels}
          {values.length > 1 && (
            <Badge
              data-test-id={`badge-render-value-${identifier}`}
              badgeContent={`+${values.length - 1}`}
              color="primary"
              sx={{
                margin: "0px 5px 3px 20px",
                borderRadius: "0px",
                padding: "0px",
              }}
            />
          )}
        </Box>
      )
    );
  };
  const handleToggleSelect = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setOpen(!open);
    }
  };

  return (
    <FormControl sx={{ display: "block", alignSelf: "center", height: 32 }} data-test-id={`form-control-${identifier}`}>
      <ButtonBase
        className="filterchip-button-base"
        data-test-id={`filterchip-button-base-${identifier}`}
        sx={{ height: 32 }}
        disableRipple
      >
        {!autoComplete ? (
          <Select
            data-test-id={`filter-select-${identifier}`}
            className="filter-select"
            multiple={multiple}
            autoWidth
            open={open}
            onClick={handleToggleSelect}
            onOpen={() => setOpen(!open)}
            onClose={() => setOpen(!open)}
            value={value}
            onChange={handleChange}
            displayEmpty
            sx={{ height: 32 }}
            inputProps={{ "aria-label": "Without label" }}
            MenuProps={{
              sx: { borderRadius: 0.5, height: "500px" },
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
            }}
            IconComponent={() =>
              value.length ? (
                <Cancel
                  data-test-id={`filterchip-cancel-button-${identifier}`}
                  component="svg"
                  onClick={value.length ? handleClear : undefined}
                  className="filterchip-arrow-cancel-button"
                />
              ) : open ? (
                <ArrowDropUp
                  className="filterchip-arrow-icon"
                  data-test-id={`filterchip-arrowup-icon-${identifier}`}
                  onClick={() => setOpen(!open)}
                />
              ) : (
                <ArrowDropDown
                  className="filterchip-arrow-icon"
                  data-test-id={`filterchip-arrowdown-icon-${identifier}`}
                  onClick={() => setOpen(!open)}
                />
              )
            }
            startAdornment={
              value.length ? (
                <Done data-test-id={`filterchip-done-button-${identifier}`} className="filterchip-arrow-start-icon" />
              ) : null
            }
            renderValue={renderValue}
            style={{
              cursor: "pointer",
              backgroundColor: value.length ? "#e9f0fe" : "",
            }}
          >
            {options.map(item => (
              <MenuItem
                key={item.value}
                value={item.value}
                data-test-id={`filterchip-menu-item-${item.value}-${identifier}`}
                className="filterchip-menu-item"
                disableRipple
                sx={{
                  width: WithoutCheckbox ? "197px" : "320px",
                  minHeight: "44px !important",
                }}
              >
                {!WithoutCheckbox && (
                  <Checkbox
                    className="filterchip-menu-checkbox"
                    data-test-id={`filterchip-menu-checkbox-${item.value}-${identifier}`}
                    checked={value.indexOf(item.value) > -1}
                  />
                )}
                {translate ? t(item.label) : item.label}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <AutocompleteFilter
            identifier={`autocompletefilter-destop-${identifier}`}
            filterOption={{
              option: options || [],
              label: t("filterModal.headquarter"),
            }}
            multiple={multiple}
            value={value as string[]}
            handleFilterData={handleAutoCompleteChange}
          />
        )}
      </ButtonBase>
    </FormControl>
  );
};
