"use client";

import { useRouter } from "next/navigation";
import { supabase } from "../../../utils/supabase";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/"); // change this to your login route if different
  };

  return (
    <button onClick={handleLogout} style={{ padding: "0.5rem 1rem" }}>
      Logout
    </button>
  );
}