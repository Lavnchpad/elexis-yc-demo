from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    RecruiterViewSet,
    CandidateViewSet,
    JobViewSet,
    InterviewViewSet,
    SignupView,
    LoginView,
    JobRequirementViewSet
)

router = DefaultRouter()
router.register(r'recruiters', RecruiterViewSet)
router.register(r'candidates', CandidateViewSet)
router.register(r'jobs', JobViewSet)
router.register(r'requirements',JobRequirementViewSet)
router.register(r'interviews', InterviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
