export const BRAND = {
    name: "Aadiz Collection",
    legal: "Aadiz Collection (Pvt) Ltd.",
    tagline: "Handmade embroidery, reimagined by 300 women artisans.",
    phone: "+92 61 4544251",
    whatsapp: "923006386090",
    whatsappDisplay: "+92 300 6386090",
    email: "info@aadizcollection.com",
    web: "www.aadizcollection.com",
    facebook: "https://www.facebook.com/aadizcollection",
    instagram: "https://www.instagram.com/aadizcollectionofficial",
    offices: [
        {
            label: "Head office, Pakistan",
            company: "Aadiz Collection (Pvt) Ltd.",
            lines: ["1st Floor, 22-Industrial Estate", "Phase II, Multan, Pakistan"],
        },
        {
            label: "UAE office",
            company: "Aadiz Collection FZC",
            lines: ["Business Center, Sharjah Publishing City", "Free Zone, Sharjah, UAE"],
        },
    ],
};
export const NAV = [
    { href: "/collections", label: "Collections" },
    { href: "/craft", label: "Craft" },
    { href: "/global", label: "Global" },
    { href: "/about", label: "About" },
    { href: "/certifications", label: "Credentials" },
    { href: "/contact", label: "Contact" },
];
export const STATS = [
    { value: "2004", label: "Founded in Multan" },
    { value: "300+", label: "Women artisans" },
    { value: "20+", label: "Years of craft" },
    { value: "10+", label: "Countries exhibited in" },
];
export const CRAFTS = [
    "Tarkashi",
    "Mukesh (Kamdani)",
    "Gota work",
    "Cross stitch",
    "Running stitch",
    "Filling stitch",
    "Balochi embroidery",
    "Afghani embroidery",
    "Block printing",
    "Digital printing",
];
const p = (src, alt, caption) => ({
    src: `/images/${src}.jpg`,
    alt,
    caption,
});
export const COLLECTIONS = [
    {
        id: "bridal",
        title: "Bridal and formal",
        blurb: "Heavily embellished festive and wedding wear, finished by hand.",
        cover: "/images/formal-2.jpg",
        photos: [
            p("formal-1", "Rose-gold hand-embellished formal outfit with matching clutch"),
            p("formal-2", "Pastel green and gold embroidered bridal ensemble with a tasselled dupatta"),
            p("formal-3", "Plum formal outfit with floral organza dupatta"),
            p("formal-4", "Lime green festive outfit with a striped dupatta and cut-work hem"),
            p("formal-5", "Grey organza outfit with silver thread work and scalloped edges"),
            p("formal-6", "Blush pink formal outfit with embroidered sleeves and organza dupatta"),
            p("formal-7", "Peach and gold sequin formal ensemble"),
            p("formal-8", "Black and gold formal outfit with floral embroidery"),
        ],
    },
    {
        id: "casual",
        title: "Casual outfit range",
        blurb: "Everyday prints and embroidery under our Bano and Florals labels.",
        cover: "/images/casual-1.jpg",
        photos: [
            p("casual-1", "Three models in embroidered casual outfits", "Bano by Aadiz"),
            p("casual-2", "Two models in yellow and pink embroidered kurtas", "Bano by Aadiz"),
            p("casual-3", "Two models in black and pastel tiered outfits", "Florals by Aadiz"),
            p("casual-4", "Two models in colourful floral print outfits", "Florals by Aadiz"),
        ],
    },
    {
        id: "shoes",
        title: "Handmade shoes",
        blurb: "Embroidered, beaded and button-trimmed handmade slides.",
        cover: "/images/shoes-1.jpg",
        photos: [
            p("shoes-1", "Gold lace slides with stone detailing"),
            p("shoes-2", "Plum slides with pink and gold woven strap"),
            p("shoes-3", "Mustard slides with violet embroidery"),
            p("shoes-4", "Pink cut-work slides trimmed with colourful buttons"),
        ],
    },
    {
        id: "bags",
        title: "Handmade bags",
        blurb: "Tribal embroidery, beadwork and mirror-work clutches.",
        cover: "/images/bag-2.jpg",
        photos: [
            p("bag-1", "Multicolour embroidered handbag with beaded handles"),
            p("bag-2", "Peacock embroidered clutch with beaded strap"),
            p("bag-3", "Leather flap clutch with floral embroidery"),
            p("bag-4", "Gold mirror-work clutch with ruby centre stone"),
        ],
    },
    {
        id: "leather",
        title: "Leather bags",
        blurb: "Briefcases, totes, backpacks and everyday carry in real leather.",
        cover: "/images/leather-5.jpg",
        photos: [
            p("leather-1", "Black leather laptop bag with detachable strap"),
            p("leather-2", "Tan leather tote bag"),
            p("leather-3", "Red quilted leather belt bag"),
            p("leather-4", "Brown quilted leather shoulder bag"),
            p("leather-5", "Bronze leather briefcase"),
            p("leather-6", "Tan leather briefcase"),
            p("leather-7", "Dark brown leather backpack"),
            p("leather-8", "Tan leather multi-pocket backpack"),
        ],
    },
];
export const CRAFT_FEATURES = [
    {
        id: "mukesh",
        title: "Mukesh work",
        alt: "Kamdani",
        text: "Mukesh, also known as Kamdani, is used to highlight embroidery or add embellishment to formal fabric. A specially made metallic wire is worked into different patterns on the cloth. It is hugely popular across the sub-continent.",
        hero: p("mukesh-hand", "An artisan's hands working Mukesh wire onto fabric"),
        photos: [
            p("mukesh-1", "Pink floral Mukesh embroidery on navy fabric"),
            p("mukesh-2", "Silver Mukesh work on cream fabric"),
            p("mukesh-3", "Floral embroidery with beaded detail on organza"),
            p("mukesh-4", "Geometric hand embroidery on a neckline"),
            p("mukesh-5", "Dense red floral embroidery"),
            p("mukesh-6", "Orange and yellow florals over a scroll pattern"),
        ],
    },
    {
        id: "tarkashi",
        title: "Tarkashi",
        alt: "Thread weaving",
        text: "Tarkashi is one of the most popular handworks and demands precise expertise. The artisan builds the design directly on the fabric by weaving and threading with a needle.",
        hero: null,
        photos: [
            p("tarkashi-1", "Peach cut-work Tarkashi shawl"),
            p("tarkashi-2", "White floral Tarkashi on organza"),
            p("tarkashi-3", "Tarkashi border work on sheer fabric"),
            p("tarkashi-4", "Colourful embroidered garden border with trees and flowers"),
        ],
    },
];
export const EVENTS = [
    {
        country: "The Netherlands",
        items: [
            { title: "Amsterdam Textile Show, RAI Amsterdam", when: "Oct 2024, Sep–Oct 2025" },
            { title: "Sustainable Apparel and Textile Conference", when: "29–30 Apr 2025" },
        ],
    },
    {
        country: "United States",
        items: [
            { title: "California", when: "Oct–Nov 2025" },
            { title: "APPNA 48th Convention, Dallas", when: "Jul 2025" },
            { title: "Pakistan Lifestyle Exhibition, Dulles Expo Centre", when: "Jul 2024" },
            { title: "APPNA 47th Annual Convention", when: "Jul 2024" },
            { title: "APPNA Conventions", when: "2016–2019, 2022" },
            { title: "The Pakistan Show, Houston and Dallas/Frisco", when: "2016" },
        ],
    },
    {
        country: "Canada",
        items: [
            { title: "Grand Eid Bazaar 1 and 2, Mississauga", when: "2018" },
            { title: "Eid Exhibition, Brampton", when: "2018" },
            { title: "Halal Fest and Eid-ul-Adha Mela, Pickering", when: "2018" },
            { title: "Markham Eid Bazar, Mississauga", when: "2018" },
        ],
    },
    {
        country: "United Kingdom",
        items: [{ title: "UK-Pakistan Business Festival, Manchester", when: "Aug 2014" }],
    },
    {
        country: "India",
        items: [
            { title: "India International Trade Fair, Pragati Maidan", when: "2004–2017" },
            { title: "Chandigarh, Ludhiana, Amritsar, Jalandhar, Jaipur, Shimla and Patiala fairs", when: "2011–2017" },
        ],
    },
    {
        country: "Bangladesh",
        items: [
            { title: "South Asia Trade Fair (SAARC Bazaar)", when: "Sep 2025" },
            { title: "Made in Pakistan pavilions, Dhaka and Chittagong", when: "2009–2011" },
        ],
    },
    {
        country: "Nepal",
        items: [{ title: "Made in Pakistan Exhibition, Kathmandu", when: "2010, 2011, 2015" }],
    },
    {
        country: "Sri Lanka",
        items: [
            { title: "Pakistan Lifestyle Exhibition, BMICH Colombo", when: "Oct 2025" },
            { title: "Pakistan Single Country Exhibition, BMICH Colombo", when: "" },
        ],
    },
    {
        country: "South Africa",
        items: [
            { title: "The Royal Show, Pietermaritzburg", when: "2022" },
            { title: "Durban, Johannesburg, Cape Town and Pretoria shows", when: "2004" },
        ],
    },
    {
        country: "Mauritius",
        items: [{ title: "Pakistan Mauritius International Trade Fair", when: "Apr 2014" }],
    },
    {
        country: "United Arab Emirates",
        items: [{ title: "Dubai Shopping Festival, Global Village", when: "2004" }],
    },
];
export const EVENT_PHOTOS = [
    p("ev-amsterdam24", "At the Amsterdam Textile Show entrance", "Amsterdam Textile Show 2024"),
    p("ev-sustainable", "At the Sustainable Apparel and Textiles Conference", "Sustainable Apparel and Textiles Conference 2025"),
    p("ev-appna", "Aadiz stall at the APPNA convention", "APPNA Convention, USA 2025"),
    p("ev-paris", "At Foire de Paris", "Foire de Paris, France 2024"),
    p("ev-amsterdam25", "At the Amsterdam Textile Show", "Amsterdam Textile Show 2025"),
    p("ev-nagar", "Aadiz stall at California", "California, USA 2025"),
    p("ev-colombo", "At the Pakistan Lifestyle Expo in Colombo", "Pakistan Lifestyle Expo, Colombo"),
    p("ev-dhaka", "Aadiz stall at the South Asia Trade Fair", "South Asia Trade Fair, Dhaka"),
    p("ev-saarc", "Aadiz Collection stall at SAARC Bazaar", "SAARC Bazaar, Dhaka 2025"),
];
export const CERTS = [
    p("cert-pk-incorp", "SECP Certificate of Incorporation", "Certificate of Incorporation, SECP Pakistan"),
    p("cert-uae", "Sharjah Publishing City business licence", "Business licence, Sharjah Publishing City Free Zone"),
    p("cert-fpcci", "FPCCI membership certificate", "Membership, Federation of Pakistan Chambers of Commerce and Industry"),
    p("cert-multan", "Multan Chamber of Commerce membership certificate", "Membership, Multan Chamber of Commerce and Industry"),
    p("cert-pakistan-lifestyle", "Pakistan Lifestyle Exhibition certificate", "Pakistan Lifestyle Exhibition, USA"),
    p("cert-dhaka-2012", "Made in Pakistan Exhibition 2012 certificate", "Made in Pakistan Exhibition, Dhaka 2012"),
    p("cert-misc-1", "Made in Pakistan Exhibition 2012 certificate, Chandigarh", "Made in Pakistan Exhibition, Chandigarh 2012"),
    p("cert-misc-2", "Northern India International Trade Fair 2009 certificate", "Northern India International Trade Fair 2009"),
    p("cert-misc-3", "The Pakistan Show certificate, Amritsar", "The Pakistan Show, Amritsar 2014"),
    p("cert-misc-4", "Made in Pakistan Exhibition 2011 certificate, Dhaka", "Made in Pakistan Exhibition, Dhaka 2011"),
];
export const MESSAGES = {
    founder: {
        name: "Adeel Khan",
        role: "Founder",
        photo: "/images/founder.jpg",
        paragraphs: [
            "I founded Aadiz Collection as a sole proprietorship in 2004, and it is now a private limited company. My main objective in starting this platform was to promote the handmade products of our rural women artisans throughout the world. We create modern-era products from our artisans' basic expertise.",
            "I have attended and exhibited at hundreds of exhibitions and conferences in the US, Canada, India, South Africa, the UK and beyond.",
            "I am also a member of the fair and exhibition committee at the Multan Chamber of Commerce. On this platform I work especially for women's empowerment by promoting and reshaping their handmade products in the international market.",
        ],
    },
    ceo: {
        name: "Muhammad Adil Ameen",
        role: "CEO",
        photo: "/images/ceo.jpg",
        paragraphs: [
            "I have ten years of business management and international trade experience. Aadiz Collection is a renowned name for its diversity and unique concepts in clothing.",
            "We are enhancing a new era of design by combining the work of traditional artisans with modern machinery techniques. Empowering the rural women of Pakistan by promoting their artisan expertise is one of our main objectives.",
        ],
    },
};
