import React, { useEffect, useState } from "react";
import { Box, Button, FormControlLabel, Stack, Switch, Typography, useMediaQuery } from "@mui/material";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { NewReinstatementResponsibleDetailsFormSchema, useNewReinstatementResponsibleDetailsFormSchema } from "../model/register-reinstatement-responsible-schema";
import { getHeadquatersList } from "@/shared/common/get-headquaters-list";
import CustomModal from "@/shared/ui/custom-modal";
import CustomTextField from "@/shared/ui/customs/input/custom-text-field";
import CustomAutocomplete from "@/shared/ui/customs/input/custom-autocomplete";
import CustomAlertBox from "@/shared/ui/customs/alert-box/custom-alert-box";

type Props = {
  openForm?: boolean;
  setFilterQuery?: React.Dispatch<React.SetStateAction<ReinstatementResponsibleFilterQuery>>;
  identifier: string;
};

const RegisterReinstatementResponsible = ({ openForm, setFilterQuery, identifier }: Props) => {
  const t = useTranslations("reinstatementResponsiblesForm");
  const isMobile = useMediaQuery("(max-width:600px)");
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState<
    | {
        title: string;
        body: string;
        saveButtonText: string;
        cancelButtonText: string;
        handleSave: () => void;
        onCancel: () => void;
      }
    | false
  >(false);
  // const loading = useAppSelector(state => state.responsible.loading);
  const loading=false;
  const { control, handleSubmit, reset, getValues } = useForm<NewReinstatementResponsibleDetailsFormSchema>({
    resolver: zodResolver(useNewReinstatementResponsibleDetailsFormSchema()),
    defaultValues: {
      name: "",
      last_name: "",
      email: "",
      headquarter: { label: "", value: "" },
      is_active: true,
    },
  });
  useEffect(() => {
    setOpen(openForm || false);
  }, [openForm]);

  const headquatersList = getHeadquatersList();

  const handleSave = async (data?: NewReinstatementResponsibleDetailsFormSchema) => {
    // const response: any = await dispatch(createReinstatementResponsibleAction(data!));
    // if (response?.meta?.requestStatus === "fulfilled") {
    //   setOpen(false);
    //   reset();
    //   setFilterQuery && setFilterQuery({ headquarters: [], is_active: "", search: "" });
    // }
  };
  const onErrors = (errors: any) => {};

  const handleCancel = (confirmed: boolean) => {
    const currData = getValues();
    if (!confirmed) {
      if (
        currData.name ||
        currData.last_name ||
        currData.email ||
        currData.headquarter?.label ||
        currData.headquarter?.value
      ) {
        setOpenAlert({
          title: "reinstatementResponsiblesForm.cancelAlert.title",
          body: "cancelAlert.body",
          saveButtonText: "reinstatementResponsiblesForm.cancelAlert.saveButtonText",
          cancelButtonText: "reinstatementResponsiblesForm.cancelAlert.cancelButtonText",
          handleSave: () => handleCancel(true),
          onCancel: () => setOpenAlert(false),
        });
        return;
      }
    }
    setOpen(false);
    setOpenAlert(false);
    reset();
  };

  const handleTrim = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim().length > 0) event.target.value = event.target.value;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    event.target.value = event.target.value.replace(/^\s+/, "");
    if (fieldName === "name" || fieldName === "last_name") {
      event.target.value = event.target.value.replace(/[0-9]/g, "");
      event.target.value = event.target.value.replace(/[^a-zA-Z\s]/g, "");
    }
    handleTrim(event);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(!open)} data-test-id={`button-${identifier}`}>
        {t("create")}
      </Button>

      <CustomModal
        identifier={identifier}
        title={isMobile ? "reinstatementResponsiblesForm.titleMobile" : "reinstatementResponsiblesForm.title"}
        open={open}
        onCancel={() => handleCancel(false)}
        onSave={handleSubmit(handleSave, onErrors)}
        saveButtonText={"reinstatementResponsiblesForm.create"}
        // saveButtonLoading={loading.create}

      >
        <Stack sx={{ minWidth: { sm: "363px" } }} gap={2} direction={"column"} overflow={"hidden"}>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
            component={"form"}
            onSubmit={handleSubmit(handleSave, onErrors)}
          >
            <CustomTextField
              identifier={`input-responsiblename-${identifier}`}
              inputProps={{
                onBlur: handleTrim,
                onChange: e => handleChange(e, "name"),
              }}
              control={control}
              label={t("firstName")}
              name="name"
              required
            />
            <CustomTextField
              identifier={`input-responsiblelastname-${identifier}`}
              inputProps={{
                onBlur: handleTrim,
                onChange: e => handleChange(e, "last_name"),
              }}
              control={control}
              label={t("lastName")}
              name="last_name"
              required
            />
            <CustomTextField
              identifier={`input-responsibleemail-${identifier}`}
              inputProps={{
                onBlur: handleTrim,
                onChange: e => handleChange(e, "email"),
              }}
              control={control}
              label={t("email")}
              name="email"
              required
            />
            <CustomAutocomplete
              identifier={`responsibleformheadquarter-${identifier}`}
              control={control}
              label={t("headquarter")}
              name="headquarter"
              options={headquatersList}
            />
          </Box>
          <Controller
            name="is_active"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                sx={{
                  width: "fit-content",
                  ml: 0,
                  gap: { xs: 1, ms: 2 },
                  display: "flex",
                  flexDirection: "row-reverse",
                  justifyContent: "flex-end",
                }}
                label={t("status")}
                control={
                  <Switch
                    data-test-id={`input-responsibleswitch-${identifier}`}
                    defaultChecked={field.value}
                    onChange={field.onChange}
                    color="primary"
                  />
                }
              />
            )}
          />
          {openAlert && (
            <CustomAlertBox
              identifier={`alertBox-${identifier}`}
              title={openAlert.title}
              saveButtonText={openAlert.saveButtonText}
              cancelButtonText={openAlert.cancelButtonText}
              open={!!openAlert}
              onCancel={openAlert.onCancel}
              onSave={openAlert.handleSave}
            >
              <Typography sx={{ pr: 2 }} variant="paragraphMd">
                {t(openAlert.body)}
              </Typography>
            </CustomAlertBox>
          )}
        </Stack>
      </CustomModal>
    </>
  );
};

export default RegisterReinstatementResponsible;
