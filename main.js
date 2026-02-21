const researchThemes = [
  {
    title: "Cell wall growth and division-site architecture",
    text:
      "We define how peptidoglycan synthesis, hydrolysis, and division machinery are coordinated so bacteria can grow and split reliably.",
    image: "assets/images/research/fluorescence-envelope.jpg",
    chips: ["Cell wall synthesis", "Division", "Peptidoglycan"]
  },
  {
    title: "Envelope stress and membrane integrity",
    text:
      "We investigate how bacteria sense envelope stress and re-balance lipid and cell wall biogenesis to avoid structural failure.",
    image: "assets/images/research/pseudomonas-tem.jpg",
    chips: ["Stress signaling", "Outer membrane", "Lipid transport"]
  },
  {
    title: "Species-spanning envelope biology",
    text:
      "The lab compares mechanisms across model and clinically important bacteria to identify conserved principles and species-specific vulnerabilities.",
    image: "assets/images/research/species-envelope.png",
    chips: ["E. coli", "P. aeruginosa", "S. aureus", "C. glutamicum", "K. pneumoniae", "A. baumannii"]
  },
  {
    title: "Mechanism to medicine",
    text:
      "By resolving molecular mechanisms behind envelope assembly, we help illuminate targets and concepts for next-generation antibiotics.",
    image: "assets/images/research/coryfdaa.png",
    chips: ["Antibiotic targets", "Resistance", "Translational microbiology"]
  }
];

const IS_FLAT_BUILD = !document.querySelector('link[href^="assets/styles.css"]');
const RESEARCH_IN_MOTION_MANIFEST_URL = IS_FLAT_BUILD ? "research-in-motion.json" : "assets/data/research-in-motion.json";
const RESEARCH_IN_MOTION_TARGET_COUNT = 12;
const RESEARCH_IN_MOTION_CACHE_KEY = "bernhardt-rim-manifest-v2";
const RESEARCH_IN_MOTION_CACHE_MAX_AGE_MS = 6 * 60 * 60 * 1000;
const RESEARCH_IN_MOTION_FETCH_TIMEOUT_MS = 9000;

const bigQuestions = [
  {
    title: "How is septal cell wall synthesis precisely turned on and off?",
    detail:
      "Define the timing logic that couples divisome activation to local peptidoglycan insertion and remodeling."
  },
  {
    title: "How do synthesis and hydrolysis stay balanced during constriction?",
    detail:
      "Resolve how envelope-building and -cleaving enzymes avoid both stalled cytokinesis and catastrophic rupture."
  },
  {
    title: "Which stress-response circuits preserve membrane integrity?",
    detail:
      "Map the envelope stress pathways that reprogram lipid and wall biogenesis when cells are challenged."
  },
  {
    title: "What principles generalize across diverse bacterial species?",
    detail:
      "Compare conserved vs species-specific envelope programs in both model organisms and high-priority pathogens."
  },
  {
    title: "Which vulnerable nodes are most tractable for antibiotic strategy?",
    detail:
      "Connect molecular mechanism to experimentally actionable targets that can be exploited therapeutically."
  }
];

const researchInMotionFallback = [
  {
    title: "Division-site architecture during constriction",
    caption: "Fluorescence map of division geometry.",
    image: "assets/images/highlights/nmicro2022-divisome-fluorescence.jpg",
    sourceLabel: "Nature Microbiology · 2022",
    articleUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9519445/"
  },
  {
    title: "Time-lapse envelope insertion series",
    caption: "Dynamic envelope insertion over time.",
    image: "assets/images/highlights/nmicro2022-timelapse-rods.jpg",
    sourceLabel: "Nature Microbiology · 2022",
    articleUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9519445/",
    format: "Movie"
  },
  {
    title: "Cryo-ET and cryo-FIB envelope ultrastructure",
    caption: "Cryo workflow and ultrastructure view.",
    image: "assets/images/highlights/nmicro2022-cryo-tomography.jpg",
    sourceLabel: "Nature Microbiology · 2022",
    articleUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9519445/"
  },
  {
    title: "FacZ and peptidoglycan spatial patterning",
    caption: "S. aureus envelope patterning.",
    image: "assets/images/highlights/mbio2023saur-facz-pg.jpg",
    sourceLabel: "mBio · 2023",
    articleUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10168275/"
  },
  {
    title: "S. aureus envelope architecture states",
    caption: "Envelope architecture across stages.",
    image: "assets/images/highlights/mbio2023saur-envelope-architecture.jpg",
    sourceLabel: "mBio · 2023",
    articleUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10168275/"
  },
  {
    title: "PcdA localization across division stages",
    caption: "Localization across division states.",
    image: "assets/images/highlights/mbio2023-pcda-localization.jpg",
    sourceLabel: "mBio · 2023",
    articleUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10602043/"
  },
  {
    title: "Divisome-associated localization maps",
    caption: "Divisome localization maps.",
    image: "assets/images/highlights/mbio2023-division-maps.jpg",
    sourceLabel: "mBio · 2023",
    articleUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10602043/"
  },
  {
    title: "Salt-stress genetic screen phenotype panel",
    caption: "Envelope stress phenotypes from screen.",
    image: "assets/images/highlights/ncomms2022-salt-stress-screen.jpg",
    sourceLabel: "Nature Communications · 2022",
    articleUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9308384/"
  },
  {
    title: "FacZ-dependent membrane organization",
    caption: "Membrane and PG patterning during division.",
    image: "assets/images/publications/mbio2023saur-f2.jpg",
    sourceLabel: "mBio · 2023",
    articleUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10168275/"
  },
  {
    title: "FacZ peptidoglycan enrichment profiles",
    caption: "Spatial enrichment across septal architecture.",
    image: "assets/images/publications/mbio2023saur-f4.jpg",
    sourceLabel: "mBio · 2023",
    articleUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10168275/"
  },
  {
    title: "PcdA recruitment during cytokinesis",
    caption: "PcdA localization across division states.",
    image: "assets/images/publications/mbio2023-f2.jpg",
    sourceLabel: "mBio · 2023",
    articleUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10602043/"
  },
  {
    title: "PcdA activity-state comparisons",
    caption: "Functional states across membrane classes.",
    image: "assets/images/publications/mbio2023-f4.jpg",
    sourceLabel: "mBio · 2023",
    articleUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10602043/"
  },
  {
    title: "Lytic transglycosylase reaction model",
    caption: "Schematic of glycan maturation steps.",
    image: "assets/images/publications/pnas2004598117-fig1.jpg",
    sourceLabel: "PNAS · 2020",
    articleUrl: "https://www.pnas.org/doi/10.1073/pnas.2004598117"
  },
  {
    title: "Peptidoglycan incorporation endpoint",
    caption: "Completion state for mature cell wall strands.",
    image: "assets/images/publications/pnas2004598117-fig2.jpg",
    sourceLabel: "PNAS · 2020",
    articleUrl: "https://www.pnas.org/doi/10.1073/pnas.2004598117"
  },
  {
    title: "Envelope remodeling activity map",
    caption: "Comparative reaction-state readout.",
    image: "assets/images/publications/pnas2004598117-fig3.jpg",
    sourceLabel: "PNAS · 2020",
    articleUrl: "https://www.pnas.org/doi/10.1073/pnas.2004598117"
  },
  {
    title: "Cell-wall maturation completion profile",
    caption: "Late-stage remodeling reference panel.",
    image: "assets/images/publications/pnas2004598117-fig4.jpg",
    sourceLabel: "PNAS · 2020",
    articleUrl: "https://www.pnas.org/doi/10.1073/pnas.2004598117"
  }
];

