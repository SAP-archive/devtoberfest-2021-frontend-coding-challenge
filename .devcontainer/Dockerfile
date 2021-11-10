#-------------------------------------------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See https://go.microsoft.com/fwlink/?linkid=2090316 for license information.
#-------------------------------------------------------------------------------------------------------------

FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:14

# The javascript-node image includes a non-root node user with sudo access. Use
# the "remoteUser" property in devcontainer.json to use it. On Linux, the container
# user's GID/UIDs will be updated to match your local UID/GID when using the image
# or dockerFile property. Update USER_UID/USER_GID below if you are using the
# dockerComposeFile property or want the image itself to start with different ID
# values. See https://aka.ms/vscode-remote/containers/non-root-user for details.
ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID
ENV KUBECONFIG="/usr/local/share/kube-devcontainer/kubeconfig.yml"
ENV XSCLI="/workspaces/vsc-sap-hana-mta-dev-env-node14x/XS_CLIENT00P_134-70001320"
ENV PATH=$PATH:${XSCLI}/bin
ENV npm config set registry https://registry.npmjs.org/

WORKDIR /workspaces/vsc-sap-hana-mta-dev-env-node14x
COPY ./ ./
# COPY additional-features .

# # # Prepare for apt-based install of Cloud Foundry CLI by adding Cloud Foundry Foundation public key & package repository
# # # (see https://docs.cloudfoundry.org/cf-cli/install-go-cli.html#pkg-linux).
RUN wget -q -O - https://packages.cloudfoundry.org/debian/cli.cloudfoundry.org.key | sudo apt-key add - ; \
  echo "deb https://packages.cloudfoundry.org/debian stable main" | sudo tee /etc/apt/sources.list.d/cloudfoundry-cli.list \
  && sudo apt-get -y update \
  # To install cf CLI v6, run
  && sudo apt-get -y install cf-cli \
  # Keytar - Node module to manage system keychain (VSCode keytar)
  && sudo apt-get update -y \
  && sudo apt-get -y install libsecret-1-dev \
  # Alter node user as needed, install tslint, typescript. eslint is installed by javascript image
  && if [ "$USER_GID" != "1000" ] || [ "$USER_UID" != "1000" ]; then \
  groupmod --gid $USER_GID $USERNAME \
  && usermod --uid $USER_UID --gid $USER_GID $USERNAME \
  && chown -R $USER_UID:$USER_GID /home/$USERNAME; \
  fi \
  # Install tslint, typescript. eslint is installed by javascript image
  && sudo -u ${USERNAME} npm install -g typescript \
  # https://help.sap.com/viewer/17d50220bcd848aa854c9c182d65b699/Latest/en-US/17efa217f7f34a9eba53d7b209ca4280.html#loio5701672c35354d5b91759a911eaf1171
  && sudo -u ${USERNAME} npm set @sap:registry=https://npm.sap.com -g \
  # Install global node modules for SAP CAP and frontend development.
  && npm config set registry https://registry.npmjs.org/ \
  # Keytar - Node module to manage system keychain (VSCode keytar)
  && sudo -s npm i keytar \
  && sudo -u ${USERNAME} npm i @sap/cds-dk \
  -g mta \
  -g mbt \
  -g yo \
  -g @sap/generator-base-mta-module \
  -g @sap/ux-ui5-tooling \    
  -g @sap/generator-fiori \
  -g yo generator-easy-ui5 \
  -g @ui5/cli \
  @sapui5/generator-sapui5-templates \
  @sap/generator-add-hdb-module \
  @sap/generator-cap-project \
  @sap/generator-fiori \
  @sap/generator-hdb-project \
  @sap/ux-ui5-fe-mockserver-middleware \
  @sap/hana-client \
  hana-cli \
  # Install extra tools for CAP development & deployment.
  && apt-get update && export DEBIAN_FRONTEND=noninteractive \
  && apt-get -y install --no-install-recommends apt-utils dialog 2>&1 \
  && apt-get -y install sqlite cf-cli \
  # XS CLI for running against HANA XSA
  && apt-get update \
  && apt-get install --yes --no-install-recommends procps unzip \
  && rm -rf /var/lib/apt/lists/* \
  && mkdir --parents ${XSCLI} \
  && chown --recursive ${USERNAME}:${USERNAME} ${XSCLI} \
  # List all Cloud Foundry CLI plugins to see whether the installation worked.
  # cf repo-plugins | grep multiapps
  # cf plugins
  && sudo -u ${USERNAME} cf add-plugin-repo CF-Community https://plugins.cloudfoundry.org \
  && sudo -u ${USERNAME} cf install-plugin blue-green-deploy -f -r CF-Community \
  && sudo -u ${USERNAME} cf install-plugin multiapps -f -r CF-Community \
  && sudo -u ${USERNAME} cf install-plugin -f https://github.com/cloudfoundry-incubator/multiapps-cli-plugin/releases/latest/download/multiapps-plugin.linux64
# =========================
# ADD ADDITIONAL FEATURES
# =========================
# RUN chmod +x -R scripts \
#     && ./scripts/1-kubectl
# RUN chmod +x -R scripts \
#     && ./scripts/2-kube-devcontainer
# RUN chmod +x -R scripts \
#     && ./scripts/3-minikube
# RUN chmod +x -R scripts \
#     && ./scripts/4-helm
# RUN chmod +x -R scripts \
#     && ./scripts/5-docker
# RUN chmod +x -R scripts \
#     && ./scripts/6-python