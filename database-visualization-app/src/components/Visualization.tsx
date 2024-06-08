import { useEffect, useState } from 'react';
import { BasicNvlWrapper } from '@neo4j-nvl/react'
import { Node, Relationship } from '@neo4j-nvl/base';

import { Waypoint } from '../models/waypoint';
import { Relation } from '../models/relation';

interface VisualizationProps {
    nodes: Waypoint[],
    relations: Relation[],
};
export default function Visualization(props : VisualizationProps) {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [rels, setRels] = useState<Relationship[]>([]);

    useEffect(() => {
        if (!props.nodes || props.nodes.length === 0) {
            return;
        }

        const tmpNodes: Node[] = props.nodes.length === 0 ? [] :
            props.nodes.map(n => ({id : n.id}));
        const tmpRels: Relationship[] = props.relations.length === 0 ? [] :
            props.relations.map(r => ({id: `${r.start}>>>${r.end}`, from: r.start, to: r.end}));
        setNodes(tmpNodes);
        setRels(tmpRels);
    }, [props.nodes, props.relations]);

    if (!nodes || nodes.length === 0) {
        return <p>No data found</p>;
    }

    return <BasicNvlWrapper
        nodes={nodes}
        rels={rels}
        style={{display: 'block'}}
        nvlOptions={{minimapContainer: document.getElementById('content') || document.body}}
    />;
};