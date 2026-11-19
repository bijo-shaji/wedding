/**
 * OFFICIAL EVENT CONFIGURATION
 * Sheba Shaji & Kenneth Francis — A Celebration of Love
 * 
 * All details here are official event content.
 * Timezone: Asia/Kolkata (IST = UTC+05:30)
 */

export interface EventDetails {
  couple: {
    bride: {
      firstName: string;
      fullName: string;
      parents: {
        father: string;
        mother: string;
      };
    };
    groom: {
      firstName: string;
      fullName: string;
      parents: {
        father: string;
        mother: string;
      };
    };
  };
  bibleVerse: {
    verse: string;
    reference: string;
  };
  engagement: {
    title: string;
    dayOfWeek: string;
    dateFormatted: string;
    timeFormatted: string;
    isoDateTime: string; // ISO 8601 with +05:30 offset
    timestampMs: number;
    venueName: string;
    locationLine: string;
    fullAddress: string;
    googleMapsUrl: string;
    googleMapsEmbedUrl?: string;
  };
  matrimony: {
    title: string;
    dayOfWeek: string;
    dateFormatted: string;
    timeFormatted: string;
    isoDateTime: string; // ISO 8601 with +05:30 offset
    timestampMs: number;
    churchName: string;
    locationLine: string;
    fullAddress: string;
    googleMapsUrl: string;
    googleMapsEmbedUrl?: string;
  };
  reception: {
    title: string;
    dayOfWeek: string;
    dateFormatted: string;
    timeFormatted: string;
    timeNote: string;
    venueName: string;
    locationLine: string;
    fullAddress: string;
    googleMapsUrl: string;
    googleMapsEmbedUrl?: string;
  };
  organizer: {
    creditDeveloper: string;
    supportPhoneNumber?: string; // Optional: set only if public number verified
    contactEmailText: string;
  };
  features: {
    showCouplePhoto: boolean;
    couplePhotoUrl?: string;
    enableRosePetals: boolean;
  };
}

export const EVENT_CONFIG: EventDetails = {
  couple: {
    bride: {
      firstName: "Sheba",
      fullName: "Sheba Shaji",
      parents: {
        father: "Shaji Mathew",
        mother: "Bindhu Shaji",
      },
    },
    groom: {
      firstName: "Kenneth",
      fullName: "Kenneth Francis",
      parents: {
        father: "Francis Jose",
        mother: "Ligy Varghese",
      },
    },
  },
  bibleVerse: {
    verse: "What therefore God has joined together, let no one separate.",
    reference: "Matthew 19:6",
  },
  engagement: {
    title: "The Engagement",
    dayOfWeek: "Saturday",
    dateFormatted: "January 2, 2027",
    timeFormatted: "11:30 AM IST",
    // Saturday, Jan 2, 2027 11:30:00 AM IST (UTC+05:30) = 2027-01-02T06:00:00.000Z
    isoDateTime: "2027-01-02T11:30:00+05:30",
    timestampMs: new Date("2027-01-02T11:30:00+05:30").getTime(),
    venueName: "Landmark Convention Center & Auditorium",
    locationLine: "Valakom, Kollam, Kerala, India",
    fullAddress: "Landmark Convention Center & Auditorium, MC Road, Valakom, Kollam, Kerala 691532, India",
    googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Landmark+Convention+Center+and+Auditorium,+Valakom,+Kollam,+Kerala",
  },
  matrimony: {
    title: "The Holy Matrimony",
    dayOfWeek: "Monday",
    dateFormatted: "January 11, 2027",
    timeFormatted: "11:00 AM IST",
    // Monday, Jan 11, 2027 11:00:00 AM IST (UTC+05:30) = 2027-01-11T05:30:00.000Z
    isoDateTime: "2027-01-11T11:00:00+05:30",
    timestampMs: new Date("2027-01-11T11:00:00+05:30").getTime(),
    churchName: "Saint Mary's Roman Catholic Cathedral",
    locationLine: "Punalur, Kollam, Kerala, India",
    fullAddress: "Saint Mary's Roman Catholic Cathedral, Punalur, Kollam, Kerala 691305, India",
    googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=St+Marys+Roman+Catholic+Cathedral+Punalur+Kollam+Kerala",
  },
  reception: {
    title: "Wedding Reception",
    dayOfWeek: "Monday",
    dateFormatted: "January 11, 2027",
    timeFormatted: "Reception to follow the wedding ceremony",
    timeNote: "Following the Holy Matrimony service",
    venueName: "K G Convention Centre",
    locationLine: "Punalur, Kollam, Kerala, India",
    fullAddress: "K G Convention Centre, Bharanikavu - Kollam - Shengottai Road, Punalur, Kollam, Kerala 691305, India",
    googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=KG+Convention+Centre+Punalur+Kollam+Kerala",
  },
  organizer: {
    creditDeveloper: "Bijo Shaji",
    // Only public if verified; leaving undefined hides call button cleanly
    supportPhoneNumber: undefined,
    contactEmailText: "Private Organizer Team",
  },
  features: {
    showCouplePhoto: false,
    couplePhotoUrl: undefined,
    enableRosePetals: true,
  },
};
