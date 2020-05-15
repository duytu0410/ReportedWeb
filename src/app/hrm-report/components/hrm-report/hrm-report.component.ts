import { Component, OnInit, OnDestroy} from '@angular/core';
import {BindingDataToRouterService} from './../../../service/binding_data_to_router/binding-data-to-router.service';
import {Subscription,Subject,Observable} from 'rxjs';
import {filter,nam,thang,hangmuc} from '../../../service/const/fiter_types_const';
import {single,multi2,lineChart,barChart,lineChartSeries,bubbleData} from './../../../service/const/dataFromApi'
import {ApiService} from './../../../service/api/api.service';
import {HrmReportService} from './../../service/hrm-report.service';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
@Component({
  selector: 'app-hrm-report',
  templateUrl: './hrm-report.component.html',
  styleUrls: ['./hrm-report.component.css']
})
export class HrmReportComponent implements OnInit,OnDestroy {
  filterForm;
  public subscription:Subscription;
  private messageSubscription: Subscription;
  
  public title:string="Tổng thu nhập"

  //dash8
  public getsumwithcategorieseachmonth=JSON.parse(JSON.stringify(multi2));
  //dash 9
  public getsumwithcategorieseachdifferent=JSON.parse(JSON.stringify(lineChart));
  //dash 10
  public getpercentofeachmonth
  //dash 11
  public getaverageeachmonthnow=JSON.parse(JSON.stringify(barChart));
  public getaverageeachmonthpast=JSON.parse(JSON.stringify(lineChartSeries));
  //dash 12
  public getdifferenteachmonth=lineChart
  //dash 13
  public getdifferentpercenteachmonth=lineChart;
  //dash 14
  public getcountedhreachmonth=JSON.parse(JSON.stringify(multi2))
  //dash 15
  public getallnewhreachmonthnow=lineChartSeries;
  public getallnewhreachmonthpast=barChart;
  //dash 16
  public getallquitedhreachmonthnow=lineChartSeries;
  public getallquitedhreachmonthpast=barChart;
  constructor(
    public bindingData:BindingDataToRouterService,
    public apiService:ApiService,
    public hrmReportService:HrmReportService,
    private formBuilder: FormBuilder,
    ) {
      this.filterForm = this.formBuilder.group({
        "nam": [2019, Validators.required],
        "thang": [2, Validators.required],
        "chinhanh":['Hà Nội', Validators.required],
        "phongban":['Accounting', Validators.required],
        "cuahang":['', Validators.required],
        "manv":['NV01', Validators.required],
        "hangmuc":['Lương cơ bản', Validators.required],
      });
      this.hrmReportService.filter=filter;
      this.hrmReportService.years=nam;
      this.hrmReportService.months=thang;
      this.apiService.getPhongBan((status,data)=>{
        if(status){
          this.hrmReportService.filter[1].view=data
        }
      })
      this.apiService.getCuaHang((status,data)=>{
        if(status){
          this.hrmReportService.filter[2].view=data
        }
      })
      this.apiService.getMaNv((status,data)=>{
        if(status){
         this.hrmReportService.filter[3].view=data
        }
      })
      this.apiService.getChiNhanh((status,data)=>{
        if(status){
          this.hrmReportService.filter[0].view=data
        }
      })
    
  }
  ngOnInit(): void {
   
    // when filter button is clicked:
  //   this.messageSubscription = this.bindingData.message.subscribe(m => {
  //     if(m){
        
  //     }
  // });
  }
  onSubmit(data){
    this.hrmReportService.body=JSON.parse(JSON.stringify(data));
    this.hrmReportService.nam=this.hrmReportService.body.nam;
    this.hrmReportService.thang=this.hrmReportService.body.thang;
    this.title=this.hrmReportService.body.hangmuc;
    // this.getsumwithcategorieseachdifferent[0].name=this.title+" năm "+this.hrmReportService.nam+" và "+(this.hrmReportService.nam-1)
    let nam=this.hrmReportService.body.nam;
    let thang=Number(this.hrmReportService.body.thang);
    let chinhanh=this.hrmReportService.body.chinhanh;
    let phongban=this.hrmReportService.body.phongban;
    let cuahang=this.hrmReportService.body.cuahang;
    let hangmuc=this.hrmReportService.body.hangmuc;
    //chuyển hạng mục về đúng kiểu để gửi api
    for (let i = 0; i < this.hrmReportService.filter[4].view.length; i++) {
      if(hangmuc==this.hrmReportService.filter[4].view[i]){
        hangmuc=this.hrmReportService.filter[4].value[i]
     
      }
    }
    let manv=this.hrmReportService.body.manv;
    //get sum with categories this year
    this.hrmReportService.getsumwithcategoriesnow=0;
    this.hrmReportService.getsumwithcategoriespast=0;
    this.hrmReportService.getsumwithmonthnow=0;
    this.hrmReportService.getsumwithmonthpast=0;
    this.hrmReportService.getcountedhrminmonthnow=0;
    this.hrmReportService.getcountedhrminmonthpast=0;
    this.hrmReportService.getcountedallnewhr=0;
    this.hrmReportService.getcountedallquitedhr=0;
    this.hrmReportService.sum=0;
   
     //dash1,2,8
      // this.apiService.getSumCategoriesGroupedByMonth({nam,chinhanh,phongban,cuahang,manv,hangmuc},(status,data)=>{
      //   if(status){
      //     // //dash1
      //     // let data1a=JSON.parse(JSON.stringify(data))
      //     // let data2a=JSON.parse(JSON.stringify(data))
      //     // for (let i = 0; i < data1a.length; i++) {
      //     //   this.hrmReportService.getsumwithcategoriesnow+=data1a[i].value
      //     // //hết dash1
      //     // //dash2  
      //     //   if(data2a[i].name==thang){
      //     //     this.hrmReportService.getsumwithmonthnow=data2a[i].value
      //     //   }
      //     // }
      //     // //hết dash 2
      //   }
      // }) 
      //dash 3,14
      // this.apiService.getCountedHrGroupedByMonth({nam,chinhanh,phongban,cuahang},(status,data)=>{
      //   if(status){
      //     //dash 3
      //     // let data3a=JSON.parse(JSON.stringify(data))
      //     // for (let i = 0; i< data3a.length; i++) {
      //     //  if(data3a[i].name==this.hrmReportService.thang){
      //     //    this.hrmReportService.getcountedhrminmonthnow=data3a[i].value
      //     //  }
      //     // }
      //     //hết dash 3
      //     // //dash 14
      //     // let data14a=JSON.parse(JSON.stringify(data))
      //     // if(data14a.length>0){
      //     //   console.log(data14a)
      //     //   for (let i = 0; i < data14a.length; i++) {
      //     //     this.getcountedhreachmonth[i].series[0].name=this.hrmReportService.nam.toString()
      //     //     this.getcountedhreachmonth[i].series[0].value=(data14a[i].value*100).toFixed()
      //     //   }
      //     //   this.getcountedhreachmonth=this.getcountedhreachmonth
      //     // }
      //     // if(data14a.length==0){
      //     //   this.getcountedhreachmonth=JSON.parse(JSON.stringify(multi2))
      //     // }
      //   }
      // })
      //hết dash 3,14
      //dash 4
      this.apiService.getCountedAllNewHrGroupedByMonth({nam,chinhanh,cuahang},(status,data)=>{
        if(status){
          let data4a=JSON.parse(JSON.stringify(data))
          for (let i = 0; i < data4a.length; i++) {
            if(data4a[i].name==thang){
              this.hrmReportService.getcountedallnewhr=data4a[i].value
            }
          }
        }
      }) 
      //dash 4
      this.apiService.getCountedAllQuitedHrGroupedByMonth({nam,chinhanh,cuahang},(status,data)=>{
        if(status){
          let data4b=JSON.parse(JSON.stringify(data))
          for (let i = 0; i < data4b.length; i++) {
            if(data4b[i].name==thang){
              this.hrmReportService.getcountedallquitedhr=data4b[i].value
            }
          }
        }
      }) 
      //hết dash 4
      //dash 5,6,7
      this.handleDash567({nam,thang,chinhanh,hangmuc})
      this.handleDash128910({nam,chinhanh,phongban,cuahang,manv,hangmuc})
      this.handleDash111213({nam,chinhanh,phongban,cuahang,manv,hangmuc})
      this.handleDash314({nam,chinhanh,phongban,cuahang})
      //hết dash 5,6,7
    nam--
    //and last year
   
    // this.apiService.getSumCategoriesGroupedByMonth({nam,chinhanh,phongban,cuahang,manv,hangmuc},(status,data)=>{
    //   if(status){
    //     // let data1b=JSON.parse(JSON.stringify(data))
    //     // let data2b=JSON.parse(JSON.stringify(data))
    //     // for (let i = 0; i < data1b.length; i++) {
    //     //   //dash 1
    //     //   this.hrmReportService.getsumwithcategoriespast+=data1b[i].value
    //     //   //hết dash 1
    //     //   //dash 2
    //     //   if(data2b[i].name==thang){
    //     //     this.hrmReportService.getsumwithmonthpast=data2b[i].value
    //     //   }
    //     //   //hết dash2
    //     // }
    //   }
    // }) 
     //dash 3,14
     this.apiService.getCountedHrGroupedByMonth({nam,chinhanh,phongban,cuahang},(status,data)=>{
      if(status){
        //dash 3
        // let data3b=JSON.parse(JSON.stringify(data))
        // for (let i = 0; i< data3b.length; i++) {
        //  if(data3b[i].name==this.hrmReportService.thang){
        //    this.hrmReportService.getcountedhrminmonthpast=data3b[i].value
        //  }
        // }
        //hết dash 3
        //  //dash 14
        //  let data14b=JSON.parse(JSON.stringify(data))
        //  if(data14b.length>0){
        //    for (let i = 0; i < data14b.length; i++) {
        //      this.getcountedhreachmonth[i].series[1].name=(this.hrmReportService.nam-1).toString()
        //      this.getcountedhreachmonth[i].series[1].value=(data14b[i].value*100).toFixed(0)
        //    }
        //    this.getcountedhreachmonth=[...this.getcountedhreachmonth]
        //  }
        //  if(data14b.length==0){
        //    this.getcountedhreachmonth=JSON.parse(JSON.stringify(multi2))
        //  }
        //  //hết dash 14
      }
    })
    //hết dash 3
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.messageSubscription.unsubscribe();
  }
  async handleDash567(filter){
      let dataFromApi=await JSON.parse(JSON.stringify(this.apiService.getSumWithCategoriesInPb(filter)))
      if(dataFromApi.length>0){
        //dash5
        this.hrmReportService.getsumwithcategoriesinpb=JSON.parse(JSON.stringify(dataFromApi)) 
        //hết dash 5
        //dash 6
        let data6=JSON.parse(JSON.stringify(dataFromApi))
        for (let i = 0; i < data6.length; i++) {
          this.hrmReportService.sum+=data6[i].value
        }
        for (let i = 0; i <data6.length; i++) {
          if(this.hrmReportService.sum!=0){
            data6[i].value=this.hrmReportService.handlePercent(this.hrmReportService.sum,data6[i].value);
          }
        }
        this.hrmReportService.getpercentofeachpb=data6
        //hết dash 6
        //dash 7
        this.apiService.getCountedAllHrInEachPB(filter,(status,data)=>{
          if(status){
            let data7=JSON.parse(JSON.stringify(data))
            if(data7.length>0){
              for (let i = 0; i < data7.length; i++) {
                data7[i].value=(dataFromApi[i].value/data7[i].value).toFixed(0)
              }
              this.hrmReportService.getaverage=data7
            }
          }
        })
        //hết dash 7
      }
      if(dataFromApi.length==0){
        this.hrmReportService.getpercentofeachpb=JSON.parse(JSON.stringify(single))
        this.hrmReportService.getsumwithcategoriesinpb=JSON.parse(JSON.stringify(single))
        this.hrmReportService.getaverage=JSON.parse(JSON.stringify(single))
      }
  }
  async handleDash128910(filter){

    let dataFromApi=JSON.parse(JSON.stringify(await this.apiService.getSumCategoriesGroupedByMonth2(filter)))
    if(dataFromApi.length>0){
      //dash1
      let data1a=JSON.parse(JSON.stringify(dataFromApi))
      let data2a=JSON.parse(JSON.stringify(dataFromApi))
      for (let i = 0; i < data1a.length; i++) {
        this.hrmReportService.getsumwithcategoriesnow+=data1a[i].value
      //hết dash1
      //dash2  
        if(data2a[i].name==thang){
          this.hrmReportService.getsumwithmonthnow=data2a[i].value
        }
      }
      //hết dash 2
      //dash 8
      let data8a=JSON.parse(JSON.stringify(dataFromApi))
      let data9a=JSON.parse(JSON.stringify(dataFromApi))
      let data10a=JSON.parse(JSON.stringify(dataFromApi))
      for (let i = 0; i < this.getsumwithcategorieseachmonth.length; i++) {
      this.getsumwithcategorieseachmonth[i].series[0].name=filter.nam
      this.getsumwithcategorieseachmonth[i].series[0].value=data8a[i].value
      }
      //hết dash 8
      // //dash 11
      // let data11a=JSON.parse(JSON.stringify(dataFromApi))
      // this.apiService.getCountedHrGroupedByMonth(filter,(status,data)=>{
      //   if(status){
      //     if(data.length>0){
      //       let data11b=JSON.parse(JSON.stringify(data))
      //       for (let i = 0; i < this.getaverageeachmonthnow.length; i++) {
      //         data11a[i].value=(data11a[i].value/data11b[i].value).toFixed(0)
      //       }
      //       this.getaverageeachmonthnow=[...data11a]
      //     }
      //     if(data.length==0){
      //       console.log("helo")
      //       this.getaverageeachmonthnow=JSON.parse(JSON.stringify(barChart))
      //     }
      //   }
      // })
      // //hết dash 11

      filter.nam--
      let dataFromApi2= await JSON.parse(JSON.stringify(await this.apiService.getSumCategoriesGroupedByMonth2(filter)))
      if(dataFromApi2.length>0){
        let data1b=JSON.parse(JSON.stringify(dataFromApi2))
        let data2b=JSON.parse(JSON.stringify(dataFromApi2))
        for (let i = 0; i < data1b.length; i++) {
          //dash 1
          this.hrmReportService.getsumwithcategoriespast+=data1b[i].value
          //hết dash 1
          //dash 2
          if(data2b[i].name==thang){
            this.hrmReportService.getsumwithmonthpast=data2b[i].value
          }
          //hết dash2
        }
        let data8b=JSON.parse(JSON.stringify(dataFromApi2))
        let data9b=JSON.parse(JSON.stringify(dataFromApi2))
        let data10b=JSON.parse(JSON.stringify(dataFromApi2))
        //dash8
        for (let i = 0; i < this.getsumwithcategorieseachmonth.length; i++) {
            this.getsumwithcategorieseachmonth[i].series[1].name=filter.nam
            this.getsumwithcategorieseachmonth[i].series[1].value=data8b[i].value
        }
        this.getsumwithcategorieseachmonth=[...this.getsumwithcategorieseachmonth]
        //hết dash 8
        //dash 9
        for (let i = 0; i < this.getsumwithcategorieseachdifferent[0].series.length; i++) {
          this.getsumwithcategorieseachdifferent[0].series[i].value=data9a[i].value-data9b[i].value
        }
        this.getsumwithcategorieseachdifferent=[...this.getsumwithcategorieseachdifferent]
        //hết dash 9
        //dash 10
        let sumPast=0
        for (let i = 0; i < data10b.length; i++) {
          sumPast+=data10b[i].value
        }
        for (let i = 0; i < data10a.length; i++) {
          data10a[i].value=(data10a[i].value/sumPast*100).toFixed(0)
        }
        this.getpercentofeachmonth=data10a
        //Hết dash 10
      //   //dash 11
      //   let data11c=JSON.parse(JSON.stringify(dataFromApi2))
      //   this.apiService.getCountedHrGroupedByMonth(filter,(status,data)=>{
      //     if(status){
      //       if(data.length>0){
      //         let data11d=JSON.parse(JSON.stringify(data))
      //         this.getaverageeachmonthpast[0].name=this.title+" trung bình"
      //         for (let i = 0; i < this.getaverageeachmonthpast[0].series.length; i++) {
      //           this.getaverageeachmonthpast[0].series[i].value=(data11c[i].value/data11d[i].value).toFixed(0)
      //         }
      //         this.getaverageeachmonthpast=[...this.getaverageeachmonthpast]
      //       }
      //       if(data.length==0){
      //         this.getaverageeachmonthpast=JSON.parse(JSON.stringify(lineChartSeries))
      //       }
      //     }
      //   })
      // //hết dash 11
      }
    }
    if(dataFromApi.length==0){
      this.getsumwithcategorieseachmonth=JSON.parse(JSON.stringify(multi2))
      this.getsumwithcategorieseachdifferent=JSON.parse(JSON.stringify(lineChart))
      this.getpercentofeachmonth=JSON.parse(JSON.stringify(single))
    }
  }
  async handleDash111213(filter){
    let dataFromApi=JSON.parse(JSON.stringify(await this.apiService.getSumCategoriesGroupedByMonth2(filter)))
    if(dataFromApi.length>0){
      //dash 11
      let data11a=JSON.parse(JSON.stringify(dataFromApi))
      let dataFromApi2=JSON.parse(JSON.stringify(await this.apiService.getCountedHrGroupedByMonth2(filter)))
      if(dataFromApi2.length>0){
        let data11b=JSON.parse(JSON.stringify(dataFromApi2))
        for (let i = 0; i < data11a.length; i++) {
          data11a[i].value=(data11a[i].value/data11b[i].value).toFixed(0)
        }
        this.getaverageeachmonthnow=[...data11a]
      }
      if(dataFromApi2.length==0){
        this.getaverageeachmonthnow=JSON.parse(JSON.stringify(barChart));
      }
      //hết dash 11
      //dash 12
      let data12a=JSON.parse(JSON.stringify(data11a))
      //hết dash 12
      filter.nam--
      let dataFromApi3=JSON.parse(JSON.stringify(await this.apiService.getSumCategoriesGroupedByMonth2(filter)))
      if(dataFromApi3.length>0){
        //dash 11
        let data11c=JSON.parse(JSON.stringify(dataFromApi3))
        let dataFromApi4=JSON.parse(JSON.stringify(await this.apiService.getCountedHrGroupedByMonth2(filter)))
        if(dataFromApi4.length>0){
          let data11d=JSON.parse(JSON.stringify(dataFromApi4))
          for (let i = 0; i < data11c.length; i++) {
            data11c[i].value=(data11c[i].value/data11d[i].value).toFixed(0)
          }
          this.getaverageeachmonthpast[0].name=this.title+" trung bình"
          for (let i = 0; i < data11c.length; i++) {
            this.getaverageeachmonthpast[0].series[i].value=data11c[i].value
          }
          this.getaverageeachmonthpast=[...this.getaverageeachmonthpast]
        }
        if(dataFromApi4.length==0){
          this.getaverageeachmonthpast=JSON.parse(JSON.stringify(lineChartSeries));
        }
        //hết dash 11
        //dash 12
        let data12b=JSON.parse(JSON.stringify(data11c))
        this.getdifferenteachmonth[0].series[0].value=data12a[0].value-data12b[11].value
        for (let i = 1; i < this.getdifferenteachmonth[0].series.length; i++) {
          this.getdifferenteachmonth[0].series[i].value=data12a[i].value-data12a[i-1].value
        }
        this.getdifferenteachmonth=[...this.getdifferenteachmonth]
        //hết dash12
      }
      if(dataFromApi3.length==0){
        this.getaverageeachmonthpast=JSON.parse(JSON.stringify(lineChartSeries));
        this.getdifferenteachmonth=JSON.parse(JSON.stringify(lineChart))
      }
    }
    if(dataFromApi.length==0){
      this.getaverageeachmonthnow=JSON.parse(JSON.stringify(barChart));
      this.getaverageeachmonthpast=JSON.parse(JSON.stringify(lineChartSeries));
    }
   
  }
  async handleDash314(filter){
    let dataFromApi=JSON.parse(JSON.stringify(await this.apiService.getCountedHrGroupedByMonth2(filter)))
    if(dataFromApi.length>0){
      //dash 14
      let data14a=JSON.parse(JSON.stringify(dataFromApi))
      for (let i = 0; i < data14a.length; i++) {
        this.getcountedhreachmonth[i].series[0].name=this.hrmReportService.nam
        this.getcountedhreachmonth[i].series[0].value=data14a[i].value
      }
      //hết dash14
      //dash 3
      let data3a=JSON.parse(JSON.stringify(dataFromApi))
      for (let i = 0; i< data3a.length; i++) {
       if(data3a[i].name==this.hrmReportService.thang){
         this.hrmReportService.getcountedhrminmonthnow=data3a[i].value
       }
      }
      //hết dash 3 
      filter.nam--
      let dataFromApi2=JSON.parse(JSON.stringify(await this.apiService.getCountedHrGroupedByMonth2(filter)))
      if(dataFromApi2.length>0){
        //dash 14
        let data14b=JSON.parse(JSON.stringify(dataFromApi2))
        for (let i = 0; i < data14b.length; i++) {
          this.getcountedhreachmonth[i].series[1].name=this.hrmReportService.nam-1
          this.getcountedhreachmonth[i].series[1].value=data14b[i].value
        }
        this.getcountedhreachmonth=[...this.getcountedhreachmonth]
      }
      //hết dash14
      //dash 3
      let data3b=JSON.parse(JSON.stringify(dataFromApi2))
      for (let i = 0; i< data3b.length; i++) {
       if(data3b[i].name==this.hrmReportService.thang){
         this.hrmReportService.getcountedhrminmonthpast=data3b[i].value
       }
      }
      //hết dash 3
      if(dataFromApi2.length==0){
        this.getcountedhreachmonth=JSON.parse(JSON.stringify(multi2))
      }
    }
    if(dataFromApi.length==0){
        this.getcountedhreachmonth=JSON.parse(JSON.stringify(multi2))
    }
  }
}
