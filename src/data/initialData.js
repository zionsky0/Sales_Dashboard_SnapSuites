export const PACKAGES = [
  {
    id: 'digital-2h',
    name: '2-Hour Digital Package',
    price: 250,
    duration: 2,
    badge: 'Popular for Intimate Parties',
    includesPrints: false,
    description: 'Perfect for lively digital-focused celebrations with instant social sharing.',
    features: [
      '2 hours of photobooth hire',
      'Unlimited visits to the booth',
      'Instant sharing via Email, SMS or QR code',
      'Luxury props curated for your event',
      'Choice of Burgundy or Ivory curtain backdrop',
      'Personalised interactive rear screen display'
    ]
  },
  {
    id: 'birthday-3h',
    name: '3-Hour Birthday / Celebration Package',
    price: 350,
    duration: 3,
    badge: 'Recommended & Best Seller',
    includesPrints: true,
    description: 'The sweet spot for full evening celebrations with physical prints & digital memories.',
    features: [
      '3 hours of photobooth hire',
      'Unlimited visits to the booth',
      'Up to 6 high-quality prints per visit',
      'Instant digital sharing (Email/SMS/QR)',
      'Luxury props curated for your theme',
      'Choice of Burgundy or Ivory curtain backdrop',
      'Personalised rear screen with guest of honour photos/videos'
    ]
  },
  {
    id: 'corporate-custom',
    name: 'Custom Corporate & VIP Package',
    price: 500,
    duration: 4,
    badge: 'Custom Corporate',
    includesPrints: true,
    description: 'Bespoke activation setup with custom branding on prints and back screen.',
    features: [
      '4+ hours of continuous hire',
      'Custom branded print strip layout & logo',
      'Branded video loops on rear screen',
      'Unlimited physical prints & instant digital sharing',
      'VIP Luxury Props & Custom Backdrop',
      'Post-event digital analytics & photo zip gallery'
    ]
  }
];

export const ADD_ONS = [
  {
    id: 'extra_hour',
    name: 'Extra Photobooth Hire Hour',
    price: 75,
    unit: 'per hour',
    description: 'Extend the fun by another hour of booth operation'
  },
  {
    id: 'guestbook',
    name: 'Luxury Memory Guestbook & Pens',
    price: 40,
    unit: 'per event',
    description: 'Hardcover album for guests to stick prints & write messages'
  },
  {
    id: 'rear_screen_custom',
    name: 'Bespoke Rear Screen Slideshow Setup',
    price: 25,
    unit: 'per event',
    description: 'Custom curated slideshow/video compilation of guest of honour'
  },
  {
    id: 'neon_sign',
    name: 'Custom Neon Sign Backdrop Accent',
    price: 35,
    unit: 'per event',
    description: 'Warm glowing "Let\'s Party" or custom neon light backdrop accent'
  },
  {
    id: 'extra_prints',
    name: 'Extra Print Strips Set (Unlimited Double Prints)',
    price: 30,
    unit: 'per event',
    description: 'Ensures every guest in group shots gets a physical print copy'
  },
  {
    id: 'travel_surcharge',
    name: 'Extended Location Travel Fee',
    price: 35,
    unit: 'flat fee',
    description: 'Coverage for events outside core Manchester/Leeds North West area'
  }
];

export const BACKDROPS = [
  { id: 'burgundy', name: 'Burgundy Velvet', description: 'Rich, luxurious dark red velvet backdrop' },
  { id: 'ivory', name: 'Ivory Elegance', description: 'Timeless satin ivory silk curtain backdrop' }
];

export const STAGES = [
  { id: 'new', name: 'New Enquiry', color: '#3B82F6', icon: '📥' },
  { id: 'quote_sent', name: 'Quote Sent / Follow-up', color: '#F59E0B', icon: '💬' },
  { id: 'negotiation', name: 'Date Hold / Negotiating', color: '#8B5CF6', icon: '🤝' },
  { id: 'secured', name: 'Deposit Paid (Won)', color: '#10B981', icon: '🎉' },
  { id: 'completed', name: 'Event Completed', color: '#06B6D4', icon: '🏁' },
  { id: 'lost', name: 'Declined / Lost', color: '#EF4444', icon: '❌' }
];

