# VOL-02: Design System & UI Standards
## Roof Ridge — Enterprise Software Blueprint

---

## 2.1 Brand Identity

### 2.1.1 Brand Values
- **Trust** — Verified listings, verified partners, escrow payments
- **Simplicity** — One platform for every home need
- **Empowerment** — AI tools, instant eligibility, transparent pricing
- **Premium** — Quality-first across every touchpoint

### 2.1.2 Logo Usage
- Primary Logo: Full wordmark "Roof Ridge" with icon (house + ridge silhouette)
- Icon Only: For mobile tab bars, favicons, app icons
- Minimum size: 120px wide for wordmark, 32px for icon
- Clear space: 16px on all sides minimum
- Formats: SVG (web), PNG @1x/2x/3x (mobile), WebP (email)

---

## 2.2 Color System

### 2.2.1 Brand Colors

```css
/* Primary Palette */
--color-primary-50:   #FFF4F0;   /* Lightest tint */
--color-primary-100:  #FFE4D8;
--color-primary-200:  #FFC4A8;
--color-primary-300:  #FF9E73;
--color-primary-400:  #FF7840;
--color-primary-500:  #FF5722;   /* Brand Orange — Primary CTA */
--color-primary-600:  #E04018;
--color-primary-700:  #BA2F0F;
--color-primary-800:  #8F2008;
--color-primary-900:  #5C1203;   /* Darkest shade */

/* Secondary Palette */
--color-secondary-50:  #F0F4FF;
--color-secondary-100: #D8E4FF;
--color-secondary-200: #AABFFF;
--color-secondary-300: #7B97FF;
--color-secondary-400: #4F6EFF;
--color-secondary-500: #2B4AE8;   /* Deep Blue — Trust */
--color-secondary-600: #1E38C9;
--color-secondary-700: #142AAB;
--color-secondary-800: #0D1E82;
--color-secondary-900: #071257;

/* Neutral Palette */
--color-neutral-0:    #FFFFFF;
--color-neutral-50:   #F8F9FA;
--color-neutral-100:  #F1F3F5;
--color-neutral-200:  #E9ECEF;
--color-neutral-300:  #DEE2E6;
--color-neutral-400:  #CED4DA;
--color-neutral-500:  #ADB5BD;
--color-neutral-600:  #868E96;
--color-neutral-700:  #495057;
--color-neutral-800:  #343A40;
--color-neutral-900:  #212529;
--color-neutral-950:  #0D0F12;   /* Near Black */

/* Semantic Colors */
--color-success-50:   #F0FFF4;
--color-success-500:  #38A169;   /* Success Green */
--color-success-700:  #276749;

--color-warning-50:   #FFFBEB;
--color-warning-500:  #F59E0B;   /* Warning Amber */
--color-warning-700:  #B45309;

--color-error-50:     #FFF5F5;
--color-error-500:    #E53E3E;   /* Error Red */
--color-error-700:    #9B2C2C;

--color-info-50:      #EBF8FF;
--color-info-500:     #3182CE;   /* Info Blue */
--color-info-700:     #2C5282;

/* Special */
--color-verified:     #00B37E;   /* Verified badge green */
--color-premium:      #C89B3C;   /* Gold for premium/featured */
--color-hot-lead:     #FF3B30;   /* Hot lead indicator */
--color-warm-lead:    #FF9500;   /* Warm lead indicator */
--color-cold-lead:    #5AC8FA;   /* Cold lead indicator */
```

### 2.2.2 Dark Mode Tokens

```css
/* Dark Mode Surface Colors */
--dm-surface-0:      #0D0F12;   /* Page background */
--dm-surface-1:      #151920;   /* Card background */
--dm-surface-2:      #1E2430;   /* Elevated card */
--dm-surface-3:      #28303F;   /* Modals */
--dm-border:         #2E3648;
--dm-text-primary:   #F1F3F5;
--dm-text-secondary: #ADB5BD;
--dm-text-muted:     #6C7993;
```

---

## 2.3 Typography

### 2.3.1 Font Families

```css
/* Google Fonts Import */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800&display=swap');

/* Font Stack */
--font-primary:   'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-heading:   'Outfit', 'Inter', -apple-system, sans-serif;
--font-mono:      'Fira Code', 'Courier New', monospace;
```

