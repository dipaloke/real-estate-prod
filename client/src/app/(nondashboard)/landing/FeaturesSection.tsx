"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Animation variants for the container using Framer Motion
const containerVariants = {
  // Initial state: hidden and moved down by 50px
  hidden: {
    opacity: 0,
    y: 50,
  },
  // Visible state: fully opaque and at original position
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5, // Animation duration for the container
      staggerChildren: 0.2, // Delay between children animations
    },
  },
};
const itemVariants = {
  // Initial state for each item: hidden and moved down by 20px
  hidden: {
    opacity: 0,
    y: 20,
  },
  // Visible state for each item: fully opaque and at original position
  visible: {
    opacity: 1,
    y: 0,
  },
};

const FeaturesSection = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="py-24 px-6 sm:px-8 lg:px-12 xl:px-16 bg-white"
    >
      <div className="max-w-4xl xl:max-w-6xl mx-auto">
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl font-bold text-center mb-12 w-full sm:w-2/3 mx-auto"
        >
          Quickly find your perfect rental property using our advanced &
          effective search filters!
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
          {[0, 1, 2].map((index) => (
            <motion.div key={index} variants={itemVariants}>
              <FeatureCard
                imageSrc={`/landing-search${3 - index}.png`}
                title={
                  [
                    "Trustworthy and verified Listings",
                    "Browse Rental Listings with Ease",
                    "Simplify Your Rental Search with advanced",
                  ][index]
                }
                description={
                    [
                        "All listings are verified and trustworthy, ensuring you find the perfect home without any hassle.",
                        "Easily browse through a wide range of rental listings tailored to your preferences and needs.",
                        "Advanced search filters help you quickly find properties that match your specific requirements.",
                    ][index]
                }
                linkText={['Explore Listings', 'Browse Rentals', 'Discover Now'][index]}
                linkHref={['/explore', '/search', '/discover'][index]}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const FeatureCard = ({
  title,
  description,
  imageSrc,
  linkText,
  linkHref,
}: {
  title: string;
  description: string;
  imageSrc: string;
  linkText: string;
  linkHref: string;
}) => {
  return (
    <div className="text-center">
      <div className="p-4 rounded-lg mb-4 flex items-center justify-center h-48">
        <Image
          src={imageSrc}
          alt={title}
          width={400}
          height={400}
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="mb-4">{description}</p>
      <Link
        href={linkHref}
        className="inline-block border border-gray-300 rounded px-4 py-2 hover:bg-gray-100"
        scroll={false} // Prevents scrolling to top when navigating
      >
        {linkText}
      </Link>
    </div>
  );
};

export default FeaturesSection;
