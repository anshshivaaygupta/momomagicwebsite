# Readability corrections — 10 October 2026

Reproduced on live menu: hovered portion button background and nested price both computed to rgb(239,195,107), giving 1:1 contrast. Price now inherits the dark foreground in hover, active and keyboard-focus states.

Also corrected pale text on the gold visit banner; brighter card descriptions, footer text and labels; solid disabled-button treatment instead of opacity fading; stable initial visibility in public policy pages and enquiry forms; 44–50px controls and 16px form fields; responsive navigation positioned below the actual header; mobile cart reflow and button wrapping; hero copy separated from animated imagery on narrow screens.

All changes scoped to the public storefront. Animations remain on decorative images and the 3D scene. Checkout payment gate is unchanged.

Validation: production build, public route/image/link checks, live browser reproduction and post-deploy computed-style check. Cloud browser has no viewport-resize capability, so narrow-screen rules were reviewed in source; a physical-device visual test is still recommended. Cloud WebGL is disabled, so only the 3D fallback is visually verified in this environment.
