# pubsub-to-firestore-cloud-function

Google Cloud Function that pulls messages from Pub/Sub and saves them in
Firestore.

This documentation builds upon that in the repo
[blockchain-etl/bigquery-to-pubsub](/blockchain-etl/bigquery-to-pubsub).

## Connect to Google Cloud
```bash
gcloud config set project <PROJECT-NAME>
gcloud services enable cloudbuild.googleapis.com
gcloud services enable cloudfunctions.googleapis.com
```

## Connect to Firebase
```bash
firebase login --reauth --no-localhost
```

## Create a Firestore database

Visit
[https://console.firebase.google.com/project/exchange-flow-demo/firestore](https://console.firebase.google.com/project/exchange-flow-demo/firestore)

We recommend creating in `production` mode, data stored in `nam5`
(`us-central`).

```bash
firestore init firebase
```

## Update values in `config.sh`

For example, the contents might be:
```bash
#!/usr/bin/env bash

FUNCTION_NAME=transactions-pubsub-to-firestore
FUNCTION_RUNTIME=nodejs12
FUNCTION_TRIGGER_TOPIC=bigquery-to-pubsub-test0
FIRESTORE_COLLECTION_NAME=transactions
```

## Deploy the cloud function
```bash
bash deploy.sh config.sh
```

Assuming there are unexpired messages in `$FUNCTION_TRIGGER_TOPIC`, the
deployed function will immediately begin to process them and insert into the
Firestore collection `$FIRESTORE_COLLECTION_NAME`
