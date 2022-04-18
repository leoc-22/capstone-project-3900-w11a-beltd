echo "Installing Identity Service"
cd ./identity_service && \
npm ci && \

echo "Installing Collection Service" && \
cd ../collection_service && \
npm ci && \

echo "Installing UI" && \
cd ../Front\ End/ && \
npm ci && \

echo "Installation Complete"