const galleryItems = [
  {
    title: "Tom Bernhardt mentoring during HMS Community Phages",
    image: "community-phages-tom-2023-049.jpg"
  },
  {
    title: "Tom's tenured gift from the lab",
    image:
      "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1519155156853-6JPGDU0TF0T6BSWEFGQV/TGB_4.5x6.5.png"
  },
  {
    title: "Lab group photo, October 2019",
    image:
      "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1630095169803-FDQ8732FYB808X9S8F70/lab+group+picture.jpeg"
  },
  {
    title: "Super group meeting prep",
    image:
      "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1568647681017-ZDHK61NCIIYSWYJTTY56/00100lPORTRAIT_00100_BURST20190816090154418_COVER.jpg"
  },
  {
    title: "Axe throwing outing, winter 2021",
    image:
      "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1698945095787-44TJG9RAKO5YBLSJG39F/lab+axe+throwing+outing.jpeg"
  },
  {
    title: "2020 holiday gift swap",
    image:
      "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1609953194732-RLR5U62CIKT7BL4LGHG7/IMG_2899.jpg"
  },
  {
    title: "Virtual holiday party, December 2020",
    image:
      "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1609952792110-6JQKNG9HXJNVDNQFWZFL/virtual%2Bparty%2Bbernhardt%2Blab.jpg"
  },
  {
    title: "Apple picking outing, fall 2023",
    image:
      "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1698945008980-38CNHCWID1ZQWAR15BSO/WechatIMG583.jpg"
  },
  {
    title: "Bernhardt lab beer hour, spring 2024",
    image:
      "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1718043136035-KTWID89GUQY6IWW3D9YN/IMG_3814.jpg"
  }
];

const featuredAlumniFallback = [
  {
    name: "Catherine Paradis-Bleau",
    roleInLab: "Former postdoctoral fellow",
    currentRole: "Assistant Professor, Department of Microbiology, Infectious Diseases and Immunology, Universite de Montreal",
    source: "https://microbiologie.umontreal.ca/recherche/professeurs-chercheurs/catherine-paradis-bleau/",
    sourceLabel: "Universite de Montreal"
  },
  {
    name: "Kate Hummels",
    roleInLab: "Former postdoctoral fellow",
    currentRole: "Assistant Professor, Department of Microbiology, University of Georgia",
    source: "https://research.franklin.uga.edu/lab/hummels-lab",
    sourceLabel: "University of Georgia (Hummels Lab)"
  },
  {
    name: "Thomas Bartlett",
    roleInLab: "Former postdoctoral fellow",
    currentRole: "Principal Investigator and Senior Staff Scientist, Wadsworth Center",
    source: "https://www.wadsworth.org/research/laboratories/bartlett/people",
    sourceLabel: "Wadsworth Center (Bartlett Lab)"
  },
  {
    name: "Lindsey Marmont",
    roleInLab: "Former postdoctoral fellow",
    currentRole: "Assistant Professor, Department of Biochemistry and Biomedical Sciences, McMaster University",
    source: "https://experts.mcmaster.ca/people/marmontl",
    sourceLabel: "McMaster University"
  },
  {
    name: "Coralie Fumeaux",
    roleInLab: "Former postdoctoral fellow",
    currentRole: "Assistant Professor and Group Leader, CHUV and University of Lausanne",
    source: "https://www.chuv.ch/en/microbiologie/imu-home/research/research-groups/coralie-fumeaux-lab",
    sourceLabel: "CHUV / University of Lausanne"
  },
  {
    name: "Josue Flores-Kim",
    roleInLab: "Former postdoctoral fellow",
    currentRole: "Assistant Professor, Department of Biochemistry and Molecular Biotechnology, UMass Chan Medical School",
    source: "https://profiles.umassmed.edu/display/28733746",
    sourceLabel: "UMass Chan Medical School"
  },
  {
    name: "Amelia McKitterick",
    roleInLab: "Former postdoctoral fellow",
    currentRole: "Assistant Professor, Department of Microbiology, UMass Chan Medical School",
    source: "https://www.umassmed.edu/mckitterick-lab/people/",
    sourceLabel: "UMass Chan Medical School"
  },
  {
    name: "Paula Navarro",
    roleInLab: "Former postdoctoral fellow",
    currentRole: "Assistant Professor, Department of Fundamental Microbiology, University of Lausanne",
    source: "https://wp.unil.ch/navarrolab/",
    sourceLabel: "University of Lausanne"
  },
  {
    name: "Andrea Vettiger",
    roleInLab: "Former postdoctoral fellow",
    currentRole: "Assistant Professor, Department of Fundamental Microbiology, University of Lausanne",
    source: "https://wp.unil.ch/vettiger-lab/people/andrea-vettiger-phd/",
    sourceLabel: "University of Lausanne"
  },
  {
    name: "Nick Peters",
    roleInLab: "Former postdoctoral fellow",
    currentRole: "Associate Professor, Microbiology Undergraduate Program, Iowa State University",
    source: "https://www.micro.iastate.edu/people/nicholas-peters",
    sourceLabel: "Iowa State University"
  },
  {
    name: "Andrew Fenton",
    roleInLab: "Former postdoctoral fellow",
    currentRole: "Lecturer in Microbial Pathogenesis, University of Sheffield",
    source: "https://www.sheffield.ac.uk/biosciences/people/academic-staff/andrew-fenton",
    sourceLabel: "University of Sheffield"
  },
  {
    name: "Chris Lok-To Sham",
    roleInLab: "Former graduate student",
    currentRole: "Assistant Professor, Department of Microbiology and Immunology, National University of Singapore",
    source: "https://discovery.nus.edu.sg/11874-lok-to-sham",
    sourceLabel: "National University of Singapore"
  },
  {
    name: "Neil Greene",
    roleInLab: "Former postdoctoral fellow",
    currentRole: "Clinical Associate Professor and Program Director, University of Rhode Island",
    source: "https://web.uri.edu/cmb/meet/neil-greene/",
    sourceLabel: "University of Rhode Island"
  },
  {
    name: "Derek Lau",
    roleInLab: "Former postdoctoral fellow",
    currentRole: "Lecturer in Residence, Department of Biology, Emmanuel College",
    source: "https://www.emmanuel.edu/derek-lau",
    sourceLabel: "Emmanuel College"
  }
];

const featuredAlumni = buildFeaturedAlumni();

