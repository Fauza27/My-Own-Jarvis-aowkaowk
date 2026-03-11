from typing import Optional
from pydantic import BaseModel, HttpUrl, field_validator

class UpdateProfileRequest(BaseModel):
    """Request model for updating user profile."""
    display_name: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None

    @field_validator("display_name")
    @classmethod
    def display_name_not_too_long(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and len(v.strip()) > 100:
            raise ValueError("Display name must be 100 characters or less")
        return v.strip() if v else v