// Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Send,
  Activity,
} from "lucide-react";
import Logo from "../Logo/Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Defined routes for each quick link item
  const footerGroups = [
    {
      title: "Quick Links",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Search Donors", path: "/search-donors" },
        { name: "Request Blood", path: "/donation-requests" },
        { name: "Success Stories", path: "/stories" },
        { name: "Contact Us", path: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "How to Donate", path: "/guide" },
        { name: "Eligibility Quiz", path: "/eligibility" },
        { name: "Medical Guidelines", path: "/guidelines" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
      ],
    },
    {
      title: "Community",
      links: [
        { name: "Events", path: "/events" },
        { name: "Volunteer", path: "/volunteer" },
        { name: "Partners", path: "/partners" },
        { name: "Charity", path: "/charity" },
        { name: "Blog", path: "/blog" },
      ],
    },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Top Section: Newsletter CTA */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Join our lifesaving community
            </h2>
            <p className="text-slate-400">
              Stay updated on urgent blood requests near you.
            </p>
          </div>
          <div className="mt-6 lg:mt-0 lg:w-1/3">
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-white"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl transition-colors">
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Middle Section: Main Links */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Logo & Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* <Link
              to="/"
              className="flex items-center gap-2 group cursor-pointer w-fit"
            >
              <div className="relative flex items-center justify-center bg-red-600 w-10 h-10 rounded-xl shadow-lg shadow-red-900/20">
                <Activity className="text-white w-6 h-6 stroke-[3px]" />
                <span className="absolute inset-0 rounded-xl bg-red-600 animate-ping opacity-20"></span>
              </div>
              <span className="text-2xl font-black text-white tracking-tighter italic">
                PULSE<span className="text-red-600 not-italic">.</span>
              </span>
            </Link> */}

            <Logo></Logo>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Connecting heartbeats through technology. Our platform ensures
              that blood donation is accessible and fast for everyone.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Link Groups */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerGroups.map((group, idx) => (
              <div key={idx}>
                <h3 className="text-white font-bold mb-6 uppercase text-[11px] tracking-[0.2em]">
                  {group.title}
                </h3>
                <ul className="space-y-4">
                  {group.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        to={link.path}
                        className="text-sm font-medium transition-color hover:text-red-600 bg-transparent "
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-white font-bold uppercase text-[11px] tracking-[0.2em]">
              Support
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-red-500 shrink-0" />
                <span>+880 1234 567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-red-500 shrink-0" />
                <span>help@pulse.org</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-red-500 shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="border-t border-slate-800 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500 text-center md:text-left">
            © {currentYear}{" "}
            <span className="text-white font-bold tracking-tight italic">
              PULSE.
            </span>
            All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            <Link
              to="/privacy"
              className="hover:text-red-500 transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/cookies"
              className="hover:text-red-500 transition-colors"
            >
              Cookies
            </Link>
            <Link
              to="/security"
              className="hover:text-red-500 transition-colors"
            >
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
