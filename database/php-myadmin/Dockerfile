FROM phpmyadmin

# Install wget
RUN apt-get update && \
    apt-get install -y wget unzip

# Download pmahomme-dark theme from GitHub
RUN wget -O /tmp/pmahomme-dark.zip https://github.com/i12bretro/pmahomme-dark/archive/refs/heads/master.zip && \
    unzip /tmp/pmahomme-dark.zip -d /var/www/html/themes/ && \
    mv /var/www/html/themes/pmahomme-dark-master /var/www/html/themes/pmahomme-dark && \
    rm /tmp/pmahomme-dark.zip

EXPOSE 80