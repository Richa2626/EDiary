from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Archive
from .serializers import ArchiveSerializer

@api_view(['GET', 'POST'])
def archive_list(request):
    if request.method == 'GET':
        archives = Archive.objects.all()
        serializer = ArchiveSerializer(archives, many=True)
        return  Response(serializer.data)
    elif request.method == 'POST':
        serializer = ArchiveSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def archive_detail(request, id):
    try:
        archive = Archive.objects.get(id=id)
    except Archive.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = ArchiveSerializer(archive)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ArchiveSerializer(archive, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        archive.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# authtest === mybackend
# log === archive
