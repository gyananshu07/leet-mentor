from datetime import datetime

from pydantic import BaseModel, Field


class CodeReview(BaseModel):
    problem_title: str | None = None
    code: str

    correctness: str = ""
    improvements: list[str] = Field(default_factory=list)

    timeComplexity: str = ""
    spaceComplexity: str = ""

    created_at: datetime = Field(default_factory=datetime.utcnow)
