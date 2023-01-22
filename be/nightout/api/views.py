from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.decorators import permission_classes
from rest_framework import status

from .serializer import CreateNotificationSerializer, NightOutSerializer, NotificationSerializer, ParticipantSerializer, ParticipantDateSerializer, DateSuggestionSerializer, PlanSuggestionSerializer, EntrySuggestionSerializer, PlanSuggestionSerializerCreater, SuggestionVoteSerializer
from django.http import Http404, HttpResponse
from django.contrib.auth import get_user_model
from django.db.models import Case, When, Value
from django.core import serializers
from django.core.exceptions import ObjectDoesNotExist
from dotenv import load_dotenv
import os
import googlemaps

from nightout.models import NightOutModel, NotificationModel, Participant, ParticipantDate, DateSuggestion, PlanSuggestion, SuggestionVote

User = get_user_model()

# get the environment variables
load_dotenv()
apiKey = os.getenv('REACT_APP_PLACES_API')

# initialize the google maps client
map_client = googlemaps.Client(apiKey)


@permission_classes((IsAuthenticated,))
class NightOutList(APIView):
    """Get all nightouts the user is owning or participating in or create a new nightout"""

    def get(self, request, format=None):
        nightouts = NightOutModel.objects.filter(
            creator=request.user).distinct() | NightOutModel.objects.filter(participants__user=request.user).distinct()
        nightouts = nightouts.order_by(Case(When(phase="finished", then=Value(0)),
                                            When(phase="votingPhase",
                                                 then=Value(1)),
                                            When(phase="planningPhase",
                                                 then=Value(2)),
                                            When(phase="datePhase", then=Value(3))))
        serializer = NightOutSerializer(nightouts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = NightOutSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(creator=request.user, title=request.data['title'])

            # automatically add the creator as a participant
            participant = Participant.objects.create(
                user=request.user, nightOut=serializer.instance)
            participant.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@permission_classes((IsAuthenticated,))
class NightOut(APIView):
    """Get a single nightout, edit it or delete it"""

    # try to get the object, if not possible return 404
    def get_object(self, uuid, request):

        # get the user
        user = User.objects.get(pk=request.user.id)

        # get the nightout
        try:
            nightout = NightOutModel.objects.get(uuid=uuid)
        except NightOutModel.DoesNotExist:
            raise Http404

        # check if the user is either the creator or a participant of the nightout
        if nightout.creator == user or nightout.participants.filter(user_id=request.user).all():
            return nightout
        else:
            return None

    def get(self, request, uuid, format=None):
        nightout = self.get_object(uuid, request)

        if nightout == None:
            return Response({"message": "You are not invited to this NightOut, ask someone to invite you."}, status=status.HTTP_404_NOT_FOUND)

        serializer = NightOutSerializer(nightout)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, uuid, format=None):
        nightOut = self.get_object(uuid, request)
        serializer = NightOutSerializer(nightOut, data=request.data)

        # check if a NightOut is brought by the creator to the next phase, if so put in a notification for every particpant except for the creator.
        if request.data['finalDate'] != None:

            # get all participants from this nightout
            participants = Participant.objects.filter(nightOut=nightOut).all()

            # give every participant a notification
            for participant in participants:
                newNotification = NotificationModel.objects.create(
                    nightout=nightOut, owner=participant.user, sender=nightOut.creator, notificationMessage='nightout_next_phase')
                newNotification.save()

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        nightout = self.get_object(pk, request)
        nightout.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@permission_classes((IsAuthenticated,))