const rawPeople = [
   {
      "profile" : "/thomas-bernhardt",
      "bio" : "The Bernhardt lab studies molecular mechanisms of bacterial growth and cell wall assembly to inform antibiotic discovery.",
      "role" : "Professor, Department of Microbiology | Investigator, Howard Hughes Medical Institute",
      "image" : "thomas-bernhardt-hhmi-2025.png",
      "email" : "",
      "name" : "Thomas Bernhardt"
   },
   {
      "image" : "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1553173916977-5MWVESOJ7KKQ89GK4ORT/James_spencer.jpg",
      "bio" : "Research operations lead for the Bernhardt and Abraham HHMI labs at HMS, overseeing finance, hiring, procurement, compliance, and lab infrastructure, and supporting HMS Community Phages.",
      "role" : "Howard Hughes Medical Institute",
      "profile" : "/james",
      "name" : "James Spencer",
      "email" : "James_Spencer{at}hms.harvard.edu"
   },
   {
      "email" : "ksuarez{at}g.harvard.edu",
      "name" : "Kathy Suarez",
      "role" : "BBS Graduate Student | NIH F31 Fellow",
      "bio" : "I am interested in examining the function of cell wall synthesis in E. coli.",
      "image" : "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1598381898156-68II3HUTKXY1OF4U3R8C/kathy.jpg",
      "profile" : "/kathy-suarez"
   },
   {
      "profile" : "/betsy-hart",
      "image" : "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1598383045751-ABC6TUB51HNGRQ2CUAJZ/betsy.jpg",
      "role" : "Postdoctoral Fellow | NIH K99/R00 Fellow | Former HHWF Fellow",
      "bio" : "I am interested in cell envelope biogenesis in Corynebacterium glutamicum.",
      "email" : "Elizabeth_Hart{at}hms.harvard.edu",
      "name" : "Betsy Hart"
   },
   {
      "name" : "Johnathan Kepple",
      "email" : "johnathankepple{at}g.harvard.edu",
      "image" : "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1630526847138-E1T99QXT1Q4VOQUWKO0I/IMG_0508.jpg",
      "bio" : "The general aim of my research is to understand the regulation of cell wall synthesis in the gram negative bacteria pseudomonas aeruginosa.",
      "role" : "BPH Graduate Student | NIH F31 Fellow",
      "profile" : "/johnathan-kepple"
   },
   {
      "image" : "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1675970682144-0PYVM1YRSI7X2YIC934I/55E89D77-D21C-419F-9D17-4DA257564722.jpg",
      "role" : "Postdoctoral Fellow",
      "bio" : "I am interested in cell wall biogenesis in Corynebacterium glutamicum.",
      "profile" : "/wanassa",
      "name" : "Wanassa Beroual",
      "email" : "Wanassa_Beroual{at}hms.harvard.edu"
   },
   {
      "bio" : "I am interested in understanding the role mannosylation plays in the membrane of Corynebacterium glutamicum.",
      "role" : "Postdoctoral Fellow | NIH K99/R00 Fellow",
      "image" : "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1649110154642-G16R9VNOZ9VHWXFZXU6K/Screen+Shot+2022-04-04+at+6.00.55+PM.png",
      "profile" : "/anastacia-parks",
      "email" : "Anastacia_Parks{at}hms.harvard.edu",
      "name" : "Anastacia Parks"
   },
   {
      "profile" : "/tanner-dehart",
      "image" : "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1661806098784-ZTUDXNCLO016KTO190CT/Screen+Shot+2022-08-29+at+4.32.58+PM.png",
      "bio" : "I am interested in the biosynthesis of membrane lipids as well as characterizing proteases potentially involved in the regulation of E. coli cell wall synthesis",
      "role" : "BBS Graduate Student",
      "name" : "Tanner DeHart",
      "email" : "tdehart{at}g.harvard.edu"
   },
   {
      "name" : "Wilaysha Evans",
      "email" : "wilayshaevans{at}g.harvard.edu",
      "image" : "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1663796653002-8C0DEY29J50676GSPCWO/Screen+Shot+2022-09-21+at+12.49.48+PM.png",
      "role" : "ChemBio Graduate Student",
      "bio" : "I am most interested in understanding the mechanisms that underpin bacterial cell shape and division. More specifically, in the Bernhardt lab, I study some of the mechanisms by which cell wall integrity in Corynebacterium glutamicum is maintained.",
      "profile" : "/wilaysha-evans"
   },
   {
      "profile" : "/nilanjan-som",
      "role" : "Postdoctoral fellow",
      "bio" : "I am interested in understanding the regulatory mechanisms that drives Gram-negative bacterial cell envelope expansion.",
      "image" : "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1694117450898-RG5K9AE1D78HLCU02FY2/Screenshot+2023-09-07+at+3.46.10+PM.png",
      "name" : "Nilanjan Som",
      "email" : "nilanjan_som{at}hms.harvard.edu"
   },
   {
      "email" : "tien_nguyen{at}g.harvard.edu",
      "name" : "Tien Nguyen",
      "profile" : "/tien-nguyen",
      "image" : "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1694187388124-T15GTLGXMGLBKI3L31HZ/IMG_6820.jpg",
      "role" : "MCO Graduate Student",
      "bio" : "I am interested in elucidating the regulatory mechanisms of PG hydrolyses required for separation in Eschericia coli. My larger goals are to better understand the spatiotemporal coordination of the bacterial cell envelope for cell division"
   },
   {
      "email" : "dburgin{at}g.harvard.edu",
      "name" : "Dylan Burgin",
      "bio" : "I am interested in studying the mechanisms that contribute to outer membrane integrity in Gram-negative bacteria.",
      "role" : "BBS Graduate Student",
      "image" : "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1718042442897-OA8ERMSFBA950VVYJ6MR/Screenshot+2024-06-10+at+2.00.29%E2%80%AFPM.png",
      "profile" : "/dylan-burgin"
   },
   {
      "name" : "Shailab Shrestha",
      "email" : "shailab_shrestha{at}hms.harvard.edu",
      "role" : "Postdoctoral Fellow | Life Sciences Research Foundation Fellow",
      "bio" : "I am interested in the biogenesis and maintenance of the Gram-negative cell envelope.",
      "image" : "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1718134932686-SJ49CRIK1AN94PN32VQQ/Screenshot+2024-06-11+at+3.42.00%E2%80%AFPM.png",
      "profile" : "/shailab-shrestha"
   },
   {
      "role" : "Postdoctoral Research Fellow | Funded by the Swiss National Science Foundation",
      "bio" : "I work at the intersection of quantitative and fundamental microbiology. In that context, I'm currently implementing CRISPR interference techniques to study cell envelope biogenesis in Corynebacterium glutamicum.",
      "image" : "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1739559732012-M2UO3CUH7CN7UEWSG9ED/20250214_lab2.jpeg",
      "profile" : "/vincentdebakker",
      "name" : "Vincent de Bakker",
      "email" : "vincent_debakker{at}hms.harvard.edu"
   },
   {
      "name" : "Nazgul Sakenova",
      "email" : "nazgul_sakenova{at}hms.harvard.edu",
      "profile" : "/nazgulsakenova",
      "bio" : "I am interested in special protein localization and factors that determine it in Escherichia coli.",
      "role" : "Postdoctoral Fellow | HHWF Fellow",
      "image" : "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1739559794418-P4JOP8A7Y1DMWJK4G658/IMG_3956.jpeg"
   },
   {
      "email" : "josuerodriguez{at}college.harvard.edu",
      "name" : "Abel Rodriguez",
      "role" : "Undergraduate Researcher",
      "bio" : "I am interested in determining novel players in mycolic acid transport.",
      "image" : "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1745615239614-0ZK8CZU200D9EX2MNY97/IMG_2743.jpeg",
      "profile" : "/abel-rodriguez"
   },
   {
      "name" : "Eleanor Rand",
      "email" : "eleanor_rand{at}fas.harvard.edu",
      "profile" : "/eleanorrand",
      "image" : "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1753710971082-GHTM0Q8G52VT1QVSP95Q/EllieHeadShot.JPG",
      "bio" : "I am interested in using phages to learn more about their bacterial hosts. I also lead the Community Phages program (phages.hms.harvard.edu)!",
      "role" : "Postdoctoral Research Fellow | Community Phages Internship Lead Instructor"
   },
   {
      "image" : "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1753711015525-A3BB6YM2L2XPTQZ31MH4/IMG_2325.jpg",
      "role" : "BBS Graduate Student",
      "bio" : "I am interested in mycolic acid transport and regulation in Corynebacterium glutamicum.",
      "profile" : "/ophelialee",
      "email" : "ophelia_lee{at}fas.harvard.edu",
      "name" : "Ophelia Lee"
   },
   {
      "profile" : "/jameswarner",
      "bio" : "I want to understand how the pathogen Staphylococcus aureus coordinates the synthesis of its cell envelope to escape antibiotic killing.",
      "role" : "Postdoctoral Research Fellow",
      "image" : "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1753711049360-LPZZ20HWBRAJ2NRJY5RP/Warner_2025.jpg",
      "email" : "james_warner{at}hms.harvard.edu",
      "name" : "James Warner"
   },
   {
      "email" : "taran_bauer{at}g.harvard.edu",
      "name" : "Taran Bauer",
      "bio" : "I am interested in uncovering the downstream regulatory mechanisms of the envelope stress response and how this relates to lipid transport. My larger goal is to uncover novel functions of the envelope stress signal to characterize how E. coli and other species maintain membrane integrity.",
      "role" : "BBS Graduate Student",
      "image" : "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1757698060384-2J07FRUF9U6A4R8I4204/Screenshot%2B2025-09-12%2Bat%2B1.25.27%25E2%2580%25AFPM.png",
      "profile" : "/taran-bauer"
   }
]
;

const focusByName = {
  "Thomas Bernhardt": { x: 0.43537414965986393, y: 0.40816326530612246 },
  "James Spencer": { x: 0.519332627118644, y: 0.3333333333333333 },
  "Kathy Suarez": { x: 0.564329954954955, y: 0.46258503401360546 },
  "Betsy Hart": { x: 0.5192849099099099, y: 0.4557823129251701 },
  "Johnathan Kepple": { x: 0.5515463917525774, y: 0.41496598639455784 },
  "Wanassa Beroual": { x: 0.4559487951807229, y: 0.41496598639455784 },
  "Anastacia Parks": { x: 0.536697247706422, y: 0.54421768707483 },
  "Tanner DeHart": { x: 0.5, y: 0.5 },
  "Wilaysha Evans": { x: 0.5271899606299213, y: 0.5374149659863946 },
  "Nilanjan Som": { x: 0.7153409090909091, y: 0.4217687074829932 },
  "Tien Nguyen": { x: 0.5511363636363636, y: 0.4965986394557823 },
  "Dylan Burgin": { x: 0.5238636363636363, y: 0.6054421768707483 },
  "Shailab Shrestha": { x: 0.49630681818181815, y: 0.5306122448979592 },
  "Vincent de Bakker": { x: 0.5038265306122449, y: 0.46938775510204084 },
  "Nazgul Sakenova": { x: 0.49362244897959184, y: 0.5986394557823129 },
  "Abel Rodriguez": { x: 0.6420454545454546, y: 0.54421768707483 },
  "Eleanor Rand": { x: 0.54421768707483, y: 0.6454081632653061 },
  "Ophelia Lee": { x: 0.5965909090909091, y: 0.5306122448979592 },
  "James Warner": { x: 0.5, y: 0.5 },
  "Taran Bauer": { x: 0.5050418116465336, y: 0.4489795918367347 }
};

