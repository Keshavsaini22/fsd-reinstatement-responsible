import {  CustomSelectProps,  SelectMenu as Select,} from "@/shared/ui/customs/select";
import {  Box,  Button,  CircularProgress,  Paper,  PaperProps,  Typography,  styled,} from "@mui/material";
import { TypographyProps } from "@mui/material/Typography";
import Image from "next/image";

/**
 * Props interface for the LoginPage component.
 */
export interface LoginPageProps {
  /**
   * Indicates whether the component is in a loading state.
   */
  isLoading?: boolean;

  /**
   * Background image data for the login page.
   */
  BackgroundImage?: any;

  /**
   * Icon to be displayed in the header of the login page.
   */
  Icon?: React.ReactNode;

  /**
   * Title text for the login page.
   */
  Title?: string;

  /**
   * Event handler for the login button click.
   */
  onLogin?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Text for the sign-in action.
   */
  SignInText?: string;

  /**
   * Subtext for the sign-in action.
   */
  SignInSubText?: string;

  /**
   * Text for the login button. Defaults to 'Sign in with Google' if not provided.
   * @default 'Sign in with Google'
   */

  ButtonText?: string;

  /**
   * Props for the custom select component.
   */
  SelectMenuProps?: CustomSelectProps;

  /**
   * Default selected language for the select component.
   */
  DefaultSelectedLanguage?: string;

  /**
   * Event handler for menu selection in the select component.
   */
  onMenuSelect?: any;
  /**
   * Props for the app title component.
   */

  titleProps?: TypographyProps;

  /**
   * Props for the icon container component.
   */
  iconContainerProps?: PaperProps;
}

const LoginContainer = styled(Box)<{ backgroundimage: any }>`
  height: 100svh;
  width: 100svw;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-size: cover !important;
  position: absolute;
  box-sizing: border-box;
  background: linear-gradient(
      90deg,
      rgba(46, 168, 255, 0) -49.08%,
      rgba(46, 168, 255, 0.15) 227.37%
    ),
    var(--white);
  background-repeat: no-repeat;
  background-position: left;
  background-image: ${({ backgroundimage }) =>
    `url('${backgroundimage?.src || backgroundimage}')`};
  overflow: hidden;
  /* Media query for small screens */
  @media (max-width: 600px) {
    padding: 16px;
    background-image: ${({ backgroundimage }) =>
      `url('${backgroundimage?.src || backgroundimage}')`};
    background-size: strech;
    background-repeat: no-repeat;
    background-position: left;
  }
`;

const FormContainer = styled(Box)`
  display: inline-flex;
  padding: 48px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 90%;
  // overflow-y: auto;
  // overflow-x: hidden;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid var(--secondary-200);
  background: var(--white);
  box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.2);
  /* Media query for small screens */
  @media (max-width: 600px) {
    padding: 48px 16px;
    max-width: 100%;
    height: auto;
  }
`;
const FormSubContainer = styled(Box)`
  display: flex;
  width: 357px;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: 0px;
  gap: 24px;
  border-radius: 0px 5px 5px 0px;
  background: var(--white);
  /* Media query for small screens */
  @media (max-width: 600px) {
    width: 294px;
    gap: 16px;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;
//padding to be handled in future
const FormHeader = styled(Box)`
  display: flex;
  width: 359px;
  padding-bottom: 16px;
  height: 82px;
  justify-content: center;
  gap: 16px;
  align-self: stretch;
  /* Media query for small screens */
  @media (max-width: 600px) {
    width: auto;
    margin-bottom: 8px;
  }
`;
const FormIconContainer = styled(Paper)`
  display: flex;
  padding: 16px;
  justify-content: center;
  align-items: center;
  align-self: center;
  height: 50px;
  width: 50px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #ecf8ff;
  box-sizing: border-box;
`;

const HeadingText = styled(Typography)<LoginPageProps>`
  color: var(--secondary-900);
  text-align: center;
  font-family: Open Sans;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  width: 100%;
  @media (max-width: 600px) {
    font-size: 21px;
  }