class AddParticipant(APIView):
    """sumary_line: Add a participant to a nightout"""

    def post(self, request, format=None):

        userObject = User.objects.filter(
            email__iexact=request.data['user']).last()
        nightoutObject = NightOutModel.objects.filter(
            pk=request.data['nightOut']).last()

        if userObject is None:
            return Response({"message": "A user with this mail doesnt exist, ask your friend to create an account."}, status=status.HTTP_404_NOT_FOUND)

        # check if the participant to be added is the creator of the nightout
        if NightOutModel.objects.filter(pk=request.data['nightOut'], creator=userObject).exists():
            return Response({"message": "This User is the creator of this Nightout."}, status=status.HTTP_400_BAD_REQUEST)

        # check if the participant to be added is already a participant
        if Participant.objects.filter(nightOut=request.data['nightOut'], user=userObject).exists():
            return Response({"message": "This User is allready a participant in this Nightout."}, status=status.HTTP_409_CONFLICT)

        serializer = ParticipantSerializer(data=request.data)
        if serializer.is_valid():

            serializer.save(user=userObject, nightOut=nightoutObject)

            # if the Participant is added we need to add all current datesuggestions as participantdates
            dateSuggestions = DateSuggestion.objects.filter(
                nightOut=request.data['nightOut'])
            for date in dateSuggestions:
                ParticipantDate.objects.create(
                    participant=serializer.instance, suggestedDate=date, nightOut=nightoutObject)

            # we also need to give the participant a new notification
            notificationForParticipant = NotificationModel.objects.create(
                nightout=nightoutObject, owner=userObject, sender=request.user, notificationMessage='added_you_to_nightout')
            notificationForParticipant.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@permission_classes((IsAuthenticated,))
class DeleteParticipant(APIView):
    """sumary_line: Delete a participant"""

    def delete(self, request, format=None):

        # get the participant object
        try:
            participant = Participant.objects.filter(
                user=request.user).filter(nightOut=request.data['nightout'])
        except ObjectDoesNotExist:
            return Response({"message": "This participant doesnt exist."}, status=status.HTTP_404_NOT_FOUND)

        # check if the participant is not None
        if participant == None:
            return Response({"message": "This participant doesnt exist."}, status=status.HTTP_404_NOT_FOUND)

        deletedCount = participant.delete()

        print(len(deletedCount))

        if len(deletedCount) == 2:
            return Response({"message": "This participant was successfully deleted from this nightout"}, status=status.HTTP_200_OK)

        else:
            return Response({"message": "This participant doesnt exist."}, status=status.HTTP_404_NOT_FOUND)


@permission_classes((IsAuthenticated,))
class AddDateSuggestion(APIView):
    """sumary_line: Add a date to a nightout"""

    def post(self, request, format=None):

        # check if the date (yyyy-mm-dd) to be added is already a date
        if DateSuggestion.objects.filter(nightOut=request.data['nightOut'], date=request.data['date']).exists():
            return Response({"message": "This Date is allready a date in this Nightout."}, status=status.HTTP_409_CONFLICT)

        nightoutObject = NightOutModel.objects.filter(
            pk=request.data['nightOut']).last()

        serializer = DateSuggestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(nightOut=nightoutObject)

            # add the date to all participants
            participants = Participant.objects.filter(
                nightOut=request.data['nightOut'])
            for participant in participants:
                ParticipantDate.objects.create(
                    participant=participant, suggestedDate=serializer.instance, nightOut=nightoutObject)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@permission_classes((IsAuthenticated,))
