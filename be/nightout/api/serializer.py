from django.db import IntegrityError
from rest_framework import serializers
from nightout.models import NightOutModel, NotificationModel, Participant, ParticipantDate, DateSuggestion, PlanSuggestion, PlanEntry, SuggestionVote
from base.api.serializer import UserSerializer
from django.db.models import Count


class ParticipantSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Participant
        fields = '__all__'

    def create(self, validated_data):
        return Participant.objects.create(**validated_data)


class DateSuggestionSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)
    weekday = serializers.SerializerMethodField()
    numberofCommits = serializers.SerializerMethodField()

    class Meta:
        model = DateSuggestion
        fields = '__all__'

    def get_weekday(self, obj):
        weekDaysMapping = ("Mon.", "Tue.", "Wed.",
                           "Thu.", "Fri.", "Sat.", "Sun.")
        return weekDaysMapping[obj.date.weekday()]

    def get_numberofCommits(self, obj):
        # get all the true votes for this specific date
        participantdatesCount = ParticipantDate.objects.filter(nightOut=obj.nightOut).filter(
            suggestedDate__date=obj.date).filter(commit=True).count()

        return participantdatesCount

    def create(self, validated_data):
        return DateSuggestion.objects.create(**validated_data)


class ParticipantDateSerializer(serializers.ModelSerializer):
    participant = ParticipantSerializer()
    suggestedDate = DateSuggestionSerializer()

    class Meta:
        model = ParticipantDate
        fields = '__all__'

    def create(self, validated_data):
        return ParticipantDate.objects.create(**validated_data)


class EntrySuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanEntry
        fields = '__all__'

    def create(self, validated_data):
        return PlanEntry.objects.create(**validated_data)


class SuggestionVoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = SuggestionVote
        fields = '__all__'

    def create(self, validated_data):
        return SuggestionVote.objects.create(**validated_data)


class PlanSuggestionSerializer(serializers.ModelSerializer):
    planEntries = EntrySuggestionSerializer(many=True, read_only=True)
    votes = SuggestionVoteSerializer(many=True, read_only=True)
    creator = ParticipantSerializer(read_only=True)
    numberOfVotes = serializers.SerializerMethodField()

    class Meta:
        model = PlanSuggestion
        fields = '__all__'

    def get_numberOfVotes(self, obj):
        # get the count of votes for this suggestion
        numberOfVotes = SuggestionVote.objects.filter(
            planSuggestion=obj).count()

        return numberOfVotes

    def create(self, validated_data):
        return PlanSuggestion.objects.create(**validated_data)


class PlanSuggestionSerializerCreater(serializers.ModelSerializer):
    planEntries = EntrySuggestionSerializer(many=True, read_only=True)

    class Meta:
        model = PlanSuggestion
        fields = '__all__'

    def create(self, validated_data):
        return PlanSuggestion.objects.create(**validated_data)


class NightOutSerializer(serializers.ModelSerializer):
    suggestedDates = DateSuggestionSerializer(many=True, read_only=True)
    planSuggestions = serializers.SerializerMethodField()
    participants = ParticipantSerializer(many=True, read_only=True)
    participantDates = ParticipantDateSerializer(many=True, read_only=True)
    creator = UserSerializer(read_only=True)
    numberOfVotes = serializers.SerializerMethodField()
    numberOfAbstentions = serializers.SerializerMethodField()
    numberOfSuggestionsWithMaxVoteCount = serializers.SerializerMethodField()

    class Meta:
        model = NightOutModel
        fields = '__all__'

    def get_numberOfVotes(self, obj):
        # get the number of participants who allready give a vote
        numberOfVotes = SuggestionVote.objects.filter(
            planSuggestion__nightOut=obj).count()

        return numberOfVotes

    def get_planSuggestions(self, obj):
        # get all the planSuggestions but ordered by votes
        planSuggestions = PlanSuggestion.objects.annotate(num_votes=Count('votes')).filter(
            nightOut=obj).order_by('-num_votes')
        serializer = PlanSuggestionSerializer(planSuggestions, many=True)

        return serializer.data
    
    def get_numberOfSuggestionsWithMaxVoteCount(self, obj):
        # get the number of max votes
        try: 
            maxVoteCount = len(PlanSuggestion.objects.annotate(num_votes=Count('votes')).filter(
                nightOut=obj).order_by('-num_votes').first().votes.all())
        except AttributeError:
            return None
        
        numberOfSuggestionsWithMaxVoteCount = PlanSuggestion.objects.annotate(vote_count=Count('votes')).filter(nightOut=obj).filter(vote_count=maxVoteCount).count()

        return numberOfSuggestionsWithMaxVoteCount

    def get_numberOfAbstentions(self, obj):
        # get the number of participants that abstained from the voting
        numberOfAbstains = Participant.objects.filter(
            nightOut=obj).filter(abstention=True).count()

        return numberOfAbstains

    def create(self, validated_data):
        return NightOutModel.objects.create(**validated_data)


class NotificationSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    notificationMessage = serializers.SerializerMethodField()
    nightout = NightOutSerializer(read_only=True)

    class Meta:
        model = NotificationModel
        fields = '__all__'

    def get_notificationMessage(self, obj):
        return obj.get_notificationMessage_display()

    def create(self, validated_data):
        return NotificationModel.objects.create(**validated_data)


class CreateNotificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = NotificationModel
        fields = '__all__'

    def create(self, validated_data):
        return NotificationModel.objects.create(**validated_data)
