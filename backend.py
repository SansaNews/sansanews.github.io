# pyright: reportAny = false
# pyright: reportExplicitAny = false
# pyright: reportUnusedCallResult = false

import argparse
import functools
import itertools
import json
import logging
import os
from concurrent.futures import ThreadPoolExecutor
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
            data = get_user_data(args.username, config)
            media = sanitize_data(args.username, data)
            pprint(media)
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
    USERS_PATH = "src/lib/assets/users.json"
    MEDIA_PATH = "src/lib/assets/media.json"

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

    with ThreadPoolExecutor() as executor:
        task = functools.partial(process_single_user, config=config, amount=amount)
        results = executor.map(task, usernames)

    media: list[Media] = list(itertools.chain.from_iterable(results))
    return media


def process_single_user(
    username: str, config: APIConfig, amount: int = 5
) -> list[Media]:
    user_data = get_user_data(username, config, amount)
    return sanitize_data(username, user_data)


def get_user_data(username: str, config: APIConfig, amount: int = 5) -> dict[str, Any]:
    assert amount > 0, "Amount of media to retrieve must be positive"

    fields = f"""
        business_discovery.username({username}){{
            profile_picture_url,
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
        return response.json()

    except requests.exceptions.RequestException as error:
        logging.error(f"Could not connect to Instagram API ({error})")
        if response is not None:
            logging.error(response.text)

        return {}


def sanitize_data(username: str, data: dict[str, Any]) -> list[Media]:
    media_list: list[Media] = []

    m: Media
    for m in data["business_discovery"]["media"]["data"]:
        media = m.copy()

        # Shared data between media
        media.pop("id", None)
        media["username"] = username
        media["profile_picture_url"] = data["business_discovery"]["profile_picture_url"]

        if "children" not in m:
            media_list.append(media)
            continue

        # Clean children
        children: list[Media] = m["children"]["data"]
        for child in children:
            child.pop("id", None)
        m["children"] = children

        media_list.append(media)

    return media_list


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
