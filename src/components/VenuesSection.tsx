import React from "react";
import { EVENT_CONFIG } from "../config/event";
import { VenueCard } from "./VenueCard";
import { GoldDivider } from "./FloralDecorations";
import { MapPin } from "lucide-react";

export const VenuesSection: React.FC = () => {
  return (
    <section
      id="venues"
      className="py-14 sm:py-20 px-4 max-w-6xl mx-auto scroll-mt-20"
    >
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 text-gold-600 font-cinzel text-xs font-semibold tracking-widest uppercase mb-2">
          <MapPin className="w-4 h-4" />
          <span>Locations &amp; Navigation</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-800 leading-tight">
          Venues &amp; Directions
        </h2>

        <GoldDivider className="my-3" />

        <p className="font-sans text-xs sm:text-sm text-[#5C5251] max-w-lg mx-auto">
          We look forward to welcoming you to all our celebrations. Tap any venue below for
          verified turn-by-turn directions via Google Maps.
        </p>
      </div>

      {/* 3 Venue Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
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