### 2.3.2 Type Scale

```css
/* Display */
--text-display-2xl: 4.5rem;    /* 72px — Hero headline */
--text-display-xl:  3.75rem;   /* 60px */
--text-display-lg:  3rem;      /* 48px */
--text-display-md:  2.25rem;   /* 36px */
--text-display-sm:  1.875rem;  /* 30px */

/* Headings */
--text-h1: 2rem;       /* 32px */
--text-h2: 1.5rem;     /* 24px */
--text-h3: 1.25rem;    /* 20px */
--text-h4: 1.125rem;   /* 18px */
--text-h5: 1rem;       /* 16px */
--text-h6: 0.875rem;   /* 14px */

/* Body */
--text-xl:  1.25rem;   /* 20px */
--text-lg:  1.125rem;  /* 18px */
--text-md:  1rem;      /* 16px — Base */
--text-sm:  0.875rem;  /* 14px */
--text-xs:  0.75rem;   /* 12px */
--text-2xs: 0.625rem;  /* 10px */

/* Line Heights */
--leading-tight:   1.25;
--leading-snug:    1.375;
--leading-normal:  1.5;
--leading-relaxed: 1.625;
--leading-loose:   2;

/* Font Weights */
--fw-light:      300;
--fw-regular:    400;
--fw-medium:     500;
--fw-semibold:   600;
--fw-bold:       700;
--fw-extrabold:  800;
--fw-black:      900;

/* Letter Spacing */
--tracking-tight:  -0.025em;
--tracking-normal:  0em;
--tracking-wide:    0.025em;
--tracking-wider:   0.05em;
--tracking-widest:  0.1em;
```

---

## 2.4 Spacing System

```css
/* Base unit: 4px (0.25rem) */
--space-0:   0;
--space-1:   0.25rem;   /* 4px */
--space-2:   0.5rem;    /* 8px */
--space-3:   0.75rem;   /* 12px */
--space-4:   1rem;      /* 16px */
--space-5:   1.25rem;   /* 20px */
--space-6:   1.5rem;    /* 24px */
--space-7:   1.75rem;   /* 28px */
--space-8:   2rem;      /* 32px */
--space-10:  2.5rem;    /* 40px */
--space-12:  3rem;      /* 48px */
--space-14:  3.5rem;    /* 56px */
--space-16:  4rem;      /* 64px */
--space-20:  5rem;      /* 80px */
--space-24:  6rem;      /* 96px */
--space-32:  8rem;      /* 128px */
--space-40:  10rem;     /* 160px */
--space-48:  12rem;     /* 192px */
--space-56:  14rem;     /* 224px */
--space-64:  16rem;     /* 256px */
```

---

## 2.5 Border Radius

```css
--radius-none:  0;
--radius-sm:    0.25rem;   /* 4px */
--radius-md:    0.5rem;    /* 8px */
--radius-lg:    0.75rem;   /* 12px */
--radius-xl:    1rem;      /* 16px */
--radius-2xl:   1.5rem;    /* 24px */
--radius-3xl:   2rem;      /* 32px */
--radius-full:  9999px;    /* Pill */
```

---

## 2.6 Shadow System

```css
--shadow-xs:   0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm:   0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
--shadow-md:   0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-lg:   0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
--shadow-xl:   0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
--shadow-2xl:  0 25px 50px -12px rgba(0, 0, 0, 0.25);
--shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);

/* Brand Shadows */
--shadow-primary: 0 4px 14px 0 rgba(255, 87, 34, 0.3);
--shadow-card:    0 2px 12px 0 rgba(0, 0, 0, 0.08);
--shadow-card-hover: 0 8px 30px 0 rgba(0, 0, 0, 0.12);
```

---

## 2.7 Animation & Transitions

### 2.7.1 Duration Tokens

```css
--duration-75:   75ms;
--duration-100:  100ms;
--duration-150:  150ms;
--duration-200:  200ms;
--duration-300:  300ms;
--duration-500:  500ms;
--duration-700:  700ms;
--duration-1000: 1000ms;
```

### 2.7.2 Easing Functions

