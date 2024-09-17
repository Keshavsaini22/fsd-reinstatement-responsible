import { Checkbox, TextField, Autocomplete, ListItem, Typography, Chip } from "@mui/material";
import { CheckBoxOutlineBlank, CheckBox, Search, ArrowDropDown, Cancel, Done, ArrowDropUp } from "@mui/icons-material";
import { Fragment, createRef, useEffect, useRef, useState } from "react";
import styles from "./autocomplete-filter.module.scss";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { PopoverComponent } from "../customs/popover";

interface AutocompleteFilter {
  filterOption: { option: SelectChipOption[]; label: string };
  multiple?: boolean;
  value: string[];
  handleFilterData: (value: string | string[]) => void;
  identifier: string;
}

export const AutocompleteFilter = ({
  identifier,
  filterOption,
  handleFilterData,
  multiple,
  value,
}: AutocompleteFilter) => {
  const t = useTranslations();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [filterLabels, setFilterLabels] = useState("");
  const [searchString, setSearchString] = useState("");
  const chipRef = createRef<HTMLDivElement>();
  const autocompleteRef = useRef<HTMLInputElement>(null);
  const [selectedValue, setSelectedValue] = useState<SelectChipOption[]>(() => {
    if (value.length > 0) {
      return filterOption.option.filter(item => value.includes(item.value));
    } else {
      return [];
    }
  });
  const open = Boolean(anchorEl);
  const [height, setHeight] = useState("65px");

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(chipRef.current);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleInputChange = (event: any) => {
    setSearchString(event.target.value);
  };
  useEffect(() => {
    if (value.length === 0 && selectedValue.length > 0) {
      setSelectedValue([]);
    }
    if (value.length > 0 && selectedValue.length === 0) {
      setSelectedValue(filterOption.option.filter(item => value.includes(item.value)));
    }
  }, [value]);
  useEffect(() => {
    const labelsArray = selectedValue && selectedValue?.map((obj: any) => obj?.label);
    selectedValue?.length > 2
      ? setFilterLabels(`${selectedValue?.length} ${t("selected")}`)
      : selectedValue?.length === 0
      ? setFilterLabels(filterOption?.label)
      : setFilterLabels(labelsArray?.join(", "));
    if (!(value.length === 0 && selectedValue.length === 0)) handleFilterData(selectedValue.map(item => item.value));
  }, [selectedValue]);

  const paperRef = useRef<any>(null);
  const NoOptionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateHeight = () => {
      if (searchString) {
        const filteredOptions = filterOption.option.filter(option =>
          option.label.toLowerCase().includes(searchString.toLowerCase())
        );
        return filteredOptions.length > 0
          ? `${64 + filteredOptions.length * 45}px !important`
          : `${(NoOptionsRef?.current?.offsetHeight || 0) + 80}px !important`;
      }
      return filterOption.option.length > 0
        ? `${64 + filterOption.option.length * 45}px !important`
        : `${(NoOptionsRef?.current?.offsetHeight || 0) + 80}px !important`;
    };
    setHeight(calculateHeight);
  }, [filterOption, searchString]);

  useEffect(() => {
    if (paperRef.current) {
      paperRef.current.style.height = height;
    }
  }, [height]);

  return (
    <>
      <Chip
        data-test-id={`chip-${identifier}`}
        className={clsx(styles["filter-chip"], {
          [styles["selected"]]: selectedValue?.length > 0,
        })}
        ref={chipRef}
        clickable={false}
        label={
          <Typography data-test-id={`chip-label-${identifier}`} noWrap textOverflow="ellipsis">
            {filterLabels ? filterLabels : filterOption.label}
          </Typography>
        }
        icon={
          selectedValue?.length > 0 ? (
            <Done data-test-id={`icon-done-${identifier}`} className={styles["svg-icon"]} />
          ) : undefined
        }
        onClick={handlePopoverOpen}
        deleteIcon={
          selectedValue?.length > 0 ? (
            <Cancel
              data-test-id={`icon-cancel-${identifier}`}
              className={`${styles["deleteicon"]} ${styles["svg-icon"]}`}
              sx={{ fontSize: "16px" }}
            />
          ) : !anchorEl ? (
            <ArrowDropDown data-test-id={`icon-arrowdown-${identifier}`} className={styles["svg-icon"]} />
          ) : (
            <ArrowDropUp data-test-id={`icon-arrowup-${identifier}`} className={styles["svg-icon"]} />
          )
        }
        onDelete={selectedValue?.length > 0 ? () => setSelectedValue([]) : handlePopoverOpen}
        size="medium"
      />
      <PopoverComponent
        identifier={`autocompletepopover-${identifier}`}
        onClose={handlePopoverClose}
        open={open}
        className={styles["auto-complete-popper"]}
        anchorEl={anchorEl}
        inputRef={autocompleteRef}
      >
        <Autocomplete
          open
          disableClearable
          onClose={() => setSearchString("")}
          disablePortal
          disableListWrap={true}
          forcePopupIcon={false}
          data-test-id={`autocomplete-${identifier}`}
          noOptionsText={
            <Typography
              data-test-id={`no-options-${identifier}`}
              component="span"
              ref={NoOptionsRef}
              variant="paragraphMd"
            >
              {t("select.noOptions")}
            </Typography>
          }
          multiple={multiple || false}
          className={styles["autocomplete-filter"]}
          options={filterOption.option}
          sx={{
            height: height,
            maxHeight: "300px !important",
          }}
          slotProps={{
            paper: {
              ref: paperRef,
            },
          }}
          value={selectedValue}
          inputValue={searchString}
          disableCloseOnSelect
          isOptionEqualToValue={(option: SelectChipOption, value: SelectChipOption) =>
            option.value === (value.value || null)
          }
          getOptionLabel={(option: SelectChipOption) => option.label}
          onChange={(_, newValue) => setSelectedValue(newValue as SelectChipOption[])}
          renderOption={(props, option, { selected }) => (
            <ListItem
              data-test-id={`list-item-${option.value}-${identifier}`}
              {...props}
              className={clsx("cursor-pointer", styles["autocomplete-list-item"])}
              key={option.value}
            >
              <Checkbox
                data-test-id={`checkbox-${option.value}-${identifier}`}
                icon={<CheckBoxOutlineBlank fontSize="small" />}
                checkedIcon={<CheckBox fontSize="small" />}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option?.label}
            </ListItem>
          )}
          renderTags={() => null}
          ListboxProps={{
            className: styles["list-box-styles"],
          }}
          renderInput={params => (
            <TextField
              data-test-id={`textfield-${identifier}`}
              className={styles["mui-textfield"]}
              inputRef={autocompleteRef}
              {...params}
              placeholder={filterOption?.label}
              InputProps={{
                onChange: e => {
                  handleInputChange(e);
                },
                ...params.InputProps,
                endAdornment: (
                  <Fragment data-test-id={`end-adornment-${identifier}`}>{params.InputProps.endAdornment}</Fragment>
                ),
                startAdornment: <Search data-test-id={`start-adornment-${identifier}`} />,
              }}
            />
          )}
        />
      </PopoverComponent>
    </>
  );
};