class PatchParticipantDate(APIView):
    """Patch a participant date"""

    def patch(self, request, format=None):

        participantDate = ParticipantDate.objects.get(pk=request.data['pk'])

        if participantDate is None:
            return Response({"message": "This ParticipantDate doesnt exist."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ParticipantDateSerializer(
            participantDate, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@permission_classes((IsAuthenticated,))
class GetSuggestionView(APIView):
    """Plan a suggestion for a nightout"""

    def get(self, request, uuid, format=None):

        # check if the user is the creator or a participant of the nightout
        if not (NightOutModel.objects.filter(pk=uuid, creator=request.user).exists() or Participant.objects.filter(nightOut=uuid, user=request.user).exists()):
            return Response({"message": "You are not the creator or a participant of this nightout."}, status=status.HTTP_403_FORBIDDEN)

        # get the participant from the user:
        userAsParticipant = Participant.objects.filter(
            nightOut=uuid).filter(user=request.user).first()

        # check if the user hasnt suggested a suggestion for this nightout
        if not PlanSuggestion.objects.filter(nightOut=uuid).filter(creator=userAsParticipant).exists():
            return Response({"message": "You have not suggested a suggestion for this nightout."}, status=status.HTTP_404_NOT_FOUND)

        # get the suggestion from the user:
        suggestionAsSuggestion = PlanSuggestion.objects.filter(
            nightOut=uuid).filter(creator=userAsParticipant).first()

        serializer = PlanSuggestionSerializer(suggestionAsSuggestion)

        # return the suggestion
        return Response(serializer.data, status=status.HTTP_200_OK)


@permission_classes((IsAuthenticated,))
class CreateSuggestionView(APIView):
    """Create a suggestion or delete a suggestion"""

    def post(self, request, format=None):

        # get the participant from the request
        userAsParticipant = Participant.objects.filter(
            user=request.user).filter(nightOut=request.data['nightOut']).first()

        # check if a user allready create a suggestion for this nightout
        if PlanSuggestion.objects.filter(nightOut=request.data['nightOut']).filter(creator=userAsParticipant).exists():
            return Response({"message": "You allready have a suggestion for this nightout."}, status=status.HTTP_409_CONFLICT)

        request.data['creator'] = userAsParticipant.id

        serializer = PlanSuggestionSerializerCreater(data=request.data)
        if serializer.is_valid():

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):

        # get the plansuggestionobject
        planSuggestion = PlanSuggestion.objects.filter(
            id=request.data['planSuggestion']).last()

        if planSuggestion is None:
            return Response({"message": "Sorry, something went wrong"}, status=status.HTTP_404_NOT_FOUND)

        # delete the suggestion and return response
        planSuggestion.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@permission_classes((IsAuthenticated,))
class NewEntrySuggestionView(APIView):
    """Create a new suggestion"""

    def post(self, request, format=None):

        # get the participant from the request
        userAsParticipant = Participant.objects.filter(
            user=request.user).filter(nightOut=request.data['nightOut']).first()

        suggestionObject = PlanSuggestion.objects.filter(
            nightOut=request.data['nightOut']).filter(creator=userAsParticipant).last()

        if suggestionObject == None:
            return Response({"message": "You have not suggested a suggestion for this nightout."}, status=status.HTTP_404_NOT_FOUND)

        # send a get request to the google places api
        googlePlacesResponse = map_client.find_place(input=request.data['name'], fields=[
            'name', 'rating', 'photos', 'formatted_address', 'types'], input_type='textquery')

        # check if the response is valid
        if googlePlacesResponse['status'] == 'OK':

            # get the specific photo url
            photo = map_client.places_photo(
                photo_reference=googlePlacesResponse['candidates'][0]['photos'][0]['photo_reference'], max_height=150, max_width=150)

            # put the photo url in our response
            googlePlacesResponse['candidates'][0]['photos'][0]['photo_reference'] = photo.gi_frame.f_locals['self'].url

            # now we can fill the googleplacesapi into the request
            request.data['name'] = googlePlacesResponse['candidates'][0]['name']
            request.data['rating'] = googlePlacesResponse['candidates'][0]['rating']
            request.data['location'] = googlePlacesResponse['candidates'][0]['formatted_address']
            request.data['photoKey'] = googlePlacesResponse['candidates'][0]['photos'][0]['photo_reference']
            request.data['locationType'] = ",".join(
                googlePlacesResponse['candidates'][0]['types'])

            # create the serializer
            serializer = EntrySuggestionSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # if the response is not valid return a 404
        return Response({"message": "The Google Places API returned an error."}, status=status.HTTP_404_NOT_FOUND)


@permission_classes((IsAuthenticated,))
class CreateAndDeleteVote(APIView):
    """Create a vote or delete a vote"""

    def post(self, request, format=None):

        # get the nightOut from this planSuggestion
        nightOut = NightOutModel.objects.filter(
            planSuggestions=request.data['planSuggestion']).first()

        # get the participant from the request
        userAsParticipant = Participant.objects.filter(
            user=request.user).filter(nightOut=nightOut).first()

        # check if the current user has allready voted for the exact same planSuggestion
        if SuggestionVote.objects.filter(participant=userAsParticipant).filter(planSuggestion=request.data['planSuggestion']).exists():
            return Response({"message": "You allready voted for the exact same planSuggestion"}, status=status.HTTP_400_BAD_REQUEST)

        # check if the current user voted for a planSuggestion of this nightOut
        existingSuggestionVote = SuggestionVote.objects.filter(
            participant=userAsParticipant).filter(planSuggestion__nightOut=nightOut).first()

        if existingSuggestionVote != None:
            existingSuggestionVote.delete()

        # get the planSuggestion from the request
        planSuggestion = request.data['planSuggestion']

        # create the new vote
        serializer = SuggestionVoteSerializer(
            data={'planSuggestion': planSuggestion, 'participant': userAsParticipant.id})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response({"message": "Something went wrong"}, status=status.HTTP_400_BAD_REQUEST)


@permission_classes((IsAuthenticated,))
class GetUserParticpantInfos(APIView):
    """Get infos about a specific participant"""

    def get(self, request, pk, format=None):

        # get the nightOutObject
        nightOutObject = NightOutModel.objects.filter(
            pk=pk).last()

        # get the Particpant from the User and NightOut
        participant = Participant.objects.filter(
            nightOut=nightOutObject).filter(user=request.user).first()

        # get the current vote of the User
        vote = SuggestionVote.objects.filter(participant=participant).first()

        if participant == None:
            return Response({'Message': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)

        if vote == None:
            return Response({'participant_id': participant.id, 'votedForSuggestion_id': "no vote placed"}, status=status.HTTP_200_OK)

        return Response({'participant_id': participant.id, 'votedForSuggestion_id': vote.planSuggestion.id}, status=status.HTTP_200_OK)


@permission_classes((IsAuthenticated,))
class FindFinalSuggestionForFinish(APIView):
    """Find the final suggestion as the final nightout"""

    def post(self, request, format=None):

        # get the nightOut from the request
        nightOutObject = NightOutModel.objects.filter(
            pk=request.data['nightOut']).last()

        # check if the request sender is the creator of this NightOut
        if nightOutObject.creator != request.user:
            return Response({'message': 'You are not the creator of this NightOut'}, status=status.HTTP_401_UNAUTHORIZED)

        # calculate which planSuggestion has the highest number of votes
        planSuggestions = nightOutObject.planSuggestions.order_by('votes')

        # check if the nightOut allready has a finafirst and finalsecondSuggestion
        if nightOutObject.finalFirstSuggestion == None:
            nightOutObject.finalFirstSuggestion = planSuggestions[0]

            # check if there are 2 suggestions min
            if len(planSuggestions) > 1:

                # if so add the second suggestion to the nightOutModel
                nightOutObject.finalSecondSuggestion = planSuggestions[1]

        if nightOutObject.phase == "votingPhase":
            # NightOut has to be put into next Phase
            nightOutObject.phase = "finished"

        nightOutObject.save()

        serializer = serializers.serialize('json', planSuggestions)

        return HttpResponse(serializer, content_type='application/json', status=status.HTTP_201_CREATED)


@permission_classes((IsAuthenticated,))
class GetNotifications(APIView):
    """Get notifications for the loggen in user"""

    def get(self, request, format=None):

        # get all notifications for one user
        userNotifications = NotificationModel.objects.filter(
            owner=request.user).filter(dismissed=False)

        # error handling
        if userNotifications == None:
            return Response({"message": "Something went wrong"})

        # return all notifications
        serializer = NotificationSerializer(userNotifications, many=True)

        # return the suggestion
        return Response(serializer.data, status=status.HTTP_200_OK)


@permission_classes((IsAuthenticated,))
class PostPatchNotification(APIView):
    """Create and patch Notifications"""

    def post(self, request, format=None):

        # get the creator as user from the Nightout
        creator = User.objects.filter(
            createdNightOuts=request.data['nightout']).first()

        # check if the sender allready created the exact same notification for this nightout
        if NotificationModel.objects.filter(nightout=request.data['nightout']).filter(owner=creator.id).filter(sender=request.user.id).filter(notificationMessage=request.data['notificationMessage']).filter(dismissed=False).exists():
            return Response({'message': 'You allready send him a reminder.'}, status=status.HTTP_400_BAD_REQUEST)

        # put in the owner into the request
        request.data["owner"] = creator.id
        request.data["sender"] = request.user.id

        serializer = CreateNotificationSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, format=None):

        # get the notification while checking if it exists
        try:
            notification = NotificationModel.objects.get(
                id=request.data['notification'])
        except ObjectDoesNotExist:
            return Response({"message": "This notification doesnt exist."}, status=status.HTTP_404_NOT_FOUND)

            # check if notification is there
        if notification is None:
            return Response({"message": "This notification doesnt exist."}, status=status.HTTP_404_NOT_FOUND)

        # check if notification allready dismissed
        if notification.dismissed == True:
            return Response({'message': 'This notification is allready dismissed'})

        serializer = NotificationSerializer(
            notification, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'This notification was successfully dismissed'}, status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
