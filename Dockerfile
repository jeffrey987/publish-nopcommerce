
# create the runtime instance 
FROM mcr.microsoft.com/dotnet/core/sdk:2.2
FROM  mcr.microsoft.com/dotnet/core/aspnet:2.2

RUN apt-get update
RUN apt-get install -y apt-utils
RUN apt-get install -y libgdiplus
RUN apt-get install -y libc6-dev 
RUN ln -s /usr/lib/libgdiplus.so/usr/lib/gdiplus.dll

WORKDIR /app  
COPY ./pubilsh .

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
&& echo 'Asia/Shanghai' >/etc/timezone
# add globalization support
# RUN apk add --no-cache icu-libs
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false
RUN apt-get update && apt-get install -y vim
RUN mkdir bin
RUN mkdir logs  
                                                            
HEALTHCHECK --interval=10s --timeout=5s --retries=3 CMD /bin/bash test.sh                           
ENTRYPOINT ["dotnet", "Nop.Web.dll"]
