"use client";
import RegisterReinstatementResponsible from "@/features/reinstatement-responsible/register-reinstatement-responsible/ui";
import NavbarReinstatementResponsible from "@/widgets/navbar-reinstatement-responsible";
import { Box, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

function ReinstatementResponsiblePage() {
  const t = useTranslations();
  const handleChange = ({ name, value }: SelectChipOnChange) => {
    if (name === "headquarters") {
      setFilterQuery({
        ...filterQuery,
        headquarters: typeof value === "string" ? [value] : value,
      });
    } else if (name === "status") {
      setFilterQuery({ ...filterQuery, is_active: value as string });
    } else if (name === "search") {
      setFilterQuery({ ...filterQuery, search: value as string });
    }
  };
  const [filterQuery, setFilterQuery] =
    useState<ReinstatementResponsibleFilterQuery>({
      headquarters: [],
      is_active: "",
      search: "",
    });
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <Box sx={{ height: "100%" }} className="flex flex-col">
      <Stack justifyContent={"space-between"} direction={"row"} gap={1}>
        <Typography
          variant="titleLg"
          fontWeight="medium"
          data-test-id="title-page-reinstatement"
        >
          {t("reinstatementResponsiblesListPage.title")}
        </Typography>
        <RegisterReinstatementResponsible
          setFilterQuery={setFilterQuery}
          identifier="responsibleform-create"
        />
      </Stack>
      <Box
        data-test-id="main-container-page-reinstatement"
        sx={{
          overflow: "hidden",
          width: "100%",
          gap: { xs: 0, sm: 3 },
          backgroundColor: "white",
          p: { sm: 3, xs: 2 },
          mt: { sm: 3, xs: 2 },
          borderRadius: "4px",
          height: "100%",
        }}
        className="flex flex-col"
      >
        <NavbarReinstatementResponsible
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          handleChange={handleChange}
          filterQuery={filterQuery}
          setFilterQuery={setFilterQuery}
        />
      </Box>
    </Box>
  );
}

export default ReinstatementResponsiblePage;
