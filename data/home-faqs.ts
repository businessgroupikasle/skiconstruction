export interface HomeFaq {
  question: string;
  answer: string;
}

export const homeFaqs: readonly HomeFaq[] = [
  {
    question: "What services does SKI Construction provide in Kinathukadavu and Coimbatore?",
    answer:
      "SKI Construction provides 8 verified core services under one roof: turnkey residential and commercial Building Construction, independent Civil Engineering Consulting, statutory Registered LBS Plan Approval, scientific Vastu House Planning, photorealistic 3D Elevation Design, bank-compliant Bank Loan Estimates, DTCP / LPA layout and building approval assistance, and local Real Estate property guidance across Kinathukadavu, Coimbatore, and Pollachi.",
  },
  {
    question: "Who leads and supervises construction projects at SKI Construction?",
    answer:
      "All projects are led and personally supervised on site by Er. D. Satheeshkumar (DCE, BE), an authorized Registered LBS Engineer. This direct technical leadership ensures that every concrete pour, column rebar spacing, and masonry stage strictly adheres to Bureau of Indian Standards (IS 456) with zero subcontractor dilution.",
  },
  {
    question: "How does the LBS building plan approval process work in Coimbatore?",
    answer:
      "As a Registered LBS Engineer, Er. D. Satheeshkumar prepares statutory CAD submission blueprints adhering strictly to the Tamil Nadu Combined Development and Building Rules (TNCDBR). We verify boundary dimensions against your revenue patta, calculate accurate setbacks and FSI, and coordinate portal filing for smooth municipal and town panchayat clearances.",
  },
  {
    question: "Are your bank loan estimates accepted by nationalized and private banks?",
    answer:
      "Yes. Our civil engineering estimates and stage-wise Bill of Quantities (BOQ) are formatted strictly according to the valuation norms required by State Bank of India (SBI), HDFC, Canara Bank, and all major housing finance institutions across Tamil Nadu.",
  },
  {
    question: "What is the benefit of getting a 3D elevation design before construction?",
    answer:
      "A photorealistic 3D elevation allows you to preview the exact exterior facade, balcony styling, roof profiles, color combinations, and textures in realistic daylight and evening settings. Finalizing these details on screen prevents costly on-site structural alterations and ensures accurate material budgeting.",
  },
  {
    question: "Does SKI Construction assist with DTCP and LPA layout approvals?",
    answer:
      "Yes. We assist property owners, layout promoters, and developers with master plan land-use feasibility checks, layout CAD drafting, Open Space Reservation (OSR) demarcations, and technical documentation required for Directorate of Town and Country Planning (DTCP) and Local Planning Authority (LPA) approvals.",
  },
] as const;

