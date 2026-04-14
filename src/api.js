// No backend needed — all data served from local static files
import { allMatches } from './data/careers';

const staticCategories = [
  { id: 1, name: 'Engineering',     icon: 'Code',       color: 'bg-blue-100 text-blue-600',    slug: 'engineering' },
  { id: 2, name: 'Medical',         icon: 'Heart',      color: 'bg-pink-100 text-pink-600',    slug: 'medical' },
  { id: 3, name: 'Government Jobs', icon: 'Grid',       color: 'bg-emerald-100 text-emerald-700', slug: 'government-jobs' },
  { id: 4, name: 'Creative',        icon: 'Palette',    color: 'bg-orange-100 text-orange-600',slug: 'creative' },
  { id: 5, name: 'Business',        icon: 'Briefcase',  color: 'bg-purple-100 text-purple-600',slug: 'business' },
  { id: 6, name: 'Skill-based',     icon: 'TrendingUp', color: 'bg-indigo-100 text-indigo-600',slug: 'skill-based' },
];

const staticFeatured = [
  {
    title: 'Software Engineer',
    description: 'Design, build, and maintain powerful applications using modern programming languages and frameworks.',
    salary: '₹4–18 LPA',
    demand_level: 'Very High',
    icon: 'Code',
    slug: 'software-engineer',
  },
  {
    title: 'AI/ML Engineer',
    description: 'Build intelligent systems that learn from data to automate decisions and predictions at scale.',
    salary: '₹6–25 LPA',
    demand_level: 'Very High',
    icon: 'Code',
    slug: 'ai-ml-engineer',
  },
  {
    title: 'UI/UX Designer',
    description: 'Create user-friendly digital interfaces and seamless experiences for apps and websites.',
    salary: '₹4–20 LPA',
    demand_level: 'High',
    icon: 'Palette',
    slug: 'ui-ux-designer',
  },
];

export const fetchCategories = async () => staticCategories;

export const fetchFeaturedCareers = async () => staticFeatured;

export const fetchCareers = async () => allMatches;

export const fetchCareerDetail = async (slug) =>
  allMatches.find(c => c.id === slug) || null;
