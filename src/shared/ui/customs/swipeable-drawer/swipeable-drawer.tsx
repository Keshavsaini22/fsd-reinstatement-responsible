import { Box, Divider, Stack, SwipeableDrawer, Typography } from "@mui/material";
import React from "react";

type CustomSwipeableDrawerProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  identifier: string;
};

const CustomSwipeableDrawer = ({ open, onClose, title, children, identifier }: CustomSwipeableDrawerProps) => {
  return (
    <Box>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={() => onClose()}
        onOpen={() => {}}
        disableSwipeToOpen={true}
        PaperProps={{
          style: {
            maxHeight: "70%",
            borderRadius: "15px 15px 0px 0px",
            gap: "8px",
          },
        }}
        ModalProps={{ keepMounted: true }}
        className="z-50"
        sx={{
          borderRadius: "15px",
          overflow: "auto",
          maxHeight: "70%",
          zIndex: 1301,
        }}
        data-test-id={identifier}
      >
        <Box data-test-id={`swipeablebox-${identifier}`} sx={{ py: 2 }}>
          {title && (
            <Stack>
              <Typography
                data-test-id={`swipeable-title-${identifier}`}
                variant="paragraphMd"
                fontWeight="medium"
                color="secondary"
                className="px-2 py-1"
                sx={{ wordWrap: "break-word" }}
              >
                {title}
              </Typography>
              <Divider />
            </Stack>
          )}
          <Stack
            data-test-id={`swipeable-children-${identifier}`}
            direction={"column"}
            sx={{ px: 2, gap: 1, pt: title ? 1 : 0 }}
          >
            {children}
          </Stack>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

export default CustomSwipeableDrawer;
