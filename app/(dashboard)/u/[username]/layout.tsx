import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Navbar from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import Container from "./_components/Container";

interface CreatorLayoutProps {
  params: { username: string };  // ✅ FIXED (no Promise)
  children: ReactNode;
}

const CreatorLayout = async ({ params, children }: CreatorLayoutProps) => {
  const { username } = params; // ✅ no await here

  const self = await getSelfByUsername(username);

  if (!self) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full pt-4">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default CreatorLayout;
