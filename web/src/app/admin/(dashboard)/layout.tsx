import Link from "next/link";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <nav className="admin-nav">
        <div className="admin-nav-links">
          <Link href="/admin/packages">Packages</Link>
          <Link href="/admin/cms-pages">CMS Pages</Link>
        </div>
        <AdminLogoutButton />
      </nav>
      <div className="admin-content">{children}</div>
    </div>
  );
}
