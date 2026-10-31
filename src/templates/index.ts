import { Template, TemplateCategory, CategoryMeta, InvitationData, StyleCustomization } from '../types';
import { kidsTemplates } from './kids';
import { pastelTeddyTemplates } from './pastelTeddy';
import { balloonTemplates } from './balloons';
import { floralTemplates } from './floral';
import { modernMinimalTemplates } from './modernMinimal';
import { luxuryGoldTemplates } from './luxuryGold';
import { partyTemplates } from './party';

export const allTemplates: Template[] = [
  ...balloonTemplates,
  ...kidsTemplates,
  ...pastelTeddyTemplates,
  ...floralTemplates,
  ...modernMinimalTemplates,
  ...luxuryGoldTemplates,
  ...partyTemplates,
];

export const templateCategories: CategoryMeta[] = [
  {
    id: 'all',
    name: 'All Templates',
    description: 'Complete collection of 54 MinGGo 3D celebration designs',
    count: allTemplates.length,
    iconName: 'Sparkles',
  },
  {
    id: 'balloons',
    name: '3D Balloons & Royale',
    description: 'Black & Gold, Midnight, Rose Gold, Emerald & Cyberpunk 3D balloons',
    count: balloonTemplates.length,
    iconName: 'PartyPopper',
  },
  {
    id: 'kids',
    name: 'Kids & Cartoon Themes',
    description: 'Dino, space, superheroes, unicorns, safari & more in 3D',
    count: kidsTemplates.length,
    iconName: 'Smile',
  },
  {
    id: 'pastel_teddy',
    name: 'Cute Pastel & Teddy Bear',
    description: 'Gentle pastel, teddy bear, clouds, prince & princess',
    count: pastelTeddyTemplates.length,
    iconName: 'Heart',
  },
  {
    id: 'floral',
    name: 'Floral & Elegant',
    description: 'Eucalyptus, botanical wreaths, peonies & gold frames',
    count: floralTemplates.length,
    iconName: 'Flower2',
  },
  {
    id: 'modern_minimal',
    name: 'Modern & Minimalist',
    description: 'Clean typographic posters, Scandinavian arches & sleek lines',
    count: modernMinimalTemplates.length,
    iconName: 'LayoutGrid',
  },
  {
    id: 'luxury_gold',
    name: 'Premium Gold & Luxury',
    description: 'Art deco, royal velvet, emerald marble & black tie',
    count: luxuryGoldTemplates.length,
    iconName: 'Crown',
  },
  {
    id: 'party',
    name: 'Colorful Party Themes',
    description: 'Retro disco, tropical flamingos, big top circus & neon',
    count: partyTemplates.length,
    iconName: 'Flame',
  },
];

export function getTemplateById(id: string): Template {
  const found = allTemplates.find((t) => t.id === id);
  return found || allTemplates[0];
}

export const defaultInvitationData: InvitationData = {
  birthdayName: 'Aarav Sharma',
  birthDate: '2026-11-15',
  age: '5',
  eventTime: '6:30 PM Onwards',
  venueName: 'The Royal Orchid Banquet Hall',
  venueAddress: 'Nagpur, Maharashtra',
  hostName: 'Sharma & Deshmukh Family',
  rsvp: '+91 98765 43210 / 91234 56780',
  customMessage: 'Join us for an evening of joy, sweet cake, thrilling games, and endless laughter as we celebrate our little champ turning five!',
  photoUrl: null,
  photoShape: 'circle',
  photoZoom: 1.0,
  photoOffset: { x: 0, y: 0 },
  hasPhoto: false,
};

export const defaultStyleCustomization: StyleCustomization = {
  titleFont: 'Caveat',
  nameFont: 'Fredoka',
  bodyFont: 'Montserrat',
  fontScale: 1.0,
  textAlignment: 'center',
  aspectRatio: 'portrait',
};

export interface SamplePreset {
  id: string;
  label: string;
  badge: string;
  data: Partial<InvitationData>;
  templateId: string;
}

