from pydantic import BaseModel

class ProgressBase(BaseModel):
    date: str
    activity: str
    file_url: str = None
    start_time: str = None
    end_time: str = None
    completed: bool = False  # 新增字段

class ProgressCreate(ProgressBase):
    pass

class Progress(ProgressBase):
    id: int

    class Config:
        orm_mode = True
