import { LightningElement, api, wire, track} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import relatedRecords from '@salesforce/apex/tableWithHeaderController.relatedRecords';

export default class TableLWC extends LightningElement {

    // @api decorator marks attribute as a public property
    // this attribtues came from js-meta.xml file
    @api chosenObject;    
    @api fieldsToQuery;
    @api fieldsToDisplay;    
    @api orderField;    
    @api direction;    
    @api datFormat;
    @api recordId;

    objectList;
    values;
    isModalOpen = false;
    
    iconName;
    spinner = true;
    listToQuery;    
    listToDisplay;    
    listFormat;
    error;
    message;

    // WORKS FIRST!
    connectedCallback() {
        this.stringToList();
        this.iconName = "standard:" + this.chosenObject;
    }

    stringToList(){
        this.listToQuery = this.fieldsToQuery.split(', ');
        this.listToDisplay = this.fieldsToDisplay.split(', ');
        this.listFormat = this.datFormat.split(', ');
    }

    showNotification() {
        const evt = new ShowToastEvent({
            title: 'Status of your Apex query',
            message: this.message.text,
            variant: this.message.status,
        });
        this.dispatchEvent(evt);
        this.spinner = false;
    }

    // WORKS automate
    @wire(relatedRecords, {
        recordId: '$recordId',
        chosenObject: '$chosenObject',
        fieldsToQuery: '$fieldsToQuery',
        orderField: '$orderField',
        direction: '$direction'})
    callServer({ error, data }) {
        if (data) {
            this.objectList = data;
            this.message = {
                status: 'success',
                text: 'hello, all works fine'};
            this.showNotification();
            this.formingCells();
        } else if (error){
            this.message = {
                status: 'error',
                text: 'hello, something wrong, check logs'};
            this.showNotification();
            console.log(error);
        }
    }

    clickToSort(event){
        var buttonPosition = event.target.dataset.name;

        if (this.direction == "ASC") {
            this.direction = "DESC";
        }
        else {this.direction = "ASC";
        };
        this.orderField = this.listToQuery[buttonPosition];
    }

    formingCells(){
        var newValues=[];
        var newObj=[];
        // var regExpIn = /\((.*)\)/; -  not in use because format doesn't supported
        // var regExpOut = /(.*?)\(/; - not in use
        for (var rowNumber = 0; rowNumber < this.objectList.length; rowNumber++){
            var currentRecord = this.objectList[rowNumber];
            for (var columnNumber = 0; columnNumber < (this.listToQuery.length); columnNumber++){
                var formatMain = ((this.listFormat[columnNumber].includes('Date')) ? 'Date' : this.listFormat[columnNumber]);
                // format is not support for Date in LWC
                // var formatSpec = ((this.listFormat[l].includes('Date(')) ? regExpIn.exec(this.listFormat[l]) : this.listFormat[l]);
                var quer = this.listToQuery[columnNumber];
                var customObj = {
                    value: currentRecord[quer],
                    format: formatMain,
                    //specFormatObj: (formatSpec == 'Date' || formatSpec == this.listFormat[l] ? '' : formatSpec[1]),
                    cellId: this.objectList[rowNumber].Id + columnNumber
                };
                newValues.push(customObj);
            };
            newObj[rowNumber] = {
                rowId: this.objectList[rowNumber].Id, 
                rowData: newValues};
            newValues=[];
        }
        this.values = newObj;   
    }

    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
    submitDetails() {
        this.isModalOpen = false;
    }
}