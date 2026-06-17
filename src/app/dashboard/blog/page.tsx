import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import BlogList from "./BlogList";

export default async function AdminBlogPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { email: session.user?.email as string },
    include: { tenant: true },
  });

  if (!user || !user.tenantId) {
    redirect("/login");
  }

  const posts = await db.blogPost.findMany({
    where: { tenantId: user.tenantId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex-1 w-full flex flex-col p-8 bg-neutral-50 dark:bg-neutral-900 min-h-screen">
      <div className="max-w-[1400px] w-full mx-auto">
        <h1 className="text-3xl font-light tracking-widest uppercase mb-8 text-black dark:text-white">Gestión del Blog</h1>
        <BlogList initialPosts={posts} tenantId={user.tenantId} />
      </div>
    </div>
  );
}