```css
--ease-linear:    linear;
--ease-in:        cubic-bezier(0.4, 0, 1, 1);
--ease-out:       cubic-bezier(0, 0, 0.2, 1);
--ease-in-out:    cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring:    cubic-bezier(0.175, 0.885, 0.32, 1.275);
--ease-bounce:    cubic-bezier(0.68, -0.55, 0.27, 1.55);
```

### 2.7.3 Standard Transitions

```css
/* Default Transition */
transition: all var(--duration-200) var(--ease-in-out);

/* Hover Lift (Cards) */
.card-hover {
  transition: transform var(--duration-200) var(--ease-out),
              box-shadow var(--duration-200) var(--ease-out);
}
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
}

/* Button Press */
.btn:active {
  transform: scale(0.97);
  transition: transform var(--duration-75) var(--ease-in);
}

/* Page Transitions (Framer Motion) */
pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.2 } }
}

/* Modal Open */
modalVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  exit:    { opacity: 0, scale: 0.95 }
}

/* Drawer Slide */
drawerVariants = {
  initial: { x: '100%' },
  animate: { x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit:    { x: '100%', transition: { duration: 0.2 } }
}

/* Count Up Animation */
/* Use react-countup with 2000ms duration, easeOut easing */

/* Skeleton Pulse */
@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}
.skeleton { animation: skeleton-pulse 1.5s ease-in-out infinite; }
```

---

## 2.8 Component Library

### 2.8.1 Button Component

**Variants:** Primary | Secondary | Outline | Ghost | Destructive | Link

**Sizes:** xs | sm | md | lg | xl

```tsx
// Button Props
interface ButtonProps {
  variant:  'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  size:     'xs' | 'sm' | 'md' | 'lg' | 'xl';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;  // If provided, renders as <a>
  children: ReactNode;
}

// Visual States
// DEFAULT: Solid fill, brand color, white text
// HOVER:   Darken 8%, translateY(-1px), shadow increase
// ACTIVE:  Darken 16%, scale(0.97)
// FOCUS:   3px outline, color-primary-300
// LOADING: Spinner replaces icon, text changes to loadingText
// DISABLED: opacity-50, cursor-not-allowed
// SUCCESS: Checkmark icon, brief green color (1.5s auto-reset)

// Loading State Specification
// - Shows circular spinner (16px for sm, 20px for md, 24px for lg)
// - Spinner on LEFT of text
// - Button width does not change during loading
// - Click events disabled during loading

// CSS
.btn-primary {
  background: var(--color-primary-500);
  color: white;
  border-radius: var(--radius-lg);
  font-weight: var(--fw-semibold);
  padding: 0.75rem 1.5rem;
  transition: all var(--duration-200) var(--ease-in-out);
  box-shadow: var(--shadow-primary);
}
.btn-primary:hover {
  background: var(--color-primary-600);
  box-shadow: 0 6px 20px 0 rgba(255, 87, 34, 0.4);
  transform: translateY(-1px);
}
```

**Size Specifications:**

| Size | Height | Padding H | Font Size | Icon Size |
|------|--------|-----------|-----------|-----------|
| xs | 28px | 12px | 12px | 14px |
| sm | 36px | 16px | 14px | 16px |
| md | 44px | 20px | 16px | 18px |
| lg | 52px | 24px | 18px | 20px |
| xl | 60px | 32px | 20px | 22px |

---

### 2.8.2 Input Field Component

```tsx
interface InputProps {
  type: 'text' | 'email' | 'tel' | 'number' | 'password' | 'search' | 'url';
  label: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  rightElement?: ReactNode;  // For "Show/Hide" password button
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
  inputMode?: 'text' | 'numeric' | 'tel' | 'email' | 'decimal';
}

// Visual States
// DEFAULT: 1px border neutral-300, white bg, neutral-700 text
// FOCUS:   2px border primary-500, subtle glow ring
// ERROR:   1px border error-500, error message below, error icon right
// SUCCESS: 1px border success-500, check icon right
// DISABLED: neutral-100 bg, neutral-400 text, cursor-not-allowed
// READONLY: neutral-50 bg, neutral-600 text
```

---

### 2.8.3 Card Component

