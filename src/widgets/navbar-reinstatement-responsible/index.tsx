import HeadquaterFilter from "@/features/reinstatement-responsible/filters/headquater/ui";
import SearchBarFilter from "@/features/reinstatement-responsible/filters/searchbar/ui";
import StatusFilter from "@/features/reinstatement-responsible/filters/status/ui";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Badge, IconButton, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import FilterModal from "./filter-modal";

function NavbarReinstatementResponsible({
  filterQuery,
  setFilterQuery,
  handleChange,
  openFilter,
  setOpenFilter,
}: any) {
  const [isCearButtonDisable, setIsCearButtonDisable] = useState<number>(0);
  const handelClear = () => {
    if (isCearButtonDisable) {
      setFilterQuery({ headquarters: [], is_active: "", search: "" });
      setIsCearButtonDisable(0);
    }
  };
  const t = useTranslations();
  useEffect(() => {
    let count = 0;
    if (filterQuery.headquarters.length !== 0) count++;
    if (filterQuery.is_active !== "") count++;
    if (filterQuery.search !== "") count++;
    setIsCearButtonDisable(count);
  }, [filterQuery]);
  return (
    <Stack
      direction={"row"}
      minHeight={"40px"}
      alignContent={"center"}
      gap={2}
      flexWrap={{ sm: "wrap", xs: "nowrap" }}
    >
      <SearchBarFilter
        handleChange={handleChange}
        filterQuery={filterQuery}
        setFilterQuery={setFilterQuery}
      />
      <HeadquaterFilter
        handleChange={handleChange}
        filterQuery={filterQuery}
        setFilterQuery={setFilterQuery}
      />
      <StatusFilter
        handleChange={handleChange}
        filterQuery={filterQuery}
        setFilterQuery={setFilterQuery}
      />
      <Stack
        direction={"row"}
        height={"40px"}
        alignContent={"center"}
        gap={2}
        display={{ xs: "none", sm: "flex" }}
      >
        <Typography
          className="clear-btn"
          data-test-id="clear-btn-header-page-reinstatement"
          variant="paragraphMd"
          color={isCearButtonDisable ? "secondary.800" : "secondary.400"}
          fontWeight={"medium"}
          textAlign={"center"}
          alignSelf={"center"}
          sx={{
            cursor: !isCearButtonDisable ? "default" : "pointer",
            userSelect: "none",
            textTransform: "uppercase",
          }}
          onClick={handelClear}
        >
          {t("reinstatementResponsiblesListPage.clear")}
        </Typography>
      </Stack>
      <IconButton
        data-test-id="filter-mobile-page-reinstatement"
        sx={{ display: { sm: "none", xs: "flex" } }}
        onClick={() => setOpenFilter(true)}
      >
        <Badge
          data-test-id="badge-filter-mobile-page-reinstatement"
          badgeContent={
            filterQuery.search ? isCearButtonDisable - 1 : isCearButtonDisable
          }
          sx={{
            "& .MuiBadge-badge ": {
              height: "14px",
              px: "2.5px",
              pb: "1px",
              width: "14px",
              minWidth: 0,
              fontSize: "11px",
            },
          }}
          variant="standard"
          color="primary"
        >
          <FilterListIcon color="secondary" />
        </Badge>
      </IconButton>
      <FilterModal
          identifier="filter-modal-mobile-page-reinstatement"
          open={openFilter}
          setOpen={setOpenFilter}
          setFilterQuery={setFilterQuery}
          filterQuery={filterQuery}
        />
    </Stack>
  );
}

export default NavbarReinstatementResponsible;
