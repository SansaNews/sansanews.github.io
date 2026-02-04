import logging
import os
import sys
from pprint import pprint
from typing import Any

import requests
from dotenv import load_dotenv


def main():
    ACTIONS = ["check", "get"]
    API_VERSION = "v24.0"
    INSTAGRAM_ID = "17841455210130919"
    API_URL = f"https://graph.facebook.com/{API_VERSION}/{INSTAGRAM_ID}"

    action = sys.argv[1]
    assert action in ACTIONS, f"{action} not in available actions"

    access_token = os.getenv("ACCESS_TOKEN", "")
    assert access_token, "access token is empty"

    if action == "check":
        username = sys.argv[2]
        is_business_account = check_if_business_account(username, API_URL, access_token)
        print(is_business_account)
    elif action == "get":
        username = sys.argv[2]
        data = get_account_posts(username, API_URL, access_token)
        pprint(data)


def check_if_business_account(username: str, url: str, access_token: str) -> bool:
    fields = f"business_discovery.username({username}){{name}}"
    params = {"fields": fields, "access_token": access_token}

    response = requests.get(url, params)
    is_business_account = response.status_code == 200
    return is_business_account


def get_account_posts(
    username: str, url: str, access_token: str, amount: int = 5
) -> dict[str, Any]:  # pyright: ignore[reportExplicitAny]
    assert amount > 0, "Amount of posts to retrieve must be positive"

    fields = f"""
        business_discovery.username({username}){{
            username,
            media.limit({amount}){{
                timestamp,caption,media_type,permalink,media_url,
                children{{media_url,media_type}}
            }}
        }}
    """
    params = {"fields": fields, "access_token": access_token}

    response = requests.get(url, params)
    if response.status_code == 200:
        data = response.json()  # pyright: ignore[reportAny]
        return data["business_discovery"]  # pyright: ignore[reportAny]

    logging.error(f"Failed getting a response from Instagram ({response.status_code})")
    return {}


if __name__ == "__main__":
    logging.basicConfig(format="%(asctime)s: [%(levelname)s] %(message)s")
    _ = load_dotenv()
    main()
