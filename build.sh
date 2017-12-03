echo 'building'
npm install && echo npm install success;
instance=topbuzz
pm2=./node_modules/pm2/bin/pm2
RUNNING=$?

export NODE_ENV=production
if [ "${RUNNING}" -ne 0]; then
  echo "start $instance"
  pm2 start -f --interpreter babel-node -n $instance src/app.js
else
  echo "restart $instance"
  $pm2 reload $instance 
fi
npm run restart_prod
