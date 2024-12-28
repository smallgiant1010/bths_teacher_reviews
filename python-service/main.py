from datetime import datetime
import os
import gspread
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from google.oauth2.service_account import Credentials
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.edge.service import Service
import time
from dotenv import load_dotenv

load_dotenv()
scopes = [
    "https://www.googleapis.com/auth/spreadsheets.readonly",
    "https://www.googleapis.com/auth/drive.readonly"
]

creds = Credentials.from_service_account_file(os.getenv("API_PATH"), scopes=scopes) 

client = gspread.authorize(credentials=creds) # type: ignore
sheet = client.open("Copy of Fall 2024 BTHS Discord Crowdsourced Course/Teacher Experience Survey (Responses)").sheet1

app = FastAPI()
app.add_middleware( 
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["GET"],
)


def scrape_website(website):
    edge_driver_path = "./msedgedriver.exe"
    options = webdriver.EdgeOptions()
    driver = webdriver.Edge(service=Service(edge_driver_path), options=options)
    try:
        driver.get(website)
        print("Page Loaded...")
        driver.implicitly_wait(5)
        html = driver.page_source
        time.sleep(5)
        return html
    finally:
        driver.quit()

def extract_staff_content(html_content, storage):
    soup = BeautifulSoup(html_content, 'html5lib')
    staff_div = soup.find("div", { "id" : "staff" })
    if not staff_div: 
        return storage
    else:
        for category_div in staff_div.find_all("div", { "class" : "staff-category"}):  # type: ignore
            category = category_div.find("h1").text
            for staff_list in category_div.find_all("ul", { "class": "staff-categoryStaffMembers" }):
                for staff_member in staff_list.find_all("li", { "class" : "staff-categoryStaffMember" }):
                    temp = {}
                    temp['category'] = str(category)
                    img_tag = staff_member.find("img", class_="staffPhoto lazy")
                    if img_tag:
                        src_img = img_tag.get('src')
                        temp["img"] = f"https://www.bths.edu/{src_img}"
                    else:
                        temp["img"] = "https://www.bths.edu/apps/pics/blank_profile_public.png"
                    
                    name_tag = staff_member.find("dt")
                    if name_tag:
                        temp["name"] = name_tag.get_text(strip=True)
                    
                    occupation_tag = staff_member.find("dd")
                    if occupation_tag:
                        temp["occupation"] = occupation_tag.get_text(strip=True)
                    
                    if temp:
                        storage.append(temp)

    return storage 

def extract_teachers_only(html_content, storage):
    soup = BeautifulSoup(html_content, 'html5lib')
    staff_div = soup.find("div", { "id" : "staff" })
    if not staff_div: 
        return storage
    else:
        for category_div in staff_div.find_all("div", { "class" : "staff-category"}):  # type: ignore
            for staff_list in category_div.find_all("ul", { "class": "staff-categoryStaffMembers" }):
                for staff_member in staff_list.find_all("li", { "class" : "staff-categoryStaffMember" }):
                    name_tag = staff_member.find("dt")
                    if name_tag:
                        storage.append(name_tag.get_text(strip=True))

    return storage

@app.get("/api/spreadsheet")
def get_all_data():
    data = sheet.get_all_records()
    new_data = []
    for obj in data:
        _createdAt = datetime.strptime(str(obj["Timestamp"]), '%m/%d/%Y %H:%M:%S')
        courseName = str(obj["Course Name"]).rstrip().upper()
        years = obj["School year taken (i.e. 2023-24, 2022-23)"]
        teacher_name_stringified = str(obj["Teacher name"]).rstrip().lstrip()
        teacherName = teacher_name_stringified.upper() if teacher_name_stringified.find(" ") != -1 else teacher_name_stringified.upper()
        experience = obj["How was your experience?"]
        difficulty = obj["Difficulty rating (1-10)"]
        workload = obj["Workload (1-10)"]
        advice = obj["Any advice you would share?"]
        resources = obj["Any resources you would recommend?"]
        temp = {
            "createdAt" : _createdAt,
            "updatedAt" : _createdAt,
            "courseName" : courseName,
            "years": years,
            "teacherName": teacherName,
            "experience": experience,
            "difficulty": difficulty,
            "workload": workload,
            "advice": advice,
            "resources": resources,
            "userid": "anonymous",
        }
        new_data.append(temp)
    return new_data

@app.get("/api/full_faculty")
def get_all_faculty():
    html_content = scrape_website("https://www.bths.edu/apps/staff/")
    return extract_staff_content(html_content, [])

@app.get("/api/faculty_list")
def get_all_teachers():
    html_content = scrape_website("https://www.bths.edu/apps/staff/")
    return extract_teachers_only(html_content, [])

