from django.conf import settings
import requests
import urllib.parse
import time

class MeetingRoomCreationResponse:
    room_url: str
    room_name: str

    def __init__(self, room_url: str, room_name: str):
        self.room_url = room_url
        self.room_name = room_name

class DailyMeetingService:
    api_url: str
    api_key: str
    def __init__(self):
        self.api_url = settings.DAILY_API_PATH
        self.api_key = settings.DAILY_API_KEY

    def create_meeting_room(self):
        room_props = {
            "exp": time.time() + 60 * 60,  # 1 hour
            "enable_chat": True,
            "enable_emoji_reactions": True,
            "eject_at_room_exp": True,
            "enable_prejoin_ui": True,  # Important for the bot to be able to join headlessly
        }

        res = requests.post(
            f"https://{self.api_url}/rooms",
            headers={"Authorization": f"Bearer {self.api_key}"},
            json={
                "properties": room_props
            },
        )
        if res.status_code != 200:
            raise Exception(f"Unable to create room: {res.text}")

        data = res.json()
        room_url: str = data.get("url")
        room_name: str = data.get("name")
        if room_url is None or room_name is None:
            raise Exception("Missing room URL or room name in response")

        return MeetingRoomCreationResponse(room_url, room_name)

    def delete_all_meeting_rooms(self):
        """
        Deletes all meeting rooms created by the bot.
        This is useful for cleanup during development or testing.
        """
        res = requests.get(
            f"https://{self.api_url}/rooms",
            headers={"Authorization": f"Bearer {self.api_key}"},
        )
        if res.status_code != 200:
            raise Exception(f"Unable to fetch rooms: {res.text}")

        rooms = res.json().get("data", [])
        for room in rooms:
            room_name = room.get("name")
            delete_res = requests.delete(
                f"https://{self.api_url}/rooms/{room_name}",
                headers={"Authorization": f"Bearer {self.api_key}"},
            )
            if delete_res.status_code != 204:
                print(f"Failed to delete room {room_name}: {delete_res.text}")

    @classmethod
    def get_name_from_url(cls, room_url: str) -> str:
        """
        Extracts the name from a given room URL.

        Args:
            room_url (str): The URL of the room.

        Returns:
            str: The extracted name from the room URL.
        """
        return urllib.parse.urlparse(room_url).path[1:]

