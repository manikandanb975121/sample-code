import axios from 'axios';
import React, { useEffect, useState } from 'react';
import OrgChart from '@balkangraph/orgchart.js';

import { Button } from 'react-bootstrap';

import './orgTree.css';
import config from './key.json';

const Chart = () => {
    const [users, setUsers] = useState([]);
    const [file, setFile] = useState();
    const [csvContents, setCsvContents] = useState('');

    const fileReader = new FileReader();

    // when the page loads, retrieve the list of users from the backend
    useEffect(() => {
        axios.post("https://staging.users.api.maximumaccountability.net/api/v1/user/list",
        {
            "page": 0,
            "size": 10
        },
        {
            headers: {
                Authorization:
                    `Bearer ${config.AUTH_TOKEN}` // generate an auth token via the auth/login endpoint, paste it here
            }
        }).then((usersRes) => {
            setUsers(usersRes.data.data.data);
        })
    }, []);

    // when we initially receive users, render the chart using users from the backend
    // there are methods for the chart to manipulate the nodes
    useEffect(() => {
        const userNodes = []; // the list of individual nodes (user "boxes") to be displayed on the chart
        let i = 0;
        for (const user of users) {
            userNodes.push({
                id: ++i, // temporary
                pid: i - 1, // temporary
                name: `${user.fname} ${user.lname}`,
                title: user.title || "Default Title",
                img: `https://cdn.balkan.app/shared/${Math.floor(Math.random() * 9) + 1}.jpg` // temporary
            });
        }

        let chart = new window.OrgChart(document.getElementById("tree"), {
            enableDragDrop: true,
            mouseScrool: window.OrgChart.action.zoom,
            template: "olivia",
            nodeBinding: {
                field_0: "name",
                field_1: "title",
                img_0: "img"
            },
            nodeMenu: {
                export_pdf: {
                    text: "Export PDF",
                    icon: window.OrgChart.icon.pdf(24, 24, "#7A7A7A"),
                    onClick: (id) => pdf(chart, id)
                }
            },

            nodes: userNodes
        });

        chart.on('drop', function (sender, draggedNodeId, droppedNodeId) {
          console.log(sender, "draggedNodeId", draggedNodeId, "droppedNodeId", droppedNodeId)
        });
    }, [users]);

    // helper function to convert CSV contents to an array
    const csvFileToArray = string => {
        const headers = string.slice(0, string.indexOf("\n")).split('|');
        const rows = string.slice(string.indexOf("\n") + 1).split("\n");
        const arr = rows.map(function (row) {
            const values = row.split('|');
            const el = headers.reduce(function (object, header, index) {
            object[header] = values[index];
            return object;
            }, {});
            return el;
        });

        return arr;
    };

    // calculate number of edits needed to get from one string to another
    // used to measure similarity between two strings
    const editDistance = (s1, s2) => {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();
        
        let costs = [];
        for (let i = 0; i <= s1.length; i++) {
            let lastValue = i;
            for (let j = 0; j <= s2.length; j++) {
                if (i === 0)
                    costs[j] = j;
                else {
                    if (j > 0) {
                        let newValue = costs[j - 1];
                        if (s1.charAt(i - 1) !== s2.charAt(j - 1))
                            newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0)
                costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    }

    // when we upload a new CSV file to the page, update the selected CSV file to be imported
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    // after uploading, when we click the "Import" button, update the current csvContents; calls a useEffect hook
    const handleFileSubmit = (e) => {
        e.preventDefault();

        if (file) {
            fileReader.onload = function (event) {
                // change the delimiter to this file to | instead of , (as names are formatted as "Last, First")

                // the regex replaces all commas with | at first, then replaces "| " (with a space at the end) with ", " as these are used for names
                // (as long as the character before is not another "|" [to avoid fields being skipped and offset in the org chart])
                // then removes double quotes and occurences of \r
                setCsvContents(csvFileToArray(event.target.result.replace(/,/g, '|').replace(/([^|])[|] /g, '$1, ').replace(/"|\r/g, '')));
                // set csvContents to the modified CSV file
                // NOTE: the last element will ALWAYS be a null element
            };

            fileReader.readAsText(file);
        } else {
            alert("You have not uploaded a CSV!");
        }
    }

    // when a new CSV of employees is imported, update the chart with users from that list
    useEffect(() => {
        if (csvContents.length === 0) return;

        const userNodes = [];  // the list of individual nodes (user "boxes") to be displayed on the chart
        let i = 0;
        for (const item of csvContents) {
            if (!item['Payroll Name']) continue;
            userNodes.push({
                id: ++i,
                pid: 0,
                name: item['Payroll Name'] || 'Unknown Name',
                title: item['Job Title Description'] || 'Unknown Job',
                business_unit: item['Business Unit Description'] || 'Unknown Unit',
                location: item['Location Description'] || 'Unknown Location',
                home_department: item['Home Department Code'] || 'Unknown Department',
                reports_to: item['Reports To Name'] || 'Unknown',
                img: `https://cdn.balkan.app/shared/${Math.floor(Math.random() * 9) + 1}.jpg`, // temporary
            })
        }

        // calculate hierarchy
        for (let i = 0; i < userNodes.length; i++) {
            // calculate parent of this node
            const filteredList = userNodes.filter((node) => editDistance(node.name.toLowerCase(), csvContents[i]['Reports To Name'].toLowerCase()) < 3);
            if (filteredList.length > 0) {
                userNodes[i].pid = filteredList[0].id;
            }
        }

        // reverse last and first name when displaying
        for (const node of userNodes) {
            const nameSplit = node.name.split(', ');
            node.name = nameSplit[1] + " " + nameSplit[0];
        }

        let chart = new OrgChart(document.getElementById("tree"), {
            enableDragDrop: true,
            mouseScrool: window.OrgChart.action.zoom,
            template: "rony",
            collapse: { // only show top level; when collapsing top level, only show one layer of children at a time
                level: 1,
                allChildren: true,
            },
            nodeBinding: {
                field_0: "name",
                field_1: "title",
                field_2: "business_unit",
                field_3: "location",
                field_4: "home_department",
                field_5: "reports_to",
                img_0: "img"
            },
            nodeMenu: {
                export_pdf: {
                    text: "Export PDF",
                    icon: window.OrgChart.icon.pdf(24, 24, "#7A7A7A"),
                    onClick: (id) => pdf(chart, id)
                },
            },

            nodes: userNodes
        });

    }, [csvContents]);

    const pdf = (chart, nodeId) => {
        chart.exportPDF({
            format: "A4"
        });
    }

    return (
        <React.Fragment>
            <div id="tree" style={{height: "85vh"}}></div>
            <input type={"file"} accept={".csv"} onChange={handleFileChange} />
            <Button className='mt-2' onClick={handleFileSubmit}>Import CSV</Button>
        </React.Fragment>
    );
}

export default Chart;
