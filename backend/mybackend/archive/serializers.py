from rest_framework import serializers

from .models import Archive


class ArchiveSerializer(serializers.ModelSerializer):

    class Meta:
        model = Archive
        fields = '__all__'
        # fields = ('title', 'date', 'description', 'emotions')