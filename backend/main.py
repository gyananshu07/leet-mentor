from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.leetcode import router as leetcode_router

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(leetcode_router)
