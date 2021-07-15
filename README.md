# Kadena Chain Relay Frontend
https://relay.chainweb.com

## Deployment

1. ssh into ubuntu machine and pull the latest commit
```
ssh ubuntu@relay.chainweb.com
cd chainweb-relay-frontend
sudo git pull
```

2. Change the branch to `main` and build for mainnet
```
git checkout main
npm run build
```

3. Change the branch to `testnet` and build for testnet
```
git checkout testnet
npm run build:testnet
```

4. Update the server
```
sudo nginx -s reload
```


The mainnet build will be served at https://relay.chainweb.com and testnet build will be served at https://relay.chainweb.com/testnet
Confirm that each link serves the correct version.
