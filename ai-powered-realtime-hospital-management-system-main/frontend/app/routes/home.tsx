import { Navigate } from "react-router";
import { authClient } from "@/lib/auth-client";
import Loader from "@/components/global/Loader";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MedFlow AI - Hospital Management System" },
    { name: "description", content: "AI-Powered Real-time Hospital Management System" },
  ];
}

export default function Home() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader label="Loading..." />
      </div>
    );
  }

  // Redirect based on authentication status
  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
}