function cleanText(value = "") {
  return String(value)
    .replace(/\u00a0/g, " ")
    .replace(/\u2019/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function toAbsoluteProfile(url = "") {
  return cleanText(url || "");
}

function slugifyName(name = "") {
  return cleanText(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function profileSlug(url = "", name = "") {
  const candidate = toAbsoluteProfile(url).replace(/^https?:\/\/[^/]+/, "");
  const slug = cleanText(candidate).replace(/^\/+|\/+$/g, "");
  return slug || slugifyName(name) || "member";
}

function alumniProfilePath(slug) {
  if (IS_FLAT_BUILD) return `alumni-${slug}.html`;
  return `alumni-profiles/${slug}.html`;
}

function isFeaturedAlumniRoleEligible(role = "") {
  const label = cleanText(role).toLowerCase();
  if (!label) return false;
  if (/undergrad|undergraduate|visiting|visitor|intern|master|masters|other|post-?bacc|postbaccalaureate/.test(label)) {
    return false;
  }
  if (/postdoc|postdoctoral/.test(label)) return true;
  if (/graduate|grad student|bbs|phd/.test(label)) return true;
  if (/staff|technician|research assistant|research associate|lab manager|scientist/.test(label)) return true;
  return false;
}

function buildFeaturedAlumni() {
  if (typeof rawAlumni === "undefined" || typeof verifiedAlumniProfiles === "undefined") {
    return featuredAlumniFallback.filter((entry) => isFeaturedAlumniRoleEligible(entry.roleInLab));
  }

  const byName = new Map();

  rawAlumni.forEach((entry) => {
    const name = cleanText(entry.name || "");
    if (!name) return;

    const existing = byName.get(name) || {};
    const roleInLab = cleanText(entry.role_in_lab || existing.roleInLab || "");
    const currentRole = cleanText(entry.current_role || existing.currentRole || "");
    const labDates = cleanText(entry.lab_dates || existing.labDates || "");
    const sourceLabel = cleanText(entry.source || existing.sourceLabel || "Bernhardt Lab alumni records");

    byName.set(name, {
      name,
      roleInLab,
      currentRole,
      labDates,
      sourceLabel
    });
  });

  const featured = Array.from(byName.values())
    .filter((entry) => isFeaturedAlumniRoleEligible(entry.roleInLab))
    .map((entry) => {
      const verified = verifiedAlumniProfiles[entry.name];
      if (!verified || !verified.url) return null;
      const roleLabel = cleanText(entry.roleInLab || "Former lab member");
      const currentLabel = cleanText(entry.currentRole || "Current role updated via public profile");
      return {
        name: entry.name,
        roleInLab: roleLabel.charAt(0).toUpperCase() + roleLabel.slice(1),
        labDates: cleanText(entry.labDates || ""),
        currentRole: currentLabel,
        source: verified.url,
        sourceLabel: cleanText(verified.source || entry.sourceLabel || "Verified profile"),
        profile: alumniProfilePath(slugifyName(entry.name))
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name));

  return featured.length ? featured : featuredAlumniFallback.filter((entry) => isFeaturedAlumniRoleEligible(entry.roleInLab));
}

function classifyGroup(role, name) {
  const label = `${role} ${name}`.toLowerCase();
  if (label.includes("professor") || label.includes("investigator") || label.includes("principal investigator")) {
    return "Faculty";
  }
  if (label.includes("postdoctoral")) {
    return "Postdoctoral Fellows";
  }
  if (label.includes("undergrad") || label.includes("undergraduate")) {
    return "Undergraduate Researchers";
  }
  if (label.includes("graduate") || label.includes("bbs") || label.includes("bph") || label.includes("mco")) {
    return "Graduate Students";
  }
  return "Research Staff";
}

function prettifyRole(role, name) {
  if (name === "Thomas Bernhardt") {
    return "Principal Investigator | Professor, Department of Microbiology, Harvard Medical School | Howard Hughes Medical Institute";
  }
  if (name === "James Spencer") {
    return "Laboratory Manager | Howard Hughes Medical Institute";
  }
  return role;
}

function landingTileRole(name, group, role) {
  if (name === "Thomas Bernhardt") {
    return "Professor, Department of Microbiology | Howard Hughes Medical Institute";
  }
  if (name === "James Spencer") {
    return "Laboratory Manager | Howard Hughes Medical Institute";
  }
  if (group === "Postdoctoral Fellows") return "Postdoctoral Fellow";
  if (group === "Graduate Students") return cleanText(String(role || "").split("|")[0] || "Graduate Student");
  if (group === "Undergraduate Researchers") return "Undergraduate Researcher";
  if (group === "Research Staff") return "Research Staff";
  return role;
}

function normalizeBio(name, bio) {
  if (name === "Thomas Bernhardt") {
    return "Professor in the Department of Microbiology at Harvard Medical School and affiliated with the Howard Hughes Medical Institute. The lab studies bacterial cell wall assembly, growth, and division to inform antibiotic discovery.";
  }

  return cleanText(bio)
    .replace("gram negative bacteria pseudomonas aeruginosa", "Gram-negative bacterium Pseudomonas aeruginosa")
    .replace("special protein localization", "spatial protein localization")
    .replace("Eschericia", "Escherichia")
    .replace("that drives", "that drive");
}

const people = rawPeople.map((person) => {
  const name = cleanText(person.name || "");
  const role = cleanText(prettifyRole(person.role || "", name));
  const group = classifyGroup(role, name);
  const focus = focusByName[name] || { x: 0.5, y: 0.46 };
  const sourceProfile = toAbsoluteProfile(cleanText(person.profile || ""));
  const slug = profileSlug(sourceProfile, name);
  return {
    name,
    role,
    group,
    tileRole: landingTileRole(name, group, role),
    bio: normalizeBio(name, person.bio || ""),
    email: cleanText(person.email || "").replace(/\{at\}/gi, "@"),
    profile: IS_FLAT_BUILD ? `./${slug}.html` : `./${slug}/`,
    profileSource: sourceProfile,
    slug,
    image: cleanText(person.image || ""),
    focusX: `${(focus.x * 100).toFixed(1)}%`,
    focusY: `${(focus.y * 100).toFixed(1)}%`
  };
});

const groupPriority = ["All", "Faculty", "Postdoctoral Fellows", "Graduate Students", "Undergraduate Researchers", "Research Staff"];

const heroSlides = [
  {
    image: "assets/images/research/cglutamicum-wt-tem-9335.jpg",
    position: "center 42%"
  },
  {
    image: "assets/images/research/fluorescence-envelope.jpg",
    position: "center center"
  },
  {
    image: "assets/images/research/pseudomonas-tem.jpg",
    position: "center center"
  },
  {
    image: "assets/images/research/coryfdaa.png",
    position: "center center"
  },
  {
    image: "assets/images/research/corynebacterium-phage.jpg",
    position: "center center"
  }
];

const state = {
  activeGroup: "All",
  query: "",
  galleryIndex: 0,
  alumniIndex: 0,
  questionIndex: 0,
  researchInMotion: [...researchInMotionFallback.slice(0, RESEARCH_IN_MOTION_TARGET_COUNT)],
  researchInMotionSource: "Packaged fallback set"
};

const navToggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");
const searchInput = document.getElementById("people-search");
const mediaGrid = document.getElementById("media-grid");
const peopleGrid = document.getElementById("people-grid");
const roleFilters = document.getElementById("role-filters");
const peopleCount = document.getElementById("people-count");
const galleryRoot = document.getElementById("gallery-grid");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const researchMotionSourceNote = document.getElementById("research-motion-source-note");
let galleryTimer = null;
let alumniTimer = null;
let revealObserver = null;
let heroTimer = null;
const prefersReducedMotion =
  typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function resolveImagePath(path) {
  const value = String(path || "").trim();
  if (!value) return "";
  if (/^(https?:)?\/\//i.test(value) || value.startsWith("data:")) return value;
  if (!IS_FLAT_BUILD) return value;
  const segments = value.split("/").filter(Boolean);
  return segments[segments.length - 1] || value;
}

function normalizeResearchInMotionItem(item, index = 0) {
  const title = cleanText(item?.title || "").replace(/\.$/, "");
  const caption = cleanText(item?.caption || item?.text || title);
  const image = cleanText(item?.image || "");
  const articleUrl = cleanText(item?.articleUrl || item?.sourceUrl || "");
  const journal = cleanText(item?.journal || "");
  const year = cleanText(item?.year || "");
  const sourceLabel =
    cleanText(item?.sourceLabel || [journal, year].filter(Boolean).join(" · ")) || "Bernhardt Lab publication";

  if (!title || !image || !articleUrl) return null;
  if (/pubmed\.ncbi\.nlm\.nih\.gov|biorxiv\.org|medrxiv\.org/i.test(articleUrl)) return null;

  return {
    pmid: cleanText(item?.pmid || ""),
    doi: cleanText(item?.doi || ""),
    title,
    caption,
    journal,
    year,
    sourceLabel,
    image,
    articleUrl,
    format: cleanText(item?.format || (index === 0 ? "Featured figure" : "Figure"))
  };
}

function normalizeResearchInMotionPayload(payload) {
  const rawItems = Array.isArray(payload) ? payload : payload?.items;
  if (!Array.isArray(rawItems)) return [];

  return rawItems
    .map((item, index) => normalizeResearchInMotionItem(item, index))
    .filter(Boolean)
    .slice(0, RESEARCH_IN_MOTION_TARGET_COUNT);
}

function readResearchInMotionCache() {
  try {
    const raw = window.localStorage.getItem(RESEARCH_IN_MOTION_CACHE_KEY);
    if (!raw) return null;

    const payload = JSON.parse(raw);
    const cachedAt = Number(payload?.cachedAt) || 0;
    const age = Date.now() - cachedAt;
    if (!cachedAt || age < 0 || age > RESEARCH_IN_MOTION_CACHE_MAX_AGE_MS) return null;

    const manifest = payload?.manifest || payload;
    const items = normalizeResearchInMotionPayload(manifest);
    if (items.length < RESEARCH_IN_MOTION_TARGET_COUNT) return null;

    return { items, manifest };
  } catch {
    return null;
  }
}

function writeResearchInMotionCache(manifestPayload) {
  try {
    const items = normalizeResearchInMotionPayload(manifestPayload);
    if (items.length < RESEARCH_IN_MOTION_TARGET_COUNT) return;
    window.localStorage.setItem(
      RESEARCH_IN_MOTION_CACHE_KEY,
      JSON.stringify({
        cachedAt: Date.now(),
        manifest: manifestPayload
      })
    );
  } catch {
    /* no-op */
  }
}

function openLightbox(imageUrl, title) {
  if (typeof lightbox.showModal !== "function") {
    window.open(imageUrl, "_blank", "noreferrer");
    return;
  }

  lightboxImage.src = imageUrl;
  lightboxImage.alt = title;
  lightboxCaption.textContent = title;
  lightbox.showModal();
}

function renderMedia() {
  if (!mediaGrid) return;

  const items = (state.researchInMotion || [])
    .map((item, index) => normalizeResearchInMotionItem(item, index))
    .filter(Boolean)
    .slice(0, RESEARCH_IN_MOTION_TARGET_COUNT);

  if (!items.length) {
    mediaGrid.innerHTML = `
      <article class="media-card reveal">
        <div class="media-card-body">
          <h3>Research in Motion feed is updating</h3>
          <p>Dynamic publication tiles are temporarily unavailable. Please check back shortly.</p>
        </div>
      </article>
    `;
    observeRevealTargets(mediaGrid);
    if (researchMotionSourceNote) {
      researchMotionSourceNote.textContent = "Research in Motion refresh is currently unavailable.";
    }
    return;
  }

  mediaGrid.innerHTML = items
    .map(
      (item, index) => `
      <article class="media-card reveal ${index === 0 ? "featured" : ""}">
        <img src="${escapeHtml(resolveImagePath(item.image))}" alt="${escapeHtml(item.title)}" loading="lazy" />
        <div class="media-card-body">
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.caption || item.title)}</p>
          <div class="media-card-meta">
            <span>${escapeHtml(item.sourceLabel)}</span>
            <a class="media-source" href="${escapeHtml(item.articleUrl)}" target="_blank" rel="noreferrer">Read open-access article</a>
          </div>
        </div>
      </article>
    `
    )
    .join("");
  if (researchMotionSourceNote) {
    researchMotionSourceNote.textContent = state.researchInMotionSource || "Packaged fallback set";
  }
  observeRevealTargets(mediaGrid);
}

function renderResearch() {
  const root = document.getElementById("research-grid");
  if (!root) return;
  root.innerHTML = researchThemes
    .map(
      (theme) => `
      <article class="research-card reveal">
        <img src="${escapeHtml(resolveImagePath(theme.image))}" alt="${escapeHtml(theme.title)}" loading="lazy" />
        <div class="research-card-body">
          <h3>${escapeHtml(theme.title)}</h3>
          <p>${escapeHtml(theme.text)}</p>
          <div class="research-chip-row">${theme.chips.map((chip) => `<span>${escapeHtml(chip)}</span>`).join("")}</div>
        </div>
      </article>
    `
    )
    .join("");
  observeRevealTargets(root);
}

function renderBigQuestions() {
  const root = document.getElementById("question-grid");
  if (!root || !bigQuestions.length) return;

  root.innerHTML = `
    <article class="question-spotlight" aria-live="polite">
      <p class="question-kicker" id="question-kicker">Question 01</p>
      <h4 id="question-title"></h4>
      <p id="question-detail"></p>
      <div class="question-progress" role="presentation">
        <span id="question-progress-fill"></span>
      </div>
      <div class="question-meta">
        <span id="question-counter"></span>
        <span>Active conceptual thread</span>
      </div>
    </article>
    <div class="question-rail" role="listbox" aria-label="Research question selector">
      ${bigQuestions
        .map(
          (item, index) => `
        <button class="question-step${index === state.questionIndex ? " is-active" : ""}" data-index="${index}" type="button" role="option" aria-selected="${index === state.questionIndex ? "true" : "false"}" aria-label="Show question ${index + 1}">
          <span class="question-step-index">Q${index + 1}</span>
          <span class="question-step-title">${escapeHtml(item.title)}</span>
        </button>
      `
        )
        .join("")}
    </div>
  `;

  const prevButton = document.getElementById("question-prev");
  const nextButton = document.getElementById("question-next");
  const toggleButton = document.getElementById("question-toggle");
  const kicker = document.getElementById("question-kicker");
  const title = document.getElementById("question-title");
  const detail = document.getElementById("question-detail");
  const counter = document.getElementById("question-counter");
  const progressFill = document.getElementById("question-progress-fill");
  const questionSteps = root.querySelectorAll(".question-step");
  const rotationMs = 7400;
  let autoRotate = !prefersReducedMotion;
  let progressRaf = null;
  let progressRatio = 0;
  let phaseStart = 0;

  const applyProgress = () => {
    if (!progressFill) return;
    progressFill.style.width = `${(progressRatio * 100).toFixed(1)}%`;
  };

  const setQuestion = (nextIndex) => {
    const total = bigQuestions.length;
    state.questionIndex = (nextIndex + total) % total;
    const active = bigQuestions[state.questionIndex];

    if (kicker) kicker.textContent = `Question ${String(state.questionIndex + 1).padStart(2, "0")}`;
    if (title) title.textContent = active.title;
    if (detail) detail.textContent = active.detail;
    if (counter) counter.textContent = `${state.questionIndex + 1} / ${bigQuestions.length}`;

    questionSteps.forEach((step, index) => {
      const isActive = index === state.questionIndex;
      step.classList.toggle("is-active", isActive);
      step.setAttribute("aria-selected", String(isActive));
    });
  };

  const stopRotation = () => {
    if (progressRaf !== null) {
      cancelAnimationFrame(progressRaf);
      progressRaf = null;
    }
  };

  const tickRotation = (now) => {
    if (!autoRotate || prefersReducedMotion || bigQuestions.length < 2) {
      progressRaf = null;
      return;
    }
    progressRatio = clamp((now - phaseStart) / rotationMs, 0, 1);
    applyProgress();
    if (progressRatio >= 1) {
      setQuestion(state.questionIndex + 1);
      progressRatio = 0;
      phaseStart = now;
      applyProgress();
    }
    progressRaf = requestAnimationFrame(tickRotation);
  };

  const startRotation = (resume = false) => {
    stopRotation();
    if (!autoRotate || prefersReducedMotion || bigQuestions.length < 2) return;
    const now = performance.now();
    phaseStart = resume ? now - progressRatio * rotationMs : now;
    progressRaf = requestAnimationFrame(tickRotation);
  };

  const updateToggle = () => {
    if (!toggleButton) return;
    if (prefersReducedMotion) {
      toggleButton.disabled = true;
      toggleButton.setAttribute("aria-pressed", "true");
      toggleButton.textContent = "Motion off";
      toggleButton.setAttribute(
        "aria-label",
        "Question rotation is off because reduced-motion is enabled in your system settings"
      );
      progressRatio = 1;
      applyProgress();
      return;
    }
    const paused = !autoRotate;
    toggleButton.textContent = paused ? "Resume" : "Pause";
    toggleButton.setAttribute("aria-pressed", String(paused));
    toggleButton.setAttribute("aria-label", paused ? "Resume question rotation" : "Pause question rotation");
  };

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      setQuestion(state.questionIndex - 1);
      progressRatio = 0;
      applyProgress();
      if (autoRotate) startRotation(false);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      setQuestion(state.questionIndex + 1);
      progressRatio = 0;
      applyProgress();
      if (autoRotate) startRotation(false);
    });
  }

  if (toggleButton && !prefersReducedMotion) {
    toggleButton.addEventListener("click", () => {
      autoRotate = !autoRotate;
      updateToggle();
      if (autoRotate) {
        startRotation(true);
      } else {
        stopRotation();
      }
    });
  }

  questionSteps.forEach((step) => {
    const index = Number(step.dataset.index || 0);
    const activate = () => {
      setQuestion(index);
      progressRatio = 0;
      applyProgress();
      if (autoRotate) startRotation(false);
    };
    step.addEventListener("click", activate);
    step.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate();
      }
    });
  });

  root.addEventListener("mouseenter", stopRotation);
  root.addEventListener("mouseleave", () => startRotation(true));
  root.addEventListener("focusin", stopRotation);
  root.addEventListener("focusout", (event) => {
    if (root.contains(event.relatedTarget)) return;
    startRotation(true);
  });

  progressRatio = 0;
  applyProgress();
  updateToggle();
  setQuestion(state.questionIndex);
  startRotation(false);
}

