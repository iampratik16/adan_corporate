/**
 * The fourteen locations the old site printed, carried across with their
 * contradictions recorded rather than smoothed over.
 *
 * Source: content/_source/contact.md (Contact Us and Global Locations both
 * print a byte-identical office list). Partner cities: content/_source/people.md.
 *
 * Two things the source cannot support, so this file does not print them:
 *  - Contact names. Neither page prints a name; only a mailto: address. A name
 *    is given below only where the mailbox local-part matches a person on the
 *    team roster in people.md whose printed city is this city. Everywhere else
 *    contactName is omitted and the doubt is recorded in notes.
 *  - The Almaty phone and address. See that entry.
 */
import { z } from 'zod';
import { Office } from './schema';

const data = [
  // Europe
  {
    slug: 'london',
    city: 'London',
    country: 'United Kingdom',
    region: 'Europe',
    timeZone: 'Europe/London',
    address: ['27 Old Gloucester Street', 'London WC1N 3AX', 'United Kingdom'],
    phone: '+44 7917 120849',
    contactName: 'Ajay Mavinkurve',
    contactEmail: 'ajay.mavinkurve@adancorporate.com',
    lat: 51.51,
    lng: -0.13,
    isOffice: true,
  },
  {
    slug: 'amsterdam',
    city: 'Amsterdam',
    country: 'Netherlands',
    region: 'Europe',
    timeZone: 'Europe/Amsterdam',
    address: ['Herengracht 268', '1016 BW', 'Amsterdam', 'The Netherlands'],
    phone: '+31 615 35 3660',
    contactName: 'Thomas Peutz',
    contactEmail: 'thomas.peutz@adancorporate.com',
    lat: 52.37,
    lng: 4.9,
    isOffice: true,
  },
  {
    slug: 'milan',
    city: 'Milan',
    country: 'Italy',
    region: 'Europe',
    timeZone: 'Europe/Rome',
    address: ['Milan', 'Italy'],
    phone: '+44 7469 955740',
    contactName: 'Marco Salvini',
    contactEmail: 'marco.salvini@adancorporate.com',
    lat: 45.46,
    lng: 9.19,
    isOffice: true,
    notes:
      'Confirm before publication. The old site printed no street address for Milan, only the city name, and the number it printed is a United Kingdom mobile (+44), not an Italian one (+39). The number is carried across as printed because it is a distinct number that appears nowhere else on the old site, but it may be a partner mobile rather than an office line. Marco Salvini is printed on the team page as Milan and London.',
  },
  {
    slug: 'paris',
    city: 'Paris',
    country: 'France',
    region: 'Europe',
    timeZone: 'Europe/Paris',
    address: ['Paris', 'France'],
    phone: '+420 226 807 069',
    contactName: 'Jean-Bernard Tanqueray',
    contactEmail: 'jb.tanqueray@adancorporate.com',
    lat: 48.86,
    lng: 2.35,
    isOffice: true,
    notes:
      'Confirm before publication. The old site printed no street address for Paris, only the city name, and the number it printed is a Czech Republic landline (+420) byte-identical to the Prague number. It is almost certainly a copy and paste error and there is no French number anywhere on the old site. It is carried across here so the conflict is visible, but it should not go live until the client supplies a Paris number or confirms this one. Jean-Bernard Tanqueray is printed on the team page as Paris and London.',
  },
  {
    slug: 'prague',
    city: 'Prague',
    country: 'Czech Republic',
    region: 'Europe',
    timeZone: 'Europe/Prague',
    address: ['838/9 Vaclavske nam.', 'Prague 110 00', 'Czech Republic'],
    phone: '+420 226 807 069',
    contactName: 'Thu Nga Haskovcova',
    contactEmail: 'thu.nga@adancorporate.com',
    lat: 50.08,
    lng: 14.44,
    isOffice: true,
    notes:
      'The Paris entry carries this same phone number. Prague is the likelier owner of it, since the number is a Czech landline, but the duplication needs confirming.',
  },
  {
    slug: 'zurich',
    city: 'Zurich',
    country: 'Switzerland',
    region: 'Europe',
    timeZone: 'Europe/Zurich',
    address: ['Glattbrugg', 'Zurich 8152', 'Switzerland'],
    phone: '+41 779767674',
    contactEmail: 'nitin.kumar@adancorporate.com',
    lat: 47.37,
    lng: 8.54,
    isOffice: true,
    notes:
      'The old site headed this card "Switzerland" and gave the locality as Glattbrugg, a municipality just north of Zurich, with no street address. Listed here under Zurich with the Glattbrugg address kept as printed. The phone number was printed without spacing, unlike every other entry, so its grouping is unverified. The mailbox implies Nitin Kumar, but no name is printed on the old site and no Nitin Kumar appears on the team roster, so no contact name is shown.',
  },

  // Asia
  {
    slug: 'almaty',
    city: 'Almaty',
    country: 'Kazakhstan',
    region: 'Asia',
    timeZone: 'Asia/Almaty',
    address: [],
    contactEmail: 'almira@adancorporate.com',
    lat: 43.24,
    lng: 76.89,
    isOffice: true,
    // Phone and address are omitted deliberately: both belong to Baku, not Almaty.
    notes:
      'Address and phone withheld pending confirmation. The old site printed this card cross contaminated with the Baku entry on three counts. The phone number it gave, +994 50 278 7870, carries the Azerbaijan country code (Kazakhstan is +7) and is byte-identical to the number on the Baku card. The address it gave contained the line "Yasamal Office 4", and Yasamal is a district of Baku, not a place in Almaty. The same mailbox, almira@adancorporate.com, serves both cards. Rather than print a Kazakh address and phone number that the source cannot support, both fields are left out until the client supplies them. The mailbox is retained because it is the only routing the source gives for this location.',
  },
  {
    slug: 'baku',
    city: 'Baku',
    country: 'Azerbaijan',
    region: 'Asia',
    timeZone: 'Asia/Baku',
    address: ['574-2, Hagverdiyev St', 'Yasamal district', 'Baku', 'Azerbaijan'],
    phone: '+994 50 278 7870',
    contactEmail: 'almira@adancorporate.com',
    lat: 40.41,
    lng: 49.87,
    isOffice: true,
    notes:
      'This mailbox and phone number were also printed on the Almaty card. Both are consistent with Baku and inconsistent with Almaty, so they are kept here. The mailbox implies a first name only, Almira, with no surname printed anywhere on the old site and no match on the team roster, so no contact name is shown. Rauf Akhundov is the partner the team page prints for Baku, but the old site did not connect him to this card.',
  },
  {
    slug: 'mumbai',
    city: 'Mumbai',
    country: 'India',
    region: 'Asia',
    timeZone: 'Asia/Kolkata',
    address: [
      '2nd Floor, Lakshdeep',
      'Gulmohar Lane No. 5',
      'Juhu JVPD Scheme',
      'Mumbai 400049',
      'India',
    ],
    phone: '+91 22 2628 6599',
    contactName: 'Sabapaty Suryanarayanan',
    contactEmail: 'sabapatys@adancorporate.com',
    lat: 19.08,
    lng: 72.88,
    isOffice: true,
    notes:
      'The mailbox does not follow the firstname.lastname pattern used elsewhere. It is read as Sabapaty Suryanarayanan, a managing partner the team page prints as Mumbai. Confirm.',
  },
  {
    slug: 'singapore',
    city: 'Singapore',
    country: 'Singapore',
    region: 'Asia',
    timeZone: 'Asia/Singapore',
    address: ['Simei Rise', '#02-48', 'Singapore 528808'],
    contactName: 'Kieran Bourke',
    contactEmail: 'kieran.bourke@adancorporate.com',
    lat: 1.35,
    lng: 103.82,
    isOffice: true,
    notes:
      'The old site printed no phone number for Singapore, so none is shown. The address also has no street number before Simei Rise. Both need supplying by the client.',
  },

  // Middle East
  {
    slug: 'abu-dhabi',
    city: 'Abu Dhabi',
    country: 'United Arab Emirates',
    region: 'Middle East',
    timeZone: 'Asia/Dubai',
    address: ['Garden View', 'Khalifa Street', 'Abu Dhabi', 'United Arab Emirates'],
    phone: '+971 56264 4124',
    contactEmail: 'sp@adancorporate.com',
    lat: 24.45,
    lng: 54.38,
    isOffice: true,
    notes:
      'The old site grouped the two Emirati cards under a heading of Asia. They are listed here under the Middle East. The mailbox is initials only and cannot be resolved to a person: the nearest roster match, Sreeraman P.S., is printed as Mumbai, not Abu Dhabi, so no contact name is shown.',
  },
  {
    slug: 'dubai',
    city: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Middle East',
    timeZone: 'Asia/Dubai',
    address: ['Sheikh Zayed Road', 'Dubai', 'United Arab Emirates'],
    phone: '+971 55455 8146',
    contactName: 'Chennakeshav Adya',
    contactEmail: 'ck.adya@adancorporate.com',
    lat: 25.2,
    lng: 55.27,
    isOffice: true,
    notes:
      'The old site grouped the two Emirati cards under a heading of Asia. They are listed here under the Middle East. This was the only card with two numbers: a second, +971 50819 2473, was printed below the one shown. Confirm which is the office line. Sheikh Zayed Road is given without a tower or unit number.',
  },

  // Africa
  {
    slug: 'abidjan',
    city: 'Abidjan',
    country: "Cote d'Ivoire",
    region: 'Africa',
    timeZone: 'Africa/Abidjan',
    address: ['26 BP 1028', 'Abidjan 26', "Cote d'Ivoire"],
    contactEmail: 'chris.king@adancorporate.com',
    lat: 5.36,
    lng: -4.01,
    isOffice: true,
    notes:
      'The old site headed this card "Ivory Coast" while the address line read "Cote d\'Ivoire". The country name used here follows the address line. No phone number was printed, so none is shown. The address is a post box rather than a street address. The mailbox implies Chris King, who does not appear on the team roster, so no contact name is shown.',
  },
  {
    slug: 'johannesburg',
    city: 'Johannesburg',
    country: 'South Africa',
    region: 'Africa',
    timeZone: 'Africa/Johannesburg',
    address: ['60 Arum', "St John's Avenue", 'Senderwood', 'Johannesburg', 'South Africa'],
    phone: '+27 72 969 9865',
    contactName: 'George Christelis',
    contactEmail: 'george.christelis@adancorporate.com',
    lat: -26.2,
    lng: 28.05,
    isOffice: true,
  },
] satisfies unknown[];

