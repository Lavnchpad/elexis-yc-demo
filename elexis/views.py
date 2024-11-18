from django.shortcuts import redirect
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Recruiter, Candidate
from .serializers import RecruiterSerializer, CandidateSerializer


class RecruiterViewSet(viewsets.ModelViewSet):
    queryset = Recruiter.objects.all()
    serializer_class = RecruiterSerializer

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        if self.action == 'create':
            return Recruiter.objects.all()
        return Recruiter.objects.filter(id=self.request.user.id)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        recruiter = serializer.save()

        # Generate tokens
        refresh = RefreshToken.for_user(recruiter)

        return Response({
            'recruiter': serializer.data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            },
            'message': 'Registration successful'
        }, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response({
            'recruiter': serializer.data,
            'message': 'Profile updated successfully'
        })

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({
            'message': 'Profile deleted successfully'
        }, status=status.HTTP_204_NO_CONTENT)


class CandidateViewSet(viewsets.ModelViewSet):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Candidate.objects.filter(recruiter=self.request.user)

    def perform_create(self, serializer):
        serializer.save(recruiter=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def create_joining_link(self, request, pk=None):
        candidate = self.get_object()

        link = f"http://127.0.0.1:8000/elexis/candidate/{pk}/start_interview"  # example request
        # This link to match the below url pattern like -
        candidate.joining_link = link
        candidate.save()

        return Response(
            {
                "message": "meet scheduled",
            },
            status=status.HTTP_200_OK
        )

    @action(detail=True, methods=['post'], permission_classes=[AllowAny])
    def start_interview(self, request, pk=None):
        candidate = self.get_object()

        if candidate.joining_link is None:
            return Response({
                "message": "Interview done , reschedule",
            })
        id = candidate.id
        name = candidate.name
        email = candidate.email
        applied_for = candidate.applied_for
        company_name = candidate.recruiter.company_name
        resume = candidate.resume
        job_desc = candidate.job_description
        interviewer_email = candidate.recruiter.name

        # make request to elexis here , with param (is_dashboard-request=True)
        # link= response.data.get('link')

        candidate.joining_link = None
        candidate.save()
        return redirect("www.google.com")
