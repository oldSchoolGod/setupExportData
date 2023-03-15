import { LightningElement ,wire,api, track } from 'lwc';
import {deleteRecord} from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';
import showSetupExport from '@salesforce/apex/setupExportDataTableHandler.showSetupExport';
import showSetupExport1 from '@salesforce/apex/setupExportDataTableHandler.showSetupExport1';
//import pdflib from "@salesforce/resourceUrl/pdflib";
import { loadScript } from "lightning/platformResourceLoader";
import jspdf from "@salesforce/resourceUrl/jsPDF";
//import jspdfautotable from "@salesforce/resourceUrl/jspdfautotable";



export default class SetupExportDataTable extends LightningElement{
    
@track data=[];
data1 =[];
    _datatableresp
setUpHeaders =[];
@track error;
@wire(showSetupExport )
wiredexport(result) {
        this._datatableresp = result
    if(result.data) {
        this.data = result.data;
        
    } else if(result.error) {
        this.error = result.error;
    }
}

deleteRows() {
    const recordId =event.target.dataset.recordId;
    deleteRecord(recordId)
        .then(() => {
            return refreshApex(this._datatableresp);  
        })
            .catch(error => {
                            this.error = error;
        });   
        Window.location.reload();      
}

GenerateCSV() {
    const recordId =event.target.dataset.recordId;
    showSetupExport1({rowId : recordId})
        .then(result => {
            this.data1 =  result.queryList;
            this.setUpHeaders = String(result.header).split(',');
            console.log('value 47'+JSON.stringify(result));
            
            
    let doc = '<table>';
    // Add styles for the table
    doc += '<style>';
    doc += 'table, th, td {';
    doc += '  border: 1px solid black;';
    doc += '  border-collapse: collapse;';
    doc += '}';          
    doc += '</style>';
    // Add all the Table Headers
    doc += '<tr>';
    this.setUpHeaders.forEach(element => {            
        doc += '<th>'+ element +'</th>'           
    });
    doc += '</tr>';
    // Add the data rows
    this.data1.forEach(record => {
            doc += '<tr>';
        for(let i=0;i<this.setUpHeaders.length;i++){
        doc += '<th>'+record[this.setUpHeaders[i]]+'</th>'; 
        }
            doc += '</tr>';
    });
    doc += '</table>';
    var element = 'data:application/vnd.ms-excel,' + encodeURIComponent(doc);
    let downloadElement = document.createElement('a');
    downloadElement.href = element;
    downloadElement.target = '_self';
    // use .csv as extension on below line if you want to export data as csv
    downloadElement.download = 'ExportCSV file Data.xls';
    document.body.appendChild(downloadElement);
    downloadElement.click();

        })


        .catch(error => {
            this.error = error;
        });
}

renderedCallback(){
Promise.all([
    loadScript(this, jspdf)
]).then(() => {});
}
   createPdf(){
        const recordId =event.target.dataset.recordId;
    showSetupExport1({rowId : recordId})
        .then(result => {
           this.data1 =  result.queryList;
            this.setUpHeaders = String(result.header).split(',');
            console.log('value 47'+JSON.stringify(result));
             console.log('value data1'+JSON.stringify(this.data1));
              console.log('value setUpHeaders'+JSON.stringify(this.setUpHeaders));

 

        const { jsPDF } = window.jspdf;
          //  var verticalOffset=0.5;
          //  var size=29;
          //  var margin=0.5;
          //  var compress=true;
          //  var autoSize=false;
          //  var printHeaders= true;
          //  const doc = new jsPDF();


        const doc = new jsPDF('l', 'mm', 'a4','true','true');
            doc.setTextColor(100); 
            //Create Text
           
          // doc.text("Hello SalesforceCodex!", 10, 10);
            let tableData = JSON.parse(JSON.stringify(this.data1));
              let tablehead = JSON.parse(JSON.stringify(this.setUpHeaders));
              console.log('value setUpHeaders 123'+JSON.stringify(this.setUpHeaders));

      // let tablehead = this.setUpHeaders;

       
        doc.table(10,10,tableData,tablehead);
            doc.save("PdfFile.pdf");
        })
       

   }
  
}