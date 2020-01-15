import { Component, OnInit } from '@angular/core';
import { SibobsService } from './../../services/sibobs.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Chart from 'chart.js';

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit{
    private unsubscribe$ = new Subject();
    public csvData;
    public totalCount = 0;

    public dataset1 = [
        {
            "stmt": "satisfied with hygiene standars of storage facilities available",
            "id": "q30",
            "yes": 0
        },
        {
            "stmt": "feel that they are paid less for the yield /goods supplied",
            "id": "q31",
            "yes": 0
        },
        {
            "stmt": "think that the middle men are exploiting fishermen by paying less for their yield",
            "id": "q32",
            "yes": 0
        },
        {
            "stmt": "think exporting Indian Fish products abroad provide maximum profits than the retail selling in local markets",
            "id": "q33",
            "yes": 0
        },
        {
            "stmt": "think that small fishes are being utilized properly without wastage",
            "id": "q34",
            "yes": 0
        },
        {
            "stmt": "say that there are sufficient provision to prevent loss of yield/catches",
            "id": "q35",
            "yes": 0
        },
        {
            "stmt": "think the Indian Fish products can improve quality to attract International Markets",
            "id": "q36",
            "yes": 0
        },
        {
            "stmt": "have experienced the growing decline in the yield /catches",
            "id": "q37",
            "yes": 0
        },
        {
            "stmt": "think more number of women are interested in joining fishing industry",
            "id": "q38",
            "yes": 0
        },
        {
            "stmt": "were able to market all their goods without wastage",
            "id": "q39",
            "yes": 0
        },
        {
            "stmt": "think the Government should reduce the ban period of fishing",
            "id": "q40",
            "yes": 0
        },
        {
            "stmt": "think the compensation paid by the Government for the ban period of fishing is sufficient",
            "id": "q41",
            "yes": 0
        }
    ]

    public dataset2 = [
        {
            "stmt": "are aware of the Marine Fishing Policy",
            "id": "q42",
            "yes": 0
        },
        {
            "stmt": "think Government of India should ban Indian Fisherman from fishing in other countries' waters",
            "id": "q43",
            "yes": 0
        },
        {
            "stmt": "think Indian Government should provide more facilities to fishermen considering the risks involved in their profession",
            "id": "q44",
            "yes": 0
        },
        {
            "stmt": "are aware of the advantages of having Vessel Monitoring Systems on board fishing vessels",
            "id": "q45",
            "yes": 0
        },
        {
            "stmt": "are willing to fit Vessel Monitoring System in their vessel with Government subsidy",
            "id": "q46",
            "yes": 0
        },
        {
            "stmt": "think the Government has alerted and evacuated people during calamities",
            "id": "q47",
            "yes": 0
        },
        {
            "stmt": "agree to the vessel registration and licensing policy",
            "id": "q48",
            "yes": 0
        },
        {
            "stmt": "are satisfied with the government welfare policies to the fishermen communities",
            "id": "q49",
            "yes": 0
        },
        {
            "stmt": "agree that Government should provide more better storage facilities for the catches with modern tecniques",
            "id": "q50",
            "yes": 0
        },
        {
            "stmt": "think the Insurance coverage schemes are sufficient for the fishermen communities",
            "id": "q51",
            "yes": 0
        },
        {
            "stmt": "think the monetary compensation provided for ban period is sufficient",
            "id": "q52",
            "yes": 0
        },
        {
            "stmt": "think Government should formulate more effective policies to help the growth of mariculture farming",
            "id": "q53",
            "yes": 0
        },
    ]

    public dataset3 = [
        {
            "stmt": "think fishery resources are exhaustive",
            "id": "q54",
            "yes": 0
        },
        {
            "stmt": "think there is depletion of marine resources",
            "id": "q55",
            "yes": 0
        },
        {
            "stmt": "agree uncontrollable harvest will exhaust marine resources",
            "id": "q56",
            "yes": 0
        },
        {
            "stmt": "think the pollution of marine waters are due to dumping of waste into the seas",
            "id": "q57",
            "yes": 0
        },
        {
            "stmt": "think there are sufficient steps taken for the protection of maritime industry",
            "id": "q58",
            "yes": 0
        },
        // {
        //     "stmt": "",
        //     "id": "q59",
        //     "yes": 0
        // },
        // {
        //     "stmt": "",
        //     "id": "q60",
        //     "yes": 0
        // },
        {
            "stmt": "believe growing of mangroves will help prevent flooding into residential areas of the coastal villages",
            "id": "q61",
            "yes": 0
        },
        {
            "stmt": "think developing artificial coral reefs helps in improving the yield of the catches",
            "id": "q62",
            "yes": 0
        },
        {
            "stmt": "think developing hatcheries is helpful for increasing the yield in catches",
            "id": "q63",
            "yes": 0
        },
        {
            "stmt": "are aware of the effects of marine pollution",
            "id": "q64",
            "yes": 0
        },
        // {
        //     "stmt": "",
        //     "id": "q65",
        //     "yes": 0
        // },
    ]

    public dataset = [this.dataset1, this.dataset2, this.dataset3];

    public barDataset1 = [
        {
            "stmt": "Reduce Boat Size",
            "id": "q59_1",
            "yes": 0
        },
        {
            "stmt": "Control Fishing Area",
            "id": "q59_2",
            "yes": 0
        },
        {
            "stmt": "Control During Ban Period",
            "id": "q59_3",
            "yes": 0
        },
        {
            "stmt": "Limit Fishing Duration",
            "id": "q59_4",
            "yes": 0
        },
        {
            "stmt": "Restriction on Fishing Gears",
            "id": "q59_5",
            "yes": 0
        },
    ]

    public barDataset2 = [
        {
            "stmt": "Stop Plastic Usage at Sea",
            "id": "q60_1",
            "yes": 0
        },
        {
            "stmt": "Prevent Industrial Waste Dump at Sea",
            "id": "q60_2",
            "yes": 0
        },
        {
            "stmt": "Prevent Sewage Waste Thrown into Sea",
            "id": "q60_3",
            "yes": 0
        },
        {
            "stmt": "Prevent Oil Spillage",
            "id": "q60_4",
            "yes": 0
        },
        {
            "stmt": "Stop Human Waste",
            "id": "q60_5",
            "yes": 0
        },
    ]

    public barDataset3 = [
        {
            "stmt": "Avoid Chemicals",
            "id": "q65_1",
            "yes": 0
        },
        {
            "stmt": "Avoid Washing at Sea",
            "id": "q65_2",
            "yes": 0
        },
        {
            "stmt": "Influencing Policy Makers",
            "id": "q65_3",
            "yes": 0
        },
        {
            "stmt": "Volunteer at Polution Site",
            "id": "q65_4",
            "yes": 0
        },
        {
            "stmt": "Ensure No Debris & Waste is Dumped into Sea",
            "id": "q65_5",
            "yes": 0
        },
    ]

    public barDatasets = [this.barDataset1, this.barDataset2, this.barDataset3];

    public currentDataset = this.dataset1;
    public currentId = 0;

    public barChart1;
    public barChart2;
    public barChart3;

    constructor (private _so: SibobsService){ }

    ngOnInit(){

        this._so.newCSVData
        // The subscription is alive until the isStopped is set to true by the next and complete in ngOnDestroy
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(newCSVData => {
            Promise.resolve(null).then(
            () => {
                this.csvData = newCSVData;
                this.populate();
            });

        });
    }

    ngOnDestroy() {
        // Prevent memory leaking
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    populate() {
        this.totalCount = this.csvData.length-1;
        this.csvData.forEach(value => {
            if(value["id"] === "")
                return;
            this.currentDataset.forEach((ds, i) => {
                if(parseInt(value[ds['id']]) == 1)
                    ds['yes'] += 1;
            });
            if(this.currentId == 2 && this.isBarDrawn == false){
                this.barDataset1.forEach((ds, i) => {
                    if(parseInt(value[ds['id']]) == 1)
                        ds['yes'] += 1;
                });
                this.barDataset2.forEach((ds, i) => {
                    if(parseInt(value[ds['id']]) == 1)
                        ds['yes'] += 1;
                });
                this.barDataset3.forEach((ds, i) => {
                    if(parseInt(value[ds['id']]) == 1)
                        ds['yes'] += 1;
                });
            }
        });
        if(this.currentId == 2)
            this.drawBarCharts();        
    }

    typeSelect(value){
        this.currentId = value;
        this.currentDataset = this.dataset[value];
        this.populate();
    }

    public isBarDrawn = false;
    drawBarCharts(){
            if(this.isBarDrawn == true)
                return;            
            this.isBarDrawn = true;
            let counts1 = [];
            let labels1 = [];
            Object.values(this.barDatasets[0]).forEach(v => {
                counts1.push(v['yes']);
                labels1.push(v['stmt']);
            });

            let dataset1 = [{
                label: "# of people who said yes",
                data: counts1,
                backgroundColor: '#003f5c'
            }];

            let canvas: any = document.getElementById("barChart1");
            let ctx = canvas.getContext("2d");

            new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels1,
                datasets: dataset1
            },
            options: {
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
            });


            let counts2 = [];
            let labels2 = [];
            Object.values(this.barDatasets[1]).forEach(v => {
                counts2.push(v['yes']);
                labels2.push(v['stmt']);
            });

            let dataset2 = [{
                label: "# of people who said yes",
                data: counts2,
                backgroundColor: '#37d493'
            }];

            let canvas2: any = document.getElementById("barChart2");
            let ctx2 = canvas2.getContext("2d");

            new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: labels2,
                datasets: dataset2
            },
            options: {
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
            });


            let counts3 = [];
            let labels3 = [];
            Object.values(this.barDatasets[2]).forEach(v => {
                counts3.push(v['yes']);
                labels3.push(v['stmt']);
            });

            let dataset3 = [{
                label: "# of people who said yes",
                data: counts3,
                backgroundColor: '#fcc468'
            }];

            let canvas3: any = document.getElementById("barChart3");
            let ctx3 = canvas3.getContext("2d");

            new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: labels3,
                datasets: dataset3
            },
            options: {
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
            });
    }
}
