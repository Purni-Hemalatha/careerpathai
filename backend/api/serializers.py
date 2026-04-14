from rest_framework import serializers
from .models import Category, Career, RoadmapStep

class RoadmapStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoadmapStep
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class CareerSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    roadmap_steps = RoadmapStepSerializer(many=True, read_only=True)

    class Meta:
        model = Career
        fields = '__all__'
