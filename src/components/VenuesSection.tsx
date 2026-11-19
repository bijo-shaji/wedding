import React from "react";
import { motion } from "framer-motion";
import { EVENT_CONFIG } from "../config/event";
import { VenueCard } from "./VenueCard";
import { GoldDivider } from "./FloralDecorations";
import { MapPin } from "lucide-react";

export const VenuesSection: React.FC = () => {
  return (
    <section
      id="venues"
      className="py-6 sm:py-10 px-3 sm:px-6 max-w-5xl mx-auto scroll-mt-20 sm:scroll-mt-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6 sm:mb-8"
      >
        <div className="flex items-center justify-center gap-2 text-gold-600 font-cinzel text-xs font-semibold tracking-widest uppercase mb-1.5">
          <MapPin className="w-4 h-4" />
          <span>Locations &amp; Navigation</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-900 leading-tight">
          Venues &amp; Directions
        </h2>

        <GoldDivider className="my-2" />

        <p className="font-sans text-xs sm:text-sm text-[#5C5251] max-w-md mx-auto">
          We look forward to welcoming you to all our celebrations. Tap any venue below for
          verified turn-by-turn directions via Google Maps.
        </p>
      </motion.div>

      {/* 3 Venue Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {/* 1. Engagement Venue */}
        <VenueCard
          category="1. Engagement Venue"
          venueName={EVENT_CONFIG.engagement.venueName}
          locationLine={EVENT_CONFIG.engagement.locationLine}
          fullAddress={EVENT_CONFIG.engagement.fullAddress}
          googleMapsUrl={EVENT_CONFIG.engagement.googleMapsUrl}
          date={EVENT_CONFIG.engagement.dateFormatted}
          time={EVENT_CONFIG.engagement.timeFormatted}
        />

        {/* 2. Wedding Church */}
        <VenueCard
          category="2. Holy Matrimony"
          venueName={EVENT_CONFIG.matrimony.churchName}
          locationLine={EVENT_CONFIG.matrimony.locationLine}
          fullAddress={EVENT_CONFIG.matrimony.fullAddress}
          googleMapsUrl={EVENT_CONFIG.matrimony.googleMapsUrl}
          date={EVENT_CONFIG.matrimony.dateFormatted}
          time={EVENT_CONFIG.matrimony.timeFormatted}
        />

        {/* 3. Reception Venue */}
        <VenueCard
          category="3. Wedding Reception"
          venueName={EVENT_CONFIG.reception.venueName}
          locationLine={EVENT_CONFIG.reception.locationLine}
          fullAddress={EVENT_CONFIG.reception.fullAddress}
          googleMapsUrl={EVENT_CONFIG.reception.googleMapsUrl}
          date={EVENT_CONFIG.reception.dateFormatted}
          time={EVENT_CONFIG.reception.timeFormatted}
        />
      </div>
    </section>
  );
};
