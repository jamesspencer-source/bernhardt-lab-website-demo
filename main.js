const researchThemes = [
  {
    title: "Cell wall growth and division-site architecture",
    text:
      "We define how peptidoglycan synthesis, hydrolysis, and division machinery are coordinated so bacteria can grow and split reliably.",
    image: "fluorescence-envelope.jpg",
    chips: ["Cell wall synthesis", "Division", "Peptidoglycan"]
  },
  {
    title: "Envelope stress and membrane integrity",
    text:
      "We investigate how bacteria sense envelope stress and re-balance lipid and cell wall biogenesis to avoid structural failure.",
    image: "pseudomonas-tem.jpg",
    chips: ["Stress signaling", "Outer membrane", "Lipid transport"]
  },
  {
    title: "Species-spanning envelope biology",
    text:
      "The lab compares mechanisms across model and clinically important bacteria to identify conserved principles and species-specific vulnerabilities.",
    image: "species-envelope.png",
    chips: ["E. coli", "P. aeruginosa", "S. aureus", "C. glutamicum", "K. pneumoniae", "A. baumannii"]
  },
  {
    title: "Mechanism to medicine",
    text:
      "By resolving molecular mechanisms behind envelope assembly, we help illuminate targets and concepts for next-generation antibiotics.",
    image: "coryfdaa.png",
    chips: ["Antibiotic targets", "Resistance", "Translational microbiology"]
  }
];

const staticPublications = [
  {
    title:
      "Coupling constraints between the DNA translocase FtsK and septal peptidoglycan synthesis shape the architecture of bacterial division sites",
    journal: "Nature Communications",
    year: "2025",
    takeaway: "Connects chromosome segregation with physical cell wall construction at the division site.",
    url: "https://pubmed.ncbi.nlm.nih.gov/41183199/"
  },
  {
    title:
      "Structure-guided engineering of a broad-spectrum anti-enterohemorrhagic Escherichia coli and anti-Enterobacteriaceae colicin",
    journal: "mBio",
    year: "2025",
    takeaway: "Uses protein engineering to expand antibacterial activity against high-priority Gram-negative pathogens.",
    url: "https://pubmed.ncbi.nlm.nih.gov/41278774/"
  },
  {
    title:
      "The peptidoglycan amidase activator EnvC associates with FtsL to coordinate cell wall synthesis and hydrolysis at the bacterial division site",
    journal: "mBio",
    year: "2025",
    takeaway: "Explains how synthesis and cleavage of cell wall material are synchronized during cytokinesis.",
    url: "https://pubmed.ncbi.nlm.nih.gov/40691462/"
  },
  {
    title:
      "Identification of the LytM-domain factor CsdM and its partner CsdL as novel septal peptidoglycan amidase activators in Corynebacterium glutamicum",
    journal: "mBio",
    year: "2025",
    takeaway: "Finds new regulators of septal wall remodeling in a major Actinobacterial model.",
    url: "https://pubmed.ncbi.nlm.nih.gov/40258142/"
  },
  {
    title: "CryoEM structures reveal how Escherichia coli FtsL and FtsB activate septal peptidoglycan synthesis",
    journal: "Nature Communications",
    year: "2025",
    takeaway: "Provides structural detail for divisome activation logic in E. coli.",
    url: "https://pubmed.ncbi.nlm.nih.gov/40236067/"
  },
  {
    title: "Folding-ribosome interactions reveal design principles for inner membrane protein sequences in prokaryotes",
    journal: "Molecular Cell",
    year: "2025",
    takeaway: "Defines sequence-level constraints that shape membrane protein biogenesis in bacteria.",
    url: "https://pubmed.ncbi.nlm.nih.gov/40126103/"
  },
  {
    title:
      "The lytic transglycosylase MltG suppresses a hybrid peptidoglycan synthesis assembly at the Escherichia coli division site",
    journal: "Nature Microbiology",
    year: "2025",
    takeaway: "Shows how MltG limits aberrant assembly states during septal wall synthesis.",
    url: "https://pubmed.ncbi.nlm.nih.gov/39992125/"
  },
  {
    title: "An essential polymerase module in the Staphylococcus aureus peptidoglycan synthase PBP2",
    journal: "mBio",
    year: "2024",
    takeaway: "Dissects a critical S. aureus wall-building module linked to antimicrobial susceptibility.",
    url: "https://pubmed.ncbi.nlm.nih.gov/39869797/"
  },
  {
    title: "Cell wall synthesis and remodeling dynamics determine division site architecture in Staphylococcus aureus",
    journal: "Nature Microbiology",
    year: "2022",
    takeaway: "Maps how synthesis and remodeling dynamics shape where and how S. aureus divides.",
    url: "https://pubmed.ncbi.nlm.nih.gov/35821058/"
  },
  {
    title:
      "An essential membrane protein modulates the proteolysis of LpxC to control lipopolysaccharide synthesis in Escherichia coli",
    journal: "eLife",
    year: "2019",
    takeaway: "Reveals a regulatory checkpoint linking membrane protein control to outer-membrane biogenesis.",
    url: "https://pubmed.ncbi.nlm.nih.gov/30975061/"
  }
];

