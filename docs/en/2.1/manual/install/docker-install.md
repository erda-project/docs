# Deploy via Docker Compose

::: tip Tips
This installation method is only suitable for trial environments where you can get experience with Erda locally, but not applicable for production environments.
:::

## Prerequisites

- Docker version: 20.10.0 and later
- Node configuration: 4 core, 8 GB

## Install via Script

1. Run the following command:

   ```shell
   /bin/bash -c "$(curl -fsSL https://static.erda.cloud/quick-start/quick-start.sh)"
   ```

2. Add hosts

   :::tip Tips
   If you have Erda installed on a remote server and want to access it locally, you need to perform this operation on the local machine.
   :::

   ```shell
   echo "<your_server_ip> erda.local one.erda.local collector.erda.local openapi.erda.local" | sudo tee -a /etc/hosts
   ```

3. Visit [*http://erda.local*](http://erda.local) to get started.
