import { reinstatementResponsibleStatus } from '@/shared/common/reinstatement-responsible-status'
import { FilterChip } from '@/shared/ui/customs/filtered-chip/filter-chip'
import { Stack } from '@mui/material'
import { useTranslations } from 'next-intl';
import React from 'react'

function StatusFilter({handleChange,filterQuery, setFilterQuery}:any) {
    const t = useTranslations();
  return (
    <Stack direction={"row"} height={"40px"} alignContent={"center"} gap={2} display={{ xs: "none", sm: "flex" }}>
            <FilterChip
              identifier="filter-status-page-reinstatement"
              translate
              WithoutCheckbox
              label={t("reinstatementResponsiblesListPage.status")}
              name="status"
              options={reinstatementResponsibleStatus || []}
              handleChangeValue={handleChange}
              value={filterQuery.is_active}
            />
          </Stack>
  )
}

export default StatusFilter