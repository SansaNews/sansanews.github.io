# pyright: reportAny = false
# pyright: reportExplicitAny = false
# pyright: reportUnusedCallResult = false

import argparse
import json
import logging
import os
from pprint import pprint
from typing import Any, final

import requests

type Media = dict[str, Any]


@final
class APIConfig:
    def __init__(self, timeout_s: int = 15):
        assert timeout_s > 0, "Timeout must be a positive integer"

        API_VERSION = "v24.0"
        INSTAGRAM_ID = "17841455210130919"
        API_URL = f"https://graph.facebook.com/{API_VERSION}/{INSTAGRAM_ID}"

        access_token = os.getenv("ACCESS_TOKEN", "")
        assert access_token, "access token is empty"

        self.url = API_URL
        self.access_token = access_token
        self.timeout_s = timeout_s


def main():
    logging.basicConfig(format="%(asctime)s: [%(levelname)s] %(message)s")

    config = APIConfig()

    parser = init_parser()
    args = parser.parse_args()

    if args.command == "check":
        is_creator_account = check_if_creator_account(args.username, config)
        print(is_creator_account)
    elif args.command == "get":
        if args.all:
            handle_get_all(config)
        else:
            handle_get_single(args.username, config)
    else:
        parser.print_help()


def init_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser()
    subparsers = parser.add_subparsers(dest="command")

    # `check` command
    parser_check = subparsers.add_parser(
        "check", help="Verifies if the user is accesible by the API"
    )
    parser_check.add_argument("username", type=str, help="Instagram username")

    # `get` command
    parser_get = subparsers.add_parser("get", help="Gets the media of an user")
    group_get = parser_get.add_mutually_exclusive_group(required=True)
    group_get.add_argument("username", nargs="?", help="Username to get the media from")
    group_get.add_argument(
        "--all",
        action="store_true",
        help="Gets the media from all the users in USERS_PATH",
    )

    return parser


def handle_get_all(config: APIConfig):
    USERS_PATH = "static/users.json"
    MEDIA_PATH = "static/media.json"

    with open(USERS_PATH, "r") as file:
        users: list[str] = json.load(file)["users"]

    media = get_all_users_media(users, config)
    media = sorted(media, key=lambda post: post["timestamp"], reverse=True)
    data = json.dumps(media, indent=2)

    with open(MEDIA_PATH, "w") as file:
        file.write(data)

    print(f"Posts saved on {MEDIA_PATH}")


def get_all_users_media(
    usernames: list[str],
    config: APIConfig,
    amount: int = 5,
) -> list[Media]:
    assert len(usernames) > 0, "List of usernames must not be empty"
    assert amount > 0, "Amount must be a positive integer"

    media: list[Media] = []
    for username in usernames:
        user_media = get_user_media(username, config, amount)

        for m in user_media:
            m = sanitize_post(username, m)
            media.append(m)

    return media


def handle_get_single(username: str, config: APIConfig):
    media = get_user_media(username, config)

    sanitized_media: list[Media] = []
    for m in media:
        m = sanitize_post(username, m)
        sanitized_media.append(m)

    pprint(sanitized_media)


def get_user_media(username: str, config: APIConfig, amount: int = 5) -> list[Media]:
    assert amount > 0, "Amount of media to retrieve must be positive"

    fields = f"""
        business_discovery.username({username}){{
            media.limit({amount}){{
                timestamp,caption,media_type,permalink,media_url,
                children{{media_url,media_type}}
            }}
        }}
    """
    params = {"fields": fields, "access_token": config.access_token}

    response = None
    try:
        response = requests.get(config.url, params, timeout=config.timeout_s)
        response.raise_for_status()
        data = response.json()
        return data["business_discovery"]["media"]["data"]

    except requests.exceptions.RequestException as error:
        logging.error(f"Could not connect to Instagram API ({error})")
        if response is not None:
            logging.error(response.text)

        return []


def sanitize_post(username: str, original_media: Media) -> Media:
    media = original_media.copy()
    media.pop("id", None)
    media["username"] = username

    if "children" in media:
        children: list[Media] = media["children"]["data"]
        for child in children:
            child.pop("id", None)
        media["children"] = children

    return media


def check_if_creator_account(username: str, config: APIConfig) -> bool:
    fields = f"business_discovery.username({username}){{name}}"
    params = {"fields": fields, "access_token": config.access_token}

    response = None
    try:
        response = requests.get(config.url, params, timeout=config.timeout_s)
        response.raise_for_status()
        return response.status_code == 200

    except requests.exceptions.RequestException as error:
        logging.error(f"Could not connect to Instragram API ({error})")
        if response is not None:
            logging.error(response.text)

        return False


if __name__ == "__main__":
    main()