export const offices = z.array(Office).parse(data);

/**
 * Cities where the team page places a partner but the old site lists no office.
 * They render as smaller marks on the globe. Source: the roster table in
 * content/_source/people.md.
 *
 * Two roster entries give a country with no city, Sandeep Bhat and Varun
 * Nadkarni, both printed only as "India". They cannot be placed and are left out.
 */
const PartnerCity = z.object({
  city: z.string(),
  country: z.string(),
  timeZone: z.string(),
  lat: z.number(),
  lng: z.number(),
});

const partnerCityData = [
  { city: 'Hamburg', country: 'Germany', timeZone: 'Europe/Berlin', lat: 53.55, lng: 9.99 },
  { city: 'Gurgaon', country: 'India', timeZone: 'Asia/Kolkata', lat: 28.46, lng: 77.03 },
  { city: 'Pune', country: 'India', timeZone: 'Asia/Kolkata', lat: 18.52, lng: 73.86 },
  { city: 'Manama', country: 'Bahrain', timeZone: 'Asia/Bahrain', lat: 26.23, lng: 50.59 },
  {
    city: 'Miami',
    country: 'United States',
    timeZone: 'America/New_York',
    lat: 25.77,
    lng: -80.19,
  },
  { city: 'Bogota', country: 'Colombia', timeZone: 'America/Bogota', lat: 4.71, lng: -74.07 },
] satisfies unknown[];

export const partnerCities = z.array(PartnerCity).parse(partnerCityData);