`;

const FormBody = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  gap: "8px",
}));
const SignInText = styled(Typography)(() => ({
  color: "var(--secondary-900)",
  textAlign: "center",
  fontFamily: "Open Sans",
  fontSize: "18px",
  width: "100%",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "24px",
  boxSizing: "border-box",
}));
const SignInTextAsc = styled(Typography)(() => ({
  boxSizing: "border-box",
  width: "100%",
  color: "var(--secondary-600)",
  textAlign: "center",
  fontFamily: "Open Sans",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "20px",
}));
const LoginButton = styled(Button)(() => ({
  display: "flex",
  padding: "11px 8px",
  justifyContent: "center",
  alignItems: "center",
  gap: "24px",
  alignSelf: "stretch",
  borderRadius: "2px",
  background: "var(--white)",
  boxShadow:
    "0px 0px 1px 0px rgba(0, 0, 0, 0.08), 0px 1px 1px 0px rgba(0, 0, 0, 0.17)",
  color: "rgba(0, 0, 0, 0.54)",
  textAlign: "center",
  fontSize: "14px",
  height: "44px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "normal",
  textTransform: "none",
  "&:hover": {
    background: "var(--white)",
  },
}));
const FormHeaderContainer = styled(Box)(() => ({
  display: "flex",
  gap: "16px",
  justifyContent: "center",
  width: "100%",
  height: "100%",
}));
const HeadingTextContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  // width:100%;
  /* Media query for small screens */
  @media (max-width: 600px) {
    // width: 180px;
  }
`;
const Login = (props: LoginPageProps) => {
  const { BackgroundImage } = props;
  return (
    <LoginContainer backgroundimage={BackgroundImage}>
      <FormContainer>
        <FormSubContainer>
          <FormHeader>
            <FormHeaderContainer>
              <FormIconContainer
                data-test-id="login-app-icon"
                {...props.iconContainerProps}
                elevation={props.iconContainerProps?.elevation ?? 3}
              >
                {props.Icon}
              </FormIconContainer>

              <HeadingTextContainer>
                <HeadingText
                  data-test-id="login-app-title"
                  {...props.titleProps}
                >
                  {props.Title}
                </HeadingText>
              </HeadingTextContainer>
            </FormHeaderContainer>
          </FormHeader>
          <FormBody>
            <SignInText data-test-id="login-signin-text">
              {props?.SignInText}
            </SignInText>
            <SignInTextAsc data-test-id="login-app-title-sub-text">
              {props?.SignInSubText}
            </SignInTextAsc>
          </FormBody>
          <LoginButton
            sx={{
              display: "flex",
            }}
            data-test-id="login-google-button"
            variant="text"
            disabled={props.isLoading || false}
            startIcon={
              props?.isLoading ? (
                <CircularProgress
                  size={14}
                  data-test-id="login-loading-spinner"
                />
              ) : (
                <Image
                  src={"icons/google.svg"}
                  height={18}
                  width={18}
                  alt="Google Icon"
                />
              )
            }
            onClick={props.onLogin}
          >
            <Typography
              component="p"
              data-test-id="login-button-text"
              sx={{ marginLeft: "-10px", fontSize: "14px", fontWeight: 600 }}
            >
              {props.ButtonText}
            </Typography>
          </LoginButton>
          <Select
            variant="standard"
            data-test-id="login-language-select"
            FormControlProps={{
              size: "small",
              sx: {
                marginLeft: 3,
                width: "160px",
                padding: "0px !important",
              },
            }}
            SelectDisplayProps={{
              style: {
                fontSize: "14px",
              },
            }}
            size="small"
            value={props?.DefaultSelectedLanguage}
            onChange={props.onMenuSelect}
            OptionsArray={props.SelectMenuProps?.OptionsArray}
            disableUnderline
            sx={{
              "& .MuiSelect-select": {
                fontSize: "14px",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  "& .MuiMenuItem-root": {
                    fontSize: "14px",
                  },
                },
              },
            }}
          />
        </FormSubContainer>
      </FormContainer>
    </LoginContainer>
  );
};
export default Login;
