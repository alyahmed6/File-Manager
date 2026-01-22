import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsOfService() {
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
              <h1 data-testid="text-terms-heading">Terms of Service</h1>
              <p className="text-muted-foreground">Last updated: August 9, 2025</p>

              <h2>1. Agreement & Acceptance</h2>
              <p>
                These Terms of Service ("Terms") govern your access to and use of the Site and Services. By using the Site or enrolling in a course, you agree to these Terms.
              </p>

              <h2>2. Services Provided</h2>
              <p>
                The Blockchain Pulse offers online educational content, community access (Discord) and downloadable resources. Course details, pricing, and delivery methods are shown on the Site.
              </p>

              <h2>3. Registration & Accounts</h2>
              <p>
                You must provide accurate information when creating an account. You are responsible for activity that occurs under your account.
              </p>

              <h2>4. Payment & Pricing</h2>
              <p>We accept fiat payments via credit/debit card transfers, bank transfers and may accept cryptocurrency (USDT). All prices are displayed in your local currency if available; when paying with crypto we show an estimated fiat equivalent.</p>
              <p><strong>Crypto payments are final once confirmed on-chain.</strong></p>

              <h2>5. Refund Policy</h2>
              <p>
                <strong>Digital content:</strong> All sales are final by default for digital course content. If you have a technical issue preventing access, contact support within 14 days for review.
              </p>
              <p>
                <strong>Exceptions:</strong> Refunds may be granted at our discretion for exceptional cases, subject to verification.
              </p>

              <h2>6. Content Protection & Unauthorized Sharing</h2>
              <p>
                All course materials, including videos, recordings, slides, and downloadable resources, are the intellectual property of The Blockchain Pulse.
              </p>
              <p>
                Unauthorized copying, recording, sharing, distribution, or public posting of any course content — whether on social media platforms, websites, messaging groups, or any other public or private channels — is strictly prohibited.
              </p>
              <p>Any violation of this policy may result in:</p>
              <ul>
                <li>Immediate termination of access without refund, and</li>
                <li>Legal action in accordance with applicable copyright and intellectual property laws.</li>
              </ul>

              <h2>7. Certificates & Verification</h2>
              <p>We may issue digital certificates upon course completion.</p>
              <p>We reserve the right to revoke certificates if we determine they were obtained fraudulently.</p>

              <h2>8. License & Content Use</h2>
              <p>
                All course content is &copy; The Blockchain Pulse. We grant paid users a limited, non-transferable license to access and view content for personal, non-commercial use unless otherwise specified.
              </p>
              <p>
                You may not redistribute, sell, or publicly republish and upload course videos, slides, or assignments without permission.
              </p>

              <h2>9. User Conduct</h2>
              <p>
                You agree not to use the Service for unlawful activities. Respect community rules; harassment, hate speech, or sharing illegal content may lead to account suspension.
              </p>

              <h2>10. Disclaimers & Limitation of Liability</h2>
              <p>
                <strong>No financial advice:</strong> Course content is educational only and not financial, tax, or legal advice.
              </p>
              <p>
                <strong>Warranty disclaimer:</strong> Services are provided "as is" without warranties. We are not liable for indirect or consequential damages. Our liability is limited to the amount you paid for the course in the past 3 months.
              </p>

              <h2>11. Termination</h2>
              <p>
                We may suspend or terminate discord accounts for violation of Terms. You may delete your account via account settings or by contacting support; deletion is subject to retention for legal obligations.
              </p>

              <h2>12. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the jurisdiction in which The Blockchain Pulse operates. Any disputes will be resolved in the competent courts of that jurisdiction.
              </p>

              <h2>13. Changes to Terms</h2>
              <p>
                We may modify these Terms; material changes will be posted on the Site with an updated "Last updated" date. Continued use constitutes acceptance.
              </p>

              <h2>14. Contact</h2>
              <p>
                <a href="mailto:support@theblockchainpulse.org">support@theblockchainpulse.org</a>
              </p>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
