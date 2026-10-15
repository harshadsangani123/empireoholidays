"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { type ItineraryDay, type PackageFormValues } from "@/lib/adminForms";

const emptyForm: PackageFormValues = {
  name: "",
  type: "international",
  country: "",
  state: "",
  description: "",
  detailedDescription: "",
  pricePerPerson: "",
  currency: "INR",
  duration: "",
  inclusions: [],
  exclusions: [],
  itinerary: [],
  mainImage: "",
  mainImageUrl: "",
  galleryImages: [],
  galleryImageUrls: [],
  isFeatured: false,
  isPublished: true,
  sortOrder: "0",
  metaTitle: "",
  metaDescription: "",
};

export default function PackageForm({
  initial,
  packageId,
}: {
  initial?: PackageFormValues;
  packageId?: number;
}) {
  const router = useRouter();
  const [form, setForm] = useState<PackageFormValues>(initial ?? emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const set = <K extends keyof PackageFormValues>(key: K, value: PackageFormValues[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleMainImageUpload = async (file: File) => {
    setUploading(true);
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/admin/uploads?dir=packages", { method: "POST", body });
    const data = await res.json();
    setUploading(false);
    if (res.ok) {
      set("mainImage", data.path);
      set("mainImageUrl", data.url);
    }
  };

  const handleGalleryUpload = async (files: FileList) => {
    setUploading(true);
    const body = new FormData();
    Array.from(files).forEach((f) => body.append("files", f));
    const res = await fetch("/api/admin/uploads?dir=packages/gallery&multiple=1", { method: "POST", body });
    const data = await res.json();
    setUploading(false);
    if (res.ok) {
      set("galleryImages", [...form.galleryImages, ...data.map((d: any) => d.path)]);
      set("galleryImageUrls", [...form.galleryImageUrls, ...data.map((d: any) => d.url)]);
    }
  };

  const updateRepeaterItem = (key: "inclusions" | "exclusions", index: number, value: string) => {
    const next = [...form[key]];
    next[index] = value;
    set(key, next);
  };

  const removeRepeaterItem = (key: "inclusions" | "exclusions", index: number) => {
    set(
      key,
      form[key].filter((_, i) => i !== index)
    );
  };

  const updateItineraryItem = (index: number, field: keyof ItineraryDay, value: string) => {
    const next = [...form.itinerary];
    next[index] = { ...next[index], [field]: value };
    set("itinerary", next);
  };

  const removeItineraryItem = (index: number) => {
    set(
      "itinerary",
      form.itinerary.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    const payload = {
      name: form.name,
      type: form.type,
      country: form.country || null,
      state: form.state || null,
      description: form.description || null,
      detailedDescription: form.detailedDescription || null,
      pricePerPerson: form.pricePerPerson,
      currency: form.currency,
      duration: form.duration || null,
      inclusions: form.inclusions.filter(Boolean).map((item) => ({ item })),
      exclusions: form.exclusions.filter(Boolean).map((item) => ({ item })),
      itinerary: form.itinerary,
      mainImage: form.mainImage || null,
      galleryImages: form.galleryImages,
      isFeatured: form.isFeatured,
      isPublished: form.isPublished,
      sortOrder: Number(form.sortOrder) || 0,
      metaTitle: form.metaTitle || null,
      metaDescription: form.metaDescription || null,
    };

    const res = packageId
      ? await fetch(`/api/admin/packages/${packageId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/admin/packages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

    setSubmitting(false);

    if (res.ok) {
      router.push("/admin/packages");
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

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="admin-form-group">
        <label>Name</label>
        <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} required />
        {errors.name && <div className="admin-error">{errors.name}</div>}
      </div>

      <div className="admin-form-row">
        <div className="admin-form-group">
          <label>Type</label>
          <select value={form.type} onChange={(e) => set("type", e.target.value as "international" | "domestic")}>
            <option value="international">International</option>
            <option value="domestic">Domestic</option>
          </select>
        </div>
        {form.type === "international" ? (
          <div className="admin-form-group">
            <label>Country</label>
            <input type="text" value={form.country} onChange={(e) => set("country", e.target.value)} />
          </div>
        ) : (
          <div className="admin-form-group">
            <label>State</label>
            <input type="text" value={form.state} onChange={(e) => set("state", e.target.value)} />
          </div>
        )}
      </div>

      <div className="admin-form-group">
        <label>Short Description</label>
        <textarea value={form.description} onChange={(e) => set("description", e.target.value)} />
      </div>

      <div className="admin-form-group">
        <label>Detailed Description</label>
        <textarea value={form.detailedDescription} onChange={(e) => set("detailedDescription", e.target.value)} />
      </div>

      <div className="admin-form-row">
        <div className="admin-form-group">
          <label>Price Per Person</label>
          <input
            type="number"
            value={form.pricePerPerson}
            onChange={(e) => set("pricePerPerson", e.target.value)}
            required
          />
          {errors.pricePerPerson && <div className="admin-error">{errors.pricePerPerson}</div>}
        </div>
        <div className="admin-form-group">
          <label>Currency</label>
          <select value={form.currency} onChange={(e) => set("currency", e.target.value)}>
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>
      </div>

      <div className="admin-form-group">
        <label>Duration</label>
        <input
          type="text"
          value={form.duration}
          onChange={(e) => set("duration", e.target.value)}
          placeholder="e.g., 5 Days / 4 Nights"
        />
      </div>

      <div className="admin-form-group">
        <label>Inclusions</label>
        {form.inclusions.map((item, i) => (
          <div className="admin-repeater-row" key={i}>
            <input type="text" value={item} onChange={(e) => updateRepeaterItem("inclusions", i, e.target.value)} />
            <button type="button" className="admin-btn admin-btn-danger" onClick={() => removeRepeaterItem("inclusions", i)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" className="admin-btn admin-btn-secondary" onClick={() => set("inclusions", [...form.inclusions, ""])}>
          + Add Inclusion
        </button>
      </div>

      <div className="admin-form-group">
        <label>Exclusions</label>
        {form.exclusions.map((item, i) => (
          <div className="admin-repeater-row" key={i}>
            <input type="text" value={item} onChange={(e) => updateRepeaterItem("exclusions", i, e.target.value)} />
            <button type="button" className="admin-btn admin-btn-danger" onClick={() => removeRepeaterItem("exclusions", i)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" className="admin-btn admin-btn-secondary" onClick={() => set("exclusions", [...form.exclusions, ""])}>
          + Add Exclusion
        </button>
      </div>

      <div className="admin-form-group">
        <label>Itinerary</label>
        {form.itinerary.map((day, i) => (
          <div key={i} style={{ border: "1px solid #e5e7eb", padding: 12, borderRadius: 4, marginBottom: 8 }}>
            <div className="admin-repeater-row">
              <input type="text" placeholder="Day (e.g. Day 1)" value={day.day} onChange={(e) => updateItineraryItem(i, "day", e.target.value)} />
              <input type="text" placeholder="Title" value={day.title} onChange={(e) => updateItineraryItem(i, "title", e.target.value)} />
            </div>
            <textarea
              placeholder="Description"
              value={day.description ?? ""}
              onChange={(e) => updateItineraryItem(i, "description", e.target.value)}
            />
            <button type="button" className="admin-btn admin-btn-danger" onClick={() => removeItineraryItem(i)}>
              Remove Day
            </button>
          </div>
        ))}
        <button
          type="button"
          className="admin-btn admin-btn-secondary"
          onClick={() => set("itinerary", [...form.itinerary, { day: "", title: "", description: "" }])}
        >
          + Add Day
        </button>
      </div>

      <div className="admin-form-group">
        <label>Main Image</label>
        <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleMainImageUpload(e.target.files[0])} />
        {form.mainImageUrl && <img src={form.mainImageUrl} alt="Main" className="admin-image-preview" />}
      </div>

      <div className="admin-form-group">
        <label>Gallery Images</label>
        <input type="file" accept="image/*" multiple onChange={(e) => e.target.files && handleGalleryUpload(e.target.files)} />
        {form.galleryImageUrls.length > 0 && (
          <div className="admin-gallery-preview">
            {form.galleryImageUrls.map((url, i) => (
              <img key={i} src={url} alt={`Gallery ${i + 1}`} />
            ))}
          </div>
        )}
      </div>

      <div className="admin-form-row">
        <div className="admin-checkbox-row">
          <input type="checkbox" checked={form.isFeatured} onChange={(e) => set("isFeatured", e.target.checked)} id="isFeatured" />
          <label htmlFor="isFeatured">Featured</label>
        </div>
        <div className="admin-checkbox-row">
          <input type="checkbox" checked={form.isPublished} onChange={(e) => set("isPublished", e.target.checked)} id="isPublished" />
          <label htmlFor="isPublished">Published</label>
        </div>
      </div>

      <div className="admin-form-group">
        <label>Sort Order</label>
        <input type="number" value={form.sortOrder} onChange={(e) => set("sortOrder", e.target.value)} />
      </div>

      <div className="admin-form-group">
        <label>Meta Title</label>
        <input type="text" value={form.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} />
      </div>

      <div className="admin-form-group">
        <label>Meta Description</label>
        <textarea value={form.metaDescription} onChange={(e) => set("metaDescription", e.target.value)} />
      </div>

      <button type="submit" className="admin-btn" disabled={submitting || uploading}>
        {submitting ? "Saving..." : "Save Package"}
      </button>
    </form>
  );
}
