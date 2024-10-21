FROM mcr.microsoft.com/dotnet/sdk

VOLUME [ "/app" ]

# Copy necessary files.
COPY ./PurpleMonsterSystem/src/* /app/PurpleMonsterSystem/src
COPY ./PurpleMonsterSystem/Program.cs /app/PurpleMonsterSystem
COPY ./PurpleMonsterSystem/PurpleMonsterSystem.csproj /app/PurpleMonsterSystem
COPY ./PurpleMonsterSystem.sln /app
RUN mkdir /app/PurpleMonsterEvents
RUN mkdir /app/PurpleMonsterEvents/src
COPY ./PurpleMonsterEvents/PurpleMonsterEvents.csproj /app/PurpleMonsterEvents
COPY ./PurpleMonsterEvents/src* /app/PurpleMonsterEvents/src

RUN dotnet build /app/PurpleMonsterSystem

CMD dotnet run --project /app/PurpleMonsterSystem