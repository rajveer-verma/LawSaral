# # # from fastapi import FastAPI
# # # from fastapi.middleware.cors import CORSMiddleware

# # # from app.config.database import check_database_connection
# # # from app.config.qdrant import check_qdrant_connection

# # # from app.api.chat import router as chat_router
# # # from app.api.documents import router as documents_router
# # # from app.api.risk import router as risk_router
# # # from app.api.agent import router as agent_router
# # # from app.api.general import router as general_router
# # # from app.api.users import router as users_router


# # # app = FastAPI(
# # #     title="LawSaral V2 API",
# # #     description="Agentic AI Legal Assistant",
# # #     version="2.0.0",
# # # )


# # # app.add_middleware(
# # #     CORSMiddleware,
# # #     allow_origins=[
# # #         "http://localhost:5173",
# # #         "http://127.0.0.1:5173",
# # #     ],
# # #     allow_credentials=True,
# # #     allow_methods=["*"],
# # #     allow_headers=["*"],
# # # )


# # # app.include_router(chat_router)
# # # app.include_router(documents_router)
# # # app.include_router(risk_router)
# # # app.include_router(agent_router)
# # # app.include_router(general_router)
# # # app.include_router(users_router)


# # # @app.get("/")
# # # def root():
# # #     return {
# # #         "message": "LawSaral V2 API is running"
# # #     }


# # # @app.get("/health")
# # # def health():
# # #     database_connected = True
# # #     qdrant_connected = True

# # #     try:
# # #         check_database_connection()
# # #     except Exception:
# # #         database_connected = False

# # #     try:
# # #         check_qdrant_connection()
# # #     except Exception:
# # #         qdrant_connected = False

# # #     return {
# # #         "api": "ok",
# # #         "database": (
# # #             "connected"
# # #             if database_connected
# # #             else "disconnected"
# # #         ),
# # #         "qdrant": (
# # #             "connected"
# # #             if qdrant_connected
# # #             else "disconnected"
# # #         ),
# # #     }


# # # @app.head("/health")
# # # def health_head():
# # #     return


# # # from fastapi import FastAPI
# # # from fastapi.middleware.cors import CORSMiddleware

# # # from app.config.database import check_database_connection
# # # from app.config.qdrant import check_qdrant_connection

# # # from app.api.chat import router as chat_router
# # # from app.api.documents import router as documents_router
# # # from app.api.risk import router as risk_router
# # # from app.api.agent import router as agent_router
# # # from app.api.general import router as general_router
# # # from app.api.users import router as users_router


# # # app = FastAPI(
# # #     title="LawSaral V2 API",
# # #     description="Agentic AI Legal Assistant",
# # #     version="2.0.0",
# # # )


# # # app.add_middleware(
# # #     CORSMiddleware,
# # #     allow_origins=[
# # #         "http://localhost:5173",
# # #         "http://127.0.0.1:5173",
# # #     ],
# # #     allow_credentials=True,
# # #     allow_methods=["*"],
# # #     allow_headers=["*"],
# # # )


# # # app.include_router(chat_router)
# # # app.include_router(documents_router)
# # # app.include_router(risk_router)
# # # app.include_router(agent_router)
# # # app.include_router(general_router)
# # # app.include_router(users_router)


# # # @app.get("/")
# # # def root():
# # #     return {
# # #         "message": "LawSaral V2 API is running"
# # #     }


# # # @app.api_route("/health", methods=["GET", "HEAD"])
# # # def health():
# # #     database_connected = True
# # #     qdrant_connected = True

# # #     try:
# # #         check_database_connection()
# # #     except Exception:
# # #         database_connected = False

# # #     try:
# # #         check_qdrant_connection()
# # #     except Exception:
# # #         qdrant_connected = False

# # #     return {
# # #         "api": "ok",
# # #         "database": (
# # #             "connected"
# # #             if database_connected
# # #             else "disconnected"
# # #         ),
# # #         "qdrant": (
# # #             "connected"
# # #             if qdrant_connected
# # #             else "disconnected"
# # #         ),
# # #     }

# # from fastapi import FastAPI
# # from fastapi.middleware.cors import CORSMiddleware

# # from app.config.database import check_database_connection
# # from app.config.qdrant import check_qdrant_connection

# # from app.api.chat import router as chat_router
# # from app.api.documents import router as documents_router
# # from app.api.risk import router as risk_router
# # from app.api.agent import router as agent_router
# # from app.api.general import router as general_router
# # from app.api.users import router as users_router


# # app = FastAPI(
# #     title="LawSaral V2 API",
# #     description="Agentic AI Legal Assistant",
# #     version="2.0.0",
# # )


# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=[
# #         "http://localhost:5173",
# #         "http://127.0.0.1:5173",
# #     ],
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# # )


