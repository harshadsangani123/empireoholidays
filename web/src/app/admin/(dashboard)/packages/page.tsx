"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface AdminPackage {
  id: number;
  name: string;
  type: string;
  isPublished: boolean;
  isFeatured: boolean;
  sortOrder: number;
}

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<AdminPackage[] | null>(null);

  const load = async () => {
    const res = await fetch("/api/admin/packages");
    if (res.ok) setPackages(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this package?")) return;
    await fetch(`/api/admin/packages/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <>
      <div className="admin-page-header">
        <h1>Packages</h1>
        <Link href="/admin/packages/new" className="admin-btn">
          + New Package
        </Link>
      </div>

      {!packages ? (
        <p>Loading...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Featured</th>
              <th>Published</th>
              <th>Sort</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.id}>
                <td>{pkg.name}</td>
                <td>{pkg.type}</td>
                <td>{pkg.isFeatured ? "Yes" : "No"}</td>
                <td>{pkg.isPublished ? "Yes" : "No"}</td>
                <td>{pkg.sortOrder}</td>
                <td className="actions">
                  <Link href={`/admin/packages/${pkg.id}/edit`} className="admin-btn">
                    Edit
                  </Link>
                  <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(pkg.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