async function refreshResearchInMotion() {
  const fallbackItems = researchInMotionFallback
    .map((item, index) => normalizeResearchInMotionItem(item, index))
    .filter(Boolean)
    .slice(0, RESEARCH_IN_MOTION_TARGET_COUNT);

  state.researchInMotion = fallbackItems;
  state.researchInMotionSource = "Packaged fallback set";
  renderMedia();

  const cached = readResearchInMotionCache();
  if (cached) {
    const stamp = cached.manifest?.generatedAt ? new Date(cached.manifest.generatedAt) : null;
    state.researchInMotion = cached.items;
    state.researchInMotionSource = stamp && Number.isFinite(stamp.getTime())
      ? `Auto-refreshed weekly • Updated ${stamp.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric"
        })}`
      : "Auto-refreshed weekly from Bernhardt last-author open-access papers";
    renderMedia();
  }

  try {
    const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    const timeoutId = controller
      ? window.setTimeout(() => {
          controller.abort();
        }, RESEARCH_IN_MOTION_FETCH_TIMEOUT_MS)
      : null;

    let response;
    try {
      response = await fetch(RESEARCH_IN_MOTION_MANIFEST_URL, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "default",
        signal: controller ? controller.signal : undefined
      });
    } finally {
      if (timeoutId !== null) window.clearTimeout(timeoutId);
    }
    if (!response.ok) throw new Error(`Manifest request failed (${response.status})`);
    const payload = await response.json();
    const normalized = normalizeResearchInMotionPayload(payload);

    if (normalized.length < RESEARCH_IN_MOTION_TARGET_COUNT) {
      throw new Error("Manifest did not provide 12 valid open-access Bernhardt entries.");
    }

    writeResearchInMotionCache(payload);
    state.researchInMotion = normalized;
    const stamp = payload?.generatedAt ? new Date(payload.generatedAt) : null;
    state.researchInMotionSource = stamp && Number.isFinite(stamp.getTime())
      ? `Auto-refreshed weekly • Updated ${stamp.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric"
        })}`
      : "Auto-refreshed weekly from Bernhardt last-author open-access papers";
    renderMedia();
  } catch {
    if (!cached) {
      state.researchInMotion = fallbackItems;
      state.researchInMotionSource = "Packaged fallback set (dynamic refresh unavailable in this browser session)";
      renderMedia();
    }
  }
}

