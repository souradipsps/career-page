# UI Component Primitives & Utilities Documentation

This document explains the reusable UI primitives located in the directory [src/app/components/ui](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui). These components are built upon **Radix UI Primitive overlays**, styled with **Tailwind CSS**, and leverage **Class Variance Authority (CVA)** to handle variants and states.

---

## 1. Directory Structure & Overview

All components in this directory are designed to be decoupled from specific business logic, acting as pure UI building blocks. They depend on standard styling packages:
- `class-variance-authority` (cva): For standardizing style variations.
- `clsx` & `tailwind-merge` (via `utils.ts`): For dynamically combining and merging Tailwind classes without CSS collisions.
- `@radix-ui/*`: Unstyled, accessible React primitives.
- `lucide-react`: SVG icon library.

---

## 2. Component Categorization

To help locate components, they are grouped below by UI concern:

### A. Layout & Structural Primitives
* **[card.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/card.tsx)**
  - *Description*: Enclosing panels for listing items, sections, and dashboard graphs.
  - *Components*: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.
* **[separator.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/separator.tsx)**
  - *Description*: A stylized line separator. Uses Radix UI's `@radix-ui/react-separator`.
* **[scroll-area.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/scroll-area.tsx)**
  - *Description*: Custom scroll bars that appear consistently across browsers. Uses `@radix-ui/react-scroll-area`.
* **[resizable.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/resizable.tsx)**
  - *Description*: Enables resizable split panes. Uses `react-resizable-panels`.
* **[aspect-ratio.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/aspect-ratio.tsx)**
  - *Description*: Constrains content aspect ratios (e.g. image cards or video player boxes). Uses `@radix-ui/react-aspect-ratio`.

---

