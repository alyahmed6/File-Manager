# Design Guidelines for The Blockchain Pulse Cryptocurrency Course Website

## Design Theme
**Modern Crypto-Academic Look** with:
- Softer gradients using blues and oranges from the color reference image
- One consistent tech pattern throughout
- Cleaner, professional layout
- Strong, clear CTAs
- Clear learning journey presentation

## Page Structure

### Landing Page (5 Main Sections)

**1. Hero Section**
- **Left Side Content:**
  - Main Heading: "Master Crypto and Blockchain" (or similar professional variant of "Welcome to the course")
  - Subheading/Description: Professional version of "Learn blockchain basics, Bitcoin, Ethereum, wallets, crypto exchanges and more within 2 months through downloadable videos on our Discord server"
  - Course duration highlight: 2 months
  - Primary CTA: "Get Early Access" button (redirects to registration page)
  
- **Right Side:**
  - Video placeholder/embed space for "How to Register" tutorial
  - Should be prominently displayed and properly sized

**2. Course Section - "Why Choose Us"**
- **Opening Hook:** Eye-catching crypto sentence like "Get rid of fake crypto gurus" or "Learn then Earn"
- **Brief Course Explanation** aligned with curriculum content
- **Key Features Grid/Cards:**
  - Certification
  - Hands-on Learning
  - Flexible Schedule
  - Community Support
  - (Add other relevant benefits)

**3. Curriculum Section**
Display all 10 modules with clear visual hierarchy:
1. Introduction to Blockchain (~1h) - Understanding distributed ledger technology fundamentals
2. Bitcoin Deep Dive (~1h) - History, mining, transactions, use cases
3. Ethereum & Smart Contracts (~1h) - Smart contracts, DApps, ecosystem
4. Cryptocurrency Wallets (~1h) - Creating wallets, security practices, management
5. Centralized Exchanges (CEX's) (~1h) - Major exchanges, trading basics, security
6. Decentralized Exchanges (DEX's) (~1h) - DEXs, liquidity pools, yield farming, DeFi
7. Narratives (~1h) - Stablecoins, AI in blockchain, RWA's, Metaverse, NFTs
8. Advanced Topics & Future (~1h) - Emerging trends, regulatory landscape
9. Important Research & Analytical Platforms (~1h) - Analytical data platforms
10. Layer 2's, Rollups & Side Chains (~1h) - Proving mechanisms, Zk and Optimistic proofs

**4. Pricing Section**
- **Two Payment Options:**
  - PKR: 10,000 PKR
  - USDT: 35 USDT
- **Early Bird Discount:** 30% OFF (Valid for 1 month only) - prominently displayed
- **Course Details:**
  - 10 modules
  - 10 videos
  - Downloadable videos via Discord
  - (Other relevant simple feature lines)
- CTA: "Register Now" button (redirects to registration page)

**5. FAQ Section**
Create FAQs covering:
- Course duration and format
- Prerequisites
- Certification details
- Payment methods (PKR/USDT)
- Discord access
- Early bird discount validity
- Video download process
- (Other relevant questions based on content)

### Registration/Redirect Page
- Clean, focused email collection form
- Email input field
- "Notify Me" button
- Success message after submission: "You will be notified about updates and when the course starts"
- Backend: Send registered emails to registration@theblockchainpulse.org
- Follow design style from uploaded redirect page image (adapted to color scheme)

### Footer
- Match layout style from uploaded footer image, but use the gradient blue/orange color scheme
- **Social Media Icons with Links:**
  - X (Twitter): x.com/theblockchainpulse
  - Instagram: instagram.com/theblockchainpulse
  - Discord, LinkedIn, Facebook (standard links)
- **Help Center:**
  - "Help Centre" → support@theblockchainpulse.org
  - "Contact Us" → x.com/theblockchainpulse
- **Legal Links:**
  - Privacy Policy (separate page)
  - Terms of Service (separate page)

### Privacy Policy Page
Use provided content from uploaded file, maintain same design consistency

### Terms of Service Page
Use provided content from uploaded file, maintain same design consistency

## Visual Design Specifications

**Color Palette:**
Use gradient blues and oranges exactly as shown in uploaded colors image - mix throughout the site for consistency

**Typography:**
- Clear hierarchy for headings (H1, H2, H3)
- Professional, modern web fonts via Google Fonts
- Readable body text for long-form content (legal pages)

**Buttons:**
- If placed over images/gradients: blurred backgrounds
- All buttons: clear hover/active states
- Primary CTA buttons should be prominent and action-oriented

**Layout:**
- Clean spacing using consistent Tailwind units (primarily 4, 8, 16 spacing scale)
- Responsive design for mobile/tablet/desktop
- Maximum content width for readability

**Hero Image:**
This website uses a video placeholder on the right side of the hero rather than a large hero image, so no large background hero image is needed

## Interaction Requirements
- All "Early Access" and "Register" buttons redirect to registration page
- Email form submits to backend that forwards to registration@theblockchainpulse.org
- Smooth scrolling between sections
- Minimal animations - keep focus on content and clarity