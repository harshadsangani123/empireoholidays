"use client";

import Link from "next/link";
import { useState } from "react";
import { flattenErrors } from "@/lib/forms";

interface InquiryPackage {
  id: number;
  name: string;
  type: string;
}

const initialForm = (pkg: InquiryPackage) => ({
  name: "",
  email: "",
  phone: "",
  travel_date: "",
  number_of_travelers: "",
  message_text: "",
  package_id: pkg.id,
  package_name: pkg.name,
  package_type: pkg.type,
});

export default function InquiryForm({ pkg, recaptchaSiteKey }: { pkg: InquiryPackage; recaptchaSiteKey: string | null }) {
  const [form, setForm] = useState(initialForm(pkg));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const minDate = new Date().toISOString().split("T")[0];
  const backUrl = `/package/${pkg.type}/${pkg.id}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    let recaptchaResponse = "";
    if (recaptchaSiteKey) {
      const el = document.getElementById("g-recaptcha-response") as HTMLTextAreaElement | null;
      recaptchaResponse = el?.value ?? "";
    }

    if (recaptchaSiteKey && !recaptchaResponse) {
      setErrors({ "g-recaptcha-response": "Please complete the reCAPTCHA verification." });
      return;
    }

    setSubmitting(true);

    const res = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, "g-recaptcha-response": recaptchaResponse }),
    });
    const data = await res.json().catch(() => null);

    setSubmitting(false);

    if (res.ok) {
      setSuccess(true);
      setErrors({});
      setForm(initialForm(pkg));
    } else {
      const flat = flattenErrors(data?.errors);
      setErrors(Object.keys(flat).length > 0 ? flat : { message: "Something went wrong. Please try again." });
      setSuccess(false);
    }
  };

  return (
    <div className="inquiry-form-container">
      <h2>Send Your Inquiry</h2>
      <p className="form-intro">Fill out the form below and we&apos;ll get back to you as soon as possible.</p>

      {!success ? (
        <form onSubmit={handleSubmit} className="inquiry-form">
          {errors.message && <div className="error-message">{errors.message}</div>}

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                className={`form-input${errors.name ? " error" : ""}`}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Enter your full name"
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                className={`form-input${errors.email ? " error" : ""}`}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                placeholder="your.email@example.com"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Phone Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                className={`form-input${errors.phone ? " error" : ""}`}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                placeholder="+1 234 567 890"
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Travel Date</label>
              <input
                type="date"
                className="form-input"
                value={form.travel_date}
                onChange={(e) => setForm({ ...form, travel_date: e.target.value })}
                min={minDate}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Number of Travelers</label>
              <input
                type="number"
                className="form-input"
                value={form.number_of_travelers}
                onChange={(e) => setForm({ ...form, number_of_travelers: e.target.value })}
                min={1}
                placeholder="e.g., 2"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Package</label>
              <input type="text" className="form-input" value={pkg.name} disabled />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Message / Additional Details</label>
            <textarea
              className={`form-textarea${errors.message_text ? " error" : ""}`}
              value={form.message_text}
              onChange={(e) => setForm({ ...form, message_text: e.target.value })}
              rows={5}
              placeholder="Tell us about your travel plans, special requirements, or any questions you have..."
            ></textarea>
            {errors.message_text && <span className="error-text">{errors.message_text}</span>}
          </div>

          {recaptchaSiteKey && (
            <div className="form-group">
              <div className="g-recaptcha" data-sitekey={recaptchaSiteKey}></div>
              {errors["g-recaptcha-response"] && <span className="error-text">{errors["g-recaptcha-response"]}</span>}
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-large" disabled={submitting}>
              {submitting ? "Sending..." : "Send Inquiry"}
            </button>
            <Link href={backUrl} className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      ) : (
        <div className="success-message">
          <h3>Thank You!</h3>
          <p>Your inquiry has been sent successfully. We&apos;ll get back to you soon.</p>
          <Link href={backUrl} className="btn btn-primary">
            Back to Package
          </Link>
        </div>
      )}
    </div>
  );
}
