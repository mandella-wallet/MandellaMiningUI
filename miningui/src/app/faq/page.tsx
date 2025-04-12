import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { fetchFAQs, fetchSupportContact, FAQ, SupportContact } from "@/lib/api";
import Header from "@/components/Header"; // Import the Header component
import Footer from "@/components/Footer"; // Import the Footer component

export default async function FAQPage() {
  const faqs: FAQ[] = await fetchFAQs();
  const supportContact: SupportContact = await fetchSupportContact();

  return (
    <div className="min-h-screen bg-solana-dark text-white">
      {/* Header */}
      <Header /> {/* Use the Header component */}

      {/* FAQ Section */}
      <section className="container mx-auto py-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-solana-teal">FAQ & Support</h1>
          <p className="text-solana-gray">Find answers to common questions or get in touch with our support team.</p>
        </div>

        {/* FAQ Card */}
        <Card className="shadow-glow border-none bg-solana-dark/80 mb-12">
          <CardHeader className="bg-solana-teal text-solana-dark">
            <CardTitle className="text-2xl flex items-center">
              <i className="fas fa-question-circle mr-2"></i> Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {faqs.length > 0 ? (
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-solana-teal">{faq.question}</h3>
                    <p
                      className="text-solana-gray"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                    {index < faqs.length - 1 && <Separator className="my-4 bg-solana-gray" />}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-solana-pink/20 border-l-4 border-solana-pink p-4 rounded">
                <h4 className="text-lg font-semibold text-solana-pink flex items-center">
                  <i className="fas fa-exclamation-triangle mr-2"></i> No FAQs
                </h4>
                <Separator className="my-2 bg-solana-gray" />
                <p className="text-solana-gray">No FAQs available at this time.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Support Card */}
        <Card className="shadow-glow border-none bg-solana-dark/80">
          <CardHeader className="bg-solana-teal text-solana-dark">
            <CardTitle className="text-2xl flex items-center">
              <i className="fas fa-headset mr-2"></i> Support
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-solana-teal mb-4">Contact Us</h3>
                <ul className="space-y-2 text-solana-gray">
                  <li>
                    <strong>Email:</strong>{" "}
                    <a href={`mailto:${supportContact.email}`} className="text-solana-teal hover:underline">
                      {supportContact.email}
                    </a>
                  </li>
                  <li>
                    <strong>Telegram:</strong>{" "}
                    <a href={supportContact.telegram} target="_blank" rel="noopener noreferrer" className="text-solana-teal hover:underline">
                      Join our Telegram
                    </a>
                  </li>
                  <li>
                    <strong>X Profile:</strong>{" "}
                    <a href={supportContact.xProfile} target="_blank" rel="noopener noreferrer" className="text-solana-teal hover:underline">
                      Follow us on X
                    </a>
                  </li>
                </ul>
              </div>

              {/* Support Request Form (Static) */}
              {/* <div>
                <h3 className="text-lg font-semibold text-solana-teal mb-4">Submit a Support Request</h3>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-solana-gray">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="bg-solana-dark border-solana-gray text-white placeholder-solana-gray"
                      disabled
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-solana-gray">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      className="bg-solana-dark border-solana-gray text-white placeholder-solana-gray"
                      disabled
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-solana-gray">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe your issue or question"
                      className="bg-solana-dark border-solana-gray text-white placeholder-solana-gray"
                      rows={4}
                      disabled
                    />
                  </div>
                  <Button
                    className="bg-solana-teal hover:bg-solana-teal/80 text-solana-dark"
                    disabled
                  >
                    Submit Request
                  </Button>
                  <p className="text-sm text-solana-gray">Form submission is disabled in this demo.</p>
                </form>
              </div> */}
            </div>
          </CardContent>
        </Card>
      </section>

      <Footer /> {/* Use the Footer component */}
    </div>
  );
}