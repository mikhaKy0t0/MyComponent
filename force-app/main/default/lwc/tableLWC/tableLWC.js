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

    @track objectList;
    @track values;
    @track isMo\dalOpen = false;
    
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
        var sortField = this.listToQuery[buttonPosition];

        if (this.direction == "ASC") {
            this.direction = "DESC";
        }
        else {this.direction = "ASC";
        };
        this.orderField = sortField;
    }

    formingCells(){
        var newValues=[];
        var newObj=[];
        // var regExpIn = /\((.*)\)/; -  not in use because format doesn't supported
        // var regExpOut = /(.*?)\(/; - not in use
        for (var i = 0; i < this.objectList.length; i++){
            var currentRecord = this.objectList[i];
            for (var l = 0; l < (this.listToQuery.length); l++){
                var formatMain = ((this.listFormat[l].includes('Date')) ? 'Date' : this.listFormat[l]);
                // format is not support for Date in LWC
                // var formatSpec = ((this.listFormat[l].includes('Date(')) ? regExpIn.exec(this.listFormat[l]) : this.listFormat[l]);
                var quer = this.listToQuery[l];
                var customObj = {
                    value: currentRecord[quer],
                    format: formatMain,
                    //specFormatObj: (formatSpec == 'Date' || formatSpec == this.listFormat[l] ? '' : formatSpec[1]),
                    keyId: this.objectList[i].Id
                };
                newValues.push(customObj);
            };
            newObj[i] = newValues;
            newValues=[];
        }
        this.values = newObj;
        this.spinner = false;     
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