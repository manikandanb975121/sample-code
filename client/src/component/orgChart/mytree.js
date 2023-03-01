import React from "react";
import OrgChart from "@balkangraph/orgchart.js";
//export default function Chart(props) {
const Chart = (props) => {
    const divRef = React.useRef();

    const {
        nodes,
        chartRef,
        handleDropOnTheNode,
        getOrgTreeDataWithUserId,
        showModal,
        showCreateUserModal,
    } = props;
 
    React.useEffect(() => {
        console.log("props changed");
        const chart = new OrgChart(divRef.current, {
            template: "olivia",
            mode: "dark",
            nodes: nodes.map((e) => ({
                name: e.name,
                email: e.email,
                profileImage: e.profileImage,
                id: e.id,
                pid: e.pid,
            })),
            enableSearch: false,
            enableDragDrop: true,
            nodeMouseClick: OrgChart.action.none,
            scaleInitial: OrgChart.match.boundary,
           
            tags: {
                orange: {
                    template: "anaOrange",
                },
            },
            editForm: {
                readOnly: true,
                photoBinding:"profileImage",
                generateElementsFromFields: false,
                elements: [
                    { type: "textbox", label: "Full Name", binding: "name" },
                    { type: "textbox", label: "Email", binding: "email" },
                  
                ],
                buttons: {
                    user: {
                        icon: OrgChart.icon.user(24, 24, "#fff"),
                        text: "Add Supervisor",
                    },
                    edit: null,
                    share: null,
                    pdf: null,
                    remove: null,
                },
                addMore: null,
                addMoreBtn: null,
                addMoreFieldName: null,
               
            },

            nodeMenu: {
                add: { text: "Add" },
                edit: { text: "Edit" },
            },
            nodeBinding: {
                field_0: "name",
                field_1: "email",
                img_0: "profileImage",
            },
        });

        chart.on("click", (sender, args) => {
            console.log("in onclick", args);
            getOrgTreeDataWithUserId(args.node.id);
        });

        chart.editUI.on("button-click", function (sender, args) {
            console.log("in edit ui onclick");
            if (args.name == "user") {
                showModal();
            }
        });

        chart.on("drop", (sender, draggedNodeId, droppedNodeId) => {
            console.log("in drop");
            handleDropOnTheNode(droppedNodeId, draggedNodeId);
        });

        chart.nodeMenuUI.on("show", (sender, args) => {
            const { firstNodeId } = args;
            props.setNodeMenuId(firstNodeId);
        });

        chart.onAddNode(async function (args) {
            const {
                data: { id: node_id, pid: node_pid },
            } = args;
            showCreateUserModal({ nodeId: node_id, nodePid: node_pid });
        });

        chart.nodes = nodes;
        chartRef.current = chart;
    }, [
        nodes,
        chartRef,
        getOrgTreeDataWithUserId,
        showCreateUserModal,
        handleDropOnTheNode,
        showModal,
    ]);

    return <div id="tree" ref={divRef}></div>;
};

export default Chart;
