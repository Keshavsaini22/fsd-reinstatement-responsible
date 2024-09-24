import { SearchBar } from '@/shared/ui/customs/searchbar';
import { Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react'

function SearchBarFilter({handleChange,filterQuery, setFilterQuery}:any) {
    const t = useTranslations();

    return (
            <SearchBar
                identifier="searchbar-page-reinstatement"
                width={{ xs: "100%", sm: "225px !important" }}
                sx={{ height: "40px" }}
                placeholder={t("reinstatementResponsiblesListPage.search")}
                withClearIcon
                onChange={(e, value) => {
                    if (filterQuery.search !== value.trim() || value === "")
                        handleChange({ name: "search", value: value.trim() });
                }}
                delay={500}
                clearIconProps={{
                    action: () => setFilterQuery({ ...filterQuery, search: "" }),
                }}
                hookValue={filterQuery.search}
            />
    )
}

export default SearchBarFilter