# MINGGO Invitation Studio — Birthday Invitation Maker
> **Making Every Celebration Special.**
> Professional, high-resolution birthday invitation maker designed for Indian photo studios, printing shops, and cyber cafes. Powered by MINGGO Toys & Gifts.

---

## 🌟 Overview & Purpose

**MINGGO Invitation Studio** is a commercial-grade digital invitation maker purpose-built for Indian photo studios, printing shops, and cyber cafes. When a customer walks into the studio requesting a birthday invitation card, the operator can:

1. Enter the customer's details (name, date, age, venue, time, custom message, photo).
2. Choose from **50+ genuinely distinct templates** across 7 curated categories.
3. Instantly preview the card rendered live on an HTML5 canvas with intelligent text-scaling (long Indian names such as *Shri Rameshwar Rao* or *Ananya Deshmukh* never overflow or clash).
4. Download a **studio-quality high-resolution JPG (up to 300 DPI, 2400 × 3200 px)** ready for printing or instant WhatsApp sharing.
5. Save projects locally to reopen, reprint, or duplicate orders anytime.
6. Optionally enable the subtle MINGGO brand watermark or shop attribution on exports (disabled by default).

All processing runs **100% client-side** in the browser with **zero paid APIs**, zero external server dependencies, and complete data privacy.

---

## 🚀 Key Features

### 1. 50+ Genuinely Distinct Templates (7 Categories)
Every template has a unique vector-drawn visual composition, custom color palette, borders, decorative elements, and typography pairings:
- **Kids & Cartoon Themes (10 Designs):** Dino Safari, Little Astronaut Galaxy, Superhero Comic Blast, Magical Unicorn Rainbow, Pirate Treasure Quest, Mermaid Ocean Kingdom, Speedway Grand Prix, Wild One Jungle Safari, Enchanted Fairy Forest, Cute Monster Bash.
- **Cute Pastel & Teddy Bear (8 Designs):** Classic Teddy & Moon, Soft Pastel Baby Dream, Bunny in Wonderland, Little Prince Royal Star, Little Princess Tiara, Hot Air Balloon Voyage, Sleepy Little Lamb, Vintage Pastel Carousel.
- **Balloons & Confetti (8 Designs):** Neon Balloon Fiesta, Rose Gold Glamour, Midnight Starry Arch, Pastel Rainbow Cascade, Silver Foil Celebration, Golden Ribbon & Helium, Confetti Popper Explosion, Dreamy Bokeh Lights.
- **Floral & Elegant (8 Designs):** Botanical Eucalyptus & Gold, Blush Peony Garland, Royal Navy & White Lily, Provence Lavender Garden, Burgundy Vintage Rose, Rustic Sunflower Sunshine, Minimalist Olive Branch, Tropical Paradise Blooms.
- **Modern & Minimalist (6 Designs):** Bold Swiss Typographic, Editorial Monochrome Serif, Scandinavian Pastel Arch, Dual-Tone Split Color, Frost Glassmorphism, Bauhaus Color Block.
- **Premium Gold & Luxury (5 Designs):** 1920s Great Gatsby Art Deco, Royal Velvet & Gold Crest, Emerald Green & Gold Leaf, Golden Stardust Gala, Champagne & Black Tie.
- **Colorful Party Themes (5 Designs):** Retro 70s Disco Funk, Tropical Flamingo Fiesta, Vintage Big Top Carnival, Festive Color Powder Splash, Cyberpunk Neon Glow.

### 2. Intelligent Live Canvas Rendering Engine
- **Non-overflowing typography:** Automatically calculates text dimensions using Canvas metrics and smoothly scales down long names and addresses to stay within safe printable margins.
- **Customer Photo Integration:** Supports uploading customer portraits with interactive crop shapes (**Circle**, **Rounded Rectangle**, **Shield Badge**), zoom slider (60% to 200%), and pan offset adjustments.
- **Safe Print Margins Guide:** Dotted overlay toggle to verify bleed areas before printing.
- **Format Toggle:** Instant switching between **Portrait 3:4** (standard card) and **Square 1:1** (WhatsApp DP / Instagram card).

### 3. Studio-Grade High-Resolution JPG Export
Direct client-side JPG generation (0.95 quality) at exact print resolutions:
- **Standard:** `1200 × 1600 px` (150 DPI) — Ideal for WhatsApp sharing & quick 4×6 inch prints.
- **Studio Print Quality:** `1800 × 2400 px` (300 DPI) — Crisp photo lab paper and cardstock.
- **Ultra HD Print:** `2400 × 3200 px` (300 DPI) — Large flex banners, standees, and party posters.
- **Square Format:** `2400 × 2400 px` (300 DPI) — Instagram posts and WhatsApp profile cards.
- **Clean Filenaming:** Automatically generates names such as `Aarav_Sharma_Birthday_Invitation_print_2026.jpg`.
- **Celebratory UI Feedback:** Confetti particle burst and download confirmation upon export.

### 4. WhatsApp Sharing Assistant
- 1-Click **"Copy WhatsApp Invitation Text"** formatted with emojis, bold headers, venue address, and RSVP ready to paste directly into customer WhatsApp chats.
- Direct **"Share via WhatsApp"** button opening WhatsApp Web.

