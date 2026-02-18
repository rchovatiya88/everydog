{
  "brand": {
    "name": "EveryDog League",
    "tagline": "Every Dog Gets to Fly.",
    "visual_personality": [
      "welcoming + inclusive",
      "bright outdoor / Texas park energy",
      "clean + spacious (no cramped sections)",
      "friendly athletic (disc sport cues)",
      "photography-forward with warm sunlight"
    ],
    "design_style_fusion": {
      "layout_principle": "Bento + card grid (events + training), with generous whitespace and strong section headers",
      "surface_style": "Soft modern (rounded 16–20px cards), subtle shadows, light noise texture (NOT gradients for reading areas)",
      "accent_language": "Small orange ‘disc’ highlights + green ‘grass’ chips + sky-blue links/rings"
    }
  },

  "design_tokens": {
    "notes": [
      "Update Tailwind/Shadcn CSS variables in /app/frontend/src/index.css :root to match these tokens.",
      "Avoid dark/saturated gradients. If you use a gradient, keep it subtle and only as a section background overlay (<= 20% viewport).",
      "Prefer solid white for content surfaces; use color on borders, chips, and small accents."
    ],

    "css_custom_properties": {
      "colors_hsl": {
        "--background": "204 50% 98%",
        "--foreground": "214 28% 14%",

        "--card": "0 0% 100%",
        "--card-foreground": "214 28% 14%",

        "--popover": "0 0% 100%",
        "--popover-foreground": "214 28% 14%",

        "--primary": "203 86% 33%",
        "--primary-foreground": "0 0% 100%",

        "--secondary": "142 44% 92%",
        "--secondary-foreground": "156 36% 18%",

        "--muted": "210 30% 96%",
        "--muted-foreground": "215 16% 38%",

        "--accent": "24 94% 55%",
        "--accent-foreground": "0 0% 100%",

        "--destructive": "0 78% 54%",
        "--destructive-foreground": "0 0% 100%",

        "--border": "210 20% 88%",
        "--input": "210 20% 88%",
        "--ring": "202 92% 46%",

        "--chart-1": "202 92% 46%",
        "--chart-2": "142 55% 40%",
        "--chart-3": "24 94% 55%",
        "--chart-4": "196 56% 40%",
        "--chart-5": "33 95% 58%",

        "--radius": "1rem"
      },

      "semantic_hex_aliases": {
        "sky_600": "#0B74B5",
        "sky_500": "#22A4E6",
        "sky_100": "#E7F4FD",

        "grass_600": "#1F7A4A",
        "grass_300": "#7AD69F",
        "grass_100": "#EAF7EF",

        "sun_500": "#FF8A2A",
        "sun_100": "#FFE9D6",

        "ink_900": "#10212B",
        "ink_700": "#2A3B46",
        "ink_500": "#546874",

        "border": "#D7E3EA"
      },

      "shadows": {
        "--shadow-sm": "0 1px 2px rgba(16, 33, 43, 0.06)",
        "--shadow-md": "0 10px 24px rgba(16, 33, 43, 0.10)",
        "--shadow-lg": "0 18px 42px rgba(16, 33, 43, 0.12)"
      },

      "spacing": {
        "section_py": "py-14 sm:py-18 lg:py-22",
        "container_px": "px-4 sm:px-6 lg:px-8",
        "container_max": "max-w-6xl",
        "stack_gap": "gap-6 sm:gap-8",
        "card_padding": "p-5 sm:p-6"
      },

      "radius": {
        "--radius-card": "20px",
        "--radius-button": "12px",
        "--radius-chip": "9999px"
      }
    }
  },

  "typography": {
    "font_pairing": {
      "headings": "Space Grotesk (Google Fonts)",
      "body": "Figtree (Google Fonts)",
      "fallback": "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
    },
    "implementation": {
      "google_fonts_import": "@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');",
      "where": "/app/frontend/src/index.css (top of file)"
    },
    "type_scale_tailwind": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight",
      "h2": "text-base md:text-lg text-muted-foreground",
      "h3_section": "text-2xl sm:text-3xl font-semibold tracking-tight",
      "body": "text-sm sm:text-base leading-relaxed",
      "small": "text-xs sm:text-sm text-muted-foreground"
    },
    "rules": [
      "Use Space Grotesk only for headings and key numerals (e.g., spots remaining).",
      "Keep paragraphs max width: max-w-prose for readability."
    ]
  },

  "layout_and_grid": {
    "global": {
      "container": "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8",
      "section": "py-14 sm:py-18 lg:py-22",
      "grid": {
        "events": "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6",
        "bento": "grid grid-cols-1 lg:grid-cols-12 gap-6"
      }
    },
    "nav_pattern": {
      "style": "Sticky top nav with subtle blur; centered logo left, links right; mobile Sheet menu",
      "tailwind": "sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border"
    },
    "homepage_skeleton": [
      "Hero (left copy + right photo card) + CTA row",
      "3 icon blocks: inclusive / beginner-friendly / Dallas parks",
      "Upcoming Events preview (3 cards) + ‘View all’",
      "Training preview (split card + FAQ teaser)",
      "Community highlights gallery (masonry-like using CSS columns on desktop)",
      "Newsletter signup (big card)",
      "Footer (links + social placeholder)"
    ]
  },

  "components": {
    "component_path": {
      "shadcn": {
        "Button": "/app/frontend/src/components/ui/button.jsx",
        "Card": "/app/frontend/src/components/ui/card.jsx",
        "Badge": "/app/frontend/src/components/ui/badge.jsx",
        "Input": "/app/frontend/src/components/ui/input.jsx",
        "Textarea": "/app/frontend/src/components/ui/textarea.jsx",
        "Select": "/app/frontend/src/components/ui/select.jsx",
        "Checkbox": "/app/frontend/src/components/ui/checkbox.jsx",
        "Accordion": "/app/frontend/src/components/ui/accordion.jsx",
        "Dialog": "/app/frontend/src/components/ui/dialog.jsx",
        "Sheet": "/app/frontend/src/components/ui/sheet.jsx",
        "Tabs": "/app/frontend/src/components/ui/tabs.jsx",
        "Separator": "/app/frontend/src/components/ui/separator.jsx",
        "Calendar": "/app/frontend/src/components/ui/calendar.jsx",
        "Pagination": "/app/frontend/src/components/ui/pagination.jsx",
        "Carousel": "/app/frontend/src/components/ui/carousel.jsx",
        "Sonner": "/app/frontend/src/components/ui/sonner.jsx"
      },
      "recommended_new_components_js": [
        "/app/frontend/src/components/site/SiteHeader.jsx",
        "/app/frontend/src/components/site/SiteFooter.jsx",
        "/app/frontend/src/components/site/Hero.jsx",
        "/app/frontend/src/components/site/EventCard.jsx",
        "/app/frontend/src/components/site/EventFilters.jsx",
        "/app/frontend/src/components/site/GalleryMasonry.jsx",
        "/app/frontend/src/components/site/NewsletterCard.jsx"
      ]
    },

    "buttons": {
      "shape_and_motion": {
        "radius": "rounded-[12px]",
        "hover": "hover:brightness-[0.98] hover:-translate-y-[1px]",
        "active": "active:translate-y-0 active:scale-[0.99]",
        "transition": "transition-[background-color,box-shadow,filter] duration-200",
        "focus": "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      },
      "variants": {
        "primary": {
          "use": "Primary CTAs (Join a Meetup, View Events)",
          "classes": "bg-primary text-primary-foreground shadow-sm hover:shadow-md"
        },
        "secondary": {
          "use": "Support CTAs (Free Training Guides)",
          "classes": "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80"
        },
        "ghost": {
          "use": "Inline links / tertiary",
          "classes": "bg-transparent hover:bg-sky-100 text-foreground"
        },
        "accent": {
          "use": "Occasional highlight CTA (Volunteer)",
          "classes": "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] shadow-sm hover:shadow-md"
        }
      }
    },

    "cards": {
      "base": "rounded-[20px] bg-card text-card-foreground border border-border shadow-[var(--shadow-sm)]",
      "hover": "hover:shadow-[var(--shadow-md)] hover:-translate-y-[2px] transition-[box-shadow] duration-200",
      "event_card_layout": {
        "top_media": "AspectRatio (16/10) with image + subtle overlay chip",
        "content": "Title, date/time, location, skill level badge, spots remaining",
        "cta_row": "Register button + Details link"
      }
    },

    "badges_and_chips": {
      "skill_level": {
        "beginner": "bg-sky-100 text-[color:var(--ink-900)] border border-[#CDEBFA]",
        "intermediate": "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] border border-[#CFEBDD]",
        "advanced": "bg-[hsl(var(--accent))/0.16] text-[hsl(var(--accent))] border border-[hsl(var(--accent))/0.25]"
      },
      "microcopy": "Use chips for ‘All breeds welcome’, ‘Small-dog friendly’, ‘Rescue-friendly’."
    },

    "forms": {
      "rules": [
        "Use shadcn Form (react-hook-form) patterns where present; otherwise keep Inputs with Label.",
        "Mobile-first: single column, big tap targets (min-h-11 for inputs/buttons).",
        "Show helper text for waivers and safety notes."
      ],
      "input_classes": "h-11 rounded-[12px] bg-white",
      "error_text": "text-sm text-destructive",
      "testid_requirement": "Every input/checkbox/select/submit button MUST have data-testid."
    },

    "navigation": {
      "desktop": "NavigationMenu for top-level links (Home, Events, Training, About, Contact)",
      "mobile": "Sheet slide-over with big link buttons",
      "active_state": "underline decoration-sky-500 underline-offset-8 font-medium"
    },

    "gallery": {
      "pattern": "Masonry feel using CSS columns on md+ and simple grid on mobile",
      "implementation_tailwind": {
        "mobile": "grid grid-cols-2 gap-3",
        "desktop": "md:columns-3 md:gap-4 [column-fill:_balance]",
        "item": "mb-3 md:mb-4 break-inside-avoid rounded-[18px] overflow-hidden border border-border shadow-[var(--shadow-sm)]"
      },
      "micro_interaction": "On hover: image scale 1.03 + subtle shadow; on tap: open Dialog lightbox with caption."
    }
  },

  "page_specific_guidance": {
    "home": {
      "hero": {
        "layout": "Split hero: left copy, right photo card with rounded corners and a small ‘Dallas parks’ badge.",
        "background": "Solid light sky wash (bg-[hsl(204_50%_98%)]) + subtle noise overlay. No big gradients.",
        "cta": [
          "Primary: View upcoming events",
          "Secondary: Start training"
        ]
      },
      "upcoming_events_preview": {
        "count": 3,
        "include": ["skill level badge", "spots remaining", "date chip", "Register button"],
        "empty_state": "Show Skeleton cards + copy: ‘New events are dropping soon—join the newsletter.’"
      },
      "newsletter": {
        "pattern": "Large card with email input + opt-in microcopy; success toast via Sonner.",
        "data_testids": [
          "newsletter-email-input",
          "newsletter-submit-button",
          "newsletter-success-message"
        ]
      }
    },

    "events": {
      "filters": {
        "ui": "Sticky filters row (on mobile: horizontally scrollable chips + Select for sort)",
        "components": ["Select", "Badge (as chips)", "Input (search optional)"]
      },
      "list": {
        "sort_options": ["Soonest", "Latest"],
        "filter_options": ["All", "Beginner", "Intermediate", "Advanced", "All-breeds"]
      },
      "event_card": {
        "cta": "Primary ‘Register’ (opens event detail or dialog depending on route)",
        "accessibility": "Event card title should be an h3 and linkable."
      }
    },

    "event_detail": {
      "layout": "Two-column on lg: left details, right sticky registration card. On mobile: registration card appears after key details.",
      "spots_remaining": "Use Progress bar (optional) showing capacity fill (avoid panic red; use sky/grass).",
      "registration_form_fields": [
        "name",
        "email",
        "dogName",
        "breed",
        "size (Select)",
        "experience (Select)",
        "waiver (Checkbox)"
      ],
      "data_testids": [
        "event-detail-register-form",
        "event-register-name-input",
        "event-register-email-input",
        "event-register-dog-name-input",
        "event-register-breed-input",
        "event-register-size-select",
        "event-register-experience-select",
        "event-register-waiver-checkbox",
        "event-register-submit-button",
        "event-spots-remaining-text"
      ]
    },

    "training": {
      "layout": "Guide blocks as Cards + FAQ Accordion. Add Safety Tips as Alert components.",
      "components": ["Accordion", "Alert", "Tabs (optional for Beginner/Intermediate)"]
    },

    "about": {
      "layout": "Editorial feel: wide hero statement, then mission/vision cards, then founder story card with photo placeholder.",
      "tone": "Warm and inclusive; explicitly mention all breeds/sizes welcome."
    },

    "contact": {
      "layout": "Simple two-card layout: contact form + ‘Volunteer with us’ card.",
      "components": ["Textarea", "Checkbox", "Card", "Button"],
      "data_testids": [
        "contact-form",
        "contact-name-input",
        "contact-email-input",
        "contact-message-textarea",
        "contact-volunteer-checkbox",
        "contact-submit-button"
      ]
    }
  },

  "motion_and_microinteractions": {
    "principles": [
      "Motion should feel like outdoor breeze: light, quick, never bouncy.",
      "Use entrance animations sparingly: hero and event cards only.",
      "Never use transition: all."
    ],
    "recommended_library": {
      "name": "framer-motion",
      "install": "npm i framer-motion",
      "usage": [
        "Fade-up on section headings: initial {opacity:0, y:10} -> animate {opacity:1, y:0} duration 0.35",
        "Event card hover: slight lift, shadow increase"
      ]
    },
    "css_motion_snippets": {
      "card_hover": "hover:-translate-y-[2px] transition-[box-shadow] duration-200",
      "image_hover": "group-hover:scale-[1.03] transition-[transform] duration-300"
    },
    "scroll_effect": "Optional: subtle parallax on hero image (translateY 0..-10px) on scroll; disable on prefers-reduced-motion."
  },

  "texture_and_backgrounds": {
    "rule": "No gradients in reading areas. Use a subtle noise overlay instead.",
    "implementation": {
      "noise_css": "body:before { content:''; position:fixed; inset:0; pointer-events:none; opacity:0.06; background-image:url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"180\" height=\"180\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"180\" height=\"180\" filter=\"url(%23n)\" opacity=\"0.35\"/></svg>'); mix-blend-mode:multiply; }",
      "note": "If this feels heavy, apply noise only to hero section background via a pseudo-element."
    }
  },

  "accessibility": {
    "requirements": [
      "WCAG AA contrast: ensure orange accent text is used on light backgrounds only (never orange on white for body text).",
      "Focus states: always show ring using --ring.",
      "Large tap targets: min-h-11 for controls.",
      "Respect prefers-reduced-motion: disable parallax and reduce animations.",
      "Form errors: associate with inputs using aria-describedby."
    ]
  },

  "seo": {
    "meta_patterns": {
      "home": "EveryDog League is Dallas’ inclusive disc dog community—events, training, and friendly meetups. Every Dog Gets to Fly.",
      "events": "Browse upcoming disc dog events in Dallas—beginner-friendly practices, meetups, and workshops.",
      "training": "Learn disc dog basics with beginner guides, safety tips, and FAQs for every breed and size.",
      "about": "Our mission: build an inclusive Dallas disc dog community where every dog gets a chance to fly.",
      "contact": "Contact EveryDog League to ask a question, partner with us, or volunteer at a Dallas disc dog event."
    }
  },

  "image_urls": {
    "hero": [
      {
        "url": "https://images.unsplash.com/photo-1763989979792-67611852276b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxkaXNjJTIwZG9nJTIwY2F0Y2hpbmclMjBmcmlzYmVlJTIwaW4lMjBwYXJrfGVufDB8fHx8MTc3MTQ0Mjc2Nnww&ixlib=rb-4.1.0&q=85",
        "description": "Hero split image: handler + dog + orange disc (perfect for tagline)"
      }
    ],
    "events_cards": [
      {
        "url": "https://images.unsplash.com/photo-1763989979502-15f1142756b2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxkb2clMjBwbGF5aW5nJTIwZnJpc2JlZSUyMGNsb3NlJTIwdXAlMjBhY3Rpb258ZW58MHx8fHwxNzcxNDQyNzcyfDA&ixlib=rb-4.1.0&q=85",
        "description": "Event card image: leaping dog catching disc"
      },
      {
        "url": "https://images.pexels.com/photos/6527910/pexels-photo-6527910.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "description": "Event card image: high-energy action in open field"
      }
    ],
    "training": [
      {
        "url": "https://images.unsplash.com/photo-1760577197564-62a9a8a01ab8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwyfHxkb2clMjB0cmFpbmluZyUyMG91dGRvb3JzJTIwZnJpc2JlZXxlbnwwfHx8fDE3NzE0NDI3Njh8MA&ixlib=rb-4.1.0&q=85",
        "description": "Training page header image: small dog jumping for disc (signals inclusivity for small breeds)"
      }
    ],
    "community_gallery": [
      {
        "url": "https://images.unsplash.com/photo-1675543546478-5bba3508b2b6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHwzfHxkaXZlcnNlJTIwZG9ncyUyMGdyb3VwJTIwcG9ydHJhaXQlMjBvdXRkb29yc3xlbnwwfHx8fDE3NzE0NDI3NzB8MA&ixlib=rb-4.1.0&q=85",
        "description": "Gallery: multiple dogs together outdoors"
      },
      {
        "url": "https://images.unsplash.com/photo-1598134025798-bfb6540ca748?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwzfHxkb2clMjBwbGF5aW5nJTIwZnJpc2JlZSUyMGNsb3NlJTIwdXAlMjBhY3Rpb258ZW58MHx8fHwxNzcxNDQyNzcyfDA&ixlib=rb-4.1.0&q=85",
        "description": "Gallery: border collie sprinting with disc"
      },
      {
        "url": "https://images.pexels.com/photos/10705876/pexels-photo-10705876.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "description": "Gallery: relaxed owner + dog in sunny park (community vibe)"
      }
    ],
    "about": [
      {
        "url": "https://images.unsplash.com/photo-1550284619-8a7419ab3a79?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwxfHxkb2clMjBzaWxob3VldHRlJTIwc3Vuc2V0JTIwcGFya3xlbnwwfHx8fDE3NzE0NDI3Nzh8MA&ixlib=rb-4.1.0&q=85",
        "description": "About page: silhouette of person + dog at sunset (mission/vision mood)"
      }
    ]
  },

  "libraries": {
    "recommended": [
      {
        "name": "framer-motion",
        "why": "Micro-animations for hero entrances and card hovers (keeps site lively)",
        "install": "npm i framer-motion",
        "notes": "Wrap motion usage behind prefers-reduced-motion checks."
      }
    ],
    "optional": [
      {
        "name": "react-intersection-observer",
        "why": "Trigger animations on scroll without heavy custom code",
        "install": "npm i react-intersection-observer"
      }
    ]
  },

  "instructions_to_main_agent": {
    "critical_updates": [
      "REMOVE default CRA App.css centering/header demo styles; do not use .App { text-align:center }.",
      "Update /app/frontend/src/index.css :root tokens to the provided HSL values and set body font-family to Figtree; headings via utility class (e.g., .font-display).",
      "Ensure all interactive elements and key info text have data-testid attributes in kebab-case.",
      "Use shadcn components from /src/components/ui for Select, Sheet, Accordion, Dialog, Calendar—no native HTML dropdowns.",
      "Keep gradients minimal and decorative only (<=20% viewport). Prefer solid backgrounds + noise texture."
    ],
    "js_file_convention": [
      "All new components should be .jsx (not .tsx).",
      "Use named exports for components; default exports for pages."
    ],
    "testing_ids_examples": {
      "nav": [
        "data-testid=\"site-header\"",
        "data-testid=\"nav-events-link\"",
        "data-testid=\"nav-training-link\"",
        "data-testid=\"mobile-menu-button\""
      ],
      "events": [
        "data-testid=\"events-skill-filter-select\"",
        "data-testid=\"events-sort-select\"",
        "data-testid=\"event-card-register-button\""
      ]
    }
  },

  "general_ui_ux_design_guidelines_appendix": "<General UI UX Design Guidelines>\n    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms\n    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text\n   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json\n\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.\n</General UI UX Design Guidelines>"
}
