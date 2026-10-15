"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface AdminCmsPage {
  id: number;
  title: string;
  slug: string;
  pageType: string;
  isPublished: boolean;
}

export default function AdminCmsPagesPage() {
  const [pages, setPages] = useState<AdminCmsPage[] | null>(null);

  const load = async () => {
    const res = await fetch("/api/admin/cms-pages");
    if (res.ok) setPages(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this CMS page?")) return;
    await fetch(`/api/admin/cms-pages/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <>
      <div className="admin-page-header">
        <h1>CMS Pages</h1>
        <Link href="/admin/cms-pages/new" className="admin-btn">
          + New Page
        </Link>
      </div>

      {!pages ? (
        <p>Loading...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Page Type</th>
              <th>Published</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.id}>
                <td>{page.title}</td>
                <td>{page.slug}</td>
                <td>{page.pageType}</td>
                <td>{page.isPublished ? "Yes" : "No"}</td>
                <td className="actions">
                  <Link href={`/admin/cms-pages/${page.id}/edit`} className="admin-btn">
                    Edit
                  </Link>
                  <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(page.id)}>
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
