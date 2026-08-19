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

// Clean initial data - 0 fake items
export const INITIAL_PROSPECTS = [];
export const INITIAL_LEADS = [];
export const INITIAL_SOCIAL_POSTS = [];

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
Founder | SnapSuites
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
• Unlimited visits with high-quality instant physical prints
• Instant digital phone sharing via QR code, SMS & Email
• Choice of Burgundy Velvet or Ivory Elegance backdrop
• Curated luxury props & dedicated on-site attendant
• Optional Memory Guestbook & Metallic Pens (+£40)

Let me know if you would like me to lock in your date!

Warmest regards,
Founder | SnapSuites
www.snapsuites.co.uk | bookings@snapsuites.co.uk`
  },
  {
    id: 'venue-supplier-intro',
    title: 'Wedding Venue Supplier Introduction',
    category: 'Venue Outreach',
    subject: 'Supplier Introduction: SnapSuites Photo Booths x {VENUE_NAME}',
    body: `Hi {CONTACT_NAME},

I hope you're having a great week.

I’m reaching out from SnapSuites (https://www.snapsuites.co.uk/). We provide luxury, aesthetic photo booths across Cheshire and Greater Manchester—specialising in our {BOOTH_STYLE} which fits the aesthetic at {VENUE_NAME} perfectly.

We work regularly across the North West, carry full £5M Public Liability Insurance (PLI), and all equipment is fully PAT-tested to meet venue compliance standards.

As couples frequently ask venues for trusted supplier recommendations, could you let me know who manages your recommended vendor list or how we can get our brochure over to your events team?

Best regards,

Founder | SnapSuites
[Phone Number] | https://www.snapsuites.co.uk/`
  },
  {
    id: 'planner-collab-intro',
    title: 'Planner & DJ Collaboration / Preferred Supplier',
    category: 'Planner Outreach',
    subject: 'Preferred Supplier / Collaboration: SnapSuites x {COMPANY_NAME}',
    body: `Hi {CONTACT_NAME},

Hope your event season is going strong.

I’m contacting you from SnapSuites (https://www.snapsuites.co.uk/). We supply high-end photo booths (Vintage Booths, Roamer Booths, Magic Mirrors, and custom backdrops) for luxury weddings and private parties across the North West.

We know how crucial it is to have reliable, professional suppliers on site that make the overall event look incredible. We’d love to connect with {COMPANY_NAME} as a go-to photo booth partner for any upcoming events where your clients need premium photo entertainment.

If you have a moment, take a quick look at our setups on the site, and let me know if you’d like our trade pricing brochure sent over.

Best regards,

SnapSuites | [Phone Number] | https://www.snapsuites.co.uk/`
  }
];

export const COMPETITOR_BENCHMARK = [
  {
    feature: 'Physical Aesthetic',
    snapsuites: 'Luxury vintage handcrafted furniture',
    cheapPod: 'Basic metal iPad stand with plastic ring light',
    magicMirror: 'Large mirror frame'
  },
  {
    feature: 'Rear Screen Display',
    snapsuites: 'Interactive personalized photo/video reel all night',
    cheapPod: 'None (blank plastic casing)',
    magicMirror: 'None (back is cords & plywood)'
  },
  {
    feature: 'Prints Quality',
    snapsuites: 'Lab-grade sub-dye instant 6x4 prints (up to 6/visit)',
    cheapPod: 'Digital only (no physical prints)',
    magicMirror: 'Standard 1–2 prints'
  },
  {
    feature: 'Curated Props & Backdrops',
    snapsuites: 'Premium velvet curtains & stylish props',
    cheapPod: 'Tacky paper glasses / inflatable toys',
    magicMirror: 'Standard prop box'
  },
  {
    feature: 'Insurance & PAT Compliance',
    snapsuites: 'Full £5M PLI & PAT-tested for all luxury venues',
    cheapPod: 'Often uncertified amateur kit',
    magicMirror: 'Usually insured'
  }
];

export const OBJECTION_HANDLING = [
  {
    objection: '"Can you do it cheaper? Another supplier quoted £150."',
    talkingPoints: [
      '**Difference in equipment:** £150 booths are cheap iPad ring lights on a tripod with no physical prints, no attendant, and no custom backdrop.',
      '**Full luxury experience:** SnapSuites is a handcrafted furniture piece that enhances the venue decor and prints studio-grade 6x4 physical photos on the spot.',
      '**Dual-screen entertainment:** Our personalized rear screen entertains the entire room with guest-of-honour photos and videos all night.'
    ]
  },
  {
    objection: '"We only need it for 1 hour."',
    talkingPoints: [
      '**Guest pacing:** With 80–120 guests, 1 hour means only 20–25 people get through, leaving most guests disappointed.',
      '**Evening momentum:** 3 hours (7pm–10pm) allows guests to arrive, eat, relax, and visit multiple times as the party hits peak energy.',
      '**Setup included:** Our pricing includes full early setup, take-down, and a friendly on-site attendant.'
    ]
  },
  {
    objection: '"Is the rear screen personalized for free?"',
    talkingPoints: [
      '**100% complimentary:** We preload your photos, engagement memories, or logos to display on the back screen all evening.',
      '**Live slideshow:** Guests standing around the bar or dance floor can watch the reel even when not directly in the photo booth.'
    ]
  }
];
