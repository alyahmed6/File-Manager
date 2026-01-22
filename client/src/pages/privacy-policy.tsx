import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8" data-testid="link-back-home">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <article className="prose prose-slate dark:prose-invert max-w-none">
              <h1 data-testid="text-privacy-heading">Privacy Policy</h1>
              <p className="text-muted-foreground">Last updated: August 9, 2025</p>

              <h2>Introduction</h2>
              <p>The Blockchain Pulse ("we", "us", "our") operates https://theblockchainpulse.org (the "Site") and provides online educational courses and associated community services (the "Service"). We take your privacy seriously. This Privacy Policy explains what information we collect, why we collect it, how we use it, and your rights.</p>

              <h2>1. Information We Collect</h2>
              
              <h3>A. Information you provide directly</h3>
              <ul>
                <li><strong>Account information:</strong> name, email address, country, and any profile details when you register.</li>
                <li><strong>Payment information:</strong> If you pay with crypto, we record wallet addresses used for purchase and the transaction hash; we do not have control over on-chain transaction data.</li>
                <li><strong>Communications:</strong> messages you send to support, Discord handle, questions, and content you post in community channels when you opt in.</li>
                <li><strong>Course submissions:</strong> files, assignments, quiz responses when submitted as part of a course.</li>
              </ul>

              <h3>B. Information we collect automatically</h3>
              <ul>
                <li><strong>Usage data:</strong> IP address, device type, browser type, pages visited, timestamps, and analytics events collected via GA4 or similar tools.</li>
                <li><strong>Cookies & tracking:</strong> session cookies, persistent cookies, and similar technologies to remember preferences and measure site performance.</li>
              </ul>

              <h3>C. Third-party sources</h3>
              <p>
                Third-party services: information from payment processors, identity verification services (if used), Discord (if you connect your account), and analytics providers.
              </p>

              <h2>2. How We Use Your Information</h2>
              <p>We use collected information to:</p>
              <ul>
                <li>Provide, maintain, and improve the Service.</li>
                <li>Process payments and fulfill course purchases (including issuing).</li>
                <li>Communicate about course updates, account information, and support requests.</li>
                <li>Personalize your experience and show relevant content.</li>
                <li>Detect, prevent, and respond to fraud, abuse, or other illegal activity.</li>
              </ul>
              <p>When you pay with crypto, we will record the wallet address and transaction hash to verify payment and grant access.</p>

              <h2>3. Legal Basis for Processing (If GDPR applies)</h2>
              <p>
                We rely on: (a) performance of a contract to provide paid services; (b) legitimate interests such as site security, analytics, and fraud detection; and (c) consent where required (e.g., marketing emails). You have rights to access, correct, delete, and restrict processing as described below.
              </p>

              <h2>4. Sharing & Disclosure</h2>
              <p>We may share data with:</p>
              <ul>
                <li>Service providers (payment processors, email providers, host/CDN, analytics providers).</li>
                <li>Legal & safety: when required by law or to protect rights and safety.</li>
                <li>Acquirers: in the event of a merger, acquisition, or asset sale.</li>
              </ul>
              <p><strong>We never sell your personal data for marketing.</strong></p>

              <h2>5. On-chain Data and Wallets</h2>
              <p>
                Wallet addresses, public keys, and on-chain transaction hashes are public-by-design on the blockchain; we may display or link to those records for verification. Do not use a wallet address you wish to keep private.
              </p>

              <h2>6. Data Retention</h2>
              <p>
                We retain account and transactional data as needed to provide the Service, to comply with legal obligations, and to support dispute resolution. If you request account deletion, we will delete personal data except for information that we must retain for legal, tax, or operational reasons (e.g., transaction records for 6+ years where required by law).
              </p>

              <h2>7. Security</h2>
              <p>
                We implement reasonable organizational and technical measures to protect data. However, no system is 100% secure. If a data breach occurs, we will notify affected users and regulators where required.
              </p>

              <h2>8. Children</h2>
              <p>The Service is not directed to children under 13 (or the local equivalent).</p>

              <h2>9. Your Rights & Choices</h2>
              <p>
                <strong>Deletion:</strong> request removal of your account to support@theblockchainpulse.org (subject to retention requirements).
              </p>

              <h2>10. Changes to Policy</h2>
              <p>
                We may modify these Terms; material changes will be posted on the Site with an updated "Last updated" date. Continued use constitutes acceptance.
              </p>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
