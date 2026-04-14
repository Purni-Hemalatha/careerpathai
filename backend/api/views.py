from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import json
import os
from .models import Category, Career, RoadmapStep, UserProfile
from .serializers import CategorySerializer, CareerSerializer, RoadmapStepSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CareerViewSet(viewsets.ModelViewSet):
    queryset = Career.objects.all()
    serializer_class = CareerSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        featured = self.request.query_params.get('featured')
        if featured:
            return Career.objects.filter(is_featured=True)
        return super().get_queryset()

class RoadmapStepViewSet(viewsets.ModelViewSet):
    queryset = RoadmapStep.objects.all()
    serializer_class = RoadmapStepSerializer

@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not password or not email:
        return Response({'success': False, 'message': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'success': False, 'message': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    # 1. Save to SQLite Database
    user = User.objects.create_user(username=username, email=email, password=password)

    # 2. Save directly to JSON file simultaneously
    json_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'users.json')
    user_data = []
    
    # Read existing file if it exists
    if os.path.exists(json_path):
        with open(json_path, 'r') as f:
            try:
                user_data = json.load(f)
            except json.JSONDecodeError:
                pass
    
    # Append the new user record
    user_data.append({
        'id': user.id,
        'username': username,
        'email': email,
        'created_at': str(user.date_joined)
    })
    
    # Write back to JSON file
    with open(json_path, 'w') as f:
        json.dump(user_data, f, indent=4)

    return Response({'success': True, 'message': 'Registered successfully in DB and JSON', 'user': {'username': username}}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    
    if user is not None:
        return Response({'success': True, 'message': 'Login successful', 'user': {'username': user.username, 'email': user.email}}, status=status.HTTP_200_OK)
    else:
        return Response({'success': False, 'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def get_profile(request):
    username = request.data.get('username')
    user = User.objects.filter(username=username).first()
    if not user: return Response({'success': False}, status=status.HTTP_404_NOT_FOUND)
        
    profile, created = UserProfile.objects.get_or_create(user=user)
    
    return Response({
        'success': True,
        'profile': {
            'headline': profile.headline,
            'location': profile.location,
            'university': profile.university,
            'about': profile.about,
            'selectedField': profile.selected_field,
            'targetRole': profile.target_role,
            'topSkills': profile.skills,
            'experience': profile.experience,
            'achievements': profile.achievements,
            'education': profile.education,
            'certifications': profile.certifications,
            'projects': profile.projects
        }
    })

@api_view(['POST'])
def update_profile(request):
    username = request.data.get('username')
    user = User.objects.filter(username=username).first()
    if not user: return Response({'success': False}, status=status.HTTP_404_NOT_FOUND)
        
    profile, created = UserProfile.objects.get_or_create(user=user)
    
    profile.headline = request.data.get('headline', profile.headline)
    profile.location = request.data.get('location', profile.location)
    profile.university = request.data.get('university', profile.university)
    profile.about = request.data.get('about', profile.about)
    profile.selected_field = request.data.get('selectedField', profile.selected_field)
    profile.target_role = request.data.get('targetRole', profile.target_role)
    profile.skills = request.data.get('topSkills', profile.skills)
    profile.experience = request.data.get('experience', profile.experience)
    profile.achievements = request.data.get('achievements', profile.achievements)
    profile.education = request.data.get('education', profile.education)
    profile.certifications = request.data.get('certifications', profile.certifications)
    profile.projects = request.data.get('projects', profile.projects)
    profile.save()

    json_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'profiles.json')
    profiles_data = {}
    if os.path.exists(json_path):
        with open(json_path, 'r') as f:
            try: profiles_data = json.load(f)
            except: pass
            
    profiles_data[username] = {
        'headline': profile.headline,
        'location': profile.location,
        'university': profile.university,
        'about': profile.about,
        'selectedField': profile.selected_field,
        'targetRole': profile.target_role,
        'topSkills': profile.skills,
        'experience': profile.experience,
        'achievements': profile.achievements,
        'education': profile.education,
        'certifications': profile.certifications,
        'projects': profile.projects
    }
    with open(json_path, 'w') as f:
        json.dump(profiles_data, f, indent=4)
        
    return Response({'success': True})

