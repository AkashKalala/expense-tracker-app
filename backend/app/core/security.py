from passlib.context import CryptContext
import hashlib

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def _normalize_password(password: str) -> str:
    """
    Normalize password to fixed length to avoid bcrypt 72-byte limit issues.
    """
    return hashlib.sha256(password.encode("utf-8")).hexdigest()

def hash_password(password: str) -> str:
    normalized = _normalize_password(password)
    return pwd_context.hash(normalized)

def verify_password(plain: str, hashed: str) -> bool:
    normalized = _normalize_password(plain)
    return pwd_context.verify(normalized, hashed)
