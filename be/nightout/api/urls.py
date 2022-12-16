from django.urls import path
from . import views

urlpatterns = [
    path('nightoutlist/', views.NightOutList.as_view()),
    path('nightout/<int:pk>/', views.NightOut.as_view()),
    path('participant/', views.AddParticipant.as_view()), 
    path('datesuggestion/', views.AddDateSuggestion.as_view()),
    path('participantdate/', views.PatchParticipantDate.as_view()),
    path('suggestion/<int:pk>/', views.GetSuggestionView.as_view()),
    path('suggestion/', views.CreateSuggestionView.as_view()),
    path('suggestion/entrys/', views.NewEntrySuggestionView.as_view()),
    path('suggestion/suggestionVote/', views.CreateAndDeleteVote.as_view()),
    path('participant/<int:pk>/', views.GetUserParticpantInfos.as_view()),
    path('finishNightOut/', views.FindFinalSuggestionForFinish.as_view()),
]