const mediaHighlights = [
  {
    title: "Live-cell movie: MreB-associated envelope dynamics",
    text: "Live-cell envelope dynamics.",
    image: "mreb-trackmate.gif",
    sourceLabel: "In-lab movie asset",
    sourceUrl: "research-library.html#mreb-trackmate",
    format: "Movie"
  },
  {
    title: "Division-site architecture during constriction",
    text: "Division-site fluorescence architecture.",
    image: "nmicro2022-divisome-fluorescence.jpg",
    sourceLabel: "Nature Microbiology 2022 (open access)",
    sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9519445/"
  },
  {
    title: "Time-lapse envelope insertion series",
    text: "Time-lapse envelope insertion sequence.",
    image: "nmicro2022-timelapse-rods.jpg",
    sourceLabel: "Nature Microbiology 2022 supplementary movies",
    sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9519445/#Sec42",
    format: "Movie"
  },
  {
    title: "Cryo-ET and cryo-FIB workflow for envelope ultrastructure",
    text: "Cryo-ET and cryo-FIB pipeline views.",
    image: "nmicro2022-cryo-tomography.jpg",
    sourceLabel: "Nature Microbiology 2022 extended data",
    sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9519445/"
  },
  {
    title: "Transmission electron microscopy of Pseudomonas aeruginosa",
    text: "Transmission electron microscopy view.",
    image: "pseudomonas-tem.jpg",
    sourceLabel: "In-lab microscopy asset",
    sourceUrl: "research-library.html#pseudomonas-tem"
  },
  {
    title: "Fluorescence pulse-labeling in Corynebacterium glutamicum",
    text: "Fluorescent D-amino acid pulse labeling.",
    image: "coryfdaa.png",
    sourceLabel: "In-lab microscopy asset",
    sourceUrl: "research-library.html#coryfdaa"
  },
  {
    title: "Corynebacterium-phage plaque morphology",
    text: "Phage plaque morphology.",
    image: "corynebacterium-phage.jpg",
    sourceLabel: "In-lab imaging asset",
    sourceUrl: "research-library.html#corynebacterium-phage"
  },
  {
    title: "FacZ and peptidoglycan spatial patterning in S. aureus",
    text: "S. aureus microscopy panel.",
    image: "mbio2023saur-facz-pg.jpg",
    sourceLabel: "mBio 2023 (open access)",
    sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10168275/"
  },
  {
    title: "PcdA localization across division states",
    text: "PcdA localization states.",
    image: "mbio2023-pcda-localization.jpg",
    sourceLabel: "mBio 2023 (open access)",
    sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10602043/"
  },
  {
    title: "Divisome-associated localization maps",
    text: "Divisome localization maps.",
    image: "mbio2023-division-maps.jpg",
    sourceLabel: "mBio 2023 (open access)",
    sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10602043/"
  },
  {
    title: "Envelope phenotypes across bacterial species",
    text: "Comparative envelope phenotypes.",
    image: "species-envelope.png",
    sourceLabel: "In-lab microscopy asset",
    sourceUrl: "research-library.html#species-envelope"
  },
  {
    title: "Mosaic colony phenotypes in plasmid-loss screens",
    text: "Colony phenotypes from genetics screens.",
    image: "fluorescence-envelope.jpg",
    sourceLabel: "In-lab research image",
    sourceUrl: "research-library.html#fluorescence-envelope"
  }
];

