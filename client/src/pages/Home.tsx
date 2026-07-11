import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TestimonialsSection } from "@/components/TestimonialsSection";

// Sample data for grid items
type CourseCard = {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: string;
  image: string;
  students: number;
  rating: number;
};

const featuredCourses: CourseCard[] = [
  {
    id: '1',
    title: "Blockchain Fundamentals",
    description: "Learn the core concepts of blockchain technology including distributed ledgers, consensus mechanisms, and cryptographic principles.",
    duration: "4 weeks",
    level: "Beginner",
    price: "$299",
    image: "/courses/blockchain-fundamentals.jpg",
    students: 1250,
    rating: 4.8
  },
  {
    id: '2',
    title: "Smart Contract Development",
    description: "Master Solidity and develop secure, efficient smart contracts on Ethereum and other EVM-compatible blockchains.",
    duration: "6 weeks",
    level: "Intermediate",
    price: "$399",
    image: "/courses/smart-contracts.jpg",
    students: 890,
    rating: 4.9
  },
  {
    id: '3',
    title: "DeFi Protocols & Yield Farming",
    description: "Understand decentralized finance protocols, liquidity mining, yield optimization strategies, and risk management.",
    duration: "5 weeks",
    level: "Advanced",
    price: "$499",
    image: "/courses/defi.jpg",
    students: 675,
    rating: 4.7
  },
  {
    id: '4',
    title: "NFT Marketplace Development",
    description: "Build your own NFT marketplace from scratch using modern web3 technologies and best practices.",
    duration: "6 weeks",
    level: "Intermediate",
    price: "$399",
    image: "/courses/nft.jpg",
    students: 720,
    rating: 4.6
  },
  {
    id: '5',
    title: "Crypto Investment Strategies",
    description: "Learn professional crypto portfolio management, risk assessment, and investment strategies from industry experts.",
    duration: "4 weeks",
    level: "Beginner",
    price: "$299",
    image: "/courses/investing.jpg",
    students: 1560,
    rating: 4.5
  },
  {
    id: '6',
    title: "Web3 Development Bootcamp",
    description: "Comprehensive full-stack web3 development covering frontend, backend, smart contracts, and deployment.",
    duration: "8 weeks",
    level: "Advanced",
    price: "$599",
    image: "/courses/web3-bootcamp.jpg",
    students: 540,
    rating: 4.9
  }
];

// Sample testimonials for the grid
type Testimonial = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  company: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Blockchain Developer",
    avatar: "/avatars/john.jpg",
    quote: "This course completely transformed my understanding of blockchain technology. The hands-on exercises were invaluable.",
    company: "TechCorp"
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Crypto Investor",
    avatar: "/avatars/jane.jpg",
    quote: "I've been in the crypto space for years, but this program gave me insights I never found anywhere else. Highly recommended!",
    company: "CryptoFund"
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Software Engineer",
    avatar: "/avatars/mike.jpg",
    quote: "The instructors are industry experts who break down complex concepts into easy-to-understand lessons. Worth every penny.",
    company: "DevLabs"
  }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter courses based on search
  const filteredCourses = featuredCourses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex-1 relative">
      {/* Fixed Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/WhatsApp%20Video%202026-07-03%20at%201.32.13%20PM.mp4" type="video/mp4" />
      </video>
      <div className="fixed inset-0 bg-black/60" style={{ zIndex: 1 }} />

      {/* Hero Section */}
      <section className="relative py-20" style={{ zIndex: 2 }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-5 inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-white mr-2" />
              Blockchain Pulse Blog
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Master Blockchain & Web3 Technologies
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Comprehensive courses designed by industry experts to help you build real-world blockchain applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="w-full sm:w-auto">
                Browse All Courses
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Grid */}
      <section className="relative py-16" style={{ zIndex: 2 }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Featured Courses
          </h2>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:shadow-lg transition-shadow text-white">
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                  <CardTitle className="text-lg text-white">{course.title}</CardTitle>
                  <CardDescription className="mt-2 line-clamp-2 text-white/70">{course.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className="ml-2 border-white/30 text-white">
                      {course.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <span>⏱️ {course.duration}</span>
                    <span>👥 {course.students} students</span>
                    <span>⭐ {course.rating}/5</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <span className="text-2xl font-bold text-white">{course.price}</span>
                  <Button asChild size="sm" variant="secondary">
                    <Link href={`/course/${course.id}`}>Enroll Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <div className="relative" style={{ zIndex: 2 }}>
        <TestimonialsSection />
      </div>

      {/* CTA Section */}
      <section className="relative py-16 bg-black/40 backdrop-blur-sm" style={{ zIndex: 2 }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Ready to Start Your Blockchain Journey?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers with our comprehensive blockchain courses
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="w-full sm:w-auto">
              <Link href="/courses">Browse All Courses</Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