export const samplePresets: SamplePreset[] = [
  {
    id: 'aarav-5',
    label: "Aarav's 5th Birthday (MinGGo 3D Black & Gold Royale)",
    badge: '★ MinGGo Signature',
    templateId: 'balloons-minggo-royale',
    data: {
      birthdayName: 'Aarav Sharma',
      birthDate: '2026-11-15',
      age: '5',
      eventTime: '6:30 PM Onwards',
      venueName: 'The Royal Orchid Banquet Hall',
      venueAddress: 'Nagpur, Maharashtra',
      hostName: 'Sharma & Deshmukh Family',
      rsvp: '+91 98765 43210 / 91234 56780',
      customMessage: 'Join us for an evening of joy, sweet cake, thrilling games, and endless laughter as we celebrate our little champ turning five!',
      hasPhoto: false,
    },
  },
  {
    id: 'saanvi-1',
    label: "Baby Saanvi's 1st Birthday (Pastel Dream)",
    badge: 'Pastel',
    templateId: 'pastel-baby-dream',
    data: {
      birthdayName: 'Baby Saanvi',
      birthDate: '2026-12-05',
      age: '1st',
      eventTime: '5:30 PM Onwards',
      venueName: 'Lotus Grand Ballroom',
      venueAddress: 'Bandra West, Mumbai',
      hostName: 'Kavita & Rajesh Verma',
      rsvp: '+91 98190 12345',
      customMessage: 'Our little sunshine is turning ONE! Come bless our precious baby angel on her first big milestone.',
      hasPhoto: false,
    },
  },
  {
    id: 'ananya-16',
    label: "Ananya's Sweet 16 (Rose Gold Glamour)",
    badge: 'Balloons',
    templateId: 'balloons-rosegold',
    data: {
      birthdayName: 'Ananya Deshmukh',
      birthDate: '2026-10-30',
      age: '16',
      eventTime: '7:00 PM Onwards',
      venueName: 'The Imperial Sky Lounge',
      venueAddress: 'Senapati Bapat Road, Pune',
      hostName: 'Dr. Deshmukh & Family',
      rsvp: '+91 94220 54321',
      customMessage: 'Sparkles, music, and unforgettable memories! Dress to impress and join the celebration for Ananya’s Sweet 16.',
      hasPhoto: false,
    },
  },
  {
    id: 'rohan-25',
    label: "Rohan's 25th Silver Birthday (Art Deco)",
    badge: 'Luxury',
    templateId: 'luxury-artdeco',
    data: {
      birthdayName: 'Rohan Kulkarni',
      birthDate: '2026-11-20',
      age: '25',
      eventTime: '8:00 PM',
      venueName: 'The Oberoi Sapphire Hall',
      venueAddress: 'MG Road, Bengaluru',
      hostName: 'Friends & Family',
      rsvp: '+91 99000 88776',
      customMessage: 'A quarter of a century of great adventures! Join us for dinner, drinks, and celebration.',
      hasPhoto: false,
    },
  },
  {
    id: 'rameshwar-60',
    label: "Shri Rameshwar's 60th Shashtipoorthi (Royal Velvet)",
    badge: 'Classic',
    templateId: 'luxury-velvet',
    data: {
      birthdayName: 'Shri Rameshwar Rao',
      birthDate: '2026-12-18',
      age: '60th',
      eventTime: '11:00 AM & Evening 7:00 PM',
      venueName: 'Shree Krishna Kalyana Mandapam',
      venueAddress: 'Jayanagar 4th Block, Bengaluru',
      hostName: 'Smt. Lakshmi & Children',
      rsvp: '+91 94480 11223',
      customMessage: 'With immense gratitude and joy, we solicit your gracious presence with family on the auspicious 60th Birthday (Shashtipoorthi) of Shri Rameshwar Rao.',
      hasPhoto: false,
    },
  },
];
