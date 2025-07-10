FROM mcr.microsoft.com/dotnet/sdk:8.0 AS dev

WORKDIR /app

COPY . .

RUN dotnet tool install --global dotnet-watch

ENV PATH="$PATH:/root/.dotnet/tools"

CMD ["dotnet", "watch", "run", "--no-launch-profile", "--urls=http://0.0.0.0:5000"]
