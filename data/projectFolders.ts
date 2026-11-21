export interface ProjectMediaFile {
  name: string;
  src: string;
  poster?: string;
}

export interface ProjectFolder {
  id: string;
  name: string;
  location: string;
  category: string;
  coverPhoto: string;
  photosCount: number;
  videosCount: number;
  photos: readonly ProjectMediaFile[];
  videos: readonly ProjectMediaFile[];
}

export const projectFolders: readonly ProjectFolder[] = [
  {
    "id": "aishwarya-galaxy-152---153",
    "name": "Aishwarya Galaxy 152 & 153",
    "location": "Coimbatore",
    "category": "Residential Villa",
    "coverPhoto": "/projects/folders/aishwarya-galaxy-152---153/20260811_183257.jpg",
    "photosCount": 6,
    "videosCount": 2,
    "photos": [
      {
        "name": "20260811_183257.jpg",
        "src": "/projects/folders/aishwarya-galaxy-152---153/20260811_183257.jpg"
      },
      {
        "name": "20260918_173158.jpg",
        "src": "/projects/folders/aishwarya-galaxy-152---153/20260918_173158.jpg"
      },
      {
        "name": "20260924_113512.jpg",
        "src": "/projects/folders/aishwarya-galaxy-152---153/20260924_113512.jpg"
      },
      {
        "name": "20260924_125315.jpg",
        "src": "/projects/folders/aishwarya-galaxy-152---153/20260924_125315.jpg"
      },
      {
        "name": "20260927_093536.jpg",
        "src": "/projects/folders/aishwarya-galaxy-152---153/20260927_093536.jpg"
      },
      {
        "name": "20261016_140441.jpg",
        "src": "/projects/folders/aishwarya-galaxy-152---153/20261016_140441.jpg"
      }
    ],
    "videos": [
      {
        "name": "20260811_184130.mp4",
        "src": "/projects/folders/aishwarya-galaxy-152---153/20260811_184130.mp4",
        "poster": "/projects/folders/aishwarya-galaxy-152---153/20260811_183257.jpg"
      },
      {
        "name": "20260812_213140.mp4",
        "src": "/projects/folders/aishwarya-galaxy-152---153/20260812_213140.mp4",
        "poster": "/projects/folders/aishwarya-galaxy-152---153/20260811_183257.jpg"
      }
    ]
  },
  {
    "id": "aj-avenue-krishnan",
    "name": "AJ Avenue Krishnan Site",
    "location": "Kinathukadavu",
    "category": "Residential Villa",
    "coverPhoto": "/projects/folders/aj-avenue-krishnan/20250711_101802.jpg",
    "photosCount": 6,
    "videosCount": 2,
    "photos": [
      {
        "name": "20250711_101802.jpg",
        "src": "/projects/folders/aj-avenue-krishnan/20250711_101802.jpg"
      },
      {
        "name": "20250716_104644.jpg",
        "src": "/projects/folders/aj-avenue-krishnan/20250716_104644.jpg"
      },
      {
        "name": "20250805_111033.jpg",
        "src": "/projects/folders/aj-avenue-krishnan/20250805_111033.jpg"
      },
      {
        "name": "20250805_111103.jpg",
        "src": "/projects/folders/aj-avenue-krishnan/20250805_111103.jpg"
      },
      {
        "name": "20250805_111123.jpg",
        "src": "/projects/folders/aj-avenue-krishnan/20250805_111123.jpg"
      },
      {
        "name": "20250805_111442.jpg",
        "src": "/projects/folders/aj-avenue-krishnan/20250805_111442.jpg"
      }
    ],
    "videos": [
      {
        "name": "20250829_104319.mp4",
        "src": "/projects/folders/aj-avenue-krishnan/20250829_104319.mp4",
        "poster": "/projects/folders/aj-avenue-krishnan/20250711_101802.jpg"
      },
      {
        "name": "20250829_104539.mp4",
        "src": "/projects/folders/aj-avenue-krishnan/20250829_104539.mp4",
        "poster": "/projects/folders/aj-avenue-krishnan/20250711_101802.jpg"
      }
    ]
  },
  {
    "id": "ayudhapooja",
    "name": "Ayudha Pooja Site Celebrations",
    "location": "Kinathukadavu",
    "category": "Site Events",
    "coverPhoto": "/projects/folders/ayudhapooja/IMG-20261019-WA0070.jpg",
    "photosCount": 6,
    "videosCount": 2,
    "photos": [
      {
        "name": "IMG-20261019-WA0070.jpg",
        "src": "/projects/folders/ayudhapooja/IMG-20261019-WA0070.jpg"
      },
      {
        "name": "IMG-20261019-WA0071.jpg",
        "src": "/projects/folders/ayudhapooja/IMG-20261019-WA0071.jpg"
      },
      {
        "name": "IMG-20261019-WA0117.jpg",
        "src": "/projects/folders/ayudhapooja/IMG-20261019-WA0117.jpg"
      },
      {
        "name": "IMG-20261019-WA0118.jpg",
        "src": "/projects/folders/ayudhapooja/IMG-20261019-WA0118.jpg"
      },
      {
        "name": "IMG-20261019-WA0121.jpg",
        "src": "/projects/folders/ayudhapooja/IMG-20261019-WA0121.jpg"
      },
      {
        "name": "IMG-20261019-WA0123.jpg",
        "src": "/projects/folders/ayudhapooja/IMG-20261019-WA0123.jpg"
      }
    ],
    "videos": [
      {
        "name": "VID-20261019-WA0199.mp4",
        "src": "/projects/folders/ayudhapooja/VID-20261019-WA0199.mp4",
        "poster": "/projects/folders/ayudhapooja/IMG-20261019-WA0070.jpg"
      },
      {
        "name": "VID-20261019-WA0201.mp4",
        "src": "/projects/folders/ayudhapooja/VID-20261019-WA0201.mp4",
        "poster": "/projects/folders/ayudhapooja/IMG-20261019-WA0070.jpg"
      }
    ]
  },
  {
    "id": "ganesh-tharani-sk-garden",
    "name": "Ganesh & Tharani SK Garden",
    "location": "Coimbatore",
    "category": "Residential Villa",
    "coverPhoto": "/projects/folders/ganesh-tharani-sk-garden/20251124_114729.jpg",
    "photosCount": 6,
    "videosCount": 2,
    "photos": [
      {
        "name": "20251124_114729.jpg",
        "src": "/projects/folders/ganesh-tharani-sk-garden/20251124_114729.jpg"
      },
      {
        "name": "20251124_114732.jpg",
        "src": "/projects/folders/ganesh-tharani-sk-garden/20251124_114732.jpg"
      },
      {
        "name": "20251124_115243.jpg",
        "src": "/projects/folders/ganesh-tharani-sk-garden/20251124_115243.jpg"
      },
      {
        "name": "20251124_115245.jpg",
        "src": "/projects/folders/ganesh-tharani-sk-garden/20251124_115245.jpg"
      },
      {
        "name": "20251124_115246.jpg",
        "src": "/projects/folders/ganesh-tharani-sk-garden/20251124_115246.jpg"
      },
      {
        "name": "20251206_141828.jpg",
        "src": "/projects/folders/ganesh-tharani-sk-garden/20251206_141828.jpg"
      }
    ],
    "videos": [
      {
        "name": "20251228_100858.mp4",
        "src": "/projects/folders/ganesh-tharani-sk-garden/20251228_100858.mp4",
        "poster": "/projects/folders/ganesh-tharani-sk-garden/20251124_114729.jpg"
      },
      {
        "name": "20260214_190021.mp4",
        "src": "/projects/folders/ganesh-tharani-sk-garden/20260214_190021.mp4",
        "poster": "/projects/folders/ganesh-tharani-sk-garden/20251124_114729.jpg"
      }
    ]
  },
  {
    "id": "kangayam-site",
    "name": "Kangayam Site",
    "location": "Kangayam",
    "category": "Structural Construction",
    "coverPhoto": "/projects/folders/kangayam-site/20250624_143136.jpg",
    "photosCount": 6,
    "videosCount": 2,
    "photos": [
      {
        "name": "20250624_143136.jpg",
        "src": "/projects/folders/kangayam-site/20250624_143136.jpg"
      },
      {
        "name": "20250624_143143.jpg",
        "src": "/projects/folders/kangayam-site/20250624_143143.jpg"
      },
      {
        "name": "20250624_143150.jpg",
        "src": "/projects/folders/kangayam-site/20250624_143150.jpg"
      },
      {
        "name": "20250624_143251.jpg",
        "src": "/projects/folders/kangayam-site/20250624_143251.jpg"
      },
      {
        "name": "20250624_143258.jpg",
        "src": "/projects/folders/kangayam-site/20250624_143258.jpg"
      },
      {
        "name": "20250624_143342.jpg",
        "src": "/projects/folders/kangayam-site/20250624_143342.jpg"
      }
    ],
    "videos": [
      {
        "name": "VID-20250411-WA0060.mp4",
        "src": "/projects/folders/kangayam-site/VID-20250411-WA0060.mp4",
        "poster": "/projects/folders/kangayam-site/20250624_143136.jpg"
      },
      {
        "name": "VID-20250411-WA0061.mp4",
        "src": "/projects/folders/kangayam-site/VID-20250411-WA0061.mp4",
        "poster": "/projects/folders/kangayam-site/20250624_143136.jpg"
      }
    ]
  },
  {
    "id": "ponmalai-temple-work",
    "name": "Ponmalai Temple Work",
    "location": "Kinathukadavu",
    "category": "Heritage & Temple",
    "coverPhoto": "/projects/folders/ponmalai-temple-work/20251216_172958.jpg",
    "photosCount": 6,
    "videosCount": 2,
    "photos": [
      {
        "name": "20251216_172958.jpg",
        "src": "/projects/folders/ponmalai-temple-work/20251216_172958.jpg"
      },
      {
        "name": "20251216_173012.jpg",
        "src": "/projects/folders/ponmalai-temple-work/20251216_173012.jpg"
      },
      {
        "name": "IMG-20251127-WA0119.jpg",
        "src": "/projects/folders/ponmalai-temple-work/IMG-20251127-WA0119.jpg"
      },
      {
        "name": "IMG-20251203-WA0092.jpg",
        "src": "/projects/folders/ponmalai-temple-work/IMG-20251203-WA0092.jpg"
      },
      {
        "name": "IMG-20251210-WA0038.jpg",
        "src": "/projects/folders/ponmalai-temple-work/IMG-20251210-WA0038.jpg"
      },
      {
        "name": "IMG-20251210-WA0039.jpg",
        "src": "/projects/folders/ponmalai-temple-work/IMG-20251210-WA0039.jpg"
      }
    ],
    "videos": [
      {
        "name": "VID-20260205-WA0036.mp4",
        "src": "/projects/folders/ponmalai-temple-work/VID-20260205-WA0036.mp4",
        "poster": "/projects/folders/ponmalai-temple-work/20251216_172958.jpg"
      },
      {
        "name": "VID-20260205-WA0038.mp4",
        "src": "/projects/folders/ponmalai-temple-work/VID-20260205-WA0038.mp4",
        "poster": "/projects/folders/ponmalai-temple-work/20251216_172958.jpg"
      }
    ]
  },
  {
    "id": "ramaraj-thamarai-site",
    "name": "Ramaraj Thamarai Site",
    "location": "Coimbatore",
    "category": "Residential Villa",
    "coverPhoto": "/projects/folders/ramaraj-thamarai-site/20260814_082618.jpg",
    "photosCount": 6,
    "videosCount": 2,
    "photos": [
      {
        "name": "20260814_082618.jpg",
        "src": "/projects/folders/ramaraj-thamarai-site/20260814_082618.jpg"
      },
      {
        "name": "20260814_093129.jpg",
        "src": "/projects/folders/ramaraj-thamarai-site/20260814_093129.jpg"
      },
      {
        "name": "20260814_093131.jpg",
        "src": "/projects/folders/ramaraj-thamarai-site/20260814_093131.jpg"
      },
      {
        "name": "20261101_060729.jpg",
        "src": "/projects/folders/ramaraj-thamarai-site/20261101_060729.jpg"
      },
      {
        "name": "20261101_060734.jpg",
        "src": "/projects/folders/ramaraj-thamarai-site/20261101_060734.jpg"
      },
      {
        "name": "20261101_060806.jpg",
        "src": "/projects/folders/ramaraj-thamarai-site/20261101_060806.jpg"
      }
    ],
    "videos": [
      {
        "name": "20260814_093123.mp4",
        "src": "/projects/folders/ramaraj-thamarai-site/20260814_093123.mp4",
        "poster": "/projects/folders/ramaraj-thamarai-site/20260814_082618.jpg"
      },
      {
        "name": "VID-20260829-WA0377.mp4",
        "src": "/projects/folders/ramaraj-thamarai-site/VID-20260829-WA0377.mp4",
        "poster": "/projects/folders/ramaraj-thamarai-site/20260814_082618.jpg"
      }
    ]
  },
  {
    "id": "rs-road-site-kkd",
    "name": "RS Road Site KKD",
    "location": "Kinathukadavu",
    "category": "Commercial & Residential",
    "coverPhoto": "/projects/folders/rs-road-site-kkd/20250620_103523.jpg",
    "photosCount": 6,
    "videosCount": 2,
    "photos": [
      {
        "name": "20250620_103523.jpg",
        "src": "/projects/folders/rs-road-site-kkd/20250620_103523.jpg"
      },
      {
        "name": "20250620_103629.jpg",
        "src": "/projects/folders/rs-road-site-kkd/20250620_103629.jpg"
      },
      {
        "name": "20250620_103634.jpg",
        "src": "/projects/folders/rs-road-site-kkd/20250620_103634.jpg"
      },
      {
        "name": "20250620_103710.jpg",
        "src": "/projects/folders/rs-road-site-kkd/20250620_103710.jpg"
      },
      {
        "name": "20250627_100637.jpg",
        "src": "/projects/folders/rs-road-site-kkd/20250627_100637.jpg"
      },
      {
        "name": "20250627_100644.jpg",
        "src": "/projects/folders/rs-road-site-kkd/20250627_100644.jpg"
      }
    ],
    "videos": [
      {
        "name": "20250829_063645.mp4",
        "src": "/projects/folders/rs-road-site-kkd/20250829_063645.mp4",
        "poster": "/projects/folders/rs-road-site-kkd/20250620_103523.jpg"
      },
      {
        "name": "20250923_103203.mp4",
        "src": "/projects/folders/rs-road-site-kkd/20250923_103203.mp4",
        "poster": "/projects/folders/rs-road-site-kkd/20250620_103523.jpg"
      }
    ]
  },
  {
    "id": "s-k-i-diwali-2026",
    "name": "SKI Diwali Celebrations",
    "location": "Head Office",
    "category": "Company Milestone",
    "coverPhoto": "/projects/folders/s-k-i-diwali-2026/IMG-20261107-WA0017.jpg",
    "photosCount": 6,
    "videosCount": 1,
    "photos": [
      {
        "name": "IMG-20261107-WA0017.jpg",
        "src": "/projects/folders/s-k-i-diwali-2026/IMG-20261107-WA0017.jpg"
      },
      {
        "name": "IMG-20261107-WA0018.jpg",
        "src": "/projects/folders/s-k-i-diwali-2026/IMG-20261107-WA0018.jpg"
      },
      {
        "name": "IMG-20261107-WA0025.jpg",
        "src": "/projects/folders/s-k-i-diwali-2026/IMG-20261107-WA0025.jpg"
      },
      {
        "name": "IMG-20261107-WA0028.jpg",
        "src": "/projects/folders/s-k-i-diwali-2026/IMG-20261107-WA0028.jpg"
      },
      {
        "name": "IMG-20261107-WA0029.jpg",
        "src": "/projects/folders/s-k-i-diwali-2026/IMG-20261107-WA0029.jpg"
      },
      {
        "name": "IMG-20261107-WA0031.jpg",
        "src": "/projects/folders/s-k-i-diwali-2026/IMG-20261107-WA0031.jpg"
      }
    ],
    "videos": [
      {
        "name": "VID_20261107_095239_076.mp4",
        "src": "/projects/folders/s-k-i-diwali-2026/VID_20261107_095239_076.mp4",
        "poster": "/projects/folders/s-k-i-diwali-2026/IMG-20261107-WA0017.jpg"
      }
    ]
  },
  {
    "id": "sadhasivam-site-muthugoundanur",
    "name": "Sadhasivam Site Muthugoundanur",
    "location": "Muthugoundanur",
    "category": "Residential Villa",
    "coverPhoto": "/projects/folders/sadhasivam-site-muthugoundanur/IMG-20240907-WA0005.jpg",
    "photosCount": 6,
    "videosCount": 2,
    "photos": [
      {
        "name": "IMG-20240907-WA0005.jpg",
        "src": "/projects/folders/sadhasivam-site-muthugoundanur/IMG-20240907-WA0005.jpg"
      },
      {
        "name": "IMG-20241130-WA0056.jpg",
        "src": "/projects/folders/sadhasivam-site-muthugoundanur/IMG-20241130-WA0056.jpg"
      },
      {
        "name": "IMG-20241130-WA0064.jpg",
        "src": "/projects/folders/sadhasivam-site-muthugoundanur/IMG-20241130-WA0064.jpg"
      },
      {
        "name": "IMG-20241130-WA0065.jpg",
        "src": "/projects/folders/sadhasivam-site-muthugoundanur/IMG-20241130-WA0065.jpg"
      },
      {
        "name": "IMG-20241130-WA0066.jpg",
        "src": "/projects/folders/sadhasivam-site-muthugoundanur/IMG-20241130-WA0066.jpg"
      },
      {
        "name": "IMG-20241130-WA0070.jpg",
        "src": "/projects/folders/sadhasivam-site-muthugoundanur/IMG-20241130-WA0070.jpg"
      }
    ],
    "videos": [
      {
        "name": "1733309714334_1733309714334.mp4",
        "src": "/projects/folders/sadhasivam-site-muthugoundanur/1733309714334_1733309714334.mp4",
        "poster": "/projects/folders/sadhasivam-site-muthugoundanur/IMG-20240907-WA0005.jpg"
      },
      {
        "name": "InShot_20241011_212521655.mp4",
        "src": "/projects/folders/sadhasivam-site-muthugoundanur/InShot_20241011_212521655.mp4",
        "poster": "/projects/folders/sadhasivam-site-muthugoundanur/IMG-20240907-WA0005.jpg"
      }
    ]
  },
  {
    "id": "senthor-garden-49",
    "name": "Senthor Garden 49",
    "location": "Kinathukadavu",
    "category": "Residential Villa",
    "coverPhoto": "/projects/folders/senthor-garden-49/20251112_175306.jpg",
    "photosCount": 6,
    "videosCount": 2,
    "photos": [
      {
        "name": "20251112_175306.jpg",
        "src": "/projects/folders/senthor-garden-49/20251112_175306.jpg"
      },
      {
        "name": "IMG-20240929-WA0008.jpg",
        "src": "/projects/folders/senthor-garden-49/IMG-20240929-WA0008.jpg"
      },
      {
        "name": "IMG-20240929-WA0009.jpg",
        "src": "/projects/folders/senthor-garden-49/IMG-20240929-WA0009.jpg"
      },
      {
        "name": "IMG-20240929-WA0010.jpg",
        "src": "/projects/folders/senthor-garden-49/IMG-20240929-WA0010.jpg"
      },
      {
        "name": "IMG20240822082721.jpg",
        "src": "/projects/folders/senthor-garden-49/IMG20240822082721.jpg"
      },
      {
        "name": "IMG20240822082723.jpg",
        "src": "/projects/folders/senthor-garden-49/IMG20240822082723.jpg"
      }
    ],
    "videos": [
      {
        "name": "VID20240902111549.mp4",
        "src": "/projects/folders/senthor-garden-49/VID20240902111549.mp4",
        "poster": "/projects/folders/senthor-garden-49/20251112_175306.jpg"
      },
      {
        "name": "VID20241021130555.mp4",
        "src": "/projects/folders/senthor-garden-49/VID20241021130555.mp4",
        "poster": "/projects/folders/senthor-garden-49/20251112_175306.jpg"
      }
    ]
  },
  {
    "id": "site-no-27-senthor-kkd",
    "name": "Site No. 27 Senthor KKD",
    "location": "Kinathukadavu",
    "category": "Turnkey Construction",
    "coverPhoto": "/projects/folders/site-no-27-senthor-kkd/20260526_105333.jpg",
    "photosCount": 6,
    "videosCount": 2,
    "photos": [
      {
        "name": "20260526_105333.jpg",
        "src": "/projects/folders/site-no-27-senthor-kkd/20260526_105333.jpg"
      },
      {
        "name": "20260526_105336.jpg",
        "src": "/projects/folders/site-no-27-senthor-kkd/20260526_105336.jpg"
      },
      {
        "name": "20260526_105347.jpg",
        "src": "/projects/folders/site-no-27-senthor-kkd/20260526_105347.jpg"
      },
      {
        "name": "20260526_105348.jpg",
        "src": "/projects/folders/site-no-27-senthor-kkd/20260526_105348.jpg"
      },
      {
        "name": "20260526_105625.jpg",
        "src": "/projects/folders/site-no-27-senthor-kkd/20260526_105625.jpg"
      },
      {
        "name": "20260526_105642.jpg",
        "src": "/projects/folders/site-no-27-senthor-kkd/20260526_105642.jpg"
      }
    ],
    "videos": [
      {
        "name": "VID-20240311-WA0008.mp4",
        "src": "/projects/folders/site-no-27-senthor-kkd/VID-20240311-WA0008.mp4",
        "poster": "/projects/folders/site-no-27-senthor-kkd/20260526_105333.jpg"
      },
      {
        "name": "VID20240416103741.mp4",
        "src": "/projects/folders/site-no-27-senthor-kkd/VID20240416103741.mp4",
        "poster": "/projects/folders/site-no-27-senthor-kkd/20260526_105333.jpg"
      }
    ]
  },
  {
    "id": "sivaperumal-aishwarya-galaxy",
    "name": "Sivaperumal Aishwarya Galaxy",
    "location": "Coimbatore",
    "category": "Turnkey Residence",
    "coverPhoto": "/projects/folders/sivaperumal-aishwarya-galaxy/20260529_063549.jpg",
    "photosCount": 6,
    "videosCount": 2,
    "photos": [
      {
        "name": "20260529_063549.jpg",
        "src": "/projects/folders/sivaperumal-aishwarya-galaxy/20260529_063549.jpg"
      },
      {
        "name": "20260529_063552.jpg",
        "src": "/projects/folders/sivaperumal-aishwarya-galaxy/20260529_063552.jpg"
      },
      {
        "name": "20260529_063636.jpg",
        "src": "/projects/folders/sivaperumal-aishwarya-galaxy/20260529_063636.jpg"
      },
      {
        "name": "20260529_063639.jpg",
        "src": "/projects/folders/sivaperumal-aishwarya-galaxy/20260529_063639.jpg"
      },
      {
        "name": "20260529_122423.jpg",
        "src": "/projects/folders/sivaperumal-aishwarya-galaxy/20260529_122423.jpg"
      },
      {
        "name": "20260529_124419.jpg",
        "src": "/projects/folders/sivaperumal-aishwarya-galaxy/20260529_124419.jpg"
      }
    ],
    "videos": [
      {
        "name": "20260606_075119.mp4",
        "src": "/projects/folders/sivaperumal-aishwarya-galaxy/20260606_075119.mp4",
        "poster": "/projects/folders/sivaperumal-aishwarya-galaxy/20260529_063549.jpg"
      },
      {
        "name": "20260721_115646.mp4",
        "src": "/projects/folders/sivaperumal-aishwarya-galaxy/20260721_115646.mp4",
        "poster": "/projects/folders/sivaperumal-aishwarya-galaxy/20260529_063549.jpg"
      }
    ]
  }
] as const;
