"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Animation variants for the container using Framer Motion
const containerVariants = {
  // Initial state: hidden and moved down by 50px
  hidden: {
    opacity: 0,
  },
  // Visible state: fully opaque and at original position
  visible: {
    opacity: 1,

    transition: {
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

const DiscoverSection = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }} // Trigger when 80% of the section is in view
      variants={containerVariants}
      className="py-12 mb-16 bg-white"
    >
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 text-center">
        <motion.div variants={itemVariants} className="my-12 text-center">
          <h2 className="text-3xl font-semibold leading-tight text-gray-800">
            Discover
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Find your Dream Rental Property Today!{" "}
          </p>
          <p className="mt-2 text-gray-500 max-w-3xl mx-auto">
            Explore a wide range of rental properties tailored to your lifestyle
            needs. From cozy apartments to spacious homes, we have something for
            everyone. Start your journey to find the perfect rental property
            today!
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
          {[
            {
              title: "Search for Properties",
              description:
                "Easily find properties in your desired location with our intuitive search feature.",
              imageSrc: "/landing-icon-wand.png",
            },
            {
              title: "Book Your Rental",
              description:
                "Schedule viewings and book your rental property directly through our platform with just a few clicks.",
              imageSrc: "/landing-icon-calendar.png",
            },
            {
              title: "Enjoy Your New Home",
              description:
                "Experience the joy of moving into your new home, hassle-free and ready to enjoy.",
              imageSrc: "/landing-icon-heart.png",
            },
          ].map((card, index) => (
            <motion.div key={index} variants={itemVariants}>
              <DiscoverCard {...card} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const DiscoverCard = ({
  title,
  description,
  imageSrc,
}: {
  title: string;
  description: string;
  imageSrc: string;
}) => {
  return (
    <div className="px-4 py-12 shadow-lg rounded-lg bg-primary-50 md:h-72">
      <div className="bg-primary-700 p-[0.6rem] rounded-full mb-4 h-10 w-10 mx-auto">
        <Image
          src={imageSrc}
          alt={title}
          width={400}
          height={400}
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="mt-4 text-xl font-medium text-gray-800 ">{title}</h3>
      <p className="mt-2 text-base text-gray-500">{description}</p>
    </div>
  );
};

export default DiscoverSection;
