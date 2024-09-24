import { getHeadquatersList } from "@/shared/common/get-headquaters-list";
import { FilterChip } from "@/shared/ui/customs/filtered-chip/filter-chip";
import { Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";

function HeadquaterFilter({ handleChange, filterQuery, setFilterQuery }: any) {
  const t = useTranslations();
  const headquatersList = getHeadquatersList();

  return (
    <Stack
      direction={"row"}
      height={"40px"}
      alignContent={"center"}
      gap={2}
      display={{ xs: "none", sm: "flex" }}
    >
      <FilterChip
        identifier="filter-headquarter-page-reinstatement"
        multiple
        label={t("reinstatementResponsiblesListPage.headquarter")}
        autoComplete
        name="headquarters"
        options={headquatersList || []}
        handleChangeValue={handleChange}
        value={filterQuery.headquarters}
      />
    </Stack>
  );
}

export default HeadquaterFilter;
