from django.db import models
from django.conf import settings


class NightOutModel(models.Model):
    CHOICES = (
        ('datePhase', 'Date Phase'),
        ('planningPhase', 'Planning Phase'),
        ('votingPhase', 'Voting Phase'),
        ('finished', 'Finished'),
    )

    creator = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="createdNightOuts")
    title = models.CharField(max_length=40, )
    description = models.CharField(max_length=200, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    finalDate = models.DateTimeField(blank=True, null=True)
    phase = models.CharField(
        max_length=20, choices=CHOICES, default='datePhase')
    finalFirstSuggestion = models.OneToOneField('PlanSuggestion', on_delete=models.CASCADE, null=True, related_name="thisNightOutFirst")
    finalSecondSuggestion = models.OneToOneField('PlanSuggestion', on_delete=models.CASCADE, null=True, related_name="thisNightOutSecond")

    class Meta:
        ordering = ['-createdAt']

    def __str__(self):
        return self.title + " - " + self.creator.username + " - " + str(self.createdAt) + " - " + str(self.id)


class DateSuggestion(models.Model):
    class Meta:
        unique_together = ('nightOut', 'date')

    nightOut = models.ForeignKey(
        NightOutModel, on_delete=models.CASCADE, related_name="suggestedDates")
    date = models.DateField()
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.date) + " - " + str(self.nightOut.title) + " - " + str(self.nightOut.creator.username)


class Participant(models.Model):
    class Meta:
        unique_together = ('user', 'nightOut')

    nightOut = models.ForeignKey(
        NightOutModel, on_delete=models.CASCADE, related_name="participants")
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.user.username) + " - " + str(self.nightOut.title) + " from " + str(self.nightOut.creator.username)


class ParticipantDate(models.Model):

    nightOut = models.ForeignKey(
        NightOutModel, on_delete=models.CASCADE, related_name="participantDates")
    participant = models.ForeignKey(
        Participant, on_delete=models.CASCADE, related_name="participantDates")
    suggestedDate = models.ForeignKey(
        DateSuggestion, on_delete=models.CASCADE, related_name="suggestedDates")
    commit = models.BooleanField(default=False)

    class Meta:
        ordering = ['participant']

    def __str__(self):
        return str(self.date) + " - " + str(self.participant.user.username) + " - " + str(self.participant.nightOut.title)


class PlanSuggestion(models.Model):

    nightOut = models.ForeignKey(
        NightOutModel, on_delete=models.CASCADE, related_name="planSuggestions")
    creator = models.ForeignKey(
        Participant, on_delete=models.CASCADE, related_name="planSuggestions")
    description = models.CharField(max_length=200, blank=True)

    class Meta:
        ordering = ['creator']

    def __str__(self):
        return str(self.nightOut.title) + " - " + str(self.creator.user.username) + " - " + str(self.description)


class PlanEntry(models.Model):

    planSuggestion = models.ForeignKey(
        PlanSuggestion, on_delete=models.CASCADE, related_name="planEntries")
    name = models.CharField(max_length=40, blank=True)
    rating = models.FloatField(default=0)
    photoKey = models.CharField(max_length=200, blank=True)
    location = models.CharField(max_length=60, blank=True)
    locationType = models.CharField(
        max_length=90)
    startTime = models.TimeField(blank=True, null=True)
    endTime = models.TimeField(blank=True, null=True)

    def __str__(self):
        return str(self.location) + " - " + str(self.locationType) + " - " + str(self.startTime) + " - " + str(self.endTime) + " - " + str(self.description) + " - " + str(self.planSuggestion.participant.user.username) + " - " + str(self.planSuggestion.participant.nightOut.title)


class SuggestionVote(models.Model):

    planSuggestion = models.ForeignKey(
        PlanSuggestion, on_delete=models.CASCADE, related_name="votes")
    participant = models.ForeignKey(
        Participant, on_delete=models.CASCADE, related_name="votedSuggestions")

    def __str__(self):
        return str(self.planSuggestion) + " - " + str(self.participant)