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
    QuestionsGeneratorAPIView,
    InterviewQuestionsViewSet,
    JobQuestionsViewSet,
    JobMatchingResumeScoreViewSet,
    SuggestedCandidatesViewSet,
    ResumeUploadTrackerViewSet,
)

router = DefaultRouter()
router.register(r'recruiters', RecruiterViewSet)
router.register(r'candidates', CandidateViewSet)
router.register(r'jobs', JobViewSet)
router.register(r'interviews', InterviewViewSet)
router.register(r'interview-questions', InterviewQuestionsViewSet)
router.register(r'job-questions', JobQuestionsViewSet)
router.register(r'job-ats', JobMatchingResumeScoreViewSet)
router.register(r'suggested-candidates',SuggestedCandidatesViewSet )
router.register(r'upload-tracker', ResumeUploadTrackerViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('signup/', SignupView.as_view(), name='signup'),
    path('generate-questions/', QuestionsGeneratorAPIView.as_view(), name='generate-interview-questions'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
