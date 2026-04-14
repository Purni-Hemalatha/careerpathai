from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    headline = models.CharField(max_length=200, blank=True, default="Aspiring Professional")
    location = models.CharField(max_length=100, blank=True, default="India")
    university = models.CharField(max_length=200, blank=True, default="Not specified")
    about = models.TextField(blank=True, default="I am a passionate professional looking to explore new career opportunities and grow my skill set.")
    
    # Career Tracking
    selected_field = models.CharField(max_length=100, blank=True, null=True)
    target_role = models.CharField(max_length=100, blank=True, null=True)
    
    # JSON Arrays for deep nested features
    skills = models.JSONField(default=list, blank=True)
    experience = models.JSONField(default=list, blank=True)
    education = models.JSONField(default=list, blank=True)
    certifications = models.JSONField(default=list, blank=True)
    achievements = models.JSONField(default=list, blank=True)
    projects = models.JSONField(default=list, blank=True)

    def __str__(self):
        return self.user.username + "'s profile"

class Category(models.Model):
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50) # Lucide icon name
    color = models.CharField(max_length=50) # Tailwind bg-color class
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name

class Career(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    salary = models.CharField(max_length=50)
    demand_level = models.CharField(max_length=50) # e.g., 'Very High', 'High'
    match_percentage = models.IntegerField(default=0)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='careers')
    slug = models.SlugField(unique=True)
    skills = models.JSONField(default=list) # List of skill names
    is_featured = models.BooleanField(default=False)
    recommended = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class RoadmapStep(models.Model):
    career = models.ForeignKey(Career, on_delete=models.CASCADE, related_name='roadmap_steps')
    phase = models.CharField(max_length=50) # e.g., 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'
    label = models.CharField(max_length=200)
    description = models.TextField()
    order = models.IntegerField(default=0)
    icon = models.CharField(max_length=50) # Lucide icon name
    timeline = models.CharField(max_length=50)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.career.title} - {self.label}"
