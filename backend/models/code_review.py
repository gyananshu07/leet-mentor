from datetime import datetime

from pydantic import BaseModel, Field


class CodeReview(BaseModel):
    code: str
    correctness: str
    improvements: list[str]
    time_complexity: str
    space_complexity: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
