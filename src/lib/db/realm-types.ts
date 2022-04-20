export type Document<IDType = unknown> = globalThis.Realm.Services.MongoDB.Document<IDType>;
export type Database = globalThis.Realm.Services.MongoDBDatabase;
export type Collection<T extends Document> = globalThis.Realm.Services.MongoDB.MongoDBCollection<T>;
