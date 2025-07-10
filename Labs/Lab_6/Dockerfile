FROM mcr.microsoft.com/dotnet/sdk:8.0 AS dev

WORKDIR /app

RUN apt-get update && apt-get install -y curl

COPY . .

RUN dotnet tool install --global dotnet-watch

ENV PATH="$PATH:/root/.dotnet/tools"

CMD ["dotnet", "watch", "run", "--no-launch-profile", "--urls=http://0.0.0.0:8000"]
