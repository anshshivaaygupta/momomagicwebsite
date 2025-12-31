# 🎨 MOMOS MAGIC - COMPLETE COLOR SYSTEM DOCUMENTATION

## 📋 TABLE OF CONTENTS
1. [Core Brand Colors](#core-brand-colors)
2. [Extended Color Palette](#extended-color-palette)
3. [Gradient System](#gradient-system)
4. [Button Styling System](#button-styling-system)
5. [Badge & Category System](#badge--category-system)
6. [Card & Container Styling](#card--container-styling)
7. [Typography & Text Colors](#typography--text-colors)
8. [Border, Shadow & Glow Effects](#border-shadow--glow-effects)
9. [Hover Effects & Animations](#hover-effects--animations)
10. [Section-Specific Styling Rules](#section-specific-styling-rules)

---

## 🎯 CORE BRAND COLORS

### Primary Colors

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| **Pitch Black** | `#000000` | `rgb(0, 0, 0)` | Main background, base surfaces, primary text backgrounds |
| **Premium Orange** | `#ffc241` | `rgb(255, 194, 65)` | Primary buttons, main CTAs, highlights, active states |

### Tailwind CSS Configuration
```css
--pitch-black: #000000;
--premium-orange: #ffc241;
```

---

## 🌈 EXTENDED COLOR PALETTE

### Supporting Colors

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| **Deep Space** | `#0a0a0a` | `rgb(10, 10, 10)` | Cards, containers, elevated surfaces |
| **Charcoal** | `#111111` | `rgb(17, 17, 17)` | Secondary elements, borders, dividers |
| **Golden Glow** | `#ffd700` | `rgb(255, 215, 0)` | Premium highlights, special elements, ratings |
| **Burnt Orange** | `#e6ac00` | `rgb(230, 172, 0)` | Secondary buttons, hover states |

### Functional Colors

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| **Vegetarian Green** | `#059669` | `rgb(5, 150, 105)` | Veg badges, fresh indicators |
| **Warm Orange** | `#EA580C` | `rgb(234, 88, 12)` | Special offers, hot indicators |

### Tailwind CSS Configuration
```css
--deep-space: #0a0a0a;
--charcoal: #111111;
--golden-glow: #ffd700;
--burnt-orange: #e6ac00;
--vegetarian-green: #059669;
--warm-orange: #EA580C;
```

---

## 🌟 GRADIENT SYSTEM

### Primary Gradients

#### 1. Black to Orange Gradient
```css
background: linear-gradient(135deg, #000000 0%, #ffc241 100%);
```
**Usage:** Hero sections, premium banners, header backgrounds

#### 2. Orange Glow Gradient
```css
background: linear-gradient(135deg, #ffc241 0%, #ffd700 100%);
```
**Usage:** Premium buttons, active states, special highlights

#### 3. Deep Shadow Gradient
```css
background: linear-gradient(135deg, #0a0a0a 0%, #000000 100%);
```
**Usage:** Cards, elevated surfaces, container backgrounds

#### 4. Section Border Gradient
```css
background: linear-gradient(90deg, #ffc241, transparent);
```
**Usage:** Top borders of sections, dividers

#### 5. Title Underline Gradient
```css
background: linear-gradient(90deg, transparent, #ffc241, transparent);
```
**Usage:** Section title underlines, decorative elements

---

## 🔘 BUTTON STYLING SYSTEM

### Primary Button
```css
background: #ffc241;
color: #000000;
padding: 18px 30px;
border-radius: 12px;
font-size: 1.2rem;
font-weight: bold;
border: none;
transition: all 0.3s ease;
```

**Hover State:**
```css
transform: translateY(-3px);
box-shadow: 0 10px 25px rgba(255, 194, 65, 0.3);
```

**Tailwind Classes:**
```html
<button class="bg-premium-orange text-pitch-black px-8 py-4 rounded-xl text-lg font-bold hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(255,194,65,0.3)] transition-all duration-300">
  ORDER NOW
</button>
```

### Secondary Button (Outline)
```css
background: transparent;
color: #ffc241;
padding: 18px 30px;
border-radius: 12px;
font-size: 1.2rem;
font-weight: bold;
border: 2px solid #ffc241;
transition: all 0.3s ease;
```

**Hover State:**
```css
transform: translateY(-3px);
background: rgba(255, 194, 65, 0.1);
box-shadow: 0 10px 25px rgba(255, 194, 65, 0.2);
```

**Tailwind Classes:**
```html
<button class="bg-transparent text-premium-orange px-8 py-4 rounded-xl text-lg font-bold border-2 border-premium-orange hover:-translate-y-1 hover:bg-premium-orange/10 hover:shadow-[0_10px_25px_rgba(255,194,65,0.2)] transition-all duration-300">
  VIEW MENU
</button>
```

### Premium Button (Gradient)
```css
background: linear-gradient(135deg, #ffc241, #ffd700);
color: #000000;
padding: 18px 30px;
border-radius: 12px;
font-size: 1.2rem;
font-weight: bold;
border: none;
transition: all 0.3s ease;
```

**Hover State:**
```css
transform: translateY(-3px);
box-shadow: 0 10px 30px rgba(255, 194, 65, 0.4);
```

**Tailwind Classes:**
```html
<button class="bg-gradient-to-br from-premium-orange to-golden-glow text-pitch-black px-8 py-4 rounded-xl text-lg font-bold hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,194,65,0.4)] transition-all duration-300">
  PREMIUM DEAL
</button>
```

### Ghost Button
```css
background: #111111;
color: #ffc241;
padding: 18px 30px;
border-radius: 12px;
font-size: 1.2rem;
font-weight: bold;
border: 2px solid #333333;
transition: all 0.3s ease;
```

**Hover State:**
```css
transform: translateY(-3px);
border-color: #ffc241;
box-shadow: 0 10px 20px rgba(255, 194, 65, 0.15);
```

---

## 🏷️ BADGE & CATEGORY SYSTEM

### Solid Badge (Primary)
```css
background: #ffc241;
color: #000000;
padding: 15px 25px;
border-radius: 30px;
font-weight: bold;
font-size: 1.1rem;
border: 2px solid transparent;
transition: all 0.3s ease;
```

**Hover State:**
```css
transform: translateY(-5px);
box-shadow: 0 10px 20px rgba(255, 194, 65, 0.2);
```

**Tailwind Classes:**
```html
<span class="bg-premium-orange text-pitch-black px-6 py-3 rounded-full font-bold text-base hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(255,194,65,0.2)] transition-all duration-300">
  🥟 STEAMED
</span>
```

### Gradient Badge (Premium)
```css
background: linear-gradient(135deg, #ffc241, #ffd700);
color: #000000;
padding: 15px 25px;
border-radius: 30px;
font-weight: bold;
font-size: 1.1rem;
transition: all 0.3s ease;
```

**Tailwind Classes:**
```html
<span class="bg-gradient-to-br from-premium-orange to-golden-glow text-pitch-black px-6 py-3 rounded-full font-bold text-base hover:-translate-y-1 transition-all duration-300">
  🔥 FRIED
</span>
```

### Outline Badge (Secondary)
```css
background: transparent;
color: #ffc241;
padding: 15px 25px;
border-radius: 30px;
font-weight: bold;
font-size: 1.1rem;
border: 2px solid #ffc241;
transition: all 0.3s ease;
```

**Tailwind Classes:**
```html
<span class="bg-transparent text-premium-orange px-6 py-3 rounded-full font-bold text-base border-2 border-premium-orange hover:-translate-y-1 transition-all duration-300">
  ✨ KURKURE
</span>
```

### Golden Badge (Special)
```css
background: #111111;
color: #ffd700;
padding: 15px 25px;
border-radius: 30px;
font-weight: bold;
font-size: 1.1rem;
border: 2px solid #ffd700;
transition: all 0.3s ease;
```

**Tailwind Classes:**
```html
<span class="bg-charcoal text-golden-glow px-6 py-3 rounded-full font-bold text-base border-2 border-golden-glow hover:-translate-y-1 transition-all duration-300">
  🍕 PIZZA MOMOS
</span>
```

---

## 📦 CARD & CONTAINER STYLING

### Standard Card
```css
background: #0a0a0a;
padding: 40px;
border-radius: 20px;
border: 1px solid #1a1a1a;
box-shadow: 0 10px 40px rgba(255, 194, 65, 0.1);
transition: all 0.3s ease;
position: relative;
```

**Top Border Accent:**
```css
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #ffc241, transparent);
}
```

**Hover State:**
```css
transform: translateY(-8px);
border-color: #ffc241;
box-shadow: 0 20px 50px rgba(255, 194, 65, 0.2);
```

**Tailwind Classes:**
```html
<div class="bg-deep-space p-10 rounded-2xl border border-[#1a1a1a] shadow-[0_10px_40px_rgba(255,194,65,0.1)] hover:-translate-y-2 hover:border-premium-orange hover:shadow-[0_20px_50px_rgba(255,194,65,0.2)] transition-all duration-300 relative before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-premium-orange before:to-transparent">
  <!-- Card content -->
</div>
```

### Premium Card (with gradient background)
```css
background: linear-gradient(135deg, #111111 0%, #1a1a1a 100%);
padding: 35px;
border-radius: 15px;
border: 2px solid #ffc241;
transition: all 0.3s ease;
```

**Hover State:**
```css
transform: translateY(-8px);
box-shadow: 0 20px 40px rgba(255, 194, 65, 0.15);
```

### Menu Item Card
```css
background: #111111;
padding: 20px;
border-radius: 12px;
border: 1px solid #ffc241;
transition: all 0.3s ease;
```

**Content Styling:**
```css
.menu-card h4 {
  color: #ffc241;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.menu-card p {
  color: #cccccc;
  margin: 10px 0;
}

.menu-card .price {
  background: #ffc241;
  color: #000000;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 8px;
  font-weight: bold;
}
```

---

## 📝 TYPOGRAPHY & TEXT COLORS

### Heading Colors

| Element | Color | Hex Code | Usage |
|---------|-------|----------|-------|
| **H1 (Hero)** | Gradient | `linear-gradient(45deg, #ffc241, #ffd700)` | Main hero headlines |
| **H2 (Section Titles)** | Premium Orange | `#ffc241` | Section headings |
| **H3 (Subsections)** | Golden Glow | `#ffd700` | Subsection headings |
| **H4 (Card Titles)** | Premium Orange | `#ffc241` | Card and component titles |

### Text Colors

| Element | Color | Hex Code | Usage |
|---------|-------|----------|-------|
| **Primary Text** | White | `#ffffff` | Main body text |
| **Secondary Text** | Light Gray | `#cccccc` | Descriptions, supporting text |
| **Muted Text** | Gray | `#999999` | Timestamps, metadata |
| **Accent Text** | Premium Orange | `#ffc241` | Highlighted text, links |

### Font Specifications

#### Headings
```css
font-family: 'Playfair Display', serif;
font-weight: 400, 600, 700;
```

#### Body Text
```css
font-family: 'Inter', sans-serif;
font-weight: 300, 400, 500, 600;
```

#### Code/Monospace
```css
font-family: 'Courier New', monospace;
color: #ffc241;
background: rgba(255, 194, 65, 0.1);
padding: 8px 16px;
border-radius: 8px;
border: 1px solid rgba(255, 194, 65, 0.3);
```

---

## ✨ BORDER, SHADOW & GLOW EFFECTS

### Border Styles

#### Standard Border
```css
border: 1px solid #1a1a1a;
```

#### Accent Border
```css
border: 2px solid #ffc241;
```

#### Golden Border
```css
border: 2px solid #ffd700;
```

#### Subtle Border
```css
border: 1px solid rgba(255, 194, 65, 0.3);
```

### Shadow Effects

#### Light Shadow
```css
box-shadow: 0 10px 40px rgba(255, 194, 65, 0.1);
```

#### Medium Shadow
```css
box-shadow: 0 20px 50px rgba(255, 194, 65, 0.2);
```

#### Strong Shadow (Hover)
```css
box-shadow: 0 10px 25px rgba(255, 194, 65, 0.3);
```

#### Premium Glow
```css
box-shadow: 0 10px 30px rgba(255, 194, 65, 0.4);
```

### Glow Effects

#### Text Glow
```css
text-shadow: 0 0 30px rgba(255, 194, 65, 0.3);
```

#### Element Glow
```css
box-shadow: 0 0 20px rgba(255, 194, 65, 0.5);
```

---

## 🎬 HOVER EFFECTS & ANIMATIONS

### Standard Hover Transform
```css
transition: all 0.3s ease;
```

**On Hover:**
```css
transform: translateY(-3px);
```

### Card Hover Transform
```css
transition: all 0.3s ease;
```

**On Hover:**
```css
transform: translateY(-8px);
```

### Badge Hover Transform
```css
transition: all 0.3s ease;
```

**On Hover:**
```css
transform: translateY(-5px);
```

### Shimmer Effect (for cards)
```css
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 194, 65, 0.1), transparent);
  transition: left 0.6s ease;
}

.card:hover::before {
  left: 100%;
}
```

### Scale Animation
```css
transition: transform 0.3s ease;
```

**On Hover:**
```css
transform: scale(1.02);
```

### Border Color Transition
```css
border: 2px solid transparent;
transition: border-color 0.3s ease;
```

**On Hover:**
```css
border-color: #ffc241;
```

---

## 🎯 SECTION-SPECIFIC STYLING RULES

### 1. HERO SECTION

#### Background
```css
background: #000000;
background-image: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(255, 194, 65, 0.1));
```

#### CTA Buttons
- **Primary CTA:** `background: #ffc241`, `color: #000000`, `border-radius: 12px`
- **Secondary CTA:** `background: transparent`, `color: #ffc241`, `border: 2px solid #ffc241`
- **Hover:** `transform: translateY(-3px)`, `box-shadow: 0 10px 25px rgba(255, 194, 65, 0.3)`

#### Badges
```css
background: transparent;
color: #ffd700;
border: 2px solid #ffd700;
padding: 12px 24px;
border-radius: 25px;
```

**Hover:**
```css
background: rgba(255, 215, 0, 0.1);
transform: translateY(-3px);
```

### 2. BRAND STORY SECTION

#### Story Cards
```css
background: #0a0a0a;
border: 1px solid #1a1a1a;
border-radius: 20px;
padding: 40px;
```

**Top Border:**
```css
border-top: 3px solid transparent;
border-image: linear-gradient(90deg, #ffc241, transparent) 1;
```

**Hover:**
```css
border-color: #ffc241;
transform: translateY(-5px);
```

#### Timeline Items
```css
background: #111111;
border-left: 3px solid #ffc241;
padding: 20px 30px;
position: relative;
```

**Timeline Dot:**
```css
.timeline-item::before {
  content: '';
  position: absolute;
  left: -8px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  background: #ffd700;
  border-radius: 50%;
  border: 2px solid #ffc241;
}
```

**Hover:**
```css
background: rgba(255, 194, 65, 0.05);
border-left-color: #ffd700;
```

### 3. MENU HIGHLIGHTS SECTION

#### Menu Cards
```css
background: #0a0a0a;
border: 1px solid #1a1a1a;
border-radius: 15px;
padding: 25px;
transition: all 0.3s ease;
```

**Hover:**
```css
transform: translateY(-8px);
border-color: #ffc241;
box-shadow: 0 20px 40px rgba(255, 194, 65, 0.15);
```

#### Category Badges
- **Solid:** `background: #ffc241`, `color: #000000`
- **Outline:** `background: transparent`, `color: #ffc241`, `border: 2px solid #ffc241`

#### Price Tags
```css
color: #ffd700;
font-size: 1.8rem;
font-weight: bold;
```

### 4. REVIEWS SECTION

#### Review Cards
```css
background: #111111;
border: 2px solid #ffc241;
border-radius: 15px;
padding: 30px;
```

**Hover:**
```css
transform: translateY(-5px);
box-shadow: 0 15px 35px rgba(255, 194, 65, 0.2);
```

#### Star Ratings
```css
color: #ffd700;
font-size: 1.5rem;
```

#### Carousel Buttons
```css
background: #ffc241;
color: #000000;
width: 50px;
height: 50px;
border-radius: 50%;
border: none;
```

**Hover:**
```css
background: #ffd700;
transform: scale(1.1);
```

### 5. TRUST & ACHIEVEMENTS SECTION

#### Trust Cards
```css
background: #111111;
border: 1px solid #1a1a1a;
border-radius: 15px;
padding: 30px;
text-align: center;
```

**Hover:**
```css
border-color: #ffd700;
transform: translateY(-5px);
```

#### Achievement Badges
- **Solid:** `background: #ffc241`, `color: #000000`
- **Outline:** `background: transparent`, `color: #ffd700`, `border: 2px solid #ffd700`

#### Rating Display
```css
color: #ffd700;
font-size: 2.5rem;
font-weight: bold;
```

### 6. FULL MENU PAGE

#### Filter Buttons
- **Active:** `background: #ffc241`, `color: #000000`
- **Inactive:** `background: #111111`, `color: #ffc241`, `border: 1px solid #333`

**Hover (Inactive):**
```css
background: rgba(255, 194, 65, 0.1);
border-color: #ffc241;
```

#### Menu Item Cards
```css
background: #0a0a0a;
border: 1px solid #1a1a1a;
border-radius: 12px;
padding: 20px;
```

**Hover:**
```css
border-color: #ffc241;
transform: translateY(-5px);
```

#### Search Bar
```css
background: #111111;
border: 2px solid #333;
border-radius: 12px;
padding: 15px 20px;
color: #ffffff;
```

**Focus:**
```css
border-color: #ffc241;
outline: none;
box-shadow: 0 0 0 3px rgba(255, 194, 65, 0.1);
```

---

## 📊 USAGE GUIDELINES

### DO's ✅
- Use Premium Orange (#ffc241) for all primary CTAs
- Use Golden Glow (#ffd700) for premium highlights and ratings
- Apply hover effects with translateY(-3px to -8px)
- Use gradient backgrounds for premium elements
- Maintain consistent border-radius (12px for buttons, 15-20px for cards)
- Apply box-shadows with orange tint for depth
- Use Deep Space (#0a0a0a) for card backgrounds
- Use Charcoal (#111111) for secondary elements

### DON'Ts ❌
- Don't use pure white backgrounds
- Don't use colors outside the defined palette
- Don't mix different border-radius values inconsistently
- Don't use box-shadows without orange tint
- Don't use flat buttons without hover effects
- Don't use borders thicker than 2px (except for special cases)
- Don't use text colors that don't meet contrast requirements

---

## 🔧 IMPLEMENTATION CHECKLIST

### Hero Section
- [ ] CTA buttons: #ffc241 background, #000000 text, 12px border-radius
- [ ] Background: #000000 with Premium Orange gradient overlay
- [ ] Badges: Golden Glow borders with Premium Orange text
- [ ] Hover: translateY(-3px) on all interactive elements

### Brand Story Section
- [ ] Story cards: #0a0a0a background, 1px solid #1a1a1a border
- [ ] Hover: border-color: #ffc241
- [ ] Timeline items: Premium Orange accents
- [ ] Section border: Top 3px linear-gradient(90deg, #ffc241, transparent)

### Menu Highlights Section
- [ ] Menu cards: #0a0a0a background
- [ ] Hover: translateY(-8px) + border-color: #ffc241
- [ ] Category badges: Solid #ffc241 and Outline border-2 border-premium-orange
- [ ] Price tags: Golden Glow colored prices

### Reviews Section
- [ ] Review cards: #111111 background, Premium Orange borders
- [ ] Star ratings: Golden Glow colored stars
- [ ] Carousel buttons: Premium Orange with hover effects

### Trust & Achievements Section
- [ ] Trust cards: Charcoal background with Golden Glow accents
- [ ] Achievement badges: Premium Orange solid and outline variants
- [ ] Rating display: Golden Glow colored 4.9/5

### Full Menu Page
- [ ] Filter buttons: Premium Orange active states
- [ ] Menu item cards: Deep Space background with Orange hover borders
- [ ] Search bar: Premium Orange focus states

---

## 📅 VERSION HISTORY

**Version 1.0** - Initial color system documentation
- Core brand colors defined
- Extended palette established
- Button and badge systems documented
- Section-specific styling rules created

---

## 📞 SUPPORT

For questions or clarifications about the color system, refer to:
- `new.html` - Visual reference file
- `tailwind.config.js` - Tailwind configuration
- `globals.css` - Global CSS variables

---

**Last Updated:** Phase 10 - Section-by-Section Styling Implementation
**Status:** Complete and Production-Ready ✅
