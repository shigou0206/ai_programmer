from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from fastapi.responses import FileResponse
from typing import List, Dict
from . import models, schemas
from .database import get_db

import os

router = APIRouter()


@router.post("/progress", response_model=schemas.Progress)
def create_progress(
        date: str = Form(...),
        activity: str = Form(...),
        file_path: str = Form(...),
        start_time: str = Form(...),
        end_time: str = Form(...),
        db: Session = Depends(get_db)
):
    # Validate and sanitize the file_path to avoid security issues
    if not os.path.exists(file_path):
        raise HTTPException(status_code=400, detail="File path does not exist")

    db_progress = models.Progress(
        date=date,
        activity=activity,
        file_url=file_path,  # Store the absolute file path
        start_time=start_time,
        end_time=end_time
    )
    db.add(db_progress)
    db.commit()
    db.refresh(db_progress)
    return db_progress


@router.get("/get_file")
async def get_file(file_path: str):
    # Validate and sanitize the file_path to avoid security issues
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(file_path)

@router.get("/progress", response_model=List[schemas.Progress])
def read_progress(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    progress = db.query(models.Progress).offset(skip).limit(limit).all()
    return progress


@router.get("/progress/{progress_id}", response_model=schemas.Progress)
def read_progress(progress_id: int, db: Session = Depends(get_db)):
    progress = db.query(models.Progress).filter(models.Progress.id == progress_id).first()
    if progress is None:
        raise HTTPException(status_code=404, detail="Progress not found")
    return progress


@router.put("/progress/{progress_id}", response_model=schemas.Progress)
def update_progress(progress_id: int, progress: schemas.ProgressCreate, db: Session = Depends(get_db)):
    db_progress = db.query(models.Progress).filter(models.Progress.id == progress_id).first()
    if db_progress is None:
        raise HTTPException(status_code=404, detail="Progress not found")
    for key, value in progress.dict().items():
        setattr(db_progress, key, value)
    db.add(db_progress)
    db.commit()
    db.refresh(db_progress)
    return db_progress


@router.delete("/progress/{progress_id}", response_model=schemas.Progress)
def delete_progress(progress_id: int, db: Session = Depends(get_db)):
    db_progress = db.query(models.Progress).filter(models.Progress.id == progress_id).first()
    if db_progress is None:
        raise HTTPException(status_code=404, detail="Progress not found")
    db.delete(db_progress)
    db.commit()
    return db_progress


@router.patch("/progress/{progress_id}/complete", response_model=schemas.Progress)
def complete_progress(progress_id: int, db: Session = Depends(get_db)):
    db_progress = db.query(models.Progress).filter(models.Progress.id == progress_id).first()
    if db_progress is None:
        raise HTTPException(status_code=404, detail="Progress not found")
    db_progress.completed = True
    db.add(db_progress)
    db.commit()
    db.refresh(db_progress)
    return db_progress


@router.get("/statistics/daily", response_model=Dict[str, Dict[str, float]])
def get_daily_statistics(db: Session = Depends(get_db)):
    from sqlalchemy import func
    from datetime import date, timedelta

    today = date.today()
    last_week = today - timedelta(days=6)

    result = db.query(
        models.Progress.date,
        models.Progress.activity,
        func.sum(func.strftime('%s', models.Progress.end_time) - func.strftime('%s', models.Progress.start_time)) / 3600
    ).filter(
        models.Progress.date.between(last_week.strftime("%Y-%m-%d"), today.strftime("%Y-%m-%d")),
        models.Progress.completed == True
    ).group_by(models.Progress.date, models.Progress.activity).all()

    daily_data = {str((today - timedelta(days=i)).strftime("%Y-%m-%d")): {} for i in range(7)}

    for date, activity, duration in result:
        if date in daily_data:
            daily_data[date][activity] = duration

    return daily_data


@router.get("/statistics/monthly", response_model=Dict[str, float])
def get_monthly_statistics(db: Session = Depends(get_db)):
    from sqlalchemy import func
    from datetime import date

    current_year = date.today().year
    result = db.query(
        func.strftime("%Y-%m", models.Progress.date).label("month"),
        func.sum(func.strftime('%s', models.Progress.end_time) - func.strftime('%s', models.Progress.start_time)) / 3600
    ).filter(
        models.Progress.date.startswith(str(current_year)),
        models.Progress.completed == True
    ).group_by("month").all()

    # 确保所有12个月都有数据
    months = {f"{current_year}-{str(month).zfill(2)}": 0.0 for month in range(1, 13)}
    for month, duration in result:
        months[month] = duration

    return months


@router.get("/statistics/activity", response_model=Dict[str, float])
def get_activity_statistics(db: Session = Depends(get_db)):
    from sqlalchemy import func

    result = db.query(
        models.Progress.activity,
        func.sum(func.strftime('%s', models.Progress.end_time) - func.strftime('%s', models.Progress.start_time)) / 3600
    ).filter(
        models.Progress.completed == True
    ).group_by(models.Progress.activity).all()

    return {activity: duration for activity, duration in result}