const galleryItems = [
  {
    title: "2017 Halloween Pumpkin",
    image:
      "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1519156145666-U4H8RCA93NWXYOOV7QL9/IMG_20171027_163243.jpg"
  },
  {
    title: "Departmental Halloween Party 2017",
    image:
      "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1519156170494-GRRLT91VLARX1R6RWD6B/IMG_20171027_165714.jpg"
  },
  {
    title: "Bernhardt Lab Happy Hour 2017",
    image:
      "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1519148047941-VHYO4D7CY0ESZ2EF66E9/BernhardtBeerHour.png"
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
    title: "Rose tasting",
    image:
      "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1548175776661-WJ9SBNWFXJR5YQNAJB3X/IMG_0930.jpg"
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
    source: "https://mib.uga.edu/directory/people/kate-hummels",
    sourceLabel: "University of Georgia"
  },
  {
    name: "Thomas Bartlett",
    roleInLab: "Former postdoctoral fellow",
    currentRole: "Principal Investigator and Senior Staff Scientist, Wadsworth Center",
    source: "https://www.wadsworth.org/senior-staff/thomas-bartlett",
    sourceLabel: "Wadsworth Center"
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
    currentRole: "Assistant Professor, Interdepartmental Microbiology Graduate Program, Iowa State University",
    source: "https://www.micrograd.iastate.edu/people/nicholas-peters",
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
    source: "https://nusgs.nus.edu.sg/thesis-advisors/miclts/",
    sourceLabel: "National University of Singapore"
  },
  {
    name: "Neil Greene",
    roleInLab: "Former postdoctoral fellow",
    currentRole: "Clinical Associate Professor and Program Director, University of Rhode Island",
    source: "https://web.uri.edu/mls/meet/neil-greene/",
    sourceLabel: "University of Rhode Island"
  },
  {
    name: "Derek Lau",
    roleInLab: "Former postdoctoral fellow",
    currentRole: "Lecturer in Residence, Department of Biology, Emmanuel College",
    source: "https://www.emmanuel.edu/faculty-and-staff/derek-lau",
    sourceLabel: "Emmanuel College"
  }
];

const featuredAlumni = buildFeaturedAlumni();

