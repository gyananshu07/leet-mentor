import json
from typing import Optional

from db.db import db
from fastapi import APIRouter
from pydantic import BaseModel
from utils.helpers import get_hint_prompt, get_code_review_prompt
from utils.openai_client import client

router = APIRouter(prefix="/leetcode", tags=["LeetCode"])


class HintInput(BaseModel):
    leetcode_link: Optional[str] = None
    problem_title: Optional[str] = None
    problem_difficulty: Optional[str] = None
    problem_statement: Optional[str] = None


class CodeReviewInput(BaseModel):
    code: str
    language: str


@router.post("/generate-hints")
def generate_hints(hint_input: HintInput):
    response = client.responses.create(
        model="gpt-5.5",
        input=get_hint_prompt(hint_input),
        tools=[{"type": "web_search"}],
        text={
            "format": {
                "type": "json_schema",
                "name": "hints",
                "schema": {
                    "type": "object",
                    "properties": {
                        "hints": {"type": "array", "items": {"type": "string"}},
                        "concepts": {"type": "array", "items": {"type": "string"}},
                        "problem_title": {"type": "string"},
                    },
                    "required": ["hints", "concepts", "problem_title"],
                    "additionalProperties": False,
                },
            }
        },
    )
    data = json.loads(response.output_text)

    hint_item = {
        **hint_input.model_dump(),
        "hints": data.get("hints", []),
        "concepts": data.get("concepts", []),
        "problem_title": data.get("problem_title", ""),
        "type": "hint",
    }

    db.history.insert_one(hint_item)

    return data


@router.post("/review-code")
def review_code(code_review_input: CodeReviewInput):
    response = client.responses.create(
        model="gpt-5.5",
        input=get_code_review_prompt(code_review_input),
        text={
            "format": {
                "type": "json_schema",
                "name": "review",
                "schema": {
                    "type": "object",
                    "properties": {
                        "correctness": {"type": "string"},
                        "improvements": {"type": "array", "items": {"type": "string"}},
                        "timeComplexity": {"type": "string"},
                        "spaceComplexity": {"type": "string"},
                    },
                    "required": [
                        "correctness",
                        "improvements",
                        "timeComplexity",
                        "spaceComplexity",
                    ],
                    "additionalProperties": False,
                },
            }
        },
    )
    data = json.loads(response.output_text)

    code_review_item = {
        **code_review_input.model_dump(),
        "correctness": data.get("correctness", ""),
        "improvements": data.get("improvements", []),
        "timeComplexity": data.get("timeComplexity", ""),
        "spaceComplexity": data.get("spaceComplexity", ""),
    }

    db.code_review.insert_one(code_review_item)

    return data


@router.get("/get-history")
def get_history():
    return [
        {**{k: v for k, v in item.items() if k != "_id"}, "id": str(item["_id"])}
        for item in db.history.find()
    ]
