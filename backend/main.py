from fastapi import FastAPI
from routers import router as api_router

app = FastAPI()

app.include_router(api_router)

@app.get("/")
async def main():
    return {"message":"Connect successfully"}