const rawPeople = [
   {
      "profile" : "/thomas-bernhardt",
      "bio" : "The Bernhardt lab studies molecular mechanisms of bacterial growth and cell wall assembly to inform antibiotic discovery.",
      "role" : "Professor, Department of Microbiology | Investigator, Howard Hughes Medical Institute",
      "image" : "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1484845930851-CZKAGRIPRLNCPA9IF43Q/DSC_0104.JPG",
      "email" : "",
      "name" : "Thomas Bernhardt"
   },
   {
      "image" : "https://images.squarespace-cdn.com/content/v1/569e68a1e0327c41cdab78de/1553173916977-5MWVESOJ7KKQ89GK4ORT/James_spencer.jpg",
      "bio" : "As the lab manager, I am responsible for managing every aspect of lab operations, capital projects, and administration for a dynamic team of research technicians, graduate students,  postdoctoral trainees, and visiting scholars.",
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
      "role" : "BBS Graduate Student",
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
      "role" : "Graduate Student",
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
  return `alumni-${slug}.html`;
}

function buildFeaturedAlumni() {
  if (typeof rawAlumni === "undefined" || typeof verifiedAlumniProfiles === "undefined") {
    return featuredAlumniFallback;
  }

  const byName = new Map();

  rawAlumni.forEach((entry) => {
    const name = cleanText(entry.name || "");
    if (!name) return;

    const existing = byName.get(name) || {};
    const roleInLab = cleanText(entry.role_in_lab || existing.roleInLab || "");
    const currentRole = cleanText(entry.current_role || existing.currentRole || "");
    const sourceLabel = cleanText(entry.source || existing.sourceLabel || "Bernhardt Lab alumni records");

    byName.set(name, {
      name,
      roleInLab,
      currentRole,
      sourceLabel
    });
  });

  const featured = Array.from(byName.values())
    .map((entry) => {
      const verified = verifiedAlumniProfiles[entry.name];
      if (!verified || !verified.url) return null;
      const roleLabel = cleanText(entry.roleInLab || "Former lab member");
      const currentLabel = cleanText(entry.currentRole || "Current role updated via public profile");
      return {
        name: entry.name,
        roleInLab: roleLabel.charAt(0).toUpperCase() + roleLabel.slice(1),
        currentRole: currentLabel,
        source: verified.url,
        sourceLabel: cleanText(verified.source || entry.sourceLabel || "Verified profile"),
        profile: alumniProfilePath(slugifyName(entry.name))
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name));

  return featured.length ? featured : featuredAlumniFallback;
}

function classifyGroup(role, name) {
  const label = `${role} ${name}`.toLowerCase();
  if (label.includes("professor") || label.includes("investigator") || label.includes("principal investigator")) {
    return "Faculty";
  }
  if (label.includes("postdoctoral")) {
    return "Postdoctoral Fellows";
  }
  if (label.includes("graduate") || label.includes("bbs") || label.includes("bph") || label.includes("mco")) {
    return "Graduate Students";
  }
  if (label.includes("undergraduate")) {
    return "Undergraduate Researchers";
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
  const focus = focusByName[name] || { x: 0.5, y: 0.46 };
  const sourceProfile = toAbsoluteProfile(cleanText(person.profile || ""));
  const slug = profileSlug(sourceProfile, name);
  return {
    name,
    role,
    group: classifyGroup(role, name),
    bio: normalizeBio(name, person.bio || ""),
    email: cleanText(person.email || "").replace(/\{at\}/gi, "@"),
    profile: `${slug}.html`,
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
    image: "fluorescence-envelope.jpg",
    position: "center center"
  },
  {
    image: "pseudomonas-tem.jpg",
    position: "center center"
  },
  {
    image: "species-envelope.png",
    position: "center center"
  },
  {
    image: "corynebacterium-phage.jpg",
    position: "center center"
  }
];

const state = {
  activeGroup: "All",
  query: "",
  galleryIndex: 0,
  alumniIndex: 0,
  showAllPublications: false,
  publications: [...staticPublications],
  publicationsSource: "Curated selection"
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
const publicationSourceNote = document.getElementById("publications-source-note");
let galleryTimer = null;
let alumniTimer = null;
let revealObserver = null;
let heroTimer = null;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
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

  mediaGrid.innerHTML = mediaHighlights
    .map(
      (item, index) => `
      <article class="media-card reveal ${index === 0 ? "featured" : ""}">
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy" />
        <div class="media-card-body">
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.text)}</p>
          <div class="media-card-meta">
            <span>${escapeHtml(item.format || (item.image.toLowerCase().includes(".gif") ? "Movie" : "Image"))}</span>
            <a class="media-source" href="${escapeHtml(item.sourceUrl)}" target="_blank" rel="noreferrer">${escapeHtml(item.sourceLabel)}</a>
          </div>
        </div>
      </article>
    `
    )
    .join("");
  observeRevealTargets(mediaGrid);
}

function renderResearch() {
  const root = document.getElementById("research-grid");
  root.innerHTML = researchThemes
    .map(
      (theme) => `
      <article class="research-card reveal">
        <img src="${escapeHtml(theme.image)}" alt="${escapeHtml(theme.title)}" loading="lazy" />
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

function renderPublications() {
  const root = document.getElementById("publication-list");
  const previewCount = 6;
  const publicationItems = state.publications.length ? state.publications : staticPublications;
  const items = state.showAllPublications ? publicationItems : publicationItems.slice(0, previewCount);

  root.innerHTML = items
    .map(
      (item) => `
      <article class="publication-item reveal">
        <a href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer"><h3>${escapeHtml(item.title)}</h3></a>
        <div class="publication-meta">
          <span>${escapeHtml(item.journal)}</span>
          <span>${escapeHtml(item.year)}</span>
        </div>
        ${item.takeaway ? `<p>${escapeHtml(item.takeaway)}</p>` : ""}
      </article>
    `
    )
    .join("");
  observeRevealTargets(root);

  const toggle = document.getElementById("publications-toggle");
  if (!toggle) return;

  const hasOverflow = publicationItems.length > previewCount;
  toggle.hidden = !hasOverflow;
  toggle.setAttribute("aria-expanded", String(state.showAllPublications));
  toggle.textContent = state.showAllPublications
    ? "Collapse publication list"
    : `Expand publication list (${publicationItems.length - previewCount} more)`;

  if (publicationSourceNote) {
    publicationSourceNote.textContent = state.publicationsSource;
  }
}

function setupPublicationToggle() {
  const toggle = document.getElementById("publications-toggle");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    state.showAllPublications = !state.showAllPublications;
    renderPublications();
  });
}

function parsePublicationYear(value = "") {
  const match = String(value).match(/(19|20)\d{2}/);
  return match ? match[0] : "";
}

async function fetchPubmedPublications() {
  const term = encodeURIComponent("Bernhardt TG[Author]");
  const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&retmax=18&sort=pub+date&term=${term}`;
  const searchResponse = await fetch(searchUrl, { headers: { Accept: "application/json" } });
  if (!searchResponse.ok) throw new Error(`PubMed search failed: ${searchResponse.status}`);

  const searchJson = await searchResponse.json();
  const ids = (searchJson?.esearchresult?.idlist || []).filter(Boolean).slice(0, 18);
  if (ids.length === 0) return [];

  const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=${ids.join(",")}`;
  const summaryResponse = await fetch(summaryUrl, { headers: { Accept: "application/json" } });
  if (!summaryResponse.ok) throw new Error(`PubMed summary failed: ${summaryResponse.status}`);

  const summaryJson = await summaryResponse.json();
  return ids
    .map((id) => summaryJson?.result?.[id])
    .filter(Boolean)
    .map((item) => {
      const title = cleanText(item.title || "");
      return {
        title: title.replace(/\.$/, ""),
        journal: cleanText(item.fulljournalname || item.source || "PubMed"),
        year: parsePublicationYear(item.pubdate || item.sortpubdate || ""),
        takeaway: "",
        url: `https://pubmed.ncbi.nlm.nih.gov/${item.uid || item.articleids?.[0]?.value || ""}/`
      };
    })
    .filter((item) => item.title && item.url.includes("pubmed.ncbi.nlm.nih.gov/"));
}

async function refreshPublicationsFromPubMed() {
  try {
    const items = await fetchPubmedPublications();
    if (!items.length) return;
    state.publications = items;
    state.publicationsSource = "Auto-updated from PubMed (Bernhardt TG author feed)";
    renderPublications();
  } catch (error) {
    state.publications = [...staticPublications];
    state.publicationsSource = "Curated selection (auto-refresh unavailable in this browser session)";
    renderPublications();
  }
}

function renderRoleFilters() {
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
          <p class="person-role">${escapeHtml(person.role)}</p>
          <h3>${escapeHtml(person.name)}</h3>
          <p class="person-bio">${escapeHtml(person.bio)}</p>
          <div class="person-links">
            ${person.profile ? `<a class="person-link" href="${escapeHtml(person.profile)}" target="_blank" rel="noreferrer">Profile page</a>` : ""}
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
      <img id="gallery-active-image" src="" alt="" loading="lazy" />
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

    activeImage.src = item.image;
    activeImage.alt = item.title;
    activeCaption.textContent = item.title;
    activeImage.dataset.image = item.image;
    activeImage.dataset.title = item.title;

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

  galleryRoot.addEventListener("mouseenter", stopAutoRotate);
  galleryRoot.addEventListener("mouseleave", startAutoRotate);
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
  searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderPeople();
  });
}

