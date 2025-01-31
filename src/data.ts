import { StreamInfo } from './types';

export const streamData: Record<string, StreamInfo> = {
  'science-maths': {
    name: 'Science with Mathematics',
    description: 'Perfect for students interested in engineering, technology, and quantitative fields.',
    careers: [
      {
        title: 'Engineering',
        description: 'Design and build innovative solutions in various fields like computer science, mechanical, or electrical engineering.',
        requirements: ['Class XII with PCM', 'JEE Main/Advanced', 'Strong analytical skills'],
        colleges: ['IIT Delhi', 'BITS Pilani', 'NIT Trichy'],
        scope: 'Excellent job prospects in India and abroad with opportunities in tech companies, manufacturing, and research.'
      },
      {
        title: 'Data Science',
        description: 'Analyze complex data sets to help organizations make better decisions.',
        requirements: ['Strong mathematics background', 'Programming skills', 'Statistical knowledge'],
        colleges: ['IIT Madras', 'ISI Kolkata', 'IIIT Bangalore'],
        scope: 'Growing field with opportunities in tech, finance, and consulting sectors.'
      },
      {
        title: 'Architecture',
        description: 'Design buildings and spaces that combine aesthetics with functionality.',
        requirements: ['Class XII with PCM', 'NATA/JEE Paper 2', 'Creative skills'],
        colleges: ['SPA Delhi', 'CEPT Ahmedabad', 'IIT Roorkee'],
        scope: 'Growing opportunities in urban development, sustainable design, and international projects.'
      },
      {
        title: 'Actuarial Science',
        description: 'Apply mathematical and statistical methods to assess risk in insurance, finance, and other industries.',
        requirements: ['Strong mathematics background', 'Statistical analysis skills', 'Actuarial exams'],
        colleges: ['Institute of Actuaries of India', 'BIM Trichy', 'Christ University'],
        scope: 'High demand in insurance companies, investment firms, and consulting organizations.'
      },
      {
        title: 'Aerospace Engineering',
        description: 'Design and develop aircraft, spacecraft, and related systems.',
        requirements: ['Class XII with PCM', 'JEE Advanced', 'Strong physics concepts'],
        colleges: ['IIT Bombay', 'IIT Kanpur', 'IIST Thiruvananthapuram'],
        scope: 'Opportunities in aviation, space research, and defense sectors.'
      }
    ]
  },
  'science-bio': {
    name: 'Science with Biology',
    description: 'Ideal for students passionate about healthcare, life sciences, and research.',
    careers: [
      {
        title: 'Medicine (MBBS)',
        description: 'Become a medical doctor and help treat patients.',
        requirements: ['Class XII with PCB', 'NEET qualification', 'Strong academic record'],
        colleges: ['AIIMS Delhi', 'CMC Vellore', 'JIPMER'],
        scope: 'High demand for medical professionals both in India and internationally.'
      },
      {
        title: 'Biotechnology',
        description: 'Work on biological research and development.',
        requirements: ['Class XII with PCB', 'Good understanding of life sciences'],
        colleges: ['IIT Kharagpur', 'Anna University', 'VIT Vellore'],
        scope: 'Opportunities in pharmaceutical companies, research institutions, and biotech startups.'
      },
      {
        title: 'Dentistry (BDS)',
        description: 'Specialize in oral health and dental care.',
        requirements: ['Class XII with PCB', 'NEET qualification', 'Manual dexterity'],
        colleges: ['Maulana Azad Delhi', 'Manipal CDC', 'SRM Dental College'],
        scope: 'Growing demand for dental specialists in private practice and healthcare institutions.'
      },
      {
        title: 'Veterinary Science',
        description: 'Provide medical care for animals and contribute to animal health research.',
        requirements: ['Class XII with PCB', 'NEET qualification', 'Love for animals'],
        colleges: ['IVRI Bareilly', 'Madras Veterinary College', 'GADVASU'],
        scope: 'Opportunities in pet care, livestock management, and wildlife conservation.'
      },
      {
        title: 'Pharmacy',
        description: 'Research, develop, and ensure the safe use of medications.',
        requirements: ['Class XII with PCB', 'GPAT for higher studies', 'Chemistry knowledge'],
        colleges: ['NIPER Mohali', 'ICT Mumbai', 'Manipal College of Pharmaceutical Sciences'],
        scope: 'Career options in pharmaceutical industry, research, and healthcare settings.'
      }
    ]
  },
  'commerce': {
    name: 'Commerce',
    description: 'For students interested in business, finance, and entrepreneurship.',
    careers: [
      {
        title: 'Chartered Accountancy',
        description: 'Become a financial expert and advisor.',
        requirements: ['Commerce in XII', 'CA Foundation', 'Strong numerical ability'],
        colleges: ['ICAI Registration Required'],
        scope: 'Excellent prospects in corporate finance, taxation, and private practice.'
      },
      {
        title: 'Business Management',
        description: 'Learn to manage organizations and business operations.',
        requirements: ['Any XII stream', 'CAT/XAT/MAT scores'],
        colleges: ['IIM Ahmedabad', 'XLRI Jamshedpur', 'FMS Delhi'],
        scope: 'Wide range of opportunities in corporate sector, consulting, and entrepreneurship.'
      },
      {
        title: 'Company Secretary',
        description: 'Ensure corporate governance and regulatory compliance.',
        requirements: ['Commerce background preferred', 'ICSI registration', 'Legal knowledge'],
        colleges: ['ICSI Registration Required'],
        scope: 'High demand in corporate sector for compliance and governance roles.'
      },
      {
        title: 'Investment Banking',
        description: 'Help organizations raise capital and manage financial transactions.',
        requirements: ['Strong analytical skills', 'Financial modeling knowledge', 'MBA preferred'],
        colleges: ['IIM Calcutta', 'ISB Hyderabad', 'JBIMS Mumbai'],
        scope: 'Lucrative opportunities in investment banks, PE firms, and financial institutions.'
      },
      {
        title: 'Digital Marketing',
        description: 'Plan and execute digital marketing strategies.',
        requirements: ['Marketing knowledge', 'Digital tools proficiency', 'Creative thinking'],
        colleges: ['MICA Ahmedabad', 'SIMC Pune', 'IIMB Digital Marketing'],
        scope: 'Growing demand across industries for digital marketing expertise.'
      }
    ]
  },
  'arts': {
    name: 'Arts',
    description: 'For creative minds interested in humanities, social sciences, and liberal arts.',
    careers: [
      {
        title: 'Law',
        description: 'Practice law and provide legal counsel.',
        requirements: ['Any XII stream', 'CLAT/LSAT scores'],
        colleges: ['NLSIU Bangalore', 'NALSAR Hyderabad', 'NLU Delhi'],
        scope: 'Opportunities in corporate law, litigation, and public service.'
      },
      {
        title: 'Mass Communication',
        description: 'Work in media, journalism, and communication.',
        requirements: ['Good communication skills', 'Creative thinking'],
        colleges: ['IIMC Delhi', 'Symbiosis Pune', 'ACJ Chennai'],
        scope: 'Career options in journalism, PR, digital media, and content creation.'
      },
      {
        title: 'Psychology',
        description: 'Study human behavior and provide mental health support.',
        requirements: ['Understanding of human behavior', 'Empathy', 'Research skills'],
        colleges: ['Christ University', 'TISS Mumbai', 'Ashoka University'],
        scope: 'Growing demand for mental health professionals and counselors.'
      },
      {
        title: 'Foreign Languages',
        description: 'Become a language specialist for international communication.',
        requirements: ['Language aptitude', 'Cultural awareness', 'Communication skills'],
        colleges: ['JNU Delhi', 'BHU Varanasi', 'EFLU Hyderabad'],
        scope: 'Opportunities in translation, interpretation, and international organizations.'
      },
      {
        title: 'Hotel Management',
        description: 'Manage hospitality operations and guest services.',
        requirements: ['Good communication', 'Customer service orientation', 'Management skills'],
        colleges: ['IHM Mumbai', 'WGSHA Manipal', 'IHM Aurangabad'],
        scope: 'Global opportunities in hospitality, tourism, and service industry.'
      }
    ]
  }
};