
#!/bin/bash

pm2 --log-date-format "YYYY-MM-DD HH:mm" start npm --name "gateway-push" -- start