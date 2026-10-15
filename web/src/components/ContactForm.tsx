"use client";

import { useState } from "react";
import { flattenErrors } from "@/lib/forms";

const initialForm = { name: "", email: "", phone: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json().catch(() => null);

    setSubmitting(false);

    if (res.ok) {
      setSuccess(true);
      setErrors({});
      setForm(initialForm);
    } else {
      const flat = flattenErrors(data?.errors);
      setErrors(Object.keys(flat).length > 0 ? flat : { message: "Something went wrong. Please try again." });
      setSuccess(false);
    }
  };

  if (success) {
    return (
      <div className="success-message">
        <h3>Thank you!</h3>
        <p>Your message has been sent successfully. We will get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {errors.message && <div className="error-message">{errors.message}</div>}

      <div className="form-group">
        <label className="form-label">Name</label>
        <input
          type="text"
          className={`form-input${errors.name ? " error" : ""}`}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Your full name"
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Email</label>
        <input
          type="email"
          className={`form-input${errors.email ? " error" : ""}`}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="your.email@example.com"
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Phone</label>
        <input
          type="tel"
          className={`form-input${errors.phone ? " error" : ""}`}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="+1 234 567 890"
        />
        {errors.phone && <span className="error-text">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Message</label>
        <textarea
          className={`form-textarea${errors.message ? " error" : ""}`}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell us about your travel plans..."
        ></textarea>
        {errors.message && <span className="error-text">{errors.message}</span>}
      </div>

      <button type="submit" className="form-submit" disabled={submitting}>
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
