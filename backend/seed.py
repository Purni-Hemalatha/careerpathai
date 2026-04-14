import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_project.settings')
django.setup()

from api.models import Category, Career, RoadmapStep

def seed_db():
    print("Deleting current data...")
    Category.objects.all().delete()
    Career.objects.all().delete()
    RoadmapStep.objects.all().delete()

    print("Creating categories...")
    categories = [
        {'name': 'Engineering', 'icon': 'Code', 'color': 'bg-blue-50 text-blue-500', 'slug': 'engineering'},
        {'name': 'Medical', 'icon': 'Heart', 'color': 'bg-pink-50 text-pink-500', 'slug': 'medical'},
        {'name': 'Government Jobs', 'icon': 'Grid', 'color': 'bg-emerald-50 text-emerald-500', 'slug': 'government-jobs'},
        {'name': 'Creative', 'icon': 'Palette', 'color': 'bg-purple-50 text-purple-500', 'slug': 'creative'},
        {'name': 'Business', 'icon': 'Briefcase', 'color': 'bg-orange-50 text-orange-500', 'slug': 'business'},
        {'name': 'Skill-based', 'icon': 'TrendingUp', 'color': 'bg-indigo-50 text-indigo-500', 'slug': 'skill-based'},
    ]

    cat_objs = {}
    for cat in categories:
        obj = Category.objects.create(**cat)
        cat_objs[cat['slug']] = obj

    print("Creating careers...")
    careers = [
        {
            'title': 'Software Developer',
            'description': 'Software developers design, build, and maintain applications and software systems. They work with various programming languages to create solutions for users and businesses.',
            'salary': '₹4-15 LPA',
            'demand_level': 'Very High Demand',
            'match_percentage': 95,
            'category': cat_objs['engineering'],
            'slug': 'software-developer',
            'skills': ['Python', 'JavaScript', 'React', 'Node.js', 'Git', 'Problem Solving', 'Algorithms'],
            'is_featured': True,
            'recommended': True
        },
        {
            'title': 'Data Scientist',
            'description': 'Analyze large amounts of data to find patterns and build AI/ML models to help businesses make informed decisions.',
            'salary': '₹6-20 LPA',
            'demand_level': 'High Demand',
            'match_percentage': 88,
            'category': cat_objs['engineering'],
            'slug': 'data-scientist',
            'is_featured': True
        },
        {
            'title': 'UI/UX Designer',
            'description': 'Design user-friendly interfaces and experiences for websites and mobile applications that are both beautiful and functional.',
            'salary': '₹3-12 LPA',
            'demand_level': 'High Demand',
            'match_percentage': 82,
            'category': cat_objs['creative'],
            'slug': 'ui-ux-designer',
            'is_featured': True,
            'skills': ['Figma', 'Sketch', 'Adobe XD', 'HCI', 'Typography']
        }
    ]

    for career in careers:
        career_obj = Career.objects.create(**career)
        
        # Adding some roadmap steps for software developer
        if career['slug'] == 'software-developer':
            roadmap = [
                {'phase': 'BEGINNER', 'label': 'Learn Programming Basics', 'description': 'Start with Python or JavaScript', 'order': 1, 'icon': 'BookOpen', 'timeline': '0-6 months'},
                {'phase': 'BEGINNER', 'label': 'Data Structures & Algorithms', 'description': 'Master fundamental concepts', 'order': 2, 'icon': 'Layers', 'timeline': '0-6 months'},
                {'phase': 'INTERMEDIATE', 'label': 'Learn Web Development', 'description': 'HTML, CSS, React/Vue', 'order': 3, 'icon': 'Globe', 'timeline': '6-18 months'},
                {'phase': 'ADVANCED', 'label': 'System Design', 'description': 'Learn scalable architecture', 'order': 4, 'icon': 'Layers', 'timeline': '18+ months'}
            ]
            for step in roadmap:
                RoadmapStep.objects.create(career=career_obj, **step)

    print("Seeding completed!")

if __name__ == '__main__':
    seed_db()
