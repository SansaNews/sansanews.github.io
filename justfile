set dotenv-load
set dotenv-required
set windows-shell := ["powershell.exe", "-c"]

python := if os() == "linux" { "python3" } else { "python" }
venv := if os() == "linux" { ".venv/bin/" } else { ".venv/Scripts/" }

backend := venv + "python backend.py"
pip := venv + "pip"

# Run dev server
dev:
	bun run dev

# Builds the page
build:
	bun run build

# Check if user is available
check username:
	{{backend}} check {{username}}

# Get user media
get username:
	{{backend}} get {{username}}

# Get media from all users in USERS_PATH
get-all:
	{{backend}} get --all

# Initialize project enviroment
init:
	bun install
	{{python}} -m venv .venv
	{{pip}} install --upgrade pip
	{{pip}} install requests
