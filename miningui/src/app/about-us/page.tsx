import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutUs() {
  const teamMembers = [
    {
      name: "Freddy",
      role: "Programmer",
      xHandle: "@0x_Freddy",
      xLink: "https://x.com/0x_Freddy",
      photo: "/img/team/freddy.png",
    },
    {
      name: "Mancing Crypto",
      role: "UI Design",
      xHandle: "@MancingCrypto",
      xLink: "https://x.com/MancingCrypto",
      photo: "/img/team/mancingcrypto.png",
    },
    {
      name: "Senasgr",
      role: "Engineer",
      xHandle: "@Senasgr",
      xLink: "https://x.com/Senasgr",
      photo: "/img/team/senasgr.png",
    },
    {
      name: "Edy MSI",
      role: "Early Investor",
      xHandle: "@edymsi",
      xLink: "https://x.com/edymsi",
      photo: "/img/team/edymsi.png",
    },
  ];

  return (
    <div className="min-h-screen bg-solana-dark text-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-solana py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-solana-teal to-solana-purple">
            About Mandella
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-solana-gray">
            We’re building the future of mining with cutting-edge technology, low fees, and a passion for blockchain innovation.
          </p>
          <Button
            size="lg"
            className="bg-solana-teal hover:bg-solana-teal/80 text-solana-dark"
            asChild
          >
            <Link href="/start-mining">Join Us Now</Link>
          </Button>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto py-16 relative">
        {/* Subtle Background Animation */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute w-full h-full bg-gradient-radial from-solana-purple/20 via-transparent to-transparent animate-pulse-slow"></div>
        </div>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-solana-teal bg-clip-text text-transparent bg-gradient-to-r from-solana-teal to-solana-purple">
            Meet Our Team
          </h2>
          <p className="text-solana-gray mt-2">The visionaries driving Mandella’s mission forward.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Link href={member.xLink} key={member.xHandle} target="_blank" rel="noopener noreferrer">
              <Card
                className="relative backdrop-blur-md bg-solana-dark/40 border border-solana-purple/30 shadow-lg shadow-solana-purple/20 hover:shadow-xl hover:shadow-solana-teal/30 transition-all duration-500 transform hover:-translate-y-2 animate-fade-in cursor-pointer overflow-hidden"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <CardHeader className="p-0">
                  <img
                    src={member.photo}
                    alt={`${member.name} profile`}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="p-4 text-center">
                  <CardTitle className="text-xl text-solana-teal">{member.name}</CardTitle>
                  <p className="text-solana-gray">{member.role}</p>
                  <p className="text-sm text-solana-purple flex items-center justify-center mt-2">
                    <i className="fab fa-x-twitter mr-1"></i> {member.xHandle}
                  </p>
                </CardContent>
                <div className="absolute inset-0 bg-gradient-to-br from-solana-teal/10 to-solana-purple/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-solana-dark/80 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-solana-teal mb-4">Our Mission</h2>
          <p className="text-lg text-solana-gray max-w-2xl mx-auto">
            At Mandella, we’re committed to making cryptocurrency mining accessible, efficient, and secure for everyone. Our team combines expertise in blockchain, design, and engineering to deliver a world-class mining experience.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}