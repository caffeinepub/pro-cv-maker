# Specification

## Summary
**Goal:** Build a professional CV maker that supports Internet Identity login, saves each user’s CV (including photo), and provides an instant, print-ready CV preview.

**Planned changes:**
- Add Internet Identity authentication with a dedicated Login page, plus signed-in UI indicators and sign-out.
- Gate CV builder access behind login.
- Implement Motoko backend APIs to save, fetch, and clear/reset CV data per authenticated principal.
- Create a CV Builder page with structured sections: Personal Details, Professional Summary, Work Experience, Education, Skills, Projects, and optional Certifications/Awards; support multiple entries where relevant and basic validation (name + at least one contact method).
- Add profile photo upload with preview; persist and restore photo with the user’s saved CV data; render photo in the CV output without breaking layout.
- Add instant CV preview that updates as the form changes and a print/export action (“Print / Save as PDF”) with print-friendly layout.
- Apply a consistent, professional visual theme (not primarily blue/purple) across Login, Builder, and Preview, with responsive layout.

**User-visible outcome:** Users can sign in with Internet Identity, enter CV details (and upload a photo), see a live professional CV preview, have their CV saved to their account, and print/export the CV from the browser.
