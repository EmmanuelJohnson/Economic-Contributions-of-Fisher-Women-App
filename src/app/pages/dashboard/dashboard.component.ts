import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { SibobsService } from './../../services/sibobs.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ques } from "./../../ques";

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  private unsubscribe$ = new Subject();

  constructor (private _so: SibobsService){ }

  ngOnInit(){

    this._so.newCSVData
    // The subscription is alive until the isStopped is set to true by the next and complete in ngOnDestroy
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(newCSVData => {
      Promise.resolve(null).then(
        () => {
          this.csvData = newCSVData;
          this.drawCharts();
        });

    })
  }

  ngOnDestroy() {
    // Prevent memory leaking
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public chartColor;
  public eduPieChart;
  public barChartAge;
  public barChartWork;
  public pieChartWork;
  public currentWorkPieLabels = [];
  public pieChartFamily;
  public currentFamilyPieLabels = [];
  public csvData;

  public pieOptions = {
    legend: {display: false},
    pieceLabel: {
      render: 'percentage',
      fontColor: ['white'],
      precision: 2
    },
    tooltips: {enabled: true},
    scales: {
      yAxes: [{
        ticks: {
          display: false
        },
        gridLines: {
          drawBorder: false,
          zeroLineColor: "transparent",
          color: 'rgba(255,255,255,0.05)'
        }
      }],
      xAxes: [{
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: 'rgba(255,255,255,0.1)',
          zeroLineColor: "transparent"
        },
        ticks: {
          display: false,
        }
      }]
    },
  };

  public totalCount = 0;
  public gender = { //q3
    1: 0,
    2: 0,
    3: 0
  };
  public education  = { // q4
    1:0,
    2:0,
    3:0,
    4:0,
    5:0,
    6:0
  };

  public saveMoney = 0; //q14
  public saveType = [
    {
      id: "Chits",
      count: 0
    },
    {
      id: "Bank",
      count: 0
    },
    {
      id: "Jewel Scheme",
      count: 0
    },
    {
      id: "LIC",
      count: 0
    },
    {
      id: "SHG",
      count: 0
    }
  ]; // q15
  public maxSaveTypeId = 0;
  public earningBenefits = [
    {
      id: "Improved Economic Status",
      count: 0
    },
    {
      id: "Increase Confidence Level",
      count: 0
    },
    {
      id: "Helped in Political Participation",
      count: 0
    },
    {
      id: "Developed Social Awareness",
      count: 0
    },
    {
      id: "Awareness on Government Policies",
      count: 0
    },
    {
      id: "Ensured Implementation of Government Policies",
      count: 0
    },
  ]; // q16
  public maxEarnBenefitsId = 0;

  public barChartAgeDatasets = [];
  public workPieChartDatasets = [];
  public workBarChartDatasets = [];
  public familyPieChartDatasets = [];

  drawCharts(){

    let maxEarnCount = 0;
    let maxSaveTypeCount = 0;
    this.totalCount = this.csvData.length-1;
    this.csvData.forEach(value => {
      if(value["id"] === "")
        return;
      this.gender[value[ques.gender]] += 1;
      this.education[value[ques.education]] += 1;
      if(value[ques.saveMoney] == 1)
        this.saveMoney += 1;
      this.earningBenefits[value[ques.earnBenefits]-1]['count'] += 1;
      maxEarnCount = Math.max(this.earningBenefits[value[ques.earnBenefits]-1]['count'], maxEarnCount);
      this.saveType[value[ques.saveType]-1]['count'] += 1;
      maxSaveTypeCount = Math.max(this.saveType[value[ques.saveType]-1]['count'], maxSaveTypeCount);
    });
    
    this.earningBenefits.forEach((v,i) => {
      if(v['count'] == maxEarnCount)
        this.maxEarnBenefitsId = i;
    });
    this.saveType.forEach((v,i) => {
      if(v['count'] == maxSaveTypeCount)
        this.maxSaveTypeId = i;
    });
    
    this.drawAge();
    this.drawFamily();
    this.drawWork();
  }

  drawAge(){
    let ageGroup = {
      '<20': {
        count: 0,
        education: [0, 0, 0, 0, 0, 0],
        marital: [0, 0, 0, 0, 0]
      },
      '20-29': {
        count: 0,
        education: [0, 0, 0, 0, 0, 0],
        marital: [0, 0, 0, 0, 0]
      },
      '30-39': {
        count: 0,
        education: [0, 0, 0, 0, 0, 0],
        marital: [0, 0, 0, 0, 0]
      },
      '40-49': {
        count: 0,
        education: [0, 0, 0, 0, 0, 0],
        marital: [0, 0, 0, 0, 0]
      },
      '50-59': {
        count: 0,
        education: [0, 0, 0, 0, 0, 0],
        marital: [0, 0, 0, 0, 0]
      },
      '>=60': {
        count: 0,
        education: [0, 0, 0, 0, 0, 0],
        marital: [0, 0, 0, 0, 0]
      }
    }

    this.csvData.forEach(value => {
      if(value["id"] === "")
        return;
      let age = parseInt(value[ques.age]);
      
      if(age < 20){
        ageGroup['<20']['count'] += 1;
        ageGroup['<20']['education'][value[ques.education]-1] += 1;
        ageGroup['<20']['marital'][value[ques.marital]-1] += 1;
      }
      else if(age >= 20 && age < 30){
        ageGroup['20-29']['count'] += 1;
        ageGroup['20-29']['education'][value[ques.education]-1] += 1;
        ageGroup['20-29']['marital'][value[ques.marital]-1] += 1;
      }
      else if(age >= 30 && age < 40){
        ageGroup['30-39']['count'] += 1;
        ageGroup['30-39']['education'][value[ques.education]-1] += 1;
        ageGroup['30-39']['marital'][value[ques.marital]-1] += 1;
      }
      else if(age >= 40 && age < 50){
        ageGroup['40-49']['count'] += 1;
        ageGroup['40-49']['education'][value[ques.education]-1] += 1;
        ageGroup['40-49']['marital'][value[ques.marital]-1] += 1;
      }
      else if(age >= 50 && age < 60){
        ageGroup['50-59']['count'] += 1;
        ageGroup['50-59']['education'][value[ques.education]-1] += 1;
        ageGroup['50-59']['marital'][value[ques.marital]-1] += 1;
      }
      else{
        ageGroup['>=60']['count'] += 1;
        ageGroup['>=60']['education'][value[ques.education]-1] += 1;
        ageGroup['>=60']['marital'][value[ques.marital]-1] += 1;
      }
    });

    let counts = [];
    Object.values(ageGroup).forEach(v => counts.push(v['count']));

    let dataset1 = [{
      label: "age",
      data: counts,
      backgroundColor: '#22aa99'
    }];

    let dataset2 = [
        {
          label: 'No Education',
          data: [0, 0, 0, 0, 0, 0],
          backgroundColor: '#003f5c'
        },
        {
          label: 'Primary',
          data: [0, 0, 0, 0, 0, 0],
          backgroundColor: '#444e86'
        },
        {
          label: '8th',
          data: [0, 0, 0, 0, 0, 0],
          backgroundColor: '#955196'
        },
        {
          label: '10th',
          data: [0, 0, 0, 0, 0, 0],
          backgroundColor: '#dd5182'
        },
        {
          label: '12th',
          data: [0, 0, 0, 0, 0, 0],
          backgroundColor: '#ff6e54'
        },
        {
          label: 'College',
          data: [0, 0, 0, 0, 0, 0],
          backgroundColor: '#ff0a00'
        }
    ]

    dataset2.forEach((ds, indexds) => 
      Object.values(ageGroup).forEach((v, index) =>{
        ds['data'][index] = v['education'][indexds];
      })
    );

    let dataset3 = [
      {
        label: 'Married',
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: '#003f5c'
      },
      {
        label: 'Unmarried',
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: '#444e86'
      },
      {
        label: 'Deserted',
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: '#955196'
      },
      {
        label: 'Widow',
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: '#dd5182'
      },
      {
        label: 'Widower',
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: '#ff6e54'
      }
  ]

  dataset3.forEach((ds, indexds) => 
    Object.values(ageGroup).forEach((v, index) =>{
      ds['data'][index] = v['marital'][indexds];
    })
  );

    this.barChartAgeDatasets = [dataset1, dataset2, dataset3]; 

    let canvas: any = document.getElementById("barChartAge");
    let ctx = canvas.getContext("2d");

    this.barChartAge = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["<20", "20-29", "30-39", "40-49", "50-59", ">=60"],
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
  }

  ageSelect(value){
    this.barChartAge.data.datasets = this.barChartAgeDatasets[value-1];
    this.barChartAge.update();
  }

  drawFamily(){

    let familyType = [
      {
        id: "Nuclear",
        count: 0
      },
      {
        id: "Joint",
        count: 0
      }
    ]

    let noMembers = [
      {
        id: "1-4",
        count: 0
      },
      {
        id: "5-10",
        count: 0
      },
      {
        id: "Above 10",
        count: 0
      }
    ]

    let houseType = [
      {
        id: "Hut",
        count: 0
      },
      {
        id: "Sheet",
        count: 0
      },
      {
        id: "Concrete",
        count: 0
      },
      {
        id: "Tsunami Project",
        count: 0
      },
      {
        id: "Government Subsidy",
        count: 0
      }
    ]

    let noDependents = [
      {
        id: "1",
        count: 0
      },
      {
        id: "2",
        count: 0
      },
      {
        id: "3",
        count: 0
      },
      {
        id: "4",
        count: 0
      },
      {
        id: "More than 5",
        count: 0
      }
    ]

    let noMembersEarning = [
      {
        id: "1",
        count: 0
      },
      {
        id: "2",
        count: 0
      },
      {
        id: "3",
        count: 0
      },
      {
        id: "4",
        count: 0
      },
      {
        id: "5 & more",
        count: 0
      }
    ]

    this.csvData.forEach(value => {
      if(value["id"] === "")
        return;
      try{
        familyType[value[ques.familyType]-1]['count'] += 1;      
        noMembers[value[ques.noMembers]-1]['count'] += 1;
        houseType[value[ques.houseType]-1]['count'] += 1;
        noDependents[value[ques.noDependents]-1]['count'] += 1;
        noMembersEarning[value[ques.noMembersEarning]-1]['count'] += 1;
      }
      catch(err){}
    });

    this.familyPieChartDatasets = [familyType, noMembers, houseType, noDependents, noMembersEarning];

    this.drawFamilyPieCharts(0);
  }

  drawFamilyPieCharts(index){
    let wcounts = [];
    let wlabels = [];
    Object.values(this.familyPieChartDatasets[index]).forEach(v => {
      if(v['count'] > 0){
        wcounts.push(v['count']);
        wlabels.push(v['id']);
      }
    });
    this.currentFamilyPieLabels = wlabels;
    let familyPieCanvas: any = document.getElementById("pieChartFamily");
    let familyPieCtx = familyPieCanvas.getContext("2d");
    this.pieChartFamily = new Chart(familyPieCtx, {
      type: 'pie',
      data: {
        labels: wlabels,
        datasets: [{
          label: "Family",
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: [
            '#003f5c',
            '#4acccd',
            '#fcc468',
            '#ef8157',
            '#37d493',
            '#d43737',
            '#453d3f'
          ],
          borderWidth: 0,
          data: wcounts
        }]
      },
      options: this.pieOptions
    });
  }

  familySelect(index){
    let wcounts = [];
    let wlabels = [];
    Object.values(this.familyPieChartDatasets[index]).forEach(v => {
      if(v['count'] > 0){
        wcounts.push(v['count']);
        wlabels.push(v['id']);
      }
    });    
    this.pieChartFamily.data.datasets[0].data = wcounts;
    this.pieChartFamily.data.labels = wlabels;
    this.currentFamilyPieLabels = wlabels;
    this.pieChartFamily.update();
  }

  drawWork(){

    let workType = [
      {
        id: "Fish/Prawn/Crab/Lobster Farmer",
        count: 0
      },
      {
        id: "Fish Worker",
        count: 0
      },
      {
        id: "Fish Auctioneer",
        count: 0
      },
      {
        id: "Fish Transporter",
        count: 0
      },
      {
        id: "Fish Retailer",
        count: 0
      },
      {
        id: "Self Employed Entrepreneur",
        count: 0
      },
      {
        id: "Central/State Government Supplier",
        count: 0
      },
      {
        id: "NGO Owner/Member",
        count: 0
      },
      {
        id: "Fish Wholesaler",
        count: 0
      },
      {
        id: "Fish Exporter",
        count: 0
      },
      {
        id: "Co-operative Society Member",
        count: 0
      },
      {
        id: "Field Technician/Aqua Lab/Aqua Shops",
        count: 0
      },
      {
        id: "Working in a Fishing Export Company",
        count: 0
      },
      {
        id: "Other",
        count: 0
      }
    ];

    let workBanType = [
      {
        id: "SHG",
        count: 0
      },
      {
        id: "Cattle rearing",
        count: 0
      },
      {
        id: "Small Business",
        count: 0
      },
      {
        id: "Agriculture",
        count: 0
      },
      {
        id: "Seed Production",
        count: 0
      },
      {
        id: "Hatcheries",
        count: 0
      },
      {
        id: "Others",
        count: 0
      }
    ];

    let workYears = [
      {
        id: "1-3 years",
        count: 0
      },
      {
        id: "4-6 years",
        count: 0
      },
      {
        id: "7-10 years",
        count: 0
      },
      {
        id: ">11 years",
        count: 0
      },
    ]

    let workHours = [
      {
        id: "1-5 hours",
        count: 0
      },
      {
        id: "6-8 hours",
        count: 0
      },
      {
        id: "9-11 hours",
        count: 0
      },
      {
        id: ">12 hours",
        count: 0
      }
    ]

    let workHelpTaken = [
      {
        id: "Ocassionally",
        count: 0
      },
      {
        id: "Always",
        count: 0
      },
      {
        id: "Never",
        count: 0
      }
    ]

    let workHelpers = [
      {
        id: "Husband",
        count: 0
      },
      {
        id: "Father",
        count: 0
      },
      {
        id: "Mother",
        count: 0
      },
      {
        id: "Sister",
        count: 0
      },
      {
        id: "Brother",
        count: 0
      },
      {
        id: "Relatives",
        count: 0
      }
    ]

    let workEarnings = [
      {
        id: "Less than Rs.100",
        count: 0
      },
      {
        id: "Rs.200",
        count: 0
      },
      {
        id: "Rs.300",
        count: 0
      },
      {
        id: "Rs.400",
        count: 0
      },
      {
        id: "Rs.500 & above",
        count: 0
      }
    ]
    
    let manageFinance = [
      {
        id: "Borrowing",
        count: 0
      },
      {
        id: "Loans from Banks",
        count: 0
      },
      {
        id: "Local Financiers",
        count: 0
      },
      {
        id: "SHGs",
        count: 0
      },
      {
        id: "Chits",
        count: 0
      }
    ]

    let governmentHelp = [
      {
        id: "Subsidy for Boat",
        count: 0
      },
      {
        id: "Housing",
        count: 0
      },
      {
        id: "Welfare Measure for Children's Education",
        count: 0
      },
      {
        id: "Loans",
        count: 0
      },
      {
        id: "Others",
        count: 0
      }
    ]

    let ngoHelp = [
      {
        id: "Job Training",
        count: 0
      },
      {
        id: "Capacity Building",
        count: 0
      },
      {
        id: "Awareness on Governemnt Policies",
        count: 0
      },
      {
        id: "Awareness on Environmental Issues",
        count: 0
      },
      {
        id: "Financial Assistance",
        count: 0
      },
      {
        id: "Children's Welfare Measure",
        count: 0
      },
      {
        id: "Others",
        count: 0
      }
    ]

    this.csvData.forEach(value => {
      if(value["id"] === "")
        return;
      try{
      workType[value[ques.workType]-1]['count'] += 1;      
      workYears[value[ques.workYears]-1]['count'] += 1;
      workHours[value[ques.workHours]-1]['count'] += 1;
      workHelpTaken[value[ques.workHelpTaken]-1]['count'] += 1;
      workHelpers[value[ques.workHelpers]-1]['count'] += 1;
      workEarnings[value[ques.workEarnings]-1]['count'] += 1;
      workBanType[value[ques.workTypeBan]-1]['count'] += 1;
      manageFinance[value[ques.manageFinancialNeeds]-1]['count'] += 1;
      governmentHelp[value[ques.governmentHelp]-1]['count']  += 1;
      ngoHelp[value[ques.ngoHelp]-1]['count'] += 1;
      }
      catch(err){}
    });

    this.workPieChartDatasets = [workYears, workHours, workHelpTaken, workHelpers, workEarnings, manageFinance, governmentHelp, ngoHelp];
    this.workBarChartDatasets = [workType, workBanType];
    
    let counts = [];
    let labels = [];
    Object.values(workType).forEach(v => {
      if(v['count'] > 0){
        counts.push(v['count']);
        labels.push(v['id']);
      }
    });

    let dataset = [{
      label: "Type of work",
      data: counts,
      backgroundColor: '#003f5c'
    }];

    let canvas: any = document.getElementById("barChartWork");
    let ctx = canvas.getContext("2d");

    this.barChartWork = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: dataset
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

    this.drawWorkPieCharts(0);
  }

  workTypeSelect(index){
    let wcounts = [];
    let wlabels = [];
    Object.values(this.workBarChartDatasets[index]).forEach(v => {
      if(v['count'] > 0){
        wcounts.push(v['count']);
        wlabels.push(v['id']);
      }
    });    
    this.barChartWork.data.datasets[0].data = wcounts;
    this.barChartWork.data.labels = wlabels;
    this.barChartWork.update();
  }

  drawWorkPieCharts(index){
    let wcounts = [];
    let wlabels = [];
    Object.values(this.workPieChartDatasets[index]).forEach(v => {
      if(v['count'] > 0){
        wcounts.push(v['count']);
        wlabels.push(v['id']);
      }
    });
    this.currentWorkPieLabels = wlabels;
    let workPieCanvas: any = document.getElementById("pieChartWork");
    let workPieCtx = workPieCanvas.getContext("2d");
    this.pieChartWork = new Chart(workPieCtx, {
      type: 'pie',
      data: {
        labels: wlabels,
        datasets: [{
          label: "Work",
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: [
            '#003f5c',
            '#4acccd',
            '#fcc468',
            '#ef8157',
            '#37d493',
            '#d43737',
            '#453d3f'
          ],
          borderWidth: 0,
          data: wcounts
        }]
      },
      options: this.pieOptions
    });
  }

  workSelect(index){
    let wcounts = [];
    let wlabels = [];
    Object.values(this.workPieChartDatasets[index]).forEach(v => {
      if(v['count'] > 0){
        wcounts.push(v['count']);
        wlabels.push(v['id']);
      }
    });    
    this.pieChartWork.data.datasets[0].data = wcounts;
    this.pieChartWork.data.labels = wlabels;
    this.currentWorkPieLabels = wlabels;
    this.pieChartWork.update();
  }
}