export const PROSPECT_STATUSES = [
  { id: 'not_contacted', name: 'Not Contacted Yet', color: '#EF4444', icon: '🔴' },
  { id: 'initial_outreach', name: 'Outreach Sent', color: '#F59E0B', icon: '🟡' },
  { id: 'followup_sent', name: 'Follow-up Sent', color: '#8B5CF6', icon: '🟣' },
  { id: 'meeting_scheduled', name: 'Call / Meeting Scheduled', color: '#3B82F6', icon: '🔵' },
  { id: 'converted', name: 'Converted to Lead', color: '#10B981', icon: '🟢' },
  { id: 'not_interested', name: 'Not Interested', color: '#6B7280', icon: '⚪' }
];

export const INITIAL_PROSPECTS = [
  {
    id: 'prospect-1',
    name: 'Peckforton Castle Events Team',
    contactPerson: 'Claire Higgins (Wedding Coordinator)',
    category: 'Wedding Venue Partner',
    location: 'Tarporley, Cheshire',
    preferredChannel: 'Email',
    contactEmail: 'weddings@peckfortoncastle.co.uk',
    contactPhone: '01829 260901',
    status: 'initial_outreach',
    nextActionDate: '2026-08-25',
    notes: 'Sent luxury brochure email proposing SnapSuites photobooth for their recommended supplier list.',
    targetPackage: 'birthday-3h'
  },
  {
    id: 'prospect-2',
    name: 'Victoria Warehouse Event Management',
    contactPerson: 'Alex Turner',
    category: 'Corporate & Party Venue',
    location: 'Trafford Park, Manchester',
    preferredChannel: 'Phone',
    contactEmail: 'events@victoriawarehouse.com',
    contactPhone: '0161 660 7000',
    status: 'not_contacted',
    nextActionDate: '2026-08-21',
    notes: 'High-volume venue for large corporate Christmas parties and 30th birthday galas.',
    targetPackage: 'corporate-custom'
  },
  {
    id: 'prospect-3',
    name: 'Jessica M. (30th Birthday Host)',
    contactPerson: 'Jessica Myers',
    category: 'Private Party Host',
    location: 'Didsbury, Manchester',
    preferredChannel: 'Instagram DM',
    contactEmail: 'jess.myers30@example.com',
    contactPhone: '07788 123456',
    status: 'followup_sent',
    nextActionDate: '2026-08-22',
    notes: 'Inquired via Instagram DM for Nov 2026 birthday. Sent quote for 2-Hour Digital Package (£250).',
    targetPackage: 'digital-2h'
  },
  {
    id: 'prospect-4',
    name: 'Grantley Hall Luxury Weddings',
    contactPerson: 'Rebecca Vance (Events Mgr)',
    category: 'Wedding Venue Partner',
    location: 'Ripon, North Yorkshire',
    preferredChannel: 'Email',
    contactEmail: 'events@grantleyhall.co.uk',
    contactPhone: '01765 620070',
    status: 'not_contacted',
    nextActionDate: '2026-08-24',
    notes: 'Ultra-luxury 5-star venue in Yorkshire. Perfect match for SnapSuites mahogany vintage aesthetic.',
    targetPackage: 'birthday-3h'
  }
];

