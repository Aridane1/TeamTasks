import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function PrivateRoute({ onlyLogged }: { onlyLogged: boolean }) {
  const [changePage, setChangePage] = useState<boolean>();
  const navigate = useNavigate();

  const logged = localStorage.getItem("token") ? true : false;

  const checkIsLogged = () => {
    if (!logged) {
      navigate("/");
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (onlyLogged) {
      const accessGranted = checkIsLogged();
      setChangePage(accessGranted);
    }
  }, []);

  if (changePage) {
    return <Outlet />;
  }
}
