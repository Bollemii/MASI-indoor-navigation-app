import { names, QueryProps } from "./database";

export const getAll = () : QueryProps => {
    return {
        query: `MATCH p=()-[:${names.relationship.name}]->() RETURN p`,
        params: {}
    };
};