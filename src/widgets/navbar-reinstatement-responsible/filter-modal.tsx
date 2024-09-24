import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ArrowDropDown, ArrowDropUp, Cancel } from "@mui/icons-material";
import theme from "@/shared/theme/theme";
import { getHeadquatersList } from "@/shared/common/get-headquaters-list";
import CustomModal from "@/shared/ui/custom-modal";
import { reinstatementResponsibleStatus } from "@/shared/common/reinstatement-responsible-status";
import { AutocompleteFilter } from "@/shared/ui/autocomplete-filter";

type FilterModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setFilterQuery: (query: ReinstatementResponsibleFilterQuery) => void;
  filterQuery: ReinstatementResponsibleFilterQuery;
  identifier: string;
};

const FilterModal: React.FC<FilterModalProps> = ({
  open,
  setOpen,
  filterQuery,
  setFilterQuery,
  identifier,
}) => {
  const t = useTranslations();
  const [filter, setFilter] =
    useState<ReinstatementResponsibleFilterQuery>(filterQuery);
  const [openSelect, setOpenSelect] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const headquatersList = getHeadquatersList();

  useEffect(() => {
    if (!isMobile) setOpen(false);
  }, [isMobile]);
  useEffect(() => {
    setFilter(filterQuery);
  }, [open]);
  const handleFilterData = () => {
    if (
      filter.headquarters.length !== filterQuery.headquarters.length ||
      filter.is_active !== filterQuery.is_active
    )
      setFilterQuery({
        ...filterQuery,
        headquarters: filter.headquarters,
        is_active: filter.is_active,
      });
    setOpen(false);
  };
  return (
    <CustomModal
      title={"filterModal.title"}
      open={open}
      onCancel={() => {
        setOpen(false);
      }}
      saveButtonText="filterModal.apply"
      saveButtonLoading={false}
      onSave={handleFilterData}
      identifier={`filter-custom-modal-${identifier}`}
    >
      <Stack gap={2}>
        <FormControl
          size="small"
          fullWidth
          data-test-id={`form-control-status-${identifier}`}
        >
          <InputLabel
            size="small"
            id="demo-simple-select-label"
            data-test-id={`input-label-status-${identifier}`}
          >
            {t("filterModal.status")}
          </InputLabel>
          <Select
            size="small"
            className="filtered-select"
            data-test-id={`select-status-${identifier}`}
            label={t("filterModal.status")}
            color="primary"
            value={filter.is_active}
            onChange={(e) => {
              setFilter({ ...filter, is_active: e.target.value });
            }}
            sx={{ pr: 1 }}
            open={openSelect}
            onClose={() => setOpenSelect(false)}
            onOpen={() => setOpenSelect(true)}
            IconComponent={() =>
              filter.is_active ? (
                <Cancel
                  data-test-id={`cancel-button-status-${identifier}`}
                  component="svg"
                  onClick={
                    filter.is_active
                      ? () => setFilter({ ...filter, is_active: "" })
                      : undefined
                  }
                  className="filterchip-arrow-cancel-button"
                  sx={{
                    color: "var(--secondary-600) !important",
                    cursor: "pointer",
                  }}
                />
              ) : openSelect ? (
                <ArrowDropUp
                  data-test-id={`arrow-dropup-button-status-${identifier}`}
                  className="filterchip-arrow-icon"
                  sx={{
                    color: "var(--secondary-600) !important",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpenSelect(!openSelect)}
                />
              ) : (
                <ArrowDropDown
                  data-test-id={`arrow-dropdown-button-status-${identifier}`}
                  className="filterchip-arrow-icon"
                  sx={{
                    color: "var(--secondary-600) !important",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpenSelect(!openSelect)}
                />
              )
            }
          >
            {reinstatementResponsibleStatus.map((item) => (
              <MenuItem
                data-test-id={`menu-item-status-${item.value}-${identifier}`}
                key={item.value}
                value={item.value}
                disableRipple
                sx={{
                  width: "100%",
                  minHeight: "44px !important",
                  color: "var(--secondary-800)",
                }}
              >
                <Typography
                  data-test-id={`menu-item-txt-status-${item.value}-${identifier}`}
                  variant="paragraphMd"
                  color={"secondary.800"}
                >
                  {t(item.label)}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <AutocompleteFilter
          identifier={`autocompletefilter-destop-${identifier}`}
          filterOption={{
            option: headquatersList || [],
            label: t("filterModal.headquarter"),
          }}
          multiple
          value={filter.headquarters}
          handleFilterData={(value) =>
            setFilter({ ...filter, headquarters: value as string[] })
          }
        />
      </Stack>
    </CustomModal>
  );
};

export default FilterModal;
