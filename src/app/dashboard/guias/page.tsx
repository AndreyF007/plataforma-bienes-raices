import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import GuidesClient from "./GuidesClient";

export default async function GuidesPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email as string },
    include: { tenant: true },
  });

  if (!user || !user.tenantId || !user.tenant) {
    redirect("/");
  }

  let siteSettings: any = {};
  try {
    siteSettings = JSON.parse(user.tenant.siteSettings || "{}");
  } catch (e) {}

  return (
    <div>
      <h1 className="text-3xl font-light font-[family-name:var(--font-raleway)] uppercase tracking-wider mb-8">
        Guías (Comprador / Vendedor)
        </h1>
        <p className="text-gray-600 mb-8 font-[family-name:var(--font-quicksand)]">
          Edita los pasos de las guías que aparecen en tu sitio web. Puedes modificar el título, descripción y la fotografía de cada paso.
        </p>
        <GuidesClient 
          initialBuyerGuide={siteSettings.buyerGuide || null} 
          initialSellerGuide={siteSettings.sellerGuide || null} 
        />
    </div>
  );
}
