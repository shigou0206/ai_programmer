from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime, timedelta
from typing import List

router = APIRouter()

class Material(BaseModel):
    content: str
    created_at: datetime

class ReviewPlan(BaseModel):
    content: str
    review_dates: List[datetime]

@router.post("/ebbinghaus/materials", response_model=ReviewPlan)
def create_review_plan(material: Material):
    review_days = [1, 2, 5, 10, 20]
    review_dates = [material.created_at + timedelta(days=day) for day in review_days]

    return ReviewPlan(content=material.content, review_dates=review_dates)
