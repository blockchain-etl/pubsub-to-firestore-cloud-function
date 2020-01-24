const Firestore = require('@google-cloud/firestore');

// subscribe is the main function called by Cloud Functions.
module.exports.subscribe = async (data, context) => {
    const parsedMessage = parseMessage(data.data);

    console.log(JSON.stringify(parsedMessage));

    const collectionName = getEnvVar('FIRESTORE_COLLECTION_NAME');
    const firestore = createFirestoreClient();

    let docRef = firestore.collection(collectionName).doc();

    return docRef.set(parsedMessage).then(doc => {
        console.info('stored new doc');
        console.info(doc);
    }).catch(err => {
        console.error(err);
    });
};

const createFirestoreClient = () => {
    const projectId = process.env.GCP_PROJECT;

    const firestore = new Firestore({
        projectId: projectId,
        timestampsInSnapshots: true
    });

    return firestore;
};

// eventToBuild transforms pubsub event message to a build object.
const parseMessage = (data) => {
    return JSON.parse(new Buffer(data, 'base64').toString());
};

const getEnvVar = (varName, defaultVal) => {
    if (typeof process.env[varName] === 'undefined') {
        if (typeof defaultVal === 'undefined') {
            throw `${varName} environment variable is not defined.`;
        } else {
            return defaultVal
        }
    } else {
        return process.env[varName];
    }
};

