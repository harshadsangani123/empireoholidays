import PackageForm from "@/components/admin/PackageForm";

export default function NewPackagePage() {
  return (
    <>
      <div className="admin-page-header">
        <h1>New Package</h1>
      </div>
      <PackageForm />
    </>
  );
}
