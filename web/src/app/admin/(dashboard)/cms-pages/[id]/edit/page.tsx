import { notFound } from "next/navigation";
import CmsPageForm from "@/components/admin/CmsPageForm";
import { adminFetchJson } from "@/lib/adminApi";
import { cmsPageToFormValues } from "@/lib/adminForms";

export default async function EditCmsPagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await adminFetchJson<any>(`/admin/cms-pages/${id}`);

  if (!page) notFound();

  return (
    <>
      <div className="admin-page-header">
        <h1>Edit CMS Page</h1>
      </div>
      <CmsPageForm initial={cmsPageToFormValues(page)} pageId={page.id} />
    </>
  );
}
