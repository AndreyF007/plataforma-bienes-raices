import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import TestimonialList from "./TestimonialList";

export const dynamic = 'force-dynamic';

export default async function TestimonialsAdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email as string },
    include: { tenant: true }
  });

  if (!user || !user.tenantId) {
    return <div>No autorizado</div>;
  }

  const testimonialsRaw = await db.testimonial.findMany({
    where: { tenantId: user.tenantId },
    orderBy: { createdAt: 'desc' }
  });

  const testimonials = testimonialsRaw.map(t => ({
    ...t,
    createdAt: t.createdAt.toISOString()
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light uppercase tracking-widest text-black dark:text-white">Testimonios de Clientes</h1>
        <p className="text-sm text-gray-500 mt-2">Aprueba las reseñas de tus clientes antes de que se muestren en tu sitio web.</p>
      </div>

      <TestimonialList initialTestimonials={testimonials} />
    </div>
  );
}