export const INITIAL_LEADS = [
  {
    id: 'lead-1',
    clientName: 'Chris',
    contactEmail: 'chris.event2027@example.com',
    contactPhone: '07700 900123',
    eventType: 'Birthday Celebration',
    eventDate: '2027-06-19',
    eventTime: '19:00 - 22:00',
    recommendedTiming: '7pm–10pm',
    venue: 'Bark Enquiry (Manchester / Cheshire)',
    source: 'Bark',
    packageId: 'birthday-3h',
    backdrop: 'burgundy',
    guestCount: 80,
    dealValue: 350,
    stage: 'quote_sent',
    notes: 'Inquired via Bark for Birthday celebration on Sat 19th June 2027. Sent 3-Hour Birthday Package quote (£350) with recommended 7pm-10pm sweet spot.',
    addOns: ['rear_screen_custom'],
    commissionRate: 10,
    createdAt: '2026-08-19T10:15:00Z',
    lastContactDate: '2026-08-19T11:30:00Z'
  },
  {
    id: 'lead-2',
    clientName: 'Sarah & Mark',
    contactEmail: 'sarah.m.wedding@example.co.uk',
    contactPhone: '07891 234567',
    eventType: 'Wedding',
    eventDate: '2027-08-14',
    eventTime: '19:30 - 23:30',
    recommendedTiming: '7:30pm–11:30pm',
    venue: 'Peckforton Castle, Tarporley, Cheshire',
    source: 'Bridebook',
    packageId: 'birthday-3h',
    backdrop: 'ivory',
    guestCount: 120,
    dealValue: 465,
    stage: 'secured',
    notes: '3-Hour Birthday/Wedding package (£350) + Extra Hour (£75) + Luxury Memory Guestbook (£40). £100 deposit paid. Ivory curtain backdrop selected.',
    addOns: ['extra_hour', 'guestbook'],
    commissionRate: 12,
    createdAt: '2026-08-10T14:20:00Z',
    lastContactDate: '2026-08-15T09:00:00Z'
  },
  {
    id: 'lead-3',
    clientName: 'Aethel Technology Gala',
    contactEmail: 'events@aetheltech.co.uk',
    contactPhone: '0113 496 0888',
    eventType: 'Corporate Gala',
    eventDate: '2026-12-04',
    eventTime: '18:30 - 22:30',
    recommendedTiming: '6:30pm–10:30pm',
    venue: 'Royal Armouries, Leeds',
    source: 'Direct Website',
    packageId: 'corporate-custom',
    backdrop: 'burgundy',
    guestCount: 200,
    dealValue: 625,
    stage: 'negotiation',
    notes: 'Annual corporate celebration. Requires custom logo on print strips & custom company slideshow loop on rear screen. Holding date for invoice sign-off.',
    addOns: ['rear_screen_custom', 'neon_sign', 'extra_prints'],
    commissionRate: 15,
    createdAt: '2026-08-12T16:45:00Z',
    lastContactDate: '2026-08-18T16:00:00Z'
  },
  {
    id: 'lead-4',
    clientName: 'Victoria Hastings',
    contactEmail: 'victoria.h21@example.com',
    contactPhone: '07712 345678',
    eventType: '21st Birthday',
    eventDate: '2026-11-20',
    eventTime: '20:00 - 22:00',
    recommendedTiming: '8pm–10pm',
    venue: 'Revolucion de Cuba, Manchester',
    source: 'Instagram DM',
    packageId: 'digital-2h',
    backdrop: 'burgundy',
    guestCount: 50,
    dealValue: 250,
    stage: 'new',
    notes: 'Asked via Instagram about 2-hour photobooth hire for her 21st party. Wants burgundy backdrop and QR digital sharing.',
    addOns: [],
    commissionRate: 10,
    createdAt: '2026-08-19T14:00:00Z',
    lastContactDate: '2026-08-19T14:00:00Z'
  },
  {
    id: 'lead-5',
    clientName: 'David & Chloe',
    contactEmail: 'david.chloe.anniversary@example.com',
    contactPhone: '07900 888111',
    eventType: 'Silver Wedding Anniversary',
    eventDate: '2026-09-12',
    eventTime: '19:00 - 22:00',
    recommendedTiming: '7pm–10pm',
    venue: 'Harrogate Majestic Hotel, Harrogate',
    source: 'Referral',
    packageId: 'birthday-3h',
    backdrop: 'ivory',
    guestCount: 65,
    dealValue: 390,
    stage: 'completed',
    notes: '3-Hour Package (£350) + Guestbook (£40). Event completed smoothly! Client left 5-star review on Google.',
    addOns: ['guestbook'],
    commissionRate: 10,
    createdAt: '2026-07-01T11:00:00Z',
    lastContactDate: '2026-09-13T10:00:00Z'
  }
];

