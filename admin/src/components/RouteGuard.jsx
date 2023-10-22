'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function RouteGuard({ allowedRoles, children }) {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const role = user.user ? user.user.Role : null;

    if (!user) {
      router.push("/access-denied");
    } else if (allowedRoles.includes(role)) {
      // User has the required role, so do nothing
      return;
    } else {
      // User doesn't have the required role, so redirect to the access-denied page
      router.push("/access-denied");
    }
  }, [allowedRoles]); // Include allowedRoles in the dependency array

  return children;
}

export default RouteGuard;
