import neo4j from 'neo4j-driver';

const URI = process.env.EXPO_PUBLIC_NEO4J_URI;
const USER = process.env.EXPO_PUBLIC_NEO4J_USER;
const PASSWORD = process.env.EXPO_PUBLIC_NEO4J_PASSWORD;

const driver = neo4j.driver(
  URI,
  neo4j.auth.basic(USER, PASSWORD)
);

export { driver }

export type QueryProps = {
  query: string;
  params: object;
}
