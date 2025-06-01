from datetime import datetime
def getHumanReadableTime(time):
    return datetime.fromisoformat(str(time)).strftime("%A, %B %d, %Y at %I:%M %p")