# # app.include_router(chat_router)
# # app.include_router(documents_router)
# # app.include_router(risk_router)
# # app.include_router(agent_router)
# # app.include_router(general_router)
# # app.include_router(users_router)


# # @app.api_route("/", methods=["GET", "HEAD"])
# # def root():
# #     return {
# #         "message": "LawSaral V2 API is running"
# #     }


# # @app.api_route("/health", methods=["GET", "HEAD"])
# # def health():
# #     database_connected = True
# #     qdrant_connected = True

# #     try:
# #         check_database_connection()
# #     except Exception:
# #         database_connected = False

# #     try:
# #         check_qdrant_connection()
# #     except Exception:
# #         qdrant_connected = False

# #     return {
# #         "api": "ok",
# #         "database": (
# #             "connected"
# #             if database_connected
# #             else "disconnected"
# #         ),
# #         "qdrant": (
# #             "connected"
# #             if qdrant_connected
# #             else "disconnected"
# #         ),
# #     }


# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# from app.config.database import check_database_connection
# from app.config.qdrant import check_qdrant_connection

# from app.api.chat import router as chat_router
# from app.api.documents import router as documents_router
# from app.api.risk import router as risk_router
# from app.api.agent import router as agent_router
# from app.api.general import router as general_router
# from app.api.users import router as users_router


# app = FastAPI(
#     title="LawSaral V2 API",
#     description="Agentic AI Legal Assistant",
#     version="2.0.0",
# )


# # CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:5173",
#         "http://127.0.0.1:5173",
#         "https://law-saral.vercel.app",
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# # Routers
# app.include_router(chat_router)
# app.include_router(documents_router)
# app.include_router(risk_router)
# app.include_router(agent_router)
# app.include_router(general_router)
# app.include_router(users_router)


# @app.api_route("/", methods=["GET", "HEAD"])
# def root():
#     return {
#         "message": "LawSaral V2 API is running"
#     }


# @app.api_route("/health", methods=["GET", "HEAD"])
# def health():
#     database_connected = True
#     qdrant_connected = True

#     try:
#         check_database_connection()
#     except Exception:
#         database_connected = False

#     try:
#         check_qdrant_connection()
#     except Exception:
#         qdrant_connected = False

#     return {
#         "api": "ok",
#         "database": (
#             "connected"
#             if database_connected
#             else "disconnected"
#         ),
#         "qdrant": (
#             "connected"
#             if qdrant_connected
#             else "disconnected"
#         ),
#     }

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.database import check_database_connection
from app.config.qdrant import check_qdrant_connection

from app.api.chat import router as chat_router
from app.api.documents import router as documents_router
from app.api.risk import router as risk_router
from app.api.agent import router as agent_router
from app.api.general import router as general_router
from app.api.users import router as users_router


# =========================================================
# FastAPI Application
# =========================================================

app = FastAPI(
    title="LawSaral V2 API",
    description="Agentic AI Legal Assistant",
    version="2.0.0",
)


# =========================================================
# CORS CONFIGURATION
# =========================================================

allowed_origins = [
    # Local development
    "http://localhost:5173",
    "http://127.0.0.1:5173",

    # Production frontend
    "https://law-saral.vercel.app",
]


app.add_middleware(
    CORSMiddleware,

    # Allowed frontend origins
    allow_origins=allowed_origins,

    # Required if frontend sends credentials/authentication
    allow_credentials=True,

    # Allow GET, POST, PUT, DELETE, OPTIONS, etc.
    allow_methods=["*"],

    # Allow Authorization, Content-Type, etc.
    allow_headers=["*"],

    # Optional: expose these headers to frontend
    expose_headers=["*"],

)


# =========================================================
# API ROUTERS
# =========================================================

app.include_router(chat_router)
app.include_router(documents_router)
app.include_router(risk_router)
app.include_router(agent_router)
app.include_router(general_router)
app.include_router(users_router)


# =========================================================
# ROOT ENDPOINT
# =========================================================

@app.api_route("/", methods=["GET", "HEAD"])
def root():
    return {
        "message": "LawSaral V2 API is running"
    }


# =========================================================
# HEALTH CHECK
# =========================================================

@app.api_route("/health", methods=["GET", "HEAD"])
def health():

    database_connected = True
    qdrant_connected = True

    # -----------------------------
    # Check MongoDB
    # -----------------------------

    try:
        check_database_connection()

    except Exception:
        database_connected = False


    # -----------------------------
    # Check Qdrant
    # -----------------------------

    try:
        check_qdrant_connection()

    except Exception:
        qdrant_connected = False


    # -----------------------------
    # Return health status
    # -----------------------------

    return {
        "api": "ok",

        "database": (
            "connected"
            if database_connected
            else "disconnected"
        ),

        "qdrant": (
            "connected"
            if qdrant_connected
            else "disconnected"
        ),
    }