function renderRoleFilters() {
  if (!roleFilters) return;
  const counts = people.reduce((acc, person) => {
    acc[person.group] = (acc[person.group] || 0) + 1;
    return acc;
  }, {});

  const groups = groupPriority.filter((group) => group === "All" || counts[group]);

  roleFilters.innerHTML = groups
    .map((group) => {
      const countLabel = group === "All" ? people.length : counts[group];
      const active = group === state.activeGroup ? "active" : "";
      return `<button class="${active}" type="button" data-group="${escapeHtml(group)}">${escapeHtml(group)} (${countLabel})</button>`;
    })
    .join("");

  roleFilters.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeGroup = button.dataset.group;
      renderRoleFilters();
      renderPeople();
    });
  });
}

function filteredPeople() {
  const query = state.query.trim().toLowerCase();
  return people.filter((person) => {
    const matchesGroup = state.activeGroup === "All" || person.group === state.activeGroup;
    if (!matchesGroup) return false;
    if (!query) return true;
    return `${person.name} ${person.role} ${person.bio} ${person.group}`.toLowerCase().includes(query);
  });
}

function renderPeople() {
  if (!peopleGrid || !peopleCount) return;
  const matches = filteredPeople();

  if (matches.length === 0) {
    peopleGrid.innerHTML = `<div class="people-empty">No matches found. Try a shorter search phrase or choose a different group.</div>`;
    peopleCount.textContent = "0 people shown";
    return;
  }

  peopleGrid.innerHTML = matches
    .map(
      (person, index) => `
      <article class="person-card" style="--index:${index};">
        <div class="person-photo-wrap">
          <img class="person-photo" src="${escapeHtml(person.image)}" alt="${escapeHtml(person.name)}" style="--focus-x:${escapeHtml(person.focusX)};--focus-y:${escapeHtml(person.focusY)};" loading="lazy" />
        </div>
        <div class="person-body">
          <p class="person-role">${escapeHtml(person.tileRole || person.role)}</p>
          <h3>${escapeHtml(person.name)}</h3>
          <p class="person-bio">${escapeHtml(person.bio)}</p>
          <div class="person-links">
            ${person.profile ? `<a class="person-link" href="${escapeHtml(person.profile)}">Profile page</a>` : ""}
          </div>
          ${
            person.email
              ? `<p class="person-email">${escapeHtml(person.email.replace(/\{at\}/gi, "@"))}</p>`
              : ""
          }
        </div>
      </article>
    `
    )
    .join("");

  peopleCount.textContent = `${matches.length} people shown`;
}

