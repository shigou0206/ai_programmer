from sqlalchemy import Column, Integer, String, Boolean
from .database import Base

class Progress(Base):
    __tablename__ = "progress"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(String, nullable=False)
    activity = Column(String, nullable=False)
    file_url = Column(String, nullable=True)
    start_time = Column(String, nullable=True)
    end_time = Column(String, nullable=True)
    completed = Column(Boolean, default=False)  # 新增字段
