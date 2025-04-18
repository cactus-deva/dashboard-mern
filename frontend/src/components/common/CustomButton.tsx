import { Button } from "@mui/material";
import React, { ReactNode } from "react";

interface CustomButtonProps {
  type?: string;
  title: string;
  backgroundColor: string;
  color: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
  handleClick?: () => void;
}

const CustomButton = ({
  type,
  title,
  backgroundColor,
  color,
  fullWidth,
  icon,
  disabled,
  handleClick,
}: CustomButtonProps) => {
  return (
    <Button
      disabled={disabled}
      type={type === "submit" ? "submit" : "button"}
      sx={{
        flex: fullWidth ? 1 : "unset",
        padding: "10px 15px",
        width: fullWidth ? "100%" : "unset",
        backgroundColor,
        color,
        fontSize: "16px",
        fontWeight: 600,
        gap: "10px",
        textTransform: "capitalize",
        "&:hover": {
          opacity: 0.9,
          backgroundColor,
        },
      }}
      onClick={handleClick}
    >
      {icon}
      {title}
    </Button>
  );
};

export default CustomButton;
