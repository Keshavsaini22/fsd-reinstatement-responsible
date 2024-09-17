"use client";
import { Box, Tooltip, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const Message = ({ message, staticMessage }: { message: string; staticMessage?: string }) => {
  const t = useTranslations();
  const shouldShowTooltip = (text: string) => {
    if (typeof document === "undefined") return false;
    const element = document.createElement("div");
    element.style.overflow = "hidden";
    element.style.whiteSpace = "nowrap";
    element.style.textOverflow = "ellipsis";
    element.style.width = "100px";
    element.innerHTML = text;
    document.body.appendChild(element);
    const isOverflowing = element.scrollWidth > element.clientWidth;
    document.body.removeChild(element);
    return isOverflowing;
  };
  if (staticMessage) {
    return (
      <Box className="flex flex-row flex-no-wrap">
        {shouldShowTooltip(staticMessage) ? (
          <Tooltip title={staticMessage}>
            <Typography
              variant="paragraphMd"
              sx={{
                maxWidth: "100px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                textWrap: "nowrap",
                pr: 0.5,
              }}
            >
              {staticMessage}
            </Typography>
          </Tooltip>
        ) : (
          <Typography variant="paragraphMd" sx={{ pr: 0.5 }}>
            {staticMessage}
          </Typography>
        )}
        <Typography variant="paragraphMd">{t(message)}</Typography>
      </Box>
    );
  }
  return <Box>{t(message)}</Box>;
};

export default Message;
