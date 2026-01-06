import { ReactNode } from "react";
import { TrustBar } from "./TrustBar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SchemaOrg } from "@/components/seo/SchemaOrg";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <SchemaOrg />
      <TrustBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
