import { notFound } from "next/navigation";
import PackageForm from "@/components/admin/PackageForm";
import { adminFetchJson } from "@/lib/adminApi";
import { packageToFormValues } from "@/lib/adminForms";

export default async function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pkg = await adminFetchJson<any>(`/admin/packages/${id}`);

  if (!pkg) notFound();

  return (
    <>
      <div className="admin-page-header">
        <h1>Edit Package</h1>
      </div>
      <PackageForm initial={packageToFormValues(pkg)} packageId={pkg.id} />
    </>
  );
}
