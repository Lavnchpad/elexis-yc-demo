from django.contrib.auth import authenticate
from django.shortcuts import redirect
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Recruiter, Candidate, Job
from .serializers import RecruiterSerializer, CandidateSerializer, LoginSerializer, JobSerializer


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
        # return Candidate.objects.filter(recruiter=self.request.user.pk)
        return Candidate.objects.filter(organization = self.request.user.organization)  #allowing recruiters to see all candidates of their organization

    def perform_create(self, serializer):
        # serializer.save(recruiter=self.request.user)
        serializer.save(
            organization = self.request.user.organization,  #assign organization
            created_by = self.request.user,   #assgin created_by
            modified_by = self.request.user,   #assign modified_by
            recruiter = self.request.user
        )
        
    #function to update the modified_by field
    def perform_update(self, serializer):
        serializer.save(modified_by = self.request.user)
        

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


class SignupView(APIView):
    def post(self, request):
        print("Request",request.data)
        serializer = RecruiterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Signup successful!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request, email=email, password=password)
            if user:
                # Generate tokens
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }, status=status.HTTP_200_OK)
            return Response({"error": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]
    
    #allowing recruiters to see all jobs of their organization
    def get_queryset(self):
        return Job.objects.filter(organization = self.request.user.organization)
    
    def perform_create(self, serializer):
        serializer.save(
            organization = self.request.user.organization,
            created_by = self.request.user,
            modified_by = self.request.user
        )
        
    def perform_update(self, serializer):
        serializer.save(modified_by = self.request.user)
