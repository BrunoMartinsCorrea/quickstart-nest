import { Outlet } from "react-router-dom";
import "~/styles/global.css";

export const ExternalLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
}