function renderGallery() {
  if (!galleryRoot || galleryItems.length === 0) return;

  galleryRoot.innerHTML = `
    <div class="gallery-stage">
      <img
        id="gallery-active-image"
        src=""
        alt=""
        loading="lazy"
        tabindex="0"
        role="button"
        aria-label="Open gallery image in full view"
      />
      <div class="gallery-caption"><p id="gallery-active-caption"></p></div>
    </div>
    <div class="gallery-controls">
      <div class="gallery-dots" id="gallery-dots"></div>
      <div class="gallery-nav-wrap">
        <button class="gallery-nav" type="button" id="gallery-prev">Previous</button>
        <button class="gallery-nav" type="button" id="gallery-next">Next</button>
      </div>
    </div>
  `;

  const activeImage = document.getElementById("gallery-active-image");
  const activeCaption = document.getElementById("gallery-active-caption");
  const dots = document.getElementById("gallery-dots");
  const prev = document.getElementById("gallery-prev");
  const next = document.getElementById("gallery-next");

  dots.innerHTML = galleryItems
    .map((_, index) => `<button class="gallery-dot" type="button" data-index="${index}" aria-label="Go to slide ${index + 1}"></button>`)
    .join("");

  const setSlide = (nextIndex) => {
    const total = galleryItems.length;
    state.galleryIndex = (nextIndex + total) % total;
    const item = galleryItems[state.galleryIndex];
    const resolvedImage = resolveImagePath(item.image);

    activeImage.src = resolvedImage;
    activeImage.alt = item.title;
    activeCaption.textContent = item.title;
    activeImage.dataset.image = resolvedImage;
    activeImage.dataset.title = item.title;
    activeImage.setAttribute("aria-label", `Open ${item.title} in full view`);

    dots.querySelectorAll(".gallery-dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === state.galleryIndex);
    });
  };

  const stopAutoRotate = () => {
    if (galleryTimer) {
      clearInterval(galleryTimer);
      galleryTimer = null;
    }
  };

  const startAutoRotate = () => {
    if (prefersReducedMotion) return;
    stopAutoRotate();
    galleryTimer = setInterval(() => setSlide(state.galleryIndex + 1), 6000);
  };

  prev.addEventListener("click", () => {
    setSlide(state.galleryIndex - 1);
    startAutoRotate();
  });

  next.addEventListener("click", () => {
    setSlide(state.galleryIndex + 1);
    startAutoRotate();
  });

  dots.querySelectorAll(".gallery-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      setSlide(Number(dot.dataset.index));
      startAutoRotate();
    });
  });

  activeImage.addEventListener("click", () => {
    openLightbox(activeImage.dataset.image, activeImage.dataset.title);
  });

  activeImage.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(activeImage.dataset.image, activeImage.dataset.title);
    }
  });

  galleryRoot.addEventListener("mouseenter", stopAutoRotate);
  galleryRoot.addEventListener("mouseleave", startAutoRotate);
  galleryRoot.addEventListener("focusin", stopAutoRotate);
  galleryRoot.addEventListener("focusout", (event) => {
    if (galleryRoot.contains(event.relatedTarget)) return;
    startAutoRotate();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoRotate();
    } else {
      startAutoRotate();
    }
  });
  setSlide(0);
  startAutoRotate();
}

function renderAlumni() {
  const root = document.getElementById("alumni-grid");
  if (!root) return;

  const alumniItems = featuredAlumni
    .map((item) => ({
      ...item,
      profile: cleanText(item.profile || alumniProfilePath(slugifyName(item.name || "")))
    }))
    .filter((item) => item.name);

  if (alumniItems.length === 0) return;

  root.innerHTML = `
    <div class="alumni-rotator reveal">
      <div class="alumni-stage" id="alumni-stage"></div>
      <div class="alumni-controls">
        <div class="alumni-dots" id="alumni-dots"></div>
        <div class="alumni-nav-wrap">
          <button class="alumni-nav" type="button" id="alumni-prev">Previous</button>
          <button class="alumni-nav" type="button" id="alumni-next">Next</button>
        </div>
      </div>
    </div>
  `;

  const stage = document.getElementById("alumni-stage");
  const dots = document.getElementById("alumni-dots");
  const prev = document.getElementById("alumni-prev");
  const next = document.getElementById("alumni-next");

  dots.innerHTML = alumniItems
    .map((_, index) => `<button class="alumni-dot" type="button" data-index="${index}" aria-label="Show alumni profile ${index + 1}"></button>`)
    .join("");

  const setAlumni = (nextIndex) => {
    const total = alumniItems.length;
    state.alumniIndex = (nextIndex + total) % total;
    const item = alumniItems[state.alumniIndex];

    stage.innerHTML = `
      <article class="alumni-item">
        <p class="alumni-role">${escapeHtml(item.roleInLab)}</p>
        <h3>${escapeHtml(item.name)}</h3>
        ${item.labDates ? `<p class="alumni-role">Lab dates: ${escapeHtml(item.labDates)}</p>` : ""}
        <p class="alumni-current">${escapeHtml(item.currentRole)}</p>
        <p class="alumni-source">Source: ${escapeHtml(item.sourceLabel || "Institutional profile")}</p>
        <div class="alumni-link-row">
          ${item.profile ? `<a href="${escapeHtml(item.profile)}">Open alumni profile</a>` : ""}
          ${
            item.source
              ? `<a href="${escapeHtml(item.source)}" target="_blank" rel="noreferrer">Verified institutional profile</a>`
              : ""
          }
        </div>
      </article>
    `;

    dots.querySelectorAll(".alumni-dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === state.alumniIndex);
    });
  };

  const stopAutoRotate = () => {
    if (alumniTimer) {
      clearInterval(alumniTimer);
      alumniTimer = null;
    }
  };

  const startAutoRotate = () => {
    if (prefersReducedMotion) return;
    stopAutoRotate();
    alumniTimer = setInterval(() => setAlumni(state.alumniIndex + 1), 7000);
  };

  prev.addEventListener("click", () => {
    setAlumni(state.alumniIndex - 1);
    startAutoRotate();
  });

  next.addEventListener("click", () => {
    setAlumni(state.alumniIndex + 1);
    startAutoRotate();
  });

  dots.querySelectorAll(".alumni-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      setAlumni(Number(dot.dataset.index));
      startAutoRotate();
    });
  });

  root.addEventListener("mouseenter", stopAutoRotate);
  root.addEventListener("mouseleave", startAutoRotate);
  root.addEventListener("focusin", stopAutoRotate);
  root.addEventListener("focusout", (event) => {
    if (root.contains(event.relatedTarget)) return;
    startAutoRotate();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoRotate();
    } else {
      startAutoRotate();
    }
  });
  setAlumni(0);
  startAutoRotate();
}

function setupNavigation() {
  if (!navToggle || !nav) return;

  const closeNav = () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeNav();
    });
  });

  document.addEventListener("click", (event) => {
    if (!nav.classList.contains("open")) return;
    if (event.target === navToggle || navToggle.contains(event.target) || nav.contains(event.target)) return;
    closeNav();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeNav();
  });
}

function setupSearch() {
  if (!searchInput) return;
  searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderPeople();
  });
}

function setupRevealObserver() {
  if (prefersReducedMotion) {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  observeRevealTargets();
}

function observeRevealTargets(root = document) {
  if (!revealObserver) return;
  root.querySelectorAll(".reveal:not(.is-visible)").forEach((element) => revealObserver.observe(element));
}

function setupScrollDynamics() {
  const root = document.documentElement;
  const getScrollTop = () => window.scrollY || window.pageYOffset || 0;
  const getMaxScroll = () => Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  const applyValues = (scrollValue, velocity = 0) => {
    const maxScroll = getMaxScroll();
    const progress = Math.min(100, Math.max(0, (scrollValue / maxScroll) * 100));
    root.style.setProperty("--scroll-progress", `${progress}%`);
    root.style.setProperty("--scroll-px", `${scrollValue.toFixed(1)}px`);
    root.style.setProperty("--scroll-velocity", `${velocity.toFixed(3)}`);
    root.style.setProperty("--hero-shift", `${Math.min(44, scrollValue * 0.07).toFixed(1)}px`);
    document.body.classList.toggle("is-scrolled", scrollValue > 16);
  };

  if (prefersReducedMotion) {
    const updateStatic = () => {
      const scrollTop = getScrollTop();
      const maxScroll = getMaxScroll();
      const progress = Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100));
      root.style.setProperty("--scroll-progress", `${progress}%`);
      root.style.setProperty("--scroll-px", `${scrollTop.toFixed(1)}px`);
      root.style.setProperty("--scroll-velocity", "0");
      root.style.setProperty("--hero-shift", "0px");
      document.body.classList.toggle("is-scrolled", scrollTop > 16);
    };

    updateStatic();
    window.addEventListener("scroll", updateStatic, { passive: true });
    window.addEventListener("resize", updateStatic);
    return;
  }

  let targetScroll = getScrollTop();
  let easedScroll = targetScroll;
  let rafId = null;

  const renderFrame = () => {
    const delta = targetScroll - easedScroll;
    easedScroll += delta * 0.12;
    if (Math.abs(delta) < 0.1) easedScroll = targetScroll;

    applyValues(easedScroll, delta);

    if (Math.abs(targetScroll - easedScroll) > 0.1) {
      rafId = window.requestAnimationFrame(renderFrame);
    } else {
      rafId = null;
    }
  };

  const requestFrame = () => {
    if (rafId !== null) return;
    rafId = window.requestAnimationFrame(renderFrame);
  };

  const onScroll = () => {
    targetScroll = getScrollTop();
    requestFrame();
  };

  const onResize = () => {
    targetScroll = getScrollTop();
    requestFrame();
  };

  applyValues(targetScroll, 0);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
}

