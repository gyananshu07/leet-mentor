from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class HintHistory(BaseModel):
    user_id: str
    leetcode_link: Optional[str] = None
    problem_title: Optional[str] = None
    problem_difficulty: Optional[str] = None
    problem_statement: Optional[str] = None
    hints: list[str] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
