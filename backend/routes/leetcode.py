import json
from typing import Optional

from db.db import db
from fastapi import APIRouter
from pydantic import BaseModel
from utils.helpers import get_hint_prompt
from utils.openai_client import client

router = APIRouter(prefix="/leetcode", tags=["LeetCode"])


class HintInput(BaseModel):
    leetcode_link: Optional[str] = None
    problem_title: Optional[str] = None
    problem_difficulty: Optional[str] = None
    problem_statement: Optional[str] = None


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
                        "concepts": {
                            "type": "array",
                            "items": {"type": "string"},
                        },
                    },
                    "required": ["hints", "concepts"],
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
    }

    db.hints.insert_one(hint_item)

    return data
