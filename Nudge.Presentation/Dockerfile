FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# 2. Copy all clean architecture layer definition structures
COPY ["Nudge.Presentation/Nudge.Presentation.csproj", "Nudge.Presentation/"]
COPY ["Nudge.Application/Nudge.Application.csproj", "Nudge.Application/"]
COPY ["Nudge.Infrastructure/Nudge.Infrastructure.csproj", "Nudge.Infrastructure/"]
COPY ["Nudge.Domain/Nudge.Domain.csproj", "Nudge.Domain/"]
COPY ["Nudge.Shared/Nudge.Shared.csproj", "Nudge.Shared/"]

# 3. Restore all project dependencies at once
RUN dotnet restore "Nudge.Presentation/Nudge.Presentation.csproj"

# 4. Copy the full source code directories into the container filesystem
COPY . .

# 5. Move inside the presentation context folder
WORKDIR "/src/Nudge.Presentation"

EXPOSE 5043

# 6. Bind to all interfaces on the correct port, use dotnet watch for dev hot-reload
ENV ASPNETCORE_URLS=http://0.0.0.0:5043
ENV ASPNETCORE_ENVIRONMENT=Development
ENTRYPOINT ["dotnet", "watch", "run", "--no-launch-profile", "--project", "Nudge.Presentation.csproj"]