import { LocalizationProvider as MUILocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterMoment";
import { FC } from "react";

export const LocalizationProvider: FC = ({ children }) => {
  return (
    <MUILocalizationProvider dateAdapter={DateAdapter}>
      {children}
    </MUILocalizationProvider>
  );
};
