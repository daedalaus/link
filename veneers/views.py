from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response

from common.viewsets import LayUIModelViewSet, LayUIBoardViewSet

from .models import PCBStatus, PCBLayer, Veneer
from .serializers import PCBStatusSerializer, PCBLayerSerializer, BoardDataSerializer, LinkDataSerializer
# Create your views here.


class PCBStatusViewSet(LayUIModelViewSet):
    queryset = PCBStatus.objects.all()
    serializer_class = PCBStatusSerializer


class PCBLayerViewSet(LayUIModelViewSet):
    queryset = PCBLayer.objects.all()
    serializer_class = PCBLayerSerializer


class BoardDataViewSet(LayUIBoardViewSet):
    queryset = Veneer.objects.all()
    serializer_class = BoardDataSerializer
    filter_fields = ('pcb_id', 'pcb_name', 'hardware_member', 'software_member')


class BoardCountView(APIView):
    def get(self, request, pcb_id):
        count = Veneer.objects.filter(pcb_id=pcb_id).count()
        return Response({
            'code': 200,
            'count': count,
        })


class LinkDataViewSet(LayUIModelViewSet):
    queryset = Veneer.objects.all()
    serializer_class = LinkDataSerializer
    filter_fields = ('pcb_id', 'pcb_name', 'hardware_member', 'software_member')


