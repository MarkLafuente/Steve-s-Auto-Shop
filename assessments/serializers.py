from rest_framework import serializers
from .models import Assessment, Grade


class AssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment
        fields = ('id', 'course', 'title', 'total_score', 'weight', 'date_given')


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ('id', 'assessment', 'student', 'score_obtained')