```tsx
interface CardProps {
  variant: 'default' | 'elevated' | 'outlined' | 'ghost';
  isClickable?: boolean;
  isSelected?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: ReactNode;
}

// Card States
// DEFAULT: white bg, shadow-card, radius-xl
// HOVER (clickable): translateY(-4px), shadow-card-hover, 200ms ease-out
// SELECTED: 2px border primary-500, subtle primary-50 bg tint
// LOADING: Skeleton overlay with pulse animation
```

---

### 2.8.4 Property Card Component

```
┌─────────────────────────────────────────┐
│  [Photo Gallery Thumbnail — 200px h]    │
│  [Verified Badge] [Save ♡] [Share ↗]  │
├─────────────────────────────────────────┤
│  ₹85,00,000                             │
│  3 BHK Flat · 1,250 sq.ft               │
│  Dwarka Sector 12, New Delhi            │
├─────────────────────────────────────────┤
│  🛏 3 Beds  🚿 2 Baths  🅿 Parking     │
├─────────────────────────────────────────┤
│  [EMI ₹42,500/mo] [Enquire Now →]     │
└─────────────────────────────────────────┘
```

**Card States:**
- **Default**: Border none, shadow-sm
- **Hover**: shadow-xl, translateY(-4px), orange border glow
- **Featured/Boosted**: Gold border top strip, "Featured" badge
- **Verified**: Green checkmark badge on photo
- **Sold/Rented**: Grayscale overlay, "SOLD" / "RENTED" stamp diagonal
- **Loading Skeleton**: 3 lines of animated skeleton

---

### 2.8.5 Skeleton Loader Patterns

```
// Property Card Skeleton
┌─────────────────────────────────────────┐
│  ████████████████████████████████████  │  ← 200px pulse block
│  ████████████████████████████████████  │
├─────────────────────────────────────────┤
│  ██████████████████     (price)         │
│  ████████████████████████  (title)      │
│  ██████████████  (location)             │
├─────────────────────────────────────────┤
│  ████████   ████████   ████████        │  ← 3 spec pills
├─────────────────────────────────────────┤
│  ███████████   ████████████████        │  ← 2 button skeletons
└─────────────────────────────────────────┘
```

---

### 2.8.6 Modal Component

```tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;  // default: true
  closeOnEsc?: boolean;           // default: true
  showCloseButton?: boolean;      // default: true
  footer?: ReactNode;
  children: ReactNode;
}

// Modal Sizes
// xs:   320px max-width
// sm:   448px max-width
// md:   560px max-width (default)
// lg:   720px max-width
// xl:   900px max-width
// full: 100vw × 100vh

// Behavior
// - Overlay: rgba(0,0,0,0.6), backdrop-filter: blur(4px)
// - Open animation: scale 0.95→1, opacity 0→1 (200ms ease-out)
// - Close animation: scale 1→0.95, opacity 1→0 (150ms ease-in)
// - Body scroll locked when open
// - Focus trap within modal
// - Close button: top-right, 32×32px, × icon, neutral-500
// - ESC key closes unless closeOnEsc=false
```

---

### 2.8.7 Drawer Component

```tsx
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  placement: 'left' | 'right' | 'top' | 'bottom';
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: ReactNode;
}

// Drawer Sizes (width for left/right; height for top/bottom)
// xs:   280px
// sm:   360px
// md:   480px  (default)
// lg:   640px
// xl:   800px
// full: 100%

// Behavior
// - Slide animation: 300ms ease-out
// - Overlay: rgba(0,0,0,0.4)
// - Mobile: Always bottom drawer for filter panels
// - Swipe-to-close on mobile (touch gesture)
```

---

### 2.8.8 Toast / Notification Component

```tsx
interface ToastProps {
  variant: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  duration?: number;     // default: 4000ms
  position: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';
  isClosable?: boolean;
  action?: { label: string; onClick: () => void };
}

// Toast States
// ENTERING: slide in from right + fade in (300ms)
// VISIBLE:  displayed with progress bar
// EXITING:  slide out right + fade out (200ms)
// MAX STACK: 3 toasts visible at once; oldest auto-dismisses
```

---

### 2.8.9 Badge Component

