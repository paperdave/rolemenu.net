import { MONGO_DB, REALM_APPID, REALM_TOKEN } from '$lib/env';
import { RoleMenu } from '$lib/structures/RoleMenu';
import type { DataType, Instance } from '@davecode/structures';
import * as realm from 'realm-web';
import type { Database } from './realm-types';
import { WrappedCollection } from './WrappedCollection';

const collections = [[RoleMenu, 'menus', { primaryKey: 'id' }]] as const;

type CollectionType = Instance<typeof collections[number][0]>;

declare global {
	// eslint-disable-next-line no-var
	var realmDB: Database | undefined;
}

async function createRealmConnection() {
	if (global.realmDB) {
		return global.realmDB;
	}
	const App = new realm.App(REALM_APPID);
	const credentials = realm.Credentials.apiKey(REALM_TOKEN);
	const user = await App.logIn(credentials);
	const client = user.mongoClient('mongodb-atlas');
	global.realmDB = client.db(MONGO_DB);
	return global.realmDB;
}

export async function getDatabase<T extends CollectionType>(
	schema: DataType<T>
): Promise<WrappedCollection<T, any>> {
	const db = await createRealmConnection();
	const [, name, opts] = collections.find(([type]) => (type as any) === schema) ?? [];
	if (!name) {
		throw new Error(`No collection found for ${(schema as any).name}`);
	}
	return new WrappedCollection(db.collection(name), { type: schema, ...opts });
}