export const OUTREACH_TEMPLATES = [
  {
    id: 'bark-birthday',
    title: 'Bark Enquiry Response (Birthday / Private Party)',
    category: 'Bark Lead Reply',
    subject: 'SnapSuites Interactive Vintage Photobooth Quote for {CLIENT_NAME}',
    body: `Hi {CLIENT_NAME},

Thanks for getting in touch through Bark regarding your {EVENT_TYPE} on {EVENT_DATE}.

Our interactive vintage photobooth is a stylish, statement booth designed to be part of the evening rather than just a photo-taking station. It features a large screen on the back, which can be personalised to display photos or videos of the guest of honour throughout the event.

Guests can enjoy unlimited visits to the booth, with luxury props and a choice of burgundy or ivory curtain backdrop to suit the style of your celebration.

For your evening, we’d recommend {TIMING} as the sweet spot — giving everyone time to arrive and settle in, while capturing the fun, lively atmosphere once the celebrations are in full swing.

We have two main packages available:

2-Hour Digital Package – £250
• 2 hours of photobooth hire
• Unlimited visits to the booth
• Instant sharing via email, SMS or QR code
• Luxury props
• Choice of burgundy or ivory curtain backdrop

3-Hour Birthday Package – £350
• 3 hours of photobooth hire
• Unlimited visits to the booth
• Up to 6 prints per visit
• Instant digital sharing
• Luxury props
• Choice of burgundy or ivory curtain backdrop

If you have any questions or would like to go ahead, just let me know and we’d be happy to get your date secured.

Best wishes,
Luca
SnapSuites Luxury Photobooth Hire
www.snapsuites.co.uk | bookings@snapsuites.co.uk`
  },
  {
    id: 'bark-wedding',
    title: 'Bark Enquiry Response (Luxury Wedding)',
    category: 'Bark Lead Reply',
    subject: 'SnapSuites Interactive Vintage Photobooth for {CLIENT_NAME}\'s Wedding',
    body: `Hi {CLIENT_NAME},

Congratulations on your upcoming wedding! Thank you for reaching out regarding photobooth hire for {EVENT_DATE} at {VENUE}.

SnapSuites provides a truly statement vintage photobooth designed to elevate your reception aesthetic. Unlike basic pop-up booths, ours features a beautiful mahogany finish, brass details, and an interactive back screen that can play a romantic photo slideshow of your journey together during the night.

We recommend a 3-hour hire during your evening reception (typically {TIMING}) when your evening guests arrive and the dancefloor opens.

Our recommended Wedding & Celebration Package (£350):
• 3 hours of continuous photobooth hire
• Unlimited visits & up to 6 high-definition instant physical prints per visit
• Instant digital sharing via QR code, SMS & Email
• Premium curated prop collection (stylish & high-end)
• Luxury Burgundy Velvet or Ivory Satin curtain backdrop
• Full personalized rear screen photo/video compilation
• Online digital photo gallery access after the wedding

Optional Add-on:
• Hardcover Memory Guestbook & Metallic Pens (+£40) - where guests paste a print and leave warm wishes for your wedding book!

Would you like us to check exact availability and lock in your wedding date?

Warmest congratulations,
Luca & The SnapSuites Team
www.snapsuites.co.uk`
  },
  {
    id: 'venue-partnership',
    title: 'Venue / Event Coordinator Cold Pitch',
    category: 'Venue Outreach',
    subject: 'Recommended Photobooth Supplier Partnership - SnapSuites (North West & Yorkshire)',
    body: `Hi {COORDINATOR_NAME},

I hope you are having a fantastic week.

I’m reaching out from SnapSuites — we specialize in interactive vintage photobooth hire across North West and Yorkshire venues.

Unlike standard black box photo pods, our booth is styled as a luxury piece of furniture with rich mahogany, brass accents, and a customizable digital rear display screen (perfect for displaying couple photos or company branding).

We’d love to explore being added to your recommended supplier directory for {VENUE_NAME}. We offer venue partners:
1. Special exclusive rates/upgrades for your clients
2. Complimentary guestbook setup for venue-managed weddings
3. Clean, insured (PAT & Public Liability £5M) professional setup

I would love to send over our digital brochure or drop off sample print strips if you’re open to a quick 5-minute chat.

Best regards,
Luca
SnapSuites Photobooth Hire
www.snapsuites.co.uk`
  }
];