| Badge | Color | Usage |
|-------|-------|-------|
| Verified | Green (#00B37E) | KYC-verified user/partner |
| Featured | Gold (#C89B3C) | Boosted/paid listing |
| New | Blue | Listed within 24 hours |
| Hot Deal | Red | Discounted price |
| RERA | Dark green | RERA-registered |
| Premium | Purple | Premium partner |
| Hot Lead | Red | AI: Hot lead score |
| Warm Lead | Orange | AI: Warm lead score |
| Cold Lead | Blue | AI: Cold lead score |

---

### 2.8.10 Form Components

#### Dropdown / Select

```tsx
// Single Select
interface SelectProps {
  options: { value: string; label: string; icon?: ReactNode }[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;
  maxMenuHeight?: number;
}

// Multi Select (for amenities, cities, etc.)
interface MultiSelectProps extends Omit<SelectProps, 'value'> {
  value?: string[];
  maxSelected?: number;
  showSelectedCount?: boolean;
}
```

#### Price Slider (Range Input)

```tsx
interface PriceSliderProps {
  min: number;       // e.g., 500000 (5L)
  max: number;       // e.g., 50000000 (5Cr)
  step: number;      // e.g., 100000 (1L)
  value: [number, number];
  onChange: (value: [number, number]) => void;
  formatLabel: (value: number) => string;  // "₹42L", "₹2.5Cr"
}

// Mobile behavior: touch drag enabled
// Track height: 4px default, 6px on hover
// Thumb size: 20px, primary-500 color
// Tooltip: shows current value on drag
```

#### OTP Input

```tsx
interface OTPInputProps {
  length: number;         // 6 for Roof Ridge
  onComplete: (otp: string) => void;
  onChange: (otp: string) => void;
  autoFocus?: boolean;
  inputMode: 'numeric';
  type: 'number';
}

// Behavior:
// - Individual input boxes (6 boxes)
// - Auto-advances on digit entry
// - Auto-paste from clipboard (Android SMS retriever)
// - Backspace goes to previous box
// - Error state: all boxes go red, shake animation
// - Box size: 56×64px desktop, 44×52px mobile
```

---

## 2.9 Icon System

Use **Phosphor Icons** (phosphoricons.com) — consistent, duotone-capable, comprehensive.

### Icon Size Scale

| Size Token | px | Usage |
|------------|-----|-------|
| `icon-xs` | 14px | Inline text icons |
| `icon-sm` | 16px | Button icons, form icons |
| `icon-md` | 20px | Card icons |
| `icon-lg` | 24px | Navigation icons |
| `icon-xl` | 32px | Feature icons |
| `icon-2xl` | 48px | Section icons |
| `icon-3xl` | 64px | Hero/empty state icons |

### Key Icons Used

| Context | Icon Name | Phosphor |
|---------|-----------|----------|
| Property | House, Buildings, Map | `house`, `buildings`, `map-pin` |
| Search | MagnifyingGlass | `magnifying-glass` |
| Save/Favorite | Heart, HeartFill | `heart`, `heart-fill` |
| Verified | SealCheck | `seal-check` |
| Call | Phone | `phone` |
| WhatsApp | WhatsappLogo | `whatsapp-logo` |
| Share | ShareNetwork | `share-network` |
| Location | MapPin | `map-pin` |
| Bedroom | Bed | `bed` |
| Bathroom | Bathtub | `bathtub` |
| Area | SquaresFour | `squares-four` |
| Parking | Car | `car` |
| Loan | Bank | `bank` |
| Calendar | Calendar | `calendar` |
| User | User, UserCircle | `user` |
| Settings | Gear | `gear` |
| Notification | Bell | `bell` |
| Lead | Funnel | `funnel` |
| Chart | ChartBar | `chart-bar` |
| Documents | FilePdf, FileText | `file-pdf` |
| Upload | Upload | `upload-simple` |
| Download | Download | `download-simple` |
| Filter | Funnel | `funnel` |
| Sort | ArrowsDownUp | `arrows-down-up` |
| Close | X, XCircle | `x`, `x-circle` |
| Back | ArrowLeft | `arrow-left` |
| Forward | ArrowRight | `arrow-right` |
| External | ArrowSquareOut | `arrow-square-out` |
| More | DotsThreeVertical | `dots-three-vertical` |
| Checkmark | Check, CheckCircle | `check`, `check-circle` |
| Error | Warning, XCircle | `warning`, `x-circle` |
| Info | Info | `info` |
| Star | Star, StarFill | `star`, `star-fill` |
| Edit | PencilSimple | `pencil-simple` |
| Delete | Trash | `trash` |
| Add | Plus, PlusCircle | `plus` |
| Expand | CaretDown | `caret-down` |
| Collapse | CaretUp | `caret-up` |

---

## 2.10 Grid & Layout System

### 2.10.1 Breakpoints

```css
--breakpoint-xs:  375px;   /* Small mobile */
--breakpoint-sm:  640px;   /* Large mobile */
--breakpoint-md:  768px;   /* Tablet portrait */
--breakpoint-lg:  1024px;  /* Tablet landscape / small desktop */
--breakpoint-xl:  1280px;  /* Desktop */
--breakpoint-2xl: 1440px;  /* Wide desktop */
--breakpoint-3xl: 1920px;  /* Ultra-wide */
```

### 2.10.2 Container Widths

```css
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--space-4);

  @media (min-width: 640px)  { padding: 0 var(--space-6); }
  @media (min-width: 768px)  { padding: 0 var(--space-8); }
  @media (min-width: 1024px) { max-width: 960px; }
  @media (min-width: 1280px) { max-width: 1200px; }
  @media (min-width: 1440px) { max-width: 1360px; }
}
```

### 2.10.3 Grid Columns

| Screen | Columns | Gutter |
|--------|---------|--------|
| Mobile (<640px) | 4 | 16px |
| Tablet (640-1024px) | 8 | 24px |
| Desktop (>1024px) | 12 | 32px |

---

## 2.11 Responsive Behavior Rules

### Universal Rules
1. **No horizontal scrolling** — ever, on any page
2. **Touch targets** — minimum 44×44px on mobile
3. **Tables on mobile** — convert to card/accordion view
4. **Sticky bottom bar** on mobile for primary CTAs
5. **Keyboard types** — `inputMode="numeric"` for phone/PAN/OTP, `inputMode="email"` for email
6. **Font sizes** — minimum 16px for inputs (prevents iOS zoom)
7. **Images** — lazy loaded, WebP format, max 200KB
8. **Sliders** — touch drag support with visual thumb handle

### Navigation Responsive Behavior

| Screen | Navigation Pattern |
|--------|-------------------|
| Mobile (<768px) | Bottom tab bar (4 items) + Hamburger for rest |
| Tablet (768-1024px) | Collapsed top nav with hamburger |
| Desktop (>1024px) | Full horizontal top navigation |

### Property Grid Responsive

| Screen | Columns | Card Height |
|--------|---------|-------------|
| Mobile | 1 | auto |
| Tablet | 2 | auto |
| Desktop | 3 | auto |
| Wide | 4 | auto |

---

## 2.12 Empty States

Every list, grid, search result, and data section must have an empty state:

```
Standard Empty State Structure:
┌─────────────────────────────────┐
│                                 │
│         [Illustration]          │
│         (64-96px icon)          │
│                                 │
│       "No Properties Found"     │  ← Primary message (h3)
│                                 │
│   "Try adjusting your filters   │  ← Helper text
│    or searching a different     │
│    area."                       │
│                                 │
│        [Clear Filters]          │  ← CTA (optional)
│                                 │
└─────────────────────────────────┘
```

### Empty State Messages

| Context | Title | Subtitle | CTA |
|---------|-------|----------|-----|
| Property search | "No Properties Found" | "Try adjusting your filters" | "Clear Filters" |
| Saved properties | "No Saved Properties Yet" | "Heart properties you like to save them here" | "Browse Properties" |
| Active bookings | "No Active Bookings" | "Book a service to see it here" | "Explore Services" |
| Notifications | "You're All Caught Up!" | "No new notifications" | — |
| Lead inbox | "No Leads Yet" | "Leads will appear here as they arrive" | — |
| Documents | "No Documents Uploaded" | "Upload your property documents" | "Upload Document" |
| Blog results | "No Articles Found" | "Try a different search term" | "Browse All Articles" |
| Cart | "Your Cart is Empty" | "Add materials to get started" | "Browse Materials" |
| Orders | "No Orders Yet" | "Your material orders will appear here" | "Browse Materials" |
| Chat | "Start a Conversation" | "Send a message to this partner" | — |

---

## 2.13 Loading States

### Page-Level Loading
- Full page: White background + centered spinner + brand logo above
- Spinner: 40px, brand primary color, 1s rotation

### Section-Level Loading
- Skeleton loaders that match content shape exactly
- Pulse animation at 1.5s interval

### Action Loading (Buttons)
- Replace button content with spinner
- Disable all interactions
- Show loading text if provided

### Search Loading
- Skeleton cards (3-4) immediately visible
- Results populate with fade-in (200ms)

---

## 2.14 Error States

### Network Error

```
┌─────────────────────────────────┐
│         📡 (signal icon)        │
│                                 │
│    "Something went wrong"       │
│                                 │
│    "Please check your internet  │
│     connection and try again"   │
│                                 │
│         [Try Again]             │
└─────────────────────────────────┘
```

### 404 Page

```
┌─────────────────────────────────┐
│         🏚 (house icon)         │
│          "404"                  │
│                                 │
│    "This page doesn't exist"   │
│                                 │
│    "The page you're looking for │
│     might have been moved."     │
│                                 │
│    [Go Home]  [Browse Properties]│
└─────────────────────────────────┘
```

### 500 Server Error

```
┌─────────────────────────────────┐
│         🔧 (wrench icon)        │
│                                 │
│    "We're fixing something"     │
│                                 │
│    "Our team has been notified. │
│     Please try again shortly."  │
│                                 │
│    [Try Again]  [Contact Support]│
└─────────────────────────────────┘
```

---

## 2.15 Accessibility Standards (WCAG 2.1 AA)

### Requirements
- **Contrast ratios**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus indicators**: Visible 3px ring on all interactive elements
- **Alt text**: Required on all images, empty for decorative images
- **ARIA labels**: On all icon-only buttons (`aria-label`)
- **Form labels**: Every input has an associated `<label>`
- **Error announcement**: `role="alert"` on error messages
- **Skip links**: "Skip to main content" at top of every page
- **Keyboard navigation**: All interactions operable via keyboard
- **Tab order**: Logical tab sequence matching visual order
- **No color-only info**: Status never conveyed by color alone
- **Touch targets**: ≥44×44px for all interactive elements
- **Language**: `lang="en"` (or `hi`) on HTML element
- **Headings**: Logical hierarchy (h1→h2→h3, no skipping)
- **Tables**: `<th scope>` for all header cells
- **Dynamic content**: `aria-live` regions for updates

---

## 2.16 SEO Standards (Per Page)

### Required Meta Tags

```html
<!-- Title (50-60 chars) -->
<title>3 BHK Flat for Sale in Dwarka Sector 12, Delhi | Roof Ridge</title>

<!-- Meta Description (150-160 chars) -->
<meta name="description" content="Buy verified 3 BHK flat in Dwarka Sector 12, Delhi at ₹85L. EMI from ₹42,500/month. Compare prices, get instant loan approval. Roof Ridge — India's #1 property platform." />

<!-- Canonical -->
<link rel="canonical" href="https://roofridge.in/property/3-bhk-flat-dwarka-12345/" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:title" content="3 BHK Flat for Sale in Dwarka Sector 12 | Roof Ridge" />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://cdn.roofridge.in/properties/xyz/og-image.jpg" />
<meta property="og:url" content="https://roofridge.in/property/..." />
<meta property="og:site_name" content="Roof Ridge" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />

<!-- Robots -->
<meta name="robots" content="index, follow" />

<!-- Schema: RealEstateListing -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "3 BHK Flat for Sale in Dwarka Sector 12",
  "description": "...",
  "url": "https://roofridge.in/property/...",
  "image": ["..."],
  "offers": {
    "@type": "Offer",
    "price": "8500000",
    "priceCurrency": "INR"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dwarka Sector 12",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  }
}
</script>
```

---

*Continue to VOL-03 — Database Architecture & ER Diagram*