function setupCollaboratorCarousel() {
  const carousel = document.querySelector("[data-collab-carousel]");
  if (!carousel) return;

  const scroller = carousel.querySelector(".collab-showcase");
  const cards = Array.from(carousel.querySelectorAll(".collab-card"));
  const dotsRoot = carousel.querySelector("[data-collab-dots]");
  const prevButton = carousel.querySelector("[data-collab-prev]");
  const nextButton = carousel.querySelector("[data-collab-next]");
  if (!scroller || cards.length === 0) return;

  let activeIndex = 0;
  let autoTimer = null;
  let scrollRaf = null;
  const dots = [];

  const normalizeIndex = (index) => ((index % cards.length) + cards.length) % cards.length;

  const updateState = (index) => {
    activeIndex = normalizeIndex(index);
    cards.forEach((card, cardIndex) => {
      card.classList.toggle("is-active", cardIndex === activeIndex);
    });
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === activeIndex;
      dot.classList.toggle("active", active);
      dot.setAttribute("aria-current", active ? "true" : "false");
    });
  };

  const scrollToIndex = (index) => {
    const targetIndex = normalizeIndex(index);
    const target = cards[targetIndex];
    if (!target) return;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      inline: "start",
      block: "nearest"
    });
    updateState(targetIndex);
  };

  const resolveClosestIndex = () => {
    const leftEdge = scroller.getBoundingClientRect().left;
    let closest = activeIndex;
    let shortestDistance = Number.POSITIVE_INFINITY;
    cards.forEach((card, index) => {
      const distance = Math.abs(card.getBoundingClientRect().left - leftEdge);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        closest = index;
      }
    });
    return closest;
  };

  const stopAuto = () => {
    if (!autoTimer) return;
    clearInterval(autoTimer);
    autoTimer = null;
  };

  const startAuto = () => {
    stopAuto();
    if (prefersReducedMotion || cards.length < 2) return;
    autoTimer = window.setInterval(() => {
      scrollToIndex(activeIndex + 1);
    }, 5200);
  };

  if (dotsRoot) {
    cards.forEach((card, index) => {
      const label = card.querySelector("h3")?.textContent?.trim() || `Collaborator ${index + 1}`;
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "collab-dot";
      dot.setAttribute("aria-label", `Show ${label}`);
      dot.addEventListener("click", () => {
        scrollToIndex(index);
        startAuto();
      });
      dotsRoot.appendChild(dot);
      dots.push(dot);
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      scrollToIndex(activeIndex - 1);
      startAuto();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      scrollToIndex(activeIndex + 1);
      startAuto();
    });
  }

  scroller.addEventListener(
    "scroll",
    () => {
      if (scrollRaf !== null) return;
      scrollRaf = window.requestAnimationFrame(() => {
        scrollRaf = null;
        updateState(resolveClosestIndex());
      });
    },
    { passive: true }
  );

  scroller.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToIndex(activeIndex + 1);
      startAuto();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToIndex(activeIndex - 1);
      startAuto();
    }
  });

  carousel.addEventListener("mouseenter", stopAuto);
  carousel.addEventListener("mouseleave", startAuto);
  carousel.addEventListener("focusin", stopAuto);
  carousel.addEventListener("focusout", (event) => {
    if (carousel.contains(event.relatedTarget)) return;
    startAuto();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAuto();
    } else {
      startAuto();
    }
  });

  updateState(0);
  startAuto();
}

function setupHeroSlideshow() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const layers = hero.querySelectorAll(".hero-slide");
  if (layers.length < 2 || heroSlides.length === 0) return;
  const prevButton = document.getElementById("hero-prev");
  const nextButton = document.getElementById("hero-next");
  const toggleButton = document.getElementById("hero-toggle");
  const toggleIcon = toggleButton ? toggleButton.querySelector(".hero-control-icon") : null;
  const toggleLabel = document.getElementById("hero-toggle-label");

  let activeLayer = 0;
  let activeIndex = 0;
  let autoplayEnabled = !prefersReducedMotion;

  const applySlide = (layer, slideIndex) => {
    const total = heroSlides.length;
    const normalized = ((slideIndex % total) + total) % total;
    const slide = heroSlides[normalized];
    layer.style.backgroundImage = `url("${resolveImagePath(slide.image)}")`;
    layer.style.backgroundPosition = slide.position || "center center";
  };

  const setSlide = (slideIndex) => {
    const total = heroSlides.length;
    const normalized = ((slideIndex % total) + total) % total;
    if (normalized === activeIndex) return;
    const nextLayer = (activeLayer + 1) % layers.length;
    applySlide(layers[nextLayer], normalized);
    layers[nextLayer].classList.add("is-active");
    layers[activeLayer].classList.remove("is-active");
    activeLayer = nextLayer;
    activeIndex = normalized;
  };

  const stopAuto = () => {
    if (!heroTimer) return;
    clearInterval(heroTimer);
    heroTimer = null;
  };

  const startAuto = () => {
    stopAuto();
    if (!autoplayEnabled || prefersReducedMotion || heroSlides.length < 2) return;
    heroTimer = setInterval(() => setSlide(activeIndex + 1), 9000);
  };

  const updateToggle = () => {
    if (!toggleButton) return;
    if (prefersReducedMotion) {
      toggleButton.disabled = true;
      toggleButton.setAttribute("aria-pressed", "true");
      if (toggleIcon) toggleIcon.textContent = "•";
      if (toggleLabel) toggleLabel.textContent = "Motion off";
      toggleButton.setAttribute(
        "aria-label",
        "Background image rotation is off because reduced-motion is enabled in your system settings"
      );
      return;
    }
    const paused = !autoplayEnabled;
    toggleButton.setAttribute("aria-pressed", String(paused));
    if (toggleIcon) toggleIcon.textContent = paused ? "▶" : "⏸";
    if (toggleLabel) toggleLabel.textContent = paused ? "Resume motion" : "Pause motion";
    toggleButton.setAttribute(
      "aria-label",
      paused ? "Resume background image rotation" : "Pause background image rotation"
    );
  };

  applySlide(layers[0], activeIndex);
  layers[0].classList.add("is-active");
  applySlide(layers[1], activeIndex + 1);
  layers[1].classList.remove("is-active");

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      setSlide(activeIndex - 1);
      if (autoplayEnabled) startAuto();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      setSlide(activeIndex + 1);
      if (autoplayEnabled) startAuto();
    });
  }

  if (toggleButton) {
    if (!prefersReducedMotion) {
      toggleButton.addEventListener("click", () => {
        autoplayEnabled = !autoplayEnabled;
        updateToggle();
        if (autoplayEnabled) {
          startAuto();
        } else {
          stopAuto();
        }
      });
    }
  }

  hero.addEventListener("mouseenter", stopAuto);
  hero.addEventListener("mouseleave", startAuto);
  hero.addEventListener("focusin", stopAuto);
  hero.addEventListener("focusout", (event) => {
    if (hero.contains(event.relatedTarget)) return;
    startAuto();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAuto();
    } else {
      startAuto();
    }
  });

  updateToggle();
  startAuto();
}

async function initializePage() {
  renderBigQuestions();
  renderResearch();
  renderMedia();
  renderRoleFilters();
  renderPeople();
  renderGallery();
  renderAlumni();
  setupNavigation();
  setupSearch();
  setupRevealObserver();
  setupScrollDynamics();
  setupCollaboratorCarousel();
  setupHeroSlideshow();
  await refreshResearchInMotion();
}

initializePage();