### B. Form Inputs & Actions
* **[button.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/button.tsx)**
  - *Description*: Flexible trigger button with multiple design styles and sizes. Uses `@radix-ui/react-slot` for `asChild` delegation.
  - *Variants (`variant`)*: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`.
  - *Sizes (`size`)*: `default`, `sm`, `lg`, `icon`.
* **[input.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/input.tsx)** & **[textarea.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/textarea.tsx)**
  - *Description*: Standard text inputs and multi-line message fields.
* **[input-otp.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/input-otp.tsx)**
  - *Description*: A stylized single-digit cell selector for OTP inputs (used in the Password Reset process). Uses `input-otp`.
* **[label.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/label.tsx)**
  - *Description*: Form labels styled to line up with inputs. Uses `@radix-ui/react-label`.
* **[checkbox.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/checkbox.tsx)** & **[radio-group.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/radio-group.tsx)**
  - *Description*: Boolean toggles and single-selection lists. Uses `@radix-ui/react-checkbox` and `@radix-ui/react-radio-group`.
* **[switch.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/switch.tsx)**
  - *Description*: Slider switches for toggle configurations. Uses `@radix-ui/react-switch`.
* **[select.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/select.tsx)**
  - *Description*: Standard drop-down selection menu. Uses `@radix-ui/react-select`.
* **[slider.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/slider.tsx)**
  - *Description*: Numeric value range sliders. Uses `@radix-ui/react-slider`.
* **[toggle.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/toggle.tsx)** & **[toggle-group.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/toggle-group.tsx)**
  - *Description*: Multi-state select buttons. Uses `@radix-ui/react-toggle` and `@radix-ui/react-toggle-group`.
* **[calendar.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/calendar.tsx)**
  - *Description*: Interactive month view calendar popup (used to select interview schedules). Uses `react-day-picker` and `date-fns`.
* **[form.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/form.tsx)**
  - *Description*: A comprehensive wrapper integrating `react-hook-form` validation rules and messages.

---

### C. Overlays, Modals, & Commands
* **[dialog.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/dialog.tsx)**
  - *Description*: The foundational popup modal container used by Application and Login modals. Uses `@radix-ui/react-dialog`.
* **[alert-dialog.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/alert-dialog.tsx)**
  - *Description*: Action-interruption prompts requiring explicit confirmation. Uses `@radix-ui/react-alert-dialog`.
* **[sheet.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/sheet.tsx)** & **[drawer.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/drawer.tsx)**
  - *Description*: Side panel sheets and bottom drawers that appear on mobile layouts. Uses `@radix-ui/react-dialog` and `vaul`.
* **[popover.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/popover.tsx)**
  - *Description*: Inline floating info boxes (e.g. notifications feed, calendar popup). Uses `@radix-ui/react-popover`.
* **[collapsible.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/collapsible.tsx)**
  - *Description*: Content panel toggles. Uses `@radix-ui/react-collapsible`.
* **[command.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/command.tsx)**
  - *Description*: Search dialog box inputs (useful for multi-select dropdown command queries). Uses `cmdk`.
* **[context-menu.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/context-menu.tsx)**
  - *Description*: Right-click triggered action menu selectors. Uses `@radix-ui/react-context-menu`.
* **[sonner.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/sonner.tsx)**
  - *Description*: Lightweight toast indicators (triggered when updates or errors happen). Uses `sonner`.

---

### D. Navigation Primitives
* **[sidebar.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/sidebar.tsx)**
  - *Description*: Heavy-duty responsive navigation container used inside the `CandidateDashboard`. Highly responsive with folding support.
* **[navigation-menu.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/navigation-menu.tsx)** & **[menubar.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/menubar.tsx)**
  - *Description*: Navigation bars and dropdown selection items. Uses `@radix-ui/react-navigation-menu` and `@radix-ui/react-menu`.
* **[tabs.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/tabs.tsx)**
  - *Description*: In-page category panel switches. Uses `@radix-ui/react-tabs`.
* **[breadcrumb.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/breadcrumb.tsx)**
  - *Description*: Links indicating page hierarchy location.
* **[pagination.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/pagination.tsx)**
  - *Description*: Pagination control row buttons.

---

### E. Data Presentation, Graphics, & Info
* **[accordion.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/accordion.tsx)**
  - *Description*: Vertical list of collapsible panels (primarily used in FAQ blocks). Uses `@radix-ui/react-accordion`.
* **[alert.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/alert.tsx)**
  - *Description*: Highlighted callout blocks for info warnings.
* **[avatar.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/avatar.tsx)**
  - *Description*: Round profile image components containing initials fallback logic. Uses `@radix-ui/react-avatar`.
* **[badge.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/badge.tsx)**
  - *Description*: Visual badges indicating pill categories or statuses (e.g. "Full-time", "Under Review").
* **[carousel.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/carousel.tsx)**
  - *Description*: Slide horizontal layouts used in school testimonials sections. Uses `embla-carousel-react`.
* **[chart.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/chart.tsx)**
  - *Description*: Graph plotting wrappers matching responsive canvas configurations. Uses `recharts`.
* **[progress.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/progress.tsx)**
  - *Description*: Dynamic progress bars for timelines or assessment timers. Uses `@radix-ui/react-progress`.
* **[skeleton.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/skeleton.tsx)**
  - *Description*: Visual skeleton placeholders indicating content is loading.
* **[table.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/table.tsx)**
  - *Description*: Grid structures formatting tabular data (e.g. lists of job applications).
* **[tooltip.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/tooltip.tsx)**
  - *Description*: Small floating labels appearing on mouse hover. Uses `@radix-ui/react-tooltip`.
* **[hover-card.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/hover-card.tsx)**
  - *Description*: Overlay panels previewing links or metadata on mouse hover. Uses `@radix-ui/react-hover-card`.

---

## 3. Utilities & Contexts

* **[utils.ts](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/utils.ts)**
  Exports the class merging helper `cn`:
  ```typescript
  import { clsx, type ClassValue } from "clsx";
  import { twilightMerge } from "tailwind-merge";

  export function cn(...inputs: ClassValue[]) {
    return twilightMerge(clsx(inputs));
  }
  ```
  This is used across components to safely merge dynamic Tailwind rules (like `px-4 ${className}`) without cascading collisions.

* **[use-mobile.ts](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/use-mobile.ts)**
  A custom React hook that tracks screen resize events to determine mobile breakpoint states:
  ```typescript
  const MOBILE_BREAKPOINT = 768;
  // returns boolean indicating if browser width is less than 768px.
  ```
  Useful for dynamic layouts, sidebar collapsible states, and drawers.
