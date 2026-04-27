# Design System Strategy: The Artisanal Curator

## 1. Overview & Creative North Star
This design system is built upon the Creative North Star of **"The Artisanal Curator."** We are not just building a food menu; we are curating a high-end culinary gallery. The aesthetic balances the rustic, tactile "crunch" of a heritage empanada with the sophisticated polish of a modern editorial magazine.

To break the "template" look, we move away from rigid, symmetrical grids. Instead, use **Intentional Asymmetry**: overlap high-resolution, isolated food photography across container boundaries, and use dramatic shifts in typography scale to create a sense of rhythm and hierarchy. The interface should feel like a premium physical publication—airy, intentional, and textured.

---

## 2. Colors & Surface Logic
The palette is anchored by `primary` (#ae2a02), a sophisticated evolution of the brand’s Naranja, supported by a vibrant secondary suite that reflects the diverse fillings and heritage of the product.

### The "No-Line" Rule
**Strict Mandate:** Prohibit the use of 1px solid borders for sectioning or containment. Structural boundaries must be defined solely through background color shifts. Use `surface-container-low` (#ffeffa) to define a section against a `surface` (#fff7fa) background. This creates a soft, high-end transition that feels organic rather than mechanical.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine artisanal paper.
*   **Base:** `surface` (#fff7fa) or `surface-container-lowest` (#ffffff).
*   **Inlay:** Use `surface-container` (#ffe7fb) for grouped content areas.
*   **Elevation:** Use `surface-bright` for elements that need to feel "closer" to the user.
By nesting these tones, we create depth without the visual clutter of lines.

### Signature Textures & Glass
*   **The "Vibrant Gradient":** For main CTAs and Hero accents, use a subtle linear gradient transitioning from `primary` (#ae2a02) to `primary_container` (#d1421d). This adds "soul" and mimics the natural color variance found in toasted pastry.
*   **Glassmorphism:** For floating navigation bars or over-image labels, use `surface` at 80% opacity with a `20px` backdrop-blur. This softens the edges and integrates the UI with the photography.

---

## 3. Typography: Editorial Authority
The typography system pairs the bold, architectural weight of **Epilogue** with the functional, modern clarity of **Manrope**.

*   **Display & Headlines (Epilogue):** These are your "hero" elements. Use `display-lg` (3.5rem) with tight letter-spacing to command attention. Headlines should feel like magazine titles—unapologetically large and authoritative.
*   **Body & Titles (Manrope):** Use `body-lg` (1rem) for descriptions to ensure readability. Manrope’s clean geometry provides a necessary "quiet" space against the expressive headers.
*   **Tonal Hierarchy:** Always use `on_surface` (#300b35) for maximum legibility, but utilize `on_surface_variant` (#5a413a) for secondary metadata to create a sophisticated grey-scale rhythm.

---

## 4. Elevation & Depth
Depth in this system is achieved through **Tonal Layering** and **Ambient Light**, never through heavy dropshadows.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. The slight shift in hex value provides a natural, "ghost" lift.
*   **Ambient Shadows:** If an element must float (e.g., a "Quick Cart" modal), use a shadow with a `40px` blur and `4%` opacity, tinted with the `secondary` color (#7a4f7d). This mimics natural light reflecting off a colored surface.
*   **The "Ghost Border" Fallback:** If accessibility requires a border, use the `outline_variant` (#e2bfb6) at **15% opacity**. It should be barely perceptible, serving as a suggestion of a boundary rather than a hard stop.

---

## 5. Components

### The Signature "Bite" Cutout
Every image container and primary CTA must feature the **Concave "Bite" Cutout**.
*   **Implementation:** Use a mask-image or clip-path on the top-right or bottom-left corner of the container. This is our visual hook—it represents the first bite of the empanada and breaks the monotony of rectangular digital design.

### Buttons
*   **Primary:** Features the `primary` to `primary_container` gradient and the signature "Bite" cutout on the right side.
*   **Secondary:** Ghost-style using `outline` token with `label-md` typography.
*   **Interaction:** On hover, the "Bite" cutout should subtly increase in size (scale 1.1), simulating a deeper "crunch."

### Cards & Lists
*   **Constraint:** Zero dividers. Use vertical white space (Spacing `8` or `10`) to separate items.
*   **Visual Style:** For artisanal product listings, use `surface-container-low` backgrounds with "Bite" cutouts on the images. Text should be left-aligned with generous `padding-6`.

### Chips (Flavour Indicators)
*   Use `secondary_container` (#ffc9fe) for meat-based flavors and `tertiary_fixed` (#f8e46e) for vegetarian options. Shapes should be `rounded-full` to contrast the sharp "Bite" cutouts elsewhere.

---

## 6. Do's and Don'ts

### Do:
*   **Do** embrace negative space. If a layout feels "full," remove an element.
*   **Do** overlap elements. Let an empanada image (transparent PNG) spill out of its container and over a headline.
*   **Do** use the Spacing Scale strictly. Consistent "breathing room" is what makes a design feel premium.

### Don't:
*   **Don't** use 100% black. Use `on_surface` (#300b35) for all dark text to maintain the "Artisanal Curator" warmth.
*   **Don't** use standard 1px borders or heavy shadows. If the depth feels flat, adjust the `surface-container` tier instead.
*   **Don't** use center-alignment for long-form text. Stick to left-aligned editorial layouts to maintain the "Curated Gallery" feel.