export const OBJECTION_HANDLING = [
  {
    objection: '"Why choose SnapSuites over a cheaper £150 selfie pod?"',
    talkingPoints: [
      '**Statement Furniture Design**: SnapSuites is an interactive vintage luxury booth (mahogany & brass trim) that acts as an eye-catching focal point at luxury venues, not a plastic tripod pod.',
      '**Dual Screen Experience**: Features a huge personalized interactive rear screen displaying guest of honour photos/videos all night long to entertain waiting guests.',
      '**High Quality Prints & Lighting**: Studio-grade lighting and instant thermal printing up to 6 prints per turn vs budget webcams.',
      '**Attendant Service**: Includes professional setup & friendly booth attendant so host doesn\'t worry about paper jams or tech issues.'
    ]
  },
  {
    objection: '"Is 2 hours or 3 hours better for our event?"',
    talkingPoints: [
      '**Sweet Spot Timing**: For evening celebrations starting at 7pm, 7pm–10pm (3 hours) is ideal because guests settle in during hour 1, and the booth peaks during hours 2 & 3 as drinks flow.',
      '**Digital vs Print**: If you want physical print souvenirs for guests to keep on their fridge (or stick in a guestbook), the 3-Hour £350 package offers maximum value with up to 6 prints per visit.'
    ]
  },
  {
    objection: '"Can we play custom videos or photo slideshows on the back screen?"',
    talkingPoints: [
      '**Yes! Fully Personalised**: You can send us up to 30 photos or short video clips of the birthday host, couple, or brand logo beforehand. We compile and load them so it continuously rotates in high definition behind the booth.'
    ]
  },
  {
    objection: '"What backdrops do you offer?"',
    talkingPoints: [
      '**Burgundy Velvet**: Warm, rich, vintage theatrical vibe. Stunning contrast for glam photo strips.',
      '**Ivory Elegance**: Timeless, bright, romantic satin curtain backdrop perfect for weddings & classic birthday themes.'
    ]
  }
];

export const COMPETITOR_BENCHMARK = [
  {
    feature: 'Aesthetic & Design',
    snapsuites: 'Luxury Mahogany & Brass Vintage Furniture',
    cheapPod: 'Plastic White Ringlight Tripod',
    magicMirror: 'Large Mirror Frame'
  },
  {
    feature: 'Interactive Rear Screen',
    snapsuites: '✅ YES (Displays guest photos/videos all night)',
    cheapPod: '❌ NO (Blank rear)',
    magicMirror: '❌ NO'
  },
  {
    feature: 'Print Quality & Copies',
    snapsuites: 'Dye-Sub Thermal (Up to 6 prints/turn)',
    cheapPod: 'Digital only or slow inkjet',
    magicMirror: 'Standard thermal'
  },
  {
    feature: 'Prop Collection',
    snapsuites: 'Curated Luxury Props (Gold, Velvet, Feather)',
    cheapPod: 'Basic paper props on sticks',
    magicMirror: 'Standard props'
  },
  {
    feature: 'Average Price',
    snapsuites: '£250 - £350 (Premium Value)',
    cheapPod: '£150 - £200 (Low quality)',
    magicMirror: '£350 - £450 (Clunky setup)'
  }
];

export const INITIAL_SOCIAL_POSTS = [];


