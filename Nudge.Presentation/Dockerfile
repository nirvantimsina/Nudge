FROM mcr.microsoft.com/dotnet/sdk:8.0 AS dev
WORKDIR /src

# 1. Copy solution file (if present) and project manifests to leverage layer caching
COPY *.sln ./
COPY ["Nudge.Presentation/Nudge.Presentation.csproj", "Nudge.Presentation/"]
COPY ["Nudge.Application/Nudge.Application.csproj", "Nudge.Application/"]
COPY ["Nudge.Infrastructure/Nudge.Infrastructure.csproj", "Nudge.Infrastructure/"]
COPY ["Nudge.Domain/Nudge.Domain.csproj", "Nudge.Domain/"]
COPY ["Nudge.Shared/Nudge.Shared.csproj", "Nudge.Shared/"]

# 2. Restore all project dependencies
RUN dotnet restore "Nudge.Presentation/Nudge.Presentation.csproj"

# 3. Copy remaining source
COPY . .

WORKDIR "/src/Nudge.Presentation"

EXPOSE 5043

ENV ASPNETCORE_URLS=http://0.0.0.0:5043
ENV ASPNETCORE_ENVIRONMENT=Development
# Polling watch prevents missed file change events across Docker host-container volume boundaries
ENV DOTNET_USE_POLLING_FILE_WATCHER=1

ENTRYPOINT ["dotnet", "watch", "run", "--no-launch-profile", "--non-interactive", "--project", "Nudge.Presentation.csproj"]