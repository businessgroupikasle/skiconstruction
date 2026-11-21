import type { ServiceDetail, ServiceSlug } from "@/data/types";

/**
 * Detail-page SEO content for every one of SKI Construction's 8 verified services.
 * Structured with technical accuracy, civil engineering rigor, and local relevance
 * to Coimbatore and Kinathukadavu.
 */
export const serviceDetails: Record<ServiceSlug, ServiceDetail> = {
  "building-construction": {
    overview: [
      "SKI Construction provides end-to-end residential and commercial turnkey building construction across Kinathukadavu, Coimbatore, and surrounding regions. From initial site clearance, soil bearing capacity evaluation, and foundation excavation to reinforced concrete framework, precision masonry, plumbing-electrical services integration, and turnkey handover, every stage is executed under certified engineering supervision. We replace contractor uncertainty with locked milestone schedules, approved working drawings, and single-point engineering responsibility.",
      "All structural execution strictly complies with the Bureau of Indian Standards (IS 456 for reinforced concrete design and IS 1893 for earthquake-resistant detailing) and is personally supervised on site by Er. D. Satheeshkumar, Registered LBS Engineer. Prior to casting concrete slabs, rebar spacing, column ties, and cover blocks are verified, followed by standardized water curing protocols and concrete compressive strength tests. Homeowners receive transparent weekly milestone reports, ensuring lasting structural integrity, zero hidden costs, and enduring quality.",
    ],
    included: [
      "Site clearing, soil evaluation, and precision center-line setting out",
      "Reinforced concrete footings, plinth beams, columns, and roof slabs (IS 456)",
      "First-class country brickwork or premium solid cement block masonry",
      "Concealed electrical conduit and plumbing piping coordination",
      "Vitrified floor tiling, weather-proof exterior painting, and premium finishes",
      "Final structural inspection, service testing, and complete handover documentation",
    ],
    process: [
      {
        title: "Site Assessment & Soil Survey",
        description: "We examine plot dimensions, soil bearing capacity, and structural drawings before breaking ground.",
      },
      {
        title: "Foundation & RCC Framework",
        description: "Excavation, footings, plinth beams, columns, and slabs are cast strictly to approved structural engineering designs.",
      },
      {
        title: "Masonry & Concealed Services",
        description: "Brick walls, door/window frames, plumbing routes, and electrical conduit lines are embedded and pressure-tested.",
      },
      {
        title: "Plastering & Curing Cycles",
        description: "Interior and exterior surfaces are plastered with certified sand and water-cured to achieve maximum strength.",
      },
      {
        title: "Turnkey Finishing & Handover",
        description: "Flooring, painting, sanitary fittings, and electrical switchgear are installed, inspected, and handed over.",
      },
    ],
    audience: [
      "Families planning a new custom individual house or duplex villa in Coimbatore",
      "Property owners reconstructing or expanding an existing residential home",
      "Businesses constructing modern commercial complexes, offices, or retail showrooms",
      "Landowners looking for a dependable turnkey builder with registered engineering credentials",
    ],
    faqs: [
      {
        question: "Can SKI Construction handle the entire construction on a turnkey contract?",
        answer: "Yes. We specialize in complete turnkey construction from foundation excavation to final painting and key handover, working under a clear written agreement with stage-wise milestone schedules.",
      },
      {
        question: "How are construction stages and payments structured?",
        answer: "Payments are tied strictly to physical on-site milestones (such as foundation completion, plinth beam, roof slab casting, masonry, and finishing). You release funds only after verifying each completed stage.",
      },
      {
        question: "Who inspects and supervises the construction work on site?",
        answer: "All structural and civil works are directly supervised on site by Er. D. Satheeshkumar (DCE, BE), Registered LBS Engineer, ensuring zero subcontracting dilution and strict compliance with approved drawings.",
      },
      {
        question: "What building materials and standards do you use?",
        answer: "We specify branded 53-grade cement, corrosion-resistant Fe-500D or Fe-550 TMT steel bars, river sand or verified M-sand, first-grade bricks, and lead-free plumbing pipes conforming to Bureau of Indian Standards (IS 456).",
      },
      {
        question: "How long does it take to construct an independent house in Coimbatore?",
        answer: "A standard 1,500 to 2,500 sq.ft residential house typically takes between 6 to 9 months, depending on architectural complexity, weather conditions, and timely stage approvals.",
      },
    ],
  },

  "construction-consulting": {
    overview: [
      "SKI Construction offers independent, technical civil engineering consulting for property owners, families, and commercial developers in Kinathukadavu and Coimbatore. Building a home or commercial property represents a major life investment; having an experienced Registered LBS Engineer by your side ensures that design choices are structurally safe, material quantities are accurate, and contractor agreements are fair and binding.",
      "Our consulting practice provides impartial scrutiny across the entire project lifecycle. We evaluate soil test reports, examine architectural and structural drawings for efficiency, audit contractor quotes and Bill of Quantities (BOQs) to eliminate inflated rates, and conduct milestone quality inspections during crucial construction stages such as footing casting and roof slab shuttering. With SKI Construction as your consulting advisor, you maintain complete quality control and financial transparency throughout your project.",
    ],
    included: [
      "Independent technical review of architectural and structural CAD drawings",
      "Contractor quote and itemized BOQ rate comparison to identify hidden costs",
      "Material quality testing benchmarks (cement, TMT steel, concrete mix, sand)",
      "Stage-wise on-site engineering inspections during reinforcement and slab casting",
      "Guidance on building bylaws, setback compliance, and municipal regularizations",
      "Written engineering evaluation reports with prioritized technical recommendations",
    ],
    process: [
      {
        title: "Initial Requirement Consultation",
        description: "We review your proposed floor plans, plot constraints, target budget, and specific consultation goals.",
      },
      {
        title: "Technical Document Audit",
        description: "We analyze structural sizing, reinforcement schedules, soil reports, and contractor proposals in detail.",
      },
      {
        title: "Written Advisory Report",
        description: "You receive a clear engineering report highlighting cost-saving opportunities, structural risks, and contract terms.",
      },
      {
        title: "Stage-Wise On-Site Audits",
        description: "Our engineer conducts physical site inspections before major concrete pours to verify steel spacing and cover.",
      },
      {
        title: "Milestone Clearance Certification",
        description: "We verify contractor work completion before you release stage-wise payments, preventing overbilling.",
      },
    ],
    audience: [
      "Homeowners managing their own building contractors who require independent engineering supervision",
      "Property buyers evaluating building plans, structural integrity, and estimates before finalizing contracts",
      "Commercial developers seeking expert second opinions from an authorized Registered LBS Engineer",
      "Families planning major home renovations, floor additions, or structural retrofitting",
    ],
    faqs: [
      {
        question: "Do I need to hire SKI Construction for building if I use your consulting service?",
        answer: "No. Our consulting service is 100% independent. You are free to engage any contractor of your choice; our role is strictly to represent your interests, verify structural safety, and protect your budget.",
      },
      {
        question: "Can you review and verify an existing contractor's quotation?",
        answer: "Yes. We perform detailed line-by-line BOQ audits, identifying missing structural scope, inflated material rates, and vague contract terms before you sign agreements.",
      },
      {
        question: "When should I engage a construction consultant?",
        answer: "The ideal time is before finalizing architectural plans and signing contractor agreements. However, you can also engage us at any critical milestone, such as prior to slab casting or during structural dispute resolution.",
      },
      {
        question: "What deliverables do I receive from your consulting service?",
        answer: "You receive written technical review reports, standardized checklists for contractor quality control, and on-site inspection certificates verifying work done according to code.",
      },
    ],
  },

  "lbs-plan-approval": {
    overview: [
      "Building plan approval under the Local Body Surveyor (LBS) framework is a mandatory legal prerequisite for residential and commercial construction within town panchayats and municipal corporations across Coimbatore district. Led by Er. D. Satheeshkumar, an authorized Registered LBS Engineer (DCE, BE), SKI Construction manages the complete plan drafting, documentation assembly, and regulatory filing process. We ensure that every architectural drawing complies strictly with the Tamil Nadu Combined Development and Building Rules (TNCDBR).",
      "Our direct LBS registration eliminates third-party intermediaries, expediting scrutiny and municipal clearance without unnecessary delays. We conduct on-site boundary surveys to verify physical dimensions against revenue patta records, draft detailed submission blueprints with required setback, FSI, and parking calculations, coordinate online portal filings, and respond technically to municipal verification queries. From initial plan formulation to receiving the official building permit and sanctioned blueprint, we provide clear, reliable guidance.",
    ],
    included: [
      "Preliminary site visit and physical boundary dimension verification against patta",
      "Preparation of statutory architectural submission blueprints conforming to TNCDBR",
      "Direct certification and signature by authorized Registered LBS Engineer",
      "Assembly and verification of title deeds, revenue patta, EC, and affidavits",
      "Online portal upload and liaison support across local municipal bodies",
      "Technical responses to municipal scrutiny queries and revision drawings",
    ],
    process: [
      {
        title: "Site & Document Verification",
        description: "We review your revenue patta, FMB sketch, parent deeds, and proposed building requirements.",
      },
      {
        title: "Statutory Plan Drafting",
        description: "CAD blueprints are drafted strictly adhering to TNCDBR municipal bylaws, setback distances, and FSI limits.",
      },
      {
        title: "Registered LBS Certification",
        description: "Drawings, calculation sheets, and structural stability certifications are verified and signed by our LBS Engineer.",
      },
      {
        title: "Municipal Portal Submission",
        description: "The complete file is submitted through official government portals with all statutory affidavits and fee challans.",
      },
      {
        title: "Follow-Up & Permit Sanction",
        description: "We coordinate with local planning authorities, answer departmental queries, and secure the official sanctioned plan.",
      },
    ],
    audience: [
      "Homeowners planning new residential construction requiring municipal building licenses",
      "Commercial property owners and showroom builders needing town panchayat clearances",
      "Developers constructing multi-unit residential or layout buildings in Coimbatore",
      "Property owners regularizing existing structures or submitting revised building plans",
    ],
    faqs: [
      {
        question: "What is a Registered LBS Engineer and why is their signature required?",
        answer: "A Licensed Building Surveyor (LBS) is a certified civil engineer officially registered with local government bodies to draft, verify, and sign building plan approval applications in accordance with Tamil Nadu building bylaws.",
      },
      {
        question: "What documents are required for LBS building plan approval in Kinathukadavu and Coimbatore?",
        answer: "Key documents include parent sale deed copies, latest revenue patta, encumbrance certificate (EC), property tax receipts, proposed CAD architectural plans, and site boundary sketches.",
      },
      {
        question: "Does SKI Construction guarantee government approval?",
        answer: "No legitimate engineer can guarantee government approval, as final sanctions are granted solely by statutory municipal authorities. However, our direct LBS certification and strict adherence to TNCDBR bylaws ensure your file meets all regulatory criteria, minimizing objections and delays.",
      },
      {
        question: "How long does the LBS plan approval process take?",
        answer: "Once complete documents and compliant drawings are submitted through the portal, local municipal clearances typically take 3 to 6 weeks, depending on departmental site inspection schedules.",
      },
    ],
  },

  "vastu-plan": {
    overview: [
      "A Vastu-compliant architectural plan harmonizes traditional Indian spatial principles with contemporary aesthetics, structural engineering standards, and modern lifestyle needs. At SKI Construction, we believe authentic Vastu planning should enhance the flow of natural energy without compromising on natural daylight, cross-ventilation, circulation efficiency, or modern design beauty. We analyze your plot's cardinal orientation, road frontage, and surroundings to position room layouts in favorable geographical quadrants.",
      "Our civil engineering background ensures that every Vastu recommendation is structurally sound, cost-effective, and fully buildable under local building bylaws. We provide alternative layout options with transparent explanations of room placements, allowing your family to make informed choices that fit your lifestyle and personal beliefs. The finalized Vastu floor plan integrates seamlessly into the working architectural drawings, forming the trusted blueprint for a prosperous, harmonious home.",
    ],
    included: [
      "Plot cardinal direction analysis and geographical compass orientation",
      "Main entrance (Simha Dwaram) and foyer positioning for positive energy",
      "Kitchen alignment in the southeast (Agni corner) with proper cooking orientations",
      "Master bedroom placement in the southwest (Nirruthi/Kuber corner) for stability",
      "Puja room, living area, staircase, and water sump/borewell quadrant verification",
      "Architectural balance ensuring abundant daylight, cross-ventilation, and privacy",
    ],
    process: [
      {
        title: "Cardinal Direction Plot Survey",
        description: "We map the exact compass orientation, road frontage, and plot boundaries on site.",
      },
      {
        title: "Family Spatial Requirements",
        description: "We understand your family size, lifestyle habits, room requirements, and Vastu priorities.",
      },
      {
        title: "Conceptual Vastu Layout Drafting",
        description: "We draft floor plan options harmonizing Vastu rules with modern architectural flow.",
      },
      {
        title: "Review & Refinement",
        description: "We discuss options with you, explain trade-offs, and refine room dimensions collaboratively.",
      },
      {
        title: "Working Architectural Drawings",
        description: "The finalized Vastu plan is translated into dimensioned working drawings ready for approvals and construction.",
      },
    ],
    audience: [
      "Families planning a new independent home or villa who value authentic Vastu principles",
      "Homeowners remodeling an existing floor plan for better spatial balance and airflow",
      "Builders and architects seeking engineering-grounded Vastu layouts for client homes",
      "Anyone wanting a home that balances traditional wisdom with modern open-concept aesthetics",
    ],
    faqs: [
      {
        question: "Does following Vastu principles compromise modern interior design or aesthetics?",
        answer: "No. With our engineering approach, Vastu principles are seamlessly incorporated into modern layouts, ensuring spacious living areas, abundant natural light, and contemporary elegance.",
      },
      {
        question: "Can you create Vastu plans for irregularly shaped or north/west/south facing plots?",
        answer: "Yes. Every cardinal direction (North, East, South, or West facing) has distinct Vastu rules. We tailor room layouts specifically to your plot orientation and shape to achieve optimal balance.",
      },
      {
        question: "Can an existing house be assessed for Vastu improvements?",
        answer: "Yes. We can evaluate existing residential buildings and recommend practical, non-destructive adjustments to improve natural energy flow and spatial efficiency.",
      },
      {
        question: "Will the Vastu plan also satisfy municipal plan approval requirements?",
        answer: "Yes. Because our plans are developed by a Registered LBS Engineer, the Vastu layout conforms strictly to statutory setback, room size, and FSI regulations, ready for permit filing.",
      },
    ],
  },

  "3d-elevation-design": {
    overview: [
      "Our photorealistic 3D building elevation design service brings your architectural vision to life before ground is broken on site. Using advanced 3D modeling and rendering software, we create high-definition exterior views that detail the facade layout, balcony railings, window and door proportions, roof profiles, and realistic daylight and dusk lighting simulations. Visualizing your home in three dimensions allows you to explore multiple color palettes, modern wall textures, stone claddings, and wood finishes on screen rather than making expensive structural alterations during on-site construction.",
      "All 3D elevations are developed by experienced architectural designers in direct coordination with our civil engineers to ensure every design element is structurally viable, cost-effective, and fully compliant with local municipal setback rules. Revisions and material variations are refined collaboratively until your family is 100% satisfied. Once approved, the finalized 3D elevation serves as the direct visual blueprint for construction execution, approval submissions, and accurate budgeting.",
    ],
    included: [
      "Front, side, and isometric 3D exterior elevation views",
      "Photorealistic daylight and evening architectural lighting renders",
      "Curated exterior material palettes, paint codes, and cladding options",
      "Balcony railings, compound wall gates, parapet walls, and pergola detailing",
      "Collaborative revision rounds before on-site execution begins",
      "High-resolution digital presentation images and approval-ready elevations",
    ],
    process: [
      {
        title: "Brief & Plot References",
        description: "We review your plot dimensions, floor plans, facade preferences, and architectural style choices.",
      },
      {
        title: "3D Massing & Concept Modeling",
        description: "First-stage 3D models are developed establishing building proportions, roof profiles, and window placement.",
      },
      {
        title: "Material Texturing & Lighting",
        description: "We apply realistic colors, textures, stone finishes, glass railings, and atmospheric lighting.",
      },
      {
        title: "Client Feedback & Revisions",
        description: "We adjust colors, materials, and architectural elements based on your detailed feedback.",
      },
      {
        title: "High-Res Render Delivery",
        description: "You receive high-resolution elevation views and dimensioned facade drawings for site execution.",
      },
    ],
    audience: [
      "Homeowners planning a new residential villa who want to see their finished home in advance",
      "Building owners modernizing or remodeling the front facade of an older house",
      "Commercial developers needing photorealistic visual presentations for clients and tenants",
      "Contractors who require clear, dimensioned facade details for accurate site execution",
    ],
    faqs: [
      {
        question: "Is the 3D elevation the same as structural construction drawings?",
        answer: "No. The 3D elevation visualizes exterior aesthetics, colors, lighting, and facade proportions. Structural construction drawings are separate engineering documents that specify RCC column sizes, beams, and rebar details.",
      },
      {
        question: "Can the 3D model be designed to match my exact plot surroundings and road width?",
        answer: "Yes. By incorporating your plot dimensions, road frontage, and neighboring buildings, we position the 3D model accurately within its real-world Coimbatore setting.",
      },
      {
        question: "How many design revisions are included?",
        answer: "We provide collaborative revision rounds to fine-tune colors, wall claddings, and facade details until you are completely satisfied with the exterior look.",
      },
      {
        question: "Can you provide nighttime or evening lighting views of the house?",
        answer: "Yes. We generate both daytime natural sunlight renders and dusk/evening views highlighting exterior warm spotlights, step lights, and architectural facade illumination.",
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
      {
        title: "Submit Approved Plans",
        description: "Provide your proposed or approved floor plans and target specifications.",
      },
      {
        title: "Quantity Survey & Pricing",
        description: "Structural quantities are calculated and priced stage-by-stage.",
      },
      {
        title: "Client Review & Fine-Tuning",
        description: "We review the estimate together and align assumptions with your loan goal.",
      },
      {
        title: "Final Dossier Delivery",
        description: "You receive the certified estimation ready for submission to your lender.",
      },
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
        question: "Does SKI Construction guarantee loan sanction?",
        answer: "No. Loan approval and sanction amounts are determined solely by lending banks based on creditworthiness, income, and legal valuation. We provide the certified technical construction documentation required by banks.",
      },
      {
        question: "Can the estimate be revised if our floor plan or finishes change?",
        answer: "Yes. If your architectural drawings or specifications are modified, we quickly update the stage-wise BOQ and re-issue the certified estimate.",
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
      {
        title: "Zoning & Feasibility Check",
        description: "We determine master plan land use, road access, and approval eligibility.",
      },
      {
        title: "Document & Drawing Prep",
        description: "Complete technical layouts, contour sketches and revenue files are prepared.",
      },
      {
        title: "Application Submission",
        description: "The application is lodged with DTCP/LPA with all statutory affidavits.",
      },
      {
        title: "Query Response & Sanction",
        description: "We resolve departmental queries and track the file to official order sanction.",
      },
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
        question: "Does SKI Construction act as a government sanctioning authority?",
        answer: "No. SKI Construction is a private engineering and consulting firm. We provide technical drawing preparation, documentation coordination, and procedural assistance; official approvals are granted solely by the statutory DTCP / LPA departments.",
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
      {
        title: "Define Requirements",
        description: "Share your target location, budget parameters, and intended property use.",
      },
      {
        title: "Technical Site Visit",
        description: "We inspect plots assessing topography, road widths, and surroundings.",
      },
      {
        title: "Due Diligence Checklist",
        description: "We walk you through revenue records, guideline values, and approval status.",
      },
      {
        title: "Seamless Next Steps",
        description: "We connect your land purchase directly to architectural planning and building.",
      },
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
      {
        question: "Do you assist with both buying and selling properties?",
        answer: "Yes. We provide guidance for both property buyers and sellers, including documentation assembly, realistic market pricing insights, and seamless connection to building services.",
      },
    ],
  },

  // Legacy mapping to support any remaining links to property-buying-selling
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
      {
        title: "Understand Transaction Goal",
        description: "We note whether you are buying or selling, your timeline, and financial goals.",
      },
      {
        title: "Documentation Gathering",
        description: "We compile all required parent deeds, revenue patta, EC, and approval plans.",
      },
      {
        title: "Valuation & Coordination",
        description: "We evaluate structural condition, market rates, and coordinate between parties.",
      },
      {
        title: "Closing & Handover",
        description: "We assist through registration verification and complete physical handover.",
      },
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