function setupRevealObserver() {
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
  let ticking = false;

  const update = () => {
    const scrollTop = window.scrollY || window.pageYOffset || 0;
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100));
    root.style.setProperty("--scroll-progress", `${progress}%`);
    root.style.setProperty("--hero-shift", `${Math.min(32, scrollTop * 0.06).toFixed(1)}px`);
    document.body.classList.toggle("is-scrolled", scrollTop > 16);
    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
}

function setupHeroSlideshow() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const layers = hero.querySelectorAll(".hero-slide");
  if (layers.length < 2 || heroSlides.length === 0) return;

  let activeLayer = 0;
  let activeIndex = 0;

  const applySlide = (layer, slideIndex) => {
    const slide = heroSlides[slideIndex % heroSlides.length];
    layer.style.backgroundImage = `url("${slide.image}")`;
    layer.style.backgroundPosition = slide.position || "center center";
  };

  applySlide(layers[0], activeIndex);
  applySlide(layers[1], activeIndex + 1);

  const advance = () => {
    const nextLayer = (activeLayer + 1) % layers.length;
    activeIndex = (activeIndex + 1) % heroSlides.length;
    applySlide(layers[nextLayer], activeIndex);
    layers[nextLayer].classList.add("is-active");
    layers[activeLayer].classList.remove("is-active");
    activeLayer = nextLayer;
  };

  if (heroTimer) clearInterval(heroTimer);
  heroTimer = setInterval(advance, 6500);
}

async function initializePage() {
  renderResearch();
  renderMedia();
  renderPublications();
  setupPublicationToggle();
  renderRoleFilters();
  renderPeople();
  renderGallery();
  renderAlumni();
  setupNavigation();
  setupSearch();
  setupRevealObserver();
  setupScrollDynamics();
  setupHeroSlideshow();
  await refreshPublicationsFromPubMed();
}

initializePage();
