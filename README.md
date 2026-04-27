# NFC.cool Website

The main [NFC.cool](https://nfc.cool) website — built with [SiteKit](https://github.com/FlineDev/SiteKit).

## Local Development

Requires Swift 6.2 and macOS 26+.

```bash
swift run Site build    # Build the site to _Site/
swift run Site serve    # Build & serve locally at http://localhost:8080
```

## Deployment

Automatically deploys to GitHub Pages on push to `main`.

Custom domain: `new.nfc.cool` (temporary during migration, will become `nfc.cool`)

## Structure

```
Content/
├── Data/
│   └── Landing.yaml     # Landing page section data
├── Pages/               # Static pages (NFC, QR, Document, 3D, etc.)
└── Assets/
    ├── Images/           # Brand assets, feature icons, App Store badges
    └── Favicons/         # Pre-generated favicons

Theme/
├── css/                 # Custom CSS
├── fonts/               # Self-hosted Titillium Web + Caveat
└── images/              # Theme logos (dark + light variants)
```