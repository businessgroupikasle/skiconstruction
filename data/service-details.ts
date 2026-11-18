import type { ServiceDetail, ServiceSlug } from "@/data/types";

/**
 * Detail-page content for every service.
 * Every service has rich, in-depth 4-6 line paragraphs for both overview sections,
 * tailored specifically to Coimbatore, Kinathukadavu, and civil engineering standards.
 */
export const serviceDetails: Record<ServiceSlug, ServiceDetail> = {
  "building-construction": {
    overview: [
      "SKI Construction delivers end-to-end residential and commercial turnkey building construction across Coimbatore, Kinathukadavu, and surrounding districts. From preliminary soil investigation and foundation setting to reinforced framework, masonry, advanced services integration, and premium interior-exterior finishes, our dedicated team coordinates every phase with engineering precision. We eliminate traditional contractor guesswork by operating with locked stage-wise schedules, approved architectural drawings, and a single engineering point of contact so your building is executed seamlessly on time and within budget.",
      "Every structural stage is executed in strict compliance with Bureau of Indian Standards (IS 456) and inspected personally by Er. D. Satheeshkumar, Registered LBS Engineer. Prior to casting slabs, column alignment, rebar spacing, and concrete cover are certified, followed by mandatory 7-day and 28-day concrete cube strength tests. Clients receive detailed weekly photo and video progress updates along with milestone logbooks, ensuring complete transparency, zero hidden charges, and enduring structural longevity for generations.",
    ],
    included: [
      "Site preparation, soil testing and setting out",
      "Reinforced concrete foundation, columns, beams and slabs (IS 456)",
      "High-grade brick or solid block masonry and plastering",
      "Concealed plumbing and electrical conduit coordination",
      "Vitrified tile flooring, waterproofing and premium paint finishes",
      "Final structural inspection, completion audit and handover documents",
    ],
    process: [
      { title: "Site Assessment & Soil Test", description: "We review the site, soil bearing capacity and drawings before breaking ground." },
      { title: "Structural Framework", description: "Foundation, column reinforcement and slabs are cast to approved IS designs." },
      { title: "Masonry & Services", description: "Walls, plumbing routes and electrical conduits are installed and certified." },
      { title: "Finishing & Handover", description: "Finishes are completed, pressure-tested and handed over with documentation." },
    ],
    audience: [
      "Homeowners building a custom new house in Coimbatore",
      "Families extending or rebuilding an ancestral property",
      "Businesses constructing modern commercial premises or showrooms",
    ],
    faqs: [
      {
        question: "Can you handle the whole build, or only selected stages?",
        answer: "We specialize in complete turnkey construction from foundation to key handover, but can also coordinate selected structural or finishing stages. Every scope is agreed upon in writing before work begins.",
      },
      {
        question: "How are costs and payments tracked during construction?",
        answer: "Estimates are broken down into clear, physical construction milestones via a stage-wise BOQ. Payments are released strictly after you inspect and verify each completed stage.",
      },
      {
        question: "Who supervises the daily work on the construction site?",
        answer: "All structural work is directly supervised on site by Er. D. Satheeshkumar, Registered LBS Engineer, ensuring zero subcontracting dilution and strict compliance with approved drawings.",
      },
    ],
  },

  "3d-elevation-design": {
    overview: [
      "Our photorealistic 3D elevation design service brings your architectural vision to life before ground is broken on site. Using advanced 3D BIM tools and architectural rendering technology, we create precision exterior views that detail the facade layout, balcony railings, window and door proportions, roof profiles, and realistic lighting simulations in daylight and evening settings. Visualizing your home in three dimensions allows you to explore multiple colour schemes, modern wall textures, timber claddings, and stone finishes on screen rather than making expensive structural alterations during on-site construction.",
      "All 3D elevations are developed by experienced architects in coordination with registered structural engineers to ensure every design element is structurally viable and fully compliant with Coimbatore municipal setback rules. Revisions and material variations are refined collaboratively in the design file until your family is 100% satisfied. Once approved, the finalized 3D elevation serves as the direct visual blueprint for municipal approval submissions, contractor execution drawings, and accurate stage-wise material budgeting.",
    ],
    included: [
      "Front, side and panoramic 3D elevation views",
      "Photorealistic daylight and evening architectural lighting renders",
      "Curated exterior material, paint palette and cladding options",
      "Balcony railings, parapet walls, compound gates and pergola detailing",
      "Collaborative revision rounds before on-site construction begins",
      "High-resolution presentation files and approval-ready elevations",
    ],
    process: [
      { title: "Brief & Plot References", description: "We review your plot dimensions, floor plans, and architectural preferences." },
      { title: "Concept 3D Modeling", description: "First realistic 3D elevation views are drafted for your detailed review." },
      { title: "Revisions & Materials", description: "Changes to facade styling, textures, lighting and colours are updated on model." },
      { title: "Final Blueprint Delivery", description: "Agreed high-res renders and dimensioned elevations are delivered for execution." },
    ],
    audience: [
      "Homeowners planning a new residential house or villa",
      "Property owners renovating or modernizing an existing building facade",
      "Builders and developers who need client-ready marketing visuals",
    ],
    faqs: [
      {
        question: "Is the 3D elevation the same as the structural construction drawing?",
        answer: "No. The 3D elevation visualizes the exterior aesthetics, materials, and architectural proportions. Working structural and approval drawings are separate technical documents that we coordinate to match the 3D design perfectly.",
      },
      {
        question: "How many design revisions are included?",
        answer: "We provide collaborative revision rounds to fine-tune colours, textures, and facade elements until you are fully satisfied, agreed upon upfront in your project scope.",
      },
      {
        question: "Can the 3D elevation be modeled to reflect my exact plot surroundings?",
        answer: "Yes. By incorporating your plot boundary dimensions, road width, and neighboring orientations, we position the 3D model accurately within its real-world Coimbatore setting.",
      },
    ],
  },

  "construction-consulting": {
    overview: [
      "SKI Construction provides independent, technical civil engineering consulting for property owners, families, and businesses across Coimbatore and Kinathukadavu. Whether you are building your first independent home, undertaking a major commercial expansion, or navigating complex plot challenges, our consulting practice gives you objective, expert guidance before you commit substantial capital. We conduct thorough site reviews, evaluate soil bearing capacity reports, review structural drawings, and audit contractor quotes to protect you against inflated pricing, substandard material specifications, and structural deficiencies.",
      "Our consulting support extends across every critical milestone of the construction lifecycle. We help you draft comprehensive scopes of work for subcontractors, compare raw material quality, inspect reinforcement steel and concrete pours on site, and verify milestone completion before payments are released. By having a Registered LBS Engineer as your dedicated technical advisor, you gain absolute peace of mind, verified building compliance with local bylaws, and substantial cost savings throughout the duration of your build.",
    ],
    included: [
      "Independent plan and structural drawing evaluation",
      "Comprehensive contractor quote comparison and scope definition",
      "Material quality testing and specification benchmarking",
      "Stage-wise on-site engineering inspections and quality audits",
      "Sequence planning, timeline scheduling and cost-control advice",
      "Written advisory reports with prioritized technical recommendations",
    ],
    process: [
      { title: "Project Brief & Review", description: "We examine your floor plans, budget parameters, and site conditions." },
      { title: "Technical Audit", description: "We analyze structural sizing, material specifications, and contractor quotes." },
      { title: "Actionable Guidance", description: "You receive a clear written report outlining risks, options, and cost savings." },
      { title: "On-Site Milestone Audits", description: "We visit the site during key concrete casting stages to verify execution." },
    ],
    audience: [
      "Homeowners managing their own contractors who need professional oversight",
      "Property buyers evaluating building plans and estimates before purchase",
      "Anyone seeking an authoritative second opinion from a Registered LBS Engineer",
    ],
    faqs: [
      {
        question: "Do I have to hire SKI Construction to build if I take consulting?",
        answer: "No. Our consulting service is completely independent. You are free to engage any contractor of your choice; our role is strictly to safeguard your engineering quality and budget.",
      },
      {
        question: "Can you review an existing contractor's quote or estimate?",
        answer: "Yes. We conduct line-by-line audits of contractor BOQs, identifying hidden charges, missing structural items, or inflated material rates before you sign contracts.",
      },
      {
        question: "What deliverables do I receive from a consulting engagement?",
        answer: "You receive a written engineering evaluation report, technical checklists for your contractor, and stage-wise inspection certificates for completed site milestones.",
      },
    ],
  },

  "bank-loan-estimate": {
    overview: [
      "Securing construction finance requires bank-compliant documentation that accurately reflects your architectural plan, structural specifications, and realistic market rates. SKI Construction prepares professional, itemized civil engineering estimates and stage-wise Bill of Quantities (BOQ) tailored specifically to the loan guidelines of nationalized, private, and housing finance institutions across Tamil Nadu. We translate your architectural floor plans and elevation drawings into an authoritative financial dossier that loan appraisal officers and panel valuers can verify without ambiguity or delay.",
      "Our estimates break down the entire construction lifecycle into recognized lending milestones, including foundation, basement plinth, ground-floor slab, brickwork, plastering, and final handover finishes. Each stage features itemized quantities, verified material grades, and current local labor schedules to ensure adequate sanction amounts. When architectural modifications or budget adjustments occur during project development, our team promptly updates and re-certifies the estimate, ensuring smooth fund disbursements as construction advances.",
    ],
    included: [
      "Itemized civil engineering construction estimate",
      "Stage-wise Bill of Quantities (BOQ) in standard bank formats",
      "Accurate material quantity takeoffs and current market rate schedules",
      "Valuation documentation coordinated for panel engineers",
      "Comprehensive checklist of bank-required technical paperwork",
      "Prompt revisions and updates if design or loan requirements change",
    ],
    process: [
      { title: "Submit Approved Plans", description: "Provide your proposed or approved floor plans and target specifications." },
      { title: "Quantity Survey & Pricing", description: "Structural quantities are calculated and priced stage-by-stage." },
      { title: "Client Review & Fine-Tuning", description: "We review the estimate together and align assumptions with your loan goal." },
      { title: "Final Dossier Delivery", description: "You receive the certified estimation ready for submission to your lender." },
    ],
    audience: [
      "First-time home builders applying for residential housing loans",
      "Property owners seeking home extension or renovation finance",
      "Anyone needing an accurate, third-party verified construction budget",
    ],
    faqs: [
      {
        question: "Are your estimates accepted by leading banks and housing finance companies?",
        answer: "Yes. We format estimates strictly according to the valuation norms required by SBI, HDFC, Canara Bank, and major financial institutions across Coimbatore.",
      },
      {
        question: "How accurate is the construction loan estimate?",
        answer: "Our estimates are based on detailed structural takeoffs, verified specification schedules, and prevailing regional material costs, ensuring realistic loan sanction values.",
      },
      {
        question: "Can the estimate be revised if our floor plan or finishes change?",
        answer: "Yes. If your architectural drawings or specifications are modified, we quickly update the stage-wise BOQ and re-issue the certified estimate.",
      },
    ],
  },

  "lbs-plan-approval": {
    overview: [
      "Building plan approval under the Local Body Surveyor (LBS) framework is a mandatory legal prerequisite for residential and commercial construction within Coimbatore Municipal Corporation and surrounding town panchayats. Led by Er. D. Satheeshkumar, an authorized Registered LBS Engineer, SKI Construction manages the complete plan drafting, documentation assembly, and regulatory filing process. We ensure that every architectural drawing adheres strictly to the Tamil Nadu Combined Development and Building Rules (TNCDBR), including mandatory setback distances, floor space index (FSI), parking requirements, and ventilation guidelines.",
      "Our direct LBS registration eliminates third-party intermediaries, expediting scrutiny and municipal clearance without unnecessary delays. We conduct preliminary site visits to verify boundary dimensions against patta and land documents, draft detailed submission drawings, coordinate online portal filings, and respond technically to municipal verification queries. From initial plan formulation to receiving the official building license and sanctioned blue print, we provide transparent updates, ensuring your construction commences on firm legal grounds.",
    ],
    included: [
      "Preliminary site visit and boundary dimension verification",
      "Preparation of statutory architectural submission drawings",
      "Direct certification by authorized Registered LBS Engineer",
      "Complete checklist of title deeds, patta, and supporting affidavits",
      "End-to-end municipal portal submission and liaison support",
      "Technical representation and prompt responses to municipal queries",
    ],
    process: [
      { title: "Site & Document Audit", description: "We review your patta, title documents, and proposed building requirements." },
      { title: "Statutory Plan Drafting", description: "Blueprints are drafted strictly to TNCDBR municipal bylaws and FSI rules." },
      { title: "Registered LBS Review", description: "Drawings are certified and signed by our Registered LBS Engineer." },
      { title: "Submission & Sanction", description: "The file is submitted online and followed through to official permit issue." },
    ],
    audience: [
      "Homeowners submitting building plans for new residential houses",
      "Commercial developers requiring municipal building licenses",
      "Property owners regularizing or revising previously approved drawings",
    ],
    faqs: [
      {
        question: "What is an LBS Engineer and why is their signature required?",
        answer: "A Licensed Building Surveyor (LBS) is a municipal-certified civil engineer authorized to prepare and sign building plans, ensuring legal compliance with Tamil Nadu building bylaws.",
      },
      {
        question: "What key documents are required for LBS plan approval in Coimbatore?",
        answer: "Key documents include parent sale deeds, revenue patta, encumbrance certificate (EC), property tax receipts, proposed architectural drawings, and site boundary sketches.",
      },
      {
        question: "How long does it take to secure the municipal building permit?",
        answer: "Timelines depend on the local municipal body, but having complete, bylaw-compliant drawings drafted by our in-house LBS engineer prevents rejections and expedites approval.",
      },
    ],
  },

  "dtcp-lpa-approval": {
    overview: [
      "Securing statutory approvals from the Directorate of Town and Country Planning (DTCP) and Local Planning Authorities (LPA) is essential for developing residential layouts, commercial complexes, and industrial buildings across Coimbatore district. Given the complexity of zoning regulations, master plan land-use classifications, and road width requirements, navigating this process requires thorough technical expertise. SKI Construction conducts comprehensive feasibility checks to determine the exact approval route, documents needed, and municipal clearances applicable to your site.",
      "We prepare all required technical drawings, including layout master plans, contour surveys, internal road cross-sections, open space reservation (OSR) demarcations, and public infrastructure alignments. Our team coordinates directly with relevant planning offices, preparing prompt technical responses to official queries and updating CAD drawings to satisfy departmental scrutiny. By ensuring 100% adherence to Tamil Nadu planning norms, we help property owners and layout promoters secure lawful, clear-title sanctions with zero regulatory risks.",
    ],
    included: [
      "Master plan land-use and zoning classification confirmation",
      "DTCP / LPA requirement checklist tailored to your site location",
      "Preparation of layout master plans, OSR reservations and road drawings",
      "Assembling application dossiers with revenue and survey records",
      "Departmental follow-up and tracking through official portals",
      "Technical assistance for revisions and site inspection queries",
    ],
    process: [
      { title: "Zoning & Feasibility Check", description: "We determine master plan land use, road access, and approval eligibility." },
      { title: "Document & Drawing Prep", description: "Complete technical layouts, contour sketches and revenue files are prepared." },
      { title: "Application Submission", description: "The application is lodged with DTCP/LPA with all statutory affidavits." },
      { title: "Query Response & Sanction", description: "We resolve departmental queries and track the file to official order sanction." },
    ],
    audience: [
      "Land promoters and developers developing new residential layouts",
      "Commercial and industrial builders requiring regional planning clearances",
      "Plot owners regularizing unapproved plots under government schemes",
    ],
    faqs: [
      {
        question: "When is DTCP or LPA approval required instead of local panchayat approval?",
        answer: "Any plot development, large commercial building, or layout subdivision outside municipal corporation limits requires formal DTCP or LPA sanction under Tamil Nadu town planning laws.",
      },
      {
        question: "Can SKI Construction assist if our application receives technical queries?",
        answer: "Yes. We specialize in drafting compliant revised drawings, responding to technical objections, and liaising with authorities to resolve queries promptly.",
      },
      {
        question: "Do you verify land documents before preparing DTCP applications?",
        answer: "Yes. We examine patta, FMB sketches, and title flow to ensure the physical plot matches official revenue records before submission.",
      },
    ],
  },

  "vastu-plan": {
    overview: [
      "A Vastu-compliant architectural plan harmonizes traditional Indian spatial principles with contemporary design aesthetics, structural functionality, and modern lifestyle needs. At SKI Construction, we believe that true Vastu planning should enhance the flow of natural energy without compromising on daylight, cross-ventilation, circulation efficiency, or modern interior aesthetics. We analyze your plot's cardinal orientation, road frontage, and surroundings to position room layouts, master bedrooms, kitchens, staircases, and main entrance doors in favorable geographical quadrants.",
      "Our civil engineering background ensures that every Vastu recommendation is structurally sound, cost-effective, and fully buildable under Coimbatore building bylaws. We provide alternative layout options with transparent notes explaining the principles behind each room placement, allowing your family to make informed choices that fit your lifestyle and personal beliefs. The finalized Vastu floor plan integrates seamlessly into the working architectural drawings, forming the trusted blueprint for a prosperous, harmonious home.",
    ],
    included: [
      "Plot cardinal direction analysis and geographical compass orientation",
      "Strategic main door (Simha Dwaram) and entrance positioning",
      "Kitchen (Agni corner) and master bedroom (Kuber/Nirruthi) alignment",
      "Puja room, staircase, and water sump/borewell quadrant verification",
      "Optimization for natural sunlight, cross-ventilation, and air circulation",
      "Alternative floor plan options with clear Vastu trade-off explanations",
    ],
    process: [
      { title: "Directional Plot Survey", description: "We map the exact compass orientation, road access, and plot boundaries." },
      { title: "Family Needs Assessment", description: "We discuss your family lifestyle, spatial requirements, and Vastu priorities." },
      { title: "Vastu Layout Options", description: "We present architectural floor plans harmonizing Vastu rules with aesthetics." },
      { title: "Engineering Blueprint", description: "Selected plan is refined into working civil and structural drawings." },
    ],
    audience: [
      "Families planning a new home who value positive architectural energy",
      "Homeowners remodeling an existing floor plan for better spatial balance",
      "Anyone seeking practical, scientifically grounded Vastu architectural advice",
    ],
    faqs: [
      {
        question: "Does following Vastu principles compromise modern home aesthetics?",
        answer: "Not with our engineering approach. We integrate Vastu principles naturally with modern open-plan layouts, ensuring abundant sunlight, airflow, and contemporary beauty.",
      },
      {
        question: "Can a Vastu consultation be conducted for an already existing house?",
        answer: "Yes. We can assess existing structures and recommend practical, non-destructive modifications or spatial adjustments to improve natural harmony.",
      },
      {
        question: "Will the Vastu layout also serve as the municipal approval plan?",
        answer: "Yes. Because our plans are drafted by civil engineers, the Vastu layout directly conforms to municipal setback and FSI rules, ready for building permit filing.",
      },
    ],
  },

  "real-estate": {
    overview: [
      "SKI Construction provides trusted, local real estate guidance for property buyers, families, and investors seeking clear-title residential plots, agricultural lands, and development properties in Kinathukadavu, Coimbatore, and Pollachi. Navigating regional real estate requires more than simple market listings; it demands grounded technical insight into soil conditions, accessibility, groundwater viability, and future infrastructure growth. We evaluate every parcel of land with a builder's eye, helping you understand whether a plot suits your intended construction and budget before you commit.",
      "We assist you with comprehensive site verifications, verifying road widths, approach access, guideline values, and zoning permissions under local development plans. Our civil engineering team assesses site topography and drainage characteristics, explaining the practical foundation costs and structural considerations associated with the location. From initial plot scouting to coordinating document reviews with legal advocates, we provide honest, transparent guidance that protects your investment and paves the way for seamless future construction.",
    ],
    included: [
      "Local market intelligence across Kinathukadavu and Coimbatore districts",
      "Physical site inspections assessing topography, soil, and road access",
      "Comprehensive checklist of points to verify before making property offers",
      "Technical evaluation of plot constructability and foundation cost implications",
      "Verification of DTCP / LPA layout approvals and legal revenue records",
      "End-to-end guidance from initial enquiry to registered property acquisition",
    ],
    process: [
      { title: "Define Requirements", description: "Share your target location, budget parameters, and intended property use." },
      { title: "Technical Site Visit", description: "We inspect plots assessing topography, road widths, and surroundings." },
      { title: "Due Diligence Checklist", description: "We walk you through revenue records, guideline values, and approval status." },
      { title: "Seamless Next Steps", description: "We connect your land purchase directly to architectural planning and building." },
    ],
    audience: [
      "Families seeking residential plots to build their custom dream home",
      "Investors comparing commercial land parcels along major growth corridors",
      "Property owners deciding whether buying, building, or renovating is best",
    ],
    faqs: [
      {
        question: "Can SKI Construction inspect a plot before I sign an agreement of sale?",
        answer: "Yes. We conduct on-site engineering assessments to check approach roads, drainage, soil type, and statutory zoning before you commit financial deposits.",
      },
      {
        question: "Do you provide legal title verification?",
        answer: "We provide comprehensive technical, physical, and planning verification. For legal title search and documentation, we coordinate with experienced property advocates.",
      },
      {
        question: "How do you evaluate whether a plot is suitable for construction?",
        answer: "We assess soil bearing capacity, flood risks, setback feasibility, local authority bylaws, and estimated earthwork costs to confirm overall buildability.",
      },
    ],
  },

  "property-buying-selling": {
    overview: [
      "Buying or selling real estate is a significant financial transaction that requires complete transparency, legal diligence, and organized coordination. SKI Construction bridges the gap between genuine property owners and qualified buyers across the Kinathukadavu and Coimbatore regions. We facilitate direct, ethical property transactions for residential houses, commercial buildings, and sanctioned plots, ensuring that fair market valuations, physical property conditions, and clear-title documentation are presented openly to all parties.",
      "Our structured advisory service covers the entire transaction workflow. We assist in assembling essential documentation—including parent deeds, encumbrance certificates (EC), patta transfers, approved building plans, and tax receipts—and facilitate title checks through qualified advocates. We provide honest condition assessments of existing buildings, estimate potential renovation or remodeling costs, and coordinate stage-wise next steps through to registration and physical property handover, ensuring a secure and hassle-free transaction.",
    ],
    included: [
      "Thorough document checklist for both property buyers and sellers",
      "Transparent property condition and structural integrity assessments",
      "Realistic market valuation based on regional engineering standards",
      "Coordination of parent title deeds, EC, and revenue patta records",
      "Facilitation of legal title audits with qualified property advocates",
      "End-to-end transaction assistance through to official registrar handover",
    ],
    process: [
      { title: "Understand Transaction Goal", description: "We note whether you are buying or selling, your timeline, and financial goals." },
      { title: "Documentation Gathering", description: "We compile all required parent deeds, revenue patta, EC, and approval plans." },
      { title: "Valuation & Coordination", description: "We evaluate structural condition, market rates, and coordinate between parties." },
      { title: "Closing & Handover", description: "We assist through registration verification and complete physical handover." },
    ],
    audience: [
      "First-time homebuyers purchasing an existing house or apartment",
      "Property owners looking to sell residential land or commercial premises",
      "Families organizing generational property transfers and valuations",
    ],
    faqs: [
      {
        question: "Do you handle the official legal registration process?",
        answer: "Legal deed drafting and registration are executed by certified advocates and the Sub-Registrar Office. We assemble the complete technical documentation and guide every step.",
      },
      {
        question: "How do you assist with property pricing and valuation?",
        answer: "We provide realistic valuations based on structural quality, age of the building, prevailing land guideline rates, and recent comparable transactions in the area.",
      },
      {
        question: "Can you inspect the structural condition of a house I want to buy?",
        answer: "Yes. Our civil engineering team can inspect foundations, walls, waterproofing, plumbing, and electrical installations to identify potential repair costs before you purchase.",
      },
    ],
  },
};

export function getServiceDetail(slug: ServiceSlug): ServiceDetail {
  return serviceDetails[slug];
}
