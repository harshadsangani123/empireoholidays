"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { type CmsPageFormValues } from "@/lib/adminForms";

const PAGE_TYPES = [
  "privacy_policy",
  "terms_condition",
  "partner_with_us",
  "corporate",
  "about",
  "home",
  "membership",
  "gift_vouchers",
  "contact",
  "footer",
];

const CONTACT_LIKE_FIELDS = ["phone", "email", "whatsapp", "business_hours", "address", "facebook", "instagram", "linkedin"];

const emptyForm: CmsPageFormValues = {
  title: "",
  slug: "",
  pageType: "about",
  isPublished: true,
  content: {},
  metaDataJson: "{}",
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function CmsPageForm({ initial, pageId }: { initial?: CmsPageFormValues; pageId?: number }) {
  const router = useRouter();
  const [form, setForm] = useState<CmsPageFormValues>(initial ?? emptyForm);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [contentJson, setContentJson] = useState(() => JSON.stringify((initial ?? emptyForm).content, null, 2));

  const setContentField = (key: string, value: any) => {
    setForm((f) => ({ ...f, content: { ...f.content, [key]: value } }));
  };

  const handleHeroUpload = async (files: FileList) => {
    setUploading(true);
    const body = new FormData();
    Array.from(files).forEach((f) => body.append("files", f));
    const res = await fetch("/api/admin/uploads?dir=home&multiple=1", { method: "POST", body });
    const data = await res.json();
    setUploading(false);
    if (res.ok) {
      const existing: string[] = Array.isArray(form.content.hero_background) ? form.content.hero_background : [];
      setContentField("hero_background", [...existing, ...data.map((d: any) => d.path)]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    let content = form.content;
    let metaData: any = {};
    if (!CONTACT_LIKE_FIELDS.some((f) => f in form.content) && form.pageType !== "home") {
      try {
        content = JSON.parse(contentJson);
      } catch {
        setSubmitting(false);
        setErrors({ content: "Content must be valid JSON." });
        return;
      }
    }
    try {
      metaData = JSON.parse(form.metaDataJson || "{}");
    } catch {
      setSubmitting(false);
      setErrors({ metaDataJson: "Meta data must be valid JSON." });
      return;
    }

    const payload = {
      title: form.title,
      slug: form.slug,
      pageType: form.pageType,
      isPublished: form.isPublished,
      content,
      metaData,
    };

    const res = pageId
      ? await fetch(`/api/admin/cms-pages/${pageId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/admin/cms-pages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

    setSubmitting(false);

    if (res.ok) {
      router.push("/admin/cms-pages");
      router.refresh();
    } else {
      const data = await res.json().catch(() => null);
      const flat: Record<string, string> = {};
      for (const [k, v] of Object.entries(data?.errors ?? {})) {
        flat[k] = Array.isArray(v) ? v[0] : String(v);
      }
      setErrors(flat);
    }
  };

  const isContactLike = form.pageType === "contact" || form.pageType === "footer";
  const isHome = form.pageType === "home";
  const heroImages: string[] = Array.isArray(form.content.hero_background) ? form.content.hero_background : [];

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="admin-form-group">
        <label>Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => {
            const title = e.target.value;
            setForm((f) => ({ ...f, title, slug: pageId ? f.slug : slugify(title) }));
          }}
          required
        />
        {errors.title && <div className="admin-error">{errors.title}</div>}
      </div>

      <div className="admin-form-group">
        <label>Slug</label>
        <input type="text" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} required />
        {errors.slug && <div className="admin-error">{errors.slug}</div>}
      </div>

      <div className="admin-form-group">
        <label>Page Type</label>
        <select value={form.pageType} onChange={(e) => setForm((f) => ({ ...f, pageType: e.target.value }))}>
          {PAGE_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="admin-checkbox-row">
        <input
          type="checkbox"
          id="isPublished"
          checked={form.isPublished}
          onChange={(e) => setForm((f) => ({ ...f, isPublished: e.target.checked }))}
        />
        <label htmlFor="isPublished">Published</label>
      </div>

      {isContactLike &&
        CONTACT_LIKE_FIELDS.map((field) => (
          <div className="admin-form-group" key={field}>
            <label>{field.replace(/_/g, " ")}</label>
            <input
              type="text"
              value={form.content[field] ?? ""}
              onChange={(e) => setContentField(field, e.target.value)}
            />
          </div>
        ))}

      {isHome && (
        <div className="admin-form-group">
          <label>Hero Background Images</label>
          <input type="file" accept="image/*" multiple onChange={(e) => e.target.files && handleHeroUpload(e.target.files)} />
          {heroImages.length > 0 && (
            <div className="admin-gallery-preview">
              {heroImages.map((img, i) => (
                <span key={i} style={{ fontSize: 12, background: "#eee", padding: "4px 8px", borderRadius: 4 }}>
                  {img}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {!isContactLike && !isHome && (
        <div className="admin-form-group">
          <label>Content (JSON)</label>
          <textarea value={contentJson} onChange={(e) => setContentJson(e.target.value)} style={{ minHeight: 160, fontFamily: "monospace" }} />
          {errors.content && <div className="admin-error">{errors.content}</div>}
        </div>
      )}

      <div className="admin-form-group">
        <label>Meta Data (JSON)</label>
        <textarea
          value={form.metaDataJson}
          onChange={(e) => setForm((f) => ({ ...f, metaDataJson: e.target.value }))}
          style={{ fontFamily: "monospace" }}
        />
        {errors.metaDataJson && <div className="admin-error">{errors.metaDataJson}</div>}
      </div>

      <button type="submit" className="admin-btn" disabled={submitting || uploading}>
        {submitting ? "Saving..." : "Save Page"}
      </button>
    </form>
  );
}
