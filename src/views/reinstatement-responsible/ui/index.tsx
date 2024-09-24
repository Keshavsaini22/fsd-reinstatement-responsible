'use client'
import RegisterReinstatementResponsible from '@/features/reinstatement-responsible/register-reinstatement-responsible/ui';
import { Box, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

function ReinstatementResponsiblePage() {
  const t = useTranslations();
  const [filterQuery, setFilterQuery] = useState<ReinstatementResponsibleFilterQuery>({
    headquarters: [],
    is_active: "",
    search: "",
  });
  return (
    <Box>
      <Stack justifyContent={"space-between"} direction={"row"} gap={1}>
        <Typography variant="titleLg" fontWeight="medium" data-test-id="title-page-reinstatement">
          {t("reinstatementResponsiblesListPage.title")}
        </Typography>
        <RegisterReinstatementResponsible setFilterQuery={setFilterQuery} identifier="responsibleform-create" />
      </Stack>
    </Box>
  )
}

export default ReinstatementResponsiblePage