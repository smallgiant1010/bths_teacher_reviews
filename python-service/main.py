from attr import dataclass
import gspread
from google.oauth2.service_account import Credentials

scopes = [
    "https://www.googleapis.com/auth/spreadsheets.readonly",
    "https://www.googleapis.com/auth/drive.readonly"
]

creds = Credentials.from_service_account_file("./secretKey.json", scopes=scopes)

client = gspread.authorize(credentials=creds) # type: ignore
sheet = client.open("Copy of Fall 2024 BTHS Discord Crowdsourced Course/Teacher Experience Survey (Responses)").sheet1

@dataclass
class commentObject:
    Timestamp: str
    CourseName: str
    YearsTaken: str
    Experience: str
    Difficulty: int
    WorkLoad: int
    Advice: int

data = sheet.get_all_records()
[print(row) for row in data]

