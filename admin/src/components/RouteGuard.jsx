'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function RouteGuard({ allowedRoles, children }) {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const role = user.user ? user.user.Role : null;

    if (!user) {
      router.push("/login");
    } else if (allowedRoles.includes(role)) {
      return;
    } else {
      router.push("/login");
    }
  }, [allowedRoles]); 

  return children;
}

export default RouteGuard;
