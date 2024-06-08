import { useEffect, useState } from "react";

import Visualization from "./components/Visualization";
import { useLazyCypher } from "./hooks/useLazyCypher";
import { getAll } from "./dataaccess/getAll";
import { Waypoint } from "./models/waypoint";
import { Relation } from "./models/relation";

export default function App() {
    const [nodes, setNodes] = useState<Waypoint[]>([]);
    const [relations, setRelations] = useState<Relation[]>([]);
    const [result, loading, runQuery] = useLazyCypher();

    useEffect(() => {
        const query = getAll();
        runQuery(query.query, query.params);
    }, []);
    useEffect(() => {
        if (!result || result.length === 0) {
            return;
        }
        
        const tmpNodes: Waypoint[] = [];
        const tmpRelations: Relation[] = [];
        result.forEach(record => {
            const tmpRecord = record.get('p');
            if (!tmpNodes.find(n => n.id === tmpRecord.start.properties.id)) {
                tmpNodes.push(new Waypoint(tmpRecord.start.properties.id, tmpRecord.start.properties.name, tmpRecord.start.properties.type));
            }
            if (!tmpNodes.find(n => n.id === tmpRecord.end.properties.id)) {
                tmpNodes.push(new Waypoint(tmpRecord.end.properties.id, tmpRecord.end.properties.name, tmpRecord.end.properties.type));
            }
            tmpRelations.push(new Relation(tmpRecord.start.properties.id, tmpRecord.end.properties.id));
        });
        
        setNodes(tmpNodes);
        setRelations(tmpRelations);
    }, [result]);

    const renderContent = () : JSX.Element => {
        if (loading) {
            return <p>Loading...</p>;
        }
        if (!result || result.length === 0) {
            return <p>No data found</p>;
        }
        return <Visualization nodes={nodes} relations={relations} />;
    }
    return (
        <div style={{height:'100%', width: '100%'}}>
            <h1>Database Visualization App</h1>
            <div id="content" style={{height:'100%', width: '100%'}}>
                {renderContent()}
            </div>
        </div>
    );
};
