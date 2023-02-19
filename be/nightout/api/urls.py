from django.urls import path
from . import views

urlpatterns = [
    path('nightoutlist/', views.NightOutList.as_view()),
    path('nightout/<uuid:uuid>/', views.NightOut.as_view()),
    path('participant/', views.AddParticipant.as_view()),
    path('participantdelete/', views.DeleteParticipant.as_view()),
    path('participantcommitdate', views.PutParticipantDatePhase.as_view()),
    path('participantcommitplanning', views.PutParticipantPlanningPhase.as_view()),
    path('datesuggestion/', views.AddDateSuggestion.as_view()),
    path('participantdate/', views.PatchParticipantDate.as_view()),
    path('suggestion/<uuid:uuid>/', views.GetSuggestionView.as_view()),
    path('suggestion/', views.CreateSuggestionView.as_view()),
    path('suggestion/entrys/', views.EntrySuggestionView.as_view()),
    path('suggestion/suggestionVote/', views.CreateAndDeleteVote.as_view()),
    path('suggestion/suggestionVote/abstention/', views.DeclareAbstention.as_view()),
    path('participant/<uuid:uuid>/', views.GetUserParticpantInfos.as_view()),
    path('finishNightOut/', views.FindFinalSuggestionForFinish.as_view()),
    path('notificationlist/', views.GetNotifications.as_view()),
    path('notification/', views.PostPatchNotification.as_view()),
    path('chat/', views.PostView.as_view()),
]
