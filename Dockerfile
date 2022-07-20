FROM ubuntu:latest

RUN apt-get -y upgrade
RUN apt-get update

RUN DEBIAN_FRONTEND=noninteractive apt-get install -y make git zlib1g-dev libssl-dev gperf php-cli cmake g++
RUN git clone https://github.com/tdlib/td.git
WORKDIR td
RUN rm -rf build
RUN mkdir build
WORKDIR build
RUN cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX:PATH=../tdlib ..
RUN cmake --build . --target prepare_cross_compiling
WORKDIR ..
RUN php SplitSource.php
WORKDIR build
RUN cmake --build . --target install
WORKDIR ..
RUN php SplitSource.php --undo
WORKDIR ..

RUN apt-get install -y python2-minimal curl
RUN update-alternatives --install /usr/bin/python python /usr/bin/python2 1
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g node-gyp

WORKDIR /
RUN npm install airgram express body-parser request

COPY ./ /airgram
WORKDIR /airgram

ENTRYPOINT ["/airgram/start.sh"]