### 5. Local Storage Project Management
- **Save Projects:** Save active invitations locally in the browser with full details and chosen template.
- **Recent Projects:** Reopen and edit previous orders with one click.
- **Duplicate & Rename:** Duplicate an existing invitation (e.g., for twins or family members) and rename projects.
- **Delete Confirmation:** Prevent accidental deletion of customer work.
- **Favorites:** Bookmarking system to keep popular shop templates within instant reach.

### 6. Printing Studio Profile & Settings
- Configure **Shop Name**, **Phone / WhatsApp number**, and **Shop Address**.
- **Optional Branding Watermark:** Subtle footer attribution on exported JPGs (*"Design & Print: Sai Digital Photo Studio | +91 98765 43210"*).
- **JSON Backup & Restore:** Export all saved projects and settings to a JSON backup file or restore anytime.

### 7. 1-Click Indian Sample Presets
Includes pre-configured realistic Indian birthday samples for instant testing and customer demonstration:
1. *Aarav Sharma's 5th Birthday* (Dino Safari Adventure)
2. *Baby Saanvi's 1st Birthday* (Pastel Baby Dream)
3. *Ananya Deshmukh's Sweet 16* (Rose Gold Glamour)
4. *Rohan Kulkarni's 25th Silver Jubilee* (1920s Art Deco)
5. *Shri Rameshwar Rao's 60th Shashtipoorthi* (Royal Velvet & Gold)

---

## 🛠️ Technology Stack

- **Framework:** React 19 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS + PostCSS + Autoprefixer
- **Vector Rendering:** HTML5 Canvas 2D API (scalable vector primitives, clipping paths, radial gradients)
- **Icons:** Lucide React
- **Confetti Animation:** Canvas Confetti
- **Typography:** Google Fonts (`Inter`, `Montserrat`, `Poppins`, `Outfit`, `Playfair Display`, `Cinzel`, `Great Vibes`, `Dancing Script`, `Fredoka`, `Chewy`, `Bungee`, `Righteous`, `Oswald`)

---

## 💻 Installation & Running Locally

### Prerequisites
- Node.js LTS (v18 or higher recommended, tested on Node v24)
- npm (v9 or higher)

### Setup Instructions

1. **Clone or Navigate to the project directory:**
   ```bash
   cd "c:\Users\XIAOMI NOTEBOOK 14\Desktop\Varun Bhoyar\Projects\Invitation"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to:
   ```
   http://127.0.0.1:5173/
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```
   The compiled, optimized distribution will be generated in the `dist/` directory.

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 📁 Project Architecture

```
Invitation/
├── index.html                   # HTML entry point with Google Fonts preconnect
├── package.json                 # Project dependencies and npm scripts
├── tsconfig.json                # TypeScript root configuration
├── tsconfig.app.json            # Vite React TypeScript compiler options
├── tailwind.config.js           # Tailwind configuration with purple brand palette
├── postcss.config.js            # PostCSS plugin setup
├── public/                      # Static assets
└── src/
    ├── types/
    │   └── index.ts             # Core TypeScript interfaces & data structures
    ├── templates/
    │   ├── kids.ts              # 10 Kids & cartoon-inspired templates
    │   ├── pastelTeddy.ts       # 8 Cute pastel & teddy bear templates
    │   ├── balloons.ts          # 8 Balloons & confetti templates
    │   ├── floral.ts            # 8 Floral & elegant templates
    │   ├── modernMinimal.ts     # 6 Modern & minimalist templates
    │   ├── luxuryGold.ts        # 5 Premium gold & luxury templates
    │   ├── party.ts             # 5 Colorful party templates
    │   └── index.ts             # Aggregated 50+ templates, categories & presets
    ├── utils/
    │   ├── canvasHelpers.ts     # Vector drawing primitives & text-wrapping
    │   ├── exportEngine.ts      # High-res canvas renderer & JPG blob generator
    │   └── storage.ts           # LocalStorage persistence for projects & settings
    ├── components/
    │   ├── AppLayout.tsx        # Responsive layout shell
    │   ├── Sidebar.tsx          # Desktop & mobile navigation drawer
    │   ├── Dashboard.tsx        # Studio stats, featured designs & quick actions
    │   ├── InvitationEditor.tsx # Customer details, photo uploader & style tab
    │   ├── InvitationCanvas.tsx # Real-time canvas preview with zoom & safe margins
    │   ├── TemplateGallery.tsx  # Searchable, filterable 50+ template grid
    │   ├── TemplateCard.tsx     # Miniature canvas preview card with favorites
    │   ├── ExportDialog.tsx     # High-res JPG export modal & WhatsApp helper
    │   ├── RecentProjects.tsx   # Saved project manager with rename & duplicate
    │   ├── FavoritesPage.tsx    # Filtered view of bookmarked templates
    │   └── SettingsPage.tsx     # Shop branding profile & export preferences
    ├── App.tsx                  # Root state coordinator
    ├── main.tsx                 # React DOM mount point
    └── index.css                # Tailwind directives & sleek scrollbar styling
```

---

## 🖨️ Shopkeeper Printing Tips

- **Paper recommendation:** Use 250 GSM to 300 GSM glossy or matte photo cardstock for optimal results.
- **Sizes:** Select **Studio Print Quality (1800 × 2400 px)** for standard 6×8 or 4×6 inch prints. Select **Ultra HD (2400 × 3200 px)** for 12×16 inch or larger banner stands.
- **Border trimming:** Toggle **Safe Margins** in the preview to verify that customer text sits safely inside the cutting edge before printing.

---

## 📄 License
MIT License. Built for print shops and studios in India.
