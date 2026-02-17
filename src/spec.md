# Specification

## Summary
**Goal:** Modernize and professionalize the CV preview design while keeping all existing fields/sections and real-time updates intact, and ensure it prints cleanly.

**Planned changes:**
- Redesign `frontend/src/components/cv/CVPreview.tsx` layout to a more modern resume-like template (improved typography hierarchy, spacing, alignment, and section styling) without removing any existing content.
- Refine the header area (name, photo, contact details) for balanced alignment, consistent icon sizing, and cleaner photo framing.
- Update section headers/dividers to a subtle, modern, print-readable style with consistent spacing between sections.
- Improve skills rendering to a more polished, print-friendly pill style with better spacing and wrapping (replacing the current gray badge look).
- Adjust print-specific styling so the preview fills the page with consistent margins/spacing, stays high-contrast, and avoids awkward page breaks where possible.

**User-visible outcome:** Users see a more modern, professional CV preview that remains fully editable in real time and prints/saves to PDF with clean, consistent formatting.
