from pathlib import Path

import firebase_admin
from firebase_admin import credentials, auth


SERVICE_ACCOUNT_FILE = (
    Path(__file__).resolve().parents[2]
    / "firebase-service-account.json"
)


def initialize_firebase():
    if firebase_admin._apps:
        return

    if not SERVICE_ACCOUNT_FILE.exists():
        raise RuntimeError(
            f"Firebase service account file not found: {SERVICE_ACCOUNT_FILE}"
        )

    credential = credentials.Certificate(str(SERVICE_ACCOUNT_FILE))

    firebase_admin.initialize_app(credential)


def verify_firebase_token(id_token: str):
    initialize_firebase()

    decoded_token = auth.verify_id_token(id_token)

    return decoded_token
